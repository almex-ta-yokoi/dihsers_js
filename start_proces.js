/* 
1.APIで言語取得
2.取得した言語を反映(ひとまず日本語)
*/
async function init() {
	await getMsgLanguage()
	ChangeMsgLanguage('jp');
	var layoutDataObj = await getLayoutDataFst();
	window.removeEventListener('error',loadError);
	window.removeEventListener('onerror',loadError);

  applyCss();
  imgPathList = makeImgPathList(layoutDataObj);

  for (var imgPath of imgPathList) {
    await setBase64Url('./' + imgPath, imgPath);
  }

	CheckGetLis();
}

/**
 * DB(サーバ)からメッセージ取得
 */
async function getMsgLanguage() {
	var genericMasterUrl = PHP_EN_ROOT_FOLDER + '/getGenericMaster.php';

	var formData = new FormData();
	formData.set('fName', 'message');
  formData.set('uName', 'text');

	var genericLngObj = await postMessage(formData, genericMasterUrl);

	for(var genericMessage in genericLngObj){
		general_lng_map[genericLngObj[genericMessage]["cValue1"]] = genericLngObj[genericMessage];
	}
}

async function getLayoutDataFst() {
	var layoutdataUrl = PHP_EN_ROOT_FOLDER + '/getLayoutData.php';

	var formData = new FormData();
	
	var layoutDataObj = await postMessage(formData, layoutdataUrl);
  return layoutDataObj
}

function makeImgPathList(layoutDataObj) {
  var imgPathList = []
  for(var key in layoutDataObj){
    var src = layoutDataList[key].replace('en_order/','');
    if(src == null || !(contains(src, 'images'))){
      continue;
    }

		var imgPath = src;

    if(isMedia(imgPath)){
      imgPathList.push(imgPath)
    }
  }
  return imgPathList
}

function applyCss() {
  // cssの明示的適用
  var head = document.getElementsByTagName('head')[0].children;
  for(var h in head){
    if(head[h].href != null){
      applyEachCss(document, head[h].href);
    }
  }
}

function isMedia(src) {
  if(contains(src,".wmv") ||
	contains(src,".wav") ||
	contains(src,".mp3") || 
	contains(src,".jpg") || 
	contains(src,".png")){
		return true;
	}

	return false;
}

async function setBase64Url(url, path) {
  var fileReader = new FileReader();

  fileReader.onloadend = function() {
		lis_fact_map[path] = fileReader.result;
  }

  await fetch(url)
    .then(response => response.blob())
    .then(data => fileReader.readAsDataURL(data))
}

function applyEachCss(doc, cssfile, overwrite)
{
  if (typeof overwrite == "undefined")
    overwrite = 0;      // デフォルト:CSSの追加

  // 既存のCSSを削除
  if (overwrite && doc.styleSheets.length >= 1) {
    var links = doc.getElementsByTagName("link");
    for (var i = 0 ; i < links.length ; i++) {
      if (links[i].rel == "stylesheet")
        links[i].parentNode.removeChild(links[i]);
    }
  }

  // CSS追加
  if (document.all) {
    doc.createStyleSheet(cssfile);
  } else {
    var link = doc.createElement("link");
    link.rel = "stylesheet";
    link.href = cssfile;
    link.type = "text/css"
    doc.getElementsByTagName('head')[0].appendChild(link);
  }
}

/**
 * データ取得完了検知処理
 */
 function CheckGetLis() {
  changeToBase64();
  changeTapSound();
  startAnimation();
}


function initLayout() {
  $(window).on('resize', setLayout);
  setLayout();
  document.getElementById('loading').setAttribute("hidden","hidden");
  document.getElementById('error_blank_disp').setAttribute("class","s-offScreen2 jBtn is-hide");
}

/**
 * 画像のbase64参照差替え処理
 */
function changeToBase64(){
  changeImgToBase64()
  changeBgImgToBase64()
}

function changeImgToBase64() {
	// imgタグのsrc属性差替
	var imgs = document.getElementsByTagName("img");
	for(var img = 0; img < imgs.length;img++){
		if(imgs[img].src == null){
			continue;
		}
		// キー値
		var bkSrc = imgs[img].src.substring(imgs[img].src.indexOf("images"), imgs[img].src.length);
		imgs[img].setAttribute("tmpImg",bkSrc);
		if(lis_fact_map[bkSrc] == null ){
			continue;
		}
		imgs[img].src = lis_fact_map[bkSrc];
	}
}

function changeBgImgToBase64() {
  // styleのbackground-image差替
  var bgImgs = document.getElementsByClassName("bgImg");
  for(var bgImg = 0; bgImg < bgImgs.length;bgImg++){
    if(bgImgs[bgImg].style == null){
      continue;
    }

    var bgStr = bgImgs[bgImg].style.backgroundImage;
    bgImgs[bgImg].setAttribute("tmpImg",bgStr);
    bgStr = bgStr.replace('url("',"").replace("url('","").replace('")',"").replace("')","");
    bgStr = bgStr.replace('./',"");
    bgImgs[bgImg].style.backgroundImage = 'url("'+lis_fact_map[bgStr]+'")';
	}
}

function changeTapSound() {
  // タップ音の差替
  var sound = document.getElementById("touchsoundData").src;
  sound = sound.substring(sound.indexOf("sound"), sound.length);
  document.getElementById("touchsoundData").src = lis_fact_map[sound];
}


function startAnimation() {
  appStartTime = getCurrentTime();
  document.getElementById('loading').removeAttribute("hidden");

  new Scenes();
  new Gnav();
  new View();

  if(regFlg == '1'){
    startAnimationForRegister();
  } else if (guiFlg != '1'){
    startAnimationForTable();
  } else {
    startAnimationForMaintanance();
  }
}


function startAnimationForRegister() {
  location.href = '#';
  ChangeMsgLanguage(regLang);
  // レジ起動時
  // テーブル番号・卓ステータス取得スキップ
  retryPromise(getJson, 1000)
  .then((result) => {
    getMenuBookMaster(true);
  })
}

function startAnimationForTable() {
  location.href = '#';
  ChangeMsgLanguage('jp');
  startMeasuringElapsedTime("tableNoWaiting");
  retryPromise(getJson, 1000)
  .then((result) => {
    additionMessage("[Log       ]", "GetJson完了, 次の処理へ");
    // テーブル番号取得
    getTableNo();
  });
}

function startAnimationForMaintanance() {
  ChangeMsgLanguage('jp');
  slipNo = "999";
  menubook_cd = guiBookCd;
  getQuantityLimit(1);
  changeMenubookLayout(menubook_cd);

  document.getElementById("slideshow").style.height = '400px';
  // 在卓の場合、TOPまで進める
  retryPromise(getJson, 1000)
  .then((result) => {
	    additionMessage("[Log       ]", "GetJson完了, 次の処理へ");
    location.href = '#root/people';
    getMenuBookMaster(true);
  });
}

async function getDataFromDBAtStartUp() {
  apiUrls = getApiUrls()
	var formData = new FormData();

  menubook_obj = await postMessage(formData, apiUrls.menuBookMasterUrl);
  goods_obj = await postMessage(formData, apiUrls.goodsMasterUrl);
  allergy_obj = await postMessage(formData, apiUrls.allergyMasterUrl);
  ng_goods_group_obj = await postMessage(formData, apiUrls.ngGoodsGroupUrl);
  with_goods_obj = await postMessage(formData, apiUrls.withGoodsUrl);
  layout_info_obj = await postMessage(formData, apiUrls.layoutInfoUrl);
  sidelink_info_obj = await postMessage(formData, apiUrls.sideLinkInfoUrl);
  basedishcombo_obj = await postMessage(formData, apiUrls.basedishComboMasterUrl);
  layout_obj = await postMessage(formData, apiUrls.layoutDataUrl);
  submenu_obj = await postMessage(formData, apiUrls.submenuDataUrl);

  getDataFromGenericMaster();
}

function getApiUrls() {
  apiUrls = {
    'menuBookMasterUrl': PHP_EN_ROOT_FOLDER + '/getMenuBookMaster.php',
    'goodsMasterUrl' : PHP_EN_ROOT_FOLDER + '/getGoodsMaster.php',
    'allergyMasterUrl': PHP_EN_ROOT_FOLDER + '/getAllergyMaster.php',
    'ngGoodsGroupUrl': PHP_EN_ROOT_FOLDER + '/getNgGoodsGroup.php',
    'withGoodsUrl': PHP_EN_ROOT_FOLDER + '/getWithGoods.php',
    'layoutInfoUrl': PHP_EN_ROOT_FOLDER + '/getLayoutInfo.php',
    'sideLinkInfoUrl': PHP_EN_ROOT_FOLDER + '/getSideLinkInfo.php',
    'basedishComboMasterUrl': PHP_EN_ROOT_FOLDER + '/getBasedishComboMaster',
    'layoutDataUrl': PHP_EN_ROOT_FOLDER + '/getLayoutData.php',
    'submenuDataUrl': PHP_EN_ROOT_FOLDER + '/getSubmenuData',
  }

  return apiUrls;
}

async function getDataFromGenericMaster() {
  // getGenericMasterAll
  var getGenericMasterAllUrl = PHP_EN_ROOT_FOLDER + '/getGenericMasterAll.php';
  generic_obj = await postMessage(formData, getGenericMasterAllUrl);
  alcl_check_obj = await getSpecificDataFromGenericMaster('alcolFstOnly', 'onOffFlg');
  plasic_bag_obj = await getSpecificDataFromGenericMaster('plasticBag', 'onOffFlg');
  add_hb_disp_flg_obj = await getSpecificDataFromGenericMaster('plasticBag', 'onOffFlg');
  reg_menubook_obj = await getSpecificDataFromGenericMaster('regMenuBookCode', 'menuBookCode');
  quantity_limit_obj = await getSpecificDataFromGenericMaster('ordLimitControl', ORD_LIMIT_CONTROL_MODE);
  time_cash_register_obj = await getSpecificDataFromGenericMaster('regTimeOut', 'setTime');
  time_table_obj = await getSpecificDataFromGenericMaster('noOpeChk', 'setTime');
  file_path_obj = await getSpecificDataFromGenericMaster('noOpeChk', 'filePath');
}

async function getSpecificDataFromGenericMaster(fName, uName) {
  var getGenericMasterUrl = PHP_EN_ROOT_FOLDER + '/getGenericMaster.php';
  formData = new FormData();
	formData.set('fName', fName);
	formData.set('uName', uName);

  var specificObj = await postMessage(formData, getGenericMasterUrl);

  return specificObj;
}