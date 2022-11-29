
//Animate用
var dom_overlay_container;
// レジ起動フラグ
var regFlg = getParam('regFlg');

// レジ起動時言語
var regLang = getParam('lang');

// レジ起動時端末ID
var termid = getParam('termid');

// 運用保守GUI起動フラグ
var guiFlg = getParam('guiFlg');
var guiBookCd = getParam('guiBookCd');

// レジ起動時ユニークID
var slipinfo = '';
if(regFlg == '1'){
  slipinfo = getParam('slipinfo');
}else{
  slipinfo = null;
}

// alert(getParam('lang'));

/**
 * Get the URL parameter value
 *
 * @param  name {string} パラメータのキー文字列
 * @return  url {url} 対象のURL文字列（任意）
 */
function getParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function init() {
  // $(function (){
  //   starAnimation();
  // });
  // $(window).on('resize', setLayout);
  // setLayout();
}

function setLayout() {
  var itemW = 0;
  var itemH = 0;
  // if(regFlg == '1'){
  //   itemW = 1920;
  //   itemH = 1080;
  // }else{
    itemW = 1280;
    itemH = 800;
  // }
  const winW = $(window).width();
  const winH = $(window).height();
  const scaleW = winW / itemW;
  const scaleH = winH / itemH;
  const fixScale = Math.min(scaleW, scaleH);
  const setW = Math.min(winW, itemW * fixScale);
  const setH = Math.min(winH, itemH * fixScale);
  // if(regFlg == '1'){
  //   $('#dom_overlay_container').css({
  //     'transform': 'scale(' + fixScale*1.5 + ',' + fixScale*1.35 + ')'
  //   });
  // }else{
    $('#dom_overlay_container').css({
      'transform': 'scale(' + fixScale + ',' + fixScale + ')'
    });
  // }
  $('#main_area').width(setW).height(setH);
}