// androidID
var androidID = '';
if(regFlg == '1'){
	// レジ起動の場合
	// androidID = '8b7b843265534ba3';
	androidID = termid;
}else{
	// オーダ端末起動の場合
	//androidID = 'f44cdd20974f4de3';
	androidID = 'e2895de3f847f456';
	//androidID = 'e2895dajifgjaifjaie3f847f456';
	//androidID = WuicTermInfo.getAndroidId();
}
// alert(window.navigator.appVersion);

// メニューブックマスタ(未編集)
var tmp_m_menubook_map = [];

// メニューブックマスタ
var m_menubook_map = [];

// ------オーダーメイドディッシュ用データ------
// 組み合わせ不可商品マスタ
//var m_nggoodsgroup_map = [];

// 商品マスタ
var m_goods_map = [];

// 商品マスタ(未編集)
var tmp_m_goods_map = [];

// 商品マスタ-ハンバーグのみ
var m_goods_hb_map = [];

// 商品マスタ-トッピングのみ
var m_goods_tp_map = [];

// 商品マスタ-ソースのみ
var m_goods_sc_map = [];

// 商品マスタ-ライス・パスタのみ
var m_goods_rp_map = [];

// 商品マスタ-サラダのみ
var m_goods_sr_map = [];

// ベースディッシュマップ
var base_dish_map = [];

// 基本形ディッシュ組合せマスタ(未編集)
var tmp_m_basedishcombo_map = [];

// 基本形ディッシュ組合せマスタ
var m_basedishcombo_map = [];

// 組み合わせ不可商品マスタ
var m_nggoodsgroup_map = [];

//　汎用マスタ(サブメニュー情報)
var submenuData_map = [];

//　レイアウト調整情報
var layoutInfo_map = [];

//　サイドリンクバー情報
var sideLinkInfo_map = [];

// 税管理マスタ
var m_tax_map = [];

// 作成中ディッシュマップ
var create_dish_map = [];

// リセット用ディッシュマップ
var reset_dish_map = [];

// 初回導線有効フラグ
var firstDishMakeFlg = false;

// 初回導線完了フラグ
var firstDishMakeEndFlg = false;

// 初回導線ハンバーグ選択完了フラグ
var firstDishMakeHbEndFlg = false;

// 初回導線トッピング選択完了フラグ
var firstDishMakeTpEndFlg = false;

// 初回導線ライス・パスタ選択完了フラグ
var firstDishMakeRpEndFlg = false;

// 初回導線ソース選択完了フラグ
var firstDishMakeScEndFlg = false;

// 初回導線サラダ選択完了フラグ
var firstDishMakeSrEndFlg = false;

// オーダーメイドディッシュ作成中フラグ
var dishEditingFlg = false;

// オーダーメイドディッシュ確認画面初回遷移フラグ
var firstFinishFlg = false;

mappingList = {"hb":"hamburg","tp":"topping","rp":"rice","sc":"source","sr":"salad"};

// ハンバーグ合計数量
var hb_total = 0;
// トッピング合計数量
var tp_total = 0;
// ライス・パスタ合計数量
var rp_total = 0;
// ソース合計数量
var sc_total = 0;
// サラダ合計数量
var sr_total = 0;

// オーダーメイドディッシュ一覧自動切換え禁止フラグ
var nextBanFlg= true;

var smogOnFlg = false;

// マイディッシュ完成ボタン多重タップ防止フラグ
var niceChoiceFlg = false;

// オーダーメイドディッシュ選択ベース
var ordMadeSelectBaseCode = null;

var MaxOrdTypeNum = 10;

var OrdMadechangeLimitFlg = false;

// ---------------------------------------

// 限定メニュー
limit_goods_map = [];

// // ドリンクメニュー
// drink_goods_map = [];

// // サイドメニュー
// side_goods_map = [];

// // お子様メニュー
// child_goods_map = [];

// // テイクアウトディッシュメニュー
// takeout_dish_goods_map = [];

// // テイクアウトドリンクメニュー
// takeout_drink_goods_map = [];

// // テイクアウトサイドメニュー
// takeout_side_goods_map = [];

// // モーニングメニュー
// morning_goods_map = [];

// // モーニングメニュー(サラダ付)
// morning_goods_map2 = [];

// 購入誘導商品情報
with_goods_map = [];

// レイアウトデータリスト
var layoutData_list;

// 注文確定前データマップ
var bf_order_map = [];

// 注文確定後データマップ
var af_order_map = [];

// 商品マスタ 言語設定(未編集)
var tmp_goods_lng_map;

// 商品マスタ 言語設定
var goods_lng_map = new Map();

// 汎用マスタ-言語設定データ
var general_lng_map = [];

// php実行結果データ格納先
var m_menubook_json = null;
var m_goods_json = null;
var m_nggoodsgroup_json = null;
var m_basedishcombo_json = null;
var layoutData_json = null;
// var lng_json = null;
var ordmadeImg_json = null;
var m_tax_json = null;
var submenuData_json = null;
var regMenuBookCd_json = null;
var plasticBagFunc_json = null;
var addHbDispFlg_json = null;
var with_goods_json = null;
var generic_lng_json = null;
var generic_alclFstOnly_json = null;
var allergy_json = null;
var generic_all_json = null;

// バッシング処理中フラグ
var bassingFlg = false;

// 「オーダーメイドディッシュ」の名称（初期値：日本語）
var ORD_MADE_DISHERS_LANG = "オーダーメイドディッシュ";

// 卓人数
var person = 9;

// 注文数量制御処理モード（quantityLimit：全体の数量制限、coefficient：人数☓係数による数量制限）
var ORD_LIMIT_CONTROL_MODE = "quantityLimit";
// var ORD_LIMIT_CONTROL_MODE = "coefficient";

// 注文数量上限数（通信エラーにより取得出来なかった場合を考慮し、default値に"20"を設定）
var quantityLimit = 20;

// ごいっしょにいかがですか送信情報
var with_goods_ope_map = [];

// 追加ハンバーグのトッピング一覧画面表示ON/OFF
var addHpDispTpFlg = false;

// アルコール確認フラグ
var alcolCheckFlg = false;

// アルコールポップアップ１回制限
var generic_alclFstOnly_map = [];

// アレルギーマスタ全データ
var allergy_map = [];

// アレルギーボタン表示フラグ
var allergyBtnFlg = true;

// 汎用マスタ全データ
var generic_all_map = [];

/**
 * php実行処理1(メニューブックマスタ取得)
 * 　非同期通信で情報を取得する
 *   php実行処理1~6を連続実行。実行後、テーブル取得データの編集処理を実行。
 */
function getMenuBookMasterByText(pushMenubookChangeFlg) {
	stopMeasuringElapsedTime("getMenuBookMasterStart", "getMenuBookMaster完了");
	getGoodsMaster(pushMenubookChangeFlg);
}

function getMenuBookMaster(pushMenubookChangeFlg) {
	startMeasuringElapsedTime("getMenuBookMasterStart");
	getMenuBookMasterByText(pushMenubookChangeFlg);
	return;
	outOparationLog("メニューブックマスタ取得開始");
	document.getElementById('loading').removeAttribute("hidden");
	var timeoutFlg = false;


	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// 通信エラーポップアップ出力処理
			// document.getElementById('loading').setAttribute("hidden","hidden");
			// getDataErrorPopUp();
			// リトライ処理に変更
			timeoutRetryOccur("getMenuBookMaster");
			getMenuBookMaster(pushMenubookChangeFlg);
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
  startMeasuringElapsedTime("PostStartIngetMenuBookMaster");
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/getMenuBookMaster.php',
			success:function(data){
  			stopMeasuringElapsedTime("PostStartIngetMenuBookMaster", "getMenuBookMaster内getMenuBookMaster.php:post完了");
				// メニューブックマスタ取得
				m_menubook_json = data;
				data = null;
				if(m_menubook_json == false || contains(m_menubook_json,CONNECT_ERR_MSG) && !(timeoutFlg)){
					timeoutFlg = true;
					// 通信エラーポップアップ出力処理
					// document.getElementById('loading').setAttribute("hidden","hidden");
					// getDataErrorPopUp();
					// リトライ処理に変更
					failureRetryOcuur("getMenuBookMaster");
					getMenuBookMaster(pushMenubookChangeFlg);
					return false;
				}
			}
		})
	).done(function() {
		if(!(m_menubook_json == false || contains(m_menubook_json,CONNECT_ERR_MSG)) && !(timeoutFlg)){
			timeoutFlg = true;
			// 非同期通信の完了を監視
			outOparationLog("メニューブックマスタ取得終了");
			stopMeasuringElapsedTime("getMenuBookMasterStart", "getMenuBookMaster完了");
			getGoodsMaster(pushMenubookChangeFlg);
		}else{
			timeoutFlg = true;
		}
	})
}

function getGoodsMasterByText(pushMenubookChangeFlg) {
	stopMeasuringElapsedTime("getGoodsMasterStart", "getGoodsMaster完了");
	getAllGeneralData(pushMenubookChangeFlg);
}

/**
 * php実行処理2(商品マスタ取得)
 * 　非同期通信で情報を取得する
 */
function getGoodsMaster(pushMenubookChangeFlg) {
	startMeasuringElapsedTime("getGoodsMasterStart");
	outOparationLog("商品マスタ取得開始");
	getGoodsMasterByText(pushMenubookChangeFlg);
	return;
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// 通信エラーポップアップ出力処理
			// document.getElementById('loading').setAttribute("hidden","hidden");
			// getDataErrorPopUp();
			// リトライ処理に変更
			timeoutRetryOccur("getGoodsMaster");
			getGoodsMaster(pushMenubookChangeFlg);
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
  startMeasuringElapsedTime("PostStartIngetGoodsMaster");
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/getGoodsMaster.php',
			success:function(data){
  			stopMeasuringElapsedTime("PostStartIngetGoodsMaster", "getGoodsMaster内getGoodsMaster.php:post完了" );
				// 商品マスタ取得
				m_goods_json = data;
				data = null;
				if(m_goods_json == false && !(timeoutFlg)){
					timeoutFlg = true;
					// 通信エラーポップアップ出力処理
					// document.getElementById('loading').setAttribute("hidden","hidden");
					// getDataErrorPopUp();
					// リトライ処理に変更
					failureRetryOcuur("getGoodsMaster");
					getGoodsMaster(pushMenubookChangeFlg);
					return false;
				}
			}
		})
	).done(function() {
		if(m_goods_json != false && !(timeoutFlg)){
			timeoutFlg = true;
			// 非同期通信の完了を監視
			outOparationLog("商品マスタ取得終了");
			stopMeasuringElapsedTime("getGoodsMasterStart", "getGoodsMaster完了");
			getAllGeneralData(pushMenubookChangeFlg);
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * php実行処理(汎用マスタデータ全取得)
 * 　非同期通信で情報を取得する
 */
function getAllGeneralDataByText(pushMenubookChangeFlg) {
	getAlclCheck(pushMenubookChangeFlg);
	stopMeasuringElapsedTime("getAllGeneralDataStart", "getAllGeneralData完了");
}

function getAllGeneralData(pushMenubookChangeFlg) {
	startMeasuringElapsedTime("getAllGeneralDataStart");
	getAllGeneralDataByText(pushMenubookChangeFlg);
	return;
	outOparationLog("汎用マスタデータ全取得処理開始");
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// 通信エラーポップアップ出力処理
			// document.getElementById('loading').setAttribute("hidden","hidden");
			// getDataErrorPopUp();
			// リトライ処理に変更
			timeoutRetryOccur("getAllGeneralData");
			getAllGeneralData(pushMenubookChangeFlg);
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
  startMeasuringElapsedTime("PostStartIngetAllGeneralData");
	$.when(
		$.ajax({
			type:'POST',
            url:PHP_EN_ROOT_FOLDER + '/getGenericMasterAll.php',
			success:function(data){
  			stopMeasuringElapsedTime("PostStartIngetAllGeneralData", "getAllGeneralData内getGenericMasterAll.php:post完了" );
				// 商品マスタ取得
				generic_all_json = data;
				data = null;
				if(generic_all_json == false && !(timeoutFlg)){
					timeoutFlg = true;
					// 通信エラーポップアップ出力処理
					// リトライ処理に変更
					failureRetryOcuur("getAllGeneralData");
					getAllGeneralData(pushMenubookChangeFlg);
					return false;
				}
			}
		})
	).done(function() {
		if(generic_all_json != false && !(timeoutFlg)){
			timeoutFlg = true;
			// 非同期通信の完了を監視
			outOparationLog("汎用マスタデータ全取得処理終了");
			stopMeasuringElapsedTime("getAllGeneralDataStart", "getAllGeneralData完了");
			getAlclCheck(pushMenubookChangeFlg);
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * php実行処理(アルコールポップアップ制限フラグ取得)
 * 　非同期通信で情報を取得する
 */
function getAlclCheckByText(pushMenubookChangeFlg) {
	stopMeasuringElapsedTime("getAlclCheckStart", "getAlclCheck完了");
	getAllergyMaster(pushMenubookChangeFlg);
}

function getAlclCheck(pushMenubookChangeFlg) {
	startMeasuringElapsedTime("getAlclCheckStart");
	getAlclCheckByText(pushMenubookChangeFlg);
	return;
	outOparationLog("アルコールポップアップ制限フラグ取得開始");
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// 通信エラーポップアップ出力処理
			// document.getElementById('loading').setAttribute("hidden","hidden");
			// getDataErrorPopUp();
			// リトライ処理に変更
			timeoutRetryOccur("getAlclCheck");
			getAlclCheck(pushMenubookChangeFlg);
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
  startMeasuringElapsedTime("PostStartIngetAlclCheck");
	$.when(
		$.ajax({
			type:'POST',
            url:PHP_EN_ROOT_FOLDER + '/getGenericMaster.php',
            data:{
                'fName':'alcolFstOnly',
                'uName':'onOffFlg'
            },
			success:function(data){
  			stopMeasuringElapsedTime("PostStartIngetAlclCheck", "getAlclCheck内getGenericMaster.php:post完了" );
				// 商品マスタ取得
				generic_alclFstOnly_json = data;
				data = null;
				if(generic_alclFstOnly_json == false && !(timeoutFlg)){
					timeoutFlg = true;
					// 通信エラーポップアップ出力処理
					// リトライ処理に変更
					failureRetryOcuur("getAlclCheck");
					getAlclCheck(pushMenubookChangeFlg);
					return false;
				}
			}
		})
	).done(function() {
		if(generic_alclFstOnly_json != false && !(timeoutFlg)){
			timeoutFlg = true;
			// 非同期通信の完了を監視
			outOparationLog("アルコールポップアップ制限フラグ取得終了");
			stopMeasuringElapsedTime("getAlclCheckStart", "getAlclCheck完了");
			getAllergyMaster(pushMenubookChangeFlg);
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * php実行処理(アルコールポップアップ制限フラグ取得)
 * 　非同期通信で情報を取得する
 */
function getAllergyMasterByText(pushMenubookChangeFlg) {
	stopMeasuringElapsedTime("getAllergyMasterStart", "getAllergyMaster完了");
	getWithGoods(pushMenubookChangeFlg);
}

function getAllergyMaster(pushMenubookChangeFlg) {
	startMeasuringElapsedTime("getAllergyMasterStart");
	getAllergyMasterByText(pushMenubookChangeFlg);
	return;
	outOparationLog("アレルギーマスタ取得開始");
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// リトライ処理
			timeoutRetryOccur("getAllergyMaster");
			getAllergyMaster(pushMenubookChangeFlg);
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
  startMeasuringElapsedTime("PostStartIngetAllergyMaster");
	$.when(
		$.ajax({
			type:'POST',
            url:PHP_EN_ROOT_FOLDER + '/getAllergyMaster.php',
			success:function(data){
  			stopMeasuringElapsedTime("PostStartIngetAllergyMaster", "getAllergyMaster内getAllergyMaster.php:post完了" );
				// 商品マスタ取得
				allergy_json = data;
				data = null;
				if(allergy_json == false && !(timeoutFlg)){
					timeoutFlg = true;
					// リトライ処理
					failureRetryOcuur("getAllergyMaster");
					getAllergyMaster(pushMenubookChangeFlg);
					return false;
				}
			}
		})
	).done(function() {
		if(allergy_json != false && !(timeoutFlg)){
			timeoutFlg = true;
			// 非同期通信の完了を監視
			outOparationLog("アレルギーマスタ取得終了");
			stopMeasuringElapsedTime("getAllergyMasterStart", "getAllergyMaster完了");
			getWithGoods(pushMenubookChangeFlg);
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * php実行処理3(組み合わせ不可商品マスタ取得)
 * 　非同期通信で情報を取得する
 */
function getNgGoodsGroupByText(pushMenubookChangeFlg) {
	stopMeasuringElapsedTime("getNgGoodsGroupStart",  "getNgGoodsGroup完了");
	if(regFlg == '1'){
		// レジ起動時
		getLayoutData(pushMenubookChangeFlg);
	}else{
		getBasedishComboMaster(pushMenubookChangeFlg);
	}
}

function getNgGoodsGroup(pushMenubookChangeFlg) {
	startMeasuringElapsedTime("getNgGoodsGroupStart");
	getNgGoodsGroupByText(pushMenubookChangeFlg);
	return;
	outOparationLog("組み合わせ不可商品マスタ取得開始");
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// 通信エラーポップアップ出力処理
			// document.getElementById('loading').setAttribute("hidden","hidden");
			// getDataErrorPopUp();
			// リトライ処理に変更
			timeoutRetryOccur("getNgGoodsGroup");
			getNgGoodsGroup(pushMenubookChangeFlg);
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
  startMeasuringElapsedTime("PostStartIngetNgGoodsGroup");
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/getNgGoodsGroup.php',
			success:function(data){
  			stopMeasuringElapsedTime("PostStartIngetNgGoodsGroup", "getNgGoodsGroup内getNgGoodsGroup.php:post完了" );
				// 商品マスタ取得
				m_nggoodsgroup_json = data;
				data = null;
				if(m_nggoodsgroup_json == false && !(timeoutFlg)){
					// 通信エラーポップアップ出力処理
					// document.getElementById('loading').setAttribute("hidden","hidden");
					// getDataErrorPopUp();
					// リトライ処理に変更
					failureRetryOcuur("getNgGoodsGroup");
					getNgGoodsGroup(pushMenubookChangeFlg);
					return false;
				}
			}
		})
	).done(function() {
		if(m_nggoodsgroup_json != false && !(timeoutFlg)){
			timeoutFlg = true;
			// 非同期通信の完了を監視
			outOparationLog("組み合わせ不可商品マスタ取得終了");
			stopMeasuringElapsedTime("getNgGoodsGroupStart",  "getNgGoodsGroup完了");
			if(regFlg == '1'){
				// レジ起動時
				getLayoutData(pushMenubookChangeFlg);
			}else{
				getBasedishComboMaster(pushMenubookChangeFlg);
			}
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * php実行処理(購入誘導情報取得)
 * 　非同期通信で情報を取得する
 */
function getWithGoodsByText(pushMenubookChangeFlg) {
	stopMeasuringElapsedTime("getWithGoodsStart", "getWithGoods完了");
	getLayoutInfo(pushMenubookChangeFlg);
}

function getWithGoods(pushMenubookChangeFlg) {
	startMeasuringElapsedTime("getWithGoodsStart");
	getWithGoodsByText(pushMenubookChangeFlg);
	return;
	outOparationLog("ご一緒に販売商品マスタ取得開始");
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// リトライ処理
			timeoutRetryOccur("getWithGoods");
			getWithGoods(pushMenubookChangeFlg);
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
  startMeasuringElapsedTime("PostStartIngetWithGoods");
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/getWithGoods.php',
			success:function(data){
  			stopMeasuringElapsedTime("PostStartIngetWithGoods", "getWithGoods内getWithGoods.php:post完了");
				// 商品マスタ取得
				m_with_goods_json = data;
				data = null;
				if(m_with_goods_json == false && !(timeoutFlg)){
					// リトライ処理
					failureRetryOcuur("getWithGoods");
					getWithGoods(pushMenubookChangeFlg);
					return false;
				}
			}
		})
	).done(function() {
		if(m_with_goods_json != false && !(timeoutFlg)){
			timeoutFlg = true;
			// 非同期通信の完了を監視
			outOparationLog("ご一緒に販売商品マスタ取得終了");
			stopMeasuringElapsedTime("getWithGoodsStart", "getWithGoods完了");
			getLayoutInfo(pushMenubookChangeFlg);
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * php実行処理3(レイアウト調整情報取得)
 * 　非同期通信で情報を取得する
 */
function getLayoutInfoByText(pushMenubookChangeFlg) {
	stopMeasuringElapsedTime("getLayoutInfoStart", "getLayoutInfo完了");
	getSideLinkInfo(pushMenubookChangeFlg);
}

function getLayoutInfo(pushMenubookChangeFlg) {
	startMeasuringElapsedTime("getLayoutInfoStart");
	getLayoutInfoByText(pushMenubookChangeFlg);
	return;
	outOparationLog("レイアウト調整情報取得開始");
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// リトライ処理に変更
			timeoutRetryOccur("getLayoutInfo");
			getLayoutInfo(pushMenubookChangeFlg);
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
  startMeasuringElapsedTime("PostStartIngetLayoutInfo");
	$.when(
  	$.ajax({
  		type:'POST',
      url:PHP_EN_ROOT_FOLDER + '/getLayoutInfo.php',
      // data:{
      //     'fName':'layout',
      //     'uName':'position'
      // },
      success:function(data){
  			stopMeasuringElapsedTime("PostStartIngetLayoutInfo", "getLayoutInfo内getLayoutInfo.php:post完了" );
        layoutInfo_json = data;
				if((layoutInfo_json === false || layoutInfo_json === '') && !(timeoutFlg)){
          timeoutFlg = true;
					failureRetryOcuur("getLayoutInfo");
          getLayoutInfo(pushMenubookChangeFlg);
          return;
				}
      }
    })
	).done(function() {
		if(layoutInfo_json !== false && layoutInfo_json !== '' && !(timeoutFlg)){
			timeoutFlg = true;
			// 非同期通信の完了を監視
			outOparationLog("レイアウト調整情報取得終了");
			stopMeasuringElapsedTime("getLayoutInfoStart", "getLayoutInfo完了");
			getSideLinkInfo(pushMenubookChangeFlg);
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * php実行処理(サイドリンクバー情報取得)
 * 　非同期通信で情報を取得する
 */
function getSideLinkInfoByText(pushMenubookChangeFlg) {
	stopMeasuringElapsedTime("getSideLinkInfoStart", "getSideLinkInfo完了");
	if(regFlg == '1'){
		// レジ起動時
		getBasedishComboMaster(pushMenubookChangeFlg);
	}else{
		getNgGoodsGroup(pushMenubookChangeFlg);
	}
}

function getSideLinkInfo(pushMenubookChangeFlg) {
	startMeasuringElapsedTime("getSideLinkInfoStart");
	getSideLinkInfoByText(pushMenubookChangeFlg);
	return;
	outOparationLog("サイドリンクバー情報取得開始");
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// リトライ処理に変更
			timeoutRetryOccur("getSideLinkInfo");
			getSideLinkInfo(pushMenubookChangeFlg);
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
  startMeasuringElapsedTime("PostStartIngetSideLinkInfo");
	$.when(
    $.ajax({
      type:'POST',
      url:PHP_EN_ROOT_FOLDER + '/getSideLinkInfo.php',
      // data:{
      //     'fName':'layout',
      //     'uName':'position'
      // },
      success:function(data){
  			stopMeasuringElapsedTime("PostStartIngetSideLinkInfo", "getSideLinkInfo内getSideLinkInfo.php:post完了" );
      	sideLinkInfo_json = data;
				if((sideLinkInfo_json === false || sideLinkInfo_json === '') && !(timeoutFlg)){
          timeoutFlg = true;
					failureRetryOcuur("getSideLinkInfo");
          getSideLinkInfo(pushMenubookChangeFlg);
          return;
				}
      }
    })
	).done(function() {
		if(sideLinkInfo_json !== false && sideLinkInfo_json !== '' && !(timeoutFlg)){
			timeoutFlg = true;
			// 非同期通信の完了を監視
			outOparationLog("サイドリンクバー情報取得終了");
			stopMeasuringElapsedTime("getSideLinkInfoStart", "getSideLinkInfo完了");
			if(regFlg == '1'){
				// レジ起動時
				getBasedishComboMaster(pushMenubookChangeFlg);
			}else{
				getNgGoodsGroup(pushMenubookChangeFlg);
			}
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * php実行処理4(基本形ディッシュ組合せマスタ取得)
 * 　非同期通信で情報を取得する
 */
function getBasedishComboMasterByText(pushMenubookChangeFlg) {
	stopMeasuringElapsedTime("getBasedishComboMasterStart", "getBasedishComboMaster完了");
	getLayoutData(pushMenubookChangeFlg);
}

function getBasedishComboMaster(pushMenubookChangeFlg) {
	startMeasuringElapsedTime("getBasedishComboMasterStart");
	getBasedishComboMasterByText(pushMenubookChangeFlg);
	return;
	var timeoutFlg = false;
	outOparationLog("基本形ディッシュ組合せマスタ取得開始");
	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// 通信エラーポップアップ出力処理
			// document.getElementById('loading').setAttribute("hidden","hidden");
			// getDataErrorPopUp();
			// リトライ処理に変更
			timeoutRetryOccur("getBasedishConboMaster");
			getBasedishComboMaster(pushMenubookChangeFlg);
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
  startMeasuringElapsedTime("PostStartIngetBasedishComboMasterStart");
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/getBasedishComboMaster.php',
			success:function(data){
  			stopMeasuringElapsedTime("PostStartIngetBasedishComboMasterStart", "getBasedishComboMaster内getBasedishComboMaster.php:post完了" );
				// 基本形ディッシュ組合せマスタ取得
				m_basedishcombo_json = data;
				data = null;
				if(m_basedishcombo_json == false && !(timeoutFlg)){
					timeoutFlg = true;
					// 通信エラーポップアップ出力処理
					// document.getElementById('loading').setAttribute("hidden","hidden");
					// getDataErrorPopUp();
					// リトライ処理に変更
					failureRetryOcuur("getBasedishComboMaster");
					getBasedishComboMaster(pushMenubookChangeFlg);
					return false;
				}
			}
		})
	).done(function() {
		// 非同期通信の完了を監視
		if(m_basedishcombo_json != false && !(timeoutFlg)){
			timeoutFlg = true;
			outOparationLog("基本形ディッシュ組合せマスタ取得終了");
			stopMeasuringElapsedTime("getBasedishComboMasterStart", "getBasedishComboMaster完了");
			getLayoutData(pushMenubookChangeFlg);
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * php実行処理5(レイアウトデータパス取得)
 * 　非同期通信で情報を取得する
 */
function getLayoutDataByText(pushMenubookChangeFlg) {
	stopMeasuringElapsedTime("getLayoutDataStart", "getLayoutData完了");
	getPlasticBagFunc(pushMenubookChangeFlg);
}

function getLayoutData(pushMenubookChangeFlg) {
	startMeasuringElapsedTime("getLayoutDataStart");
	getLayoutDataByText(pushMenubookChangeFlg);
	return;
	var timeoutFlg = false;
	outOparationLog("imegesフォルダ内ファイル情報取得開始");
	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// 通信エラーポップアップ出力処理
			// document.getElementById('loading').setAttribute("hidden","hidden");
			// getDataErrorPopUp();
			// リトライ処理に変更
			timeoutRetryOccur("getLayoutData");
			getLayoutData(pushMenubookChangeFlg);
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
  startMeasuringElapsedTime("PostStartIngetLayoutData");
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/getLayoutData.php',
			success:function(data){
  			stopMeasuringElapsedTime("PostStartIngetLayoutData", "getLayoutData内getLayoutData.php:post完了" );
				// レイアウトデータパス取得
				layoutData_json = data;
				data = null;
				if(layoutData_json == false && !(timeoutFlg)){
					timeoutFlg = true;
					// 通信エラーポップアップ出力処理
					// document.getElementById('loading').setAttribute("hidden","hidden");
					// getDataErrorPopUp();
					// リトライ処理に変更
					failureRetryOcuur("getLayoutData");
					getLayoutData(pushMenubookChangeFlg);
					return false;
				}
			}
		})
	).done(function() {
		// 非同期通信の完了を監視
		if(layoutData_json != false && !(timeoutFlg)){
			timeoutFlg = true;
			outOparationLog("imegesフォルダ内ファイル情報取得終了");
			stopMeasuringElapsedTime("getLayoutDataStart", "getLayoutData完了");
			getPlasticBagFunc(pushMenubookChangeFlg);
		}else{
			timeoutFlg = true;
		}
	})
}

var plasticBagFlg_reg = false;
var plasticBagFlg_tto = false;
/**
 * php実行処理12(レジ袋機能ONOFF取得)
 * 　非同期通信で情報を取得する
 */
function getPlasticBagFuncByText(pushMenubookChangeFlg) {
	stopMeasuringElapsedTime("getPlasticBagFuncStart", "getPlasticBagFunc完了");
	getAddHbDispTopping(pushMenubookChangeFlg);
}
function getPlasticBagFunc(pushMenubookChangeFlg) {
	startMeasuringElapsedTime("getPlasticBagFuncStart");
	getPlasticBagFuncByText(pushMenubookChangeFlg);
	return;
	outOparationLog("レジ袋機能ONOFF取得開始");
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// 通信エラーポップアップ出力処理
			// document.getElementById('loading').setAttribute("hidden","hidden");
			// getDataErrorPopUp();
			// リトライ処理に変更
			timeoutRetryOccur("getPlasticBagFunc");
			getPlasticBagFunc(pushMenubookChangeFlg);
      return;
		}
	},POST_TIMEOUT_TIME);

  // 非同期通信で設定時間を取得
	startMeasuringElapsedTime("PostStartIngetPlasticBagFunc");
	$.when(
  	$.ajax({
      type:'POST',
      url:PHP_EN_ROOT_FOLDER + '/getGenericMaster.php',
      data:{
      	'fName':'plasticBag',
      	'uName':'onOffFlg'
      },
      
			success:function(data){
				stopMeasuringElapsedTime("PostStartIngetPlasticBagFunc", "getPlasticBagFunc内getGenericMaster.php:post完了");
      	// 結果をJSON形式で取得
				plasticBagFunc_json = data;
				data = null;
				if((plasticBagFunc_json === false || plasticBagFunc_json === '') && !(timeoutFlg)){
        	timeoutFlg = true;
					// 通信エラーポップアップ出力処理
					// document.getElementById('loading').setAttribute("hidden","hidden");
					// getDataErrorPopUp();
					// リトライ処理に変更
					failureRetryOcuur("getPlasticBagFunc");
					getPlasticBagFunc(pushMenubookChangeFlg);
					return;
				}
      }
    })
	).done(function() {
		// 非同期通信の完了を監視
		if(plasticBagFunc_json != false && plasticBagFunc_json != '' && !(timeoutFlg)){
			timeoutFlg = true;
			outOparationLog("レジ袋機能ONOFF取得終了");
			stopMeasuringElapsedTime("getPlasticBagFuncStart", "getPlasticBagFunc完了");
			getAddHbDispTopping(pushMenubookChangeFlg);
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * php実行処理(追加ハンバーグのトッピング欄表示機能ONOFF取得)
 * 　非同期通信で情報を取得する
 */
function getAddHbDispToppingByText(pushMenubookChangeFlg) {
	stopMeasuringElapsedTime("getAddHbDispToppingStart", "getAddHbDispTopping完了");
	getSubmenuData(pushMenubookChangeFlg);
}

function getAddHbDispTopping(pushMenubookChangeFlg) {
	startMeasuringElapsedTime("getAddHbDispToppingStart");
	getAddHbDispToppingByText(pushMenubookChangeFlg);
	return;
	outOparationLog("追加ハンバーグのトッピング欄表示機能ONOFF取得開始");
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// 通信エラーポップアップ出力処理
			// document.getElementById('loading').setAttribute("hidden","hidden");
			// getDataErrorPopUp();
			// リトライ処理に変更
			timeoutRetryOccur("getAddHbDispTopping");
			getAddHbDispTopping(pushMenubookChangeFlg);
      return;
		}
	},POST_TIMEOUT_TIME);

  // 非同期通信で設定時間を取得
	startMeasuringElapsedTime("PostStartIngetAddHbDispTopping");
	$.when(
  	$.ajax({
    	type:'POST',
    	url:PHP_EN_ROOT_FOLDER + '/getGenericMaster.php',
    	data:{
    	  'fName':'addHbDisp',
    	  'uName':'topping'
    	},
    
		success:function(data){
			stopMeasuringElapsedTime("PostStartIngetAddHbDispTopping", "getAddHbDispTopping内getGenericMaster.php:post完了");
      // 結果をJSON形式で取得
			addHbDispFlg_json = data;
			data = null;
			if((addHbDispFlg_json === false || addHbDispFlg_json === '') && !(timeoutFlg)){
    		timeoutFlg = true;
				// 通信エラーポップアップ出力処理
				// document.getElementById('loading').setAttribute("hidden","hidden");
				// getDataErrorPopUp();
				// リトライ処理に変更
				failureRetryOcuur("getAddHbDispTopping");
				getAddHbDispTopping(pushMenubookChangeFlg);
				return;
			}
    }
  })).done(function() {
		// 非同期通信の完了を監視
		if(addHbDispFlg_json != false && addHbDispFlg_json != '' && !(timeoutFlg)){
			timeoutFlg = true;
			outOparationLog("追加ハンバーグのトッピング欄表示機能ONOFF取得終了");
			stopMeasuringElapsedTime("getAddHbDispToppingStart", "getAddHbDispTopping完了");
			// getLanguageFile(pushMenubookChangeFlg);
			if(regFlg == '1'){
				// レジ起動時
				getSubmenuData(pushMenubookChangeFlg);
			}else{
				getOrdMadeImg(pushMenubookChangeFlg);
			}
		}else{
			timeoutFlg = true;
		}
	})
}

// /**
//  * php実行処理6(商品マスタの言語設定ファイル取得)
//  * 　非同期通信で情報を取得する
//  */
// function getLanguageFile(pushMenubookChangeFlg) {
// 	outOparationLog("商品マスタの言語設定ファイル取得開始");
// 	var timeoutFlg = false;

// 	// タイムアウト処理
// 	setTimeout(function(){
// 		if(!(timeoutFlg)){
// 			timeoutFlg = true;
// 			// 通信エラーポップアップ出力処理
// 			// document.getElementById('loading').setAttribute("hidden","hidden");
// 			// getDataErrorPopUp();
// 			// リトライ処理に変更
// 			getLanguageFile(pushMenubookChangeFlg);
// 			return false;
// 		}
// 	},POST_TIMEOUT_TIME);

// 	// 非同期通信で情報を取得
// 	$.when(
// 		$.ajax({
// 			type:'POST',
// 			url:PHP_EN_ROOT_FOLDER + '/getLanguageFile.php',
// 			success:function(data){
// 				// レイアウトデータパス取得
// 				lng_json = data;
// 				data = null;
// 				if(lng_json == false || contains(lng_json,'<b>Warning</b>') && !(timeoutFlg)){
// 					timeoutFlg = true;
// 					// 通信エラーポップアップ出力処理
// 					// document.getElementById('loading').setAttribute("hidden","hidden");
// 					// getDataErrorPopUp();
// 					// リトライ処理に変更
// 					getLanguageFile(pushMenubookChangeFlg);
// 					return false;
// 				}
// 			}
// 		})
// 	).done(function() {
// 		// 非同期通信の完了を監視
// 		if(lng_json != false && !(timeoutFlg)){
// 			timeoutFlg = true;
// 			outOparationLog("商品マスタの言語設定ファイル取得終了");
// 			if(regFlg == '1'){
// 				// レジ起動時
// 				getSubmenuData(pushMenubookChangeFlg);
// 			}else{
// 				getOrdMadeImg(pushMenubookChangeFlg);
// 			}
// 		}else{
// 			timeoutFlg = true;
// 		}
// 	})
// }

/**
 * php実行処理7(オーダーメイドディッシュ完成画像名取得)
 * 　非同期通信で情報を取得する
 */
function getOrdMadeImg(pushMenubookChangeFlg) {
	startMeasuringElapsedTime("getOrdMadeImgStart");
	outOparationLog("オーダーメイドディッシュ完成画像名取得開始");
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// 通信エラーポップアップ出力処理
			// document.getElementById('loading').setAttribute("hidden","hidden");
			// getDataErrorPopUp();
			// リトライ処理に変更
			timeoutRetryOccur("getOrdMadeImg");
			getOrdMadeImg(pushMenubookChangeFlg);
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
	startMeasuringElapsedTime("PostStartIngetOrdMadeImg");
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/getOrdMadeImg.php',
			success:function(data){
				stopMeasuringElapsedTime("PostStartIngetOrdMadeImg", "getOrdMadeImg内getOrdMadeImg.php:post完了");
				// レイアウトデータパス取得
				ordmadeImg_json = data;
				data = null;
				if(ordmadeImg_json == false && !(timeoutFlg)){
					timeoutFlg = true;
					// 通信エラーポップアップ出力処理
					// document.getElementById('loading').setAttribute("hidden","hidden");
					// getDataErrorPopUp();
					// リトライ処理に変更
					failureRetryOcuur("getOrdMadeImg");
					getOrdMadeImg(pushMenubookChangeFlg);
					return false;
				}
			}
		})
	).done(function() {
		// 非同期通信の完了を監視
		outOparationLog("オーダーメイドディッシュ完成画像名取得終了");
		stopMeasuringElapsedTime("getOrdMadeImgStart", "getOrdMadeImg完了");
		if(ordmadeImg_json != false && !(timeoutFlg)){
			timeoutFlg = true;
			// getTaxMaster(pushMenubookChangeFlg);
			getSubmenuData(pushMenubookChangeFlg);
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * php実行処理8(サブメニュー情報取得)
 * 　非同期通信で情報を取得する
 */
function getSubmenuDataByText(pushMenubookChangeFlg) {
	stopMeasuringElapsedTime("getSubmenuDataStart", "getSubmenuData完了");
	if(regFlg == '1'){
		getRegMenuBookCd(pushMenubookChangeFlg);
	}else{
		getAccountKbn(pushMenubookChangeFlg);
	}
}

function getSubmenuData(pushMenubookChangeFlg) {
	startMeasuringElapsedTime("getSubmenuDataStart");
	getSubmenuDataByText(pushMenubookChangeFlg);
	return;
	outOparationLog("サブメニュー情報取得開始");
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// 通信エラーポップアップ出力処理
			// document.getElementById('loading').setAttribute("hidden","hidden");
			// getDataErrorPopUp();
			// リトライ処理に変更
			timeoutRetryOccur("getSubmenuData");
			getSubmenuData(pushMenubookChangeFlg);
      return;
		}
	},POST_TIMEOUT_TIME);

  // 非同期通信で設定時間を取得
	startMeasuringElapsedTime("PostStartIngetSubmenuData");
	$.when(
    $.ajax({
      type:'POST',
      url:PHP_EN_ROOT_FOLDER + '/getSubMenuData.php',
    success:function(data){
			stopMeasuringElapsedTime("PostStartIngetSubmenuData", "getSubMenuData内getSubMenuData.php:post完了");
      // 結果をJSON形式で取得
			submenuData_json = data;
			data = null;
			if((submenuData_json === false || submenuData_json === '') && !(timeoutFlg)){
        timeoutFlg = true;
				// 通信エラーポップアップ出力処理
				// document.getElementById('loading').setAttribute("hidden","hidden");
				// getDataErrorPopUp();
				// リトライ処理に変更
				failureRetryOcuur("getSubmenuData");
				getSubmenuData(pushMenubookChangeFlg);
				return;
			}
    }
  })
	).done(function() {
		// 非同期通信の完了を監視
		if(submenuData_json != false && submenuData_json != '' && !(timeoutFlg)){
			timeoutFlg = true;
			outOparationLog("サブメニュー情報取得終了");
			stopMeasuringElapsedTime("getSubmenuDataStart", "getSubmenuData完了");
			if(regFlg == '1'){
				getRegMenuBookCd(pushMenubookChangeFlg);
			}else{
				getAccountKbn(pushMenubookChangeFlg);
			}
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * php実行処理10(会計ボタン押下可否情報取得)
 * 　非同期通信で情報を取得する
 */
function getAccountKbn(pushMenubookChangeFlg) {
	startMeasuringElapsedTime("getAccountKbnStart");
	if(guiFlg == GUI_CODE){
		load(pushMenubookChangeFlg);
		return;
	}
	outOparationLog("会計ボタン押下可否情報取得開始");
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// 通信エラーポップアップ出力処理
			// document.getElementById('loading').setAttribute("hidden","hidden");
			// getDataErrorPopUp();
			// リトライ処理に変更
			timeoutRetryOccur("getAccountKbn");
			getAccountKbn(pushMenubookChangeFlg);
            return;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で設定時間を取得
	startMeasuringElapsedTime("PostStartIngetAccountKbn");
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_ROOT_FOLDER + '/tto/compass_slip_request.php',
			data:{android_id:androidID,
				term_class:"RTIS1",
				request_id:getCurrentTime()
				},
			success:function(data){
				stopMeasuringElapsedTime("PostStartIngetAccountKbn", "getAccountKbn内compass_slip_request.php:post完了");
				// POST送信終了
				response_json = data;
			}
		})
		).done(function() {
			if(!(timeoutFlg)){
				timeoutFlg = true;
				if(response_json != null && response_json["status"] == 0){
					stopMeasuringElapsedTime("getAccountKbnStart", "getAccountKbn完了");
					if(response_json["result"]["total_value"] != '0'){
						outOparationLog("会計ボタン押下可否情報取得終了-有効化");
						// お会計ボタンを有効にする
						document.getElementById('footer_4').setAttribute('onclick', 'sideOpeFlg = true;touch(); getAccountInfoPost(1);');
						document.getElementById('home_btn3').setAttribute('onclick', 'touch(); getAccountInfoPost(1);');
						load(pushMenubookChangeFlg);
					} else {
						outOparationLog("会計ボタン押下可否情報取得終了-無効化");
						load(pushMenubookChangeFlg);
					}
				}else if(response_json != null && response_json["status"] == '-9001'){
					stopMeasuringElapsedTime("getAccountKbnStart", "getAccountKbn完了");
					outOparationLog("会計ボタン押下可否情報取得終了-無効化");
					// お会計情報がない場合、会計ボタン無効のまま
					load(pushMenubookChangeFlg);
				}else{
					timeoutFlg = true;
					// 通信エラーポップアップ出力処理
					// document.getElementById('loading').setAttribute("hidden","hidden");
					// getDataErrorPopUp();
					// リトライ処理に変更
					failureRetryOcuur("getAccountKbn");
					getAccountKbn(pushMenubookChangeFlg);
					return;
				}
			}
		})
}

/**
 * php実行処理11(精算機用-メニューブックコード取得)
 * 　非同期通信で情報を取得する
 */
function getRegMenuBookCdByText(pushMenubookChangeFlg) {
	stopMeasuringElapsedTime("getRegMenuBookCdStart", "getRegMenuBookCd完了");

	if(showTimeoutFlg){
		getSetTime(pushMenubookChangeFlg);
	}else{
		editAllTableData(pushMenubookChangeFlg);
	}
}

function getRegMenuBookCd(pushMenubookChangeFlg) {
	startMeasuringElapsedTime("getRegMenuBookCdStart");
	getRegMenuBookCdByText(pushMenubookChangeFlg);
	return;

	outOparationLog("精算機用-メニューブックコード取得開始");
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// 通信エラーポップアップ出力処理
			// document.getElementById('loading').setAttribute("hidden","hidden");
			// getDataErrorPopUp();
			// リトライ処理に変更
			timeoutRetryOccur("getRegMenuBookCd");
			getRegMenuBookCd(pushMenubookChangeFlg);
            return;
		}
	},POST_TIMEOUT_TIME);

  // 非同期通信で設定時間を取得
	startMeasuringElapsedTime("PostStartIngetRegMenuBookCd");
	$.when(
        $.ajax({
            type:'POST',
            url:PHP_EN_ROOT_FOLDER + '/getGenericMaster.php',
            data:{
                'fName':'regMenuBookCode',
                'uName':'menuBookCode'
            },
            success:function(data){
			stopMeasuringElapsedTime("PostStartIngetRegMenuBookCd", "getRegMenuBookCd内getGenericMaster.php:post完了");
                // 結果をJSON形式で取得
				regMenuBookCd_json = data;
				data = null;
				if((regMenuBookCd_json === false || regMenuBookCd_json === '') && !(timeoutFlg)){
                    timeoutFlg = true;
					// 通信エラーポップアップ出力処理
					// document.getElementById('loading').setAttribute("hidden","hidden");
					// getDataErrorPopUp();
					// リトライ処理に変更
					failureRetryOcuur("getRegMenuBookCd");
					getRegMenuBookCd(pushMenubookChangeFlg);
					return;
				}
            }
        })
	).done(function() {
		// 非同期通信の完了を監視
		if(regMenuBookCd_json != false && regMenuBookCd_json != '' && !(timeoutFlg)){
			timeoutFlg = true;
			outOparationLog("精算機用-メニューブックコード取得終了");
			stopMeasuringElapsedTime("getRegMenuBookCdStart", "getRegMenuBookCd完了");
			if(showTimeoutFlg){
				getSetTime(pushMenubookChangeFlg);
			}else{
				editAllTableData(pushMenubookChangeFlg);
			}
		}else{
			timeoutFlg = true;
		}
	})
}

var fstCreateFlg = false;
var cngLevel = 10000;
var sideOpeFlg = false;

var levelSelectMap = {};
var tmpLevelPopGoodsCd = "";
var baseCntSelectFlg = false;
/**
 * 階層画面商品ポップアップ表示処理
 * @param 商品コード
 */
function dispLevelPopup(goodsCd){
	outOparationLog("サブメニューポップアップ表示開始,商品コード:"+goodsCd);
	tmpLevelPopGoodsCd = goodsCd;
	// 表示領域大枠を仮でつくる
	// サブメニュー情報をみて、ある場合は選択機能挟む

	// サブメニュー表示初期化
	for(var i = 1;i <= 6;i++){
		document.getElementById("subPattarn"+i).innerHTML = null;
		document.getElementById("subPattarn"+i).classList.add("is-hide");
		document.getElementById("subPattarn"+i).setAttribute("type","");
	}

	// 最後の次へボタン
	var lastNext = null;

	// 選択状況データ初期化
	levelSelectMap = {};
	levelSelectMap["base"] = goodsCd;
	levelSelectMap["sub"] = {};

	// ポップアップタグ取得
	var levelPop = document.getElementById("levelAllPop");
	levelPop.classList.remove("is-hide");

	// 専用テーブル化に合わせてカラムをマッピング
	var clmMapping = {"cValue1":"byType","cValue2":"cTitleMsg","cValue3":"cTitleMsgEn","cValue4":"cTitleMsgKr","cValue5":"cTitleMsgCn"
							,"cValue6":"nGoodsCode","cValue7":"nSubGoodsCode1","cValue8":"nSubGoodsCode2","cValue9":"nSubGoodsCode3","cValue10":"nSubGoodsCode4"
							,"cValue11":"nDefaultPosition","cValue12":"byGoodsNameDispType","cValue13":"cFreeName1","cValue14":"cFreeName1En","cValue15":"cFreeName1Kr"
							,"cValue16":"cFreeName1Cn","cValue17":"cFreeName2","cValue18":"cFreeName2En","cValue19":"cFreeName2Kr","cValue20":"cFreeName2Cn"
							,"cValue21":"cFreeName3","cValue22":"cFreeName3En","cValue23":"cFreeName3Kr","cValue24":"cFreeName3Cn","cValue25":"cFreeName4"
							,"cValue26":"cFreeName4En","cValue27":"cFreeName4Kr","cValue28":"cFreeName4Cn","cValue29":"byDifferenceDispFlg"};

	// ポップアップカウント
	var subDispCnt = 1;
	// ポップアップ内容生成
	for(var i in submenuData_map){
		if(subDispCnt >= 6){
			// ポップアップの設定数の上限は5個まで。
			// 6個目は数量選択ポップアップのみ許容するため
			continue;
		}
		if(submenuData_map[i][clmMapping["cValue6"]] == goodsCd){
			// 反映先ポップアップ領域取得
			var main_div = document.getElementById("subPattarn"+subDispCnt);
			main_div.setAttribute("type",submenuData_map[i][clmMapping["cValue1"]]);
			main_div.classList.add("is-hide");
			if(submenuData_map[i][clmMapping["cValue1"]] == "1" || submenuData_map[i][clmMapping["cValue1"]] == "2" || submenuData_map[i][clmMapping["cValue1"]] == "3"|| submenuData_map[i][clmMapping["cValue1"]] == "5"){
				// 1: サイズ違い選択の場合　2:サブ複数選択の場合　3:サブ１つ選択の場合
				var subMenuData = submenuData_map[i];

				// 共通選択シーン
				main_div.classList.add("p-general-pop");

				// タイトルメッセージ
				var span_rpAdd_msg2 = document.createElement('div');
				if(MSG_CSS_LANG == 'jp'){
					span_rpAdd_msg2.innerHTML = subMenuData[clmMapping["cValue2"]];
				}else if(MSG_CSS_LANG == 'en'){
					span_rpAdd_msg2.innerHTML = subMenuData[clmMapping["cValue3"]];
				}else if(MSG_CSS_LANG == 'kr'){
					span_rpAdd_msg2.innerHTML = subMenuData[clmMapping["cValue4"]];
				}else if(MSG_CSS_LANG == 'cn'){
					span_rpAdd_msg2.innerHTML = subMenuData[clmMapping["cValue5"]];
				}
				span_rpAdd_msg2.setAttribute('style','width:100%;text-align:center;line-height: 115%;margin-top:2%;position:absolute;');
				
				main_div.appendChild(span_rpAdd_msg2);
				var space_div = document.createElement("div");
				space_div.setAttribute('style','width:100%;text-align:center;line-height: 115%;margin-top:2%;');
				space_div.innerHTML = "　<br>　";
				main_div.appendChild(space_div);

				// 一覧表示部
				var div_subMenu_list = document.createElement("div");
				div_subMenu_list.classList.add("div_general_submenu_list");

				var subCnt = 0;
				for(var j = 0; j< 5; j++){
					// 商品件数チェック
					// if(i + 1 == 1 && subMenuData["cValue1"] != "3"){continue} // ベース商品行のためスルー
					if(j + 1 == 1){continue} // ベース商品行のためスルー
					if(subMenuData[clmMapping["cValue"+(j+6)]] == "0"){continue}
					subCnt++;
				}
				// サブメニュー商品
				for(var j = 0; j < 5; j++){
					if(subMenuData[clmMapping["cValue"+(j+6)]] == "0" && j != subMenuData[clmMapping["cValue11"]]){continue} // 未設定の場合スルー
					// if(i + 1 == 1 && subMenuData["cValue1"] != "3"){continue} // ベース商品行のためスルー
					if(j + 1 == 1){continue} // ベース商品行のためスルー
					// if(i + 1 >= 5 && subMenuData["cValue1"] == "3"){continue} // レイアウトが4個までしか対応できない
					if(j + 1 >= 6 && subMenuData[clmMapping["cValue1"]] == "3"){continue} // レイアウトが4個までしか対応できない
					if(j + 1 >= 6 && subMenuData[clmMapping["cValue1"]] == "2"){continue} // レイアウトが4個までしか対応できない
					var a_subGoods = document.createElement("span");
					a_subGoods.classList.add("p-general2-pop-toppings");
					a_subGoods.classList.add("general2_select_"+m_goods_map[goodsCd]['nGoodsCode']);
					a_subGoods.classList.add("general2_select_sub_"+subMenuData[clmMapping["cValue"+(j+6)]]);

					if(j + 1 == 1){
						// 「なし」行の場合、品切れプッシュ通知処理回避のためダミー商品コードセット
						a_subGoods.setAttribute('selectCd',DUMMY_GOODS_CD);
					} else {
						a_subGoods.setAttribute('selectCd',subMenuData[clmMapping["cValue"+(j+6)]]);
					}
					a_subGoods.setAttribute('selectCd',subMenuData[clmMapping["cValue"+(j+6)]]);
					// a_subGoods.setAttribute('id','rice3_'+m_goods_map[goodsCd]['nGoodsCode']);
					a_subGoods.setAttribute('onclick','touch(); generalSubMenuSelect(this,"'+subMenuData[clmMapping["cValue1"]]+'");');
					a_subGoods.setAttribute('style','font-size:65%;line-height:1.1;');
					var span_rice3 = document.createElement('div');

					// 塩分カロリーメッセージ
					var saltCalMsg = "";
					// 件数を確認し、幅、改行を調整
					if(subCnt <= 3){
						saltCalMsg = MSG_ORDMADE_7_2;
						a_subGoods.style.width = "32%";
						a_subGoods.classList.add("select3under");
					} else {
						saltCalMsg = MSG_ORDMADE_7_2.replace("/","<br>");
						a_subGoods.style.width = "";
					}

					var noneFlg = false;
					if(j == subMenuData[clmMapping["cValue11"]] && subMenuData[clmMapping["cValue1"]] == "3"){
						// 一択選択モードの場合、「なし」をデフォルト選択
						a_subGoods.classList.add("general-sub-selected");
						if(subMenuData[clmMapping["cValue"+(j+6)]] == "0"){
							a_subGoods.classList.add("general-sub-none");
							noneFlg = true;
						}
					} else if(j == subMenuData[clmMapping["cValue11"]] && subMenuData[clmMapping["cValue1"]] == "1"){
						// サイズ違いの場合
						// 真ん中をデフォルト選択
						a_subGoods.classList.add("general-sub-selected");
						// a_subGoods.classList.add("general-sub-none");
					}

					// 品切れチェック
					if(!noneFlg && subMenuData[clmMapping["cValue"+(j+6)]] != "0" && m_goods_map[subMenuData[clmMapping["cValue"+(j+6)]]]["bySalesStatusType"] == "2"
					&& !a_subGoods.classList.contains("general-sub-none")
					&& submenuData_map[i][clmMapping["cValue1"]] != "1"){
						// 品切れの場合
						a_subGoods.classList.add("off");
						a_subGoods.classList.add(MSG_CSS_LANG);
					}

					span_rice3.setAttribute('style','padding-top:5%;width:100%;');
					// if
					// (j == subMenuData[clmMapping["cValue11"]] && subMenuData[clmMapping["cValue12"]] == 1){
					// 	// なし表示の場合
					// 	span_rice3.innerHTML = '<div style="height:59px;">'+MSG_COMMON_22+'</div>';
					// }else if(j == subMenuData[clmMapping["cValue11"]] && subMenuData[clmMapping["cValue12"]] == 2){
					// 	// 商品名任意設定の場合
					// 	if(MSG_CSS_LANG == "jp"){
					// 		span_rice3.innerHTML = '<div style="height:59px;">'+subMenuData[clmMapping["cValue13"]]+'</div>';
					// 	} else if(MSG_CSS_LANG == "en") {
					// 		span_rice3.innerHTML = '<div style="height:59px;">'+subMenuData[clmMapping["cValue14"]]+'</div>';
					// 	}
					// } else {
						var subGoodsName = "";
						if(j == 1 && ((MSG_CSS_LANG == "jp" && subMenuData[clmMapping["cValue"+(j+12)]] != "-" && subMenuData[clmMapping["cValue"+(j+12)]] != "")
						|| (MSG_CSS_LANG == "en" && subMenuData[clmMapping["cValue"+(j+13)]] != "-" && subMenuData[clmMapping["cValue"+(j+13)]] != ""))){
							// 商品名任意設定の場合
							if(MSG_CSS_LANG == "jp"){
								subGoodsName = subMenuData[clmMapping["cValue"+(j+12)]];
							} else if(MSG_CSS_LANG == "en") {
								subGoodsName = subMenuData[clmMapping["cValue"+(j+13)]];
							}
						}
						else if(j == 2 && ((MSG_CSS_LANG == "jp" && subMenuData[clmMapping["cValue"+(j+15)]] != "-" && subMenuData[clmMapping["cValue"+(j+15)]] != "")
						|| (MSG_CSS_LANG == "en" && subMenuData[clmMapping["cValue"+(j+16)]] != "-" && subMenuData[clmMapping["cValue"+(j+16)]] != ""))){
							// 商品名任意設定の場合
							if(MSG_CSS_LANG == "jp"){
								subGoodsName = subMenuData[clmMapping["cValue"+(j+15)]];
							} else if(MSG_CSS_LANG == "en") {
								subGoodsName = subMenuData[clmMapping["cValue"+(j+16)]];
							}
						} else if(j == 3 && ((MSG_CSS_LANG == "jp" && subMenuData[clmMapping["cValue"+(j+18)]] != "-" && subMenuData[clmMapping["cValue"+(j+18)]] != "")
						|| (MSG_CSS_LANG == "en" && subMenuData[clmMapping["cValue"+(j+19)]] != "-" && subMenuData[clmMapping["cValue"+(j+19)]] != ""))){
							// 商品名任意設定の場合
							if(MSG_CSS_LANG == "jp"){
								subGoodsName = subMenuData[clmMapping["cValue"+(j+18)]];
							} else if(MSG_CSS_LANG == "en") {
								subGoodsName = subMenuData[clmMapping["cValue"+(j+19)]];
							}
						} else if(j == 4 && ((MSG_CSS_LANG == "jp" && subMenuData[clmMapping["cValue"+(j+21)]] != "-" && subMenuData[clmMapping["cValue"+(j+21)]] != "")
						|| (MSG_CSS_LANG == "en" && subMenuData[clmMapping["cValue"+(j+22)]] != "-" && subMenuData[clmMapping["cValue"+(j+22)]] != ""))){
							// 商品名任意設定の場合
							if(MSG_CSS_LANG == "jp"){
								subGoodsName = subMenuData[clmMapping["cValue"+(j+21)]];
							} else if(MSG_CSS_LANG == "en") {
								subGoodsName = subMenuData[clmMapping["cValue"+(j+22)]];
							}
						} else {
							if(subMenuData[clmMapping["cValue"+(j+6)]] == "0"){
								subGoodsName = MSG_COMMON_22;
							} else {
								subGoodsName = m_goods_map[subMenuData[clmMapping["cValue"+(j+6)]]]["cGoodsName"];
							}
						}

						// 差額計算表示タイプの場合
						var editUnitCost = new BigNumber(0);
						if(submenuData_map[i][clmMapping["cValue29"]] == "1" && submenuData_map[i][clmMapping["cValue1"]] == "1"){
							var tmpUnitCost = new BigNumber(m_goods_map[subMenuData[clmMapping["cValue"+(j+6)]]]["nUnitCost"]).minus(new BigNumber(m_goods_map[subMenuData[clmMapping["cValue6"]]]["nUnitCost"]));
							if(tmpUnitCost > 0){
								editUnitCost = "+"+tmpUnitCost;
							} else if(tmpUnitCost == 0){
								editUnitCost = "";
							} else {
								editUnitCost = tmpUnitCost;
							}
						} else {
							if(subMenuData[clmMapping["cValue"+(j+6)]] == "0"){
								editUnitCost = "";
							} else {
								editUnitCost = new BigNumber(m_goods_map[subMenuData[clmMapping["cValue"+(j+6)]]]["nUnitCost"]);
							}
						}
						var calSaltText = "";
						if(subMenuData[clmMapping["cValue"+(j+6)]] == "0"){
							calSaltText = "";
						} else {
							calSaltText = saltCalMsg.replace('{0}','</div><span class="tNum">'+m_goods_map[subMenuData[clmMapping["cValue"+(j+6)]]]["nCal"]+'</span>')
														.replace('{1}','<span class="tNum">'+m_goods_map[subMenuData[clmMapping["cValue"+(j+6)]]]["nSalt"]+'</span>');
						}
						if(subMenuData[clmMapping["cValue1"]] == "1"){
							// サイズ選択の場合、ベースとの差額表示ではないため、+-記号なし
							span_rice3.innerHTML = '<div style="height:59px;">'+subGoodsName
								+'</div><div style="margin-top:8%;margin-bottom:8%;"><span class="tNum" style="font-weight:bold;font-size:150%;">'
								+editUnitCost+'</span>'+(editUnitCost == "" ? "":MSG_COMMON_6)+
								(m_goods_map[subMenuData[clmMapping["cValue"+(j+6)]]]["nCal"] == 0 && m_goods_map[subMenuData[clmMapping["cValue"+(j+6)]]]["nSalt"] == 0 ? "" :
								calSaltText);
						} else {
							// ベースとの差額表示のため、+-記号あり
							var price = 0;
							if(subMenuData[clmMapping["cValue"+(j+6)]] == "0"){
								price = 0;
							}else {
								price = parseInt(m_goods_map[subMenuData[clmMapping["cValue"+(j+6)]]]["nUnitCost"]);
							}
							var symbol = "+";
							if(subMenuData[clmMapping["cValue29"]] == "1"){
								symbol = "";
							}

							// // 差額計算表示タイプの場合
							// var editUnitCost = new BigNumber(0);
							// if(submenuData_map[i]["cValue1"] == "5"){
							// 	editUnitCost = new BigNumber(m_goods_map[subMenuData["cValue"+(j+6)]]["nUnitCost"]).minus(new BigNumber(m_goods_map[subMenuData["cValue6"]]["nUnitCost"]));
							// } else {
							// 	editUnitCost = new BigNumber(m_goods_map[subMenuData["cValue"+(j+6)]]["nUnitCost"]);
							// }
							if(editUnitCost < 0){
								// マイナス値段の場合は、+記号つけない
								symbol = "";
							}
							if(editUnitCost == ""){
								symbol = "+";
								editUnitCost = 0;
							}
							var priceTag = "";
							if(j == subMenuData[clmMapping["cValue11"]] && subMenuData[clmMapping["cValue"+(j+6)]] == "0" && subMenuData[clmMapping["cValue1"]] == "3"){
								priceTag = '<span class="tNum" style="font-weight:bold;font-size:150%;">'+"　"+'</span>';
							} else {
								priceTag = '<span class="tNum" style="font-weight:bold;font-size:150%;">'+symbol+editUnitCost+'</span>'+MSG_COMMON_6;
							}
							var salCal = "";
							if(subMenuData[clmMapping["cValue"+(j+6)]] == "0"){
								salCal = "";
							} else {
								salCal = m_goods_map[subMenuData[clmMapping["cValue"+(j+6)]]]["nCal"] == 0 && m_goods_map[subMenuData[clmMapping["cValue"+(j+6)]]]["nSalt"] == 0 ? "" :
								calSaltText;
							}
							span_rice3.innerHTML = '<div style="height:59px;">'+subGoodsName
								+'</div><div style="margin-top:8%;margin-bottom:8%;">'
								+priceTag+salCal;
						}
					// }

					a_subGoods.appendChild(span_rice3);
					div_subMenu_list.appendChild(a_subGoods);
				}

				// キャンセルボタン
				var a_cancel2 = document.createElement('a');
				a_cancel2.setAttribute('class','p-general-pop-cancel');
				var span_cancel2 = document.createElement('div');
				span_cancel2.setAttribute('style','padding-top:3%;padding-bottom:3%;');
				span_cancel2.setAttribute('onclick','touch(); levelCancel();');
				document.getElementById("rp_pop_"+m_goods_map[goodsCd]['nGoodsCode']);
				span_cancel2.textContent = MSG_COMMON_3;
				a_cancel2.appendChild(span_cancel2);
				main_div.appendChild(a_cancel2);

				// 次へボタン
				var a_next2 = document.createElement('a');
				a_next2.setAttribute('class','p-general-pop-ok');
				var span_next2 = document.createElement('div');
				span_next2.setAttribute('style','padding-top:3%;padding-bottom:3%;');
				document.getElementById("subPattarn"+(subDispCnt+1)).classList.remove("is-hide");
				span_next2.setAttribute('onclick','touch(); levelNext('+subDispCnt+');');
				span_next2.textContent = MSG_GENERAL_10;
				a_next2.appendChild(span_next2);
				main_div.appendChild(a_next2);

				main_div.appendChild(div_subMenu_list);
				lastNext = span_next2;

				subDispCnt++;
			} else if(submenuData_map[i][clmMapping["cValue1"]] == "4"){
				// サブ数量選択の場合
				var subMenuData = submenuData_map[i];

				var div_pop = document.getElementById("subPattarn"+subDispCnt);

				div_pop.setAttribute('class','p-general-pop');
				div_pop.classList.add("is-hide");
	
				// 追加ハンバーグ選択タイトルメッセージ
				var span_hbAdd_msg2 = document.createElement('div');
				var hbAddMsg2 = "";
				if(MSG_CSS_LANG == "jp"){
					hbAddMsg2 = subMenuData[clmMapping["cValue2"]];
				} else if(MSG_CSS_LANG == "en") {
					hbAddMsg2 = subMenuData[clmMapping["cValue3"]];
				}
				span_hbAdd_msg2.innerHTML = hbAddMsg2;
				span_hbAdd_msg2.setAttribute('style','width:100%;text-align:center;line-height: 115%;margin-top:2%;position:absolute;');
				// var span_hbAdd_msg3 = document.createElement('div');
				// span_hbAdd_msg3.innerHTML = MSG_GENERAL_9;
				// span_hbAdd_msg3.setAttribute('style','width:100%;text-align:center;margin-bottom:3%;line-height: 115%;');
				// div_pop.appendChild(span_hbAdd_msg1);
				div_pop.appendChild(span_hbAdd_msg2);
				// div_pop.appendChild(span_hbAdd_msg3);
	
				// 商品名称・値段・塩分/カロリー
				var hbMap = m_goods_map[subMenuData[clmMapping["cValue7"]]];
				var hbName = hbMap["cGoodsName"];
				// if(hbMap["nGoodsCode"] == "82001" && (hbMap["cGoodsName"] == '追加ハンバーグ' || hbMap["cGoodsName"] == 'Additional Hamburg-steak Patty')){
				// 	// 追加ハンバーグ(82001)の場合、ディッシャーズ独自挙動として
				// 	// 基本ハンバーグ込みの個数表示動作とする
				// 	if(MSG_CSS_LANG == 'jp'){
				// 		hbName = 'ハンバーグ';
				// 	}else if(MSG_CSS_LANG == 'en'){
				// 		hbName = 'Hamburg-steak Patty';
				// 	}else if(MSG_CSS_LANG == 'kr'){
				// 		hbName = 'Hamburg-steak Patty';
				// 	}else if(MSG_CSS_LANG == 'cn'){
				// 		hbName = 'Hamburg-steak Patty';
				// 	}
				// }

				if(((MSG_CSS_LANG == "jp" && subMenuData[clmMapping["cValue13"]] != "-" && subMenuData[clmMapping["cValue13"]] != "")
				|| (MSG_CSS_LANG == "en" && subMenuData[clmMapping["cValue14"]] != "-" && subMenuData[clmMapping["cValue14"]] != ""))){
					// 商品名任意設定の場合
					if(MSG_CSS_LANG == "jp"){
						hbName = subMenuData[clmMapping["cValue13"]];
					} else if(MSG_CSS_LANG == "en") {
						hbName = subMenuData[clmMapping["cValue14"]];
					}
				}
				// var calSaltText = '<br><span class="tNum">'+hbMap["nCal"]+'</span>'+MSG_ORDMADE_7+'<span class="tNum">'+hbMap["nSalt"]+'</span>'+"g";
				var calSaltText = '<br>'+MSG_ORDMADE_7.replace('{0}','<span class="tNum">'+hbMap["nCal"]+'</span>')
													.replace('{1}','<span class="tNum">'+hbMap["nSalt"]+'</span>');

				var span_name = document.createElement('span');
				span_name.setAttribute('class',"p-general-pop-hb-name");
				span_name.innerHTML = hbName
									+'<br><span class="tNum" style="font-weight:bold;font-size:150%;">'+hbMap["nUnitCost"]+'</span>'+MSG_COMMON_6
									+calSaltText;
	
				// 数量箇所
				var div_qntMain = document.createElement('div');
				div_qntMain.classList.add("levelSubCntLine");
				div_qntMain.setAttribute('style','position:relative;margin-top:145px;');

				// 品切れチェック
				if(hbMap["bySalesStatusType"] == "2"){
					// 品切れの場合
					div_qntMain.classList.add("off");
					div_qntMain.classList.add(MSG_CSS_LANG);
				}

				// 数量マイナス
				var a_minus = document.createElement('a');
				var img_minus = document.createElement('img');
				img_minus.setAttribute('src',lis_fact_map["images/select/selectNumBtn1.png"]);
				img_minus.setAttribute('style',"width:9%;height:40%;position:absolute;left:56%;top:25%;");
				if(hbMap["nGoodsCode"] == "82001" && (hbMap["cGoodsName"] == '追加ハンバーグ' || hbMap["cGoodsName"] == 'Additional Hamburg-steak Patty')){
					img_minus.setAttribute('onclick','touch(); generalHbDown('+subDispCnt+","+hbMap["nGoodsCode"]+');');
				} else {
					img_minus.setAttribute('onclick','touch(); generalHbDownNoAddHb('+subDispCnt+","+hbMap["nGoodsCode"]+');');
				}

				a_minus.appendChild(img_minus);
				// 数量
				var div_qnt = document.createElement('div');
				div_qnt.setAttribute('style','text-align: center;margin-left:45%;');
				var p_qnt = document.createElement('p');
				p_qnt.setAttribute('style','font-size:150%;');
				p_qnt.setAttribute('class','tNum level_type_4');
				p_qnt.setAttribute('subCd',hbMap["nGoodsCode"]);
				p_qnt.setAttribute('id','hb_pop_qnt_'+subDispCnt+"_"+hbMap["nGoodsCode"]);
				if(hbMap["nGoodsCode"] == "82001" && (hbMap["cGoodsName"] == '追加ハンバーグ' || hbMap["cGoodsName"] == 'Additional Hamburg-steak Patty')){
					p_qnt.classList.add("addHbFuncFlg");
					p_qnt.textContent = '1';
				} else {
					p_qnt.textContent = '0';
				}
				div_qnt.appendChild(p_qnt);
				div_qnt.innerHTML = MSG_ORDMADE_9+div_qnt.innerHTML;
				// 数量プラス
				var a_plus = document.createElement('a');
				var img_plus = document.createElement('img');
				img_plus.setAttribute('src',lis_fact_map["images/select/selectNumBtn2.png"]);
				img_plus.setAttribute('style',"width:9%;height:40%;position:absolute;left:80%;top:25%;");
				img_plus.setAttribute('onclick','touch(); generalHbUp('+subDispCnt+","+hbMap["nGoodsCode"]+');');
				a_plus.appendChild(img_plus);
	
				div_qntMain.appendChild(span_name);
				div_qntMain.appendChild(a_minus);
				div_qntMain.appendChild(div_qnt);
				div_qntMain.appendChild(a_plus);
				div_pop.appendChild(div_qntMain);
	
				// キャンセルボタン
				var a_cancel = document.createElement('a');
				a_cancel.setAttribute('class','p-general-pop-cancel');
				var span_cancel = document.createElement('div');
				span_cancel.setAttribute('style','padding-top:3%;padding-bottom:3%;');
				span_cancel.setAttribute('onclick','touch(); levelCancel();');
				document.getElementById("hb_pop_"+m_goods_map[goodsCd]['nGoodsCode']);
				span_cancel.textContent = MSG_COMMON_3;
				a_cancel.appendChild(span_cancel);
				div_pop.appendChild(a_cancel);
	
				// 次へボタン
				var a_next = document.createElement('a');
				a_next.setAttribute('class','p-general-pop-ok');
				var span_next = document.createElement('div');
				span_next.setAttribute('style','padding-top:3%;padding-bottom:3%;');
				span_next.setAttribute('onclick','touch(); levelNext('+subDispCnt+');');
				span_next.textContent = MSG_GENERAL_10;
				a_next.appendChild(span_next);
				div_pop.appendChild(a_next);

				lastNext = span_next;
				subDispCnt++;
			} else if(submenuData_map[i][clmMapping["cValue1"]] == "6"){
				// 文言表示のみポップアップの場合　※パンケーキの注意喚起ポップアップ対応
				// サブ数量選択の場合
				var subMenuData = submenuData_map[i];

				var div_pop = document.getElementById("subPattarn"+subDispCnt);

				div_pop.setAttribute('class','p-general-pop');
				div_pop.classList.add("is-hide");
	
				// 追加ハンバーグ選択タイトルメッセージ
				var span_hbAdd_msg2 = document.createElement('div');
				var hbAddMsg2 = "";
				if(MSG_CSS_LANG == "jp"){
					hbAddMsg2 = subMenuData[clmMapping["cValue2"]];
				} else if(MSG_CSS_LANG == "en") {
					hbAddMsg2 = subMenuData[clmMapping["cValue3"]];
				}
				span_hbAdd_msg2.innerHTML = hbAddMsg2;
				span_hbAdd_msg2.setAttribute('style','width:100%;text-align:center;line-height: 150%;margin-top:2%;position:absolute;');
				div_pop.appendChild(span_hbAdd_msg2);

	
				// キャンセルボタン
				var a_cancel = document.createElement('a');
				a_cancel.setAttribute('class','p-general-pop-cancel');
				var span_cancel = document.createElement('div');
				span_cancel.setAttribute('style','padding-top:3%;padding-bottom:3%;');
				span_cancel.setAttribute('onclick','touch(); levelCancel();');
				document.getElementById("hb_pop_"+m_goods_map[goodsCd]['nGoodsCode']);
				span_cancel.textContent = MSG_COMMON_3;
				a_cancel.appendChild(span_cancel);
				div_pop.appendChild(a_cancel);
	
				// 次へボタン
				var a_next = document.createElement('a');
				a_next.setAttribute('class','p-general-pop-ok');
				var span_next = document.createElement('div');
				span_next.setAttribute('style','padding-top:3%;padding-bottom:3%;');
				span_next.setAttribute('onclick','touch(); levelNext('+subDispCnt+');');
				span_next.textContent = MSG_GENERAL_10;
				a_next.appendChild(span_next);
				div_pop.appendChild(a_next);

				lastNext = span_next;
				subDispCnt++;
			}
		}
	}

	// 数量選択ポップアップ生成
	var div_pop_cnt = document.getElementById("subPattarn"+(subDispCnt));
	var roop_map = m_goods_map;


	// 商品数量選択ポップアップシーン
	div_pop_cnt.setAttribute('class','p-general-pop');
	div_pop_cnt.setAttribute('type','999');
	div_pop_cnt.classList.add("is-hide");
	// 商品数量選択タイトルメッセージ
	var span_cntAdd_msg2 = document.createElement('div');
	var goodsName = m_goods_map[goodsCd]["cGoodsName"];
	if(contains(goodsName,"<base>") && contains(goodsName,"</base>")){
		goodsName = goodsName.substring(goodsName.indexOf("<base>"), goodsName.indexOf("</base>"));
	}
	span_cntAdd_msg2.innerHTML = MSG_GENERAL_14_2.replace('{0}',goodsName);
	span_cntAdd_msg2.setAttribute('style','width:100%;text-align:center;line-height: 115%;margin-top:2%;position:absolute;');
	// 英語の文字量が多いため調整
	if(MSG_CSS_LANG == "jp"){
		span_cntAdd_msg2.setAttribute('style','width:100%;text-align:center;line-height: 115%;margin-top:2%;position:absolute;');
	} else {
		span_cntAdd_msg2.setAttribute('style','width:100%;text-align:center;line-height: 100%;margin-top:2%;position:absolute;');
	}
	div_pop_cnt.appendChild(span_cntAdd_msg2);
	// 数量箇所
	var div_qntMain = document.createElement('div');
	div_qntMain.setAttribute('style','position:relative;left:20%;');
	// 値段
	var price_span = document.createElement('span');
	price_span.innerHTML = '<span style="font-weight:bold;font-size:150%;" class="tNum qntPrice">'+m_goods_map[levelSelectMap["base"]]["nUnitCost"]+'</span>'+MSG_COMMON_6;
	price_span.setAttribute('class',"tNum");
	price_span.setAttribute('style',"width:40%;height:40%;position:absolute;left:-3%;top:10%;");
	// 数量マイナス
	var a_minus = document.createElement('a');
	var img_minus = document.createElement('img');
	img_minus.setAttribute('src',lis_fact_map["images/select/selectNumBtn1.png"]);
	img_minus.setAttribute('style',"width:9%;height:40%;position:absolute;left:33%;top:25%;");
	img_minus.setAttribute('onclick','touch(); generalCntDown('+m_goods_map[goodsCd]['nGoodsCode']+');');
	a_minus.appendChild(img_minus);
	// 数量
	var div_qnt = document.createElement('div');
	div_qnt.setAttribute('style','text-align: center;margin-left:0%;');
	var p_qnt = document.createElement('p');
	p_qnt.setAttribute('style','font-size:150%;');
	p_qnt.setAttribute('id','cnt_pop_qnt_'+m_goods_map[goodsCd]['nGoodsCode']);
	p_qnt.setAttribute('class','tNum');
	p_qnt.classList.add("level_type_999");
	p_qnt.textContent = '1';
	div_qnt.appendChild(p_qnt);
	div_qnt.innerHTML = MSG_ORDMADE_9+div_qnt.innerHTML;
	// 数量プラス
	var a_plus = document.createElement('a');
	var img_plus = document.createElement('img');
	img_plus.setAttribute('src',lis_fact_map["images/select/selectNumBtn2.png"]);
	img_plus.setAttribute('style',"width:9%;height:40%;position:absolute;left:58%;top:25%;");
	img_plus.setAttribute('onclick','touch(); generalCntUp('+m_goods_map[goodsCd]['nGoodsCode']+');');
	a_plus.appendChild(img_plus);
	var space_div = document.createElement("div");
	// space_div.innerHTML = "　<br>　";

	// 英語の文字量が多いため調整
	if(MSG_CSS_LANG == "jp"){
		space_div.style.height = "150px";
	} else {
		space_div.style.height = "160px";
	}

	div_pop_cnt.appendChild(space_div);
	if(LEVEL_POP_PRICE_FLG && contains(location.href,"root/level")){
		// 値段表示ONの場合
		div_qntMain.appendChild(price_span);
		div_qntMain.setAttribute('style','position:relative;left:20%;');
	} else {
		div_qntMain.setAttribute('style','position:relative;left:0%;');
	}
	div_qntMain.appendChild(a_minus);
	div_qntMain.appendChild(div_qnt);
	div_qntMain.appendChild(a_plus);
	div_pop_cnt.appendChild(div_qntMain);

	// キャンセルボタン
	var a_cancel = document.createElement('a');
	a_cancel.setAttribute('class','p-general-pop-cancel');
	var span_cancel = document.createElement('div');
	span_cancel.setAttribute('style','padding-top:3%;padding-bottom:3%;');
	span_cancel.setAttribute('onclick','touch(); levelCancel();');
	document.getElementById("cnt_pop_"+m_goods_map[goodsCd]['nGoodsCode']);
	span_cancel.textContent = MSG_COMMON_3;
	a_cancel.appendChild(span_cancel);
	div_pop_cnt.appendChild(a_cancel);

	// 決定ボタン
	var a_next = document.createElement('a');
	a_next.setAttribute('class','p-general-pop-ok');
	var span_next = document.createElement('div');
	span_next.setAttribute('style','padding-top:3%;padding-bottom:3%;');
	span_next.setAttribute('onclick','touch();levelGetSelectData();levelCancel();');
	span_next.textContent = MSG_GENERAL_13;
	a_next.appendChild(span_next);
	div_pop_cnt.appendChild(a_next);


	if(subDispCnt == 1 && m_goods_map[goodsCd]["bySelectCntFlg"] != 1){
		// 全ポップアップ表示なし
		levelGetSelectData();levelCancel();
		return;
	} else if(m_goods_map[goodsCd]["bySelectCntFlg"] != 1){
		// 数量選択ポップアップ表示なし
		lastNext.setAttribute('onclick','touch();levelGetSelectData();levelCancel();');
		lastNext.textContent = MSG_GENERAL_13;
	}


	lastNext = span_next;

	// １つ目ポップアップ表示
	document.getElementById("subPattarn1").classList.remove("is-hide");

	outOparationLog("サブメニューポップアップ表示終了,商品コード:"+goodsCd+",ポップアップページ数:"+subDispCnt);
}

var ordFixAfDispList = [];
var ordFixAfDispId = "0";
var currentDispId = "";
/**
 * 階層画面商品詳細ボタン処理
 * @param 画面ID
 */
function levelDispGoodsDetail(dispId){
	var time = 300;
	if(sideOpeFlg || contains(location.href,"root/drink")){
		time = 0;
	}
	setTimeout(function(){
	if(generic_alclFstOnly_map[1]["cValue1"] == 0){
		// アルコールポップアップ表示１回制限がOFFの場合
		alcolCheckFlg = false;
	}

	// 表示中画面ID保存
	currentDispId = dispId;
	if(contains(location.href,"root/order/order-select") && levelOrdMadePop == 0){
        // オーダーメイド中の場合、ポップアップ挟む
        levelOrdMadePop = 2;
		document.getElementById('dialog_txt').innerHTML = W_2001;
		changeSideLnkFunc(999);
        // Data.data['scenes']['dialog'].onEntry();
        return;
	}
	levelOrdMadePop = 0;

	if(sideOpeFlg){
		outOparationLog("商品詳細画面レイアウト反映開始-サイドリンクバー操作,画面ID:"+dispId);
	} else {
		outOparationLog("商品詳細画面レイアウト反映開始-ボタン操作,画面ID:"+dispId);
	}
	sideOpeFlg = false;

	// 商品ポップアップを閉じる
	levelCancel();

	// 注文確定画面-他のメニューを注文するボタン遷移先画面を判定
	if(ordFixAfDispList[cngLevel] == ""){
		ordFixAfDispId = cngLevel;
	}

	// 一旦初期化
	var detailItems = document.getElementsByClassName("levelGoodsDetailItems");
	for(var i = 0; i < detailItems.length; i++){
		detailItems[i].parentNode.removeChild(detailItems[i]);
		i--;
	}

	var tmpLine = null;
	for(var line in layoutInfo_map){
		if(layoutInfo_map[line]["nMenuBookCode"] != menubook_cd){
			continue;
		}
		if(layoutInfo_map[line]["nDispId"] == dispId){
			// 対象の画面情報データの場合
			if(layoutInfo_map[line]["nDetailDispType"] == "2" || layoutInfo_map[line]["nDetailDispType"] == "3" || layoutInfo_map[line]["nDetailDispType"] == "4"){
				// 汎用メニュー画面の場合
				if(layoutInfo_map[line]["nDispType"] == "7"){
					// メニュータイトルの場合
					var general_title = document.getElementById("generalTitle");
					general_title.textContent = layoutInfo_map[line]["cText"+MSG_CSS_LANG];
				} else if(layoutInfo_map[line]["nDispType"] == "4"){
					// 背景画像の場合
					// 汎用メニュー画面大枠タグ取得
					var general_bg = document.getElementById("kids-bg");
					if(layoutInfo_map[line]["nDetailDispType"] == "3"){
						// ドリンクの場合、ドリンクメニュー画面大枠タグで取得し直し
						general_bg = document.getElementById("drink-bg");
					}
					var reg = new RegExp(/^[\d_]*$/);
					if(reg.test(layoutInfo_map[line]["cDefaultImagePath"])){
						// 数値&"_"のみのデータの場合、継承先画面のキーと判定
						var pathSp = layoutInfo_map[line]["cDefaultImagePath"].split("_");
						var getMenuBookCd = pathSp[0];
						var getDispId = pathSp[1];
						var getItemId = pathSp[2];
						var findFlg = false;
						for(var roop in layoutInfo_map){
							if(layoutInfo_map[roop]["nMenuBookCode"] == getMenuBookCd
							&& layoutInfo_map[roop]["nDispId"] == getDispId
							&& layoutInfo_map[roop]["nItemId"] == getItemId){
								general_bg.style.backgroundImage = "url("+lis_fact_map[generateLangImgPath(layoutInfo_map[roop]["cDefaultImagePath"])]+")";
								findFlg = true;
								break;
							}
						}
						if(!findFlg){
							general_bg.style.backgroundImage = "url("+")";
						}
						// general_bg.style.backgroundImage = "url("+lis_fact_map[generateLangImgPath(layoutInfo_map[layoutInfo_map[line]["cDefaultImagePath"]]["cDefaultImagePath"])]+")";
					} else {
						// それ以外は通常処理

						general_bg.style.backgroundImage = "url("+lis_fact_map[generateLangImgPath(layoutInfo_map[line]["cDefaultImagePath"])]+")";
					}
				} else if(layoutInfo_map[line]["nDispType"] == "2"){
					var homeDisp = document.getElementById("kids-bg");
					if(layoutInfo_map[line]["nDetailDispType"] == "3"){
						homeDisp = document.getElementById("drink-bg");
					}
					// テキスト文言の場合
					var new_txt = document.createElement("div");
					new_txt.classList.add("levelGoodsDetailItems");
					// 選択中言語のテキストをセット
					new_txt.innerHTML = layoutInfo_map[line]["cText"+MSG_CSS_LANG];
	
					new_txt.style.display = "block";
					new_txt.style.position = "absolute";
					if(layoutInfo_map[line]["nVerticalFlg"] == "1"){
						// 縦文字設定の場合
						new_txt.style.writingMode = "vertical-rl";
					}
					new_txt.id = "levelItem_"+layoutInfo_map[line]["nDispId"]+"_"+layoutInfo_map[line]["nItemId"];
					new_txt.classList.add("levelItems");
	
					if(layoutInfo_map[line]["nDispFlg"] == 0){
						// 表示無効の場合
						new_txt.style.display = "none";
					} else {
						new_txt.style.display = "block";
					}

					// フォントサイズ
					new_txt.style.fontSize = layoutInfo_map[line]["nFontSize"+MSG_CSS_LANG]+DISP_UNIT;
					// フォントカラー
					new_txt.style.color = layoutInfo_map[line]["cColor"+MSG_CSS_LANG];
					// フォント太さ
					new_txt.style.fontWeight = layoutInfo_map[line]["nFontWeight"+MSG_CSS_LANG];
					// 斜体
					if(layoutInfo_map[line]["nItalic"+MSG_CSS_LANG] == "1"){
						new_txt.style.fontStyle = "italic";
					} else {
						new_txt.style.fontStyle = "normal";
					}

					// 高さ
					new_txt.style.height = layoutInfo_map[line]["nHeight"+MSG_CSS_LANG]+DISP_UNIT;
					// 幅
					new_txt.style.width = layoutInfo_map[line]["nWidth"+MSG_CSS_LANG]+DISP_UNIT;
					// Y軸
					new_txt.style.top = layoutInfo_map[line]["nDispPosition_Y"+MSG_CSS_LANG]+DISP_UNIT;
					// X軸
					new_txt.style.left = layoutInfo_map[line]["nDispPosition_X"+MSG_CSS_LANG]+DISP_UNIT;
					homeDisp.appendChild(new_txt);

				} else if(layoutInfo_map[line]["nDispType"] == 3){
					var homeDisp = document.getElementById("kids-bg");
					if(layoutInfo_map[line]["nDetailDispType"] == "3"){
						homeDisp = document.getElementById("drink-bg");
					}

					// 画像の場合
					var new_img = document.createElement("img");
					new_img.classList.add("levelGoodsDetailItems");
					// 選択中言語の画像をセット
					new_img.src = lis_fact_map[generateLangImgPath(layoutInfo_map[line]["cDefaultImagePath"])];

					new_img.style.display = "block";
					new_img.style.position = "absolute";
					new_img.id = "levelItem_"+layoutInfo_map[line]["nDispId"]+"_"+layoutInfo_map[line]["nItemId"];
					new_img.classList.add("levelItems");

					if(layoutInfo_map[line]["nDispFlg"] == 0){
						// 表示無効の場合
						new_img.style.display = "none";
					} else {
						new_img.style.display = "block";
					}

					// 高さ
					new_img.style.height = layoutInfo_map[line]["nHeight"+MSG_CSS_LANG]+DISP_UNIT;
					// 幅
					new_img.style.width = layoutInfo_map[line]["nWidth"+MSG_CSS_LANG]+DISP_UNIT;
					// Y軸
					new_img.style.top = layoutInfo_map[line]["nDispPosition_Y"+MSG_CSS_LANG]+DISP_UNIT;
					// X軸
					new_img.style.left = layoutInfo_map[line]["nDispPosition_X"+MSG_CSS_LANG]+DISP_UNIT;
	
					// 表示サイズ
					var size = parseInt(layoutInfo_map[line]["nDispSize"+MSG_CSS_LANG]) * 0.01;
					new_img.style.transform = "scale("+size+", "+size+")";
					new_img.setAttribute("size",size);

					homeDisp.appendChild(new_img);
				} 
				else if(layoutInfo_map[line]["nDispType"] == "8" && layoutInfo_map[line]["nDetailDispType"] == "3"){
					// コップ画像の場合
					// ドリンクpreview取得
					var dView = document.getElementById('drinkMain');

					// ドリンクpreviewの状態をリセットする
					dView.innerHTML = null;
					
					var p_prev = document.createElement('p');
					
					// prevに空のドリンクを表示
					p_prev.setAttribute('class', 'p-drink-main__base');
					var p_prev_img = document.createElement('img');
					p_prev_img.id = "drink-cup";
					p_prev_img.setAttribute('src', lis_fact_map[generateLangImgPath(layoutInfo_map[line]["cDefaultImagePath"])]);
					p_prev.appendChild(p_prev_img);
					dView.appendChild(p_prev);
				}
				else if(layoutInfo_map[line]["nDispType"] == "9" && layoutInfo_map[line]["nDetailDispType"] == "3"){
					// ボード画像の場合
					// ドリンクpreview取得
					var drinkMain = document.getElementById('drinkMain');

					// drinkMain.style.backgroundImage = "url(./"+generateLangImgPath(layoutInfo_map[line]["cDefaultImagePath"])+")";
					drinkMain.style.backgroundImage = "url("+lis_fact_map[generateLangImgPath(layoutInfo_map[line]["cDefaultImagePath"])]+")";
				}
				tmpLine = line;
			}
		}
	}
	// 遷移先商品詳細画面のアルコール存在チェック
	var alclOn = false;
	// layoutInfo_map[tmpLine]["nDispMenuType"]
	for(var mgm in m_goods_map){
		if(tmpLine != null && m_goods_map[mgm]["byMenuType"] == layoutInfo_map[tmpLine]["nDispMenuType"]
			&& m_goods_map[mgm]["byAlcohol"] == "1"){
			// アルコール商品が見つかった場合
			alclOn = true;
		}
	}

	// TODO：オーダーメイドメニューレイアウト画面は、一旦何も設定されていない場合表示とする
	// 本格的に設定化に入る際対応
	if(tmpLine == null){
		basedishcomboMstEdit();
		logging_basedishcombo_map("basedishcomboMstEdit1", m_basedishcombo_map)
		ordermadeBaseImage();
		orderMadeDishBaseSelectReset();
		orderMadeDishBaseSelectCheck(1);
		orderMadeDishBaseSelectCheck(2);
		orderMadeDishBaseSelectCheck(3);
		orderMadeDishBaseSelectCheck(4);
		orderMadeDishBaseSelectCheck(5);
		orderMadeDishBaseSelectCheck(6);
		location.href = "#root/ordermade";
	} else 

	if(layoutInfo_map[tmpLine]["nDetailDispType"] == "2"){
		// 遷移先が汎用メニュー画面の場合
		if(alclOn && !alcolCheckFlg){
			Data.data['scenes']['dialog17'].onEntry();
			document.getElementById("alcohol_yes").setAttribute("onclick",("alcolCheckFlg = true;"+'createGeneralDetail('+layoutInfo_map[tmpLine]["nDispMenuType"]+');'+
			'location.href = "#root/kids";'+
			'outOparationLog("商品詳細画面レイアウト反映終了,画面ID:'+dispId+',画面種別判定結果:汎用メニュー");'+
			"Data.data['scenes']['dialog17'].onExit();"));
			document.getElementById("alcohol_no").setAttribute("onclick",("Data.data['scenes']['dialog17'].onExit();"));
		} else {
			createGeneralDetail(layoutInfo_map[tmpLine]["nDispMenuType"]);
			location.href = "#root/kids";
			outOparationLog("商品詳細画面レイアウト反映終了,画面ID:"+dispId+",画面種別判定結果:汎用メニュー");
		}
	} else if(layoutInfo_map[tmpLine]["nDetailDispType"] == "4"){
		// 遷移先が汎用メニュー(限定)画面の場合
		basedishcomboMstEdit();
		logging_basedishcombo_map("basedishcomboMstEdit2", m_basedishcombo_map)
		if(alclOn && !alcolCheckFlg){
			Data.data['scenes']['dialog17'].onEntry();
			document.getElementById("alcohol_yes").setAttribute("onclick",("alcolCheckFlg = true;"+'createGeneralDetail(99);'+
			'location.href = "#root/kids";'+
			'outOparationLog("商品詳細画面レイアウト反映終了,画面ID:'+dispId+',画面種別判定結果:汎用メニュー(限定)");'+
			"Data.data['scenes']['dialog17'].onExit();"));
			document.getElementById("alcohol_no").setAttribute("onclick",("Data.data['scenes']['dialog17'].onExit();"));
		} else {
			createGeneralDetail(99);
			location.href = "#root/kids";
			outOparationLog("商品詳細画面レイアウト反映終了,画面ID:"+dispId+",画面種別判定結果:汎用メニュー(限定)");
		}
	} else if(layoutInfo_map[tmpLine]["nDetailDispType"] == "3"){
		// 遷移先がドリンクメニュー画面の場合
		if(alclOn && !alcolCheckFlg){
			Data.data['scenes']['dialog17'].onEntry();
			document.getElementById("alcohol_yes").setAttribute("onclick",("alcolCheckFlg = true;"+
			'createDrinkDetail('+layoutInfo_map[tmpLine]["nDispMenuType"]+', 1);'+
			'location.href = "#root/drink";'+
			'outOparationLog("商品詳細画面レイアウト反映終了,画面ID:'+dispId+',画面種別判定結果:ドリンクメニュー");'+
			"Data.data['scenes']['dialog17'].onExit();"));
			document.getElementById("alcohol_no").setAttribute("onclick",("Data.data['scenes']['dialog17'].onExit();"));
		} else {
			createDrinkDetail(layoutInfo_map[tmpLine]["nDispMenuType"], 1);
			location.href = "#root/drink";
			outOparationLog("商品詳細画面レイアウト反映終了,画面ID:"+dispId+",画面種別判定結果:ドリンクメニュー");
		}
	} else if(layoutInfo_map[tmpLine]["nDetailDispType"] == "1"){
		basedishcomboMstEdit();
		logging_basedishcombo_map("basedishcomboMstEdit3", m_basedishcombo_map)
		ordermadeBaseImage();
		orderMadeDishBaseSelectReset();
		orderMadeDishBaseSelectCheck(1);
		orderMadeDishBaseSelectCheck(2);
		orderMadeDishBaseSelectCheck(3);
		orderMadeDishBaseSelectCheck(4);
		orderMadeDishBaseSelectCheck(5);
		orderMadeDishBaseSelectCheck(6);
		location.href = "#root/ordermade";
		outOparationLog("商品詳細画面レイアウト反映終了,画面ID:"+dispId+",画面種別判定結果:オーダーメイドメニュー");
	}
	},time);
}

/**
 * 階層ポップアップキャンセル処理
 */
function levelCancel() {
	var levelAllPop = document.getElementById("levelAllPop");
	if(!levelAllPop.classList.contains("is-hide")){
		outOparationLog("サブメニューポップアップ閉じる処理");
		levelAllPop.classList.add("is-hide");
	}
}

/**
 * 階層ポップアップ次へ処理
 */
function levelNext(subDispCnt) {
	outOparationLog("サブメニューポップアップ次へ処理,ポップアップページ:"+subDispCnt);
	var nextPage = document.getElementById("subPattarn"+(subDispCnt+1));
	if(nextPage.getAttribute("type") == "999"){
		// 次が数量選択ポップアップの場合
		// 入力値をマップに更新
		levelGetBfSelectData();
		// 値段計算
		var qnt_price = 0;
		// ベース価格追加
		qnt_price += parseInt(m_goods_map[levelSelectMap["base"]]["nUnitCost"]);
		// サブ価格追加
		for(var lsm in levelSelectMap["sub"]){
			qnt_price += parseInt(m_goods_map[levelSelectMap["sub"][lsm]["goodsCd"]]["nUnitCost"]) * parseInt(levelSelectMap["sub"][lsm]["cnt"]);
		}
		// 価格表示タグ取得
		var priceTag = nextPage.getElementsByClassName("qntPrice")[0];
		if(priceTag != null){
			// サブ込みの値段を再反映
			priceTag.textContent = qnt_price;
		}
	}
	document.getElementById("subPattarn"+subDispCnt).classList.add("is-hide");
	nextPage.classList.remove("is-hide");
}

/**
 * 階層ポップアップ入力値データ取得処理(数量選択前)
 */
 function levelGetBfSelectData() {
	outOparationLog("サブメニューポップアップ入力値データ取得処理(数量選択前)開始");
	levelGetSelectDataArray();
	outOparationLog("サブメニューポップアップ入力値データ取得処理(数量選択前)終了");
}

/**
 * 階層ポップアップ入力値データ取得処理(数量選択後)
 */
function levelGetSelectData() {
	outOparationLog("サブメニューポップアップ入力値データ取得処理(数量選択後)開始");
	levelGetSelectDataArray();
	createOrdLevel();
	outOparationLog("サブメニューポップアップ入力値データ取得処理(数量選択後)終了");
}

/**
 * 階層ポップアップ入力値データ配列格納処理
 */
 function levelGetSelectDataArray() {
	outOparationLog("サブメニューポップアップ入力値データ配列格納処理開始");
	for(var i = 1;i <= 6;i++){
		// ポップアップ画面
		var ptnDisp = document.getElementById("subPattarn"+i);
		// ポップアップ種別
		var dispType = ptnDisp.getAttribute("type");
		if(dispType == "1"){
			// サイズ違い選択の場合
			var baseCd = ptnDisp.getElementsByClassName("general-sub-selected")[0].getAttribute("selectcd");
			levelSelectMap["base"] = baseCd;
		} else if(dispType == "2" || dispType == "3") {
			// サブ複数選択の場合
			var subCds = ptnDisp.getElementsByClassName("general-sub-selected");
			for(var j = 0; j < subCds.length;j++){
				if(subCds[j].classList.contains("general-sub-none")){
					// なし行の場合スキップ
					continue;
				}
				var subCd = subCds[j].getAttribute("selectcd");
				levelSelectMap["sub"][subCd] = {"goodsCd":subCd,"cnt":1};
			}
		} else if(dispType == "4") {
			// サブ数量選択の場合
			var cntTag = ptnDisp.getElementsByClassName("level_type_4")[0];
			// 数量
			var goodsCnt = parseInt(cntTag.textContent);
			// 商品コード
			var subCd = cntTag.getAttribute("subCd");
			if(cntTag.classList.contains("addHbFuncFlg")){
				// ディッシャーズの追加ハンバーグの場合、ベースハンバーグ分の数量を差し引く特別処理実行
				goodsCnt--;
			}
			if(goodsCnt > 0){
				levelSelectMap["sub"][subCd] = {"goodsCd":subCd,"cnt":goodsCnt};
			}
		} else if(dispType == "999") {
			// ベース数量選択の場合
			var cntTag = ptnDisp.getElementsByClassName("level_type_999")[0];
			var goodsCnt = parseInt(cntTag.textContent);
			levelSelectMap["cnt"] = goodsCnt;
		}
	}
	outOparationLog("サブメニューポップアップ入力値データ配列格納処理終了");
}

/**
 * 選択言語パス置換処理
 * @param パス名
 */
function generateLangImgPath(pathName){
	if(MSG_CSS_LANG != 'jp'){
		IMG_DIR_LNG = 'images/otherLanguage/'+MSG_CSS_LANG+'/';
	}else{
		return pathName;
	}
	var tgtImg_lng = pathName.replace('images/',IMG_DIR_LNG);
	if (contains(copy_layoutData_json,tgtImg_lng.replace('url\(\"\.\/','').replace('\"\)','').replace('url(','').replace(')','').replace(/.*images/,'images'))){
		return tgtImg_lng;
	} else {
		return pathName;
	}
}

/**
 * 運用保守GUIプレビュー画像反映処理
 * @param tgtId 反映先タグID
 * @param path 画像パス
 * @param data 画像データ
 */
function guiPrevImg(tgtId,path,data) {
	if(contains(tgtId,"sidelinkKey_")){
		var aTags = document.getElementsByClassName(tgtId);
		for(var i = 0; i < aTags.length;i++){
			var imgTag = aTags[i].getElementsByTagName("img");
			if(imgTag[0] != null) {
				imgTag[0].src = data;
			}
		}
		return;
	}

	lis_fact_map[path] = data;

	// 反映先aタグ取得
	var aTag = document.getElementById(tgtId);
	// 子要素のimgタグ抜き出し
	var imgTag = aTag.getElementsByTagName("img").length == 0 ? null :aTag.getElementsByTagName("img")[0];
	if(imgTag != null && contains(aTag.getAttribute("tmpimg"),"url")){
		// 子要素にimgタグがないかつ、CSSに画像が設定されている場合、CSS設定の画像と判定
		aTag.setAttribute("style",'background-image: url('+data+');');
	} else if(imgTag != null){
		// 子要素のimgタグに画像を反映
		imgTag.src = data;
	} else if(aTag.src != null) {
		// 子要素にimgタグがないかつ、src属性が存在する場合、受け取りタグ自体がimgタグと判定
		aTag.src = data;
	}
}

regLevelDispId = 0;
/**
 * テーブル取得データの編集処理
 */
function editAllTableData(pushMenubookChangeFlg) {
	additionMessage("[StartEdit ]", "editAllTableDataStart");
	startMeasuringElapsedTime("editAllTableDataStart");
	try{
		outOparationLog("取得データ整理処理開始");
		startMeasuringElapsedTime("tmp_m_menubook_map");
		// 配列化
		tmp_m_menubook_map = JSON.parse(m_menubook_json);
		// m_menubook_json = null;
			
		// 配列化
		tmp_m_goods_map = JSON.parse(m_goods_json);
		// m_goods_json = null;

		// 配列化
		if(regFlg != '1'){
			with_goods_map = JSON.parse(m_with_goods_json);
		}
		// m_with_goods_json = null;

		addHpDispTpFlg = JSON.parse(addHbDispFlg_json)["1"]["cValue1"] == "1" ? true:false;

		if(!(regFlg == '1')){
			// 配列化
			tmp_m_basedishcombo_map = JSON.parse(m_basedishcombo_json);

			logging_tmp_basedishcombo_map("editAllTableData", tmp_m_basedishcombo_map)
			// m_basedishcombo_json = null;

			// 配列化
			m_nggoodsgroup_map = JSON.parse(m_nggoodsgroup_json);
			// m_nggoodsgroup_json = null;
		}

		submenuData_map = JSON.parse(submenuData_json);
		// submenuData_json = null;

		generic_alclFstOnly_map = JSON.parse(generic_alclFstOnly_json);

		allergy_map = JSON.parse(allergy_json);

		generic_all_map = JSON.parse(generic_all_json);
		stopMeasuringElapsedTime("tmp_m_menubook_map", "tmp_m_menubook_map-generic_all_map配列化完了");

		startMeasuringElapsedTime("generic_all_mapCheck");
		for(var line in generic_all_map){
			if(contains(line,"allergenBtn_onOffFlg")){
				// アレルギー情報ボタン表示フラグ
				if(generic_all_map[line]["cValue1"] != "1"){
					// 表示OFFの場合
					document.getElementById("kids_allergen").setAttribute("hidden","hidden");
					document.getElementById("ordermadeAllergyDisp").hidden = true;
					document.getElementById("ordermadeAllergyDetail").hidden = true;
					document.getElementById("MSG_ORDMADE_16").hidden = true;
					document.getElementById("aller-staff-msg").hidden = false;
					document.getElementById("drinkAllergyBtn").hidden = true;
				} else {
					// ON
					document.getElementById("kids_allergen").removeAttribute("hidden");
					document.getElementById("ordermadeAllergyDisp").hidden = false;
					document.getElementById("ordermadeAllergyDetail").hidden = false;
					document.getElementById("MSG_ORDMADE_16").hidden = false;
					document.getElementById("aller-staff-msg").hidden = true;
					document.getElementById("drinkAllergyBtn").hidden = false;
				}
			}
			
			if(contains(line, "noOpeChk_displayTime")){
				var ssDisplayTime = parseInt(generic_all_map[line]["cValue1"], 10)
				if(isNaN(ssDisplayTime)) {
					screenSaverDisplayTime = 3000
				} else {
					screenSaverDisplayTime = ssDisplayTime
				}
			}
		}
		stopMeasuringElapsedTime("generic_all_mapCheck", "generic_all_map判定完了");

		startMeasuringElapsedTime("plasticBagFunc_map");
		var plasticBagFunc_map = JSON.parse(plasticBagFunc_json);
		// plasticBagFunc_json = null;
		for(var line in plasticBagFunc_map){
			plasticBagFlg_tto = plasticBagFunc_map[line]["cValue1"];
			plasticBagFlg_reg = plasticBagFunc_map[line]["cValue2"];
		}
		plasticBagFunc_map = null;
		stopMeasuringElapsedTime("plasticBagFunc_map", "plasticBagFunc_map判定完了")

		if(regFlg == '1'){
			startMeasuringElapsedTime("regMenuBookCd_map");
			regMenuBookCd_map = JSON.parse(regMenuBookCd_json);
			// regMenuBookCd_json = null;
			for(var line in regMenuBookCd_map){
				// 精算機起動用メニューブックコード
				menubook_cd = regMenuBookCd_map[line]["cValue1"];
				// 精算機起動用階層画面ID
				regLevelDispId = regMenuBookCd_map[line]["cValue2"] != "-" ? regMenuBookCd_map[line]["cValue2"] : 0;
			}
			stopMeasuringElapsedTime("regMenuBookCd_map", "regMenuBookCd_map判定完了");
		}
		menuBookMstEdit();
		goodsMstEdit();

		basedishcomboMstEdit();
		logging_basedishcombo_map("basedishcomboMstEdit4", m_basedishcombo_map)
		ordermadeBaseImage();
		orderMadeDishBaseSelectReset();

		// レイアウト調整情報取得
		layoutInfo_map = JSON.parse(layoutInfo_json);
		// サイドリンクバー情報取得
		sideLinkInfo_map = JSON.parse(sideLinkInfo_json);
		// レイアウト調整処理
		editLayoutInfo();

		// // 配列化
		// m_tax_map = JSON.parse(m_tax_json);
		// m_tax_json = null;
		// // 税率判定
		// checkTax();
		// メニューブック切替プッシュ時は実行なし
		if(!(pushMenubookChangeFlg)){
			ChangeMsgLanguage('jp');
			changeLanguage('jp');
			changeAllergenLanguage('jp');

			// レイアウトデータのプリロード
			layoutDataPreload();

			if(regFlg == '1'){
				// レジ起動時
				// テイクアウトTOP画面遷移
				// Data.data['scenes']['root'].changeScene('root/takeout');
				// location.href = '#root/takeout';
				cngLevel = regLevelDispId;
				Data.data['scenes']['level'].onEntry(0);


				// サイドリンクバーの切替
				changeSideBarType('takeout');
				
				// メニューデータ整理
				menuBookMstEdit();
				goodsMstEdit();

				// 商品取得失敗の場合、最初からリトライ
				if(getGoodErrCheck()){
					postErrLog('noErr');
					getMenuBookMaster(pushMenubookChangeFlg);
					return;
				}

				// 注文上限取得
				getQuantityLimit();

				// フッターを注文内容一覧・TOP以外非表示化
				// document.getElementById('footer_line1').setAttribute("hidden","hidden");
				// document.getElementById('footer_1').setAttribute("hidden","hidden");
				// document.getElementById('footer_2').style.position = 'relative';
				// document.getElementById('footer_2').style.left = '58.5%';
				startMeasuringElapsedTime("rejiKidou1");
				document.getElementById('footer_3').setAttribute("hidden","hidden");
				document.getElementById('footer_line4').setAttribute("hidden","hidden");
				document.getElementById('footer_4').setAttribute("hidden","hidden");
				document.getElementById('footer_line5').setAttribute("hidden","hidden");

				//フッターのTOPの遷移先を設定階層画面に変更
				document.getElementById('footer_1').setAttribute("href","javascript:void(0)");
				document.getElementById('footer_1').setAttribute("onclick","touch();cngLevel = regLevelDispId; Data.data['scenes']['level'].onEntry(0);changeSideBarType('');levelCancel();");

				//レジ側と同一言語に切替
				ChangeMsgLanguage(regLang);
				changeLanguage(regLang);
				changeAllergenLanguage(regLang);

				// プログレスアイコン解除
				document.getElementById('getData_blank_disp').setAttribute("class","s-offScreen2 jBtn is-hide");
				document.getElementById('loading').setAttribute("hidden","hidden");
				stopMeasuringElapsedTime("rejiKidou1", "レジ起動完了(rejiKidou1)");
			}else{
				// // チェックイン処理
				// checkIn(document.getElementById('selectPeople').textContent);
				// メニューデータ整理
				menuBookMstEdit();
				goodsMstEdit();

				// 商品取得失敗の場合、最初からリトライ
				if(getGoodErrCheck()){
					postErrLog('noErr');
					getMenuBookMaster(pushMenubookChangeFlg);
					return;
				}

				// TOP画面遷移
				startMeasuringElapsedTime("topSenni1");
				$(function(){
					setTimeout(function() {
						Data.data['scenes']['root'].changeScene('root/home');
						location.href = '#root/home';
						document.getElementById('getData_blank_disp').setAttribute("class","s-offScreen2 jBtn is-hide");
						document.getElementById('loading').setAttribute("hidden","hidden");
					}, 500);
				});
				stopMeasuringElapsedTime("topSenni1", "TOP画面遷移完了(topSenni1)");
				// person = people;
				getQuantityLimit();
			}
		}else{
			ChangeMsgLanguage(MSG_CSS_LANG);
			changeLanguage(MSG_CSS_LANG);
			changeAllergenLanguage(MSG_CSS_LANG);
			if(regFlg == '1'){
				// レジ起動時
				// テイクアウトTOP画面遷移
				// Data.data['scenes']['root'].changeScene('root/takeout');
				// location.href = '#root/takeout';
				cngLevel = regLevelDispId;
				Data.data['scenes']['level'].onEntry(0);

				// サイドリンクバーの切替
				changeSideBarType('takeout');
				
				// メニューデータ整理
				menuBookMstEdit();
				goodsMstEdit();

				// 商品取得失敗の場合、最初からリトライ
				if(getGoodErrCheck()){
					postErrLog('noErr');
					getMenuBookMaster(pushMenubookChangeFlg);
					return;
				}

				// 注文上限取得
				getQuantityLimit();

				// フッターを注文内容一覧・TOP以外非表示化
				// document.getElementById('footer_line1').setAttribute("hidden","hidden");
				// document.getElementById('footer_1').setAttribute("hidden","hidden");
				// document.getElementById('footer_2').style.position = 'relative';
				// document.getElementById('footer_2').style.left = '58.5%';
				startMeasuringElapsedTime("rejiKidou2");
				document.getElementById('footer_3').setAttribute("hidden","hidden");
				document.getElementById('footer_line4').setAttribute("hidden","hidden");
				document.getElementById('footer_4').setAttribute("hidden","hidden");
				document.getElementById('footer_line5').setAttribute("hidden","hidden");

				//フッターのTOPの遷移先をテイクアウトTOPに変更
				document.getElementById('footer_1').setAttribute("href","javascript:void(0)");
				document.getElementById('footer_1').setAttribute("onclick","touch();cngLevel = regLevelDispId; Data.data['scenes']['level'].onEntry(0);changeSideBarType('');levelCancel();");

				// プログレスアイコン解除
				document.getElementById('getData_blank_disp').setAttribute("class","s-offScreen2 jBtn is-hide");
				document.getElementById('loading').setAttribute("hidden","hidden");
				stopMeasuringElapsedTime("rejiKidou2", "レジ起動完了(rejiKidou2)");
			}else if(contains(location.href,"root/people") || contains(location.href,"root/home") || contains(location.href,"blank")){
				// チェックイン済みの場合の処理
				// メニューデータ整理
				menuBookMstEdit();
				goodsMstEdit();

				// 商品取得失敗の場合、最初からリトライ
				if(getGoodErrCheck()){
					postErrLog('noErr');
					getMenuBookMaster(pushMenubookChangeFlg);
					return;
				}
				// TOP画面遷移
				startMeasuringElapsedTime("topSenni2");

				Data.data['scenes']['root'].changeScene('root/home');
				location.href = '#root/home';
				// サイド・フッターバーをリセット
				$('.c-menu1').removeClass('is-hide');
				$('.c-menu4').removeClass('is-hide');
				document.getElementById('getData_blank_disp').setAttribute("class","s-offScreen2 jBtn is-hide");
				document.getElementById('loading').setAttribute("hidden","hidden");
				stopMeasuringElapsedTime("topSenni2", "TOP画面遷移完了(topSenni2)");
			}else{
				// メニューデータ整理
				menuBookMstEdit();
				goodsMstEdit();

				// 商品取得失敗の場合、最初からリトライ
				if(getGoodErrCheck()){
					postErrLog('noErr');
					getMenuBookMaster(pushMenubookChangeFlg);
					return;
				}
				startMeasuringElapsedTime("topSenni3");
				document.getElementById('getData_blank_disp').setAttribute("class","s-offScreen2 jBtn is-hide");
				document.getElementById('loading').setAttribute("hidden","hidden");

				// メニューブック切替ポップアップ表示
				document.getElementById('s-dialog12').innerHTML = I_1015;
				Data.data['scenes']['dialog12'].onEntry();
		
				// TOP画面へ遷移
				location.href = '#root/home';
				// サイド・フッターバーをリセット
				$('.c-menu1').removeClass('is-hide');
				$('.c-menu4').removeClass('is-hide');
				stopMeasuringElapsedTime("topSenni3", "TOP画面遷移完了(topSenni3)");
			}
		}
		// 初回のみかつ、プッシュ通知以外の処理
		if(fstDispCheckFlg && pushMenubookChangeFlg){
			startMeasuringElapsedTime("shokaiPushIgai");
			if(regLang != null){
				//レジ側と同一言語に切替
				ChangeMsgLanguage(regLang);
				changeLanguage(regLang);
				changeAllergenLanguage(regLang);
				// メニューデータ整理
				menuBookMstEdit();
				goodsMstEdit();
			} else{
				ChangeMsgLanguage('jp');
				changeLanguage('jp');
				changeAllergenLanguage('jp');

				// メニューデータ整理
				menuBookMstEdit();
				goodsMstEdit();
			}

			// レイアウトデータのプリロード
			layoutDataPreload();
			fstDispCheckFlg = false;

			if(guiFlg == GUI_CODE){
				document.getElementById("people_tbNo").innerHTML = '1<span class="people_tbNo2">卓</span>';
				location.href = "#root/people";
			}
			stopMeasuringElapsedTime("shokaiPushIgai", "初回処理(プッシュ通知以外の処理)");
		}
		setTimeout(function () {
			checkInFlg = false;
		}, 2000);
		outOparationLog("取得データ整理処理終了");
	}catch(e){
		// エラーが発生した場合、メニュー情報取得リトライ
		postErrLog(e.message+'　'+e.stack);
		getMenuBookMaster(pushMenubookChangeFlg);
		stopMeasuringElapsedTime("editAllTableDataStart", "editAllTableDataエラー発生getMenuBookMasterからリトライ");
		return;
	}
	stopMeasuringElapsedTime("editAllTableDataStart", "editAllTableData完了");
	additionMessage("[StopEdit  ]", "editAllTableDataStop");
}

/**
 * 商品取得結果チェック処理
 * return false:成功、true:失敗
 */
function getGoodErrCheck(){
	if(Object.keys(m_goods_map).length == 0){
		return true;
	}
	return false;
}

// var trgtTax = null;
// /**
//  * 税率判定処理
//  */
// function checkTax(){
// 	// 現在日時を取得
// 	var currentDateTime = new Date();
// 	// 現在日付に変換
// 	var currentDate = new Date(currentDateTime.getFullYear()+'/'+(currentDateTime.getMonth()+1)+'/'+currentDateTime.getDate());

// 	var findTax = null;
// 	var notFindTax = null;

// 	for(var m in m_tax_map){
// 		if(m_tax_map[m]["nTaxType"].length == 8){
// 			var date = m_tax_map[m]["nTaxType"].match( /(\d{4})(\d{2})(\d{2})/ );
// 			if(new Date(date[1]+'/'+date[2]+'/'+date[3]) <= currentDate){
// 				findTax = m_tax_map[m];
// 			}
// 		}else{
// 			notFindTax = m_tax_map[m];
// 		}
// 	}
	
// 	if(findTax != null){
// 		trgtTax = findTax;
// 	}else{
// 		trgtTax = notFindTax;
// 	}
// }

// デフォルト
var IMG_DIR_DF = 'images/';
// 変更先
var IMG_DIR = 'images/';
// 変更先2
var IMG_DIR_LNG = 'images/';
// 画像切替判定用データ
var copy_layoutData_json = '';

// 初回画像切替フラグ
var fstImgCngFlg = false;

/**
 * 画像切替処理
 */
 function imgChange(){
	startMeasuringElapsedTime("imgChangeStart");

	// 現在日時を取得
	var currentDateTime = new Date();
	// 現在日付に変換
	var currentDate = new Date(currentDateTime.getFullYear()+'/'+(currentDateTime.getMonth()+1)+'/'+currentDateTime.getDate());

	// 期間一覧
	var dateList = [];

	// 対象フォルダ
	var tgtFolder = 'menu_book/1';

	// 期間フォルダ取得
	// for(var list in layoutData_list){
	// 	// チェック対象を抽出
	// 	var tmp = layoutData_list[list];
	// 	if(tmp != null){
	// 		var result = tmp.match( /(\d{8})-(\d{8})/ );
	// 	}
	// 	if(result != null){
	// 		// 期間フォルダの場合、保存
	// 		dateList.push(result);
	// 	}
	// }
	// for(var i in dateList){
	// 	var startDate = dateList[i][1].match( /(\d{4})(\d{2})(\d{2})/ );
	// 	var endDate = dateList[i][2].match( /(\d{4})(\d{2})(\d{2})/ );
	// 	if(new Date(startDate[1]+'/'+startDate[2]+'/'+startDate[3]) <= currentDate && currentDate <= new Date(endDate[1]+'/'+endDate[2]+'/'+endDate[3])){
	// 		// 対象フォルダ
	// 		tgtFolder = dateList[i][0];
	// 	}
	// }

	for(var list in layoutData_list){
		// チェック対象を抽出
		if(contains(layoutData_list[list],'menu_book/'+menubook_cd)){
			tgtFolder = 'menu_book/'+menubook_cd;
		}
	}

	// 変更先
	// メニューブック&言語毎の管理フォルダパス
	IMG_DIR = 'images/otherLanguage/'.replace('otherLanguage',tgtFolder)+MSG_CSS_LANG+'/';
	
	// 言語毎の管理フォルダパス
	if(MSG_CSS_LANG != 'jp'){
		IMG_DIR_LNG = 'images/otherLanguage/'+MSG_CSS_LANG+'/';
	}else{
		IMG_DIR_LNG = 'images/';
	}

	// 画像タグを全取得
	var imgs = document.getElementsByTagName('img');

	copy_layoutData_json = layoutData_json.replace(/\\/g,'');

	for(var img=0;img < imgs.length;img++){
    // for(var img in imgs){
    if(imgs[img].src != null){
		// // androidwebviewで同じタグを複数回取得できてしまうため、二重処理を回避
		// if(contains(imgs[img].getAttribute('src'),IMG_DIR)){
		// 	continue;
		// }

		// if(!(fstImgCngFlg)){
		// 	// デフォルトの画像パスを保存
		// 	imgs[img].setAttribute("tmpImg",imgs[img].getAttribute('src'));
		// }
		// 保存されなかったものはスキップ　※商品画像等のDOM構築であとから生成されたimgタグ。切替対象がないため。
		if(imgs[img].getAttribute('tmpImg') == null){
			continue;
		}
		// 置き換え対象の画像URL
		var tgtImg = imgs[img].getAttribute('tmpImg').replace(IMG_DIR_DF,IMG_DIR);
		var tgtImg_lng = imgs[img].getAttribute('tmpImg').replace(IMG_DIR_DF,IMG_DIR_LNG);
		if(contains(copy_layoutData_json,tgtImg)){
			if(lis_fact_map[tgtImg] != null){
				// 置き換え先の画像が存在した場合、置き換え
				imgs[img].setAttribute('src',lis_fact_map[tgtImg]);
			}
		}
		else if(contains(copy_layoutData_json,tgtImg_lng)){
			if(lis_fact_map[tgtImg_lng] != null){
				// 置き換え先の画像が存在した場合、置き換え
				imgs[img].setAttribute('src',lis_fact_map[tgtImg_lng]);
			}
		} 
		else {
			// 存在しない場合、デフォルト画像をセット
			if(lis_fact_map[imgs[img].getAttribute('tmpImg')] != null){
				imgs[img].setAttribute('src',lis_fact_map[imgs[img].getAttribute('tmpImg')]);
			}
		}
      }
	}

	// スクリーンセイバーの画像を置き換え
	for(line in imgset){
		var tgtImg = imgset_tmp[line].replace(IMG_DIR_DF,IMG_DIR);
		var tgtImg_lng = imgset_tmp[line].replace(IMG_DIR_DF,IMG_DIR_LNG);
		if(contains(copy_layoutData_json,tgtImg.replace('url\(\"\.\/','').replace('\"\)','').replace('url(','').replace(')','').replace(/.*images/,'images'))){
			// 置き換え先の画像が存在した場合、置き換え
			imgset[line] = tgtImg;
		} else if (contains(copy_layoutData_json,tgtImg_lng.replace('url\(\"\.\/','').replace('\"\)','').replace('url(','').replace(')','').replace(/.*images/,'images'))){
			// 置き換え先の画像が存在した場合、置き換え
			imgset[line] = tgtImg_lng;
		} else {
			// 存在しない場合、デフォルト画像をセット
			imgset[line] = imgset_tmp[line];
		}
	}

	// css指定の画像を置き換え
	var cssImgs = document.getElementsByClassName('bgImg');
	for(var i = 0; i < cssImgs.length;i++){
		// if(!(fstImgCngFlg)){
		// 	// デフォルトの画像パスを保存
		// 	cssImgs[i].setAttribute("tmpImg",cssImgs[i].style.backgroundImage);
		// }
		var tgtImg = cssImgs[i].getAttribute("tmpImg").replace(IMG_DIR_DF,IMG_DIR);
		var tgtImg_lng = cssImgs[i].getAttribute("tmpImg").replace(IMG_DIR_DF,IMG_DIR_LNG);

		if(contains(copy_layoutData_json,tgtImg.replace('url\(\"\.\/','').replace('\"\)','').replace('url(','').replace(')','').replace(/.*images/,'images'))){
			// 置き換え先の画像が存在した場合、置き換え
			cssImgs[i].style.backgroundImage = "url("+lis_fact_map[tgtImg.replace('url\(\"\.\/','').replace('\"\)','').replace('url(','').replace(')','').replace(/.*images/,'images')]+")";
		} else if (contains(copy_layoutData_json,tgtImg_lng.replace('url\(\"\.\/','').replace('\"\)','').replace('url(','').replace(')','').replace(/.*images/,'images'))){
			// 置き換え先の画像が存在した場合、置き換え
			cssImgs[i].style.backgroundImage = "url("+lis_fact_map[tgtImg_lng.replace('url\(\"\.\/','').replace('\"\)','').replace('url(','').replace(')','').replace(/.*images/,'images')]+")";
		}else{
			// 存在しない場合、デフォルト画像をセット
			cssImgs[i].style.backgroundImage = "url("+lis_fact_map[cssImgs[i].getAttribute("tmpImg").replace('url\(\"\.\/','').replace('\"\)','').replace('url(','').replace(')','').replace(/.*images/,'images')]+")";
		}
	}
	// copy_layoutData_json = null;

	// 最後の変更先を保存
	// IMG_DIR_DF = IMG_DIR;

	// 初回画像切替完了化
	fstImgCngFlg = true;
	stopMeasuringElapsedTime("imgChangeStart", "imgChangeStop");
}

/**
 * 言語切替ボタン押下処理
 * @param "jp"or""en"or"kr"or"ch"
 */
function changeLangBtn(lang) {
	touch();
	document.getElementById('loading').removeAttribute("hidden");
	setTimeout(function () {
		outOparationLog("言語切替開始,切替言語:"+lang);
		ChangeMsgLanguage(lang);
		changeLanguage(lang);
		changeAllergenLanguage(lang);
		editLayoutInfo();
		layoutDataPreload();
		outOparationLog("言語切替終了,切替言語:"+lang);
		location.href = '#root/home';
		$(function(){
			document.getElementById('loading').setAttribute("hidden","hidden");
		});
	}, 100);
}


function basedishcomboMstEdit() {
	startMeasuringElapsedTime("basedishcomboMstEditStart");
	//データ初期化
	m_basedishcombo_map = [];
	// 現在日時を取得
	var currentDate = new Date();

	for(var m in tmp_m_basedishcombo_map){
		for(var mm in tmp_m_basedishcombo_map[m]){
			// 現在日時で有効なメニューブックのみに編集
			// ※補足：tmp_m_basedishcombo_mapは現在日付で有効な基本系ディッシュマスタデータ
			if(new Date(Date.parse(tmp_m_basedishcombo_map[m][mm]["tStartValidDate"])) <= currentDate && new Date(Date.parse(tmp_m_basedishcombo_map[m][mm]["tEndValidDate"])) > currentDate){
				m_basedishcombo_map = jQuery.extend(true, m_basedishcombo_map, tmp_m_basedishcombo_map[m]);
			}
		}
	}
	stopMeasuringElapsedTime("basedishcomboMstEditStart", "basedishcomboMstEdit完了");
}

/**
 * 基本系ディッシュ画像の反映処理
 */
function ordermadeBaseImage() {
	startMeasuringElapsedTime("ordermadeBaseImageStart");
	for(var i = 1; i <= 6; i++) {
		if(m_basedishcombo_map[i] != null){
			document.getElementById('base_dish'+i).removeAttribute('hidden');
			if(contains(copy_layoutData_json,IMG_DIR+'ordermade_base_select/'+m_basedishcombo_map[i]['cBaseDishImage'])){
				document.getElementById('base_dish_img'+i).setAttribute('src',lis_fact_map[IMG_DIR+'ordermade_base_select/'+m_basedishcombo_map[i]['cBaseDishImage']]);
			} else if (contains(copy_layoutData_json,IMG_DIR_LNG+'ordermade_base_select/'+m_basedishcombo_map[i]['cBaseDishImage'])){
				document.getElementById('base_dish_img'+i).setAttribute('src',lis_fact_map[IMG_DIR_LNG+'ordermade_base_select/'+m_basedishcombo_map[i]['cBaseDishImage']]);
			}else{
				document.getElementById('base_dish_img'+i).setAttribute('src',lis_fact_map['images/ordermade_base_select/'+m_basedishcombo_map[i]['cBaseDishImage']]);
			}
		}else{
			document.getElementById('base_dish'+i).setAttribute('hidden','hidden');
		}
	}
	outOparationLog("オーダーメイドディッシュベース選択画面-ベース画像反映");
	stopMeasuringElapsedTime("ordermadeBaseImageStart", "ordermadeBaseImage完了");
}

/**
 * オーダーメイド一覧の生成
 */
function createorderMadeList(changeType,changeId){
	// ソース「ハンバーグソース」の選択状況を事前取得
	var scEmpSelect = document.getElementById("empty_a");
	// 一覧の初期化
	if((!firstDishMakeFlg && addHpDispTpFlg) && (changeType == "hb" || changeType == "tp")){
		document.getElementById('tpStatus').textContent = null;
		document.getElementById('hbStatus').textContent = null;
		if(changeId == null){
			document.getElementById('tpList').textContent = null;
			document.getElementById('hbList').textContent = null;
		}
	}else if(changeType == 'hb'){
		document.getElementById('hbStatus').textContent = null;
		if(changeId == null){
			document.getElementById('hbList').textContent = null;
		}
	}else if(changeType == 'tp'){
		document.getElementById('tpStatus').textContent = null;
		if(changeId == null){
			document.getElementById('tpList').textContent = null;
		}
	}else if(changeType == 'rp'){
		document.getElementById('rpStatus').textContent = null;
		if(changeId == null){
			document.getElementById('rpList').textContent = null;
		}
	}else if(changeType == 'sc'){
		document.getElementById('scStatus').textContent = null;
		if(changeId == null){
			document.getElementById('scList').textContent = null;
		}
	}else if(changeType == 'sr'){
		document.getElementById('srStatus').textContent = null;
		if(changeId == null){
			document.getElementById('srList').textContent = null;
		}
	}else{
		document.getElementById('hbList').textContent = null;
		document.getElementById('tpList').textContent = null;
		document.getElementById('rpList').textContent = null;
		document.getElementById('scList').textContent = null;
		document.getElementById('srList').textContent = null;
		document.getElementById('hbStatus').textContent = null;
		document.getElementById('tpStatus').textContent = null;
		document.getElementById('rpStatus').textContent = null;
		document.getElementById('scStatus').textContent = null;
		document.getElementById('srStatus').textContent = null;
	}

	// 合計カロリー
	var cal_total = 0;
	// 合計塩分
	var salt_total = new BigNumber(0);
	// 合計金額
	var price_total = 0;

	// 最低数量ハンバーグ選択フラグ
	var hbDecisionFlg = false;
	// 最低数量ライス・パスタ選択フラグ
	var rpDecisionFlg = false;
	// 最低数量サラダ選択フラグ
	var srDecisionFlg = false;

	// アレルゲン表示フラグ
	var allergenFlg = [false,false,false,false,false,false,false,false,false,false
						,false,false,false,false,false,false,false,false,false,false
						,false,false,false,false,false,false,false];

	// ハンバーグ合計数量
	hb_total = 0;
	// ハンバーグ合計最大数量
	var hb_max_total = 0;
	// トッピング合計数量
	tp_total = 0;
	// トッピング合計最大数量
	var tp_max_total = 0;
	// ライス・パスタ合計数量
	rp_total = 0;
	// ライス・パスタ合計最大数量(固定)
	var rp_max_total = 1;
	// ソース合計数量
	sc_total = 0;
	// ソース合計最大数量(固定)
	var sc_max_total = 1;
	// サラダ合計数量
	sr_total = 0;
	// サラダ合計最大数量(固定)
	var sr_max_total = 1;

	// マイディッシュ完成タブの非表示化
	document.getElementById('orderLastTab').setAttribute('style','display: none;');


	//ソース一覧にデフォルトで「ハンバーグソース」を追加
	// if((changeType == 'sc' || changeType == null) && changeId == null && !(OrdMadechangeLimitFlg)){
	// 	// 行
	// 	var li = document.createElement('li');
	// 	li.setAttribute('id',"empty");
	// 	var a_goods = document.createElement('a');

	// 	// 元の選択状態を復元
	// 	if(scEmpSelect == null || scEmpSelect.getAttribute('class') == "p-orderSelectBtn1"){
	// 		a_goods.setAttribute('class',"p-orderSelectBtn1");
	// 	}else{
	// 		a_goods.setAttribute('class',"p-orderSelectBtn1 current");
	// 	}
	// 	a_goods.setAttribute('id',"empty_a");
	// 	a_goods.setAttribute('onclick',"touch(); goodsCheckBoxClick('sc','empty');");
	// 	// 商品名部
	// 	var p_name = document.createElement('p');
	// 	p_name.setAttribute('class',"p-orderSelectBtn1_txt2 name");
	// 	p_name.innerHTML = MSG_ORDMADE_10;
	// 	// 値段部
	// 	// var p_price = document.createElement('p');
	// 	// p_price.setAttribute('class',"p-orderSelectBtn1_txt3");
	// 	// var span_price = document.createElement('span');
	// 	// span_price.setAttribute('class',"price");
	// 	// span_price.textContent = '0';
	// 	// p_price.appendChild(span_price);
	// 	// p_price.innerHTML = p_price.innerHTML + MSG_ORDMADE_8;

	// 	// cal/塩分部
	// 	var p_cal_salt = document.createElement('p');
	// 	p_cal_salt.setAttribute('class',"p-orderSelectBtn1_txt1");
	// 	var span_cal = document.createElement('span');
	// 	span_cal.setAttribute('class',"cal");
	// 	span_cal.textContent = '7';

	// 	var span_salt = document.createElement('span');
	// 	span_salt.setAttribute('class',"salt");
	// 	span_salt.textContent = '0.4';

	// 	p_cal_salt.appendChild(span_cal);
	// 	p_cal_salt.innerHTML = p_cal_salt.innerHTML + MSG_ORDMADE_7;
	// 	p_cal_salt.appendChild(span_salt);
	// 	p_cal_salt.innerHTML = p_cal_salt.innerHTML + "g";

	// 	a_goods.appendChild(p_name);
	// 	// a_goods.appendChild(p_price);
	// 	a_goods.appendChild(p_cal_salt);

	// 	li.appendChild(a_goods);
	// 	document.getElementById("scList").appendChild(li);
	// }

	// 数量変更のみの場合、該当タグを取得・編集
	if(changeId != null){
		var change_li = document.getElementById("ordermade_id_"+create_dish_map[changeType][changeId]["nGoodsCode"]);
		change_li.children[1].children[1].children[0].textContent = create_dish_map[changeType][changeId]["quantity"];
	}

	// 全商品区分のデータ
	for(var sType in create_dish_map){
		// 商品区分毎の全データ
		for(var gData in create_dish_map[sType]){
			if(((changeType == sType || ((!firstDishMakeFlg && addHpDispTpFlg) && (changeType == "hb" || changeType == "tp") && (sType == "hb" || sType == "tp"))) || changeType == null) && changeId == null){
				// 行
				var li = document.createElement('li');
				li.setAttribute('id',"ordermade_id_"+create_dish_map[sType][gData]["nGoodsCode"]);
				li.setAttribute('style','position:relative');
				li.setAttribute('sort',create_dish_map[sType][gData]["nDetailIndex"]);

				var a_goods = document.createElement('a');
				a_goods.setAttribute('style','position:rerative;');
				// ライス・ソース・サラダの場合
				if(sType == "rp"|| sType == "sc" || sType == "sr" ){
					if(create_dish_map[sType][gData]["quantity"] == 1){
						a_goods.setAttribute('class',"p-orderSelectBtn1 current");
					}else{
						a_goods.setAttribute('class',"p-orderSelectBtn1");
					}
				}else{
					a_goods.setAttribute('class',"p-orderSelectBtn1");
				}
				a_goods.setAttribute('data-id',create_dish_map[sType][gData]["nGoodsCode"]);
				a_goods.setAttribute('id',"");

				// 選択無効フラグ
				var ngGroupFlg = false;
				if(m_nggoodsgroup_map[create_dish_map[sType][gData]["nGoodsCode"]] != null){
					// 組み合わせ不可チェック
					// 組み合わせ不可リスト
					var ng_map = m_nggoodsgroup_map[create_dish_map[sType][gData]["nGoodsCode"]];

					for(line in ng_map){
						// 組み合わせ不可商品の選択を検索
						for(ml in mappingList){
							if(create_dish_map[ml][ng_map[line]["nNgGoodsCode"]] != null
							&& create_dish_map[ml][ng_map[line]["nNgGoodsCode"]]["quantity"] != 0){
								// 検知
								ngGroupFlg = true;
								break;
							}
						}
						if(ngGroupFlg){
							break;
						}
					}
				}
				// ライス・サラダの場合
				if(sType == "rp"|| sType == "sr"){
					// if(ngGroupFlg){
					// 	// ボタン無効
					// 	a_goods.setAttribute('onclick',"touch();");
					// }else{
						// ラジオ選択機能追加
						a_goods.setAttribute('onclick',"touch(); goodsRadioClick('"+sType+"',"+create_dish_map[sType][gData]["nGoodsCode"]+");");
					// }
				// ソースの場合
				}else if(sType == "sc"){
					// if(ngGroupFlg){
					// 	// ボタン無効
					// 	a_goods.setAttribute('onclick',"touch();");
					// }else{
						// 一択チェックボックス機能追加
						a_goods.setAttribute('onclick',"touch(); goodsCheckBoxClick('"+sType+"',"+create_dish_map[sType][gData]["nGoodsCode"]+");");
					// }
				}
				// 商品名部
				var p_name = document.createElement('p');
				p_name.setAttribute('class',"p-orderSelectBtn1_txt2 name");
				p_name.innerHTML = create_dish_map[sType][gData]["cGoodsName"];

				// 値段部
				var p_price = document.createElement('p');
				p_price.setAttribute('class',"p-orderSelectBtn1_txt3");
				var span_price = document.createElement('span');
				span_price.setAttribute('class',"price");

				var tmplist = {rp:"nRiceGoodsCode", sc:"nSourceGoodsCode", sr:"nSaladGoodsCode"};
				if((sType == "rp" || sType == "sc" || sType == "sr")
						&& m_basedishcombo_map[ordMadeSelectBaseCode][tmplist[sType]] != null){
					//ライス、ソース、サラダかつベース商品が設定されている場合プラス値段表記
					var editPrice = new BigNumber(create_dish_map[sType][gData]["nUnitCost"]).minus(
						create_dish_map[sType][m_basedishcombo_map[ordMadeSelectBaseCode][tmplist[sType]]]["nUnitCost"]);
					if(editPrice > 0){
						editPrice = "+" + editPrice;
					}
					span_price.textContent = editPrice;
				}else if(sType == "sc" && !(OrdMadechangeLimitFlg)){
					// span_price.textContent = "+" + create_dish_map[sType][gData]["nUnitCost"];
					span_price.textContent = create_dish_map[sType][gData]["nUnitCost"];
				}else{
					span_price.textContent = create_dish_map[sType][gData]["nUnitCost"];
				}
				p_price.appendChild(span_price);
				p_price.innerHTML = p_price.innerHTML + MSG_ORDMADE_8;

				// cal/塩分部
				var p_cal_salt = document.createElement('p');
				p_cal_salt.setAttribute('class',"p-orderSelectBtn1_txt1");
				var span_cal = document.createElement('span');
				span_cal.setAttribute('class',"cal");
				span_cal.textContent = create_dish_map[sType][gData]["nCal"];

				var span_salt = document.createElement('span');
				span_salt.setAttribute('class',"salt");
				span_salt.textContent = create_dish_map[sType][gData]["nSalt"];

				var calSaltText = MSG_ORDMADE_7.replace('{0}',span_cal.outerHTML)
													.replace('{1}',span_salt.outerHTML);

				p_cal_salt.innerHTML = calSaltText;

				if((sType == "rp" || sType == "sc" || sType == "sr")
						&& m_basedishcombo_map[ordMadeSelectBaseCode][tmplist[sType]] == create_dish_map[sType][gData]["nGoodsCode"]){
					// ベース設定されたソースの場合、金額非表示
					// p_name.style.marginTop = "17%";
					a_goods.appendChild(p_name);
				}else{
					a_goods.appendChild(p_name);
					a_goods.appendChild(p_price);
				}
				a_goods.appendChild(p_cal_salt);

				li.appendChild(a_goods);

				if(create_dish_map[sType][gData]["nGoodsCode"] != '15011'){

					// ハンバーグ・トッピングのみ箇所生成
					if(sType == "hb"|| sType == "tp"){
						var div_qntMain = document.createElement('div');

						// 数量マイナス
						var a_minus = document.createElement('a');
						a_minus.setAttribute('class',"minus");
						var img_minus = document.createElement('img');
						img_minus.setAttribute('src',lis_fact_map["images/select/selectNumBtn1.png"]);
						img_minus.setAttribute('onclick',"touch(); goodsCntDown('"+sType+"',"+create_dish_map[sType][gData]["nGoodsCode"]+");");
						a_minus.appendChild(img_minus);
						// 数量
						var div_qnt = document.createElement('div');
						var p_qnt = document.createElement('p');
						p_qnt.setAttribute('class',"tNum");
						p_qnt.textContent = create_dish_map[sType][gData]["quantity"];
						div_qnt.appendChild(p_qnt);
						div_qnt.innerHTML = MSG_ORDMADE_9+div_qnt.innerHTML;

						// 数量プラス
						var a_plus = document.createElement('a');
						a_plus.setAttribute('class',"plus");
						var img_plus = document.createElement('img');
						img_plus.setAttribute('src',lis_fact_map["images/select/selectNumBtn2.png"]);
						//img_plus.setAttribute('onclick',"goodsSelectAnimation('"+mappingList[sType]+"',"+create_dish_map[sType][gData]["nGoodsCode"]+");");
						img_plus.setAttribute('onclick',"touch(); goodsCntUp('"+sType+"',"+create_dish_map[sType][gData]["nGoodsCode"]+");");
						//img_plus.setAttribute('onclick',"clickTopping(this, 1)");
						
						a_plus.appendChild(img_plus);
						div_qntMain.appendChild(a_minus);
						div_qntMain.appendChild(div_qnt);
						div_qntMain.appendChild(a_plus);
						div_qntMain.setAttribute('style','position:rerative;');
						li.appendChild(div_qntMain);
						
					}

					// 品切れアイコンの表示処理
					if(create_dish_map[sType][gData]["bySalesStatusType"] == 2){
						var soldout_span = document.createElement('span');
						if(sType == "hb" || sType == "tp"){
							soldout_span.setAttribute('style','position:absolute;width:100%;height:100%;top:0px;left:0px;overflow:hidden;');
						}else{
							soldout_span.setAttribute('style','position:absolute;width:100%;height:97%;top:1px;left:4px;overflow:hidden;');
						}
						soldout_span.classList.add("off");
						soldout_span.classList.add(MSG_CSS_LANG);
						li.appendChild(soldout_span);
						li.classList.add("off");
					}
					if (ngGroupFlg) {
						// 組合せNG商品に選択不可の文言表示
						var ngGoods_span = document.createElement('span');
						if(sType == "hb" || sType == "tp"){
							ngGoods_span.setAttribute('style','position:absolute;width:100%;height:100%;top:0px;left:0px;overflow:hidden;');
						}else if (sType == "rp"){
							ngGoods_span.setAttribute('style','position:absolute;width:100%;height:97%;top:1px;left:4px;overflow:hidden;');
							li.classList.add("ng-sauce");
							ngGoods_span.classList.add("ng-sauce");
							var msg = "";
							if(create_dish_map['sc']['92002'] != null){
								msg = I_1024.replace('{0}', create_dish_map['sc']['92002']['nUnitCost']);
							}
							// パスタ選択時はソースの組合せをミートソースに変更
							li.setAttribute('onclick', "chgNgCombiCheck('" + msg + "'," + create_dish_map[sType][gData]["nGoodsCode"] + ", 'rp', '92002', 'sc');");
						}else if (sType == "sc"){
							ngGoods_span.setAttribute('style','position:absolute;width:100%;height:97%;top:1px;left:4px;overflow:hidden;');
							li.classList.add("ng-pasta");
							ngGoods_span.classList.add("ng-pasta");
							// ハンバーグソース、フォンデュソース、デミグラスソース選択時はライス・パスタの組合せをライス普通盛りに変更
							li.setAttribute('onclick', "chgNgCombiCheck('" + I_1025 + "', " + create_dish_map[sType][gData]["nGoodsCode"] + ", 'sc', '25004', 'rp');");
						}else{
							ngGoods_span.setAttribute('style','position:absolute;width:100%;height:97%;top:1px;left:4px;overflow:hidden;');
						}
						a_goods.setAttribute('data-type', sType);
						ngGoods_span.classList.add(MSG_CSS_LANG);
						li.appendChild(ngGoods_span);
					}
					if(!(OrdMadechangeLimitFlg && ngGroupFlg)){
						// ソース制限ON & 組み合わせ不可商品の場合表示しない
						// 行をセット
						if((!firstDishMakeFlg && addHpDispTpFlg) && sType == "hb"){
							// フルカスタム以外の場合、ハンバーグ類はトッピング一覧へセットする
							document.getElementById("tpList").appendChild(li);
						} else {
							document.getElementById(sType+"List").appendChild(li);
						}
					}
				}


			}
			if(((changeType == sType || ((!firstDishMakeFlg && addHpDispTpFlg) && (changeType == "hb" || changeType == "tp") && (sType == "hb" || sType == "tp"))) || changeType == null)){
				// ステータス生成
				if(create_dish_map[sType][gData]["quantity"] != 0){
					var status_li  = document.createElement('li');
					if(sType == "hb" || sType == "tp"){
						// status_li.innerHTML = create_dish_map[sType][gData]["cGoodsName"]+' x '+create_dish_map[sType][gData]["quantity"];
						status_li.innerHTML = create_dish_map[sType][gData]["cGoodsName"]+'&nbsp;x&nbsp;'+'<span class="tNum">'+create_dish_map[sType][gData]["quantity"]+'</span>';
					}else{
						status_li.innerHTML = create_dish_map[sType][gData]["cGoodsName"];
					}

					if((!firstDishMakeFlg && addHpDispTpFlg) && sType == "hb" && create_dish_map[sType][gData]["nGoodsCode"] != '15011'){
						document.getElementById('tpStatus').appendChild(status_li);
					} else {
						document.getElementById(sType+'Status').appendChild(status_li);
					}
				}
			}

			// 合計値欄の計算処理
			qnt = (parseInt(create_dish_map[sType][gData]["quantity"]));
			if(create_dish_map[sType][gData]["quantity"] != 0){
				price_total = price_total + ((parseInt(create_dish_map[sType][gData]["nUnitCost"]) * qnt));
				cal_total = cal_total + ((parseInt(create_dish_map[sType][gData]["nCal"]) * qnt));
				salt_total = salt_total.plus(new BigNumber(create_dish_map[sType][gData]["nSalt"]).times(qnt));
				// アレルゲンチェック
				for(var i = 1; i <= allergenFlg.length; i++) {
					if(create_dish_map[sType][gData]["byAllergie"+i] == 1){
						allergenFlg[i-1] = true;
					}
				}
			}

			// 次へ進むボタン制御用数値の計算
			max_qnt = (parseInt(create_dish_map[sType][gData]["wSelectEnableCount"]));
			if(sType == "hb"){
				hb_total = hb_total + qnt;
				if(create_dish_map[sType][gData]["bySalesStatusType"] != 2){
					// 品切れでない場合、最大値をカウント
					hb_max_total = hb_max_total + max_qnt;
				}
			}else if(sType == "tp"){
				tp_total = tp_total + qnt;
				if(create_dish_map[sType][gData]["bySalesStatusType"] != 2){
					// 品切れでない場合、最大値をカウント
					tp_max_total = tp_max_total + max_qnt;
				}
			}else if(sType == "rp"){
				rp_total = rp_total + qnt;
			}else if(sType == "sc"){
				sc_total = sc_total + qnt;
			}else if(sType == "sr"){
				sr_total = sr_total + qnt;
			}
		}
	}
	// ソースなしの場合、ベースソースのカロリー・塩分反映
	if(sc_total == 0){
		cal_total = cal_total + (7);
		salt_total = salt_total.plus(new BigNumber(0.4));
	}

	// 合計値欄の反映
	document.getElementById('price_total').textContent = price_total.toLocaleString();
	document.getElementById('cal_total').textContent = cal_total.toLocaleString();
	document.getElementById('salt_total').textContent = salt_total.toLocaleString();
	for(var i = 1; i <= allergenFlg.length; i++) {
		if(allergenFlg[i-1]){
			document.getElementById('allergen'+i).removeAttribute('hidden');
		}else{
			document.getElementById('allergen'+i).setAttribute('hidden','');
		}
	}

	// 各一覧でこれ以上商品を選べない状態となった場合、次へ進むボタンの押下処理実行
	if(hb_total == hb_max_total && firstDishMakeHbEndFlg == false){
		// orderNextBtn();
		// 初回のみ実行
		firstDishMakeHbEndFlg = true;
	}
	if(tp_total == tp_max_total && firstDishMakeTpEndFlg == false){
		// orderNextBtn();
		// 初回のみ実行
		firstDishMakeTpEndFlg = true;
	}
	if(rp_total == rp_max_total && firstDishMakeRpEndFlg == false){
		nextBanFlg = false;
		// 自動遷移処理廃止
		// sleep(1, function () {
		// 	if(!(nextBanFlg)){
		// 		orderNextBtn();
		// 	}else{
		// 		nextBanFlg = false;
		// 	}
        // });
		// 初回のみ実行
		firstDishMakeRpEndFlg = true;
	}
	if(sc_total == sc_max_total && firstDishMakeScEndFlg == false){
		nextBanFlg = false;
		// 自動遷移処理廃止
		// sleep(1, function () {
		// 	if(!(nextBanFlg)){
		// 		orderNextBtn();
		// 	}else{
		// 		nextBanFlg = false;
		// 	}
        // });
		// 初回のみ実行
		firstDishMakeScEndFlg = true;
	}
	if(scEmpSelect != null && scEmpSelect.getAttribute('class') == "p-orderSelectBtn1 current" && firstDishMakeScEndFlg == false){
		// orderNextBtn();
		// 初回のみ実行
		firstDishMakeScEndFlg = true;
	}
	// サラダの場合、サラダ一覧の表示処理のみ実行
	if(sr_total == sr_max_total && firstDishMakeSrEndFlg == false && fstSrChoiceFlg){
		firstEditEnd(5);
		// 初回のみ実行
		firstDishMakeSrEndFlg = true;
		firstFinishFlg = true;
		document.getElementById('orderLastTab').setAttribute('style','display: block;text-align:center;');
		document.getElementById('srMain').setAttribute('class','p-orderSelectMenu__nav');
		document.getElementById('srBtn').setAttribute('class','p-orderSelectNav__btn selected');

		// ガイドメッセージ表示化
		document.getElementById('ordmade_guide_msg').style.display= 'block';
		document.getElementById('ordmade_guide_msg').style.animation = 'ordmade_guide_msg_ani_disp 0.5s forwards';
	}

	// 現在タブに応じて、次へボタンの活性・非活性制御
	if(firstFinishFlg){
		document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1 all');
	}else{
		if('p-orderSelectMenu__nav current' == document.getElementById('hbMain').getAttribute('class')){
			if(hb_total >= 1){
				document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1 on');
			}else{
				document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1');
			}
		}else if('p-orderSelectMenu__nav current' == document.getElementById('tpMain').getAttribute('class')){
			document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1 on');
		}else if('p-orderSelectMenu__nav current' == document.getElementById('rpMain').getAttribute('class')){
			if(rp_total >= 1){
				document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1 on');
			}else{
				document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1');
			}
		}else if('p-orderSelectMenu__nav current' == document.getElementById('scMain').getAttribute('class')){
			// document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1 on');
			if(sc_total >= 1){
				document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1 on');
			}else{
				document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1');
			}
		}else if('p-orderSelectMenu__nav current' == document.getElementById('srMain').getAttribute('class')){
			if(sr_total >= 1){
				document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1 on');
			}else{
				document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1');
			}
		}
	}

	// ステータスの半透明白枠の表示・非表示制御
	if(hb_total == 0){
		document.getElementById('hbNav').setAttribute('class','p-orderSelectNav__wrap');
	}else{
		document.getElementById('hbNav').setAttribute('class','p-orderSelectNav__wrap view');
	}
	if(tp_total == 0){
		if((!firstDishMakeFlg && addHpDispTpFlg) && hb_total >= 2){
			document.getElementById('tpNav').setAttribute('class','p-orderSelectNav__wrap view');
		} else {
			document.getElementById('tpNav').setAttribute('class','p-orderSelectNav__wrap');
		}
	}else{
		document.getElementById('tpNav').setAttribute('class','p-orderSelectNav__wrap view');
	}
	if(rp_total == 0){
		document.getElementById('rpNav').setAttribute('class','p-orderSelectNav__wrap');
	}else{
		document.getElementById('rpNav').setAttribute('class','p-orderSelectNav__wrap view');
	}
	if(sc_total == 0){
		document.getElementById('scNav').setAttribute('class','p-orderSelectNav__wrap');
	}else{
		document.getElementById('scNav').setAttribute('class','p-orderSelectNav__wrap view');
	}
	if(sr_total == 0){
		document.getElementById('srNav').setAttribute('class','p-orderSelectNav__wrap');
	}else{
		document.getElementById('srNav').setAttribute('class','p-orderSelectNav__wrap view');
	}
	if(changeType == null){
		ordmadeDetailSort("hb");
		ordmadeDetailSort("tp");
		ordmadeDetailSort("rp");
		ordmadeDetailSort("sc");
		ordmadeDetailSort("sr");
	}else{
		ordmadeDetailSort(changeType);
	}
}

/**
 * オーダーメイドディッシュ一覧ソート処理
 */
function ordmadeDetailSort(type) {
    // ノード取得
    var myUL = document.getElementById(type+"List");
    var myNodeList = myUL.getElementsByTagName("li");
    // 配列取得
    var myArray = Array.prototype.slice.call(myNodeList);
    // ソート
    function compareText (a,b) {
        if (a.getAttribute("sort") > b.getAttribute("sort"))
            return 1;
        else if (a.getAttribute("sort") < b.getAttribute("sort"))
            return -1;
        return 0;
        }
    myArray.sort(compareText);
    // ソート結果反映
    for (var i=0; i<myArray.length; i++) {
        myUL.appendChild(myUL.removeChild(myArray[i]))
    }
}

/**
 * ソート処理
 * 　オーダーメイドディッシュ以外のメニュー一覧ソート処理
 * @param type：メニュー区分(0：ドリンク、1：ドリンク以外)
 * 
 */
function menuListSort(type) {
	// ノード取得
	if (type == '0') {
		// ドリンク、TOドリンクの場合
		var parentNode = document.getElementById("drinkDetails");
	} else {
		// お子様、サイド、TOディッシュ、TOサイドの場合
		var parentNode = document.getElementById("kidsDetails");
	}
    var childNodeList = parentNode.getElementsByTagName("a");
    // 配列取得
    var myArray = Array.prototype.slice.call(childNodeList);
    // ソート
    function compareText (a,b) {
        if (a.getAttribute("sort") > b.getAttribute("sort"))
            return 1;
        else if (a.getAttribute("sort") < b.getAttribute("sort"))
            return -1;
        return 0;
        }
    myArray.sort(compareText);
    // ソート結果反映
    for (var i=0; i<myArray.length; i++) {
        parentNode.appendChild(parentNode.removeChild(myArray[i]))
    }
}

// /**
//  * 通信エラーポップアップ出力処理
//  */
// function getDataErrorPopUp(){
// 	if(regFlg == '1'){
// 		location.href = '#root/takeout';
// 		document.getElementById('s-dialog3').innerHTML = E_9007;
// 		document.getElementById('dialog3').setAttribute('href','root/takeout');
// 		document.getElementById('s-dialog3-btn').innerHTML = MSG_COMMON_9;
// 		document.getElementById('s-dialog3-btn').setAttribute('onclick',"touch(); Data.data['scenes']['dialog3'].onExit();starAnimation();");
// 	}else{
// 		if(tmp_tb_status == '1'){
// 			location.href = '#root/home';
// 			document.getElementById('s-dialog3').innerHTML = E_9007;
// 			document.getElementById('dialog3').setAttribute('href','root/home');
// 			document.getElementById('s-dialog3-btn').innerHTML = MSG_COMMON_9;
// 			document.getElementById('s-dialog3-btn').setAttribute('onclick',"touch(); Data.data['scenes']['dialog3'].onExit();starAnimation();");
// 		}else{
// 			location.href = '#root/people';
// 			document.getElementById('s-dialog3').innerHTML = E_9001;
// 		}
// 	}
// 	Data.data['scenes']['dialog3'].onEntry();
// }

/**
 * メニューブックマスタのデータ整理処理
 */
function menuBookMstEdit(){
	startMeasuringElapsedTime("menuBookMstEditStart");
	//データ初期化
	m_menubook_map = jQuery.extend(true, {}, tmp_m_menubook_map);
	// // 現在日時を取得
	// var currentDate = new Date();

	for(var mm in tmp_m_menubook_map){
		// 現在日時で有効なメニューブックのみに編集
		// ※補足：tmp_m_menubook_mapは現在日付で有効なメニューブックデータ
		// if(!(new Date(Date.parse(tmp_m_menubook_map[mm]["tStartValidDate"])) <= currentDate && new Date(Date.parse(tmp_m_menubook_map[mm]["tEndValidDate"])) > currentDate)){
		// 	delete m_menubook_map[mm];
		// }		
		if(!(menubook_cd == tmp_m_menubook_map[mm]["nMenuBookCode"])){
			delete m_menubook_map[mm];
		}	
	}
	stopMeasuringElapsedTime("menuBookMstEditStart", "menuBookMstEdit完了");
}

all_m_goods_map = [];

/**
 * 全メニュー情報配列生成処理
 */
function allGoodsMapEdit(){
	startMeasuringElapsedTime("allGoodsMapEditStart");
	//データ初期化
	all_m_goods_map = [];

	for(var mm in tmp_m_goods_map){	
		for(var mp in tmp_m_goods_map[mm]){
			all_m_goods_map[mp] = jQuery.extend(true, {}, tmp_m_goods_map[mm][mp]);
			if(all_m_goods_map[mp]["cGoodsNameJp"] == null){
				// 一旦日本語商品名を退避
				all_m_goods_map[mp]["cGoodsNameJp"] = all_m_goods_map[mp]["cGoodsName"];
			}
			// 言語設定の反映
			// if(goods_lng_map.get(all_m_goods_map[mp]["nGoodsCode"]) != null){
			// 	all_m_goods_map[mp]["cGoodsName"] = goods_lng_map.get(all_m_goods_map[mp]["nGoodsCode"])["name"];
			// }
			if(MSG_CSS_LANG == "jp"){
				all_m_goods_map[mp]["cGoodsName"] = all_m_goods_map[mp]["cGoodsNameJp"];
			} else if(MSG_CSS_LANG == "en"){
				all_m_goods_map[mp]["cGoodsName"] = all_m_goods_map[mp]["cGoodsNameEn"];
			} else if(MSG_CSS_LANG == "kr"){
				all_m_goods_map[mp]["cGoodsName"] = all_m_goods_map[mp]["cGoodsNameKr"];
			} else if(MSG_CSS_LANG == "cn"){
				all_m_goods_map[mp]["cGoodsName"] = all_m_goods_map[mp]["cGoodsNameCn"];
			}
		}
	}
	stopMeasuringElapsedTime("allGoodsMapEditStart", "allGoodsMapEdit完了");
}

// 全メニュー区分のリスト
var allGoodsMenutypes = {};

/**
 * 商品マスタのデータ整理処理
 */
function goodsMstEdit(){
	startMeasuringElapsedTime("goodsMstEditStart");

	// 商品マスタの未編集データの残しておくため、コピーしたものを編集していく。
	m_goods_map = jQuery.extend(true, {}, tmp_m_goods_map);

	// 全メニューデータの配列生成
	allGoodsMapEdit();

	// 全メニュー区分のリストを初期化
	allGoodsMenutypes = {};

	//データ初期化
	m_goods_hb_map = [];
	m_goods_tp_map = [];
	m_goods_sc_map = [];
	m_goods_rp_map = [];
	m_goods_sr_map = [];
	base_dish_map = [];

	var targetMbc = "1";
	for(mbc in m_goods_map) {
		if(m_menubook_map[mbc] != null){
			targetMbc = mbc;
		}

	}
	m_goods_map = m_goods_map[targetMbc];
	// 表示領域取得
	var ordermade_animation = document.getElementById('ordermade_animation');
	if(!(pushGoodsStatusChangeFlg) && regFlg != '1'){
		// 表示領域初期化
		ordermade_animation.innerHTML = '';

		// 煙生成
		var smog1 = document.createElement('img');
		smog1.setAttribute('id','smogEff1');
		smog1.setAttribute('class','smogEffNone');
		smog1.setAttribute('src',lis_fact_map['images/order_select/smog.png']);
		var smog2 = document.createElement('img');
		smog2.setAttribute('id','smogEff2');
		smog2.setAttribute('class','smogEffNone');
		smog2.setAttribute('src',lis_fact_map['images/order_select/smog.png']);
		ordermade_animation.appendChild(smog1);
		ordermade_animation.appendChild(smog2);
	}

	// サブメニューとなる商品をチェック
	var tmp_submenuCode_list = {};
	// for(sd in submenuData_map){
	// 	tmp_submenuCode_list[submenuData_map[sd]["cValue7"]] = "";
	// 	tmp_submenuCode_list[submenuData_map[sd]["cValue8"]] = "";
	// 	tmp_submenuCode_list[submenuData_map[sd]["cValue9"]] = "";
	// }

	// 取扱い禁止、販売中止データリスト
	var notSaleItemList = [];

	for(var rc in m_goods_map) {
		if(m_goods_map[rc]["bySalesStopType"] == "2" || m_goods_map[rc]["byGoodsDataType"] == "3"){
			// 取扱い禁止、販売中止データを削除リストに記録
			notSaleItemList.push(m_goods_map[rc]["nGoodsCode"]);
			// 整理をスキップ
			continue;
		}
		if((m_goods_map[rc]["byMenuType"] == "1"
		|| m_goods_map[rc]["byMenuType"] == "2"
		|| m_goods_map[rc]["byMenuType"] == "3"
		|| m_goods_map[rc]["byMenuType"] == "4") && regFlg == '1'){
			// レジ起動の場合、テイクアウト以外スキップ
			continue;
		}

		// 言語設定の反映
		// if(goods_lng_map.get(m_goods_map[rc]["nGoodsCode"]) != null){
		// 	m_goods_map[rc]["cGoodsName"] = goods_lng_map.get(m_goods_map[rc]["nGoodsCode"])["name"];
		// }
		if(m_goods_map[rc]["cGoodsNameJp"] == null){
			// 一旦日本語商品名を退避
			m_goods_map[rc]["cGoodsNameJp"] = m_goods_map[rc]["cGoodsName"];
		}
		if(MSG_CSS_LANG == "jp"){
			m_goods_map[rc]["cGoodsName"] = m_goods_map[rc]["cGoodsNameJp"];
		} else if(MSG_CSS_LANG == "en"){
			m_goods_map[rc]["cGoodsName"] = m_goods_map[rc]["cGoodsNameEn"];
		} else if(MSG_CSS_LANG == "kr"){
			m_goods_map[rc]["cGoodsName"] = m_goods_map[rc]["cGoodsNameKr"];
		} else if(MSG_CSS_LANG == "cn"){
			m_goods_map[rc]["cGoodsName"] = m_goods_map[rc]["cGoodsNameCn"];
		}

		if(tmp_submenuCode_list[rc] != null){
			// サブメニュー商品の場合、スキップ
			continue;
		}

		if(m_goods_map[rc]["bySalesStatusType"] != "2"){
			// 品切れじゃない商品の場合、全メニュー区分リストに記録
			// メモ：99が取れるのは気にせず
			allGoodsMenutypes[m_goods_map[rc]["byMenuType"]] = "";
		}

		if(m_goods_map[rc]["byMenuType"] == "1"){
			//オーダーメイドディッシュ商品の整理
			if("1" == m_goods_map[rc]["nGoodsType"]){
				m_goods_map[rc]["quantity"] = 0;
				m_goods_map[rc]["menu"] = "ordermade";
				m_goods_map[rc]["type"] = "hamburg";
				// ハンバーグのみのMAPに格納
				m_goods_hb_map[m_goods_map[rc]["nGoodsCode"]] = jQuery.extend(true, {}, m_goods_map[rc]);

			}else if("2" == m_goods_map[rc]["nGoodsType"]){
				m_goods_map[rc]["quantity"] = "0";
				// トッピングのみのMAPに格納
				m_goods_tp_map[m_goods_map[rc]["nGoodsCode"]] = jQuery.extend(true, {}, m_goods_map[rc]);
			}else if("3" == m_goods_map[rc]["nGoodsType"]){
				m_goods_map[rc]["quantity"] = "0";
				// ライス・パスタのみのMAPに格納
				m_goods_rp_map[m_goods_map[rc]["nGoodsCode"]] = jQuery.extend(true, {}, m_goods_map[rc]);
			}else if("4" == m_goods_map[rc]["nGoodsType"]){
				m_goods_map[rc]["quantity"] = "0";
				// サラダのみのMAPに格納
				m_goods_sr_map[m_goods_map[rc]["nGoodsCode"]] = jQuery.extend(true, {}, m_goods_map[rc]);
			}else if("5" == m_goods_map[rc]["nGoodsType"]){
				m_goods_map[rc]["quantity"] = "0";
				// ソースのみのMAPに格納
				m_goods_sc_map[m_goods_map[rc]["nGoodsCode"]] = jQuery.extend(true, {}, m_goods_map[rc]);
			}
			if(!(pushGoodsStatusChangeFlg)){
				// 商品画像生成
				var goodsNo = m_goods_map[rc]["nGoodsCode"];
				if (goodsNo != '92008') {
					// ハンバーグソースの場合、画像取得をスキップ
					var img = document.createElement('img');
					img.setAttribute('id','ordermade_img_'+goodsNo);
					img.setAttribute('class','ordermade_goods ordermade_goods_first');
					img.setAttribute('src',lis_fact_map['images/goods/'+goodsNo+'.png']);
	
					// X軸
					var Xline = ORDERMADE_X + parseInt((m_goods_map[rc]['nDispPositionX']));
					// Y軸
					var YLine = ORDERMADE_Y - parseInt((m_goods_map[rc]['nDispPositionY']));
					// 高さ比率
					var height = m_goods_map[rc]['nHeightRate'];
					// 幅比率
					var width = m_goods_map[rc]['nWidthRate'];
					// 表示順序
					var zLine = ORDERMADE_Z + parseInt(m_goods_map[rc]['nZline']);
	
					// 商品画像位置・サイズ・表示順序を設定
					img.setAttribute('style','left:'+Xline+'%;top:'+YLine+'%;height:'+height+'%;width:'+width+'%;z-index:'+zLine+';');
					
					ordermade_animation.appendChild(img);
				}
			}

		}
		// else if(m_goods_map[rc]["byMenuType"] == "2"){
		// 	//お子様メニューの整理
		// 	child_goods_map[m_goods_map[rc]["nGoodsCode"]] = jQuery.extend(true, {}, m_goods_map[rc]);
		// }else if(m_goods_map[rc]["byMenuType"] == "3"){
		// 	//サイドメニューの整理
		// 	side_goods_map[m_goods_map[rc]["nGoodsCode"]] = jQuery.extend(true, {}, m_goods_map[rc]);
		// }else if(m_goods_map[rc]["byMenuType"] == "4"){
		// 	//ドリンクメニューの整理
		// 	drink_goods_map[m_goods_map[rc]["nGoodsCode"]] = jQuery.extend(true, {}, m_goods_map[rc]);
		// }else if(m_goods_map[rc]["byMenuType"] == "5"){
		// 	//テイクアウトディッシュメニューの整理
		// 	takeout_dish_goods_map[m_goods_map[rc]["nGoodsCode"]] = jQuery.extend(true, {}, m_goods_map[rc]);
		// }else if(m_goods_map[rc]["byMenuType"] == "6"){
		// 	//テイクアウトドリンクメニューの整理
		// 	takeout_drink_goods_map[m_goods_map[rc]["nGoodsCode"]] = jQuery.extend(true, {}, m_goods_map[rc]);
		// }else if(m_goods_map[rc]["byMenuType"] == "7"){
		// 	//テイクアウトサイドメニューの整理
		// 	takeout_side_goods_map[m_goods_map[rc]["nGoodsCode"]] = jQuery.extend(true, {}, m_goods_map[rc]);
		// }else if(m_goods_map[rc]["byMenuType"] == "8"){
		// 	//モーニングメニューの整理
		// 	morning_goods_map[m_goods_map[rc]["nGoodsCode"]] = jQuery.extend(true, {}, m_goods_map[rc]);
		// }else if(m_goods_map[rc]["byMenuType"] == "9"){
		// 	//モーニングメニューの整理
		// 	morning_goods_map2[m_goods_map[rc]["nGoodsCode"]] = jQuery.extend(true, {}, m_goods_map[rc]);
		// }

		// if(m_goods_map[rc]["byMenuType"] == "10" && menubook_cd == '2'){
		// 	side_goods_map[m_goods_map[rc]["nGoodsCode"]] = jQuery.extend(true, {}, m_goods_map[rc]);
		// 	morning_goods_map[m_goods_map[rc]["nGoodsCode"]] = jQuery.extend(true, {}, m_goods_map[rc]);
		// 	morning_goods_map2[m_goods_map[rc]["nGoodsCode"]] = jQuery.extend(true, {}, m_goods_map[rc]);
		// }

		if(m_goods_map[rc]["byGoodsDataType"] == "2" && regFlg != '1'){
			//限定メニューの整理
			limit_goods_map[m_goods_map[rc]["nGoodsCode"]] = jQuery.extend(true, {}, m_goods_map[rc]);
		}
	}
	for(var i=0;i<notSaleItemList.length;i++){
		// 取扱い禁止、販売中止データを削除
		delete m_goods_map[notSaleItemList[i]];
	}

	if(regFlg != '1'){
		//空のディッシュを作成する
		base_dish_map['hb'] = jQuery.extend(true, {}, m_goods_hb_map);
		base_dish_map['tp'] = jQuery.extend(true, {}, m_goods_tp_map);
		base_dish_map['rp'] = jQuery.extend(true, {}, m_goods_rp_map);
		base_dish_map['sr'] = jQuery.extend(true, {}, m_goods_sr_map);
		base_dish_map['sc'] = jQuery.extend(true, {}, m_goods_sc_map);
	}

	// 限定メニュー準備中表示初期化
	// var tar = document.getElementById("limit_top_icon");
	// tar.setAttribute('class','main_menu1_btn2');
	// var side = document.getElementById("c-menu1__btn1");
	// side.setAttribute('class','');
	// if(Object.keys(limit_goods_map).length == 0){
	// 	// 限定メニューが１件もない場合、「ただいま準備中です」表示
	// 	tar.classList.add("off");
	// 	tar.classList.add(MSG_CSS_LANG);
	// 	side.classList.add("off");
	// 	side.classList.add(MSG_CSS_LANG);
	// }

	if(regFlg != '1' && !pushGoodsStatusChangeFlg){
		// 購入誘導ポップアップ更新
		withGoodsDetail();
	}
	stopMeasuringElapsedTime("goodsMstEditStart", "goodsMstEdit完了");
}

/**
 * レイアウトデータのプリロードリトライ処理
 */
function preloadRetry(type,src){
	if(contains(src,"Thumbs.db")){return;}
	var img = document.createElement('img');
	img.src = src;
	img.onerror = function(src) { 
		preloadRetry(type,src.path[0].src);
	}
}

/**
 * レイアウトデータのプリロード処理
 */
function layoutDataPreload() {
	imgChange();
	return;
	// 配列化
	layoutData_list = JSON.parse(layoutData_json);
	var imgTmp = document.getElementById('imgTmp');
	// imgChange();
	// レイアウトデータをプリロード
	for(var layData in layoutData_list) {
		// if(layoutData_list[layData] != null && contains(layoutData_list[layData],IMG_DIR)){
		if(layoutData_list[layData] != null){
			if(MSG_CSS_LANG == 'jp'){
				if(contains(layoutData_list[layData],'/en/')){
					continue;
				}
			}
			if(MSG_CSS_LANG == 'en'){
				if(contains(layoutData_list[layData],'/jp/')){
					continue;
				}
			}
			if(contains(layoutData_list[layData],'screensaver')){continue;}
			var img = document.createElement('img');
			img.src = layoutData_list[layData].replace('en_order/','');
		}
	}
	// レイアウトデータをプリロード
	for(var layData in layoutData_list) {
		if(layoutData_list[layData] != null && contains(layoutData_list[layData],IMG_DIR)){
			if(contains(layoutData_list[layData],'screensaver')){
				var img = document.createElement('img');
				img.src = layoutData_list[layData].replace('en_order/','');
				imgTmp.appendChild(img);
			}
		}
	}
}

/**
 * 言語切り替え処理（商品マスタ)
 * @param "jp","en","kr","cn"
 */
function changeLanguage(lang) {
	startMeasuringElapsedTime("changeLanguageStart");
	try{
		// // 先頭末尾の"を削除
		// var tmp_lng_json = lng_json;
		// tmp_lng_json = tmp_lng_json.substr( 1 );
		// tmp_lng_json = tmp_lng_json.substr( 0, tmp_lng_json.length - 1);
		// // 「\"」　⇒ 「"」　へ置換
		// tmp_lng_json = tmp_lng_json.replace(/\\"/g, '"');
		// // 不要文字削除
		// tmp_lng_json =tmp_lng_json.replace(/\\ufeff/, '');
		// // 言語設定ファイルを配列変換
		// tmp_goods_lng_map = JSON.parse(tmp_lng_json);

		// // if(tmp_goods_lng_map["item"]["0"]["item_id"] == "dummy"){
		// // 	// ダミーデータが返って来た場合、取得失敗処理
		// // 	// 通信エラーポップアップを表示
		// // 	getDataErrorPopUp();
		// // 	return;
		// // }
		// goods_lng_map = new Map();

		// var formatLang;
		// if(lang == 'jp'){
		// 	formatLang = 'default';
		// }else if(lang == 'kr'){
		// 	formatLang = 'ko';
		// }else if(lang == 'cn'){
		// 	if(contains(tmp_lng_json,'"language":"pk"')){
		// 		formatLang = 'pk';
		// 	}else{
		// 		formatLang = 'kt';
		// 	}
		// }else if(lang == 'en'){
		// 	formatLang = 'en';
		// }
		// tmp_lng_json = null;
		// for(var data in tmp_goods_lng_map["item"]){
		// 	if(formatLang == tmp_goods_lng_map["item"][data]["language"]){
		// 		//選択言語のみのマップを生成
		// 		goods_lng_map.set(tmp_goods_lng_map["item"][data]["item_id"], tmp_goods_lng_map["item"][data]);
		// 	}
		// }

		menuBookMstEdit();
		goodsMstEdit();

		// 「オーダーメイドディッシュ」の言語設定変更
		chgOrdMadeLang(lang);

		// 確定前オーダーmap内の言語設定
		chgBfOrdMap();

		// 確定後オーダーmap内の言語設定
		chgAfOrdMap();
	}catch(e){
		// エラーが発生した場合、メニュー情報取得リトライ
		postErrLog(e.message+'　'+e.stack);
		getMenuBookMaster(false);
		return;
	}
	stopMeasuringElapsedTime("changeLanguageStart", "changeLanguage完了");
}

/**
 * オーダーメイドディッシュベース選択画面リセット処理
 */
function orderMadeDishBaseSelectReset(){
	startMeasuringElapsedTime("orderMadeDishBaseSelectResetStart");
	document.getElementById("base_dish1").classList.remove("off");
	document.getElementById('base_dish2').classList.remove("off");
	document.getElementById("base_dish3").classList.remove("off");
	document.getElementById('base_dish4').classList.remove("off");
	document.getElementById("base_dish5").classList.remove("off");
	document.getElementById('base_dish6').classList.remove("off");
	stopMeasuringElapsedTime("orderMadeDishBaseSelectResetStart", "orderMadeDishBaseSelectReset完了");
}

/**
 * オーダーメイドディッシュベース選択画面品切れチェック処理
 * @param 1:フルカスタム,2:レギュラー,3:エッグ,4:パイン,5:おろしそ,6:チーズ
 */
function orderMadeDishBaseSelectCheck(type){
	console.log("orderMadeDishBaseSelectCheck")
	console.log(type)
	// 品切れフラグ
	var notStockFlg = false;
	var baseNotStockFlg = false;

	if(checkNotEmpty(m_basedishcombo_map[type]) && checkNotEmpty(m_basedishcombo_map[type]['nGoodsCode'])){
		if(m_goods_map[m_basedishcombo_map[type]['nGoodsCode']] == null){
			// ベース商品が存在しない場合
			baseNotStockFlg = true;
		}
		else if(m_goods_map[m_basedishcombo_map[type]['nGoodsCode']]["bySalesStatusType"] == 2){
			// ベース商品が品切れの場合
			notStockFlg = true;
		}
	}

	if(checkNotEmpty(m_basedishcombo_map[type]) && checkNotEmpty(m_basedishcombo_map[type]['nHamburgGoodsCode'])){
		if(m_goods_map[m_basedishcombo_map[type]['nHamburgGoodsCode']] == null ||
			 m_goods_map[m_basedishcombo_map[type]['nHamburgGoodsCode']]["bySalesStatusType"] == 2){
			// ハンバーグ商品が品切れの場合
			notStockFlg = true;
		}
	}
	if(checkNotEmpty(m_basedishcombo_map[type]) && checkNotEmpty(m_basedishcombo_map[type]['nToppingGoodsCode'])){
		if(m_goods_map[m_basedishcombo_map[type]['nToppingGoodsCode']] == null ||
			m_goods_map[m_basedishcombo_map[type]['nToppingGoodsCode']]["bySalesStatusType"] == 2){
			// トッピング商品が品切れの場合
			notStockFlg = true;
		}
	}
	if(checkNotEmpty(m_basedishcombo_map[type]) && checkNotEmpty(m_basedishcombo_map[type]['nSourceGoodsCode'])){
		if(m_goods_map[m_basedishcombo_map[type]['nSourceGoodsCode']] == null ||
			m_goods_map[m_basedishcombo_map[type]['nSourceGoodsCode']]["bySalesStatusType"] == 2){
			// ソース商品が品切れの場合
			notStockFlg = true;
		}
	}
	if(checkNotEmpty(m_basedishcombo_map[type]) && checkNotEmpty(m_basedishcombo_map[type]['nRiceGoodsCode'])){
		if(m_goods_map[m_basedishcombo_map[type]['nRiceGoodsCode']] == null ||
			m_goods_map[m_basedishcombo_map[type]['nRiceGoodsCode']]["bySalesStatusType"] == 2){
			// ライス・パスタ商品が品切れの場合
			notStockFlg = true;
		}
	}
	if(checkNotEmpty(m_basedishcombo_map[type]) && checkNotEmpty(m_basedishcombo_map[type]['nSaladGoodsCode'])){
		if(m_goods_map[m_basedishcombo_map[type]['nSaladGoodsCode']] == null ||
			m_goods_map[m_basedishcombo_map[type]['nSaladGoodsCode']]["bySalesStatusType"] == 2){
			// サラダ商品が品切れの場合
			notStockFlg = true;
		}
	}

	// ハンバーグが全て品切れの場合
	var hbCnt = 0;
	for(var gc in base_dish_map['hb']){
		if(base_dish_map['hb'][gc]["bySalesStatusType"] != 2){
			hbCnt = hbCnt + 1;
		}
	}
	if(hbCnt == 0){
		notStockFlg = true;
	}
	// ライス・パスタが全て品切れの場合
	var rpCnt = 0;
	for(var gc in base_dish_map['rp']){
		if(base_dish_map['rp'][gc]["bySalesStatusType"] != 2){
			rpCnt = rpCnt + 1;
		}
	}
	if(rpCnt == 0){
		notStockFlg = true;
	}
	// サラダが全て品切れの場合
	var srCnt = 0;
	for(var gc in base_dish_map['sr']){
		if(base_dish_map['sr'][gc]["bySalesStatusType"] != 2){
			srCnt = srCnt + 1;
		}
	}
	if(srCnt == 0){
		notStockFlg = true;
	}

	if(notStockFlg || baseNotStockFlg){
		// 品切れ商品が含まれていた場合、リンク無効化
		if(type == 1){
			var tar = document.getElementById("base_dish1");
			tar.setAttribute('class','jBtn s-ordermade__btn1')
			tar.classList.add("off");
			tar.classList.add(MSG_CSS_LANG);
			if(baseNotStockFlg){
				tar.classList.add("comsoon");
			}
		}else if(type == 2){
			var tar = document.getElementById("base_dish2");
			tar.setAttribute('class','jBtn s-ordermade__btn2')
			tar.classList.add("off");
			tar.classList.add(MSG_CSS_LANG);
			if(baseNotStockFlg){
				tar.classList.add("comsoon");
			}
		}else if(type == 3){
			var tar = document.getElementById("base_dish3");
			tar.setAttribute('class','jBtn s-ordermade__btn3')
			tar.classList.add("off");
			tar.classList.add(MSG_CSS_LANG);
			if(baseNotStockFlg){
				tar.classList.add("comsoon");
			}
		}else if(type == 4){
			var tar = document.getElementById("base_dish4");
			tar.setAttribute('class','jBtn s-ordermade__btn4')
			tar.classList.add("off");
			tar.classList.add(MSG_CSS_LANG);
			if(baseNotStockFlg){
				tar.classList.add("comsoon");
			}
		}else if(type == 5){
			var tar = document.getElementById("base_dish5");
			tar.setAttribute('class','jBtn s-ordermade__btn5')
			tar.classList.add("off");
			tar.classList.add(MSG_CSS_LANG);
			if(baseNotStockFlg){
				tar.classList.add("comsoon");
			}
		}else if(type == 6){
			var tar = document.getElementById("base_dish6");
			tar.setAttribute('class','jBtn s-ordermade__btn6')
			tar.classList.add("off");
			tar.classList.add(MSG_CSS_LANG);
			if(baseNotStockFlg){
				tar.classList.add("comsoon");
			}
		}
	}
}

/**
 * オーダーメイドディッシュベース作成処理
 * @param 1:フルカスタム,2:レギュラー,3:エッグ,4:パイン,5:おろしそ,6:チーズ
 */
function createOerderDish(dishType){
	outOparationLog("オーダーメイドディッシュベース選択画面-ベース選択処理開始,選択:"+dishType);
	location.href = '#root/order/order-select';
	console.log("createOerderDishが呼ばれました")
	// 各一覧のスクロール位置を一番下に移動
	document.getElementById('hbMain').setAttribute('class','p-orderSelectMenu__nav current');
	document.getElementById('hbList').scrollTop = 0;
	document.getElementById('tpMain').setAttribute('class','p-orderSelectMenu__nav current');
	document.getElementById('tpList').scrollTop = 0;
	document.getElementById('rpMain').setAttribute('class','p-orderSelectMenu__nav current');
	document.getElementById('rpList').scrollTop = 0;
	document.getElementById('scMain').setAttribute('class','p-orderSelectMenu__nav current');
	document.getElementById('scList').scrollTop = 0;
	document.getElementById('srMain').setAttribute('class','p-orderSelectMenu__nav current');
	document.getElementById('srList').scrollTop = 0;

	// アニメーション準備
	goodsAnimationSet();
	
	// ベースディッシュマップ(空皿)をディープコピー
	create_dish_map = jQuery.extend(true, {}, base_dish_map);

	// オーダーメイドディッシュ作成中フラグON
	dishEditingFlg = true;
	changeSideLnk();

	// 自動タブ切替禁止フラグ初期化
	nextBanFlg = true;

	var fulcstomFlg= true;
	var hbFlg = false;
	var rpFlg = false;
	var srFlg = false;

	// 初回サラダ選択フラグリセット
	fstSrChoiceFlg = false;

	// ナイスチョイスシーン初期化
	var ordermade_animation = document.getElementById('ordermade_animation_nc');
	ordermade_animation.innerHTML = '';
	var dish = document.createElement('img');
	dish.setAttribute('class','niceChoice_dish');
	dish.setAttribute('src',lis_fact_map['images/order_select/dish.png']);
	dish.setAttribute('style','width:106%;height:110%;max-width: 106%;');
	ordermade_animation.setAttribute('style','left:13.5%;top:10%;');
	ordermade_animation.appendChild(dish);
	var ordermade_animation_img = document.getElementById('ordermade_animation_nc_img');
	ordermade_animation_img.setAttribute('style','left:3%;top:2%;');
	ordermade_animation_img.innerHTML = '';
	document.getElementById('hbChoice').textContent = '';
	document.getElementById('tpChoice').textContent = '';
	document.getElementById('rpChoice').textContent = '';
	document.getElementById('scChoice').textContent = '';
	document.getElementById('srChoice').textContent = '';

	// 基本形ディッシュ組合せマスタのデータを参照し、選択状態を反映する。
	if(checkNotEmpty(m_basedishcombo_map[dishType]) && checkNotEmpty(m_basedishcombo_map[dishType]['nHamburgGoodsCode'])){
		if(checkNotEmpty(create_dish_map['hb'][m_basedishcombo_map[dishType]['nHamburgGoodsCode']])){
			// ハンバーグの商品数量：1をセット
			create_dish_map['hb'][m_basedishcombo_map[dishType]['nHamburgGoodsCode']]["quantity"] = 1;
			hbFlg = true;
		}
	}
	if(checkNotEmpty(m_basedishcombo_map[dishType]) && checkNotEmpty(m_basedishcombo_map[dishType]['nToppingGoodsCode'])){
		console.log("トッピング")
		console.log(dishType)
		console.log(m_basedishcombo_map[dishType]['nToppingGoodsCode'])
		if(m_basedishcombo_map[dishType]['nToppingGoodsCode'] == 15028) {
			console.log("ベーコンエッグ")
			create_dish_map['tp'][15001]["quantity"] = 1;
			create_dish_map['tp'][15001]["lock"] = "on";

			create_dish_map['tp'][15006]["quantity"] = 1;
			create_dish_map['tp'][15006]["lock"] = "on";

		} 
		console.log(create_dish_map['tp'][m_basedishcombo_map[dishType]['nToppingGoodsCode']])
		if(checkNotEmpty(create_dish_map['tp'][m_basedishcombo_map[dishType]['nToppingGoodsCode']])){
			// トッピングの商品数量：1をセット
			if(create_dish_map['tp'][m_basedishcombo_map[dishType]['nToppingGoodsCode']] == 15028) {
				console.log("ベーコンエッグ")
				create_dish_map['tp'][m_basedishcombo_map[dishType][15001]]["quantity"] = 1;
				create_dish_map['tp'][m_basedishcombo_map[dishType][15001]]["lock"] = "on";

				create_dish_map['tp'][m_basedishcombo_map[dishType][15006]]["quantity"] = 1;
				create_dish_map['tp'][m_basedishcombo_map[dishType][15006]]["lock"] = "on";

			} else {
				create_dish_map['tp'][m_basedishcombo_map[dishType]['nToppingGoodsCode']]["quantity"] = 1;
				create_dish_map['tp'][m_basedishcombo_map[dishType]['nToppingGoodsCode']]["lock"] = "on";
				console.log(create_dish_map['tp'][m_basedishcombo_map[dishType]['nToppingGoodsCode']])
			}
		}
	}
	if(checkNotEmpty(m_basedishcombo_map[dishType]) && checkNotEmpty(m_basedishcombo_map[dishType]['nSourceGoodsCode'])){
		if(checkNotEmpty(create_dish_map['sc'][m_basedishcombo_map[dishType]['nSourceGoodsCode']])){
			// ソースの商品数量：1をセット
			create_dish_map['sc'][m_basedishcombo_map[dishType]['nSourceGoodsCode']]["quantity"] = 1;
		}
	}
	if(checkNotEmpty(m_basedishcombo_map[dishType]) && checkNotEmpty(m_basedishcombo_map[dishType]['nRiceGoodsCode'])){
		if(checkNotEmpty(create_dish_map['rp'][m_basedishcombo_map[dishType]['nRiceGoodsCode']])){
			// ライス・パスタの商品数量：1をセット
			create_dish_map['rp'][m_basedishcombo_map[dishType]['nRiceGoodsCode']]["quantity"] = 1;
			rpFlg = true;
		}
	}
	if(checkNotEmpty(m_basedishcombo_map[dishType]) && checkNotEmpty(m_basedishcombo_map[dishType]['nSaladGoodsCode'])){
		if(checkNotEmpty(create_dish_map['sr'][m_basedishcombo_map[dishType]['nSaladGoodsCode']])){
			// サラダの商品数量：1をセット
			create_dish_map['sr'][m_basedishcombo_map[dishType]['nSaladGoodsCode']]["quantity"] = 1;
			srFlg = true;
		}
	}
	if(hbFlg && rpFlg && srFlg){
		// ベースに最低限の商品が揃っていない場合、初回導線を有効化
		fulcstomFlg = false;
	}

	// ソース選択制限設定処理
	OrdMadechangeLimitFlg = false;
	if(checkNotEmpty(m_basedishcombo_map[dishType]['nCngSourceGoodsCode1']) 
	|| checkNotEmpty(m_basedishcombo_map[dishType]['nCngSourceGoodsCode2'])
	|| checkNotEmpty(m_basedishcombo_map[dishType]['nCngSourceGoodsCode3']) ){
		for(var i=1;i<=3;i++){
			if(create_dish_map["sc"][m_basedishcombo_map[dishType]['nCngSourceGoodsCode'+i]] != null){
				// 制限有効化
				create_dish_map["sc"][m_basedishcombo_map[dishType]['nCngSourceGoodsCode'+i]]["ChangeLimit"] = "on";
				create_dish_map["sc"][m_basedishcombo_map[dishType]["nSourceGoodsCode"]]["ChangeLimit"] = "on";
			}
		}
		for(line in create_dish_map["sc"]){
			if(create_dish_map["sc"][line]["ChangeLimit"] != "on"){
				delete create_dish_map["sc"][line];
			}
		}
		OrdMadechangeLimitFlg = true;
	}

	// マイディッシュ完成ボタン多重タップ防止フラグリセット
	niceChoiceFlg = false;

	// 選択ベースコードをセット
	ordMadeSelectBaseCode = dishType;
	document.getElementById('MSG_ORDMADE_13').textContent =all_m_goods_map[m_basedishcombo_map[ordMadeSelectBaseCode]["nGoodsCode"]]["cGoodsName"];

	if(fulcstomFlg){
		// ソース・ライス番号切替
		document.getElementById('1stNum').textContent = '1';
		document.getElementById('2ndNum').textContent = '2';
		document.getElementById('3rdNum').textContent = '3';
		document.getElementById('4thNum').textContent = '4';
		document.getElementById('5thNum').textContent = '5';
		document.getElementById('1stNum2').textContent = '1';
		document.getElementById('2ndNum2').textContent = '2';
		document.getElementById('3rdNum2').textContent = '3';
		document.getElementById('4thNum2').textContent = '4';
		document.getElementById('5thNum2').textContent = '5';
		document.getElementById('ordmade_guide_msg').innerHTML = MSG_ORDMADE_37;

		// ①ハンバーグ追加ボタン表示
		document.getElementById('hbBtn').style.display = '';
		document.getElementById('hbNav').style.paddingBottom = '';

		// フルカスタムの場合、初回導線ON
		firstDishMakeFlg = true;
		firstDishMakeEndFlg = false;
		firstDishMakeHbEndFlg = false;
		firstDishMakeTpEndFlg = false;
		firstDishMakeRpEndFlg = false;
		firstDishMakeScEndFlg = false;
		firstDishMakeSrEndFlg = false;
		firstEditIncomplete();
		firstFinishFlg = false;
		document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1');
		// ガイドメッセージ表示
		document.getElementById('ordmade_guide_msg').style.display= 'none';
		document.getElementById('ordmade_guide_msg').style.animation = '';
	}else{
		if(addHpDispTpFlg){
		// 追加ハンバーグのトッピング一覧表示機能がONの場合
			// ソース・ライス番号切替
			document.getElementById('1stNum').textContent = '1';
			document.getElementById('2ndNum').textContent = '1';
			document.getElementById('3rdNum').textContent = '3';
			document.getElementById('4thNum').textContent = '2';
			document.getElementById('5thNum').textContent = '4';
			document.getElementById('1stNum2').textContent = '1';
			document.getElementById('2ndNum2').textContent = '1';
			document.getElementById('3rdNum2').textContent = '3';
			document.getElementById('4thNum2').textContent = '2';
			document.getElementById('5thNum2').textContent = '4';
			document.getElementById('ordmade_guide_msg').innerHTML = MSG_ORDMADE_37_2;

			// ①ハンバーグ追加ボタン非表示
			document.getElementById('hbBtn').style.display = 'none';
			document.getElementById('hbNav').style.paddingBottom = '0';
		} else {
			// ソース・ライス番号切替
			document.getElementById('1stNum').textContent = '1';
			document.getElementById('2ndNum').textContent = '2';
			document.getElementById('3rdNum').textContent = '4';
			document.getElementById('4thNum').textContent = '3';
			document.getElementById('5thNum').textContent = '5';
			document.getElementById('1stNum2').textContent = '1';
			document.getElementById('2ndNum2').textContent = '2';
			document.getElementById('3rdNum2').textContent = '4';
			document.getElementById('4thNum2').textContent = '3';
			document.getElementById('5thNum2').textContent = '5';
			document.getElementById('ordmade_guide_msg').innerHTML = MSG_ORDMADE_37;

			// ①ハンバーグ追加ボタン非表示
			document.getElementById('hbBtn').style.display = '';
			document.getElementById('hbNav').style.paddingBottom = '';
		}

		// フルカスタム以外は、初回導線フラグをすべて完了済みとする。
		firstDishMakeFlg = false;
		firstDishMakeEndFlg = true;
		firstDishMakeHbEndFlg = true;
		firstDishMakeTpEndFlg = true;
		firstDishMakeRpEndFlg = true;
		firstDishMakeScEndFlg = true;
		firstDishMakeSrEndFlg = true;
		firstEditEnd(1);
		firstEditEnd(2);
		firstEditEnd(3);
		firstEditEnd(4);
		firstEditEnd(5);
		firstFinishFlg = true;
		document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1 all');
		// ガイドメッセージ表示
		document.getElementById('ordmade_guide_msg').style.display= 'none';
		document.getElementById('ordmade_guide_msg').style.animation = '';
		$(function(){
			document.getElementById('ordmade_guide_msg').style.display= 'block';
			document.getElementById('ordmade_guide_msg').style.animation = 'ordmade_guide_msg_ani_disp 0.5s forwards';
		})
	}
	// オーダーメイドディッシュ作成画面-ハンバーグ一覧を表示
	goodsTabReset();

	// 作成したベースをリセット用のマップにディープコピー
	reset_dish_map = jQuery.extend(true, {}, create_dish_map);

	// オーダーメイドディッシュ一覧を生成
	createorderMadeList(null,null);
	if(document.getElementById("empty_a") != null){
		document.getElementById("empty_a").setAttribute('class',"p-orderSelectBtn1 current");
	}

	// ご一緒にいかがですか画面初期化
	withGoodsDetail();

	// オーダーメイドディッシュアニメーション実行
	$(function (){
		goodsFirstAnimation();
	});

	outOparationLog("オーダーメイドディッシュベース選択画面-ベース選択処理終了,選択:"+dishType);
}

/**
 * nullチェック処理
 * @param 文字列
 * @return true/false
 */
function checkNotEmpty(str){
	if(str == null || str == ""){
		return false;
	}
	return true;
}

/** 注文確認画面生成処理 */
function createOrdChkDetail() {
}

/**
 * レジ誘導画面項目生成処理
 */
function createAccountEndDetail(){
	// レジ誘導メッセージを表示
	document.getElementById('dispAccountEnd_msg').textContent = null;
//	document.getElementById('dispAccountEnd_msg').innerHTML = I_1004;
}

/**
 * イートインソフトドリンクポップアップ生成処理
 */
function softDrinkPopDisp(){
	if(menubook_cd == "1"){
		// 数量初期化
		document.getElementById('cnt_pop_qnt_40001').textContent = 1;

		// 数量選択表示
		document.getElementById('cnt_pop_40001').style.display = 'block';
	}else{
		// 数量初期化
		document.getElementById('cnt_pop_qnt_52007').textContent = 1;

		// 数量選択表示
		document.getElementById('cnt_pop_52007').style.display = 'block';
	}
}

/**
 * イートインソフトドリンクポップアップ生成処理
 */
function toSoftDrinkPopDisp(){
	// 数量初期化
	document.getElementById('cnt_pop_qnt_90001').textContent = 1;

	// 数量選択表示
	document.getElementById('cnt_pop_90001').style.display = 'block';
}

/**
 * イートインソフトドリンクポップアップ生成処理
 *  @param 1:イートイン 2:テイクアウト
 */
function createSoftDrinkPop(type){
	return;
	if(type == '1'){
		var temp;
		if(menubook_cd == '1'){
			drinkTop = document.getElementById('drinkTop');
			temp = document.getElementById('cnt_pop_40001');
		}else{
			drinkTop = document.getElementById('morningEatInTop');
			temp = document.getElementById('cnt_pop_52007');
		}
		if(temp != null){
			drinkTop.removeChild(temp);
		}
	}else {
		drinkTop = document.getElementById('drinkTop-takeout');
		var temp = document.getElementById('cnt_pop_90001');
		if(temp != null){
			drinkTop.removeChild(temp);
		}
	}
	
	var div_pop_cnt = document.createElement('div');

	if(type == '1'){
		var roop_map;
		var gData;
		var type;
		if(menubook_cd == '1'){
			roop_map = drink_goods_map;
			gData = '40001';
			type = '4';
		}else{
			roop_map = drink_goods_map;
			gData = '52007';
			type = '4';
		}
	}else{
		var roop_map = takeout_drink_goods_map;
		var gData = '90001';
		var type = '6';
	}
	// 品切れチェック
	var tar_a;
	if(type == '4'){
		if(menubook_cd == "1"){
			tar_a = document.getElementById('EatInSoftDrink');
		}else{
			tar_a = document.getElementById('MorningSoftDrink');
		}
	}else{
		tar_a = document.getElementById('TakeOutSoftDrink');
	}
	tar_a.classList.remove('en');
	tar_a.classList.remove('jp');
	tar_a.classList.remove('off');
	if(roop_map[gData]['bySalesStatusType'] == '2'){
		tar_a.classList.add('off');
		if(MSG_CSS_LANG == 'en'){
			tar_a.classList.add('en');
		}else{
			tar_a.classList.add('jp');
		}
	}

	// 商品数量選択ポップアップシーン
	div_pop_cnt.setAttribute('id','cnt_pop_'+roop_map[gData]['nGoodsCode']);
	div_pop_cnt.setAttribute('class','p-general-pop');
	div_pop_cnt.style.display = 'none';
	// 商品数量選択タイトルメッセージ
	var span_cntAdd_msg2 = document.createElement('div');
	span_cntAdd_msg2.innerHTML = MSG_GENERAL_14_2.replace('{0}',roop_map[gData]["cGoodsName"]);
	span_cntAdd_msg2.setAttribute('style','width:100%;text-align:center;line-height: 115%;margin-top:2%;');
	div_pop_cnt.appendChild(span_cntAdd_msg2);
	// 数量箇所
	var div_qntMain = document.createElement('div');
	div_qntMain.setAttribute('style','position:relative;left:20%;');
	// 値段
	var price_span = document.createElement('span');
	price_span.innerHTML = '<span style="font-weight:bold;font-size:150%;" class="tNum">'+roop_map[gData]["nUnitCost"]+'</span>'+MSG_COMMON_6;
	price_span.setAttribute('class',"tNum");
	price_span.setAttribute('style',"width:40%;height:40%;position:absolute;left:-3%;top:10%;");




	// 数量マイナス
	var a_minus = document.createElement('a');
	var img_minus = document.createElement('img');
	img_minus.setAttribute('src',lis_fact_map["images/select/selectNumBtn1.png"]);
	img_minus.setAttribute('style',"width:9%;height:40%;position:absolute;left:33%;top:25%;");
	img_minus.setAttribute('onclick','touch(); generalCntDown('+roop_map[gData]['nGoodsCode']+');');
	a_minus.appendChild(img_minus);
	// 数量
	var div_qnt = document.createElement('div');
	div_qnt.setAttribute('style','text-align: center;margin-left:0%;');
	var p_qnt = document.createElement('p');
	p_qnt.setAttribute('style','font-size:150%;');
	p_qnt.setAttribute('id','cnt_pop_qnt_'+roop_map[gData]['nGoodsCode']);
	p_qnt.setAttribute('class','tNum');
	p_qnt.textContent = '1';
	div_qnt.appendChild(p_qnt);
	div_qnt.innerHTML = MSG_ORDMADE_9+div_qnt.innerHTML;
	// 数量プラス
	var a_plus = document.createElement('a');
	var img_plus = document.createElement('img');
	img_plus.setAttribute('src',lis_fact_map["images/select/selectNumBtn2.png"]);
	img_plus.setAttribute('style',"width:9%;height:40%;position:absolute;left:58%;top:25%;");
	img_plus.setAttribute('onclick','touch(); generalCntUp('+roop_map[gData]['nGoodsCode']+');');
	a_plus.appendChild(img_plus);

	div_qntMain.appendChild(price_span);
	div_qntMain.appendChild(a_minus);
	div_qntMain.appendChild(div_qnt);
	div_qntMain.appendChild(a_plus);
	div_pop_cnt.appendChild(div_qntMain);

	// キャンセルボタン
	var a_cancel = document.createElement('a');
	a_cancel.setAttribute('class','p-general-pop-cancel');
	var span_cancel = document.createElement('div');
	span_cancel.setAttribute('style','padding-top:3%;padding-bottom:3%;');
	span_cancel.setAttribute('onclick','touch(); generalCntCancel('+roop_map[gData]['nGoodsCode']+');');
	document.getElementById("cnt_pop_"+roop_map[gData]['nGoodsCode']);
	span_cancel.textContent = MSG_COMMON_3;
	a_cancel.appendChild(span_cancel);
	div_pop_cnt.appendChild(a_cancel);

	// 決定ボタン
	var a_next = document.createElement('a');
	a_next.setAttribute('class','p-general-pop-ok');
	var span_next = document.createElement('div');
	span_next.setAttribute('style','padding-top:3%;padding-bottom:3%;');
	span_next.setAttribute('onclick','touch(); generalCntOk('+roop_map[gData]['nGoodsCode']+','+type+');');
	span_next.textContent = MSG_GENERAL_13;
	a_next.appendChild(span_next);
	div_pop_cnt.appendChild(a_next);

	drinkTop.appendChild(div_pop_cnt);
}

var currentNDispMenuType = '99';
/**
 * 各種メニュー画面項目生成処理
 * @param 2:お子様メニュー、3:サイドメニュー、5:TOディッシュメニュー、7:TOサイドメニュー、8:モーニングメニュー、9:モーニングメニュー(サラダ付)、97:TO ドリンクメニュー(アルコール)、98:ドリンクメニュー(アルコール)、99:限定メニュー
 */
function createGeneralDetail(nDispMenuType){
	currentNDispMenuType = nDispMenuType;
	var roop_map = null;

	// 画面遷移
	location.href = '#root/kids';

	// メニュー一覧取得
	var details = document.getElementById('kidsDetails')

	var generalTop = document.getElementById('general-top');

	// 一覧の状態をリセットする
	details.textContent = null;
	generalTop.textContent = null;

	// ポップアップ裏商品選択無効化解除
	document.getElementById('p-general-pop-notatch').style.display = 'none';
	
	if(nDispMenuType == "99"){
		roop_map = limit_goods_map;
	} else {
		roop_map = m_goods_map;
	}
	// 全商品のデータ
	for(var gData in roop_map){
		if(menubook_cd == "2" &&
			(nDispMenuType == "8" || nDispMenuType == "9" || nDispMenuType == "3") &&
			m_goods_map[gData]["nGoodsCode"] == "51001" &&
			m_goods_map[gData]["nCal"] == "108" &&
			m_goods_map[gData]["nSalt"] == "0.8"){
			// ディッシャーズ専用処理として、サラダモーニング(ﾄﾞﾘﾝｸ付き)は別画面にも出す
		} else if((nDispMenuType != m_goods_map[gData]["byMenuType"]) && nDispMenuType != "99"){
			continue;
		}
		// 画面表示タグの準備
		var line = document.createElement('a');
		var p_img = document.createElement('p');
		var img_img = document.createElement('img');
		var p_name = document.createElement('p');
		var p_price = document.createElement('p');
		var p_info = document.createElement('p');
		var div_pop_img = document.createElement('div');
		// var div_pop_cnt = document.createElement('div');
		var div_pop = document.createElement('div');
		var div_pop2 = document.createElement('div');
		var strong_price = document.createElement('trong');

		// 品切れチェック
		if(roop_map[gData]["bySalesStatusType"] == 2){
			line.setAttribute('class','p-kids-btn off');
			line.classList.add(MSG_CSS_LANG);
			console.log(line)
		}else{
			line.setAttribute('class','p-kids-btn');
		}

		// 商品画像
		if(MSG_CSS_LANG == "jp"){
			p_img.setAttribute('class','p-kids-btn__img');
		} else {
			p_img.setAttribute('class','p-kids-btn__img_en');
		}
		img_img.setAttribute('src',lis_fact_map['images/goods/'+roop_map[gData]['nGoodsCode']+'.png']);
		p_img.appendChild(img_img);

		// 注文処理関数
		// line.setAttribute('href','#');
		line.setAttribute('itemid',roop_map[gData]['nGoodsCode']);
		line.setAttribute('id','kidsDetail_'+roop_map[gData]['nGoodsCode']);
		line.setAttribute('sort', roop_map[gData]["nDetailIndex"]);

		// // 商品数量選択ポップアップシーン
		// div_pop_cnt.setAttribute('id','cnt_pop_'+roop_map[gData]['nGoodsCode']);
		// div_pop_cnt.setAttribute('class','p-general-pop');
		// div_pop_cnt.style.display = 'none';
		// // 商品数量選択タイトルメッセージ
		// var span_cntAdd_msg2 = document.createElement('div');
		// span_cntAdd_msg2.innerHTML = MSG_GENERAL_14.replace('{0}',roop_map[gData]["cGoodsName"]);
		// span_cntAdd_msg2.setAttribute('style','width:100%;text-align:center;line-height: 115%;margin-top:2%;');
		// div_pop_cnt.appendChild(span_cntAdd_msg2);
		// // 数量箇所
		// var div_qntMain = document.createElement('div');
		// div_qntMain.setAttribute('style','position:relative;');
		// // 数量マイナス
		// var a_minus = document.createElement('a');
		// var img_minus = document.createElement('img');
		// img_minus.setAttribute('src',lis_fact_map["images/select/selectNumBtn1.png"]);
		// img_minus.setAttribute('style',"width:9%;height:40%;position:absolute;left:33%;top:25%;");
		// img_minus.setAttribute('onclick','touch(); generalCntDown('+roop_map[gData]['nGoodsCode']+');');
		// a_minus.appendChild(img_minus);
		// // 数量
		// var div_qnt = document.createElement('div');
		// div_qnt.setAttribute('style','text-align: center;margin-left:0%;');
		// var p_qnt = document.createElement('p');
		// p_qnt.setAttribute('style','font-size:150%;');
		// p_qnt.setAttribute('id','cnt_pop_qnt_'+roop_map[gData]['nGoodsCode']);
		// p_qnt.setAttribute('class','tNum');
		// p_qnt.textContent = '1';
		// div_qnt.appendChild(p_qnt);
		// div_qnt.innerHTML = MSG_ORDMADE_9+div_qnt.innerHTML;
		// // 数量プラス
		// var a_plus = document.createElement('a');
		// var img_plus = document.createElement('img');
		// img_plus.setAttribute('src',lis_fact_map["images/select/selectNumBtn2.png"]);
		// img_plus.setAttribute('style',"width:9%;height:40%;position:absolute;left:58%;top:25%;");
		// img_plus.setAttribute('onclick','touch(); generalCntUp('+roop_map[gData]['nGoodsCode']+');');
		// a_plus.appendChild(img_plus);

		// div_qntMain.appendChild(a_minus);
		// div_qntMain.appendChild(div_qnt);
		// div_qntMain.appendChild(a_plus);
		// div_pop_cnt.appendChild(div_qntMain);

		// // キャンセルボタン
		// var a_cancel = document.createElement('a');
		// a_cancel.setAttribute('class','p-general-pop-cancel');
		// var span_cancel = document.createElement('div');
		// span_cancel.setAttribute('style','padding-top:3%;padding-bottom:3%;');
		// span_cancel.setAttribute('onclick','touch(); generalCntCancel('+roop_map[gData]['nGoodsCode']+');');
		// document.getElementById("cnt_pop_"+roop_map[gData]['nGoodsCode']);
		// span_cancel.textContent = MSG_COMMON_3;
		// a_cancel.appendChild(span_cancel);
		// div_pop_cnt.appendChild(a_cancel);

		// // 決定ボタン
		// var a_next = document.createElement('a');
		// a_next.setAttribute('class','p-general-pop-ok');
		// var span_next = document.createElement('div');
		// span_next.setAttribute('style','padding-top:3%;padding-bottom:3%;');
		// span_next.setAttribute('onclick','touch(); generalCntOk('+roop_map[gData]['nGoodsCode']+','+type+');');
		// span_next.textContent = MSG_GENERAL_13;
		// a_next.appendChild(span_next);
		// div_pop_cnt.appendChild(a_next);

		// generalTop.appendChild(div_pop_cnt);
		line.setAttribute('onclick','touch(); generalCntDisp('+roop_map[gData]['nGoodsCode']+');');



		// 共通サブメニューの存在チェック
		var subMenuData = null;
		for(sb in submenuData_map){
			if(submenuData_map[sb]["cValue6"] == roop_map[gData]['nGoodsCode']){
				subMenuData = submenuData_map[sb];
				break;
			}
		}
		// オーダーメイド化設定のチェック
		var ordmadeGoodsFlg = false;
		var tgtBasedishcomboKey = "";
		for(var mbm in m_basedishcombo_map){
			if(m_basedishcombo_map[mbm]["nGoodsCode"] == roop_map[gData]['nGoodsCode']){
				additionMessage("[OrderMade?]", roop_map[gData]["nGoodsCode"] + ": オーダーメイド商品");
				ordmadeGoodsFlg = true;
				tgtBasedishcomboKey = mbm;
				break;
			}
		}

		if(ordmadeGoodsFlg == true){
			line.setAttribute('onclick','touch(); orderMadeDishBaseSelectCheck('+tgtBasedishcomboKey+');createOerderDish('+tgtBasedishcomboKey+');');
		}else if(subMenuData != null && subMenuData["cValue1"] == "1"){
			line.setAttribute('onclick','touch(); general1Disp('+roop_map[gData]['nGoodsCode']+');');
		}else{
			line.setAttribute('onclick','touch(); generalCntDisp('+roop_map[gData]['nGoodsCode']+');');
		}

		// 商品名
		p_name.setAttribute('class','p-kids-btn__txt1');
		var cGoodsName = roop_map[gData]['cGoodsName'];
		var loopFlg = true;
			while(loopFlg){
				if(contains(cGoodsName,'<br />')){
					cGoodsName = cGoodsName.replace('<br />',' ');
				}else{
					loopFlg = false;
				}
			}
		//p_name.textContent = cGoodsName;
		p_name.innerHTML = cGoodsName;

		if(ordmadeGoodsFlg){
			var ordCd = tgtBasedishcomboKey;
			// オーダーメイド設定ありの場合
			// ハンバーグの値段・カロリー・塩分抽出、また品切れチェック
			var hbPrice = new BigNumber(0);
			var hbCal = new BigNumber(0);
			var hbSalt = new BigNumber(0);
			var hbSoldOutFlg = false;
			if(m_basedishcombo_map[ordCd]["nHamburgGoodsCode"] != null){
				hbPrice = new BigNumber(m_goods_map[m_basedishcombo_map[ordCd]["nHamburgGoodsCode"]]["nUnitCost"]);
				hbCal = new BigNumber(m_goods_map[m_basedishcombo_map[ordCd]["nHamburgGoodsCode"]]["nCal"]);
				hbSalt = new BigNumber(m_goods_map[m_basedishcombo_map[ordCd]["nHamburgGoodsCode"]]["nSalt"]);
				if(m_goods_map[m_basedishcombo_map[ordCd]["nHamburgGoodsCode"]]["bySalesStatusType"] == '2'){
					hbSoldOutFlg = true;
				}
			}
			// トッピングの値段・カロリー・塩分抽出、また品切れチェック
			var tpPrice = new BigNumber(0);
			var tpCal = new BigNumber(0);
			var tpSalt = new BigNumber(0);
			var tpSoldOutFlg = false;
			if(m_basedishcombo_map[ordCd]["nToppingGoodsCode"] != null){
				tpPrice = new BigNumber(m_goods_map[m_basedishcombo_map[ordCd]["nToppingGoodsCode"]]["nUnitCost"]);
				tpCal = new BigNumber(m_goods_map[m_basedishcombo_map[ordCd]["nToppingGoodsCode"]]["nCal"]);
				tpSalt = new BigNumber(m_goods_map[m_basedishcombo_map[ordCd]["nToppingGoodsCode"]]["nSalt"]);
				if(m_goods_map[m_basedishcombo_map[ordCd]["nToppingGoodsCode"]]["bySalesStatusType"] == '2'){
					tpSoldOutFlg = true;
				}
			}
			// ソースの値段・カロリー・塩分抽出、また品切れチェック
			var scPrice = new BigNumber(0);
			var scCal = new BigNumber(0);
			var scSalt = new BigNumber(0);
			var scSoldOutFlg = false;
			if(m_basedishcombo_map[ordCd]["nSourceGoodsCode"] != null){
				scPrice = new BigNumber(m_goods_map[m_basedishcombo_map[ordCd]["nSourceGoodsCode"]]["nUnitCost"]);
				scCal = new BigNumber(m_goods_map[m_basedishcombo_map[ordCd]["nSourceGoodsCode"]]["nCal"]);
				scSalt = new BigNumber(m_goods_map[m_basedishcombo_map[ordCd]["nSourceGoodsCode"]]["nSalt"]);
				if(m_goods_map[m_basedishcombo_map[ordCd]["nSourceGoodsCode"]]["bySalesStatusType"] == '2'){
					scSoldOutFlg = true;
				}
			}
			// ライスの値段・カロリー・塩分抽出、また品切れチェック
			var rpPrice = new BigNumber(0);
			var rpCal = new BigNumber(0);
			var rpSalt = new BigNumber(0);
			var rpSoldOutFlg = false;
			if(m_basedishcombo_map[ordCd]["nRiceGoodsCode"] != null){
				rpPrice = new BigNumber(m_goods_map[m_basedishcombo_map[ordCd]["nRiceGoodsCode"]]["nUnitCost"]);
				rpCal = new BigNumber(m_goods_map[m_basedishcombo_map[ordCd]["nRiceGoodsCode"]]["nCal"]);
				rpSalt = new BigNumber(m_goods_map[m_basedishcombo_map[ordCd]["nRiceGoodsCode"]]["nSalt"]);
				if(m_goods_map[m_basedishcombo_map[ordCd]["nRiceGoodsCode"]]["bySalesStatusType"] == '2'){
					rpSoldOutFlg = true;
				}
			}
			// サラダの値段・カロリー・塩分抽出、また品切れチェック
			var srPrice = new BigNumber(0);
			var srCal = new BigNumber(0);
			var srSalt = new BigNumber(0);
			var srSoldOutFlg = false;
			if(m_basedishcombo_map[ordCd]["nSaladGoodsCode"] != null){
				srPrice = new BigNumber(m_goods_map[m_basedishcombo_map[ordCd]["nSaladGoodsCode"]]["nUnitCost"]);
				srCal = new BigNumber(m_goods_map[m_basedishcombo_map[ordCd]["nSaladGoodsCode"]]["nCal"]);
				srSalt = new BigNumber(m_goods_map[m_basedishcombo_map[ordCd]["nSaladGoodsCode"]]["nSalt"]);
				if(m_goods_map[m_basedishcombo_map[ordCd]["nSaladGoodsCode"]]["bySalesStatusType"] == '2'){
					rpSoldOutFlg = true;
				}
			}

			// 値段・カロリー・塩分の合計値計算
			var ordTotalPrice = hbPrice.plus(tpPrice).plus(scPrice).plus(rpPrice).plus(srPrice);
			var ordTotalCal = hbCal.plus(tpCal).plus(scCal).plus(rpCal).plus(srCal);
			var ordTotalSalt = hbSalt.plus(tpSalt).plus(scSalt).plus(rpSalt).plus(srSalt);
			// サブ商品品切れチェック結果
			var ordSoldOutFlg = (hbSoldOutFlg || tpSoldOutFlg || scSoldOutFlg || rpSoldOutFlg || rpSoldOutFlg);
			// 品切れチェック
			if(ordSoldOutFlg){
				line.setAttribute('class','p-kids-btn off');
				line.classList.remove('jp');
				line.classList.remove('en');
				line.classList.remove('kr');
				line.classList.remove('cn');
				line.classList.add(MSG_CSS_LANG);
			}else{
				line.setAttribute('class','p-kids-btn');
			}

			// 値段
			p_price.setAttribute('class','p-kids-btn__txt2');
			strong_price.innerHTML = '<span class="tNum">'+ordTotalPrice.toLocaleString()+'</span>';
			p_price.innerHTML = strong_price.innerHTML+MSG_GENERAL_2;

			var calSaltText = MSG_ORDMADE_7_2.replace('{0}','<span class="tNum">'+ordTotalCal+'</span>')
													.replace('{1}','<span class="tNum">'+ordTotalSalt+'</span>');

			// カロリー/塩分
			p_info.setAttribute('class','p-kids-btn__txt3');
			p_info.innerHTML = calSaltText;

		} else {
			// 値段
			p_price.setAttribute('class','p-kids-btn__txt2');
			strong_price.innerHTML = '<span class="tNum">'+roop_map[gData]['nUnitCost'].toLocaleString()+'</span>';
			p_price.innerHTML = strong_price.innerHTML+MSG_GENERAL_2;

			var calSaltText = MSG_ORDMADE_7_2.replace('{0}','<span class="tNum">'+roop_map[gData]['nCal']+'</span>')
													.replace('{1}','<span class="tNum">'+roop_map[gData]['nSalt']+'</span>');

			// カロリー/塩分
			p_info.setAttribute('class','p-kids-btn__txt3');
			p_info.innerHTML = calSaltText;
		}

		// // 値段
		// p_price.setAttribute('class','p-kids-btn__txt2');
		// strong_price.innerHTML = '<span class="tNum">'+roop_map[gData]['nUnitCost'].toLocaleString()+'</span>';
		// p_price.innerHTML = strong_price.innerHTML+MSG_GENERAL_2;

		// // カロリー/塩分
		// p_info.setAttribute('class','p-kids-btn__txt3');
		// p_info.innerHTML = '<span class="tNum">'+roop_map[gData]['nCal']+'</span>' + 'kcal/' + '<span class="tNum">'+roop_map[gData]['nSalt']+'</span>' + 'g';

		// 行を追加
		line.appendChild(p_img);
		line.appendChild(p_name);
		line.appendChild(p_price);
		line.appendChild(p_info);
		details.appendChild(line);

	}

	document.getElementsByClassName('p-kids-navMain')[0].setAttribute('style', '');
	// 限定商品の場合、CSSを調整
	if (nDispMenuType == 99 && Object.keys(roop_map).length == 1) {
		// 限定商品かつ、商品数が１つ
		document.getElementsByClassName('p-kids-navMain')[0].setAttribute('style', 'left:130px;width:994px;');
		document.getElementsByClassName('p-kids-btn')[0].setAttribute('style', 'width:485px; height:570px; margin:auto;');
		document.getElementsByClassName('p-kids-btn__img')[0].setAttribute('style', 'width:475px; height:445px;');
		document.getElementsByClassName('p-kids-btn__txt1')[0].setAttribute('style', 'font-size:26px;');
		document.getElementsByClassName('p-kids-btn__txt2')[0].setAttribute('style', 'font-size:26px;');
		document.getElementsByClassName('p-kids-btn__txt3')[0].setAttribute('style', 'font-size:26px;');

	} else if (nDispMenuType == 99 && Object.keys(roop_map).length == 2) {
		// 限定商品かつ、商品数が２つ
		for (i=0; i<2; i++) {
			document.getElementsByClassName('p-kids-navMain')[0].setAttribute('style', 'left:30px;width:1094px;');
			document.getElementsByClassName('p-kids-btn')[i].setAttribute('style', 'width:425px; height:500px; margin:auto;');
			document.getElementsByClassName('p-kids-btn__img')[i].setAttribute('style', 'width:425px; height:400px;');
			document.getElementsByClassName('p-kids-btn__txt1')[i].setAttribute('style', 'font-size:24px;');
			document.getElementsByClassName('p-kids-btn__txt2')[i].setAttribute('style', 'font-size:24px;');
			document.getElementsByClassName('p-kids-btn__txt3')[i].setAttribute('style', 'font-size:24px;');	
		}
	} else if (nDispMenuType == 99 && Object.keys(roop_map).length == 3) {
		// 限定商品かつ、商品数が３つ
		for (i=0; i<3; i++) {
			document.getElementsByClassName('p-kids-btn')[i].setAttribute('style', 'width:240px; height:300px; margin:145px 75px 0px 0px;');
			document.getElementsByClassName('p-kids-btn__img')[i].setAttribute('style', 'width:240px; height:225px;');
			document.getElementsByClassName('p-kids-btn__txt1')[i].setAttribute('style', 'font-size:24px;');
			document.getElementsByClassName('p-kids-btn__txt2')[i].setAttribute('style', 'font-size:24px;');
			document.getElementsByClassName('p-kids-btn__txt3')[i].setAttribute('style', 'font-size:24px;');	
		}
	}


	
	// メニュー一覧をソート
	menuListSort('1');

	document.getElementById('generalTitle').click();

	// scrollの先頭を表示
	details.scrollTop = 0;
}

/**
 * 汎用メニュー画面-サブメニュー選択処理
 * @param ボタンエレメント
 * @param 2:複数選択、3:一択
 */
function generalSubMenuSelect(btn,type){
	if(type == "3" || type == "1"){
		//　一択の場合、選択を初期化
		// 全選択ボタン
		var allBtn = btn.parentNode.childNodes;
		for(var i = 0; i < allBtn.length; i++){
			allBtn[i].classList.remove("general-sub-selected");
		}
	}
	if(!btn.classList.contains("general-sub-selected")){
		btn.classList.add("general-sub-selected");
		if(type == "2"){
			// 複数選択の場合、チェックアイコン付与
			btn.classList.add("check");
		}
		btn.classList.contains("general-sub-none")
		outOparationLog("サブメニューポップアップ-"+(type == 1 ? "ベース":"サブ")
		+"選択ON,商品コード:"+(btn.classList.contains("general-sub-none") ? "「なし」商品":btn.getAttribute("selectcd"))
		+",タイプ:"+(type == 2 ? "複数選択":"一択選択"));
	} else {
		btn.classList.remove("general-sub-selected");
		if(type == "2"){
			// 複数選択の場合、チェックアイコン削除
			btn.classList.remove("check");
		}
		outOparationLog("サブメニューポップアップ-サブ選択OFF,商品コード:"+btn.getAttribute("selectcd")+",タイプ:"+(type == 2 ? "複数選択":"一択選択"));
	}
}

/**
 * 汎用メニュー画面-ハンバーグ追加処理
 * @param ポップアップページ数
 * @param 商品コード
 */
function generalHbUp(page,goodsCd){
	// ハンバーグの選択個数
	var hbCnt = parseInt(document.getElementById('hb_pop_qnt_'+page+"_"+goodsCd).textContent);
	// 数量上限
	var maxCnt = 9;
	if(m_goods_map[goodsCd]["wSelectEnableCount"] == "0"){
		// 数量上限未設定の場合 9
		maxCnt = 9;
	} else {
		// 設定済みの場合、設定値反映
		maxCnt = parseInt(m_goods_map[goodsCd]["wSelectEnableCount"]);
	}

	if(hbCnt < maxCnt){
		// ８個以下ならカウントアップ
		hbCnt = hbCnt+1;
		outOparationLog("サブメニューポップアップ-サブ数量増減,商品コード:"+goodsCd+",タイプ:増");
	}
	// 反映
	document.getElementById('hb_pop_qnt_'+page+"_"+goodsCd).textContent = hbCnt;
}

 /**
 * 汎用メニュー画面-ハンバーグ減少処理
 * @param ポップアップページ数
 * @param 商品コード
 */
function generalHbDown(page,goodsCd){
	// ハンバーグの選択個数
	var hbCnt = parseInt(document.getElementById('hb_pop_qnt_'+page+"_"+goodsCd).textContent);
	if(hbCnt > 1){
		// 1個以上ならカウントダウン
		hbCnt = hbCnt-1;
		outOparationLog("サブメニューポップアップ-サブ数量増減,商品コード:"+goodsCd+",タイプ:減");
	}
	// 反映
	document.getElementById('hb_pop_qnt_'+page+"_"+goodsCd).textContent = hbCnt;
}

 /**
 * 汎用メニュー画面-ハンバーグ減少処理
 * @param ポップアップページ数
 * @param 商品コード
 */
function generalHbDownNoAddHb(page,goodsCd){
	// ハンバーグの選択個数
	var hbCnt = parseInt(document.getElementById('hb_pop_qnt_'+page+"_"+goodsCd).textContent);
	if(hbCnt >= 1){
		// 1個以上ならカウントダウン
		hbCnt = hbCnt-1;
		outOparationLog("サブメニューポップアップ-サブ数量増減,商品コード:"+goodsCd+",タイプ:減");
	}
	// 反映
	document.getElementById('hb_pop_qnt_'+page+"_"+goodsCd).textContent = hbCnt;
}

 /**
 * 汎用メニュー画面-汎用選択1初期表示処理
 */
function general1Disp(goodsCd){
	// 廃止し、共通機能化した階層画面用ポップアップを表示
	dispLevelPopup(goodsCd);
	return;
}

 /**
 * 汎用メニュー画面-汎用選択2初期表示処理
 */
function general2Disp(goodsCd){
	// ポップアップ裏商品選択無効化
	document.getElementById('p-general-pop-notatch').style.display = 'block';
	// ライス選択表示
	document.getElementById('rp_pop_'+goodsCd).style.display = 'block';
}

 /**
 * 汎用メニュー画面-メイン数量追加処理
 */
function generalCntUp(goodsCd){
	// メイン数量
	var cnt = parseInt(document.getElementById('cnt_pop_qnt_'+goodsCd).textContent);
	if(cnt < 9){
		// ８以下ならカウントアップ
		cnt = cnt+1;
		outOparationLog("サブメニューポップアップ-ベース数量増減,商品コード:"+goodsCd+",タイプ:増");
	}
	// 反映
	document.getElementById('cnt_pop_qnt_'+goodsCd).textContent = cnt;
}
 /**
 * 汎用メニュー画面-メイン数量減少処理
 */
function generalCntDown(goodsCd){
	// メイン数量
	var cnt = parseInt(document.getElementById('cnt_pop_qnt_'+goodsCd).textContent);
	if(cnt > 1){
		// １以上ならカウントダウン
		cnt = cnt-1;
		outOparationLog("サブメニューポップアップ-ベース数量増減,商品コード:"+goodsCd+",タイプ:減");
	}
	// 反映
	document.getElementById('cnt_pop_qnt_'+goodsCd).textContent = cnt;
}

/**
 * 汎用メニュー画面-メイン数量選択表示処理
 */
function generalCntDisp(goodsCd){
	// 廃止し、共通機能化した階層画面用ポップアップを表示
	dispLevelPopup(goodsCd);
}

/**
 * ドリンク画面項目生成処理
 * @param type 4:ドリンクメニュー、6:TOドリンクメニュー
 * @param drinkGoodsType 0:ドリンクTOP、1:フラッピー、2:スペシャルドリンク、3:アルコール
 */
function createDrinkDetail(type, drinkGoodsType){
	var tmp_roop_map = {};

	// メニュー一覧取得
	var details = document.getElementById('drinkDetails');

	// 一覧の状態をリセットする
	details.textContent = null;

	tmp_roop_map = m_goods_map;

	// 対象商品のデータ
	for(var gData in tmp_roop_map){
		if(tmp_roop_map[gData]["byMenuType"] == type){
			// 画面表示タグの準備
			var goods = document.createElement('a');
			var p_unsel = document.createElement('p');
			var p_unsel_img = document.createElement('img');
			var p_sel = document.createElement('p');
			var p_sel_img = document.createElement('img');
			var p_name = document.createElement('span');
			var p_price = document.createElement('p');
			var p_info = document.createElement('p');

			// 品切れチェック
			if(tmp_roop_map[gData]["bySalesStatusType"] == 2){
				goods.setAttribute('class','p-drink-btn off');
				goods.classList.add(MSG_CSS_LANG);
			}else{
				goods.setAttribute('class','p-drink-btn');
			}

			// 注文処理関数
			// goods.setAttribute('href', '#');
			goods.setAttribute('itemid', tmp_roop_map[gData]['nGoodsCode']);
			goods.setAttribute('onclick', 'touch(); preView(this, ' + type + ');'); /** 商品選択処理 */
			goods.setAttribute('sort', tmp_roop_map[gData]["nDetailIndex"]);

			// 商品画像（未選択状態）
			p_unsel.setAttribute('class', 'p-drink-btn__img');
			p_unsel.setAttribute('itemid', tmp_roop_map[gData]['nGoodsCode']);
			p_unsel_img.setAttribute('src', lis_fact_map['images/goods/' + tmp_roop_map[gData]['nGoodsCode'] + '_unsel.png']);
			p_unsel_img.setAttribute('class', 'p-drink-btn_img-sel');
			p_unsel.appendChild(p_unsel_img);
			// 商品画像（選択状態）
			p_sel.setAttribute('class', 'p-drink-btn__img--on');
			p_sel.setAttribute('itemid', tmp_roop_map[gData]['nGoodsCode']);
			p_sel_img.setAttribute('src', lis_fact_map['images/goods/' + tmp_roop_map[gData]['nGoodsCode'] + '_sel.png']);
			p_sel_img.setAttribute('class', 'p-drink-btn_img-sel');
			p_sel.appendChild(p_sel_img);

			// 商品名
			p_name.setAttribute('class', 'p-drink-btn__txt1');
			var name = tmp_roop_map[gData]['cGoodsName'];
			// // フラッピー商品は名称が長くなる為、改行タグを挿入
			// if (tmp_roop_map[gData]["nGoodsType"] == 1) {
			// 	name = name.replace('<br1>', 'フラッピー<br />');
			// } else if (tmp_roop_map[gData]["nGoodsType"] == 1) {
			// 	name = name.replace('Flappy ', 'Flappy<br />');
			// }
			p_name.innerHTML = name;

			// 値段
			p_price.setAttribute('class','p-drink-btn__txt2');
			p_price.innerHTML = '<strong class="tNum" style="font-size:38px;">' + tmp_roop_map[gData]['nUnitCost'].toLocaleString() + '</strong>'+MSG_DRINK_2;

			// カロリー/塩分
			var calSaltText = MSG_ORDMADE_7_2.replace('{0}','<span class="tNum">'+tmp_roop_map[gData]['nCal']+'</span>')
													.replace('{1}','<span class="tNum">'+tmp_roop_map[gData]['nSalt']+'</span>');
			p_info.setAttribute('class', 'p-drink-btn__txt3');
			p_info.innerHTML = calSaltText;

			// タグを１つにマージ
			goods.appendChild(p_unsel);
			goods.appendChild(p_sel);
			goods.appendChild(p_name);
			goods.appendChild(p_price);
			goods.appendChild(p_info);
			details.appendChild(goods);
		}
	}

	// ドリンクpreview取得
	var dView = document.getElementById('drinkMain');

	// // ドリンクpreviewの状態をリセットする
	// dView.textContent = null;
	
	// ドリンクpreviewの初期表示
	// var p_prev = document.createElement('p');
	var div_prev = document.createElement('div');
	var p_prev_name = document.createElement('p');
	var p_prev_price = document.createElement('p');
	var nav_prev = document.createElement('nav');
	
	// // prevに空のドリンクを表示
	// p_prev.setAttribute('class', 'p-drink-main__base');
	// var p_prev_img = document.createElement('img');
	// p_prev_img.setAttribute('src', lis_fact_map['images/drink/drink-main-base.png']);
	// p_prev.appendChild(p_prev_img);
	// dView.appendChild(p_prev);

	// prev用のタグ作成
	div_prev.setAttribute('class', 'p-drink-main__drink');
	div_prev.setAttribute('id', 'drinkView');
	for (var gData in tmp_roop_map) {
		if(tmp_roop_map[gData]["byMenuType"] == type){
			var img_prev = document.createElement('img');
			img_prev.setAttribute('src', lis_fact_map['images/goods/' + tmp_roop_map[gData]['nGoodsCode'] + '_prev.png']);
			img_prev.setAttribute('itemid', tmp_roop_map[gData]['nGoodsCode']);
			div_prev.appendChild(img_prev);
		}
	}
	dView.appendChild(div_prev);

	// prev用の初期メッセージ表示
	p_prev_name.setAttribute('class', 'p-drink-main__txt1');
	p_prev_name.setAttribute('id', 'dPreTxt1');
	p_prev_name.textContent = MSG_DRINK_3;
	dView.appendChild(p_prev_name);
	p_prev_price.setAttribute('class', 'p-drink-main__txt2');
	p_prev_price.setAttribute('id', 'dPreTxt2');
	p_prev_price.textContent = MSG_DRINK_4;
	dView.appendChild(p_prev_price);

	// prev用の操作ボタン表示
	nav_prev.setAttribute('class', 'drink-main-nav');
	nav_prev.setAttribute('id', 'drinkNav');
	// 数量
	var p_num = document.createElement('p');
	p_num.setAttribute('class', 'num tNum');
	p_num.setAttribute('id', 'drinkNum');
	// p_num.textContent = '1';
	nav_prev.appendChild(p_num);
	// '-'ボタン
	var button_dwn = document.createElement('input');
	button_dwn.setAttribute('id', 'dDwn');
	button_dwn.setAttribute('class', 'minus');
	button_dwn.setAttribute('type', 'button');
	button_dwn.setAttribute('value', '－');
	button_dwn.setAttribute('onclick', 'touch(); numUpDwn("dwn", ' + type + ');');
	nav_prev.appendChild(button_dwn);
	// '+'ボタン
	var button_up = document.createElement('input');
	button_up.setAttribute('id', 'dUp');
	button_up.setAttribute('class', 'plus');
	button_up.setAttribute('type', 'button');
	button_up.setAttribute('value', '＋');
	button_up.setAttribute('onclick', 'touch(); numUpDwn("up", ' + type + ');');
	nav_prev.appendChild(button_up);
	// 確定ボタン
	var fixSpan = document.createElement('span');
	fixSpan.id = "drink_ordFix_fix";
	fixSpan.classList.add('drink_ordFix_fix');
	fixSpan.style.display = 'block';
	fixSpan.setAttribute('onclick', 'touch(); drinkFix(' + type + ')');
	var fixSpanInner = document.createElement('span');
	fixSpanInner.setAttribute('style','position: relative;top:28%;font-size:27.5px;');
	fixSpanInner.textContent = MSG_DRINK_6;
	fixSpan.appendChild(fixSpanInner);
	nav_prev.appendChild(fixSpan);
	// 非活性'-'ボタン
	var dummybutton_dwn = document.createElement('input');
	dummybutton_dwn.setAttribute('id', 'dummy_dDwn');
	dummybutton_dwn.setAttribute('class', 'dummy_minus');
	dummybutton_dwn.setAttribute('type', 'button');
	dummybutton_dwn.setAttribute('value', '－');
	nav_prev.appendChild(dummybutton_dwn);
	// 非活性'+'ボタン
	var dummybutton_up = document.createElement('input');
	dummybutton_up.setAttribute('id', 'dummy_dUp');
	dummybutton_up.setAttribute('class', 'dummy_plus');
	dummybutton_up.setAttribute('type', 'button');
	dummybutton_up.setAttribute('value', '＋');
	nav_prev.appendChild(dummybutton_up);
	// 非活性確定ボタン(言語切替用)
	var dummySpan = document.createElement('span');
	dummySpan.id = "drink_ordFix_dummy";
	dummySpan.classList.add('drink_ordFix_dummy');
	dummySpan.style.display = 'block';
	var dummySpanInner = document.createElement('span');
	dummySpanInner.setAttribute('style','position: relative;top:28%;font-size:27.5px;');
	dummySpanInner.textContent = MSG_DRINK_6;
	dummySpan.appendChild(dummySpanInner);
	nav_prev.appendChild(dummySpan);
	dView.appendChild(nav_prev);

	// メニュー一覧をソート
	menuListSort('0');

	// scrollをtop表示にする
	details.scrollTop = 0;
}

/**
 * ドリンクpreview表示処理
 * @param
 * 　elem：選択された商品
 * 　type：メニュー区分（4:ドリンクメニュー、6:TOドリンクメニュー）
 */
function preView(elem, type) {
	// 非活性確定ボタンを非表示化
	document.getElementById('drink_ordFix_dummy').style.display = 'none';
	document.getElementById('dummy_dDwn').style.display = 'none';
	document.getElementById('dummy_dUp').style.display = 'none';

	var gCode = elem.getAttribute('itemid');
	var details = document.getElementById('drinkDetails');
	var d_target = details.getElementsByClassName('on');
	var drink_map = null;

	drink_map = m_goods_map;

	if (d_target.length === 0) {
		// ドリンクメニュー初回選択時
		// 対象の商品を選択状態にする
		elem.classList.add('on');
		// prev画像を更新
		var dView = document.getElementById('drinkView');
		var imgList = dView.children;
		for (var i=0; i<imgList.length; i++) {
			if (gCode === imgList[i].getAttribute('itemid')) {
				// previewに選択商品を表示
				imgList[i].classList.add('on');
			}
		}
		// prevメッセージ更新
		var name = drink_map[gCode]['cGoodsName'];
		var loopFlg = true;
		while(loopFlg){
			if(contains(name,'<br />')){
				name = name.replace('<br />',' ');
			}else{
				loopFlg = false;
			}
		}
		// フラッピー商品は名称が長くなる為、改行タグを挿入
		// if (drink_map[gCode]["nGoodsType"] == 1) {
		// 	name = name.replace('フラッピー', 'フラッピー<br />');
		// } else if (drink_map[gCode]["nGoodsType"] == 1) {
		// 	name = name.replace('Flappy ', 'Flappy<br />');
		// }
		document.getElementById('dPreTxt1').innerHTML = name;

		document.getElementById('dPreTxt2').innerHTML = '<strong class="tNum">' + drink_map[gCode]['nUnitCost'].toLocaleString() + '</strong>'+MSG_DRINK_2;

		// prev操作ボタンの有効化
		document.getElementById('drinkNum').textContent = 1;
		document.getElementById('drinkNav').classList.add('on');
	} else {
		// ドリンクメニューの選択商品変更時
		if (d_target[0].getAttribute('itemid') === gCode) {
			if (Number(document.getElementById('drinkNum').textContent) < person) {
			// if (type == 6 || Number(document.getElementById('drinkNum').textContent) < person) {
				// 選択中の商品と同一商品選択時かつ、選択数量が上限値未満の場合、数量を加算
				document.getElementById('drinkNum').textContent = Number(document.getElementById('drinkNum').textContent) + 1;
				if (Number(document.getElementById('drinkNum').textContent) >= person) {
				// if (type == 4 && Number(document.getElementById('drinkNum').textContent) >= person) {
					// イートインメニューかつ、数量加算の結果、上限値以上になった場合、＋ボタンを非活性
					document.getElementById('dUp').setAttribute('style', 'background-color:#dcdcdc; pointer-events: none;');
				} else {
					// 数量加算の結果、上限値未満の場合、＋ボタンを活性
					document.getElementById('dUp').setAttribute('style', 'background-color:#cc9966; pointer-events: auto;');
				}
			}
		} else {
			// 選択中の商品と異なる商品選択時、商品の選択状態を解放
			d_target[0].classList.remove('on');
			// 対象の商品を選択状態にする
			elem.classList.add('on');
			// prev画像を更新
			var dView = document.getElementById('drinkView');
			var v_target = dView.getElementsByClassName('on');
			for (var i=0; i<v_target.length; i++) {
				// previewの選択状態を解放
				v_target[i].classList.remove('on');
			}
			var imgList = dView.children;
			for (var i=0; i<imgList.length; i++) {
				if (gCode === imgList[i].getAttribute('itemid')) {
					// previewに選択商品を表示
					imgList[i].classList.add('on');
				}
			}
			// prevメッセージ更新
			var name = drink_map[gCode]['cGoodsName'];
			var loopFlg = true;
			while(loopFlg){
				if(contains(name,'<br />')){
					name = name.replace('<br />',' ');
				}else{
					loopFlg = false;
				}
			}
			// フラッピー商品は名称が長くなる為、改行タグを挿入
			// if (drink_map[gCode]["nGoodsType"] == 1) {
			// 	name = name.replace('フラッピー', 'フラッピー<br />');
			// } else if (drink_map[gCode]["nGoodsType"] == 1) {
			// 	name = name.replace('Flappy ', 'Flappy<br />');
			// }
			document.getElementById('dPreTxt1').innerHTML = name;

			document.getElementById('dPreTxt2').innerHTML = '<strong class="tNum">' + drink_map[gCode]['nUnitCost'].toLocaleString() + '</strong>'+MSG_DRINK_2;

			// prev操作ボタンの有効化
			document.getElementById('drinkNum').textContent = 1;
			document.getElementById('drinkNav').classList.add('on');
			document.getElementById('dUp').setAttribute('style', 'background-color:#cc9966; pointer-events: auto;');
		}
	}
	outOparationLog("ドリンクメニュー画面-プレビュー表示,商品コード:"+gCode);
}

/**
 * ドリンク確定処理のブリッジ関数
 * 　type：メニュー区分（4:ドリンクメニュー、6:TOドリンクメニュー）
 */
function drinkFix(type) {
	// 商品コード取得
	var dView = document.getElementById('drinkView');
	var v_target = dView.getElementsByClassName('on');
	var drinkCd = v_target[0].getAttribute('itemid');

	// 数量取得
	var drinkNum = document.getElementById('drinkNum').textContent;

	createDrinkTag(drinkCd, drinkNum, type);
	// outOparationLog("ドリンクメニュー画面-確定,商品コード:"+drinkCd+",数量:"+drinkNum);
}

/**
 * ドリンクの数量変更処理
 * @param
 * 　act：＋/－オブジェクト
 * 　type：メニュー区分（4:ドリンクメニュー、6:TOドリンクメニュー）
 */
function numUpDwn(act, type) {
	var targetElem = document.getElementById('drinkNum');
	// 現在の数量
	var num = Number(targetElem.textContent);
	if (act === 'up') {
		// 注文数量の上限チェック（卓人数変更処理のチェック用）
		if (Number(targetElem.textContent) >= person) {
		// if (type == 4 && Number(targetElem.textContent) >= person) {
				// イートインメニューかつ、数量加算により上限値以上になった場合、＋ボタンを非活性
			document.getElementById('dUp').setAttribute('style', 'background-color:#dcdcdc; pointer-events: none;');
		} else {
			// 数量に１を加算
			targetElem.textContent = num + 1;
			// 注文数量の上限チェック（通常のカウントアップのチェック用）
			if (Number(targetElem.textContent) >= person) {
			// if (type == 4 && Number(targetElem.textContent) >= person) {
					// イートインメニューかつ、数量加算により上限値以上になった場合、＋ボタンを非活性
				document.getElementById('dUp').setAttribute('style', 'background-color:#dcdcdc; pointer-events: none;');
			}
			outOparationLog("ドリンクメニュー画面-[-][+]ボタン,増減:増,現数量:"+targetElem.textContent);
		}
	} else {
		if (num > 1) {
			// 数量１以上なら１を減算
			targetElem.textContent = num - 1;
			if (Number(targetElem.textContent) < person) {
				// 数量減算により上限値よりも小さくなった場合、＋ボタンを活性
				document.getElementById('dUp').setAttribute('style', 'background-color:#cc9966; pointer-events: auto;');
			}
			outOparationLog("ドリンクメニュー画面-[-][+]ボタン,増減:減,現数量:"+targetElem.textContent);
		}
	}
}

/**
 * 商品数量カウントアップ処理
 * @param 商品種別(hb,tp,sc,rp,sr)
 * @param 商品コード
 */
function goodsCntUp(type,gcode){
	// トッピングの数量を合計 9個以下に制限　※廃止
	// if(tp_total >= 9 && type == 'tp'){return;};
	// 対象商品の現在選択個数
	goodsCnt = parseInt(create_dish_map[type][gcode]["quantity"]);
	if(goodsCnt < create_dish_map[type][gcode]["wSelectEnableCount"]){
		// 数量選択上限でない場合、カウントアップ
		create_dish_map[type][gcode]["quantity"] = parseInt(create_dish_map[type][gcode]["quantity"]) + 1;

		// 一覧項目を再表示
		createorderMadeList(type,gcode);
		if(create_dish_map[type][gcode]["quantity"] == 1){
			// 商品表示アニメーション
			goodsSelectAnimation(type,create_dish_map[type][gcode]["nGoodsCode"]);
		}
	}
	outOparationLog("オーダーメイドディッシュ作成画面-商品数量増加,商品種別:"+type+",商品コード:"+gcode);
}

/**
 * 商品数量カウントダウン処理
 * @param 商品種別(hb,tp,sc,rp,sr)
 * @param 商品コード
 */
function goodsCntDown(type,gcode){
	// 対象商品の現在選択個数
	goodsCnt = parseInt(create_dish_map[type][gcode]["quantity"]);
	// if(goodsCnt == 1 && type == 'hb'){
	// 	// ハンバーグの場合、1以下の個数不可
	// }else 
	if(goodsCnt == 1 && create_dish_map[type][gcode]["lock"] == 'on' && type == 'tp'){
		// ベースに設定されているトッピングの場合、１個以下不可
	}else if(goodsCnt == 1){
		// 数量が0以下でない場合、カウントダウン
		create_dish_map[type][gcode]["quantity"] = goodsCnt - 1;

		// 一覧項目を再表示
		createorderMadeList(type,gcode);
		if(create_dish_map[type][gcode]["quantity"] == 0){
			// 0になる場合は、商品画像非表示
			goodsSelectOutAnimation(type,create_dish_map[type][gcode]["nGoodsCode"]);

			if(type == 'hb') {
				// 追加パティ非表示の場合、基本パティを再表示
				goodsSelectAnimation(type, '15011');
			}
		}
	}else if(goodsCnt > 0){
		// 数量が0以下でない場合、カウントダウン
		create_dish_map[type][gcode]["quantity"] = goodsCnt - 1;
		// 一覧項目を再表示
		createorderMadeList(type,gcode);
		if(create_dish_map[type][gcode]["quantity"] == 0){
			// 商品表示アニメーション
			goodsSelectAnimation(type,create_dish_map[type][gcode]["nGoodsCode"]);
		}
	}
	outOparationLog("オーダーメイドディッシュ作成画面-商品数量減少,商品種別:"+type+",商品コード:"+gcode);
}

/**
 * 商品ラジオボタン押下処理
 * @param 商品種別(hb,tp,sc,rp,sr)
 * @param 商品コード
 */
function goodsRadioClick(type,gcode){
	// 対象商品の現在選択個数
	goodsCnt = parseInt(create_dish_map[type][gcode]["quantity"]);

	smogOnFlg = false;
	if(goodsCnt != 1){
		//未選択状態だった場合、他の同一商品種別商品の数量を0、対象商品の数量を1に更新
		for(var gData in create_dish_map[type]){
				create_dish_map[type][gData]["quantity"] = 0;
				// 0になる場合は、商品画像非表示
				goodsSelectOutAnimation(type,create_dish_map[type][gData]["nGoodsCode"]);
		}
		// 一度だけ煙を有効化
		smogOnFlg = true;
		create_dish_map[type][gcode]["quantity"] = 1;
		// 一覧項目を再表示
		createorderMadeList(type,null);
		// 商品表示アニメーション
		goodsSelectAnimation(type,create_dish_map[type][gcode]["nGoodsCode"]);
	}
	if(type == "sr"){
		// 一覧項目を再表示
		fstSrChoiceFlg = true;
		createorderMadeList("sr",null);
	}
	outOparationLog("オーダーメイドディッシュ作成画面-商品ボタン(ラジオ),商品種別:"+type+",商品コード:"+gcode);
}

/**
 * 商品一択チェックボックスボタン押下処理
 * @param 商品種別(hb,tp,sc,rp,sr)
 * @param 商品コード
 */
function goodsCheckBoxClick(type,gcode){
	// 「なし」商品の場合
	if(gcode == 'empty'){
		if(document.getElementById("empty_a").getAttribute('class') == "p-orderSelectBtn1"){
			// チェックする場合
			// 他のソースのチェックを解除
			for(var gData in create_dish_map[type]){
				if(create_dish_map[type][gData]["quantity"] == 1){
					if(create_dish_map[type][gData]["ChangeLimit"] == 'on'){
						// 切替制限が有効な場合、選択不可
						return;
					}else{
						create_dish_map[type][gData]["quantity"] = 0;
						// 0になる場合は、商品画像非表示
						smogOnFlg = true;
						goodsSelectOutAnimation(type,create_dish_map[type][gData]["nGoodsCode"]);
					}
					break;
				}
			}
			document.getElementById("empty_a").setAttribute('class',"p-orderSelectBtn1 current");
			
		}else{
			// チェック解除の場合
			//document.getElementById("empty_a").setAttribute('class',"p-orderSelectBtn1");
		}
		createorderMadeList(type,null);
		return;
	}else if(type == 'sc' && document.getElementById("empty_a") != null){
		document.getElementById("empty_a").setAttribute('class',"p-orderSelectBtn1");
	}

	if (gcode == '92008') {
		smogOnFlg = true;
	}

	// 対象商品の現在選択個数
	goodsCnt = parseInt(create_dish_map[type][gcode]["quantity"]);
	if(goodsCnt != 1){
		//未選択状態だった場合、他の同一商品種別商品の数量を0、対象商品の数量を1に更新
		for(var gData in create_dish_map[type]){
			if(create_dish_map[type][gData]["quantity"] == 1){
				if(create_dish_map[type][gData]["ChangeLimit"] == 'on' && create_dish_map[type][gcode]["ChangeLimit"] != 'on'){
					// 切替制限が有効な場合、解除不可
					return;
				}else{
					create_dish_map[type][gData]["quantity"] = 0;
					// 0になる場合は、商品画像非表示
					goodsSelectOutAnimation(type,create_dish_map[type][gData]["nGoodsCode"]);
				}
				break;
			}
		}
		create_dish_map[type][gcode]["quantity"] = 1;
		// 一度だけ煙を有効化
		smogOnFlg = true;
		// 一覧項目を再表示
		createorderMadeList(type,null);
		// 商品表示アニメーション
		goodsSelectAnimation(type,create_dish_map[type][gcode]["nGoodsCode"]);
	}else{
		// // チェックが外された場合
		// if(create_dish_map[type][gcode]["ChangeLimit"] == 'on'){
		// 	// 切替制限が有効な場合、解除不可
		// 	return;
		// }else{
		// 	create_dish_map[type][gcode]["quantity"] = 0;
		// 	smogOnFlg = true;
		// 	// 一覧項目を再表示
		// 	createorderMadeList(type,null);
		// 	// 0になる場合は、商品画像非表示
		// 	goodsSelectOutAnimation(type,create_dish_map[type][gcode]["nGoodsCode"]);
		// }
	}
	outOparationLog("オーダーメイドディッシュ作成画面-商品ボタン(ラジオ-ソース専用),商品種別:"+type+",商品コード:"+gcode);
}

/**
 * 対象の商品種別内の商品を全て未選択状態にする
 * @param type：商品種別
 */
function chgGoodsUnsel(type) {
	// 指定の商品種別の選択状態を解除する
	for(var gData in create_dish_map[type]){
		if(create_dish_map[type][gData]["quantity"] == 1){
			create_dish_map[type][gData]["quantity"] = 0;
			// 0になる場合は、商品画像非表示
			smogOnFlg = true;
			goodsSelectOutAnimation(type,create_dish_map[type][gData]["nGoodsCode"]);
			break;
		}
	}
	// 一覧項目を再表示
	createorderMadeList(type,null);
}

/**
 * リセットボタンクッション処理
 */
function goodsEditCheckReset(){
	document.getElementById('s-dialog18').innerHTML = W_2002;
	Data.data['scenes']['dialog18'].onEntry();
}

/**
 * 組合せ不可商品変更確認のクッション処理
 * @param msg：メッセージ
 * @param selGoodsCd：選択された商品コード
 * @param selGoodsType：選択された商品タイプ
 * @param chgGoodsCd：選択状態を自動変更する商品コード
 * @param chgGoodsType：選択状態を自動変更する商品タイプ
 */
function chgNgCombiCheck(msg, selGoodsCd, selGoodsType, chgGoodsCd, chgGoodsType){
	document.getElementById('s-dialog19').innerHTML = msg;
	Data.data['scenes']['dialog19'].onEntry();
	if (selGoodsType == 'rp') {
		document.getElementById('dialog_ok_ngCombi').setAttribute('onclick', "touch(); chgGoodsUnsel('" + chgGoodsType + "'); goodsCheckBoxClick('" + selGoodsType + "','" + selGoodsCd + "'); Data.data['scenes']['dialog19'].onExit();");
	} else {
		document.getElementById('dialog_ok_ngCombi').setAttribute('onclick', "touch(); goodsCheckBoxClick('" + chgGoodsType + "', '" + chgGoodsCd + "'); goodsCheckBoxClick('" + selGoodsType + "','" + selGoodsCd + "'); Data.data['scenes']['dialog19'].onExit();");
	}
}

/**
 * リセットボタン押下処理
 */
function goodsEditReset(){
	// 次へボタンの自動実行禁止化
	nextBanFlg = true;

	// 初回サラダ選択フラグリセット
	fstSrChoiceFlg = false;

	// オーダーメイドディッシュベース作成画面で編集する前のデータを復元
	create_dish_map = jQuery.extend(true, {},reset_dish_map);

	// 文字色を初期化
	$('.p-orderSelectNav__btn').removeClass('ordermade-selected');
	if((!firstDishMakeFlg && addHpDispTpFlg)){
		$('.p-orderSelectNav__btn').eq(1).addClass('ordermade-selected');
	} else {
		$('.p-orderSelectNav__btn').eq(0).addClass('ordermade-selected');
	}

	if(firstDishMakeFlg){
		// 初回導線フラグONの場合、各初回導線フラグを初期化
		firstDishMakeEndFlg = false;
		firstDishMakeHbEndFlg = false;
		firstDishMakeTpEndFlg = false;
		firstDishMakeRpEndFlg = false;
		firstDishMakeScEndFlg = false;
		firstDishMakeSrEndFlg = false;
		firstFinishFlg = false;
		// ボタン名称を初期化
		firstEditIncomplete();
	}
	/// オーダーメイドディッシュ作成画面-ハンバーグ一覧を表示
	goodsTabReset();

	// 一覧項目を再表示
//	if(document.getElementById("empty_a") != null){
//		document.getElementById("empty_a").setAttribute('class',"p-orderSelectBtn1 current");
//	}
	createorderMadeList(null,null);

	// 初期選択商品アニメーション
	goodsResetAnimation();
	outOparationLog("オーダーメイドディッシュ作成画面-リセット実行");
}

/**
 * オーダーメイドディッシュ　選択タブ初期化
 */
function goodsTabReset(){
	//$(function (){
		if((!firstDishMakeFlg && addHpDispTpFlg)){
			// トッピング一覧を表示
			document.getElementById('hbMain').setAttribute('class','p-orderSelectMenu__nav');
			document.getElementById('tpMain').setAttribute('class','p-orderSelectMenu__nav current');
		} else {
			// ハンバーグ一覧を表示
			document.getElementById('hbMain').setAttribute('class','p-orderSelectMenu__nav current');
			document.getElementById('tpMain').setAttribute('class','p-orderSelectMenu__nav');
		}
		document.getElementById('rpMain').setAttribute('class','p-orderSelectMenu__nav');
		document.getElementById('scMain').setAttribute('class','p-orderSelectMenu__nav');
		document.getElementById('srMain').setAttribute('class','p-orderSelectMenu__nav');
	//});
}

/**
 * 初回導線未完了化処理
 */
function firstEditIncomplete(){
	// 各選択ボタンのボタン名称・活性状態を初期化
	if((!firstDishMakeFlg && addHpDispTpFlg)){
		document.getElementById('hbBtn').setAttribute('class','p-orderSelectNav__btn');
		document.getElementById('tpBtn').setAttribute('class','p-orderSelectNav__btn current ordermade-selected');
		document.getElementById('tpBtn').click();
	} else {
		document.getElementById('hbBtn').setAttribute('class','p-orderSelectNav__btn current ordermade-selected');
		document.getElementById('hbBtn').click();
		document.getElementById('tpBtn').setAttribute('class','p-orderSelectNav__btn');
	}
	// document.getElementById('hbBtn').setAttribute('class','p-orderSelectNav__btn current ordermade-selected');
	// document.getElementById('hbBtn').click();
	// document.getElementById('tpBtn').setAttribute('class','p-orderSelectNav__btn');
	document.getElementById('rpBtn').setAttribute('class','p-orderSelectNav__btn');
	document.getElementById('scBtn').setAttribute('class','p-orderSelectNav__btn');
	document.getElementById('srBtn').setAttribute('class','p-orderSelectNav__btn');
	document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1');
}

/**
 * 初回導線完了化処理
 * @param 初回導線完了No　(1:ハンバーグ初回選択完了、2:トッピング初回選択完了、3:ライス・パスタ初回選択完了、4:ソース初回選択完了、5:サラダ初回選択完了)
 */
function firstEditEnd(EndNo){
	if(EndNo == 1){
		if((!firstDishMakeFlg && addHpDispTpFlg)){
			document.getElementById('hbBtn').setAttribute('class','p-orderSelectNav__btn selected');
		} else {
			document.getElementById('hbBtn').setAttribute('class','p-orderSelectNav__btn selected ordermade-selected');
		}
	}else if(EndNo == 2){
		if((!firstDishMakeFlg && addHpDispTpFlg)){
			document.getElementById('tpBtn').setAttribute('class','p-orderSelectNav__btn selected ordermade-selected');
		} else {
			document.getElementById('tpBtn').setAttribute('class','p-orderSelectNav__btn selected');
		}
	}else if(EndNo == 3){
		document.getElementById('rpBtn').setAttribute('class','p-orderSelectNav__btn selected');
	}else if(EndNo == 4){
		document.getElementById('scBtn').setAttribute('class','p-orderSelectNav__btn selected');
	}else if(EndNo == 5){
		firstDishMakeSrEndFlg = true;
		firstDishMakeEndFlg = true;
		document.getElementById('srBtn').setAttribute('class','p-orderSelectNav__btn selected');
		document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1 all');
	}
}

/**
 * スリープ処理
 * @param スリープ時間
 * @param スリープ後処理
 */
function sleep(waitSec, callbackFunc) {
		console.log("sleeping");
 
    // 経過時間（秒）
    var spanedSec = 0;
 
    // 1秒間隔で無名関数を実行
    var id = setInterval(function () {
 
        spanedSec++;
 
        // 経過時間 >= 待機時間の場合、待機終了。
        if (spanedSec >= waitSec) {
					console.log("wakeup");
 
            // タイマー停止
            clearInterval(id);
 
            // 完了時、コールバック関数を実行
            if (callbackFunc) callbackFunc();
        }
    }, 1000);
 
}

/**
 * スリープ処理(0.1秒単位)
 * @param スリープ時間
 * @param スリープ後処理
 */
function sleepMin(waitSec, callbackFunc) {
 
 // 経過時間（秒）
 var spanedSec = 0;

 // 1秒間隔で無名関数を実行
 var id = setInterval(function () {

	 spanedSec++;

	 // 経過時間 >= 待機時間の場合、待機終了。
	 if (spanedSec >= waitSec) {

		 // タイマー停止
		 clearInterval(id);

		 // 完了時、コールバック関数を実行
		 if (callbackFunc) callbackFunc();
	 }
 }, 100);

}

/**
 * サーチ処理
 * 　特定の文字列が含まれるかチェックする。
 * @param 検索対象文字列
 * @param 検索文字列
 */
function contains(str, inStr){
	if(str == null || str == ''){return false;}
	var regexp = new RegExp(inStr);
	return str.search(regexp) !== -1;
}

/**
 * ナイスチョイスシーン起動処理
 */
function niceChoiceAnimation(){
	if (!chkQuantityFlg()) {
		// 選択数量上限超えポップアップを表示し、処理終了
		document.getElementById('s-dialog14').innerHTML = I_1018.replace('{0}',quantityLimit);
		Data.data['scenes']['dialog14'].onEntry();
		
	} else if (chkOrdType() && chkRequired()) {
		bassingFlg = false;
		// 多重タップ防止
		if(niceChoiceFlg){return;}
		niceChoiceFlg = true;

		// カート上限事前チェック
		withGoodsMaxCartCheck();

		// ナイスチョイスシーン呼び出し
		location.href = '#root/order/order-select/choice';
	
		// 注文カートに登録
		createOrd();
	
		// オーダーメイドディッシュ作成中フラグ解除
		dishEditingFlg = false;	
		outOparationLog("オーダーメイドディッシュ作成画面-完成実行");
	}
}

/**
 * サブ商品選択数チェック処理
 * 　1皿内のサブ商品選択数が上限数を超過していないかチェックする
 * @param なし
 * @return boolean: 上限以下の場合"true"を返却、上限超過の場合"false"を返却
 */
function chkOrdType() {
	// 1皿内のサブ商品選択数
	var ordTypeNum = 0;

	// 各商品毎に選択されている場合、商品選択数をカウントアップする（商品毎の数量は考慮不要）
	for (var cd in create_dish_map) {
		var goodsType = create_dish_map[cd];
		switch (cd) {
			// ハンバーグ
			case 'hb':
				for (var hb in goodsType) {
					if (goodsType[hb]['quantity'] >= 1) {
						ordTypeNum++;
					}
				}
				break;
			// トッピング
			case 'tp':
				for (var tp in goodsType) {
					if (goodsType[tp]['quantity'] >= 1) {
						ordTypeNum++;
					}
				}
				break;
			// ソース
			case 'sc':
				for (var sc in goodsType) {
					if (goodsType[sc]['quantity'] >= 1) {
						ordTypeNum++;
					}
				}
				break;
			// ライス・パスタ
			case 'rp':
				for (var rp in goodsType) {
					if (goodsType[rp]['quantity'] >= 1) {
						ordTypeNum++;
					}
				}
				break;
			// サラダ
			case 'sr':
				for (var sr in goodsType) {
					if (goodsType[sr]['quantity'] >= 1) {
						ordTypeNum++;
					}
				}
				break;
		}
	}

	// 1皿内のサブ商品選択数が上限値より多い場合、falseを返却
	// if (ordTypeNum > MaxOrdTypeNum) {
	// 	// 選択数量上限超えポップアップを表示し、処理終了
	// 	document.getElementById('s-dialog15').innerHTML = I_1020.replace('{0}',MaxOrdTypeNum);
	// 	Data.data['scenes']['dialog15'].onEntry();
	// 	return false;
	// }
	return true;
}

/**
 * 組み合わせ必須チェック処理
 * 　組合せの必須チェックを行い、結果を返却する。
 * @param なし
 * @return boolean: 必須チェックNGの場合"false"を返却、チェックOKの場合"true"を返却
 */
// function chkRequired() {
// 	// パスタの組合せ必須チェック
// 	for (var rpCd in create_dish_map["rp"]) {
// 		if (rpCd == 26001 || rpCd == 26002) {
// 			if (create_dish_map["rp"][rpCd]["quantity"] == 1) {
// 				// パスタが選択されている場合、ソースが選択されているかチェック
// 				for (var scCd in create_dish_map["sc"]) {
// 					if (scCd == 92008) {
// 						// ベースソースの場合はスキップ
// 						continue;
// 					}
// 					if (create_dish_map["sc"][scCd]["quantity"] >= 1) {
// 						// 選択されている場合"true"を返却
// 						return true;
// 					}
// 				}
// 				// パスタ選択時にソース未選択の場合、必須チェックNGポップアップを表示し、処理終了
// 				document.getElementById('s-dialog15').innerHTML = I_1022;
// 				Data.data['scenes']['dialog15'].onEntry();
// 				return false;
// 			}
// 		}
// 	}
// 	return true;
// }

/**
 * ソースの必須チェック処理
 * @param なし
 * @return boolean: 必須チェックNGの場合"false"を返却、チェックOKの場合"true"を返却
 */
function chkRequired() {
	// ソースの選択状態を確認
	for (var scCd in create_dish_map["sc"]) {
		if (create_dish_map["sc"][scCd]["quantity"] == 1) {
			return true;
		}
	}

	// ソース未選択の場合、必須チェックNGポップアップを表示し、処理終了
	document.getElementById('s-dialog15').innerHTML = I_1022;
	Data.data['scenes']['dialog15'].onEntry();
	return false;
}

var fstSrChoiceFlg = false;
/**
 * 次へボタン押下処理
 */
function orderNextBtn(){
	// 次へボタンの自動実行禁止化
	nextBanFlg = true;

	// 現在タブに応じて、次のタブへ切替
	if('p-orderSelectMenu__nav current' == document.getElementById('hbMain').getAttribute('class')){
		document.getElementById('hbMain').setAttribute('class','p-orderSelectMenu__nav');
		document.getElementById('tpMain').setAttribute('class','p-orderSelectMenu__nav current');
		document.getElementById('hbBtn').setAttribute('class','p-orderSelectNav__btn selected');
		if('p-orderSelectNav__btn selected' != document.getElementById('tpBtn').getAttribute('class')){
			document.getElementById('tpBtn').setAttribute('class','p-orderSelectNav__btn current ordermade-selected');
		}
		firstDishMakeHbEndFlg = true;
		createorderMadeList("tp",null);
	}else if('p-orderSelectMenu__nav current' == document.getElementById('tpMain').getAttribute('class')){
		document.getElementById('tpMain').setAttribute('class','p-orderSelectMenu__nav');
		document.getElementById('rpMain').setAttribute('class','p-orderSelectMenu__nav current');
		document.getElementById('tpBtn').setAttribute('class','p-orderSelectNav__btn selected');
		if('p-orderSelectNav__btn selected' != document.getElementById('rpBtn').getAttribute('class')){
			document.getElementById('rpBtn').setAttribute('class','p-orderSelectNav__btn current ordermade-selected');
		}
		firstDishMakeTpEndFlg = true;
		createorderMadeList("rp",null);
	}else if('p-orderSelectMenu__nav current' == document.getElementById('rpMain').getAttribute('class')){
		document.getElementById('rpMain').setAttribute('class','p-orderSelectMenu__nav');
		document.getElementById('scMain').setAttribute('class','p-orderSelectMenu__nav current');
		document.getElementById('rpBtn').setAttribute('class','p-orderSelectNav__btn selected');
		if('p-orderSelectNav__btn selected' != document.getElementById('scBtn').getAttribute('class')){
			document.getElementById('scBtn').setAttribute('class','p-orderSelectNav__btn current ordermade-selected');
		}
		firstDishMakeRpEndFlg = true;
		createorderMadeList("sc",null);
	}else if('p-orderSelectMenu__nav current' == document.getElementById('scMain').getAttribute('class')){
		document.getElementById('scMain').setAttribute('class','p-orderSelectMenu__nav');
		document.getElementById('srMain').setAttribute('class','p-orderSelectMenu__nav current');
		document.getElementById('scBtn').setAttribute('class','p-orderSelectNav__btn selected');
		if('p-orderSelectNav__btn selected' != document.getElementById('srBtn').getAttribute('class')){
			document.getElementById('srBtn').setAttribute('class','p-orderSelectNav__btn current ordermade-selected');
		}
		firstDishMakeScEndFlg = true;
		createorderMadeList("sr",null);
	}else if('p-orderSelectMenu__nav current' == document.getElementById('srMain').getAttribute('class')){
		fstSrChoiceFlg = true;
		createorderMadeList("sr",null);
	}

	if(firstFinishFlg){
		// 初回導線完了済みの場合、完成ボタン表示に切替
		document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1 all');
	}else{
		// 現在タブに応じて、次へボタンの活性・非活性制御
		if('p-orderSelectMenu__nav current' == document.getElementById('hbMain').getAttribute('class')){
			if(hb_total >= 1){
				document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1 on');
			}else{
				document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1');
			}
		}else if('p-orderSelectMenu__nav current' == document.getElementById('tpMain').getAttribute('class')){
			document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1 on');
		}else if('p-orderSelectMenu__nav current' == document.getElementById('rpMain').getAttribute('class')){
			if(rp_total >= 1){
				document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1 on');
			}else{
				document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1');
			}
		}else if('p-orderSelectMenu__nav current' == document.getElementById('scMain').getAttribute('class')){
			if(sc_total >= 1){
				document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1 on');
			}else{
				document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1');
			}
		}else if('p-orderSelectMenu__nav current' == document.getElementById('srMain').getAttribute('class')){
			if(sr_total >= 1){
				createorderMadeList("sr",null);
				document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1 on');
			}else{
				document.getElementById('nextBtns').setAttribute('class','jBtn select_tab_btn1');
			}
		}
	}
	outOparationLog("オーダーメイドディッシュ作成画面-次へ実行");
}

/**
 * 商品選択アニメーション処理
 * @param "hamburg","topping","rice","source","salad"
 * @param 商品コード
 */
function goodsSelectAnimation(type,goodsNo){

	if(goodsNo == '15008'){
		// 追加パティ選択の場合、基本パティを削除する
		goodsSelectOutAnimation('hb', '15011');
	} else if (goodsNo == '92008') {
		// ハンバーグソース選択の場合、アニメーションをスキップ
		return;
	}

	// 表示領域取得
	var ordermade_animation = document.getElementById('ordermade_animation');

	// // ライス・パスタ・カリフラワー用の判定
	// // 判定結果
	// var bySmallMenuType = '0';
	// if(type == "sc" || type == "rp"){
	// 	// ライス区分の全データ
	// 	for(var gData in create_dish_map["rp"]){
	// 		var smallTypeCheckQnt = parseInt(create_dish_map["rp"][gData]["quantity"]);
	// 		if(smallTypeCheckQnt > 0){
	// 			// 選択中ライスの場合
	// 			bySmallMenuType = create_dish_map["rp"][gData]["bySmallMenuType"];
	// 			break;
	// 		}
	// 	}
	// }

	// 商品画像生成
	var img = null;
	// if(contains(layoutData_json,goodsNo+"_pasta") && bySmallMenuType == '1'){
	// 	img = document.getElementById('ordermade_img_'+goodsNo+'_pasta');
	// }else if(contains(layoutData_json,goodsNo+"_cauliflower") && bySmallMenuType == '2'){
	// 	img = document.getElementById('ordermade_img_'+goodsNo+'_cauliflower');
	// }else {
		img = document.getElementById('ordermade_img_'+goodsNo);
	// }

	if(type == "rp"){
		// ライス切替時、ソース画像の切替が必要なら、切替
		for(var rp_gData in create_dish_map["sc"]){
			var smallTypeCheckQnt = parseInt(create_dish_map["sc"][rp_gData]["quantity"]);
			if(smallTypeCheckQnt > 0){
				// 選択中ソースの場合
				var goodsNo_sc = create_dish_map["sc"][rp_gData]["nGoodsCode"];
				// if(contains(layoutData_json,goodsNo_sc+"_pasta") && bySmallMenuType == '1'){
				// 	img_sc = document.getElementById('ordermade_img_'+goodsNo_sc+'_pasta');
				// }else if(contains(layoutData_json,goodsNo_sc+"_cauliflower") && bySmallMenuType == '2'){
				// 	img_sc = document.getElementById('ordermade_img_'+goodsNo_sc+'_cauliflower');
				// }else {
					img_sc = document.getElementById('ordermade_img_'+goodsNo_sc);
				// }
				if(img_sc != null){
					// ベースソースの場合、画像がないため処理なし
					img_sc.setAttribute('class','ordermade_goods3');
					img_sc.style.animationDelay = '0s';
					break;
				}
			}
		}
	}

	img.setAttribute('class','ordermade_goods2');

	img.style.animationDelay = '0s';

	// X軸
	var Xline = ORDERMADE_X + parseInt((create_dish_map[type][goodsNo]['nDispPositionX']));
	// Y軸
	var YLine = ORDERMADE_Y - parseInt((create_dish_map[type][goodsNo]['nDispPositionY']));
	// 高さ比率
	var height = create_dish_map[type][goodsNo]['nHeightRate'];
	// 幅比率
	var width = create_dish_map[type][goodsNo]['nWidthRate'];
	// 表示順序
	var zLine = ORDERMADE_Z + parseInt(create_dish_map[type][goodsNo]['nZline']);

	if(type == 'hb' || type == 'tp' || smogOnFlg){
		// 煙生成
		// 処理の軽量化のため、smog1なし
		// var smog1 = document.getElementById('smogEff1');
		// smog1.setAttribute('style','left:'+Xline+'%;top:'+YLine+'%;height:'+height+'%;width:'+width+'%;z-index:'+'300'+';');
		// smog1.setAttribute('class','');
		// smog1.offsetWidth = smog1.offsetWidth;
		// smog1.setAttribute('class','smogEff1');
		var smog2 = document.getElementById('smogEff2');
		smog2.setAttribute('style','left:'+Xline+'%;top:'+YLine+'%;height:'+height+'%;width:'+width+'%;z-index:'+'300'+';');
		smog2.setAttribute('class','');
		smog2.offsetWidth = smog2.offsetWidth;
		smog2.setAttribute('class','smogEff2');

		smogOnFlg = false;
	}
}

/**
 * 初回アニメーション処理
 */
function goodsFirstAnimation(){
	$(function (){
		// 煙生成
		if (firstDishMakeFlg) {
			// フルカスタムの場合、全体煙は出さずにハンバーグの煙のみ表示
			var smog2 = document.getElementById('smogEff2');
			smog2.setAttribute('style','left:12%;top:37%;height:53%;width:43%;z-index:300;');
			smog2.setAttribute('class','');
			smog2.offsetWidth = smog2.offsetWidth;
			smog2.setAttribute('class','smogEff2');	
		} else {
			// フルカスタム以外は全体煙を表示
			document.getElementById('smogEff1').setAttribute('class','smogEff1');
			document.getElementById('smogEff2').setAttribute('class','smogEff2');
		}
	//});
		// 初期選択商品の描画
		// 全商品区分のデータ
		var cnt = new BigNumber(-5.3);

		for(var sType in create_dish_map){
			// 商品区分毎の全データ
			for(var gData in create_dish_map[sType]){
				if(create_dish_map[sType][gData]["quantity"] >= 1){
					// 初回商品表示アニメーション
					if (gData != '92008') {
						// ハンバーグソースの場合、画像生成スキップ
						// 商品画像生成
						// var bySmallMenuType = '0';
						var img = null;
						// if(sType == "sc"){
						// 	// ソース表示時、ライスによって画像を切替
						// 	for(var rpData in create_dish_map["rp"]){
						// 		if(create_dish_map["rp"][rpData]["quantity"] >= 1){
						// 			create_dish_map["rp"][rpData]["quanti"]
						// 			bySmallMenuType = create_dish_map["rp"][rpData]["bySmallMenuType"];
						// 			break;
						// 		}
						// 	}
						// 	if(bySmallMenuType == '1'){
						// 		img = document.getElementById('ordermade_img_'+gData+'_pasta');
						// 	}else if(bySmallMenuType == '2'){
						// 		img = document.getElementById('ordermade_img_'+gData+'_cauliflower');
						// 	}else{
						// 		img = document.getElementById('ordermade_img_'+gData);
						// 	}
						// }else{
							img = document.getElementById('ordermade_img_'+gData);
						// }
						img.setAttribute('class','ordermade_goods_first');
						img.style.animationDelay = cnt.toString()+'s';
						cnt = cnt.plus(0.2);
					}
				}
			}
		}
	});
}

/**
 * リセットアニメーション処理
 */
function goodsResetAnimation(){
	// 表示領域取得
	// var ordermade_animation = document.getElementById('ordermade_animation');
	// // 一旦すべて非表示化
	// ordermade_animation.innerHTML = '';
	// ordermade_animation.setAttribute('style','left: 6.725%;top: 0%;');
	goodsAnimationSet();

	// 煙生成
	var smog1 = document.getElementById('smogEff1');
	smog1.setAttribute('style','');
	smog1.setAttribute('class','');
	smog1.offsetWidth = smog1.offsetWidth;
	smog1.setAttribute('class','smogEff1');
	var smog2 = document.getElementById('smogEff2');
	smog2.setAttribute('style','');
	smog2.setAttribute('class','');
	smog2.offsetWidth = smog2.offsetWidth;
	smog2.setAttribute('class','smogEff2');

	// 初期選択商品の描画
	// 全商品区分のデータ
	var cnt = new BigNumber(-5.3);

	for(var sType in create_dish_map){
		// 商品区分毎の全データ
		for(var gData in create_dish_map[sType]){
			if(create_dish_map[sType][gData]["quantity"] >= 1){
				// 初回商品表示アニメーション
				if (gData != '92008') {
					// ハンバーグソースの場合、画像生成スキップ
					// 商品画像生成
					// var bySmallMenuType = '0';
					var img = null;
					// if(sType == "sc"){
					// 	// ソース表示時、ライスによって画像を切替
					// 	for(var rpData in create_dish_map["rp"]){
					// 		if(create_dish_map["rp"][rpData]["quantity"] >= 1){
					// 			create_dish_map["rp"][rpData]["quanti"]
					// 			bySmallMenuType = create_dish_map["rp"][rpData]["bySmallMenuType"];
					// 			break;
					// 		}
					// 	}
					// 	if(bySmallMenuType == '1'){
					// 		img = document.getElementById('ordermade_img_'+gData+'_pasta');
					// 	}else if(bySmallMenuType == '2'){
					// 		img = document.getElementById('ordermade_img_'+gData+'_cauliflower');
					// 	}else{
					// 		img = document.getElementById('ordermade_img_'+gData);
					// 	}
					// }else{
						img = document.getElementById('ordermade_img_'+gData);
					// }
					img.setAttribute('class','ordermade_goods_first');
					img.style.animationDelay = cnt.toString()+'s';
					ordermade_animation.appendChild(img);
					cnt = cnt.plus(0.2);
				}
			}
		}
	}
}

/**
 * ナイスチョイスアニメーション処理
 */
function goodsEndAnimation(){
	// 表示領域取得
	var ordermade_animation = document.getElementById('ordermade_animation_nc');
	ordermade_animation.setAttribute('style','left:13.5%;top:10%;');

	// 一旦すべて非表示化
	ordermade_animation.innerHTML = '';

	var dish = document.createElement('img');
	dish.setAttribute('class','niceChoice_dish');
	dish.setAttribute('src',lis_fact_map['images/order_select/dish.png']);
	dish.setAttribute('style','width:106%;height:110%;max-width: 106%;');
	ordermade_animation.appendChild(dish);

	// 皿の裏にキャプチャ取得用の静止画表示
	goodsEndAnimationImg();

	$(function (){
		// 煙生成
		var smog1 = document.createElement('img');
		smog1.setAttribute('id','smogEndEff1');
		smog1.setAttribute('class','smogEndEff1');
		smog1.setAttribute('src',lis_fact_map['images/order_select/smog.png']);
		var smog2 = document.createElement('img');
		smog2.setAttribute('id','smogEndEff2');
		smog2.setAttribute('class','smogEndEff2');
		smog2.setAttribute('src',lis_fact_map['images/order_select/smog.png']);
		var smog3 = document.createElement('img');
		smog3.setAttribute('id','smogEndEff3');
		smog3.setAttribute('class','smogEndEff3');
		smog3.setAttribute('src',lis_fact_map['images/order_select/smog.png']);

		ordermade_animation.appendChild(smog1);
		ordermade_animation.appendChild(smog2);
		ordermade_animation.appendChild(smog3);

		// 初期選択商品の描画
		// 全商品区分のデータ
		var cnt = new BigNumber(-5.3);

		for(var sType in create_dish_map){
			// 商品区分毎の全データ
			for(var gData in create_dish_map[sType]){
				if (sType == 'hb' && gData == '15011' && create_dish_map[sType]['15008']['quantity'] >= 1) {
					// 追加パティ選択時、基本パティのアニメーションはスキップ
					continue;
				} else if (gData == '92008') {
					// ハンバーグソース選択時、ソースのアニメーションはスキップ
					continue;
				}
				if(create_dish_map[sType][gData]["quantity"] >= 1){
					// 初回商品表示アニメーション
					// // ライス・パスタ・カリフラワー用の判定
					// // 判定結果
					// var bySmallMenuType = '0';
					// if(sType == "sc"){
					// 	// ライス区分の全データ
					// 	for(var gData2 in create_dish_map["rp"]){
					// 		var smallTypeCheckQnt = parseInt(create_dish_map["rp"][gData2]["quantity"]);
					// 		if(smallTypeCheckQnt > 0){
					// 			// 選択中ライスの場合
					// 			bySmallMenuType = create_dish_map["rp"][gData2]["bySmallMenuType"];
					// 			break;
					// 		}
					// 	}
					// }
					// 商品画像生成
					var img = document.createElement('img');
					img.setAttribute('id','ordermade_img_'+gData);
					img.setAttribute('class','ordermade_goods_first');
					// img.setAttribute('src','images/goods/'+gData+'.png');

					// ライス毎に画像を切り替える設定の場合、対象の画像を表示
					// if(contains(layoutData_json,gData+"_pasta") && bySmallMenuType == '1'){
					// 	img.setAttribute('src','images/goods/'+gData+'_pasta.png');
					// }else if(contains(layoutData_json,gData+"_cauliflower") && bySmallMenuType == '2'){
					// 	img.setAttribute('src','images/goods/'+gData+'_cauliflower.png');
					// }else {
						// img.setAttribute('src','images/goods/'+gData+'.png');
						img.setAttribute('src',lis_fact_map['images/goods/'+gData+'.png']);
					// }

					// X軸
					var Xline = ORDERMADE_X + parseInt((create_dish_map[sType][gData]['nDispPositionX']))+1;
					// Y軸
					var YLine = ORDERMADE_Y - parseInt((create_dish_map[sType][gData]['nDispPositionY']))+4;
					// 高さ比率
					var height = parseInt(create_dish_map[sType][gData]['nHeightRate'])-0;
					// 幅比率
					var width = parseInt(create_dish_map[sType][gData]['nWidthRate'])-0;
					// 表示順序
					var zLine = ORDERMADE_Z + parseInt(create_dish_map[sType][gData]['nZline']);

					img.setAttribute('style','left:'+Xline+'%;top:'+YLine+'%;height:'+height+'%;width:'+width+'%;z-index:'+zLine+';animation-delay:'+cnt.toString()+'s;');
					ordermade_animation.appendChild(img);
					cnt = cnt.plus(0.2);

				}
			}
		}
	});
}

/**
 * ナイスチョイスアニメーション処理(キャプチャ取得用)
 */
function goodsEndAnimationImg(){
	// 表示領域取得
	var ordermade_animation = document.getElementById('ordermade_animation_nc_img');
	ordermade_animation.setAttribute('style','left:3%;top:2%;');
	// 一旦すべて非表示化
	ordermade_animation.innerHTML = '';

	var dish = document.createElement('img');
	dish.setAttribute('class','niceChoice_dish');
	dish.setAttribute('src',lis_fact_map['images/order_select/dish.png']);
	dish.setAttribute('style','z-index:-990;width:106%;height:110%;max-width: 106%;position:absolute;');
	ordermade_animation.appendChild(dish);

	// 初期選択商品の描画
	// 全商品区分のデータ
	for(var sType in create_dish_map){
		// 商品区分毎の全データ
		for(var gData in create_dish_map[sType]){
			if (sType == 'hb' && gData == '15011' && create_dish_map[sType]['15008']['quantity'] >= 1) {
				// 追加パティ選択時、基本パティのアニメーションはスキップ
				continue;
			} else if (gData == '92008') {
				// ハンバーグソース選択時、ソースのアニメーションはスキップ
				continue;
			}
			if(create_dish_map[sType][gData]["quantity"] >= 1){
				// 初回商品表示アニメーション
				// // ライス・パスタ・カリフラワー用の判定
				// // 判定結果
				// var bySmallMenuType = '0';
				// if(sType == "sc"){
				// 	// ライス区分の全データ
				// 	for(var gData2 in create_dish_map["rp"]){
				// 		var smallTypeCheckQnt = parseInt(create_dish_map["rp"][gData2]["quantity"]);
				// 		if(smallTypeCheckQnt > 0){
				// 			// 選択中ライスの場合
				// 			bySmallMenuType = create_dish_map["rp"][gData2]["bySmallMenuType"];
				// 			break;
				// 		}
				// 	}
				// }
				// 商品画像生成
				var img = document.createElement('img');
				// img.setAttribute('id','ordermade_img_'+gData);
				img.setAttribute('class','ordermade_goods3');
				// img.setAttribute('src','images/goods/'+gData+'.png');

				// ライス毎に画像を切り替える設定の場合、対象の画像を表示
				// if(contains(layoutData_json,gData+"_pasta") && bySmallMenuType == '1'){
				// 	img.setAttribute('src','images/goods/'+gData+'_pasta.png');
				// }else if(contains(layoutData_json,gData+"_cauliflower") && bySmallMenuType == '2'){
				// 	img.setAttribute('src','images/goods/'+gData+'_cauliflower.png');
				// }else {
					img.setAttribute('src',lis_fact_map['images/goods/'+gData+'.png']);
				// }

				// X軸
				var Xline = ORDERMADE_X + parseInt((create_dish_map[sType][gData]['nDispPositionX']))+1;
				// Y軸
				var YLine = ORDERMADE_Y - parseInt((create_dish_map[sType][gData]['nDispPositionY']))+4;
				// 高さ比率
				var height = parseInt(create_dish_map[sType][gData]['nHeightRate'])-0;
				// 幅比率
				var width = parseInt(create_dish_map[sType][gData]['nWidthRate'])-0;
				// 表示順序
				var zLine = ORDERMADE_Z + parseInt(create_dish_map[sType][gData]['nZline']);

				img.setAttribute('style','left:'+Xline+'%;top:'+YLine+'%;height:'+height+'%;width:'+width+'%;z-index:'+zLine+';');
				ordermade_animation.appendChild(img);

			}
		}
	}
}

/**
 * 商品選択解除アニメーション処理
 * @param "hamburg","topping","rice","source","salad"
 * @param 商品コード
 */
function goodsSelectOutAnimation(type,goodsNo){
	if (goodsNo == '92008') {
		// ハンバーグソース選択解除の場合、アニメーションスキップ
		return;
	}

	// ライスの種類毎画像も全て解除
	var paternList = [];
	paternList.push(goodsNo);
	if(contains(layoutData_json,goodsNo+"_pasta")){
		paternList.push(goodsNo+"_pasta");
	}
	if(contains(layoutData_json,goodsNo+"_cauliflower")){
		paternList.push(goodsNo+"_cauliflower");
	}

	var img = null;
	for(patern in paternList){
		// 画像取得
		img = document.getElementById('ordermade_img_'+paternList[patern]);
		if(img != null){
			img.setAttribute('class','ordermade_goods');
		}
	}

	if(type == "rp"){
		// ライス切替時、ソース画像の切替が必要なら、切替
		for(var sc_gData in create_dish_map["sc"]){
			var smallTypeCheckQnt = parseInt(create_dish_map["sc"][sc_gData]["quantity"]);
			if(smallTypeCheckQnt > 0){
				// 選択中ソースの場合
				var goodsNo_sc = create_dish_map["sc"][sc_gData]["nGoodsCode"];
				if(contains(layoutData_json,goodsNo_sc+"_pasta")){
					// パスタ用表示
					var img_sc_1 = document.getElementById('ordermade_img_'+goodsNo_sc+'_pasta');
					if(img_sc_1 != null){
						img_sc_1.setAttribute('class','ordermade_goods');
						img_sc_1.style.animationDelay = '0s';
					}
				}
				if(contains(layoutData_json,goodsNo_sc+"_cauliflower")){
					// カリフラワー用非表示
					var img_sc_2 = document.getElementById('ordermade_img_'+goodsNo_sc+'_cauliflower');
					if(img_sc_2 != null){
						img_sc_2.setAttribute('class','ordermade_goods');
						img_sc_2.style.animationDelay = '0s';
					}
				}
				// ライス用非表示
				var img_sc = document.getElementById('ordermade_img_'+goodsNo_sc);
				if(img_sc != null){
					img_sc.setAttribute('class','ordermade_goods');
					img_sc.style.animationDelay = '0s';
				}
				break;
			}
		}
	}

	if(type == 'hb' || type == 'tp' || smogOnFlg){
		// 煙生成
		// 処理の軽量化のため、smog1なし
		// var smog1 = document.getElementById('smogEff1');
		// smog1.setAttribute('style',img.getAttribute('style'));
		// smog1.setAttribute('class','');
		// smog1.offsetWidth = smog1.offsetWidth;
		// smog1.setAttribute('class','smogEff1');
		var smog2 = document.getElementById('smogEff2');
		smog2.setAttribute('style',img.getAttribute('style'));
		smog2.style.animationDelay = '0s';
		smog2.setAttribute('class','');
		smog2.offsetWidth = smog2.offsetWidth;
		smog2.setAttribute('class','smogEff2');
	}
}

/**
 * アニメーション準備処理
 * @param "hamburg","topping","rice","source","salad"
 * @param 商品コード
 */
function goodsAnimationSet(){
	// 表示領域取得
	var ordermade_animation = document.getElementById('ordermade_animation');

	// 表示領域初期化
	ordermade_animation.innerHTML = '';

	// 煙生成
	var smog1 = document.createElement('img');
	smog1.setAttribute('id','smogEff1');
	smog1.setAttribute('class','smogEffNone');
	smog1.setAttribute('src',lis_fact_map['images/order_select/smog.png']);
	var smog2 = document.createElement('img');
	smog2.setAttribute('id','smogEff2');
	smog2.setAttribute('class','smogEffNone');
	smog2.setAttribute('src',lis_fact_map['images/order_select/smog.png']);

	ordermade_animation.appendChild(smog1);
	ordermade_animation.appendChild(smog2);

	for(type in base_dish_map){
		for(goodsNo in base_dish_map[type]){
			var paternList = [];
			paternList.push(goodsNo);
			if(contains(layoutData_json,goodsNo+"_pasta")){
				paternList.push(goodsNo+"_pasta");
			}
			if(contains(layoutData_json,goodsNo+"_cauliflower")){
				paternList.push(goodsNo+"_cauliflower");
			}
			for(imgType in paternList){
				if (goodsNo != '92008') {
					// ハンバーグソースの場合、画像取得をスキップ
					// 商品画像生成
					var img = document.createElement('img');
					img.setAttribute('id','ordermade_img_'+paternList[imgType]);
					img.setAttribute('class','ordermade_goods');
					img.setAttribute('src',lis_fact_map['images/goods/'+paternList[imgType]+'.png']);

					// X軸
					var Xline = ORDERMADE_X + parseInt((base_dish_map[type][goodsNo]['nDispPositionX']));
					// Y軸
					var YLine = ORDERMADE_Y - parseInt((base_dish_map[type][goodsNo]['nDispPositionY']));
					// 高さ比率
					var height = base_dish_map[type][goodsNo]['nHeightRate'];
					// 幅比率
					var width = base_dish_map[type][goodsNo]['nWidthRate'];
					// 表示順序
					var zLine = ORDERMADE_Z + parseInt(base_dish_map[type][goodsNo]['nZline']);

					// 商品画像位置・サイズ・表示順序を設定
					img.setAttribute('style','left:'+Xline+'%;top:'+YLine+'%;height:'+height+'%;width:'+width+'%;z-index:'+zLine+';');
					
					ordermade_animation.appendChild(img);
				}
			}
		}
	}
}

/**
 * イートインテイクアウト切替処理
 * @param "eatin"or"takeout"or""
 */
function changeSideBarType(type) {
    // if(type == "eatin"){
	// 	document.getElementById('side-default').setAttribute('class','c-navRight bgImg eatin-side');
	// 	document.getElementById('takeoutSide').setAttribute('class','c-navRight bgImg is-hide');
	// 	document.getElementById('anotherOrderBtn').setAttribute('href','root/top');
	// }else if(type == "takeout"){
	// 	document.getElementById('side-default').setAttribute('class','c-navRight bgImg is-hide eatin-side');
	// 	document.getElementById('takeoutSide').setAttribute('class','c-navRight bgImg');
	// 	document.getElementById('anotherOrderBtn').setAttribute('href','root/takeout');
	// }else if(type == ""){
	// 	var href = document.getElementById('anotherOrderBtn').getAttribute('href');
	// 	if(href == 'root/top'){
	// 		document.getElementById('side-default').setAttribute('class','c-navRight bgImg eatin-side');
	// 	}else if(href == 'root/takeout'){
	// 		document.getElementById('takeoutSide').setAttribute('class','c-navRight bgImg');
	// 	}
	// }
}


/**
 * サイドリンク切替処理
 * @param 
 */
function changeSideLnk() {
    if(dishEditingFlg){
		// document.getElementById('c-menu1__btn0').setAttribute('href','#root/order/order-select');
		// document.getElementById('c-menu1__btn0').setAttribute('onclick','touch(); changeSideLnkFunc(1);');
		// document.getElementById('c-menu1__btn1').setAttribute('href','#root/order/order-select');
		// document.getElementById('c-menu1__btn1').setAttribute('onclick','touch(); changeSideLnkFunc(2);');
		// document.getElementById('c-menu1__btn2').setAttribute('href','#root/order/order-select');
		// document.getElementById('c-menu1__btn2').setAttribute('onclick','touch(); changeSideLnkFunc(3);');
		// document.getElementById('c-menu1__btn3').setAttribute('href','#root/order/order-select');
		// document.getElementById('c-menu1__btn3').setAttribute('onclick','touch(); changeSideLnkFunc(4);');
		// document.getElementById('c-menu1__btn4').setAttribute('href','#root/order/order-select');
		// document.getElementById('c-menu1__btn4').setAttribute('onclick','touch(); changeSideLnkFunc(5);');
		// document.getElementById('c-menu1__btn5').setAttribute('href','#root/order/order-select');
		// document.getElementById('c-menu1__btn5').setAttribute('onclick','touch(); changeSideLnkFunc(6);');
		document.getElementById('footer_1').setAttribute('href','#root/order/order-select');
		document.getElementById('footer_1').setAttribute('onclick','touch(); changeSideLnkFunc(7);levelCancel();');
		document.getElementById('footer_2').setAttribute('href','#root/order/order-select');
		document.getElementById('footer_2').setAttribute('onclick','touch(); changeSideLnkFunc(8);levelCancel();');
		document.getElementById('footer_3').setAttribute('href','#root/order/order-select');
		document.getElementById('footer_3').setAttribute('onclick','touch(); changeSideLnkFunc(9);levelCancel();');
		// document.getElementById('c-menu2__btn1').setAttribute('href','#root/order/order-select');
		// document.getElementById('c-menu2__btn1').setAttribute('onclick','touch(); changeSideLnkFunc(11);');
		// document.getElementById('c-menu2__btn2').setAttribute('href','#root/order/order-select');
		// document.getElementById('c-menu2__btn2').setAttribute('onclick','touch(); changeSideLnkFunc(12);');
		// document.getElementById('c-menu2__btn3').setAttribute('href','#root/order/order-select');
		// document.getElementById('c-menu2__btn3').setAttribute('onclick','touch(); changeSideLnkFunc(13);');
		// document.getElementById('c-menu2__btn4').setAttribute('href','#root/order/order-select');
		// document.getElementById('c-menu2__btn4').setAttribute('onclick','touch(); changeSideLnkFunc(14);');
		document.getElementById('dialog_txt').innerHTML = W_2001;
	}else{
		// document.getElementById('c-menu1__btn0').setAttribute('href','root/ordermade');
		// document.getElementById('c-menu1__btn0').setAttribute('onclick',"touch(); basedishcomboMstEdit();ordermadeBaseImage();orderMadeDishBaseSelectReset();orderMadeDishBaseSelectCheck(1);orderMadeDishBaseSelectCheck(2);orderMadeDishBaseSelectCheck(3);orderMadeDishBaseSelectCheck(4);orderMadeDishBaseSelectCheck(5);orderMadeDishBaseSelectCheck(6);");
		// document.getElementById('c-menu1__btn1').setAttribute('href','javascript:basedishcomboMstEdit();createGeneralDetail(99);void(0)');
		// document.getElementById('c-menu1__btn1').setAttribute('onclick','touch();');
		// document.getElementById('c-menu1__btn2').setAttribute('href','javascript:createDrinkDetail(4, 0);void(0)');
		// document.getElementById('c-menu1__btn2').setAttribute('onclick','touch();');
		// document.getElementById('c-menu1__btn3').setAttribute('href','javascript:createGeneralDetail(3);void(0)');
		// document.getElementById('c-menu1__btn3').setAttribute('onclick','touch();');
		// document.getElementById('c-menu1__btn4').setAttribute('href','javascript:createGeneralDetail(2);void(0)');
		// document.getElementById('c-menu1__btn4').setAttribute('onclick','touch();');
		// document.getElementById('c-menu1__btn5').setAttribute('href','root/top');
		// document.getElementById('c-menu1__btn5').setAttribute('onclick',"touch(); menuBookMstEdit();goodsMstEdit();");
		document.getElementById('footer_1').setAttribute('href','root/home');
		document.getElementById('footer_1').setAttribute('onclick','touch();levelCancel();');
		document.getElementById('footer_2').setAttribute('href','root/cart');
		document.getElementById('footer_2').setAttribute('onclick','touch(); createTag(1,null);levelCancel();');
		document.getElementById('footer_3').setAttribute('href','javascript:void(0)');
		document.getElementById('footer_3').setAttribute('onclick','touch(); getAccountInfoPost(2); menuBookMstEdit(); goodsMstEdit();levelCancel();');
		// document.getElementById('c-menu2__btn1').setAttribute('href','javascript:createGeneralDetail(8);void(0)');
		// document.getElementById('c-menu2__btn1').setAttribute('onclick','touch();');
		// document.getElementById('c-menu2__btn2').setAttribute('href','javascript:createGeneralDetail(9);void(0)');
		// document.getElementById('c-menu2__btn2').setAttribute('onclick','touch();');
		// document.getElementById('c-menu2__btn3').setAttribute('href','javascript:createGeneralDetail(3);void(0)');
		// document.getElementById('c-menu2__btn3').setAttribute('onclick','touch();');
		// document.getElementById('c-menu2__btn4').setAttribute('href','#root/top');
		// document.getElementById('c-menu2__btn4').setAttribute('onclick','touch();');
	}
}

/**
 * 画面切り替え確認ダイアログ処理
 * @param 遷移先(1:オーダーメイドディッシュ、2:限定、3:ドリンク、4:サイド、5:お子様、6:イートインTOP、7:TOP、8:注文確認、9:注文履歴、10:会計、※ここからモーニング用　11:トースト、12:トースト&サラダ、13:サイド、14:ソフトドリンク)
 */
function changeSideLnkFunc(dest) {
	if(dishEditingFlg){
		document.getElementById('dialog').setAttribute('href','javascript:void(0)');
		// if(dest == 1){
		// 	document.getElementById('dialog_ok').setAttribute('onclick','touch(); basedishcomboMstEdit();ordermadeBaseImage();orderMadeDishBaseSelectReset();orderMadeDishBaseSelectCheck(1);orderMadeDishBaseSelectCheck(2);orderMadeDishBaseSelectCheck(3);orderMadeDishBaseSelectCheck(4);orderMadeDishBaseSelectCheck(5);orderMadeDishBaseSelectCheck(6);changeSideLnkFuncOk(1);');
		// }else if(dest == 2){
		// 	document.getElementById('dialog_ok').setAttribute('onclick','touch(); changeSideLnkFuncOk(2);');
		// }else if(dest == 3){
		// 	document.getElementById('dialog_ok').setAttribute('onclick','touch(); changeSideLnkFuncOk(3);');
		// }else if(dest == 4){
		// 	document.getElementById('dialog_ok').setAttribute('onclick','touch(); changeSideLnkFuncOk(4);');
		// }else if(dest == 5){
		// 	document.getElementById('dialog_ok').setAttribute('onclick','touch(); changeSideLnkFuncOk(5);');
		// }else if(dest == 6){
		// 	document.getElementById('dialog_ok').setAttribute('onclick','touch(); changeSideLnkFuncOk(6);');
		// }else 
		if(dest == 7){
			document.getElementById('dialog_ok').setAttribute('onclick','touch(); changeSideLnkFuncOk(7);');
		}else if(dest == 8){
			document.getElementById('dialog_ok').setAttribute('onclick','touch(); changeSideLnkFuncOk(8);');
		}else if(dest == 9){
			document.getElementById('dialog_ok').setAttribute('onclick','touch(); changeSideLnkFuncOk(9);');
		} else {
			document.getElementById('dialog_ok').setAttribute('onclick','touch(); changeSideLnkFuncOk(999);');
		}
		// else if(dest == 11){
		// 	document.getElementById('dialog_ok').setAttribute('onclick','touch(); changeSideLnkFuncOk(11);');
		// }else if(dest == 12){
		// 	document.getElementById('dialog_ok').setAttribute('onclick','touch(); changeSideLnkFuncOk(12);');
		// }else if(dest == 13){
		// 	document.getElementById('dialog_ok').setAttribute('onclick','touch(); changeSideLnkFuncOk(13);');
		// }else if(dest == 14){
		// 	document.getElementById('dialog_ok').setAttribute('onclick','touch(); changeSideLnkFuncOk(14);');
		// }
		Data.data['scenes']['dialog'].onEntry();
	}
}

/**
 * ダイアログOK処理
 * @param 遷移先(1:オーダーメイドディッシュ、2:限定、3:ドリンク、4:サイド、5:お子様、6:イートインTOP、7:TOP、8:注文確認、9:注文履歴、10:会計)
 */
function changeSideLnkFuncOk(dest) {

	// if(dest == 1){
	// 	document.getElementById('dialog').setAttribute('href','root/ordermade');
	// 	location.href = '#root/ordermade';
	// }else if(dest == 2){
	// 	document.getElementById('dialog').setAttribute('href','#root/kids');
	// 	basedishcomboMstEdit();
	// 	createGeneralDetail(99);
	// }else if(dest == 3){
	// 	document.getElementById('dialog').setAttribute('href','#root/drinkTopEatIn');
	// 	createDrinkDetail(4, 0);
	// }else if(dest == 4){
	// 	document.getElementById('dialog').setAttribute('href','#root/kids');
	// 	createGeneralDetail(3);
	// }else if(dest == 5){
	// 	document.getElementById('dialog').setAttribute('href','#root/kids');
	// 	createGeneralDetail(2);
	// }else if(dest == 6){
	// 	document.getElementById('dialog').setAttribute('href','root/top');
	// }else 
	if(dest == 7){
		document.getElementById('dialog').setAttribute('href','root/home');
		location.href = '#root/home';
	}else if(dest == 8){
		document.getElementById('dialog').setAttribute('href','root/cart');
		location.href = '#root/cart';
		createTag(1,null);

	}else if(dest == 9){
		document.getElementById('dialog').setAttribute('href','javascript:void(0)');
		location.href = '#';
		getAccountInfoPost(2);
	}else{
		document.getElementById('dialog').setAttribute('href','javascript:void(0)');
	}
	// else if(dest == 11){
	// 	document.getElementById('dialog').setAttribute('href','javascript:void(0)');
	// 	createGeneralDetail(8);
	// }else if(dest == 12){
	// 	document.getElementById('dialog').setAttribute('href','javascript:void(0)');
	// 	createGeneralDetail(9);
	// }else if(dest == 13){
	// 	document.getElementById('dialog').setAttribute('href','javascript:void(0)');
	// 	createGeneralDetail(3);
	// }else if(dest == 14){
	// 	document.getElementById('dialog').setAttribute('href','#root/top');
	// 	location.href = '#root/top';
	// }
	Data.data['scenes']['dialog'].onExit();

	if(levelOrdMadePop == 1){
		Data.data['scenes']['level'].onEntry(0);
	} else if(levelOrdMadePop == 2) {
		levelDispGoodsDetail(currentDispId);
	}
	// Data.data['scenes']['select'].onExit(0);
	dishEditingFlg = false;
	changeSideLnk();
}

/**
 * ダイアログキャンセル処理
 */
function changeSideLnkFuncCancel() {
	levelOrdMadePop = 0;
	document.getElementById('dialog').setAttribute('href','javascript:void(0)');
	Data.data['scenes']['dialog'].onExit();
	// document.getElementById('dialog').setAttribute('href','root/order/order-select');
}

/**
 * オーダーメイドディッシュの言語設定
 * @param
 *  lang：言語種別（jp、en、cn、kr） 
 */
function chgOrdMadeLang(lang) {
	startMeasuringElapsedTime("chgOrdMadeLangStart");
	// switch (lang) {
	// 	case 'jp':
	// 		ORD_MADE_DISHERS_LANG = 'オーダーメイドディッシュ';
	// 		break;
	// 	case 'en':
	// 		ORD_MADE_DISHERS_LANG = 'Order made dish';
	// 		break;
	// 	case 'cn':
	// 		ORD_MADE_DISHERS_LANG = '定制菜';
	// 		break;
	// 	case 'kr':
	// 		ORD_MADE_DISHERS_LANG = '맞춤형 요리';
	// 		break;				
	// }
	for(var line in tmp_m_basedishcombo_map){
		for(var i in tmp_m_basedishcombo_map[line]){
			// 言語設定の反映
			// if (goods_lng_map.get(tmp_m_basedishcombo_map[line][i]["nGoodsCode"]) != null){
			// 	// goodsType[gt]['cGoodsName'] = goods_lng_map.get(goodsType[gt]['nGoodsCode'])['name'];
			// 	tmp_m_basedishcombo_map[line][i]["cBaseDishName"] = goods_lng_map.get(tmp_m_basedishcombo_map[line][i]["nGoodsCode"])['name'];
			// }
			if(m_goods_map[tmp_m_basedishcombo_map[line][i]["nGoodsCode"]] != null){
				tmp_m_basedishcombo_map[line][i]["cBaseDishName"] = m_goods_map[tmp_m_basedishcombo_map[line][i]["nGoodsCode"]]["cGoodsName"];
			}
		}
	}
	stopMeasuringElapsedTime("chgOrdMadeLangStart", "chgOrdMadeLang完了");
}

/**
 * bf_order_map内の言語切替
 * 　言語切替によりbf_order_map内の商品名称を更新する
 * @param
 * 　なし
 */
function chgBfOrdMap() {
	startMeasuringElapsedTime("chgBfOrdMapStart");
	for (var ord in bf_order_map) {
		if (bf_order_map[ord]['orderMadeFlg'] === '1') {
			// 「オーダーメイドディッシュ」の言語設定反映
			// if(goods_lng_map.get(bf_order_map[ord]['ordBaseCode']) != null){
			// 	bf_order_map[ord]['goodsData']['cGoodsName'] = goods_lng_map.get(bf_order_map[ord]['ordBaseCode'])['name'];
			// }
			if(m_goods_map[bf_order_map[ord]['ordBaseCode']] != null){
				bf_order_map[ord]['goodsData']['cGoodsName'] = m_goods_map[bf_order_map[ord]['ordBaseCode']]['cGoodsName'];
			}

			// 詳細部分の言語設定反映
			for (var odish in bf_order_map[ord]) {
				if (odish === 'hb' || odish === 'tp' || odish === 'sc' || odish === 'rp' || odish === 'sr') {
                    var goodsType = bf_order_map[ord][odish];
                    for (var gt in goodsType) {
						// 言語設定の反映
						// if (goods_lng_map.get(goodsType[gt]['nGoodsCode']) != null){
						// 	goodsType[gt]['cGoodsName'] = goods_lng_map.get(goodsType[gt]['nGoodsCode'])['name'];
						// }
						if(m_goods_map[goodsType[gt]['nGoodsCode']] != null){
							goodsType[gt]['cGoodsName'] = m_goods_map[goodsType[gt]['nGoodsCode']]["cGoodsName"];
						}
					}
				}
			}
		} else if (bf_order_map[ord]['orderMadeFlg'] === '3') {
				// 「オーダーメイドディッシュ」の言語設定反映
				// bf_order_map[ord]['goodsData']['cGoodsName'] = goods_lng_map.get(bf_order_map[ord]['ordBaseCode'])['name'];
				if(m_goods_map[bf_order_map[ord]['ordBaseCode']] != null){
					bf_order_map[ord]['goodsData']['cGoodsName'] = m_goods_map[bf_order_map[ord]['ordBaseCode']]["cGoodsName"];
				}
		} else {
			// オーダーメイドディッシュ以外の場合
			// 言語設定の反映
			// if (goods_lng_map.get(bf_order_map[ord]['nGoodsCode']) != null){
			// 	bf_order_map[ord]['goodsData']['cGoodsName'] = goods_lng_map.get(bf_order_map[ord]['nGoodsCode'])['name'];
			// }
			if(m_goods_map[bf_order_map[ord]['nGoodsCode']] != null){
				bf_order_map[ord]['goodsData']['cGoodsName'] = m_goods_map[bf_order_map[ord]['nGoodsCode']]["cGoodsName"];
			}
		}
	}
	stopMeasuringElapsedTime("chgBfOrdMapStart", "chgBfOrdMap完了");
}

/**
 * af_order_map内の言語切替
 * 　言語切替によりaf_order_map内の商品名称を更新する
 * @param
 * 　なし
 */
function chgAfOrdMap() {
	startMeasuringElapsedTime("chgAfOrdMapStart");
	for (var ord in af_order_map) {
		if (af_order_map[ord]['orderMadeFlg'] === '1') {
			// 「オーダーメイドディッシュ」の言語設定反映
			// if (goods_lng_map.get(af_order_map[ord]['ordBaseCode']) != null){
			// 	af_order_map[ord]['goodsData']['cGoodsName'] = goods_lng_map.get(af_order_map[ord]['ordBaseCode'])['name'];
			// }
			if (m_goods_map[af_order_map[ord]['ordBaseCode']] != null){
				af_order_map[ord]['goodsData']['cGoodsName'] = m_goods_map[af_order_map[ord]['ordBaseCode']]['cGoodsName'];
			}
			
			// 詳細部分の言語設定反映
			for (var odish in af_order_map[ord]) {
				if (odish === 'hb' || odish === 'tp' || odish === 'sc' || odish === 'rp' || odish === 'sr') {
                    var goodsType = af_order_map[ord][odish];
                    for (var gt in goodsType) {
						// 言語設定の反映
						// if (goods_lng_map.get(goodsType[gt]['nGoodsCode']) != null){
						// 	goodsType[gt]['cGoodsName'] = goods_lng_map.get(goodsType[gt]['nGoodsCode'])['name'];
						// }
						if (m_goods_map[goodsType[gt]['nGoodsCode']] != null){
							goodsType[gt]['cGoodsName'] = m_goods_map[goodsType[gt]['nGoodsCode']]['cGoodsName'];
						}
					}
				}
			}
		} else if (af_order_map[ord]['orderMadeFlg'] === '3') {
				// 「オーダーメイドディッシュ」の言語設定反映
				// af_order_map[ord]['goodsData']['cGoodsName'] = goods_lng_map.get(af_order_map[ord]['ordBaseCode'])['name'];
				if (m_goods_map[goodsType[gt]['nGoodsCode']] != null){
					af_order_map[ord]['goodsData']['cGoodsName'] = m_goods_map[goodsType[gt]['nGoodsCode']]['cGoodsName'];
				}
		} else {
			// オーダーメイドディッシュ以外の場合
			// 言語設定の反映
			// if (goods_lng_map.get(af_order_map[ord]['nGoodsCode']) != null){
			// 	af_order_map[ord]['goodsData']['cGoodsName'] = goods_lng_map.get(af_order_map[ord]['nGoodsCode'])['name'];
			// }
			if (m_goods_map[af_order_map[ord]['nGoodsCode']] != null){
				af_order_map[ord]['goodsData']['cGoodsName'] = m_goods_map[af_order_map[ord]['nGoodsCode']]['cGoodsName'];
			}
		}
	}
	stopMeasuringElapsedTime("chgAfOrdMapStart", "chgAfOrdMap完了");
}

/** 
 * タッチオン再生処理
 * 　ボタンタッチ時にタッチ音を再生する
 * @param
 * 　なし
 */
function touch() {
	document.getElementById('touchsound').currentTime = 0;
	document.getElementById('touchsound').play();
}

//現在時刻取得（yyyyMMddHHmmssSSS）
function getCurrentTime() {
    var now = new Date();
    var res = "" + now.getFullYear() + padZero(now.getMonth() + 1) + padZero(now.getDate()) + padZero(now.getHours()) + 
        padZero(now.getMinutes()) + padZero(now.getSeconds()) + padZero(now.getMilliseconds());
	return res;
}

//先頭ゼロ付加
function padZero(num) {
    return (num < 10 ? "0" : "") + num;
}

/**
 * 注文完了ポップアップ処理
 */
function ordEndPop(){
	// if(MSG_CSS_LANG == 'jp'){
		// 日本語の場合、ソフトドリンク・みそ汁の表示を制御
		if(softDrinkFlg && misoSorpFlg){
			document.getElementById('s-dialog11').innerHTML = I_1014.replace('{0}',MSG_CART_20+MSG_CART_21+'<br/>');
		}else if(softDrinkFlg && !misoSorpFlg){
			document.getElementById('s-dialog11').innerHTML = I_1014.replace('{0}',MSG_CART_20+'<br/>');
		}else if(!softDrinkFlg && misoSorpFlg){
			document.getElementById('s-dialog11').innerHTML = I_1014.replace('{0}',MSG_CART_21);
		}else{
			document.getElementById('s-dialog11').innerHTML = I_1014.replace('{0}','');
		}
	// }else{
		// document.getElementById('s-dialog11').innerHTML = I_1014;
	// }
	Data.data['scenes']['dialog11'].onEntry();
}

/**
 * 注文エラーポップアップメッセージ更新処理
 */
function orderErrPopMsg() {
	document.getElementById('s-dialog2').innerHTML = E_9003;
	document.getElementById('s-dialog6').innerHTML = I_1011;
}

// 卓番号
var table_no = null;
// テーブルコード
var table_code = null;
var fstGetTableNoFlg = false;
/**
 * 卓番号取得処理
 */
function getTableNo() {
	// 卓番号取得POST送信
	var response_json = null;

	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			//TODO：卓番号取得失敗エラー
			// document.getElementById('s-dialog10').innerHTML = E_9002;
			// Data.data['scenes']['dialog10'].onEntry();
			// document.getElementById('loading').setAttribute("hidden","hidden");
      additionMessage("[Error     ]", "getTableNo: タイムアウト発生");


			getTableNo();
		}
	},POST_TIMEOUT_TIME);

	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/getTableNo.php',
			data:{
				android_id:androidID,
				term_class:"RTIS1",
				request_id:getCurrentTime()
				},
			success:function(data){
				// POST送信終了
				response_json = data;
				data = null;
			}
		})
	).done(function() {
		if(!(timeoutFlg)){
			timeoutFlg = true;
			if(response_json["status"] == 0){
				//TODO：卓番号画面表示処理
				// 卓番号
				table_no = response_json["result"]["tablename"];
				table_code = parseInt(response_json["result"]["tablecode"]);
				document.getElementById('people_tbNo').innerHTML = table_no+'<span class="people_tbNo2">卓</span>';

				if(!fstGetTableNoFlg){
					// 卓ステータスをチェックし、TOPor人数入力画面へ遷移
					checkTableStatus();
					fstGetTableNoFlg = true;
				}
			}else{
				//TODO：卓番号取得失敗エラー
				// document.getElementById('s-dialog10').innerHTML = E_9002;
				// if(regFlg == '1'){
				// 	location.href = '#root/takeout';
				// 	document.getElementById('dialog10').href = '#root/takeout';
				// }else{
				// 	location.href = '#root/people';
				// 	document.getElementById('dialog10').href = '#root/people';
				// }
				// Data.data['scenes']['dialog10'].onEntry();
				// document.getElementById('loading').setAttribute("hidden","hidden");
				additionMessage("[Error     ]", "getTableNo: エラー発生");

				getTableNo();
			}
		}else{
			timeoutFlg = true;
		}
	})
}
/**
 * チェックイン処理
 * @param 卓人数
 */
function checkIn(people) {
	outOparationLog("チェックイン処理開始");
	startMeasuringElapsedTime("startcheckIn");
	document.getElementById('loading').removeAttribute("hidden");
	// チェックインPOST送信
	var response_json = null;

	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// 通信エラーポップアップ出力処理
			// getDataErrorPopUp();
			// document.getElementById('loading').setAttribute("hidden","hidden");
			// リトライ処理に変更
			timeoutRetryOccur("checkIn");
			checkIn(people);
		}
	},POST_TIMEOUT_TIME);

	startMeasuringElapsedTime("postStartIncheckIn");
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_ROOT_FOLDER + '/tto/compass_status_change.php',
			data:{
				android_id:androidID,
				term_class:"RTIS1",
				request_id:getCurrentTime(),
				kind:0,
				number_of_people_child:people
				},
			success:function(data){
				stopMeasuringElapsedTime("postStartIncheckIn", "checkIn内tto/compass_status_change.php:post完了");
				// POST送信終了
				response_json = data;
				data = null;
			}
		})
	).done(function() {
		if(!(timeoutFlg)){
			timeoutFlg = true;
			if(response_json["status"] == 0){
				// チェックイン後処理
				// // TOP画面遷移
				// Data.data['scenes']['root'].changeScene('root/home');
				// location.href = '#root/home';
				// document.getElementById('loading').setAttribute("hidden","hidden");
				// // person = people;
				// getQuantityLimit();
				outOparationLog("チェックイン処理終了");
				stopMeasuringElapsedTime("startcheckIn", "checkIn完了");
				getStatusAndMenu(false);
			}else{
				// 通信エラーポップアップ出力処理
				// getDataErrorPopUp();
				// document.getElementById('loading').setAttribute("hidden","hidden");
				// リトライ処理に変更
				failureRetryOcuur("checkIn");
				checkIn(people);
			}
		}else{
			timeoutFlg = true;
		}
		response_json = null;
	})
}

/**
 * 注文数量上限数取得処理
 * @param 卓人数
 */
function getGenericMasterByTextIngetQuantityLimit(people) {
	stopMeasuringElapsedTime("getQuantityLimit", "getQuantityLimit完了");
	for (var id in response_json_map_interim) {
		// 注文数量上限値を更新
		if (ORD_LIMIT_CONTROL_MODE == "quantityLimit") {
			// 全体の数量制限モードの場合
			quantityLimit = Number(response_json_map_interim[id]["cValue1"]);
		} else {
			// 人数☓係数モードの場合
			quantityLimit = Number(response_json_map_interim[id]["cValue1"]) * people;
		}
	}
}

function getQuantityLimit(people) {
	startMeasuringElapsedTime("getQuantityLimit");
	getGenericMasterByTextIngetQuantityLimit(people);
	return;
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で注文数量上限値を取得
  startMeasuringElapsedTime("PostStartIngetQuantityLimit");
	var response_json_map = {};
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/getGenericMaster.php',
			data:{
                'fName': 'ordLimitControl',
                'uName': ORD_LIMIT_CONTROL_MODE
            },
			success:function(data){
  			stopMeasuringElapsedTime("PostStartIngetQuantityLimit", "getQuantityLimit内getGenericMaster.php:post完了");
				// 結果をJSON形式で取得
				response_json_map = JSON.parse(data);
				data = null;
			}
		})
	).done(function() {
		if(!(timeoutFlg)){
			timeoutFlg = true;
			stopMeasuringElapsedTime("getQuantityLimit", "getQuantityLimit完了");
			for (var id in response_json_map) {
				// 注文数量上限値を更新
				if (ORD_LIMIT_CONTROL_MODE == "quantityLimit") {
					// 全体の数量制限モードの場合
					quantityLimit = Number(response_json_map[id]["cValue1"]);
				} else {
					// 人数☓係数モードの場合
					quantityLimit = Number(response_json_map[id]["cValue1"]) * people;
				}
			}
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * アレルギー情報一覧表示処理
 * @param
 */
function allergenOther() {
	// アレルギー情報ポップアップ表示
	Data.data['scenes']['allergenOther'].onEntry();
	document.getElementById('alletgenOther').scrollTop = 0;
	createAllergenTable();
}

/**
 * アレルギー情報一覧作成処理
 * @param
 */
function createAllergenTable() {
	// タグを追加する親要素を取得
	var target = document.getElementById('aller_list');

	// 一覧の状態をクリア
	target.textContent = null;

	// // アレルギー一覧の中身を作成
	// for (var name in aller_map) {
	for(var mg in m_goods_map){
		if(m_goods_map[mg]["byAllergyDetailDispFlg"] != "1"){
			// 一覧表示対象外データの場合スキップ
			continue;
		}
		var row_map = m_goods_map[mg];
		// タグを作成
		var newRow = document.createElement('tr');
		var newTd1 = document.createElement('td');
		var newTd2 = document.createElement('td');
		var newTd3 = document.createElement('td');
		var newTd4 = document.createElement('td');

		// タグの中身を作成
		newTd1.setAttribute('class', 'allergy-td1');
		newTd1.innerHTML = row_map['cGoodsName'+SLCT_LANG_MAPPING[MSG_CSS_LANG]];
		newTd2.setAttribute('class', 'allergy-td2');
		newTd2.textContent = row_map['nCal']+"kCal";
		newTd3.setAttribute('class', 'allergy-td3');
		newTd3.textContent = row_map['nSalt']+"g";
		newTd4.setAttribute('class', 'allergy-td4');

		// アレルギー内容テキスト
		var materials = "";
		// 
		for(var i=1;i <= 30; i++){
			if(row_map['byAllergie'+i] == "1"){
				materials += allergy_map[i]["cAllergyName"+SLCT_LANG_MAPPING[MSG_CSS_LANG]];
				materials += ", ";
			}
		}
		materials = materials.slice(0,-2);

		newTd4.innerHTML = materials;

		newRow.appendChild(newTd1);
		newRow.appendChild(newTd2);
		newRow.appendChild(newTd3);
		newRow.appendChild(newTd4);
		target.appendChild(newRow);
	}
}

var checkInFlg = false;
/**
 * 人数決定ボタン処理
 */
function poeple_btn(){
  additionMessage("[Log       ]", "人数決定ボタン押下");
	outOparationLog("人数入力画面：決定ボタン押下");
	startMeasuringElapsedTime("touchPeopleBtn");
	// 多重タップ防止
	if(checkInFlg){return;}
	checkInFlg = true;
	if(guiFlg == GUI_CODE){
		touch();
		location.href = "#root/home";
		return;
	}
	manual = true;
	// getMenuBookMaster(false);
	touch();
	ChangeMsgLanguage('jp');
	// チェックイン
	recordStartCheckIn();
	checkIn(document.getElementById('selectPeople').textContent);
}

var screenOffFlg = false;

var slipNo = '';

var pushResetGoFlg = false;
var manual = false;

/**
 * リセットプッシュ通知処理
 *   バッシング完了処理・メニューブック切替処理の振り分けを実行。
 */
function pushReset(){
	if(!(pushResetGoFlg)){
		if (manual) {
			setTimeout(function () {
				manual = false;
			}, 3000);
		} else {
			if(!(pushResetGoFlg)){
				pushResetGoFlg = true;
				pushReset2();
			}
		}
	}
}
var tmp_tb_status = null;
/**
 * リセットプッシュ通知処理
 *   バッシング完了処理・メニューブック切替処理の振り分けを実行。
 */
function pushReset2(){
	outOparationLog("リセットプッシュ通知受信処理開始");
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
		}
	},POST_TIMEOUT_TIME);

	// 卓ステータス要求POST送信
	var response_json = null;
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/compass_status_request.php',
			data:{
				android_id:androidID,
				term_class:"RTIS1",
				request_id:getCurrentTime()
				},
			success:function(data){
				// POST送信終了
				response_json = data;
			}
		})
	).done(function() {
		if(response_json["status"] == 0 && !(timeoutFlg)){
			timeoutFlg = true;
			// 卓ステータス
			// alert(slipNo +"rw"+response_json["result"]["slipNo"]);
			tmp_tb_status = response_json["result"]["table_status"];
			if(tmp_tb_status == 1 && slipNo != response_json["result"]["slipNo"]){
				// 在卓の場合、バッシング完了処理
				bashingEnd();
				menubook_cd = response_json["result"]["table_info"]["book_id"];
				changeMenubook(response_json["result"]["table_people"]);
				outOparationLog("リセットプッシュ通知受信処理終了-在卓-バッシング完了判定");
			} else if(tmp_tb_status == 0){
				// 空卓の場合、バッシング完了処理
				bashingEnd();
				outOparationLog("リセットプッシュ通知受信処理終了-空卓判定");
			}else if(tmp_tb_status == 1 && menubook_cd != response_json["result"]["table_info"]["book_id"]){
			// }else if(tmp_tb_status == 1){
				// 在卓の場合、メニューブック切替処理
				menubook_cd = response_json["result"]["table_info"]["book_id"];
				changeMenubook(response_json["result"]["table_people"]);
				outOparationLog("リセットプッシュ通知受信処理終了-在卓-ブック切替判定");
			}else if(tmp_tb_status == 2){
				// オーダ停止の場合の処理
				outOparationLog("リセットプッシュ通知受信処理終了-オーダ停止判定　※実装なし");
			}else if(tmp_tb_status == 4){
				// オーダ停止の場合の処理
				// 画面OFF
				uica.offScreen();
				Data.data['scenes']['offScreen'].onEntry();
				screenOffFlg = true;
				outOparationLog("リセットプッシュ通知受信処理終了-画面OFF判定");
			}else if(tmp_tb_status == 3){
				// バッシングの場合の処理
				bashingEnd();
				document.getElementById('s-dialog16').innerHTML = I_1021;
				Data.data['scenes']['dialog16'].onEntry();
				outOparationLog("リセットプッシュ通知受信処理終了-バッシング判定");
			} else if (tmp_tb_status == 1) {
				outOparationLog("リセットプッシュ通知受信処理終了-在卓⇒在卓判定　※処理なし");
			}
			if(tmp_tb_status != 4 && screenOffFlg == true){
				// 画面OFFからONに切替時
				uica.onScreen();
				Data.data['scenes']['offScreen'].onExit();
				screenOffFlg = false;
				// location.href = '#root/home';
				// menubook_cd = response_json["result"]["table_info"]["book_id"];
				// changeMenubook(response_json["result"]["table_people"]);
				outOparationLog("リセットプッシュ通知受信処理終了2-画面ON判定");
			}

			slipNo = response_json["result"]["slipNo"];
			menubook_cd = response_json["result"]["table_info"]["book_id"];
			changeMenubookLayout(menubook_cd);
		}else{
			timeoutFlg = true;
			// ステータス要求失敗の場合、リトライ
			pushReset2();
			return;
		}
		setTimeout(function () {
			pushResetGoFlg = false;
		  }, 1000);
		// pushResetGoFlg = false;
	})
}

/**
 * 最新メニューブックコード取得処理
 */
function getStatusAndMenu(pushMenubookChangeFlg){
	outOparationLog("最新メニューブックコード取得開始");
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			getStatusAndMenu(pushMenubookChangeFlg);
		}
	},POST_TIMEOUT_TIME);

	// 卓ステータス要求POST送信
	var response_json = null;
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/compass_status_request.php',
			data:{
				android_id:androidID,
				term_class:"RTIS1",
				request_id:getCurrentTime()
				},
			success:function(data){
				// POST送信終了
				response_json = data;
			}
		})
	).done(function() {
		if(response_json["status"] == 0 && !(timeoutFlg)){
			timeoutFlg = true;
			// 卓ステータス
			tmp_tb_status = response_json["result"]["table_status"];
			slipNo = response_json["result"]["slipNo"];
			menubook_cd = response_json["result"]["table_info"]["book_id"];
			outOparationLog("最新メニューブックコード取得完了");
			changeMenubookLayout(menubook_cd);
//getMenuBookMaster(pushMenubookChangeFlg);
      retryPromise(getAccountKbnCheckIn, 1000)
			.then((result) => {
				$(function(){
					Data.data['scenes']['root'].changeScene('root/home');
					location.href = '#root/home';
					document.getElementById('getData_blank_disp').setAttribute("class","s-offScreen2 jBtn is-hide");
					document.getElementById('loading').setAttribute("hidden","hidden");
			})
				});
		}else{
			timeoutFlg = true;
			// ステータス要求失敗の場合
			// getDataErrorPopUp();
			getStatusAndMenu(pushMenubookChangeFlg);
			return;
		}
	})
}

/**
 * バッシング完了処理
 *   注文情報・言語設定をリセット。
 *   リセット後、人数入力画面を表示。
 */
function bashingEnd(){
	bassingFlg = true;
	// メッセージ言語の初期化(jp)
	ChangeMsgLanguage('jp');
	// 各種状態の初期化
	enOrderdataReset();
	// 注文確定前データマップ
	bf_order_map = [];
	// 注文確定後データマップ
	af_order_map = [];
	// 注文確定前データ数バッチアイコン
	var icon = document.getElementById('iconBadge');
	icon.textContent = null;
	icon.setAttribute('hidden', 'hidden');
	// 注文確定ボタン点灯解除
	document.getElementById('footer_2').classList.remove("footer_2_anime");
	// 注文カゴ内の合計数量をクリア
	ordQuantity = 0;
	// ごいっしょにいかがですか情報
	with_goods_ope_map = [];

	// お会計ボタンの初期化
	document.getElementById('home_btn3').setAttribute('onclick', '');
	document.getElementById('footer_4').setAttribute('onclick', '');
	// 卓番号の取得
	document.getElementById('selectPeople').textContent = 1;
	getTableNo();
	// 最新メニューの取得・商品名言語設定の初期化(jp)
	//getMenuBookMaster(false);
	// 人数入力画面へ遷移
	$('.c-menu1').addClass('is-hide');
    $('.c-menu4').addClass('is-hide');
	location.href = '#root/people';
}

/**
 * メニューブック切替処理
 *   DBから最新のメニュー情報を取得する。
 *   リセット後、人数入力画面またはTOP画面へ遷移する。
 * @param 卓人数
 */
function changeMenubook(people){
	bassingFlg = true;
	// 各種状態の初期化
	enOrderdataReset();
	// 卓番号の取得
	getTableNo();

	// 最新メニューの取得
	getMenuBookMaster(true);

	// // メニューブック切替ポップアップ表示
	// document.getElementById('s-dialog12').innerHTML = I_1015;
	// Data.data['scenes']['dialog12'].onEntry();

	// // TOP画面へ遷移
	// location.href = '#root/home';
}

/**
 * 各種状態初期化処理
 * 　※注文・言語設定情報を除く
 */
function enOrderdataReset(){
	bassingFlg = true;
	// 各種変数の初期化
	// 作成中ディッシュマップ
	create_dish_map = [];
	// リセット用ディッシュマップ
	reset_dish_map = [];
	// 初回導線有効フラグ
	firstDishMakeFlg = false;
	// 初回導線完了フラグ
	firstDishMakeEndFlg = false;
	// 初回導線ハンバーグ選択完了フラグ
	firstDishMakeHbEndFlg = false;
	// 初回導線トッピング選択完了フラグ
	firstDishMakeTpEndFlg = false;
	// 初回導線ライス・パスタ選択完了フラグ
	firstDishMakeRpEndFlg = false;
	// 初回導線ソース選択完了フラグ
	firstDishMakeScEndFlg = false;
	// 初回導線サラダ選択完了フラグ
	firstDishMakeSrEndFlg = false;
	// オーダーメイドディッシュ作成中フラグ
	dishEditingFlg = false;
	changeSideLnk();
	// オーダーメイドディッシュ確認画面初回遷移フラグ
	firstFinishFlg = false;
	// ハンバーグ合計数量
	hb_total = 0;
	// トッピング合計数量
	tp_total = 0;
	// ライス・パスタ合計数量
	rp_total = 0;
	// ソース合計数量
	sc_total = 0;
	// サラダ合計数量
	sr_total = 0;
	// オーダーメイドディッシュ一覧自動切換え禁止フラグ
	nextBanFlg= true;
	smogOnFlg = false;
	// マイディッシュ完成ボタン多重タップ防止フラグ
	niceChoiceFlg = false;
	// 限定メニュー
	limit_goods_map = [];
	// // ドリンクメニュー
	// drink_goods_map = [];
	// // サイドメニュー
	// side_goods_map = [];
	// // お子様メニュー
	// child_goods_map = [];
	// // テイクアウトディッシュメニュー
	// takeout_dish_goods_map = [];
	// // テイクアウトドリンクメニュー
	// takeout_drink_goods_map = [];
	// // テイクアウトサイドメニュー
	// takeout_side_goods_map = [];
	// // モーニングメニュー
	// morning_goods_map = [];
	// // モーニングメニュー(サラダ付)
	// morning_goods_map2 = [];
	// 商品マスタ 言語設定
	// goods_lng_map = new Map();
    create_order_map = {};   // 一時格納用map
    ordCrtTtlPrice = 0;  // 注文カート内の合計金額
	ordPostFlg = false; // 確定ボタン押下処理中フラグ
	// 品切商品情報
	result = null;
	// 品切商品
	soldOutGoods = null;
	soldOutGoods_map = null;
	OrdMadechangeLimitFlg = false;

	// スクリーンセーバーを終了する
	restartTimerBassing();

	// 開かれているダイアログを全て閉じる
	Data.data['scenes']['dialog'].onExit();
	Data.data['scenes']['dialog2'].onExit();
	Data.data['scenes']['dialog3'].onExit();
	Data.data['scenes']['dialog4'].onExit();
	Data.data['scenes']['dialog5'].onExit();
	Data.data['scenes']['dialog6'].onExit();
	Data.data['scenes']['dialog7'].onExit();
	Data.data['scenes']['dialog8'].onExit();
	Data.data['scenes']['dialog9'].onExit();
	Data.data['scenes']['dialog10'].onExit();
	Data.data['scenes']['dialog11'].onExit();
	Data.data['scenes']['dialog12'].onExit();
	Data.data['scenes']['dialog13'].onExit();
	Data.data['scenes']['dialog14'].onExit();
	Data.data['scenes']['dialog15'].onExit();
	Data.data['scenes']['dialog16'].onExit();
	Data.data['scenes']['dialog17'].onExit();
	Data.data['scenes']['dialog18'].onExit();
	Data.data['scenes']['dialog19'].onExit();
	Data.data['scenes']['dialog20'].onExit();
	Data.data['scenes']['dialog21'].onExit();
	Data.data['scenes']['dialog22'].onExit();
	Data.data['scenes']['dialog23'].onExit2();
	Data.data['scenes']['dialog24'].onExit();
	Data.data['scenes']['allergen'].onExit();
	Data.data['scenes']['allergenOther'].onExit();
	var sdPop = document.getElementById('cnt_pop_52007');
	if(sdPop != null){
		sdPop.style.display = 'none';
	}

	// アルコール確認フラグリセット
	alcolCheckFlg = false;

	// チェックイン中フラグリセット
	checkInFlg = false;

	// // サイド・フッターバーをリセット
	// $('.c-menu1').removeClass('is-hide');
	// $('.c-menu4').removeClass('is-hide');
}

var pushGoodsStatusChangeFlg = false;
var pushGoodsStatusChangeTest = '{"command": "ITEM_STATUS_NOTIFY","req_time": "2012/05/01 02:11:01","option": {"items": [{"item_id": "101","item_status": 2},{"item_id": "90000101","item_status": 2}]}}';
var pushGoodsStatusChangeTest2 = '{"command": "ITEM_STATUS_NOTIFY","req_time": "2012/05/01 02:11:01","option": {"items": [{"item_id": "101","item_status": 0},{"item_id": "90000101","item_status": 0}]}}';
var pushGoodsStatusChangeTest3 = '{"command": "ITEM_STATUS_NOTIFY","req_time": "2012/05/01 02:11:01","option": {"items": [{"item_id": "101","item_status": 6},{"item_id": "90000101","item_status": 6}]}}';
//pushGoodsStatusChange(pushGoodsStatusChangeTest);
//pushGoodsStatusChange(pushGoodsStatusChangeTest2);
//pushGoodsStatusChange(pushGoodsStatusChangeTest3);
/**
 * 商品ステータス通知処理
 * 　商品ステータスに変更があった場合、画面へ即時反映する。
 * 　※jsonサンプル '{"command": "ITEM_STATUS_NOTIFY","req_time": "2012/05/01 02:11:01","option": {"items": [{"item_id": "57","item_status": 2}]}}'
 * 　※商品ステータスパターン　0:販売許可、2:品切れ、3:販売時間外、5:メンバー専用、6:カミングスーン
 * 　※処理対象のステータスパターンは0、2、6のみ。
 * @param リクエスト(json)
 */
function pushGoodsStatusChange(pushJson){
	additionMessage("[Log       ]", "商品ステータス通知受信");
	// 配列化
	var push_map = JSON.parse(pushJson)["option"]["items"];
  
	// 大元のマップを更新
	for(line in push_map){
		for(baseline in tmp_m_goods_map){
			if(tmp_m_goods_map[baseline][push_map[line]["item_id"]] != null){
				if(push_map[line]["item_status"] == 0){
					// 販売許可の場合
					tmp_m_goods_map[baseline][push_map[line]["item_id"]]["bySalesStatusType"] = '1';
					tmp_m_goods_map[baseline][push_map[line]["item_id"]]["bySalesStopType"] = '1';
				}else if(push_map[line]["item_status"] == 2){
					// 品切れの場合
					tmp_m_goods_map[baseline][push_map[line]["item_id"]]["bySalesStatusType"] = '2';
					tmp_m_goods_map[baseline][push_map[line]["item_id"]]["bySalesStopType"] = '1';
				}else if(push_map[line]["item_status"] == 6){
					// 販売中止の場合
					tmp_m_goods_map[baseline][push_map[line]["item_id"]]["bySalesStopType"] = '2';
				}
			}
		}
	}
	// 画面反映用マップの最新化
	pushGoodsStatusChangeFlg = true;
	menuBookMstEdit();
	goodsMstEdit();
	pushGoodsStatusChangeFlg = false;

	// オーダーメイドディッシュベース選択画面の品切れ表示最新化
	orderMadeDishBaseSelectReset();
	for (var i=1;i<=6;i++) {
		orderMadeDishBaseSelectCheck(i);
	}

	// 画面のリアルタイム最新化
	// ごいっしょにいかがですか画面のチェック
	var clientRect = document.getElementById("s-dialog23-slid").getBoundingClientRect();
	// 画面の左端から、要素の左端までの距離
	var x = clientRect.left ;
	if(contains(location.href,"root/order/order-select/choice") && x < 330){
		// ごいっしょにいかがですか画面のスライドが未完了の場合、何もしない

		// 品切れ商品名連結
		var soldoutWgMsg = "";
		var soldoutWgMsgZero = "";
		// 一覧表示テーブル取得
		var detail = document.getElementById('withgoods_data');
		// 子要素から商品コード保持タグを取得
		var goodsCds = detail.getElementsByClassName("withgoods_cnt");
		// 選択合計
		var wgTotal = 0;
		for (var i=0;i<goodsCds.length;i++) {
			var result = null;
			// 商品コード取得
			var goodsCd = goodsCds[i].id.replace("withgoods_","");

			// 一覧を１行ずつチェック
			for(roop in push_map){
				if(push_map[roop]["item_id"] == goodsCd){
					// 更新対象
					result = push_map[roop];
					break;
				}
			}

			if(result != null){
				// 更新対象がある場合
				if(result["item_status"] == 0){
					// 販売許可の場合
					var delTgt = detail.getElementsByClassName('withgoodsAll_'+goodsCd);
					for (var j=0;j<delTgt.length;j++) {
						delTgt[j].style.display = "";
					}
					// 内部変数も販売許可設定
					for(var wg in with_goods_map){
						if(with_goods_map[wg]["nGoodsCode"] == goodsCd){
							with_goods_map[wg]["onoff"] = true;
							break;
						}
					}
				}else if(result["item_status"] == 2){
					// 品切れの場合
					var delTgt = detail.getElementsByClassName('withgoodsAll_'+goodsCd);
					for (var j=0;j<delTgt.length;j++) {
						delTgt[j].style.display = "none";
					}
					// 内部変数も品切れ設定
					for(var wg in with_goods_map){
						if(with_goods_map[wg]["nGoodsCode"] == goodsCd){
							with_goods_map[wg]["onoff"] = false;
							if(goodsCds[i].textContent != '0'){
								// 数量が選択されていた場合
								if(soldoutWgMsg == ""){
									// １個目の品切れ検知商品の場合
									soldoutWgMsg = soldoutWgMsg + m_goods_map[with_goods_map[wg]["nGoodsCode"]]["cGoodsName"];
								} else {
									soldoutWgMsg = soldoutWgMsg+ "、" + m_goods_map[with_goods_map[wg]["nGoodsCode"]]["cGoodsName"];
								}
								soldoutWgMsg = soldoutWgMsg.replace("<br />"," ").replace("<br />"," ").replace("<br />"," ").replace("<br />"," ").replace("<br />"," ");
							}
							if(soldoutWgMsgZero == ""){
								// １個目の品切れ検知商品の場合
								soldoutWgMsgZero = soldoutWgMsgZero + m_goods_map[with_goods_map[wg]["nGoodsCode"]]["cGoodsName"];
							} else {
								soldoutWgMsgZero = soldoutWgMsgZero+ "、" + m_goods_map[with_goods_map[wg]["nGoodsCode"]]["cGoodsName"];
							}
							soldoutWgMsgZero = soldoutWgMsgZero.replace("<br />"," ").replace("<br />"," ").replace("<br />"," ").replace("<br />"," ").replace("<br />"," ");
							break;
						}
					}
					withGoodsTotalCnt = withGoodsTotalCnt - parseInt(goodsCds[i].textContent);
					// 数量を0にセット
					goodsCds[i].textContent = 0;
				}
			}
			wgTotal = wgTotal+parseInt(goodsCds[i].textContent);
		}
		// 最終的な商品数に合わせて、表示領域幅を調整
		var wgCnt = 1;
		for(var wg in with_goods_map){
			if(wgCnt >= 6){
				// 商品数が６個以上は対応しないため、ループ終了
				continue;
			}
			if(with_goods_map[wg]["nMenuBookCode"] != menubook_cd){
				// 対象メニューブック以外の商品はスキップ
				continue;
			}
			if(m_goods_map[with_goods_map[wg]["nGoodsCode"]] == null){
				// 商品表示対象でない商品の場合、スキップ
				continue;
			}
			if(m_goods_map[with_goods_map[wg]["nGoodsCode"]]["bySalesStatusType"] == '2'){
				// 品切れ商品の場合、スキップ
				continue;
			}
			wgCnt++;
		}
		if(wgCnt == 1){
			// 商品なしの場合、機能無効化
			withGoodsDetailFlg = false;
			// 表示商品がなくなった場合、ポップアップ表示
			document.getElementById("s-dialog24").innerHTML = I_1016.replace("{0}",soldoutWgMsgZero);
			Data.data['scenes']['dialog24'].onEntry();
			// 閉じるボタンにスキップボタン押下処理を追加
			document.getElementById("s-dialog24-btn").setAttribute("onclick","touch(); Data.data['scenes']['dialog24'].onExit2();");
		} else {
			// 有効化
			withGoodsDetailFlg = true;
	
			// テーブル幅調整
			if((wgCnt -1) == 3){
				document.getElementById("withgoods_tbl").style.width = ((wgCnt -1) * 295 - 160) + "px";
			} else if((wgCnt -1) == 4){
				document.getElementById("withgoods_tbl").style.width = "960px";
			} else if((wgCnt -1) == 5){
				document.getElementById("withgoods_tbl").style.width = "1210px";
			} else {
				document.getElementById("withgoods_tbl").style.width = ((wgCnt -1) * 295) + "px";
			}

			if(soldoutWgMsg != ""){
				// 表示商品がへった場合、ポップアップ表示
				document.getElementById("s-dialog24").innerHTML = I_1016.replace("{0}",soldoutWgMsg);
				Data.data['scenes']['dialog24'].onEntry();
				// 閉じるボタンにスキップボタン押下処理を追加
				document.getElementById("s-dialog24-btn").setAttribute("onclick","touch(); Data.data['scenes']['dialog24'].onExit();");
			}
		}
		if(wgTotal == 0){
			// 数量合計が0となった場合、スキップボタン表示
			document.getElementById("add_btn").style.display = 'none';
			document.getElementById("skip_btn").style.display = 'block';
		}
	} else {
		if(!(contains(location.href,"root/order/order-select/choice") && niceChoiceFlg)){
			// 完成画面へ遷移してしまっている場合は、何もしない
			withGoodsDetail();
		}
	}
	// 汎用メニュー画面のチェック
	if(contains(location.href,"root/kids")){
		// 問答無用で画面リフレッシュ
		createGeneralDetail(currentNDispMenuType);
	}

	// ドリンクメニュー画面のチェック
	if(contains(location.href,"root/drink") && !(contains(location.href,"root/drinkTopTakeOut")) && !(contains(location.href,"root/drinkTopEatIn"))){
		// ドリンクメニュー画面の一覧を取得
		var detail = document.getElementsByClassName('p-drink-btn');
		for (var i=0;i<detail.length;i++) {
			var result = null;
			// 一覧を１行ずつチェック
			for(roop in push_map){
				if(push_map[roop]["item_id"] == detail[i].getAttribute("itemid")){
					// 更新対象
					result = push_map[roop];
					break;
				}
			}
			if(result != null){
				// 更新対象がある場合
				if(result["item_status"] == 0){
					// 販売許可の場合
					detail[i].classList.remove(MSG_CSS_LANG);
					detail[i].classList.remove('off');
				}else if(result["item_status"] == 2 || result["item_status"] == 6){
					// 品切れの場合
					detail[i].classList.add('off');
					detail[i].classList.add(MSG_CSS_LANG);
					if(detail[i].classList.contains('on')){
						// 更新対象のドリンク個数が選択中だった場合、ポップアップで通知する。
						document.getElementById('dialog13').href = "#root/drink";
						document.getElementById('s-dialog13').innerHTML = I_1002.replace('{0}',m_goods_map[detail[i].getAttribute("itemid")]["cGoodsName"]);
						Data.data['scenes']['dialog13'].onEntry();
						levelDispGoodsDetail(currentDispId);
					}
				}
			}
		}
	}
	
	// if(contains(location.href,"root/drinkTopEatIn")){
	// 	// ソフトドリンクの反映
	// 	createDrinkDetail(4, 0);
	// }
	// if(contains(location.href,"root/drinkTopTakeOut")){
	// 	// ソフトドリンクの反映
	// 	createDrinkDetail(6, 0);
	// }
	// if(contains(location.href,"root/top") && menubook_cd == '2'){
	// 	// ソフトドリンクの反映
	// 	createDrinkDetail(4, 0);
	// }

	// オーダーメイドディッシュ画面のチェック
	if(contains(location.href,"root/order/order-select") && !contains(location.href,"root/order/order-select/choice")){

		// 選択を取り下げた商品名全量
		var deleteGoodsNames = '';
		// ベース選択画面遷移フラグ
		var retryFlg = false;
		// ベース情報を退避
		var tmp_base_map = jQuery.extend(true, {}, reset_dish_map);

		// 商品種別毎にチェック
		for(tmpType in mappingList){
			var type = tmpType;

			// 一覧を取得
			var detail = document.getElementById(type+'List').getElementsByTagName('li');
			for (var i=0;i<detail.length;i++) {
				var result = null;
				for(roop in push_map){
					if(push_map[roop]["item_id"] == detail[i].getAttribute("id").replace("ordermade_id_","")){
						// 更新対象
						result = push_map[roop];
						break;
					}
				}
				type = tmpType;
				if(result != null && (!firstDishMakeFlg && addHpDispTpFlg) && create_dish_map[type][result["item_id"]] == null){
					// トッピング一覧にハンバーグが表示されていた場合
					type = "hb";
				} else {
					type = tmpType;
				}
				if(result != null){
					// 更新対象がある場合
					// 品切れ表示タグ取得
					var targetTag = detail[i].getElementsByClassName('off');
					if(result["item_status"] == 0){
						// 販売許可の場合
						detail[i].classList.remove('off');
						detail[i].classList.remove(MSG_CSS_LANG);
						if(targetTag.length != 0){
							detail[i].removeChild(targetTag[0]);
						}
						// 画面表示用詳細配列を更新
						create_dish_map[type][result["item_id"]]["bySalesStatusType"] = 1;
					}else if(result["item_status"] == 2){
						// 品切れの場合
						if(targetTag.length == 0){
							// 対象商品に品切れ表示タグがセットされていない場合
							// 品切れ表示タグ追加
							detail[i].classList.add('off');
							detail[i].classList.add(MSG_CSS_LANG);

							var soldout_span = document.createElement('span');
							if(type == "hb" || type == "tp"){
								soldout_span.setAttribute('style','position:absolute;width:100%;height:100%;top:0px;left:0px;overflow:hidden;');
							}else{
								soldout_span.setAttribute('style','position:absolute;width:100%;height:97%;top:1px;left:4px;overflow:hidden;');
							}
							soldout_span.classList.add("off");
							soldout_span.classList.add(MSG_CSS_LANG);
							detail[i].appendChild(soldout_span);
							// 画面表示用詳細配列を更新
							create_dish_map[type][result["item_id"]]["bySalesStatusType"] = 2;
							if(create_dish_map[type][result["item_id"]]["quantity"] != 0){
								// 更新対象の商品が選択中だった場合
								// 数量を0に更新
								create_dish_map[type][result["item_id"]]["quantity"] = 0;
								if(create_dish_map[type][result["item_id"]]["lock"] == "on"){
									// ベーストッピングの場合、ベース選択やり直し
									retryFlg = true;
								}
								// リセット用配列の数量を0に更新
								reset_dish_map[type][result["item_id"]]["quantity"] = 0;
								// 商品画像を非表示
								document.getElementById('ordermade_img_'+result["item_id"]).className = 'ordermade_goods';
								// if(type == "hb" || type == "rp"|| type == "sr" || (type == "sc" && OrdMadechangeLimitFlg)){
								if(type == "hb" || type == "rp"|| type == "sr" || type == "sc"){
									// 必須選択項目の場合、別商品を選択状態とする
									var otherFindFlg = false;
									for(tbLine in tmp_base_map[type]){
										if(tmp_base_map[type][tbLine]["nGoodsCode"] == "15011"){continue;}
										if(tmp_base_map[type][tbLine]["quantity"] == 1 && create_dish_map[type][tbLine]["bySalesStatusType"] == 1
										&& !(document.getElementById('ordermade_id_'+tmp_base_map[type][tbLine]["nGoodsCode"]).classList.contains('ng-pasta'))
										&& !(document.getElementById('ordermade_id_'+tmp_base_map[type][tbLine]["nGoodsCode"]).classList.contains('ng-sauce'))){
											// ベースの商品が選択可能な場合、選択
											create_dish_map[type][tbLine]["quantity"] = 1;
											reset_dish_map[type][tbLine]["quantity"] = 1;
											// 選択した商品の画像を表示
											smogOnFlg = true;
											goodsSelectAnimation(type,tbLine);
											otherFindFlg = true;
											break;
										}
									}
									if(!(otherFindFlg)){
										// ベースの商品が選択不可の場合、上から順に選定
										for(cdLine in create_dish_map[type]){
											if(tmp_base_map[type][tbLine]["nGoodsCode"] == "15011"){continue;}
											if(create_dish_map[type][cdLine]["bySalesStatusType"] == 1
											&& !(document.getElementById('ordermade_id_'+create_dish_map[type][cdLine]["nGoodsCode"]).classList.contains('ng-pasta'))
											&& !(document.getElementById('ordermade_id_'+create_dish_map[type][cdLine]["nGoodsCode"]).classList.contains('ng-sauce'))){
												// ベースの商品が選択可能な場合、選択
												create_dish_map[type][cdLine]["quantity"] = 1;
												reset_dish_map[type][cdLine]["quantity"] = 1;
												smogOnFlg = true;
												goodsSelectAnimation(type,cdLine);
												break;
											}
										}
									}

								}
								// 一覧をリフレッシュ
								if(type == "hb" || type == "tp"){
									createorderMadeList(type,result["item_id"]);
								}else{
									createorderMadeList(type,null);
								}
								// 取り下げ商品一覧追加
								deleteGoodsNames += '"'+create_dish_map[type][result["item_id"]]["cGoodsName"]+'"、';
							}
						}
					}
				}
			}
			// if(type == "hb" || type == "rp"|| type == "sr" || (type == "sc" && OrdMadechangeLimitFlg)){
			if(type == "rp"|| type == "sr" || type == "sc"){
				// オーダーメイドディッシュ作成が継続できる状態かチェック
				var detailCnt = 0;
				// 選べる商品数を集計
				for(detailLine in create_dish_map[type]){
					if(create_dish_map[type][detailLine]["bySalesStatusType"] == 1
					&& !(document.getElementById('ordermade_id_'+create_dish_map[type][detailLine]["nGoodsCode"]).classList.contains('ng-pasta'))
					&& !(document.getElementById('ordermade_id_'+create_dish_map[type][detailLine]["nGoodsCode"]).classList.contains('ng-sauce'))){
						detailCnt++;
					}
				}
				if(detailCnt == 0){
					// 一覧に選べるものがない場合
					retryFlg = true;
				}
			}
		}
		deleteGoodsNames = deleteGoodsNames.substr( 0, deleteGoodsNames.length - 1);

		// 内部変数へ品切れを反映
		for(line in push_map){
			for(baseline in tmp_m_goods_map){
				if(tmp_m_goods_map[baseline][push_map[line]["item_id"]] != null){
					if(push_map[line]["item_status"] == 0){
						// 販売許可の場合
						for(var ctype in create_dish_map){
							if(create_dish_map[ctype][push_map[line]["item_id"]] != null){
								create_dish_map[ctype][push_map[line]["item_id"]]["bySalesStatusType"] = "1";
								reset_dish_map[ctype][push_map[line]["item_id"]]["bySalesStatusType"] = "1";
								// break;
							}
						}
					}else if(push_map[line]["item_status"] == 2){
						// 品切れの場合
						for(var ctype in create_dish_map){
							if(create_dish_map[ctype][push_map[line]["item_id"]] != null){
								create_dish_map[ctype][push_map[line]["item_id"]]["bySalesStatusType"] = "2";
								create_dish_map[ctype][push_map[line]["item_id"]]["quantity"] = 0;
								reset_dish_map[ctype][push_map[line]["item_id"]]["bySalesStatusType"] = "2";
								reset_dish_map[ctype][push_map[line]["item_id"]]["quantity"] = 0;
								// break;
							}
						}
					}
				}
			}
		}
		if(retryFlg){
			if(ordMadeSelectBaseCode >= 7){
				// 品切れの反映
				createGeneralDetail(currentNDispMenuType);

				// ベース選択画面へ遷移
				location.href = '#root/kids';
				// フッター・サイドリンクのポップアップクッションを無効化
				dishEditingFlg = false;
				changeSideLnk();
				// ポップアップを表示
				document.getElementById('dialog13').href = "#root/kids";
				document.getElementById('s-dialog13').innerHTML = I_1017.replace('{0}',document.getElementById('MSG_ORDMADE_13').textContent);
				Data.data['scenes']['dialog13'].onEntry();
			}else{
				// ベース選択画面へ遷移
				location.href = '#root/ordermade';
				// フッター・サイドリンクのポップアップクッションを無効化
				dishEditingFlg = false;
				changeSideLnk();
				// ポップアップを表示
				document.getElementById('dialog13').href = "#root/ordermade";
				document.getElementById('s-dialog13').innerHTML = I_1017.replace('{0}',document.getElementById('MSG_ORDMADE_13').textContent);
				Data.data['scenes']['dialog13'].onEntry();
			}
		}else if(deleteGoodsNames != ''){
			// 選択を取り下げた商品がある場合
			// ポップアップを表示
			document.getElementById('dialog13').href = "#root/order/order-select";
			document.getElementById('s-dialog13').innerHTML = I_1016.replace('{0}',deleteGoodsNames);
			Data.data['scenes']['dialog13'].onEntry();
		}
	}

	// サブメニューポップアップ表示中の場合
	var submenuMsgStr = "";
	if(!document.getElementById("levelAllPop").classList.contains("is-hide")){

		// ベースの品切れチェック
		var levelPopCloseFlg = false;
		for(line in push_map){
			if(push_map[line]["item_id"] == tmpLevelPopGoodsCd){
				// プッシュ通知に商品情報が見つかった場合
				if(push_map[line]["item_status"] == "0"){
					// 通常販売の場合
				} else if(push_map[line]["item_status"] == "2"){
					// 品切れの場合
					// 解除メッセージ用商品名リストに商品名追加
					submenuMsgStr += all_m_goods_map[tmpLevelPopGoodsCd]["cGoodsName"]+"、";
					// ポップアップを閉じる
					document.getElementById("levelAllPop").classList.add("is-hide");
					levelPopCloseFlg = true;
				}
			}
		}
		if(!levelPopCloseFlg){
			// ポップアップ内の品切れチェック
			var pops = document.getElementsByClassName("p-general-pop");
			for(var i = 0; i < pops.length; i++){
				if(!pops[i].classList.contains("is-hide")){
					// 表示中ポップアップの場合
					if(pops[i].getAttribute("type") == 1){
						// ベース選択の場合
						// 処理なし

					} else if(pops[i].getAttribute("type") == 2 || pops[i].getAttribute("type") == 3){
						// サブ商品複数選択の場合
						// 一覧取得
						var details = pops[i].getElementsByClassName("p-general2-pop-toppings");
						for(var j = 0; j < details.length; j++){
							// 商品コード
							var lineGoodsCd = details[j].getAttribute("selectcd");
							for(line in push_map){
								if(push_map[line]["item_id"] == lineGoodsCd && !details[j].classList.contains("general-sub-none")){
									// プッシュ通知に商品情報が見つかった場合
									if(push_map[line]["item_status"] == "0"){
										// 通常販売の場合
										details[j].classList.remove('off');
										details[j].classList.remove(MSG_CSS_LANG);
									} else if(push_map[line]["item_status"] == "2"){
										// 品切れの場合
										if(details[j].classList.contains("general-sub-selected")){
											// 選択中だった場合
											// 解除メッセージ用商品名リストに商品名追加
											submenuMsgStr += all_m_goods_map[lineGoodsCd]["cGoodsName"]+"、";
											// 選択解除
											details[j].classList.remove("general-sub-selected");

											if(pops[i].getAttribute("type") == 3){
												// サブ商品一択選択の場合、なし選択に切替
												var noneLine = pops[i].getElementsByClassName("general-sub-none")[0];
												noneLine.classList.add("general-sub-selected");
											}
										}
										details[j].classList.add('off');
										details[j].classList.add(MSG_CSS_LANG);
									}
								}
							}
						}
						
					} else if(pops[i].getAttribute("type") == 4){
						// サブ商品数量選択の場合
						// 数量表示タグ取得
						var cntTag = pops[i].getElementsByClassName("level_type_4")[0];
						// 商品コード
						var lineGoodsCd = cntTag.getAttribute("subcd");
						for(line in push_map){
							if(push_map[line]["item_id"] == lineGoodsCd){
								// プッシュ通知に商品情報が見つかった場合
								if(push_map[line]["item_status"] == "0"){
									// 通常販売の場合
									var parent =  cntTag.parentNode.parentNode;
									parent.classList.remove('off');
									parent.classList.remove(MSG_CSS_LANG);

								} else if(push_map[line]["item_status"] == "2"){
									// 品切れの場合
									var parent =  cntTag.parentNode.parentNode;
									parent.classList.add('off');
									parent.classList.add(MSG_CSS_LANG);
									// 数量
									var cnt = parseInt(cntTag.textContent);
									if(cnt != 0){
										// 選択中だった場合
										// 解除メッセージ用商品名リストに商品名追加
										submenuMsgStr += all_m_goods_map[lineGoodsCd]["cGoodsName"]+"、";
										// 数量を0に変更
										var hbMap = all_m_goods_map[lineGoodsCd];
										if(hbMap != null && hbMap["nGoodsCode"] == "82001" && (hbMap["cGoodsName"] == '追加ハンバーグ' || hbMap["cGoodsName"] == 'Additional Hamburg-steak Patty')){
											// ディッシャーズの追加ハンバーグの場合のみ1をセット
											cntTag.textContent = 1;
										} else {
											cntTag.textContent = 0;
										}
									}

								}
							}
						}
						
					} else if(pops[i].getAttribute("type") == 999){
						// ベース数量選択の場合
						// 処理なし
					}
				}
			}
		}
		// 解除ポップアップ表示
		if(submenuMsgStr != ""){
			submenuMsgStr = submenuMsgStr.substr( 0, submenuMsgStr.length - 1);
			document.getElementById('dialog13').href = "javascript:void(0)";
			document.getElementById('s-dialog13').innerHTML = I_1016.replace('{0}',submenuMsgStr);
			Data.data['scenes']['dialog13'].onEntry();
		}
	}

	// 階層画面商品ボタンの反映
	var levelGoods = document.getElementsByClassName("level_goods");
	for(var i=0;i<levelGoods.length;i++){
		var levelGoodsCd = levelGoods[i].getAttribute("goodsCd");

		for(line in push_map){
			// オーダーメイドディッシュ化チェック
			var ordmadeGoodsFlg = false;
			var tgtBasedishcomboKey = "";
			for(var mbm in m_basedishcombo_map){
				if(m_basedishcombo_map[mbm]["nGoodsCode"] == levelGoodsCd){
					additionMessage("[OrderMade?]", levelGoodsCd + ": オーダーメイド商品");
					ordmadeGoodsFlg = true;
					tgtBasedishcomboKey = mbm;
					break;
				}
			}
			if(push_map[line]["item_id"] == levelGoodsCd
			|| (ordmadeGoodsFlg && (push_map[line]["item_id"] == m_basedishcombo_map[tgtBasedishcomboKey]["nHamburgGoodsCode"]
				|| push_map[line]["item_id"] == m_basedishcombo_map[tgtBasedishcomboKey]["nToppingGoodsCode"]
				|| push_map[line]["item_id"] == m_basedishcombo_map[tgtBasedishcomboKey]["nSourceGoodsCode"]
				|| push_map[line]["item_id"] == m_basedishcombo_map[tgtBasedishcomboKey]["nRiceGoodsCode"]
				|| push_map[line]["item_id"] == m_basedishcombo_map[tgtBasedishcomboKey]["nSaladGoodsCode"]))){
				// プッシュ通知に商品情報が見つかった場合
				if(m_goods_map[levelGoodsCd] == null || m_goods_map[levelGoodsCd]["bySalesStatusType"] == '2'){
					// ベース商品の情報がそもそもない場合
					ordmadeGoodsFlg = false;
					additionMessage("[OrderMade?]", levelGoodsCd + ": オーダーメイド商品:False");
				}
				if(ordmadeGoodsFlg){
					// オーダーメイドディッシュ化された商品の場合
					var ordCd = tgtBasedishcomboKey;
					// オーダーメイド設定ありの場合
					// ハンバーグの品切れチェック
					var hbSoldOutFlg = false;
					if(m_basedishcombo_map[ordCd]["nHamburgGoodsCode"] != null){
						if(m_goods_map[m_basedishcombo_map[ordCd]["nHamburgGoodsCode"]] == null || 
							m_goods_map[m_basedishcombo_map[ordCd]["nHamburgGoodsCode"]]["bySalesStatusType"] == '2'){
							hbSoldOutFlg = true;
						}
					}
					// トッピングの品切れチェック
					var tpSoldOutFlg = false;
					if(m_basedishcombo_map[ordCd]["nToppingGoodsCode"] != null){
						if(create_dish_map['tp'][m_basedishcombo_map[dishType]['nToppingGoodsCode']] == 15028) {
							if(m_goods_map[m_basedishcombo_map[ordCd][15001]] == null || 
								m_goods_map[m_basedishcombo_map[ordCd][15001]]["bySalesStatusType"] == '2'){
								tpSoldOutFlg = true;
							}
							if(m_goods_map[m_basedishcombo_map[ordCd][15006]] == null || 
								m_goods_map[m_basedishcombo_map[ordCd][15006]]["bySalesStatusType"] == '2'){
								tpSoldOutFlg = true;
							}	
						} else {
							if(m_goods_map[m_basedishcombo_map[ordCd]["nToppingGoodsCode"]] == null || 
								m_goods_map[m_basedishcombo_map[ordCd]["nToppingGoodsCode"]]["bySalesStatusType"] == '2'){
								tpSoldOutFlg = true;
							}
						}
					}
					// ソースの品切れチェック
					var scSoldOutFlg = false;
					if(m_basedishcombo_map[ordCd]["nSourceGoodsCode"] != null){
						if(m_goods_map[m_basedishcombo_map[ordCd]["nSourceGoodsCode"]] == null || 
							m_goods_map[m_basedishcombo_map[ordCd]["nSourceGoodsCode"]]["bySalesStatusType"] == '2'){
							scSoldOutFlg = true;
						}
					}
					// ライスの品切れチェック
					var rpSoldOutFlg = false;
					if(m_basedishcombo_map[ordCd]["nRiceGoodsCode"] != null){
						if(m_goods_map[m_basedishcombo_map[ordCd]["nRiceGoodsCode"]] == null || 
							m_goods_map[m_basedishcombo_map[ordCd]["nRiceGoodsCode"]]["bySalesStatusType"] == '2'){
							rpSoldOutFlg = true;
						}
					}
					// サラダの品切れチェック
					var srSoldOutFlg = false;
					if(m_basedishcombo_map[ordCd]["nSaladGoodsCode"] != null){
						if(m_goods_map[m_basedishcombo_map[ordCd]["nSaladGoodsCode"]] == null || 
							m_goods_map[m_basedishcombo_map[ordCd]["nSaladGoodsCode"]]["bySalesStatusType"] == '2'){
							rpSoldOutFlg = true;
						}
					}
					// サブ商品品切れチェック結果
					var ordSoldOutFlg = (hbSoldOutFlg || tpSoldOutFlg || scSoldOutFlg || rpSoldOutFlg || rpSoldOutFlg);
					// 品切れチェック
					if(ordSoldOutFlg){
						var parent =  levelGoods[i];
						parent.classList.add("off");
					} else {
						var parent =  levelGoods[i];
						parent.classList.remove("off");
						parent.classList.remove("comsoon");
						parent.classList.remove(MSG_CSS_LANG);
					}
				} else {
					if(push_map[line]["item_status"] == "0"){
						// 通常販売の場合
						var parent =  levelGoods[i];
						parent.classList.remove('off');
						parent.classList.remove('comsoon');
						parent.classList.remove(MSG_CSS_LANG);
	
					} else if(push_map[line]["item_status"] == "2"){
						// 品切れの場合
						var parent =  levelGoods[i];
						parent.classList.add('off');
						parent.classList.remove('comsoon');
						parent.classList.add(MSG_CSS_LANG);
					} else if(push_map[line]["item_status"] == "6"){
						// 販売中止
						var parent =  levelGoods[i];
						parent.classList.add('off');
						parent.classList.add('comsoon');
						parent.classList.add(MSG_CSS_LANG);
					}
				}
			}
		}
	}

	// 階層画面遷移ボタンの反映
	var levelMove = document.getElementsByClassName("level_move");
	for(var i=0;i<levelMove.length;i++){
		// COMING SOON表示条件商品リスト
		var levelGoodsCd = levelMove[i].getAttribute("goodsCd");
		// COMING SOON表示条件メニュー区分リスト
		var levelGoodsType = levelMove[i].getAttribute("goodsType");

		// 処理不要な場合はスキップ
		if(levelGoodsCd == "" && levelGoodsType == ""){continue;}

		for(line in push_map){
			if(push_map[line]["item_id"] != null &&
				contains(levelGoodsCd,push_map[line]["item_id"])
					|| (m_goods_map[push_map[line]["item_id"]] != null
					&& contains(levelGoodsType,m_goods_map[push_map[line]["item_id"]]["byMenuType"]))){
				// 商品リストに商品コードが含まれている場合
				// もしくはメニュー区分リストにメニュー区分が含まれている場合
				// 通常表示・COMING SOON表示を再判定
				var comsoonFlg = true;
				if(levelGoodsType != ""){
					// 商品区分のチェック
					var comsoonTypeMap = levelGoodsType.split(',');
					for(var tp in comsoonTypeMap){
						if(allGoodsMenutypes[comsoonTypeMap[tp]] != null){
							// 該当する商品区分の商品が１つでもあったら、非準備中
							comsoonFlg = false;
						}
					}
				}
				if(levelGoodsCd != ""){
					// 商品コードのチェック
					var comsoonGoodsMap = levelGoodsCd.split(',');
					for(var tp in comsoonGoodsMap){
						if(m_goods_map[comsoonGoodsMap[tp]] != null && m_goods_map[comsoonGoodsMap[tp]]["bySalesStatusType"] != "2" && m_goods_map[comsoonGoodsMap[tp]]["byGoodsDataType"] != "3"){
							// 商品情報がありかつ、販売可能な商品が１つでもあったら、非準備中
							comsoonFlg = false;
						}
					}
				}
				if(comsoonFlg){
					// 準備中アイコン有効化
					levelMove[i].classList.add("comsoon");
					levelMove[i].classList.add("off");
				} else {
					levelMove[i].classList.remove("comsoon");
					levelMove[i].classList.remove("off");
				}
			
			}





			if(push_map[line]["item_id"] == levelGoodsCd){
				// プッシュ通知に商品情報が見つかった場合
				if(push_map[line]["item_status"] == "0"){
					// 通常販売の場合
					var parent =  levelMove[i];
					parent.classList.remove('off');
					parent.classList.remove('comsoon');
					parent.classList.remove(MSG_CSS_LANG);

				}  else if(push_map[line]["item_status"] == "6"){
					// 販売中止
					var parent =  levelMove[i];
					parent.classList.add('off');
					parent.classList.add('comsoon');
					parent.classList.add(MSG_CSS_LANG);
				}
			}
		}
	}
}

// テスト用json
// var req_json = '{"command": "TABLE_PEOPLE_NOTIFY", "req_time": "2020/03/06 14:00:00", "option": {"table_people": "6"}}';

/**
 * 卓人数通知処理
 * 　PUSH通知により最新の卓人数を受け取り、
 * 　卓人数情報を更新する。
 * 　※jsonサンプル '{"command": "TABLE_PEOPLE_NOTIFY", "req_time": "2020/03/06 14:00:00", "option": {"table_people": "6"}}'
 * @param リクエスト(json)
 * @returns response_json：JSON形式のレスポンス情報
 * 　　　　　　　　　　　{
 * 　　　　　　　　　　　　status：処理ステータス
 * 　　　　　　　　　　　　res_time：実行日時(yyyy/MM/dd HH:mm:ss)
 * 　　　　　　　　　　　　description：処理メッセージ
 * 　　　　　　　　　　　}
 */
// function pushTablePeopleNotify(request_json) {
// 	var response_json = {};
// 	// 配列化
// 	var request_map = JSON.parse(request_json);
// 	if (request_map['command'] == 'TABLE_PEOPLE_NOTIFY') {
// 		// 機能が卓人数通知であれば処理実行
// 		if (request_map['option']['table_people'] != null
// 			|| request_map['option']['table_people'] != '') {
// 			// 卓人数変更
// 			person = request_map['option']['table_people'];

// 			// 結果返却
// 			response_json['status'] = '0';
// 			response_json['res_time'] = request_map['req_time'];
// 			response_json['description'] = '正常終了';
// 			return response_json;
// 		} else {
// 			// 卓人数が未設定の場合、エラーを返却する
// 			response_json['status'] = '-1002';
// 			response_json['res_time'] = request_map['req_time'];
// 			response_json['description'] = 'パラメーターエラー';
// 			return response_json;
// 		}
// 	} else {
// 		// 機能が卓人数通知以外の場合、エラーを返却する
// 		response_json['status'] = '-1002';
// 		response_json['res_time'] = request_map['req_time'];
// 		response_json['description'] = 'パラメーターエラー';
// 		return response_json;
// 	}	
// }

// setTimeout(function () {
// 	pushReset();
//   }, 55000);
//   setTimeout(function () {
// 	pushReset();
//   }, 65000);

function getOrdMadePic(){
      html2canvas(document.getElementById('tgtimg'),{
        onrendered: function(canvas){
		  // オーダーメイドディッシュ画像を取得
          var imgData = canvas.toDataURL();
		  // 注文確定前データに格納
		  var tmpOrd = null;
		  for (var ord in bf_order_map) {
			  tmpOrd = ord;
		  }
		  bf_order_map[tmpOrd]['img'] = imgData;
        }
      });
}

/**
 * バッシング完了隠しボタン処理
 */
var hideBassingFlg = false;
function hideBassingBtn(){
	hideBassingFlg = true;
	setTimeout(function () {
		if(!(hideBassingFlg)){return;}
		// バッシング完了処理
		bassingEndPost();
		hideBassingFlg = false;
      }, 500);
}

/**
 * バッシング完了隠しボタンキャンセル処理
 */
function hideBassingCansel(){
	hideBassingFlg = false;
}

/**
 * バッシング完了処理
 * @param 卓人数
 */
function bassingEndPost() {
	document.getElementById('loading').removeAttribute("hidden");

	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// 通信エラーポップアップ出力処理
			document.getElementById('loading').setAttribute("hidden","hidden");
		}
	},POST_TIMEOUT_TIME);

	// チェックインPOST送信
	var response_json = null;
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_ROOT_FOLDER + '/tto/compass_status_change.php',
			data:{
				android_id:androidID,
				term_class:"RTIS1",
				request_id:getCurrentTime(),
				kind:2
				},
			success:function(data){
				// POST送信終了
				response_json = data;
				data = null;
			}
		})
	).done(function() {
		if(!(timeoutFlg)){
			timeoutFlg = true;
			if(response_json["status"] == 0){
				// バッシング完了後処理
				// 特になし
				document.getElementById('loading').setAttribute("hidden","hidden");
			}else{
				// 通信エラーポップアップ出力処理
				// 特になし
				document.getElementById('loading').setAttribute("hidden","hidden");
			}
		}else{
			timeoutFlg = true;
		}
		response_json = null;
	})
}

/**
 * 店員呼び出し確認ポップアップ処理
 */
function callClerkCheck() {
	if(guiFlg == GUI_CODE){return;}
	document.getElementById('s-dialog21').innerHTML = I_1027;
	document.getElementById('callCheck_ok').innerHTML = MSG_COMMON_2;
	document.getElementById('callCheck_cancel').innerHTML = MSG_COMMON_3;
	Data.data['scenes']['dialog21'].onEntry();
}

/**
 * 店員呼び出しボタン押下処理
 */
function callClerk() {
	// 呼び出し中ポップアップ表示
	document.getElementById('s-dialog4').innerHTML = I_1009;
	Data.data['scenes']['dialog4'].onEntry();
	var response_json = null;

	// var data_item_id = {0:"81002"};
	var data_item_id = {0:"80000001"};
	var data_item_count = {0:1};
	var data_item_payment_type = {0:"0"};
	var data_sub_item_id = {};
	var data_sub_count = {};

	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg) && !(document.getElementById('dialog4').classList.contains('is-hide'))){
			timeoutFlg = true;

			Data.data['scenes']['dialog4'].onExit();
			document.getElementById('s-dialog5').innerHTML = E_9004;
			Data.data['scenes']['dialog5'].onEntry();
		}
	},POST_TIMEOUT_TIME);

	// 店員呼び出しPOST送信
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_ROOT_FOLDER + '/tto/compass_order.php',
			data:{android_id:androidID,
				term_class:"RTIS1",
				request_id:getCurrentTime(),
				item_id:data_item_id,
				item_count:data_item_count,
                item_payment_type:data_item_payment_type,
                sub_item_id:data_sub_item_id,
                sub_count:data_sub_count
				},
			success:function(data){
				// POST送信終了
        response_json = data;
			}
		})
	).done(function() {
		if(!(timeoutFlg)){
			timeoutFlg = true;
			if(response_json == null || response_json["status"] != 0){
				// エラーポップ
				bassingFlg = false;
				setTimeout(function () {
					if(bassingFlg){return;} // 途中でバッシング処理が実行された場合、何もしない
					Data.data['scenes']['dialog4'].onExit();
					document.getElementById('s-dialog5').innerHTML = E_9004;
					Data.data['scenes']['dialog5'].onEntry();
				}, 1000);
			}
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * 飲酒承諾処理
 * @param 遷移先(1:アルコールメニュー画面、2:画面遷移なし)
 * @param 1:イートイン 2:テイクアウト
 */
function chkAlcohol(param,type) {
	if (param == 1) {
		Data.data['scenes']['dialog17'].onExit();
		document.getElementById('dialog17').setAttribute('href','#root/kids');
		if(type == '1'){
			createDrinkDetail(4, 3);
		}else{
			createDrinkDetail(6, 3);
		}
	} else if (param == 2) {
		Data.data['scenes']['dialog17'].onExit();
		if(type == '1'){
			document.getElementById('dialog17').setAttribute('href','#root/drinkTopEatIn');
		}else{
			document.getElementById('dialog17').setAttribute('href','#root/drinkTopTakeOut');
		}
	}
}

/**
 * 人数ボタン処理
 * @param 人数
 */
function selectPepleBtn(people) {
	document.getElementById("selectPeople").textContent = people;
}

/**
 * メニューブック レイアウト切替処理
 * @param メニューブックコード
 */
function changeMenubookLayout(mbCd) {
	if(mbCd == '1'){
		// 通常メニューの場合
		// メニューボタン
		// document.getElementById('s-top-default').classList.remove('is-hide');
		// document.getElementById('s-top-morning').classList.add('is-hide');

		// サイドリンク
		// document.getElementById('side-default').hidden = '';
		// document.getElementById('side-morning').hidden = 'hidden';

		// // TOP画面ボタン
		// document.getElementById('s-home-default').classList.remove('is-hide');
		// document.getElementById('s-home-morning').classList.add('is-hide');
	}else if(mbCd == '2'){
		// モーニングメニューの場合
		// メニューボタン
		// document.getElementById('s-top-default').classList.add('is-hide');
		// document.getElementById('s-top-morning').classList.remove('is-hide');

		// サイドリンク
		// document.getElementById('side-default').hidden = 'hidden';
		// document.getElementById('side-morning').hidden = '';

		// // TOP画面ボタン
		// document.getElementById('s-home-default').classList.add('is-hide');
		// document.getElementById('s-home-morning').classList.remove('is-hide');
	}
}

/**
 * ハンバーグ用レジ袋加算処理
 */
function regBagHbPlusBtn() {
	// 枚数表示タグ取得
	var btnTxt = document.getElementById("s-dialog22_8").textContent;
	// 「枚」を除去
	var num = btnTxt.replace(MSG_CART_28,'');
	// 数値取得
	num = parseInt(num);
	if(num < quantityLimit){
		num++;
		outOparationLog("レジ袋確認ポップアップ-ハンバーグ用-数量変更,増減:増,変更後数量:"+num);
	}
	// 枚数をセット
	document.getElementById("s-dialog22_8").textContent = num+MSG_CART_28;
	// 決定ボタンのラベル文言を「決定」にセット
	document.getElementById('regBag_decision').textContent = MSG_CART_31;
}

/**
 * ハンバーグ用レジ袋減算処理
 */
function regBagHbMinusBtn() {
	// 枚数表示タグ取得
	var btnTxt = document.getElementById("s-dialog22_8").textContent;
	// 「枚」を除去
	var num = btnTxt.replace(MSG_CART_28,'');
	// 数値取得
	num = parseInt(num);
	if(num > 0){
		num--;
		outOparationLog("レジ袋確認ポップアップ-ハンバーグ用-数量変更,増減:減,変更後数量:"+num);
	}

	if(num == 0){
		// 数量0になった場合、両種類の袋の数量が0なら
		// 決定ボタンのラベル文言を「不要」にセット
		var btnTxt2 = document.getElementById("s-dialog22_9").textContent;
		// 「枚」を除去
		var num2 = btnTxt2.replace(MSG_CART_28,'');
		// 数値取得
		num2 = parseInt(num2);
		if(num2 == 0){
			document.getElementById('regBag_decision').textContent = MSG_CART_30;
		}
	}
	// 枚数をセット
	document.getElementById("s-dialog22_8").textContent = num+MSG_CART_28;
}

/**
 * ドリンク・みそ汁用レジ袋加算処理
 */
function regBagDmPlusBtn() {
	// 枚数表示タグ取得
	var btnTxt = document.getElementById("s-dialog22_9").textContent;
	// 「枚」を除去
	var num = btnTxt.replace(MSG_CART_28,'');
	// 数値取得
	num = parseInt(num);
	if(num < quantityLimit){
		num++;
		outOparationLog("レジ袋確認ポップアップ-ドリンク・みそ汁用-数量変更,増減:増,変更後数量:"+num);
	}
	// 枚数をセット
	document.getElementById("s-dialog22_9").textContent = num+MSG_CART_28;
	// 決定ボタンのラベル文言を「決定」にセット
	document.getElementById('regBag_decision').textContent = MSG_CART_31;
}

/**
 * ドリンク・みそ汁用レジ袋減算処理
 */
function regBagDmMinusBtn() {
	// 枚数表示タグ取得
	var btnTxt = document.getElementById("s-dialog22_9").textContent;
	// 「枚」を除去
	var num = btnTxt.replace(MSG_CART_28,'');
	// 数値取得
	num = parseInt(num);
	if(num > 0){
		num--;
		outOparationLog("レジ袋確認ポップアップ-ドリンク・みそ汁用-数量変更,増減:減,変更後数量:"+num);
	}

	if(num == 0){
		// 数量0になった場合、両種類の袋の数量が0なら
		// 決定ボタンのラベル文言を「不要」にセット
		var btnTxt2 = document.getElementById("s-dialog22_8").textContent;
		// 「枚」を除去
		var num2 = btnTxt2.replace(MSG_CART_28,'');
		// 数値取得
		num2 = parseInt(num2);
		if(num2 == 0){
			document.getElementById('regBag_decision').textContent = MSG_CART_30;
		}
	}
	// 枚数をセット
	document.getElementById("s-dialog22_9").textContent = num+MSG_CART_28;
}

/**
 * レジ袋リセット処理
 */
function regBagReset() {
    document.getElementById("s-dialog22_8").textContent = 0+MSG_CART_28;
    document.getElementById("s-dialog22_9").textContent = 0+MSG_CART_28;
}

/**
 * エラーログ出力処理
 */
function postErrLog(e) {
	// POST送信
	var response_json = null;
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/postErrLog.php',
			data:{
				android_id:androidID,
				term_class:"RTIS1",
				request_id:getCurrentTime(),
				table_no:table_no,
				slipNo:slipNo,
				menubook_cd:menubook_cd,
				tmp_tb_status:tmp_tb_status,
				m_menubook_json:m_menubook_json,
				m_goods_json:m_goods_json,
				m_basedishcombo_json:m_basedishcombo_json,
				m_nggoodsgroup_json:m_nggoodsgroup_json,
				submenuData_json:submenuData_json,
				plasticBagFunc_json:plasticBagFunc_json,
				regMenuBookCd_json:regMenuBookCd_json,
				resetTime:appStartTime,
				UserAgent:window.navigator.appVersion,
				error:e
				},
			success:function(data){
				// POST送信終了
				response_json = data;
				data = null;
			}
		})
	).done(function() {
	})
}

var withGoodsDetailFlg = true;
var withGoodsTotalCnt = 0;
/**
 * 購入誘導ポップアップ商品情報表示処理
 */
function withGoodsDetail(){
	startMeasuringElapsedTime("withGoodsDetailStart");
	// スクロール位置初期化
	document.getElementById('withgoods_detail').scrollLeft = 0;

	// スキップ追加ボタン初期化
	document.getElementById("add_btn").style.display = 'none';
	document.getElementById("skip_btn").style.display = 'block';
	withGoodsTotalCnt = 0;

	var withgoods_data = document.getElementById("withgoods_data");
	// 初期化
	withgoods_data.innerHTML = null;
	
	// 商品画像行
	var tr_1 = document.createElement('tr');
	// 商品詳細行
	var tr_2 = document.createElement('tr');
	// 商品数量選択行
	var tr_3 = document.createElement('tr');

	// 商品数
	var cnt = 1;
	for(goods in with_goods_map){
		// 表示ONOFF情報追加
		with_goods_map[goods]["onoff"] = false;
		if(cnt >= 6){
			// 商品数が６個以上は対応しないため、ループ終了
			continue;
		}
		if(with_goods_map[goods]["nMenuBookCode"] != menubook_cd){
			// 対象メニューブック以外の商品はスキップ
			continue;
		}
		if(m_goods_map[with_goods_map[goods]["nGoodsCode"]] == null){
			// 商品表示対象でない商品の場合、スキップ
			continue;
		}
		if(m_goods_map[with_goods_map[goods]["nGoodsCode"]]["bySalesStatusType"] != '2'){
			// 表示ON設定
			with_goods_map[goods]["onoff"] = true;
		}

		var goodsLine = m_goods_map[with_goods_map[goods]["nGoodsCode"]];
		
		// 一覧生成
		// 商品画像
		var td_1 = document.createElement('td');
		td_1.classList.add('withgoodsAll_'+goodsLine["nGoodsCode"]);
		if(!with_goods_map[goods]["onoff"]){
			// 品切れ商品の場合、非表示化
			td_1.style.display = "none";
		}
		// td_1.style.width = '35%';
		td_1.colSpan = 3;
		var td_img = document.createElement('img');
		if(MSG_CSS_LANG != "jp" && contains(layoutData_json,goodsLine["nGoodsCode"]+"_"+MSG_CSS_LANG+".png")){
			td_img.src = lis_fact_map['images/goods/'+goodsLine["nGoodsCode"]+"_"+MSG_CSS_LANG+".png"];
		} else {
			td_img.src = lis_fact_map['images/goods/'+goodsLine["nGoodsCode"]+'.png'];
		}
		td_img.setAttribute("onclick","withGoodsCntChange("+goodsLine["nGoodsCode"]+", 1)");
		td_1.appendChild(td_img);
		tr_1.appendChild(td_1);

		// 商品詳細
		var td_2 = document.createElement('td');
		td_2.classList.add('withgoodsAll_'+goodsLine["nGoodsCode"]);
		if(!with_goods_map[goods]["onoff"]){
			// 品切れ商品の場合、非表示化
			td_2.style.display = "none";
		}
		td_2.colSpan = 3;
		// td_2.append(goodsLine["cGoodsName"].replace("<br />",""));
		var editGoodsName = goodsLine["cGoodsName"];
		if(editGoodsName == null){
			editGoodsName = "";
		}
		td_2.insertAdjacentHTML("beforeend", editGoodsName.replace("<br />",""));
		td_2.appendChild(document.createElement('br'));
		var span_price = document.createElement('span');
		span_price.classList.add('tNum');
		span_price.textContent = goodsLine["nUnitCost"].toLocaleString();
		td_2.appendChild(span_price);
		// td_2.append(MSG_COMMON_15);
		td_2.insertAdjacentHTML("beforeend", MSG_COMMON_15);
		td_2.appendChild(document.createElement('br'));

		span_cal = document.createElement('span');
		span_cal.classList.add('tNum'); 
		if(goodsLine["nCal"] == "0" && (goodsLine["nSalt"] == "0.0" || goodsLine["nSalt"] == "0")){
			span_cal.textContent = "　";
			td_2.appendChild(span_cal);
		} else {
			var calSaltText = MSG_ORDMADE_7.replace('{0}',goodsLine["nCal"])
													.replace('{1}',goodsLine["nSalt"]);
			span_cal.textContent = calSaltText;
			td_2.appendChild(span_cal);
			// td_2.insertAdjacentHTML("beforeend", "g");
		}
		tr_2.appendChild(td_2);
		
		// 商品数量選択
		var td_qnt_1 = document.createElement('td');
		td_qnt_1.classList.add('withgoodsAll_'+goodsLine["nGoodsCode"]);
		if(!with_goods_map[goods]["onoff"]){
			// 品切れ商品の場合、非表示化
			td_qnt_1.style.display = "none";
		}
		var img_minus = document.createElement('img');
		img_minus.src = lis_fact_map["images/select/selectNumBtn1.png"];
		img_minus.setAttribute("onclick","withGoodsCntChange("+goodsLine["nGoodsCode"]+", 2)");
		td_qnt_1.appendChild(img_minus);
		tr_3.appendChild(td_qnt_1);

		var td_qnt_2 = document.createElement('td');
		td_qnt_2.classList.add('withgoodsAll_'+goodsLine["nGoodsCode"]);
		if(!with_goods_map[goods]["onoff"]){
			// 品切れ商品の場合、非表示化
			td_qnt_2.style.display = "none";
		}
		var span_qnt = document.createElement('span');
		span_qnt.classList.add('tNum');
		span_qnt.classList.add('withgoods_cnt');
		span_qnt.id = "withgoods_"+goodsLine["nGoodsCode"];
		span_qnt.textContent = 0;
		td_qnt_2.appendChild(span_qnt);
		tr_3.appendChild(td_qnt_2);

		var td_qnt_3 = document.createElement('td');
		td_qnt_3.classList.add('withgoodsAll_'+goodsLine["nGoodsCode"]);
		if(!with_goods_map[goods]["onoff"]){
			// 品切れ商品の場合、非表示化
			td_qnt_3.style.display = "none";
		}
		var img_plus = document.createElement('img');
		img_plus.src = lis_fact_map["images/select/selectNumBtn2.png"];
		img_plus.setAttribute("onclick","withGoodsCntChange("+goodsLine["nGoodsCode"]+", 1)");
		td_qnt_3.appendChild(img_plus);
		tr_3.appendChild(td_qnt_3);

		if(with_goods_map[goods]["onoff"]){
			// 商品数カウント
			cnt++;
		}
	}

	withgoods_data.appendChild(document.createElement('tr'));
	withgoods_data.appendChild(tr_1);
	withgoods_data.appendChild(tr_2);
	withgoods_data.appendChild(tr_3);
	withgoods_data.appendChild(document.createElement('tr'));

	if(cnt == 1){
		// 商品なしの場合、機能無効化
		withGoodsDetailFlg = false;
	}else {
		// 有効化
		withGoodsDetailFlg = true;

		// テーブル幅調整
		if((cnt -1) == 3){
			document.getElementById("withgoods_tbl").style.width = ((cnt -1) * 295 - 160) + "px";
		} else if((cnt -1) == 4){
			document.getElementById("withgoods_tbl").style.width = "960px";
		} else if((cnt -1) == 5){
			document.getElementById("withgoods_tbl").style.width = "1210px";
		} else {
			document.getElementById("withgoods_tbl").style.width = ((cnt -1) * 295) + "px";
		}
	}
	withGoodsMaxCartCheck();
	stopMeasuringElapsedTime("withGoodsDetailStart", "withGoodsDetail完了");
}

/**
 * 購入誘導ポップアップカート上限事前チェック
 */
function withGoodsMaxCartCheck(){
	startMeasuringElapsedTime("withGoodsMaxCartCheckStart");
	// 一覧表示テーブル取得
	var detail = document.getElementById('withgoods_data');
	// 子要素から商品コード保持タグを取得
	var goodsCds = detail.getElementsByClassName("withgoods_cnt");

	var wgCnt = 1;
	for (var i=0;i<goodsCds.length;i++) {
		// 注文カゴ内の同一商品を探す
		for (var ord in bf_order_map) {
			var goodsCd = goodsCds[i].id.replace("withgoods_","");
			if (bf_order_map[ord]['nGoodsCode'] == goodsCd) {
				// 商品毎の数量上限チェック
				if (parseInt(bf_order_map[ord]['quantity']) >= person) {
					// 既にカートの上限を超えている商品の場合、表示しない
					var delTgt = detail.getElementsByClassName('withgoodsAll_'+goodsCd);
					for (var j=0;j<delTgt.length;j++) {
						delTgt[j].style.display = "none";
					}
				}
				break;
			}
		}
		if(goodsCds[i].parentNode.style.display != 'none'){
			wgCnt++;
		}
	}

	// 最終的な商品数に合わせて、表示領域幅を調整
	if ((ordQuantity + 1) >= quantityLimit) {
		// 合計の上限を超えている場合、ごいっしょにいかがですか機能無効化
		withGoodsDetailFlg = false;
	} else if(wgCnt == 1){
		// 商品なしの場合、機能無効化
		withGoodsDetailFlg = false;
	} else {
		// 有効化
		withGoodsDetailFlg = true;

		// テーブル幅調整
		if((wgCnt -1) == 3){
			document.getElementById("withgoods_tbl").style.width = ((wgCnt -1) * 295 - 160) + "px";
		} else if((wgCnt -1) == 4){
			document.getElementById("withgoods_tbl").style.width = "960px";
		} else if((wgCnt -1) == 5){
			document.getElementById("withgoods_tbl").style.width = "1210px";
		} else {
			document.getElementById("withgoods_tbl").style.width = ((wgCnt -1) * 295) + "px";
		}
	}
	stopMeasuringElapsedTime("withGoodsMaxCartCheckStart", "withGoodsMaxCartCheck完了");
}

/**
 * 購入誘導ポップアップ商品選択数変更処理
 * @param 商品コード
 * @param 1：up 2:down
 */
function withGoodsCntChange(goodsCd, type){
	// タップ音
	touch();

	var cntElm = document.getElementById("withgoods_"+goodsCd);
	var cnt =  parseInt(cntElm.textContent);

	if(type == 1){
		// 加算の場合
		// 一覧表示テーブル取得
		var detail = document.getElementById('withgoods_data');
		// 子要素から商品コード保持タグを取得
		var goodsCds = detail.getElementsByClassName("withgoods_cnt");

		// 合計選択数
		var totalCnt = 0;
		for (var i=0;i<goodsCds.length;i++) {
			totalCnt = totalCnt + parseInt(goodsCds[i].textContent);
		}
		if ((ordQuantity + totalCnt) >= quantityLimit) {
			// 合計の上限を超える場合、加算しない
			// 選択数量上限超えポップアップを表示し、処理終了
			document.getElementById('s-dialog14').innerHTML = I_1018.replace('{0}',quantityLimit);
			Data.data['scenes']['dialog14'].onEntry();
			return;
		}

		// 注文カゴ内の同一商品を探す
		for (var ord in bf_order_map) {
			if (bf_order_map[ord]['nGoodsCode'] == goodsCd) {
				// 商品毎の数量上限チェック
				if (parseInt(bf_order_map[ord]['quantity'])+cnt+1 > person) {
					// 加算することで同一商品の上限を超える場合、加算させない
					// 選択数量上限超えポップアップを表示し、処理終了
					document.getElementById('s-dialog14').innerHTML = I_1018.replace('{0}',person);
					Data.data['scenes']['dialog14'].onEntry();
					return;
				}
			}
		}

		if(cnt >= 9){return;}
		withGoodsTotalCnt++;
		cnt++;
	}else if(type == 2){
		// 減算の場合
		if(cnt <= 0){return;}
		withGoodsTotalCnt--;
		cnt--;
	}

	if(withGoodsTotalCnt <= 0){
		// スキップボタン表示
		document.getElementById("add_btn").style.display = 'none';
		document.getElementById("skip_btn").style.display = 'block';
	} else {
		// 追加ボタン表示
		document.getElementById("add_btn").style.display = 'block';
		document.getElementById("skip_btn").style.display = 'none';
	}

	cntElm.textContent = cnt;
	outOparationLog("ご一緒にいかがですか画面-[+][-]ボタン,増減:"+(type == 1 ? "増":"減")+",商品コード:"+goodsCd+",表示ボタン:"+(withGoodsTotalCnt <= 0 ? "スキップ":"追加"));
}

/**
 * 購入誘導ポップアップ追加ボタン処理
 */
function withGoodsFix(){
	// 数量情報保持タグを全取得
	var qntTags = document.getElementById("withgoods_data").getElementsByClassName("withgoods_cnt");

	// var addTotal = 0;
	// // 選択商品の上限チェック
	// for(var i = 0;i < qntTags.length; i++){
	// 	var goodsId = qntTags[i].id.replace("withgoods_","");
	// 	var choiceCnt = parseInt(qntTags[i].textContent);
	// 	addTotal = addTotal + choiceCnt;
	// 	for (var ord in bf_order_map) {
    //         if (bf_order_map[ord]['nGoodsCode'] == goodsId) {
    //             // 商品毎の数量上限チェック
    //             if (parseInt(bf_order_map[ord]['quantity'])+choiceCnt > person) {
	// 				// 選択数量上限超えポップアップを表示し、処理終了
	// 				document.getElementById('s-dialog14').innerHTML = I_1018_2.replace('{0}',person).replace('{1}',bf_order_map[ord]['goodsData']['cGoodsName']);
	// 				Data.data['scenes']['dialog14'].onEntry();
	// 				return;
	// 			}
	// 		}
	// 	}
	// }

	// // 合計商品数の上限チェック
	// var cartTotal = 0;
	// for (var ord in bf_order_map) {
	// 	cartTotal = cartTotal + parseInt(bf_order_map[ord]['quantity']);
	// }
	// if(cartTotal + addTotal > quantityLimit){
	// 	// 上限以上の場合
	// 	// 選択数量上限超えポップアップを表示し、処理終了
	// 	document.getElementById('s-dialog14').innerHTML = I_1018.replace('{0}',quantityLimit);
	// 	Data.data['scenes']['dialog14'].onEntry();
	// 	return;
	// }

	// カート追加
	for(var i = 0;i < qntTags.length; i++){
		if(qntTags[i].textContent != "0"){
			// 数量が選択されていた場合
			// 商品コード取得
			var goodsId = qntTags[i].id.replace("withgoods_","");
			addOrdWithGoods(qntTags[i].textContent, null, goodsId);
		}
	}

	// ご一緒にいかがですかポップアップ終了
	Data.data['scenes']['dialog23'].onExit();
	outOparationLog("ご一緒にいかがですか画面-追加実行");
}

var withGoodsDataUpdateFlg = false;
/**
 * ごいっしょにいかがですか情報保管処理
 */
function withGoodsDataUpdate(){
	if(withGoodsDataUpdateFlg){
		// 多重タップ防止
		return;
	}
	withGoodsDataUpdateFlg = true;
	setTimeout(function () {
		withGoodsDataUpdateFlg = false;
	}, 3000);

	// データ配列
	var with_ope_data = {};

	// 管理日付
	var now = new Date();
	var nManageDate = "" + now.getFullYear() + padZero(now.getMonth() + 1) + padZero(now.getDate());

	// 操作時間
	var withGoodsOpeTime = "" + now.getFullYear() + padZero(now.getMonth() + 1) + padZero(now.getDate()) + padZero(now.getHours()) + 
	padZero(now.getMinutes()) + padZero(now.getSeconds()) + padZero(now.getMilliseconds());
    if(withGoodsOpeTime.length == 16){
		withGoodsOpeTime = withGoodsOpeTime+"0";
	}
	if(withGoodsOpeTime.length == 15){
		withGoodsOpeTime = withGoodsOpeTime+"00";
	}
	if(withGoodsOpeTime.length == 14){
		withGoodsOpeTime = withGoodsOpeTime+"000";
	}

	// 一覧表示テーブル取得
	var detail = document.getElementById('withgoods_data');
	// 子要素から商品コード保持タグを取得
	var goodsCds = detail.getElementsByClassName("withgoods_cnt");


	// 表示選択肢数
	var dispCnt = 0;
	for (var i=0;i<goodsCds.length;i++) {
		if(goodsCds[i].parentNode.style.display == "none"){
			continue;
		}
		dispCnt++;
	}
	// オーダーメイドディッシュ行セット
	with_ope_data["nSelectCount"] = dispCnt;
	with_ope_data["nParent"] = 0;
	with_ope_data["nTableCode"] = table_code;
	with_ope_data["nManageDate"] = nManageDate;
	with_ope_data["nOperationTime"] = withGoodsOpeTime;
	with_ope_data["nMenuBookCode"] = menubook_cd;
	with_ope_data["nGoodsCode"] = m_basedishcombo_map[ordMadeSelectBaseCode]["nGoodsCode"];
	with_ope_data["nUnitCost"] = parseInt(document.getElementById("price_total").textContent.replace(/,/g, ''));
	with_ope_data["nCount"] = 1;

	with_goods_ope_map.push(jQuery.extend(true, {}, with_ope_data));

	for (var i=0;i<goodsCds.length;i++) {
		if(goodsCds[i].parentNode.style.display == "none"){
			continue;
		}
		// 配列初期化
		with_ope_data = {};
		// 商品コード
		var goodsCd = goodsCds[i].id.replace("withgoods_","");

		// ごいっしょにいかがですか商品セット
		with_ope_data["nSelectCount"] = 0;
		with_ope_data["nParent"] = m_basedishcombo_map[ordMadeSelectBaseCode]["nGoodsCode"];
		with_ope_data["nTableCode"] = table_code;
		with_ope_data["nManageDate"] = nManageDate;
		with_ope_data["nOperationTime"] = withGoodsOpeTime;
		with_ope_data["nMenuBookCode"] = menubook_cd;
		with_ope_data["nGoodsCode"] = goodsCd;
		with_ope_data["nUnitCost"] = parseInt(m_goods_map[goodsCd]["nUnitCost"]);
		with_ope_data["nCount"] = parseInt(goodsCds[i].textContent);

		with_goods_ope_map.push(jQuery.extend(true, {}, with_ope_data));
	}
}


/**
 * 他の商品を注文するボタン処理
 */
function otherGoodsOrdBtn(){
	// 遷移先をセット
	cngLevel = ordFixAfDispId;

	if(cngLevel == "0"){
		location.href = "#root/home";
	} else {
		Data.data['scenes']['level'].onEntry(0);
	}
	outOparationLog("注文確定画面-他の商品を注文するボタン,遷移先画面ID:"+cngLevel);
}

/**
 * 操作ログ出力処理
 * @param 操作内容
 */
function outOparationLog(opeMsg){
	// 一度操作ログ送信を止めるため即return
	return true;

	// 現在日時取得
	var currentDateTimeStr = makeCurrentDateTimeStr();
	const msg = currentDateTimeStr + opeMsg;

	setOperationLogList(msg);
}

function setOperationLogList(message) {
	operationLogList.push(message);

	if(operationLogList.length > 100) {
		var opeMsg = "";
		for(operationLog of operationLogList) {
			opeMsg += operationLog + '\r\n';
		}

		writingOperationLog(opeMsg);
		operationLogList.slice(0);
	}
}

// 操作ログ溜め込み用リスト
var operationLogList = [];

// 操作ログ書き込み
function writingOperationLog(opeMsg) {
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/sendOperationLog.php',
			data:{
				//date:currentDateTimeStr,
				table_no:regFlg == '1' ? "reg":table_no,
				androidID:androidID,
				opeMsg:opeMsg
			},
		success:function(data){
			// POST送信終了
		}})
	).done(function() {
	})
}

/**
 * 注文履歴-確認終了ボタン
 */
function ordHistoryEnd(){
	outOparationLog("注文履歴画面-確認終了ボタン");
}

/**
 * エラー検知ログ出力処理
 */
$(function(){
	window.onerror = function (message, fileName, lineNumber, columnNumber, error) {
		outOparationLog("[ERROR]"+window.navigator.appVersion + '\n'+message + '\n' +
			  fileName + ':' + lineNumber + ':' + columnNumber + '\n' +
			  error.stack);
	}
})

/**
 * レジ袋確認ポップアップ戻る処理
 */
function regBagNoBag(){
	outOparationLog("レジ袋確認ポップアップ-戻るボタン");
}

/**
 * レジ袋確認ポップアップ戻る処理
 */
function regBagDecision(){
	outOparationLog("レジ袋確認ポップアップ-決定&不要ボタン");
}

/**
 * 運用保守GUI-オーダーメイドディッシュ商品表示位置プレビュー処理
 */
function ordermadeGoodsPrevGUI(goodsCd,getXline,getYLine,getHeight,getWidth,getZLine){
	var img = document.getElementById('ordermade_img_'+goodsCd);
	if(img == null){
		return;
	}

	// X軸
	var Xline = ORDERMADE_X + parseInt(getXline);
	// Y軸
	var YLine = ORDERMADE_Y - parseInt(getYLine);
	// 高さ比率
	var height = getHeight;
	// 幅比率
	var width = getWidth;
	// 表示順序
	var zLine = ORDERMADE_Z + parseInt(getZLine);

	if(m_goods_map[goodsCd] != null){
		m_goods_map[goodsCd]["nDispPositionX"] = getXline;
		m_goods_map[goodsCd]["nDispPositionY"] = getYLine;
		m_goods_map[goodsCd]["nHeightRate"] = getHeight;
		m_goods_map[goodsCd]["nWidthRate"] = getWidth;
		m_goods_map[goodsCd]["nZline"] = getZLine;
		for(var type in create_dish_map){
			if(create_dish_map[type][goodsCd] != null){
				create_dish_map[type][goodsCd]["nDispPositionX"] = getXline;
				create_dish_map[type][goodsCd]["nDispPositionY"] = getYLine;
				create_dish_map[type][goodsCd]["nHeightRate"] = getHeight;
				create_dish_map[type][goodsCd]["nWidthRate"] = getWidth;
				create_dish_map[type][goodsCd]["nZline"] = getZLine;

				// reset_dish_map[type][goodsCd]["nDispPositionX"] = getXline;
				// reset_dish_map[type][goodsCd]["nDispPositionY"] = getYLine;
				// reset_dish_map[type][goodsCd]["nHeightRate"] = getHeight;
				// reset_dish_map[type][goodsCd]["nWidthRate"] = getWidth;
				// reset_dish_map[type][goodsCd]["nZline"] = getZLine;
				break;
			}
		}
	}

	// 商品画像位置・サイズ・表示順序を設定
	img.setAttribute('style','left:'+Xline+'%;top:'+YLine+'%;height:'+height+'%;width:'+width+'%;z-index:'+zLine+';');
}

/**
 * 処理時間計測・出力処理
 * @param 操作内容
 */
// 30分に一回強制的にログ送信
//const FORCED_SEND_ELAPSED_TIME_INTERVAL =  1800000;
// テスト用に10秒
const FORCED_SEND_ELAPSED_TIME_INTERVAL =  10000;
function forcedSendElapsedTime() {
	if (elapsedTimeList.length > 0) {
		var opeMsg = "";
		for(elapsedTime of elapsedTimeList) {
			opeMsg += elapsedTime + '\r\n';
		}
		writingElapsedTime(opeMsg);
		elapsedTimeList.splice(0);
	}
}

function forcedSendOperationLog() {
	if (operationLogList.length > 0) {
		var opeMsg = "";
		for(operationLog of operationLogList) {
			opeMsg += operationLog + '\r\n';
		}
	}
	writingOperationLog(opeMsg);
	operationLogList.splice(0);
}

setInterval(forcedSendElapsedTime, FORCED_SEND_ELAPSED_TIME_INTERVAL);
//setInterval(forcedSendOperationLog, FORCED_SEND_ELAPSED_TIME_INTERVAL);
var elapsedTimeList = [];

// 計測開始
function startMeasuringElapsedTime(startMarker) {
	const checkExistance = performance.getEntriesByName(startMarker);
	if(checkExistance.length == 0) {
		// 存在しない場合のみ計測スタート地点をとる
		// 再起対策
  	performance.mark(startMarker);
	}
}

// 計測終了
function stopMeasuringElapsedTime(startMarker, measuringName) {
	try {
  	performance.measure(measuringName, startMarker);
	} catch (error) {
		const errorMessage = makeFatalErrorSentence(measuringName) + error;
		setElapsedTimeList(errorMessage);
		return false;
	}

  var elapsedTime = performance.getEntriesByName(measuringName);

	// 整理 
	performance.clearMarks(startMarker);
	performance.clearMeasures(measuringName);

	// 書きこむ形に成形
	elapsedTime = elapsedTime[0].duration.toPrecision(5);

	const message = makeSentence(elapsedTime, measuringName);
	setElapsedTimeList(message);
}

// ログファイルに書き込む文を作成
function makeSentence(elapsedTime, measuringName) {
	const prefix = makePrefix(elapsedTime);

	// 現在日時取得
	const currentDateTimeStr = makeCurrentDateTimeStr();

	const sentence = "[" + prefix + "]" + currentDateTimeStr
		+ measuringName + ":" + elapsedTime + "[ms]";

	return sentence;
}

function makeFatalErrorSentence(measuringName) {
	const prefix = "[FatalError]";
	const currentDateTimeStr = makeCurrentDateTimeStr();
	const sentence = prefix + currentDateTimeStr + measuringName + ':計測失敗';
	return sentence;
}

function makeCurrentDateTimeStr() {
	const currentDateTime = new Date();
	const year = currentDateTime.getFullYear();
	const month = ('0' + String(currentDateTime.getMonth()+1)).slice(-2);
	const date = ('0' + currentDateTime.getDate()).slice(-2);
	const hours = ('0' + currentDateTime.getHours()).slice(-2);
	const minutes = ('0' + currentDateTime.getMinutes()).slice(-2);
	const seconds = ('0' + currentDateTime.getSeconds()).slice(-2);
	const millisec = ('00' + currentDateTime.getMilliseconds()).slice(-3);

	const currentDateTimeStr = '[' + year + '-' + month + '-' + date + ' '
		+ hours + ':' + minutes + ':' + seconds + "." + millisec + ']';

	return currentDateTimeStr; 
}

// 計測時間によって文頭につける内容を変える
function makePrefix(elapsedTime) {
	if(elapsedTime <= 10) {
		return "Log       ";
	} else if(10 < elapsedTime && elapsedTime <= 100) {
		return "Alert100  ";
	} else if(100 < elapsedTime && elapsedTime <= 1000) {
		return "Alert1000 ";
	} else if(1000 < elapsedTime && elapsedTime <= 2000) {
		return "Alert2000 ";
	} else if(2000 < elapsedTime && elapsedTime <= 3000) {
		return "Alert3000 ";
	} else if(3000 < elapsedTime && elapsedTime <= 4000) {
		return "Alert4000 ";
	} else if(4000 < elapsedTime && elapsedTime <= 5000) {
		return "Alert5000 ";
	} else {
		return "Error     ";
	}
}

// 計測時間以外のログを書き込む
function additionMessage(prefix, message) {
	const currentDateTimeStr = makeCurrentDateTimeStr();
	const sentence = prefix + currentDateTimeStr + message; 
	setElapsedTimeList(sentence);
}

function additionMessagesForBaseDishCombo(messages) {
	prefix = "[basedishcombo]"
	const currentDateTimeStr = makeCurrentDateTimeStr();
	for (var i in messages) {
		// まとめて追加
		elapsedTimeList.push(prefix + currentDateTimeStr + messages[i])

	}
}

// チェックイン開始
function recordStartCheckIn() {
	const prefix = "[Start     ]";
	const message = "チェックイン開始";
	additionMessage(prefix, message);
}

// チェックイン終了
// 人数入力ボタン押下後～ホームシーン遷移完了時間計測
function recordStopCheckIn() {
	try {
  	performance.measure("stopCheckIn", "touchPeopleBtn");
	} catch (error) {
		const errorMessage = makeFatalErrorSentence("stopCheckIn") + error;
		setElapsedTimeList(errorMessage);
		return false;
	}

  var elapsedTime = performance.getEntriesByName("stopCheckIn");

	// 整理 
	performance.clearMarks("touchPeopleBtn");
	performance.clearMeasures("stopCheckIn");

	// 書きこむ形に成形
	elapsedTime = elapsedTime[0].duration.toPrecision(5);

	const prefix = "[Stop      ]";
	const currentDateTimeStr = makeCurrentDateTimeStr();
	const sentence = prefix + currentDateTimeStr
		+ "チェックイン終了" + ":" + elapsedTime + "[ms]";

	setElapsedTimeList(sentence);
}

// リトライ発生(タイムアウトにより) 時間計測は行わない。リトライ発生のみログファイルに書き込む
function timeoutRetryOccur(occurrencePlace) {
	const currentDateTimeStr = makeCurrentDateTimeStr();
	const message = occurrencePlace + ":タイムオーバーによりリトライ";
	const sentence = "[Log       ]" + currentDateTimeStr + message;
	setElapsedTimeList(sentence);
}

// リトライ発生(データ取得失敗により) 時間計測は行わない。リトライ発生のみログファイルに書き込む
function failureRetryOcuur(occurrencePlace) {
	const currentDateTimeStr = makeCurrentDateTimeStr();
	const message = occurrencePlace + ":データ取得失敗によりリトライ";
	const sentence = "[Log       ]" + currentDateTimeStr + message;
	setElapsedTimeList(sentence);
}

// 計測ログを配列に格納 
function setElapsedTimeList(message) {
	elapsedTimeList.push(message);

	if (elapsedTimeList.length > 19) {
		var opeMsg = "";
		for(elapsedTime of elapsedTimeList) {
			opeMsg += elapsedTime + '\r\n';
		}
		writingElapsedTime(opeMsg);
		elapsedTimeList.splice(0);
	}
}

// ログファイル書き込み
function writingElapsedTime(opeMsg){
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/measuringElapsedTime.php',
			data:{
				table_no:regFlg == '1' ? "reg":table_no,
				androidID:androidID,
				opeMsg:opeMsg
			},
			success:function(data){
				// POST送信終了
			}
		})
	).done(function() {

	})
}

/**
 * 暫定対策用, 起動時にphpをpost,変数にjsonを格納しておく
 */

var jqueryParams = new Map(); // $ajaxParam格納
var acquiredData = new Map(); // api取得したデータ格納用
var response_json_map_interim = {}; // quantityLimit用
var geneTimeForCashRegister = ""; // レジ起動用
var geneTimeForTable = "";

/**
 * @param {string} apiName 呼び出すapi名
 */
function makeJqueryParam(apiName) {
  var api = PHP_EN_ROOT_FOLDER + '/' + apiName + '.php';
	var jqueryParam = {
		type: "POST",
	  url:api,
	};
  return jqueryParam;
}

function makeJqueryParamForGenericMaster(parameter) {
  var api = PHP_EN_ROOT_FOLDER + '/getGenericMaster.php';
	var jqueryParam = {
    type:'POST',
	  url:api,
		data: {
			'fName': parameter.get('fName'),
			'uName': parameter.get('uName')
		},
  };

  return jqueryParam;
}

function makeAllParam() {
	var parameter = new Map();
  jqueryParams.set("getMenuBookMaster", makeJqueryParam("getMenuBookMaster"));
	jqueryParams.set("getGoodsMaster", makeJqueryParam("getGoodsMaster"));
  jqueryParams.set("getGenericMasterAll", makeJqueryParam("getGenericMasterAll"));
  jqueryParams.set("getAllergyMaster", makeJqueryParam("getAllergyMaster"));
  jqueryParams.set("getNgGoodsGroup", makeJqueryParam("getNgGoodsGroup"));
  jqueryParams.set("getWithGoods", makeJqueryParam("getWithGoods"));
  jqueryParams.set("getLayoutInfo", makeJqueryParam("getLayoutInfo"));
  jqueryParams.set("getSideLinkInfo", makeJqueryParam("getSideLinkInfo"));
  jqueryParams.set("getBasedishComboMaster", makeJqueryParam("getBasedishComboMaster"));
  jqueryParams.set("getLayoutData", makeJqueryParam("getLayoutData"));
  jqueryParams.set("getSubmenuData", makeJqueryParam("getSubmenuData"));
  
	parameter.set('fName', 'alcolFstOnly'),
	parameter.set('uName', 'onOffFlg'),
  jqueryParams.set("getAlclCheck", makeJqueryParamForGenericMaster(parameter));
  parameter.clear();

	parameter.set('fName', 'plasticBag'),
	parameter.set('uName', 'onOffFlg'),
  jqueryParams.set("getPlasticBagFunc", makeJqueryParamForGenericMaster(parameter));
  parameter.clear();

	parameter.set('fName', 'addHbDisp'),
	parameter.set('uName', 'topping'),
  jqueryParams.set("getAddHbDispTopping", makeJqueryParamForGenericMaster(parameter));
  parameter.clear();

	parameter.set('fName', 'regMenuBookCode'),
	parameter.set('uName', 'menuBookCode'),
  jqueryParams.set("getRegMenuBookCd", makeJqueryParamForGenericMaster(parameter));
  parameter.clear();

	parameter.set('fName', 'ordLimitControl'),
	parameter.set('uName', ORD_LIMIT_CONTROL_MODE),
  jqueryParams.set("getQuantityLimit", makeJqueryParamForGenericMaster(parameter));
  parameter.clear();

	parameter.set('fName', 'regTimeOut'),
	parameter.set('uName', 'setTime'),
  jqueryParams.set("getSetTimeForCashRegister", makeJqueryParamForGenericMaster(parameter));
  parameter.clear();

	parameter.set('fName', 'noOpeChk'),
	parameter.set('uName', 'setTime'),
  jqueryParams.set("getSetTimeForTable", makeJqueryParamForGenericMaster(parameter));
  parameter.clear();

	parameter.set('fName', 'noOpeChk'),
	parameter.set('uName', 'filePath'),
  jqueryParams.set("getFilePath", makeJqueryParamForGenericMaster(parameter));
  parameter.clear();
}

/**
 * @param {string} apiName 呼び出すapi名
 * @param {Map} parameter {"fname": fname, "uName": uName}
 */
function getJson() {
	var awaitGetJson = new $.Deferred;
	startMeasuringElapsedTime("getJson");

  makeAllParam();

  $.when(
    $.ajax(jqueryParams.get("getMenuBookMaster"))
    .then(
      function (data) {
        acquiredData.delete("getMenuBookMaster");
        acquiredData.set("getMenuBookMaster", data);
      }
    ),
		$.ajax(jqueryParams.get("getGoodsMaster"))
		.then(
			function (data) {
        acquiredData.delete("getGoodsMaster");
        acquiredData.set("getGoodsMaster", data);
			}
		),
    $.ajax(jqueryParams.get("getGenericMasterAll"))
    .then(
      function (data) {
        acquiredData.delete("getGenericMasterAll");
        acquiredData.set("getGenericMasterAll", data);
      }
    ),
    $.ajax(jqueryParams.get("getAlclCheck"))
    .then(
      function (data) {
        acquiredData.delete("getAlclCheck");
        acquiredData.set("getAlclCheck", data);
      }
    ),
    $.ajax(jqueryParams.get("getAllergyMaster"))
    .then(
      function (data) {
        acquiredData.delete("getAllergyMaster");
        acquiredData.set("getAllergyMaster", data);
      }
    ),
    $.ajax(jqueryParams.get("getNgGoodsGroup"))
    .then(
      function (data) {
        acquiredData.delete("getNgGoodsGroup");
        acquiredData.set("getNgGoodsGroup", data);
      }
    ),
    $.ajax(jqueryParams.get("getWithGoods"))
    .then(
      function (data) {
        acquiredData.delete("getWithGoods");
        acquiredData.set("getWithGoods", data);
      }
    ),
    $.ajax(jqueryParams.get("getLayoutInfo"))
    .then(
      function (data) {
        acquiredData.delete("getLayoutInfo");
        acquiredData.set("getLayoutInfo", data);
      }
    ),
    $.ajax(jqueryParams.get("getSideLinkInfo"))
    .then(
      function (data) {
        acquiredData.delete("getSideLinkInfo");
        acquiredData.set("getSideLinkInfo", data);
      }
    ),
    $.ajax(jqueryParams.get("getBasedishComboMaster"))
    .then(
      function (data) {
        acquiredData.delete("getBasedishComboMaster");
        acquiredData.set("getBasedishComboMaster", data);
      }
    ),
    $.ajax(jqueryParams.get("getLayoutData"))
    .then(
      function (data) {
        acquiredData.delete("getLayoutData");
        acquiredData.set("getLayoutData", data);
      }
    ),
    $.ajax(jqueryParams.get("getPlasticBagFunc"))
    .then(
      function (data) {
        acquiredData.delete("getPlasticBagFunc");
        acquiredData.set("getPlasticBagFunc", data);
      }
    ),
    $.ajax(jqueryParams.get("getAddHbDispTopping"))
    .then(
      function (data) {
        acquiredData.delete("getAddHbDispTopping");
        acquiredData.set("getAddHbDispTopping", data);
      }
    ),
    $.ajax(jqueryParams.get("getSubmenuData"))
    .then(
      function (data) {
        acquiredData.delete("getSubmenuData");
        acquiredData.set("getSubmenuData", data);
      }
    ),
    $.ajax(jqueryParams.get("getRegMenuBookCd"))
    .then(
      function (data) {
        acquiredData.delete("getRegMenuBookCd");
        acquiredData.set("getRegMenuBookCd", data);
      }
    ),
    $.ajax(jqueryParams.get("getQuantityLimit"))
    .then(
      function (data) {
        acquiredData.delete("getQuantityLimit");
        acquiredData.set("getQuantityLimit", data);
      }
    ),
    $.ajax(jqueryParams.get("getSetTimeForCashRegister"))
    .then(
      function (data) {
        acquiredData.delete("getSetTimeForCashRegister");
        acquiredData.set("getSetTimeForCashRegister", data);
      }
    ),
    $.ajax(jqueryParams.get("getSetTimeForTable"))
    .then(
      function (data) {
        acquiredData.delete("getSetTimeForTable");
        acquiredData.set("getSetTimeForTable", data);
      }
    ),
    $.ajax(jqueryParams.get("getFilePath"))
    .then(
      function (data) {
        acquiredData.delete("getFilePath");
        acquiredData.set("getFilePath", data);
      }
    ),
  ).done(function(){
    setJson();
  	stopMeasuringElapsedTime("getJson", "起動時暫定処置json取得完了");
		awaitGetJson.resolve();
  }).fail(function(){
		additionMessage("[Retry     ]", "API取得失敗リトライ");
		awaitGetJson.reject();
	})

	return awaitGetJson.promise();
}

function setJson() {
  m_menubook_json = acquiredData.get("getMenuBookMaster");
	m_goods_json = acquiredData.get("getGoodsMaster");
  generic_all_json= acquiredData.get("getGenericMasterAll");
  generic_alclFstOnly_json = acquiredData.get("getAlclCheck");
  allergy_json = acquiredData.get("getAllergyMaster");
  m_nggoodsgroup_json = acquiredData.get("getNgGoodsGroup");
  m_with_goods_json = acquiredData.get("getWithGoods");
  layoutInfo_json = acquiredData.get("getLayoutInfo");
  sideLinkInfo_json = acquiredData.get("getSideLinkInfo");
  m_basedishcombo_json = acquiredData.get("getBasedishComboMaster");
  layoutData_json = acquiredData.get("getLayoutData");
  plasticBagFunc_json = acquiredData.get("getPlasticBagFunc");
  addHbDispFlg_json = acquiredData.get("getAddHbDispTopping");
  submenuData_json = acquiredData.get("getSubmenuData");
  regMenuBookCd_json = acquiredData.get("getRegMenuBookCd");
  var quantity_limit_json = acquiredData.get("getQuantityLimit");
  response_json_map_interim = JSON.parse(quantity_limit_json);
  geneTimeForCashRegister = acquiredData.get("getSetTimeForCashRegister");
  geneTimeForTable = acquiredData.get("getSetTimeForTable");
  geneFilePath = acquiredData.get("getFilePath");
  acquiredData.clear();

	// ExtractGenericMaster();
}

function retryPromise(func, delay) {
	var funcName = func.name;

  const retry = (resolve, reject) => func()
		.then((result) => resolve(result))
    .catch((reject)=> {
			console.log("リトライ処理");
			var retryMessage = funcName + "リトライ処理"
    	additionMessage("[Log       ]", retryMessage);
			setTimeout(() => retry(resolve, reject), delay);
		})
  
  return new Promise(retry);
}

// 必要なデータ抽出
var menubook_cd_register = 1;
var regLevelDispId_register = 0;

function ExtractGenericMaster() {
	var generic_all_map = JSON.parse(generic_all_json);

	allergyBtnFlg = generic_all_map["allergenBtn_onOffFlg_1"]["cValue1"] == "1" ? true : false;

	plasticBagFlg_tto = generic_all_map["PlasticBag_onOffFlg_1"]["cValue1"];
	plasticBagFlg_reg = generic_all_map["PlasticBag_onOffFlg_1"]["cValue2"];

	menubook_cd_register = generic_all_map["regMenuBookCode_menuBookCode_1"]["cValue1"];
	if(generic_all_map["regMenuBookCode_menuBookCode_1"]["cValue1"] != "-") {
		regLevelDispId_register = generic_all_map["regMenuBookCode_menuBookCode_1"]["cValue2"]
	} else {
		regLevelDispId_register = 0
	}


	// addHbDispFlg_json 使用箇所
	addHpDispTpFlg = generic_all_map["addHbDisp_topping_1"]["cValue1"] == "1" ? true:false;

	generic_alclFstOnly_map = JSON.parse(generic_alclFstOnly_json);
}

function getOrderMadeImg() {
	var awaitGetOrderMadeImg = new $.Deferred;

	// 非同期通信で情報を取得
	startMeasuringElapsedTime("PostStartIngetOrdMadeImg");
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/getOrdMadeImg.php'
		})
	).done(function (data) {
		ordmadeImg_json = data;
		awaitGetOrderMadeImg.resolve();
	}).fail(function(){
		awaitGetOrderMadeImg.reject();
	})
	
	return awaitGetOrderMadeImg.promise();
}

function editAllTableDataStartup() {
	additionMessage("[StartEdit ]", "editAllTableDataStartupStart");
	startMeasuringElapsedTime("editAllTableDataStartupStart");
	setScreenSaverStartup();
	try{
		outOparationLog("取得データ整理処理開始");
		// 配列化
		tmp_m_menubook_map = JSON.parse(m_menubook_json);
			
		// 配列化
		tmp_m_goods_map = JSON.parse(m_goods_json);

		with_goods_map = JSON.parse(m_with_goods_json);

		addHpDispTpFlg = JSON.parse(addHbDispFlg_json)["1"]["cValue1"] == "1" ? true:false;

		// 配列化
		tmp_m_basedishcombo_map = JSON.parse(m_basedishcombo_json);
		logging_tmp_basedishcombo_map("editAllTableDataStartup", tmp_m_basedishcombo_map)

		// 配列化
		m_nggoodsgroup_map = JSON.parse(m_nggoodsgroup_json);

		submenuData_map = JSON.parse(submenuData_json);

		generic_alclFstOnly_map = JSON.parse(generic_alclFstOnly_json);

		allergy_map = JSON.parse(allergy_json);

		generic_all_map = JSON.parse(generic_all_json);

		for(var line in generic_all_map){
			if(contains(line,"allergenBtn_onOffFlg")){
				// アレルギー情報ボタン表示フラグ
				if(generic_all_map[line]["cValue1"] != "1"){
					// 表示OFFの場合
					document.getElementById("kids_allergen").setAttribute("hidden","hidden");
					document.getElementById("ordermadeAllergyDisp").hidden = true;
					document.getElementById("ordermadeAllergyDetail").hidden = true;
					document.getElementById("MSG_ORDMADE_16").hidden = true;
					document.getElementById("aller-staff-msg").hidden = false;
					document.getElementById("drinkAllergyBtn").hidden = true;
				} else {
					// ON
					document.getElementById("kids_allergen").removeAttribute("hidden");
					document.getElementById("ordermadeAllergyDisp").hidden = false;
					document.getElementById("ordermadeAllergyDetail").hidden = false;
					document.getElementById("MSG_ORDMADE_16").hidden = false;
					document.getElementById("aller-staff-msg").hidden = true;
					document.getElementById("drinkAllergyBtn").hidden = false;
				}
			}

			if(contains(line, "noOpeChk_displayTime")){
				var ssDisplayTime = parseInt(generic_all_map[line]["cValue1"], 10)
				if(isNaN(ssDisplayTime)) {
					screenSaverDisplayTime = 3000
				} else {
					screenSaverDisplayTime = ssDisplayTime
				}
			}
		}

		var plasticBagFunc_map = JSON.parse(plasticBagFunc_json);
		for(var line in plasticBagFunc_map){
			plasticBagFlg_tto = plasticBagFunc_map[line]["cValue1"];
			plasticBagFlg_reg = plasticBagFunc_map[line]["cValue2"];
		}

		menuBookMstEdit();
		goodsMstEdit();

		basedishcomboMstEdit();
		logging_basedishcombo_map("basedishcomboMstEdit5", m_basedishcombo_map)
		ordermadeBaseImage();
		orderMadeDishBaseSelectReset();

		// レイアウト調整情報取得
		layoutInfo_map = JSON.parse(layoutInfo_json);
		// サイドリンクバー情報取得
		sideLinkInfo_map = JSON.parse(sideLinkInfo_json);
		// レイアウト調整処理
		editLayoutInfo();

		ChangeMsgLanguage('jp');
		changeLanguage('jp');
		changeAllergenLanguage('jp');

		// レイアウトデータのプリロード
		layoutDataPreload();

		getQuantityLimit();
		
		setTimeout(function () {
			checkInFlg = false;
		}, 2000);
		outOparationLog("取得データ整理処理終了");
	}catch(e){
		// エラーが発生した場合、メニュー情報取得リトライ
		postErrLog(e.message+'　'+e.stack);
		getMenuBookMaster(pushMenubookChangeFlg);
		stopMeasuringElapsedTime("editAllTableDataStart", "editAllTableDataエラー発生getMenuBookMasterからリトライ");
		return;
	}
	stopMeasuringElapsedTime("editAllTableDataStartupStart", "editAllTableDataStartup完了");
	additionMessage("[StopEdit  ]", "editAllTableDataStartupStop");
}

function setScreenSaverStartup() {
  geneTime = geneTimeForTable;
	setScreenSaver()
}

function getAccountKbnCheckIn() {
	var awaitGetAccountKbn = new $.Deferred;
	startMeasuringElapsedTime("PostStartIngetAccountKbn");
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_ROOT_FOLDER + '/tto/compass_slip_request.php',
			data:{android_id:androidID,
				term_class:"RTIS1",
				request_id:getCurrentTime()
			},
		})
	).done(function(data) {
		stopMeasuringElapsedTime("PostStartIngetAccountKbn", "getAccountKbn内compass_slip_request.php:post完了");
		// POST送信終了
		response_json = data;
		timeoutFlg = true;
		if(response_json != null && response_json["status"] == 0){
			stopMeasuringElapsedTime("getAccountKbnStart", "getAccountKbn完了");
			if(response_json["result"]["total_value"] != '0'){
				outOparationLog("会計ボタン押下可否情報取得終了-有効化");
				// お会計ボタンを有効にする
				document.getElementById('footer_4').setAttribute('onclick', 'sideOpeFlg = true;touch(); getAccountInfoPost(1);');
				document.getElementById('home_btn3').setAttribute('onclick', 'touch(); getAccountInfoPost(1);');
			} else {
				outOparationLog("会計ボタン押下可否情報取得終了-無効化");
			}
		}else if(response_json != null && response_json["status"] == '-9001'){
			stopMeasuringElapsedTime("getAccountKbnStart", "getAccountKbn完了");
			outOparationLog("会計ボタン押下可否情報取得終了-無効化");
			// お会計情報がない場合、会計ボタン無効のまま
		}
		awaitGetAccountKbn.resolve();
	}).fail(function(){
		awaitGetAccountKbn.reject();
	})

	return awaitGetAccountKbn.promise();
}


function updateGoodsStatus() {
	var awaitUpdateGoodsStatus = new $.Deferred;
	startMeasuringElapsedTime("updateGoodsStatus");

  makeAllParam();

	$.when(
		$.ajax(jqueryParams.get("getGoodsMaster"))
			.then(
				function (data) {
        	acquiredData.delete("getGoodsMaster");
        	acquiredData.set("getGoodsMaster", data);
			}
		),
	).done(function(){
		m_goods_json = acquiredData.get("getGoodsMaster");
		acquiredData.clear();
		tmp_m_goods_map = JSON.parse(m_goods_json);

		stopMeasuringElapsedTime("updateGoodsStatus", "チェックイン時商品ステータス更新処理完了");
		// メニューブックマスタのデータ整理
		menuBookMstEdit();

		// 商品マスタのデータ整理
		goodsMstEdit();
		awaitUpdateGoodsStatus.resolve();
	}).fail(function(){
		awaitUpdateGoodsStatus.reject();
	})

	return awaitUpdateGoodsStatus.promise();
}

nHierarchyCodeToastList = {
	cheese: 105901,
	plain: 105903,
	strawberry: 105905,
	cheeseSalad: 105902,
	plainSalad: 105904,
	strawberrySalad: 105906,
}

nHierarchyCodeToppingList = {
	none: 106098,
	egg: 106099,
	bacon: 106100,
	baconEgg: 106101
}

nHierarchyCodeMorningDrinkList = {
	teaBerry: "106865",
	teaLemmon: "106866",
	teaOrange: "106867",
	strawberryMilk: "106868",
	yogurt: "106869",
	softdrink: "106870",
	peachberryFrapy: "106871",
	mangoFrapy: "106872",
	strawberryFrapy: "106873",
	pineFrapy: "106874"
}

var morningToast;
var morningTopping;

/**
 *   ヒエラルキーコード確認処理
 *   モーニングメニューボタン変更処理のため追加
 */
function checkHierarchyCode(nHierarchyCode) {
	console.log(nHierarchyCode)
	switch (nHierarchyCode) {
		case nHierarchyCodeToastList.cheese:
		case nHierarchyCodeToastList.plain:
		case nHierarchyCodeToastList.strawberry:
		case nHierarchyCodeToastList.cheeseSalad:
		case nHierarchyCodeToastList.plainSalad:
		case nHierarchyCodeToastList.strawberrySalad:
			// トースト類の場合
			morningToast = nHierarchyCode
			break
		case nHierarchyCodeToppingList.none:
		case nHierarchyCodeToppingList.egg:
		case nHierarchyCodeToppingList.bacon:
		case nHierarchyCodeToppingList.baconEgg:
			// トッピング類の場合
			morningTopping = nHierarchyCode
			changeMorningGoods(morningToast, morningTopping)
			break
		default:
			console.log("モーニング関連ではありません")
	}
	console.log("???")
	stopMeasuringElapsedTime(nHierarchyCode, nHierarchyCode+"遷移完了")
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 */
function changeMorningGoods(morningToast, morningTopping) {
	switch (morningToast) {
		case nHierarchyCodeToastList.cheese:
			setCheese(morningTopping)
			break
		case nHierarchyCodeToastList.plain:
			setPlain(morningTopping)
			break
		case nHierarchyCodeToastList.strawberry:
			setStrawberry(morningTopping)
			break
		case nHierarchyCodeToastList.cheeseSalad:
			setCheeseSalad(morningTopping)
			break
		case nHierarchyCodeToastList.plainSalad:
			setPlainSalad(morningTopping)
			break
		case nHierarchyCodeToastList.strawberrySalad:
			setStrawberrySalad(morningTopping)
			break
		default:
			console.log("dispヒエラルキーエラー:トースト")
	}
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　トーストがチーズトーストの場合の処理
 */
function setCheese(morningTopping) {
	switch (morningTopping) {
		case nHierarchyCodeToppingList.none:
			setCheeseNone()
			break
		case nHierarchyCodeToppingList.egg:
			setCheeseEgg()
			break
		case nHierarchyCodeToppingList.bacon:
			setCheeseBacon()
			break
		case nHierarchyCodeToppingList.baconEgg:
			setCheeseBaconEgg()
			break
		default:
			console.log("dispヒエラルキーエラー:トッピング")
	}
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　トーストがプレーントーストの場合の処理(プレーントースト⇔トースト(バター))
 */
function setPlain(morningTopping) {
	switch (morningTopping) {
		case nHierarchyCodeToppingList.none:
			setPlainNone()
			break
		case nHierarchyCodeToppingList.egg:
			setPlainEgg()
			break
		case nHierarchyCodeToppingList.bacon:
			setPlainBacon()
			break
		case nHierarchyCodeToppingList.baconEgg:
			setPlainBaconEgg()
			break
		default:
			console.log("dispヒエラルキーエラー:トッピング")
	}
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　トーストがイチゴトーストの場合の処理
 */
function setStrawberry(morningTopping) {
	switch (morningTopping) {
		case nHierarchyCodeToppingList.none:
			setStrawberryNone()
			break
		case nHierarchyCodeToppingList.egg:
			setStrawberryEgg()
			break
		case nHierarchyCodeToppingList.bacon:
			setStrawberryBacon()
			break
		case nHierarchyCodeToppingList.baconEgg:
			setStrawberryBaconEgg()
			break
		default:
			console.log("dispヒエラルキーエラー:トッピング")
	}
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　トーストがチーズトースト・サラダ付きの場合の処理
 */
function setCheeseSalad(morningTopping) {
	switch (morningTopping) {
		case nHierarchyCodeToppingList.none:
			setCheeseSaladNone()
			break
		case nHierarchyCodeToppingList.egg:
			setCheeseSaladEgg()
			break
		case nHierarchyCodeToppingList.bacon:
			setCheeseSaladBacon()
			break
		case nHierarchyCodeToppingList.baconEgg:
			setCheeseSaladBaconEgg()
			break
		default:
			console.log("dispヒエラルキーエラー:トッピング")
	}
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　トーストがプレーントースト・サラダ付きの場合の処理
 */
function setPlainSalad(morningTopping) {
	switch (morningTopping) {
		case nHierarchyCodeToppingList.none:
			setPlainSaladNone()
			break
		case nHierarchyCodeToppingList.egg:
			setPlainSaladEgg()
			break
		case nHierarchyCodeToppingList.bacon:
			setPlainSaladBacon()
			break
		case nHierarchyCodeToppingList.baconEgg:
			setPlainSaladBaconEgg()
			break
		default:
			console.log("dispヒエラルキーエラー:トッピング")
	}
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　トーストがイチゴトースト・サラダ付きの場合の処理
 */
function setStrawberrySalad(morningTopping) {
	switch (morningTopping) {
		case nHierarchyCodeToppingList.none:
			setStrawberrySaladNone()
			break
		case nHierarchyCodeToppingList.egg:
			setStrawberrySaladEgg()
			break
		case nHierarchyCodeToppingList.bacon:
			setStrawberrySaladBacon()
			break
		case nHierarchyCodeToppingList.baconEgg:
			setStrawberrySaladBaconEgg()
			break
		default:
			console.log("dispヒエラルキーエラー:トッピング")
	}
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　チーズトースト,トッピング:無しの場合の処理
 */
function setCheeseNone() {
	var cheeseNoneGoodsCodeList = {
		softdrink: 50021,
		strawberryMilk: 50022,
		yogurt: 50023,
		teaLemmon: 50024,
		teaOrange: 50025,
		teaBerry: 50026,
		strawberryFrapy: 50027,
		mangoFrapy: 50028,
		pineFrapy: 50029,
		peachberryFrapy: 50030,
	}
	
	setMorningGoods(cheeseNoneGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　チーズトースト,トッピング:エッグの場合の処理
 */
function setCheeseEgg() {
	var cheeseEggGoodsCodeList = {
		softdrink: 50121,
		strawberryMilk: 50122,
		yogurt: 50123,
		teaLemmon: 50124,
		teaOrange: 50125,
		teaBerry: 50126,
		strawberryFrapy: 50127,
		mangoFrapy: 50128,
		pineFrapy: 50129,
		peachberryFrapy: 50130,
	}
	
	setMorningGoods(cheeseEggGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　チーズトースト,トッピング:ベーコンの場合の処理
 */
function setCheeseBacon() {
	var cheeseBaconGoodsCodeList = {
		softdrink: 50221,
		strawberryMilk: 50222,
		yogurt: 50223,
		teaLemmon: 50224,
		teaOrange: 50225,
		teaBerry: 50226,
		strawberryFrapy: 50227,
		mangoFrapy: 50228,
		pineFrapy: 50229,
		peachberryFrapy: 50230,
	}
	
	setMorningGoods(cheeseBaconGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　チーズトースト,トッピング:ベーコン・エッグの場合の処理
 */
function setCheeseBaconEgg() {
	var cheeseBaconEggGoodsCodeList = {
		softdrink: 50321,
		strawberryMilk: 50322,
		yogurt: 50323,
		teaLemmon: 50324,
		teaOrange: 50325,
		teaBerry: 50326,
		strawberryFrapy: 50327,
		mangoFrapy: 50328,
		pineFrapy: 50329,
		peachberryFrapy: 50330,
	}
	
	setMorningGoods(cheeseBaconEggGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　プレーントースト,トッピング:無しの場合の処理
 */
function setPlainNone() {
	var plainNoneGoodsCodeList = {
		softdrink: 50011,
		strawberryMilk: 50012,
		yogurt: 50013,
		teaLemmon: 50014,
		teaOrange: 50015,
		teaBerry: 50016,
		strawberryFrapy: 50017,
		mangoFrapy: 50018,
		pineFrapy: 50019,
		peachberryFrapy: 50020,
	}
	
	setMorningGoods(plainNoneGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　プレーントースト,トッピング:エッグの場合の処理
 */
function setPlainEgg() {
	var plainEggGoodsCodeList = {
		softdrink: 50111,
		strawberryMilk: 50112,
		yogurt: 50113,
		teaLemmon: 50114,
		teaOrange: 50115,
		teaBerry: 50116,
		strawberryFrapy: 50117,
		mangoFrapy: 50118,
		pineFrapy: 50119,
		peachberryFrapy: 50120,
	}
	
	setMorningGoods(plainEggGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　プレーントースト,トッピング:ベーコンの場合の処理
 */
function setPlainBacon() {
	var plainBaconGoodsCodeList = {
		softdrink: 50211,
		strawberryMilk: 50212,
		yogurt: 50213,
		teaLemmon: 50214,
		teaOrange: 50215,
		teaBerry: 50216,
		strawberryFrapy: 50217,
		mangoFrapy: 50218,
		pineFrapy: 50219,
		peachberryFrapy: 50220,
	}
	
	setMorningGoods(plainBaconGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　プレーントースト,トッピング:ベーコン・エッグの場合の処理
 */
function setPlainBaconEgg() {
	var plainBaconEggGoodsCodeList = {
		softdrink: 50311,
		strawberryMilk: 50312,
		yogurt: 50313,
		teaLemmon: 50314,
		teaOrange: 50315,
		teaBerry: 50316,
		strawberryFrapy: 50317,
		mangoFrapy: 50318,
		pineFrapy: 50319,
		peachberryFrapy: 50320,
	}
	
	setMorningGoods(plainBaconEggGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　イチゴトースト,トッピング:無しの場合の処理
 */
function setStrawberryNone() {
	var strawberryNoneGoodsCodeList = {
		softdrink: 50031,
		strawberryMilk: 50032,
		yogurt: 50033,
		teaLemmon: 50034,
		teaOrange: 50035,
		teaBerry: 50036,
		strawberryFrapy: 50037,
		mangoFrapy: 50038,
		pineFrapy: 50039,
		peachberryFrapy: 50040,
	}
	
	setMorningGoods(strawberryNoneGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　イチゴトースト,トッピング:エッグの場合の処理
 */
function setStrawberryEgg() {
	var strawberryEggGoodsCodeList = {
		softdrink: 50131,
		strawberryMilk: 50132,
		yogurt: 50133,
		teaLemmon: 50134,
		teaOrange: 50135,
		teaBerry: 50136,
		strawberryFrapy: 50137,
		mangoFrapy: 50138,
		pineFrapy: 50139,
		peachberryFrapy: 50140,
	}
	
	setMorningGoods(strawberryEggGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　イチゴトースト,トッピング:ベーコンの場合の処理
 */
function setStrawberryBacon() {
	var strawberryBaconGoodsCodeList = {
		softdrink: 50231,
		strawberryMilk: 50232,
		yogurt: 50233,
		teaLemmon: 50234,
		teaOrange: 50235,
		teaBerry: 50236,
		strawberryFrapy: 50237,
		mangoFrapy: 50238,
		pineFrapy: 50239,
		peachberryFrapy: 50240,
	}
	
	setMorningGoods(strawberryBaconGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　イチゴトースト,トッピング:ベーコン・エッグの場合の処理
 */
function setStrawberryBaconEgg() {
	var strawberryBaconEggGoodsCodeList = {
		softdrink: 50331,
		strawberryMilk: 50332,
		yogurt: 50333,
		teaLemmon: 50334,
		teaOrange: 50335,
		teaBerry: 50336,
		strawberryFrapy: 50337,
		mangoFrapy: 50338,
		pineFrapy: 50339,
		peachberryFrapy: 50340,
	}
	
	setMorningGoods(strawberryBaconEggGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　チーズトースト・サラダ付き,トッピング:無しの場合の処理
 */
function setCheeseSaladNone() {
	var cheeseSaladNoneGoodsCodeList = {
		softdrink: 50051,
		strawberryMilk: 50052,
		yogurt: 50053,
		teaLemmon: 50054,
		teaOrange: 50055,
		teaBerry: 50056,
		strawberryFrapy: 50057,
		mangoFrapy: 50058,
		pineFrapy: 50059,
		peachberryFrapy: 50060,
	}
	
	setMorningGoods(cheeseSaladNoneGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　チーズトースト・サラダ付き,トッピング:エッグの場合の処理
 */
function setCheeseSaladEgg() {
	var cheeseSaladEggGoodsCodeList = {
		softdrink: 50151,
		strawberryMilk: 50152,
		yogurt: 50153,
		teaLemmon: 50154,
		teaOrange: 50155,
		teaBerry: 50156,
		strawberryFrapy: 50157,
		mangoFrapy: 50158,
		pineFrapy: 50159,
		peachberryFrapy: 50160,
	}
	
	setMorningGoods(cheeseSaladEggGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　チーズトースト・サラダ付き,トッピング:ベーコンの場合の処理
 */
function setCheeseSaladBacon() {
	var cheeseSaladBaconGoodsCodeList = {
		softdrink: 50251,
		strawberryMilk: 50252,
		yogurt: 50253,
		teaLemmon: 50254,
		teaOrange: 50255,
		teaBerry: 50256,
		strawberryFrapy: 50257,
		mangoFrapy: 50258,
		pineFrapy: 50259,
		peachberryFrapy: 50260,
	}
	
	setMorningGoods(cheeseSaladBaconGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　チーズトースト・サラダ付き,トッピング:ベーコン・エッグの場合の処理
 */
function setCheeseSaladBaconEgg() {
	var cheeseSaladBaconEggGoodsCodeList = {
		softdrink: 50351,
		strawberryMilk: 50352,
		yogurt: 50353,
		teaLemmon: 50354,
		teaOrange: 50355,
		teaBerry: 50356,
		strawberryFrapy: 50357,
		mangoFrapy: 50358,
		pineFrapy: 50359,
		peachberryFrapy: 50360,
	}
	
	setMorningGoods(cheeseSaladBaconEggGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　プレーントースト・サラダ付き,トッピング:無しの場合の処理
 */
function setPlainSaladNone() {
	var plainSaladNoneGoodsCodeList = {
		softdrink: 50041,
		strawberryMilk: 50042,
		yogurt: 50043,
		teaLemmon: 50044,
		teaOrange: 50045,
		teaBerry: 50046,
		strawberryFrapy: 50047,
		mangoFrapy: 50048,
		pineFrapy: 50049,
		peachberryFrapy: 50050,
	}
	
	setMorningGoods(plainSaladNoneGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　プレーントースト・サラダ付き,トッピング:エッグの場合の処理
 */
function setPlainSaladEgg() {
	var plainSaladEggGoodsCodeList = {
		softdrink: 50141,
		strawberryMilk: 50142,
		yogurt: 50143,
		teaLemmon: 50144,
		teaOrange: 50145,
		teaBerry: 50146,
		strawberryFrapy: 50147,
		mangoFrapy: 50148,
		pineFrapy: 50149,
		peachberryFrapy: 50150,
	}
	
	setMorningGoods(plainSaladEggGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　プレーントースト・サラダ付き,トッピング:ベーコンの場合の処理
 */
function setPlainSaladBacon() {
	var plainSaladBaconGoodsCodeList = {
		softdrink: 50241,
		strawberryMilk: 50242,
		yogurt: 50243,
		teaLemmon: 50244,
		teaOrange: 50245,
		teaBerry: 50246,
		strawberryFrapy: 50247,
		mangoFrapy: 50248,
		pineFrapy: 50249,
		peachberryFrapy: 50250,
	}
	
	setMorningGoods(plainSaladBaconGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　プレーントースト・サラダ付き,トッピング:ベーコン・エッグの場合の処理
 */
function setPlainSaladBaconEgg() {
	var plainSaladBaconEggGoodsCodeList = {
		softdrink: 50341,
		strawberryMilk: 50342,
		yogurt: 50343,
		teaLemmon: 50344,
		teaOrange: 50345,
		teaBerry: 50346,
		strawberryFrapy: 50347,
		mangoFrapy: 50348,
		pineFrapy: 50349,
		peachberryFrapy: 50350,
	}
	
	setMorningGoods(plainSaladBaconEggGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　イチゴトースト・サラダ付き,トッピング:無しの場合の処理
 */
function setStrawberrySaladNone() {
	var strawberrySaladNoneGoodsCodeList = {
		softdrink: 50061,
		strawberryMilk: 50062,
		yogurt: 50063,
		teaLemmon: 50064,
		teaOrange: 50065,
		teaBerry: 50066,
		strawberryFrapy: 50067,
		mangoFrapy: 50068,
		pineFrapy: 50069,
		peachberryFrapy: 50070,
	}
	
	setMorningGoods(strawberrySaladNoneGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　イチゴトースト・サラダ付き,トッピング:エッグの場合の処理
 */
function setStrawberrySaladEgg() {
	var strawberrySaladEggGoodsCodeList = {
		softdrink: 50161,
		strawberryMilk: 50162,
		yogurt: 50163,
		teaLemmon: 50164,
		teaOrange: 50165,
		teaBerry: 50166,
		strawberryFrapy: 50167,
		mangoFrapy: 50168,
		pineFrapy: 50169,
		peachberryFrapy: 50170,
	}
	
	setMorningGoods(strawberrySaladEggGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　イチゴトースト・サラダ付き,トッピング:ベーコンの場合の処理
 */
function setStrawberrySaladBacon() {
	var strawberrySaladBaconGoodsCodeList = {
		softdrink: 50261,
		strawberryMilk: 50262,
		yogurt: 50263,
		teaLemmon: 50264,
		teaOrange: 50265,
		teaBerry: 50266,
		strawberryFrapy: 50267,
		mangoFrapy: 50268,
		pineFrapy: 50269,
		peachberryFrapy: 50270,
	}
	
	setMorningGoods(strawberrySaladBaconGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　イチゴトースト・サラダ付き,トッピング:ベーコン・エッグの場合の処理
 */
function setStrawberrySaladBaconEgg() {
	var strawberrySaladBaconEggGoodsCodeList = {
		softdrink: 50361,
		strawberryMilk: 50362,
		yogurt: 50363,
		teaLemmon: 50364,
		teaOrange: 50365,
		teaBerry: 50366,
		strawberryFrapy: 50367,
		mangoFrapy: 50368,
		pineFrapy: 50369,
		peachberryFrapy: 50370,
	}
	
	setMorningGoods(strawberrySaladBaconEggGoodsCodeList)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　トースト・ドリンク決定後の処理
 */
function setMorningGoods(goodsCodeList) {
	setGoodsCodeForEachDrink(
		nHierarchyCodeMorningDrinkList.softdrink,
		goodsCodeList.softdrink
	)

	setGoodsCodeForEachDrink(
		nHierarchyCodeMorningDrinkList.strawberryMilk,
		goodsCodeList.strawberryMilk
	)

	setGoodsCodeForEachDrink(
		nHierarchyCodeMorningDrinkList.yogurt,
		goodsCodeList.yogurt
	)

	setGoodsCodeForEachDrink(
		nHierarchyCodeMorningDrinkList.teaLemmon,
		goodsCodeList.teaLemmon
	)

	setGoodsCodeForEachDrink(
		nHierarchyCodeMorningDrinkList.teaOrange,
		goodsCodeList.teaOrange
	)

	setGoodsCodeForEachDrink(
		nHierarchyCodeMorningDrinkList.teaBerry,
		goodsCodeList.teaBerry
	)

	setGoodsCodeForEachDrink(
		nHierarchyCodeMorningDrinkList.strawberryFrapy,
		goodsCodeList.strawberryFrapy
	)

	setGoodsCodeForEachDrink(
		nHierarchyCodeMorningDrinkList.mangoFrapy,
		goodsCodeList.mangoFrapy
	)

	setGoodsCodeForEachDrink(
		nHierarchyCodeMorningDrinkList.pineFrapy,
		goodsCodeList.pineFrapy
	)

	setGoodsCodeForEachDrink(
		nHierarchyCodeMorningDrinkList.peachberryFrapy,
		goodsCodeList.peachberryFrapy
	)
}

/**
 *   モーニング・ドリンク選択ボタン押下時に選択される商品コードの変更処理
 * 　ドリンクボタン押下時に呼び出される商品コードを変更
 */
function setGoodsCodeForEachDrink(nHierarchyCodeMorningDrink, goodsCode) {
	var prefix = "level_so_"
	var eachDrink = document.getElementsByClassName(prefix + nHierarchyCodeMorningDrink)
	eachDrink[0].setAttribute("goodsCd", goodsCode)
	eachDrink[0].removeAttribute("onClick")
	eachDrink[0].setAttribute("onclick","touch();dispLevelPopup("+goodsCode+")")
}

function logging_tmp_basedishcombo_map(place, basedishcombo_map) {
	// place: 呼び出し元
	var messages = []
	messages.push("展開開始(tmp_m_basedishcombo_map)")
	messages.push("呼び出し元: " + place)

  var keys = Object.keys(basedishcombo_map)
	try {
	for (var i in keys) {
		messages.push(keys[i] + "展開");
		each_basedishcombo = basedishcombo_map[keys[i]][keys[i]]
	
		var each_keys = Object.keys(each_basedishcombo)
		for (var j in each_keys) {
			var title = each_keys[j]
			var nakami = each_basedishcombo[each_keys[j]]
			var each_message = "  " + title + ": " + nakami
			messages.push(each_message)
		} 

	}
	}
	catch (e) {
		var error_messages = []
		error_messages.push("エラー発生 呼び出し元: " + place)
		error_messages.push(e)
		additionMessagesForBaseDishCombo(error_messages)
	}

	messages.push("展開終了");
	additionMessagesForBaseDishCombo(messages)
}

function logging_basedishcombo_map(place, basedishcombo_map) {
	// place: 呼び出し元
	var messages = []
	messages.push("展開開始(m_basedishcombo_map)")
	messages.push("呼び出し元: " + place)

  var keys = Object.keys(basedishcombo_map)
	try {
		for (var i in keys) {
			messages.push(keys[i] + "展開");
			each_basedishcombo = basedishcombo_map[keys[i]]
	
			var each_keys = Object.keys(each_basedishcombo)

			for (var j in each_keys) {
				var title = each_keys[j]
				var nakami = each_basedishcombo[each_keys[j]]
				var each_message = "  " + title + ": " + nakami
				messages.push(each_message)
			} 

		}
	}
	catch (e) {
		var error_messages = []
		error_messages.push("エラー発生 呼び出し元: " + place)
		error_messages.push(e)
		additionMessagesForBaseDishCombo(error_messages)
	}

	messages.push("展開終了");
	additionMessagesForBaseDishCombo(messages)
}
