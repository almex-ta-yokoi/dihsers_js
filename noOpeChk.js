var imgset = [];
var timer;
var slideId = 0;
var timeSet = 600000;
var geneTime;
var geneTime_map;
var screenSaverDisplayTime;
var geneFilePath;
var geneFilePath_map;

// -----------------------------------------------
// ▼関数A：指定画像を順に表示させる
// -----------------------------------------------
var counter = 0;
function slideimage() {
    if( counter >= imgset.length ) {
        // カウンタが画像数よりも大きくなったら0番に戻す
        counter = 0;
    }
    // 対象要素の画像URLを次の画像のURLに切り替える
    //document.getElementById('slideshow').src = imgset[counter];
    if(imgset[counter] == '' || imgset[counter] == null || contains(imgset[counter],'null') || contains(imgset[counter],'undefined')){
        document.getElementById('slideshow').src = '';
    }else{
        document.getElementById('slideshow').src = lis_fact_map[imgset[counter].replace("./","")];
    }
    // カウンタを1増やす
    counter++;
}

// -----------------------------------------------
// ▼関数B：スライドショーを制御
// -----------------------------------------------
/**
 * スクリーンセーバー起動処理
 * 　スクリーンセーバーを開始する
 */
function runScreenSaver() {
    additionMessage("[Log       ]", "スクリーンセーバー開始");
    if((contains(location.href,"root/order/order-select") && !contains(location.href,"root/order/order-select/choice"))){
        document.getElementById('s-dialog20').innerHTML = I_1026;
        Data.data['scenes']['dialog20'].onEntry();
        outOparationLog("オーダーメイドディッシュ作成画面-作成中ポップアップ表示");
    }else
    if((!contains(location.href,"root/people"))){
        // 開かれているダイアログを全て閉じる
        closePopup(1);
        outOparationLog("スクリーンセイバー表示");
        // 商品選択メッセージの誤動作防止
        document.getElementById('msgBadge').setAttribute('class','bubble06_noDisp');

        dishEditingFlg = false;
        changeSideLnk();
        // 対象要素の画像URLを次の画像のURLに切り替える
        //document.getElementById('slideshow').src = imgset[counter];
        counter = 0;
        if(imgset[counter] == '' || imgset[counter] == null || contains(imgset[counter],'null') || contains(imgset[counter],'undefined')){
            document.getElementById('slideshow').src = '';
        }else{
            document.getElementById('slideshow').src = lis_fact_map[imgset[counter].replace("./","")];
        }
        // カウンタを1増やす
        counter++;
        // スライド表示
        document.getElementById('slide_area').style.display = "inline-block";
        // メイン要素非表示
        document.getElementById('home').style.display = "none";
        if(regFlg == '1'){
            // レジ起動時、スクリーンセーバー解除後はテイクアウトTOP画面に遷移
			changeSideBarType('');
            location.href = '#root/takeout';
        }else{
            // スクリーンセーバー解除後はTOP画面に遷移
            location.href = '#root/home';
        }

        // タイマークリア
        clearInterval(timer);
        // スクリーンセーバーを開始する
        slideId = setInterval(slideimage, screenSaverDisplayTime);   // 1000は切替秒数(ミリ秒)
    }
    return true;
}

/**
 * ポップアップ閉じる処理
 */
function closePopup(type) {
    // 開かれているダイアログを全て閉じる
    Data.data['scenes']['dialog'].onExit();
    Data.data['scenes']['dialog2'].onExit();
    // 商品情報取得失敗ポップアップは閉じないよう変更
    // Data.data['scenes']['dialog3'].onExit();
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
    // レジ袋数選択中ポップアップは閉じないよう変更
    // Data.data['scenes']['dialog22'].onExit();
    if(type != 2){
        Data.data['scenes']['dialog23'].onExit2();
    }
    Data.data['scenes']['dialog24'].onExit();
    Data.data['scenes']['allergen'].onExit();
    Data.data['scenes']['allergenOther'].onExit();
    levelCancel();
}

/**
 * タイマーリセット処理
 * 　画面操作が発生した場合、待機時間をリセットする
 */
function restartTimer() {
    // タイマークリア
    clearInterval(timer);
    // タイマーセット
    timer=setInterval('chkOrderCart()',timeSet);

    // スクリーンセーバー実行中の場合、解除する
    if (slideId != 0) {
        clearInterval(slideId);
        slideId = 0;
        outOparationLog("スクリーンセイバー解除");

        // タブレット操作時のラグを考慮して0.5msのディレイを設定
        setTimeout(function () {
            // スライド非表示
            document.getElementById('slide_area').style.display = "none";
            // メイン要素表示
            document.getElementById('home').style.display = "inline";
        }, 500);
    }
    return true;
}

/**
 * タイマーリセット処理(バッシング完了用)
 * 　画面操作が発生した場合、待機時間をリセットする
 */
function restartTimerBassing() {
    // タイマークリア
    clearInterval(timer);
    // タイマーセット
    // timer=setInterval('chkOrderCart()',timeSet);
    setEvent();

    // スクリーンセーバー解除の場合、TOP画面に遷移する
    if (slideId != 0) {
        clearInterval(slideId);
        slideId = 0;
        outOparationLog("スクリーンセイバー解除");
        // スライド非表示
        document.getElementById('slide_area').style.display = "none";
        // メイン要素表示
        document.getElementById('home').style.display = "inline";
    }
}

var showTimeoutFlg = false;
/**
 * 注文カート内のチェック処理
 * 　注文カート内に未確定商品が存在していないかチェックする。
 * 　存在する場合はポップアップ表示し、存在しない場合はスクリーンセーバーを表示する。
 */
function chkOrderCart() {
    if(regFlg == '1'){
        if(showTimeoutFlg){
            showTimeoutFlg = false;
            showTimeout('timeout');
            // タイマーリセット
            restartTimer();
        }
        return true;
    }
    // １．注文カート内に未確定注文が残っているかチェック
    if (Object.keys(bf_order_map).length == 0 || (contains(location.href,"root/order/order-select") && !contains(location.href,"root/order/order-select/choice"))) {
        // 残っていない場合、スクリーンセーバー起動
        runScreenSaver();
    } else {
        closePopup(2);
        // 注文カートに未確定商品が残っている場合、確認ポップアップ表示
        document.getElementById('s-dialog8').innerHTML = I_1007;
        Data.data['scenes']['dialog8'].onEntry();
        // タイマーリセット
        restartTimer();
    }
    return true;
}

/**
 * スクリーンセーバーの設定時間取得処理
 * 　汎用マスタからスクリーンセーバーの設定時間を取得する
 */
function getGenericMasterByTextIngetSetTime(pushMenubookChangeFlg) {
    if(regFlg == "1") {
        geneTime = geneTimeForCashRegister;
    } else {
        geneTime = geneTimeForTable;
    }
	stopMeasuringElapsedTime("getSetTimeStart", "getSetTime完了");
    getFilePath(pushMenubookChangeFlg);
}

function getSetTime(pushMenubookChangeFlg) {
	startMeasuringElapsedTime("getSetTimeStart");
    getGenericMasterByTextIngetSetTime(pushMenubookChangeFlg);
    return;
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
            timeoutFlg = true;
            // showTimeoutFlg = false;
            // 通信エラーポップアップ出力処理
            // document.getElementById('loading').setAttribute("hidden","hidden");
            // getDataErrorPopUp();
			timeoutRetryOccur("getSetTime");
            getSetTime(pushMenubookChangeFlg);
            return;
		}
    },POST_TIMEOUT_TIME);

    var fName;
    var uName;
    if(regFlg == '1'){
        // レジ起動の場合、精算機へ戻るタイムアウト時間を取得
        fName = 'regTimeOut';
        uName = 'setTime';
    }else{
        fName = 'noOpeChk';
        uName = 'setTime';
    }

    // 非同期通信で設定時間を取得
    startMeasuringElapsedTime("PostStartIngetSetTime");
	$.when(
        $.ajax({
            type:'POST',
            url:PHP_EN_ROOT_FOLDER + '/getGenericMaster.php',
            data:{
                'fName':fName,
                'uName':uName
            },
            success:function(data){
  			    stopMeasuringElapsedTime("PostStartIngetSetTime", "getSetTime内getGenericMaster.php:post完了");
                // 結果をJSON形式で取得
                // if(data !== false && data !== ''){
                //     geneTime = data;
                // }
                geneTime = data;
				if((geneTime === false || geneTime === '') && !(timeoutFlg)){
                    timeoutFlg = true;
                    // showTimeoutFlg = false;
                    // 通信エラーポップアップ出力処理
                    // document.getElementById('loading').setAttribute("hidden","hidden");
                    // getDataErrorPopUp();
					failureRetryOcuur("getSetTime");
                    getSetTime(pushMenubookChangeFlg);
                    return;
				}
            }
        })
	).done(function() {
        if(!(timeoutFlg)){
            timeoutFlg = true;
            // 非同期通信の完了を監視
            if(geneTime !== false){
			    stopMeasuringElapsedTime("getSetTimeStart", "getSetTime完了");
                getFilePath(pushMenubookChangeFlg);
            }
        }else{
            timeoutFlg = true;
        }
	})
}

/**
 * スクリーンセーバーのファイルパス取得処理
 * 　汎用マスタからスクリーンセーバーのファイルパスを取得する　
 */
function getGenericMasterByTextIngetFilePath(pushMenubookChangeFlg) {
	stopMeasuringElapsedTime("getFilePathStart", "getFilePath完了");
    setScreenSaver();
    // 商品情報整理
    editAllTableData(pushMenubookChangeFlg);
}

function getFilePath(pushMenubookChangeFlg) {
	startMeasuringElapsedTime("getFilePathStart");
    getGenericMasterByTextIngetFilePath(pushMenubookChangeFlg);
    return;
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
            timeoutFlg = true;
            // showTimeoutFlg = false;
            // 通信エラーポップアップ出力処理
            // document.getElementById('loading').setAttribute("hidden","hidden");
            // getDataErrorPopUp();
			timeoutRetryOccur("getFilePath");
            getFilePath(pushMenubookChangeFlg);
            return;
		}
    },POST_TIMEOUT_TIME);
    
    // 非同期通信で設定時間を取得
    startMeasuringElapsedTime("PostStartIngetFilePath");
	$.when(
        $.ajax({
            type:'POST',
            url:PHP_EN_ROOT_FOLDER + '/getGenericMaster.php',
            data:{
                'fName':'noOpeChk',
                'uName':'filePath'
            },
            success:function(data){
  			    stopMeasuringElapsedTime("PostStartIngetFilePath", "getFilePath内getGenericMaster.php:post完了");
                // 結果をJSON形式で取得
                // if(data !== false && data !== ''){
                //     geneFilePath = data;
                // }
                geneFilePath = data;
				if((geneFilePath === false || geneFilePath === '') && !(timeoutFlg)){
                    timeoutFlg = true;
                    // showTimeoutFlg = false;
                    // 通信エラーポップアップ出力処理
					// document.getElementById('loading').setAttribute("hidden","hidden");
                    // getDataErrorPopUp();
					failureRetryOcuur("getFilePath");
                    getFilePath(pushMenubookChangeFlg);
					return;
				}
            }
        })
	).done(function() {
        if(!(timeoutFlg)){
            timeoutFlg = true;
            // 非同期通信の完了を監視
            if(geneFilePath !== false && geneFilePath !== ''){
			    stopMeasuringElapsedTime("getFilePathStart", "getFilePath完了");
                setScreenSaver();
                // 商品情報整理
                editAllTableData(pushMenubookChangeFlg);
            }
            // setScreenSaver();
        }else{
            timeoutFlg = true;
        }
	})
}

var imgset_tmp = [];
/** 
 * スクリーンセーバーの待機時間とファイルパス設定処理
 * 　スクリーンセーバーの待機時間とファイルパスを設定する
 * 　汎用マスタの登録内容によって、待機時間、表示画像を汎用的に設定可能
 */
function setScreenSaver() {
	startMeasuringElapsedTime("setScreenSaverStart");
    // DBからの取得結果をmapに格納
    geneTime_map = JSON.parse(geneTime);
    geneFilePath_map = JSON.parse(geneFilePath);

    // スクリーンセーバーの待機時間を設定
    for (var id in geneTime_map) {
        timeSet = geneTime_map[id]["cValue1"];
        additionMessage("[Log       ]", `スクリーンセーバー待機時間:${timeSet}`);
    }

    // スクリーンセーバーのファイルパスを設定
    for (var id in geneFilePath_map) {
        for (var val in geneFilePath_map[id]) {
            if (!val.indexOf('cValue')) {
                if (geneFilePath_map[id][val] !== '-') {
                    imgset.push(geneFilePath_map[id][val]);
                }
            }
        }
    }
    // 変更前のファイルパスを保存
    imgset_tmp = jQuery.extend(true, [], imgset);

    // イベント設定処理をコール
    setEvent();
    stopMeasuringElapsedTime("setScreenSaverStart", "setScreenSaver完了");
}

/** 
 * 初回読込処理
 * 　初回読込時のみ実行される
 */
function load(pushMenubookChangeFlg) {
    if(regFlg != '1'){
        additionMessage("[Log       ]", "初回load処理開始");
        getSetTime(pushMenubookChangeFlg);
    }
}

/**
 * イベント設定処理
 * 　初回タイマーと、各種イベントリスナをセット
 */
function setEvent() {
	startMeasuringElapsedTime("setEventStart");
    clearInterval(timer);
    timer=setInterval('chkOrderCart()',timeSet);
    document.body.addEventListener("mousedown", restartTimer, false);   // マウスクリック時
    document.body.addEventListener("keypress", restartTimer, false);    // キー押下時
    document.body.addEventListener("touchstart", restartTimer, false);  // タッチパネルをタッチした時
  	stopMeasuringElapsedTime("setEventStart", "setEvent完了");
}

// document.addEventListener("DOMContentLoaded", load, false);


var postParentShowTimeout = function(info){
    window.parent.postMessage(info,'*');
}
var showTimeout = function(timeout){
    var info = {
        'message_id': 'show_timeout',
        'message_body': timeout
    };
    postParentShowTimeout(info);
}

window.addEventListener("message", function(event){
    console.log(event.data);
    notifySlipinfo(event.data);
}, false);

var notifySlipinfo = function(info){
    if(info.message_id == 'start_takeout'){
        outOparationLog("精算機テイクアウト-スタート処理開始");
        // タイムアウト処理起動
        showTimeoutFlg = true;
        // getSetTime(true);
        // clearInterval(timer);
        // 最新メニュー情報取得
        if(!fstDispCheckFlg){
            getMenuBookMaster(true);
        }
        clearInterval(timer);
        // 注文一覧をリセット
        bf_order_map = [];
        // 注文数バッチを初期化
        iconRef();
        outOparationLog("精算機テイクアウト-スタート処理終了");
    }else if(info.message_id == 'gui_prev'){
        // プレビュー用MAP
        layoutInfo_map = info.message_body;
        if(info.message_body2 != null && info.message_body2 != ""){
            sideLinkInfo_map = info.message_body2;
        }
        // レイアウト調整処理
        editLayoutInfo();
    }else if(info.message_id == 'gui_prev_img'){
        // 画像をプレビュー反映
        guiPrevImg(info.message_tgtId,info.message_path,info.message_data);
        console.log("エンタメプレビュー反映完了");
    }else if(info.message_id == 'gui_ordermade_img_prev'){
        // オーダーメイドディッシュ商品画像のプレビュー反映
        ordermadeGoodsPrevGUI(info.message_body["nGoodsCode"],info.message_body["nDispPositionX"],info.message_body["nDispPositionY"]
            ,info.message_body["nHeightRate"],info.message_body["nWidthRate"],info.message_body["nZline"]);
    }
}
