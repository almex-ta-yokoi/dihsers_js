
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

function setLayout() {
  var itemW = 1280;
  var itemH = 800;
  const winW = $(window).width();
  const winH = $(window).height();
  const scaleW = winW / itemW;
  const scaleH = winH / itemH;
  const fixScale = Math.min(scaleW, scaleH);
  const setW = Math.min(winW, itemW * fixScale);
  const setH = Math.min(winH, itemH * fixScale);

  $('#dom_overlay_container').css({
    'transform': 'scale(' + fixScale + ',' + fixScale + ')'
  });

  $('#main_area').width(setW).height(setH);
}
