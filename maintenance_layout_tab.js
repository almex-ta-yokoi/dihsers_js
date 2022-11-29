
/**      画面レイアウトタブ用処理           */

// 画面レイアウト情報取得結果
var layoutTab_general_map = [];

// サイドリンクバー情報取得結果
var layoutTab_sideLink_map = [];

// 遷移先画面選択用リスト
var dispIdList = {};

// 遷移先画面選択用リスト
var extendsBgImgList = {};

// サイドリンクバープリセット選択用リスト
var sideLinkIdList = {};

/**
 * php実行処理1(画面階層管理マスタ取得)
 * 　非同期通信で情報を取得する
 */
function getLayoutInfoGUI() {
    console.log("画面レイアウト-画面階層管理マスタ取得処理開始");
    // プログレスアイコン表示
    document.getElementById('loading').removeAttribute("hidden");
    
    // タイムアウトフラグ
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
            // リトライ処理
            console.log("画面レイアウト-画面階層管理マスタ取得処理失敗、リトライ");
			getLayoutInfoGUI();
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/getLayoutInfoGUI.php',
			success:function(data){
				// 汎用マスタ取得
                layoutTab_general_json = data;
				data = null;
				if(layoutTab_general_json == false || contains(layoutTab_general_json,CONNECT_ERR_MSG) && !(timeoutFlg)){
					timeoutFlg = true;
                    // リトライ処理
                    console.log("画面レイアウト-画面階層管理マスタ取得処理失敗、リトライ");
					getLayoutInfoGUI();
					return false;
                }
                try{
                    // フォーマットチェック
                    layoutTab_general_map = JSON.parse(layoutTab_general_json);
                    bk_layoutTab_general_map = jQuery.extend(true, {}, layoutTab_general_map);
                    console.log(layoutTab_general_map);
                }catch(e){
                    // フォーマット不正の場合、リトライ
                    timeoutFlg = true;
                    console.log("画面レイアウト-汎用マスタ取得処理失敗、リトライ");
                    getLayoutInfoGUI();
					return false;
                }
			}
		})
	).done(function() {
		if(!(layoutTab_general_json == false || contains(layoutTab_general_json,CONNECT_ERR_MSG)) && !(timeoutFlg)){
			timeoutFlg = true;
            // 次の処理実行
            console.log("画面レイアウト-汎用マスタ取得処理完了");
            getSideLinkInfoGUI();
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * php実行処理2(サイドリンクバー管理マスタ取得)
 * 　非同期通信で情報を取得する
 */
 function getSideLinkInfoGUI() {
    console.log("画面レイアウト-サイドリンクバー管理マスタ取得処理開始");
    // プログレスアイコン表示
    document.getElementById('loading').removeAttribute("hidden");
    
    // タイムアウトフラグ
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
            // リトライ処理
            console.log("画面レイアウト-サイドリンクバー管理マスタ取得処理失敗、リトライ");
			getSideLinkInfoGUI();
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/getSideLinkInfoGUI.php',
			success:function(data){
				// 汎用マスタ取得
                layoutTab_sideLink_json = data;
				data = null;
				if(layoutTab_sideLink_json == false || contains(layoutTab_sideLink_json,CONNECT_ERR_MSG) && !(timeoutFlg)){
					timeoutFlg = true;
                    // リトライ処理
                    console.log("画面レイアウト-サイドリンクバー管理マスタ取得処理失敗、リトライ");
					getSideLinkInfoGUI();
					return false;
                }
                try{
                    // フォーマットチェック
                    layoutTab_sideLink_map = JSON.parse(layoutTab_sideLink_json);
                    // bk_layoutTab_general_map = jQuery.extend(true, {}, layoutTab_general_map);
                }catch(e){
                    // フォーマット不正の場合、リトライ
                    timeoutFlg = true;
                    console.log("画面レイアウト-サイドリンクバー管理マスタ取得処理失敗、リトライ");
                    getSideLinkInfoGUI();
					return false;
                }
			}
		})
	).done(function() {
		if(!(layoutTab_sideLink_json == false || contains(layoutTab_sideLink_json,CONNECT_ERR_MSG)) && !(timeoutFlg)){
			timeoutFlg = true;
            // 次の処理実行
            console.log("画面レイアウト-サイドリンクバー管理マスタ取得処理完了");
            changeTab(3);
            // プログレスアイコン非表示
            document.getElementById('loading').setAttribute("hidden","hidden");
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * 初期表示処理
 */
function layoutTabCreate() {
    // 一覧を初期化
    document.getElementById("layout_detail").innerHTML = null;

    // メニューブックプルダウンセット
    var menubooks = document.getElementById("layout_menubooks");
    // 一旦初期化
    menubooks.innerHTML = null;
    // ブックをセット
    // var option = document.createElement("option");
    // option.value = 99999;
    // option.textContent = "ブック共通設定";
    // menubooks.appendChild(option);

    // 共通ブックをセット
    var option = document.createElement("option");
    option.value = "99999";
    option.textContent = "ブック共通";
    menubooks.appendChild(option);

    for(var msm in menubook_set_mst_map){
        var option = document.createElement("option");
        option.value = menubook_set_mst_map[msm]["nMenuBookCode"];
        option.textContent = menubook_set_mst_map[msm]["nMenuBookCode"]+":"+menubook_set_mst_map[msm]["cMenuBookName"];
        menubooks.appendChild(option);
    }

    // 画面選択プルダウン設定
    ScreensRef();
}

function ScreensRef(){
    // 画面プルダウンセット
    var screens = document.getElementById("layout_screens");
    // 一旦初期化
    screens.innerHTML = null;
    // メニューブックコード
    var menubookCd = document.getElementById("layout_menubooks").value;
    // 画面をセット
    // var cnt = 0;
    var tmpScreens = {};
    dispIdList = {};
    extendsBgImgList = {0:"継承なし"};

    if(menubookCd == "99999"){
        // ブック共通の場合、画面追加ボタン無効
        document.getElementById("layout_tab_disp_add").classList.add("is-hide");
    } else {
        document.getElementById("layout_tab_disp_add").classList.remove("is-hide");
    }

    for(var lgm in layoutTab_general_map){
        // 背景画像継承リスト作成
        var reg = new RegExp(/^[\d_]*$/);
        if(layoutTab_general_map[lgm]["nMenuBookCode"] == menubookCd
                && layoutTab_general_map[lgm]["nDispType"] == "4"
                && layoutTab_general_map[lgm]["nDispId"].length < 5
                && !(reg.test(layoutTab_general_map[lgm]["cDefaultImagePath"]))){
            extendsBgImgList[layoutTab_general_map[lgm]["nMenuBookCode"]+"_"+layoutTab_general_map[lgm]["nDispId"]+"_"+layoutTab_general_map[lgm]["nItemId"]] = layoutTab_general_map[lgm]["cDispName"];
            
        }

        // 重複画面をスキップ
        if(layoutTab_general_map[lgm]["nMenuBookCode"] == menubookCd
        && tmpScreens[layoutTab_general_map[lgm]["nDispId"]] == null){
            var option = document.createElement("option");
            // option.value = cnt;
            option.value = layoutTab_general_map[lgm]["nDispId"];
            option.textContent = layoutTab_general_map[lgm]["nDispId"]+":"+layoutTab_general_map[lgm]["cDispName"];
            // セット済みの画面を記録
            tmpScreens[layoutTab_general_map[lgm]["nDispId"]] = "dummy";
            
            screens.appendChild(option);
            // 遷移先選択プルダウン用に画面IDを記録
            if(layoutTab_general_map[lgm]["nDispId"] != "10001"
            && layoutTab_general_map[lgm]["nDispId"] != "10002"
            && layoutTab_general_map[lgm]["nDispId"] != "10003"){
                dispIdList[layoutTab_general_map[lgm]["nDispId"]] = layoutTab_general_map[lgm]["cDispName"];
            }
            // cnt++;
        }
    }
    dispIdList["99999"] = "オーダーメイドディッシュ画面";
    // プルダウンをソート
    layoutScreensSort();
    // 一番上の画面を選択状態にセット
    if(screens.children[0] != null){
        screens.children[0].selected = true;
    }

    sideLinkIdList = {};
    // レイアウト調整
    for(var lsm in layoutTab_sideLink_map){
        if(layoutTab_sideLink_map[lsm]["nMenuBookCode"] == menubookCd){
            sideLinkIdList[layoutTab_sideLink_map[lsm]["nSideLinkId"]] = layoutTab_sideLink_map[lsm]["cSideLinkName"];
        }
    }

    if(screens.length == 0){
        // ブックに紐づく画面情報がないことを検知した場合
        // 確認し、デフォルト設定を追加
        defaultDataInsert();
    }
}

/**
 * デフォルト画面データ挿入処理
 * @param プルダウンid
 * @param 変更対象名
 */
function defaultDataInsert(){
    var result = window.confirm('選択したメニューブックに紐づくデータがありません。\n初期データを追加しますか？');
    if(result){
        var selectMenubookCd = document.getElementById("layout_menubooks").value;
        // var dispId = document.getElementById("layout_screens").value;
        // updateHierarchyGUI("",dispId);
        // 最小値のメニューブックコード取得
        var minMenubookCd = document.getElementById("prevMenubookSelect").children[0].value;
        // for(var lg in layoutTab_general_map){
        //     if(layoutTab_general_map[lg]["nMenuBookCode"] == minMenubookCd
        //     && layoutTab_general_map[lg]["nDefaultFlg"] == "1"){
        //         // 最小値のメニューブックコードかつ、デフォルト設定行の場合
        //         // 検知したメニューブック用のデータとしてコピー
        //         var newKey = keyCdCreate();
        //         layoutTab_general_map[newKey] = jQuery.extend(true, {}, layoutTab_general_map[lg]);
        //         layoutTab_general_map[newKey]["nHierarchyCode"] = newKey;
        //         layoutTab_general_map[newKey]["nMenuBookCode"] = selectMenubookCd;
        //     }
        // }


        layoutTabImgFileExecute(false);
        // 主キーの採番
        var pKey = keyCdCreate();
        var sendFormatAll = "";
        var copyDispId = "99999";
        for(var lgm in layoutTab_general_map){
            if(layoutTab_general_map[lgm]["nMenuBookCode"] == minMenubookCd && layoutTab_general_map[lgm]["nDefaultFlg"] == "1"){
                // コピー対象ブックのデフォルト設定行の場合
                var sendFormat = baseSendFormat;
                sendFormat = sendFormat.replace("{nHierarchyCode}",pKey)
                            .replace("{nMenuBookCode}",selectMenubookCd)
                            .replace("{nDefaultFlg}",layoutTab_general_map[lgm]["nDefaultFlg"])
                            .replace("{nDispId}",layoutTab_general_map[lgm]["nDispId"])
                            .replace("{cDispName}","'"+layoutTab_general_map[lgm]["cDispName"]+"'")
                            .replace("{nItemId}",layoutTab_general_map[lgm]["nItemId"])
                            .replace("{cItemName}","'"+layoutTab_general_map[lgm]["cItemName"]+"'")
                            .replace("{nDispType}",layoutTab_general_map[lgm]["nDispType"])
                            .replace("{cDefaultImagePath}","'"+layoutTab_general_map[lgm]["cDefaultImagePath"]+"'")
                            .replace("{nDispPosition_Xjp}",layoutTab_general_map[lgm]["nDispPosition_Xjp"])
                            .replace("{nDispPosition_Xen}",layoutTab_general_map[lgm]["nDispPosition_Xen"])
                            .replace("{nDispPosition_Xkr}",layoutTab_general_map[lgm]["nDispPosition_Xkr"])
                            .replace("{nDispPosition_Xcn}",layoutTab_general_map[lgm]["nDispPosition_Xcn"])
                            .replace("{nDispPosition_Yjp}",layoutTab_general_map[lgm]["nDispPosition_Yjp"])
                            .replace("{nDispPosition_Yen}",layoutTab_general_map[lgm]["nDispPosition_Yen"])
                            .replace("{nDispPosition_Ykr}",layoutTab_general_map[lgm]["nDispPosition_Ykr"])
                            .replace("{nDispPosition_Ycn}",layoutTab_general_map[lgm]["nDispPosition_Ycn"])
                            .replace("{nDispSizejp}",layoutTab_general_map[lgm]["nDispSizejp"])
                            .replace("{nDispSizeen}",layoutTab_general_map[lgm]["nDispSizeen"])
                            .replace("{nDispSizekr}",layoutTab_general_map[lgm]["nDispSizekr"])
                            .replace("{nDispSizecn}",layoutTab_general_map[lgm]["nDispSizecn"])
                            .replace("{nWidthjp}",layoutTab_general_map[lgm]["nWidthjp"])
                            .replace("{nWidthen}",layoutTab_general_map[lgm]["nWidthen"])
                            .replace("{nWidthkr}",layoutTab_general_map[lgm]["nWidthkr"])
                            .replace("{nWidthcn}",layoutTab_general_map[lgm]["nWidthcn"])
                            .replace("{nHeightjp}",layoutTab_general_map[lgm]["nHeightjp"])
                            .replace("{nHeighten}",layoutTab_general_map[lgm]["nHeighten"])
                            .replace("{nHeightkr}",layoutTab_general_map[lgm]["nHeightkr"])
                            .replace("{nHeightcn}",layoutTab_general_map[lgm]["nHeightcn"])
                            .replace("{cTextjp}","'"+layoutTab_general_map[lgm]["cTextjp"]+"'")
                            .replace("{cTexten}","'"+layoutTab_general_map[lgm]["cTexten"]+"'")
                            .replace("{cTextkr}","'"+layoutTab_general_map[lgm]["cTextkr"]+"'")
                            .replace("{cTextcn}","'"+layoutTab_general_map[lgm]["cTextcn"]+"'")
                            .replace("{nItalicjp}","'"+layoutTab_general_map[lgm]["nItalicjp"]+"'")
                            .replace("{nItalicen}","'"+layoutTab_general_map[lgm]["nItalicen"]+"'")
                            .replace("{nItalickr}","'"+layoutTab_general_map[lgm]["nItalickr"]+"'")
                            .replace("{nItaliccn}","'"+layoutTab_general_map[lgm]["nItaliccn"]+"'")
                            .replace("{nFontSizejp}",layoutTab_general_map[lgm]["nFontSizejp"])
                            .replace("{nFontSizeen}",layoutTab_general_map[lgm]["nFontSizeen"])
                            .replace("{nFontSizekr}",layoutTab_general_map[lgm]["nFontSizekr"])
                            .replace("{nFontSizecn}",layoutTab_general_map[lgm]["nFontSizecn"])
                            .replace("{cColorjp}","'"+layoutTab_general_map[lgm]["cColorjp"]+"'")
                            .replace("{cColoren}","'"+layoutTab_general_map[lgm]["cColoren"]+"'")
                            .replace("{cColorkr}","'"+layoutTab_general_map[lgm]["cColorkr"]+"'")
                            .replace("{cColorcn}","'"+layoutTab_general_map[lgm]["cColorcn"]+"'")
                            .replace("{nFontWeightjp}",layoutTab_general_map[lgm]["nFontWeightjp"])
                            .replace("{nFontWeighten}",layoutTab_general_map[lgm]["nFontWeighten"])
                            .replace("{nFontWeightkr}",layoutTab_general_map[lgm]["nFontWeightkr"])
                            .replace("{nFontWeightcn}",layoutTab_general_map[lgm]["nFontWeightcn"])
                            .replace("{nVerticalFlg}",layoutTab_general_map[lgm]["nVerticalFlg"])
                            .replace("{nAfDispId}",layoutTab_general_map[lgm]["nAfDispId"])
                            .replace("{nGoodsCode}",layoutTab_general_map[lgm]["nGoodsCode"])
                            .replace("{nDetailDispType}",layoutTab_general_map[lgm]["nDetailDispType"])
                            .replace("{nDispMenuType}",layoutTab_general_map[lgm]["nDispMenuType"])
                            .replace("{nDispFlg}",layoutTab_general_map[lgm]["nDispFlg"])
                            .replace("{dOpacity}","'"+layoutTab_general_map[lgm]["dOpacity"]+"'")
                            .replace("{nAfDispId1}","'"+layoutTab_general_map[lgm]["nAfDispId1"]+"'")
                            .replace("{nAfDispId2}","'"+layoutTab_general_map[lgm]["nAfDispId2"]+"'")
                            .replace("{nAfDispId3}","'"+layoutTab_general_map[lgm]["nAfDispId3"]+"'")
                            .replace("{nAfDispId4}","'"+layoutTab_general_map[lgm]["nAfDispId4"]+"'")
                            .replace("{nAfDispId5}","'"+layoutTab_general_map[lgm]["nAfDispId5"]+"'")
                            .replace("{nSoldOutIcon_X}",layoutTab_general_map[lgm]["nSoldOutIcon_X"])
                            .replace("{nSoldOutIcon_Y}",layoutTab_general_map[lgm]["nSoldOutIcon_Y"])
                            .replace("{nSoldOutIcon_width}",layoutTab_general_map[lgm]["nSoldOutIcon_width"])
                            .replace("{nSoldOutIcon_height}",layoutTab_general_map[lgm]["nSoldOutIcon_height"])
                            .replace("{nSoldOutIcon_radius}",layoutTab_general_map[lgm]["nSoldOutIcon_radius"])
                            .replace("{nSoldOutIcon_condition_type}","'"+layoutTab_general_map[lgm]["nSoldOutIcon_condition_type"]+"'")
                            .replace("{nSoldOutIcon_condition_cd}","'"+layoutTab_general_map[lgm]["nSoldOutIcon_condition_cd"]+"'")
                            .replace("{nSideLinkId}","'"+layoutTab_general_map[lgm]["nSideLinkId"]+"'")
                            .replace("{tCreateTime}","now()")
                            .replace("{tUpdateTime}","now()")
                            .replace("{cCreateId}","'maintenanceGUI'")
                            .replace("{cUpdateId}","'maintenanceGUI'");
                sendFormatAll += sendFormat;
                sendFormatAll += ",";
                pKey++;
            }
        }
        sendFormatAll = sendFormatAll.slice(0,-1);
        console.log(sendFormatAll);
        updateHierarchyGUI(sendFormatAll,copyDispId,selectMenubookCd,false);
    } else {
        document.getElementById("prevMenubookSelect").children[0].selected = true;
        document.getElementById("layout_menubooks").children[0].selected = true;
        getLayoutInfoGUI();dispCancelBtn();
    }
}

function dispCancelBtn() {
    // 編集前のlayoutTab_general_mapを復元
    layoutTab_general_map = jQuery.extend(true, {}, bk_layoutTab_general_map);

    // メニューブックコード
    var menubookCd = document.getElementById("layout_menubooks").value;

    // プルダウンをロック解除
    document.getElementById("layout_menubooks").disabled = false;
    document.getElementById("layout_screens").disabled = false;
    document.getElementById("layout_tab_edit").classList.remove("is-hide");
    document.getElementById("layout_tab_cancel").classList.add("is-hide");
    document.getElementById("layout_tab_delete").classList.add("is-hide");
    if(menubookCd != "99999"){
        document.getElementById("layout_tab_disp_add").classList.remove("is-hide");
    }
    document.getElementById("layout_execute").classList.add("is-hide");
    document.getElementById("layout_tab_edit_save").classList.add("is-hide");

    // 一覧初期化
    document.getElementById("layout_detail").innerHTML = null;

    // プルダウン選択初期化
    // change_pulldown("layout_menubooks","99999");
    // change_pulldown("layout_screens","TOP画面");

    // プレビュー初期化
    prevDispRef(menubookCd);
}

/**
 * プルダウン選択変更処理
 * @param プルダウンid
 * @param 変更対象名
 */
function change_pulldown(id,name){
    pulldown_option = document.getElementById(id).getElementsByTagName('option');
    for(i=0; i<pulldown_option.length;i++){
        if(pulldown_option[i].value == name){
            pulldown_option[i].selected = true;
            break;
        }
    }
}

/**
 * 表示ボタン処理
 */
 function deleteBtn() {
    var result = window.confirm('画面を削除します。よろしいですか？');
    if(result){
        var dispId = document.getElementById("layout_screens").value;
        var menubookCd = document.getElementById("layout_menubooks").value;
        // layoutTabImgFileExecute(true);
        updateHierarchyGUI("",dispId,menubookCd,true);
    }
 }

var bk_layoutTab_general_map = [];
/**
 * 表示ボタン処理
 * @param バックアップ実行フラグ
 */
function dispBtn(bkFlg) {

    if(bkFlg){
        // 編集前のlayoutTab_general_mapを保存
        bk_layoutTab_general_map = jQuery.extend(true, {}, layoutTab_general_map);
    }

    // プルダウンをロック
    document.getElementById("layout_menubooks").disabled = true;
    document.getElementById("layout_screens").disabled = true;
    document.getElementById("layout_tab_cancel").classList.remove("is-hide");
    document.getElementById("layout_tab_delete").classList.add("is-hide");
    document.getElementById("layout_tab_disp_add").classList.add("is-hide");
    document.getElementById("layout_execute").classList.remove("is-hide");
    document.getElementById("layout_tab_edit").classList.add("is-hide");
    document.getElementById("layout_tab_edit_save").classList.remove("is-hide");

    console.log(layoutTab_general_map);
    // 一覧取得
    var details = document.getElementById("layout_detail");

    // 一覧を初期化
    details.innerHTML = null;

    // メニューブックコード
    var menubookCd = document.getElementById("layout_menubooks").value;

    // // メニューブック名
    // var menubookName = menubook_set_mst_map[menubookCd] == null ? "ブック共通設定" : menubook_set_mst_map[menubookCd]["cMenuBookName"];

    // 画面ID
    var screenId = document.getElementById("layout_screens").value;

    var fstFlg = true;

    var fstline = "";

    // 機能（ボタン、背景等）毎に一覧データを生成
    for(tmpline in layoutTab_general_map) {

        // 対象画面以外スキップ
        if(menubookCd == layoutTab_general_map[tmpline]["nMenuBookCode"]
        && screenId == layoutTab_general_map[tmpline]["nDispId"]){
            if(fstFlg){
                // 対象画面の初回行のみの処理
                fstline = tmpline;
                // 初回フラグOFF
                fstFlg = false;
                if(layoutTab_general_map[tmpline]["nDispId"].length < 5 && layoutTab_general_map[tmpline]["nDetailDispType"] != "4"){
                    // デフォルト画面以外の場合
                    // 画面削除ボタン
                    document.getElementById("layout_tab_delete").classList.remove("is-hide");
                }
                if(layoutTab_general_map[tmpline]["nDispId"].length < 5
                    && layoutTab_general_map[tmpline]["nDetailDispType"] != "5" && layoutTab_general_map[tmpline]["nDetailDispType"] != "4"){
                    // デフォルト画面以外かつ、階層画面以外の場合
                    // メモ：階層画面⇒商品詳細への変更は許容しない。
                    // 表示商品区分プルダウン
                    var goodsType_div = document.createElement("div");
                    goodsType_div.style.marginTop = "20px";
                    goodsType_div.style.position = "relative";
                    goodsType_div.style.left = "100px";
                    goodsType_div.style.width = "200px";

                    // 表示商品区分-タイトル
                    var goodsType_div_span = document.createElement("span");
                    goodsType_div_span.textContent = "■表示メニュー区分";

                    // 表示商品区分-プルダウン
                    var goodsType_div_select = document.createElement("select");
                    goodsType_div_select.style.position = "relative";
                    goodsType_div_select.style.left = "20px";
                    goodsType_div_select.style.height = "30px";
                    goodsType_div_select.style.width = "50px";
                    goodsType_div_select.setAttribute("onchange","goodsTypePullChange("+layoutTab_general_map[tmpline]["nDispId"]+",value);");

                    for(var i=1;i <= 50;i++){
                        var goodsType_div_select_option2 = document.createElement("option");
                        goodsType_div_select_option2.value = i;
                        goodsType_div_select_option2.selected = false;
                        goodsType_div_select_option2.textContent = i;
                        if(layoutTab_general_map[tmpline]["nDispMenuType"] == i){
                            // 設定されているメニュー区分を反映
                            goodsType_div_select_option2.selected = true;
                        }
                        goodsType_div_select.appendChild(goodsType_div_select_option2);
                    }

                    // 表示商品区分-タグ合成
                    goodsType_div.appendChild(goodsType_div_span);
                    goodsType_div.appendChild(goodsType_div_select);
                    details.appendChild(goodsType_div);
                }


            }
            // メモ：nDispType 種別(1:ボタン、2:テキスト文言、3:画像、4:背景、5:商品、6:サイドリンクバー行、7:メニュータイトル、
            //8:コップ画像、9：ボード画像、10:遷移先候補画面)
            if(layoutTab_general_map[tmpline]["nDispType"] == "1" || layoutTab_general_map[tmpline]["nDispType"] == "5"){
                // ボタンor商品の場合
                // 項目タイトル-セット
                if(!(layoutTab_general_map[tmpline]["nDispId"] == "10000"
                    && ((layoutTab_general_map[tmpline]["nItemId"] == "2" && layoutTab_general_map[tmpline]["cItemName"] == "お会計ボタン")
                    || (layoutTab_general_map[tmpline]["nItemId"] == "3" && layoutTab_general_map[tmpline]["cItemName"] == "注文履歴ボタン")
                    || (layoutTab_general_map[tmpline]["nItemId"] == "4" && layoutTab_general_map[tmpline]["cItemName"] == "店員呼び出しボタン")
                    || (layoutTab_general_map[tmpline]["nItemId"] == "5" && layoutTab_general_map[tmpline]["cItemName"] == "Laguageボタン")))){
                        details.appendChild(titleCreate(tmpline,true,true));
                    } else {
                        details.appendChild(titleCreate(tmpline,false,false));
                }
                // 表示ONOFF-セット
                details.appendChild(checkBoxCreate(tmpline,"表示/非表示","nDispFlg"));

                if(!(layoutTab_general_map[tmpline]["nDispId"] == "10000"
                    && ((layoutTab_general_map[tmpline]["nItemId"] == "2" && layoutTab_general_map[tmpline]["cItemName"] == "お会計ボタン")
                    || (layoutTab_general_map[tmpline]["nItemId"] == "3" && layoutTab_general_map[tmpline]["cItemName"] == "注文履歴ボタン")
                    || (layoutTab_general_map[tmpline]["nItemId"] == "4" && layoutTab_general_map[tmpline]["cItemName"] == "店員呼び出しボタン")
                    || (layoutTab_general_map[tmpline]["nItemId"] == "5" && layoutTab_general_map[tmpline]["cItemName"] == "Laguageボタン")))){
                    // TOP画面の画像なしボタン以外の場合
                    // ボタン-画像編集タグセット
                    details.appendChild(imgTableCreate(tmpline));

                    if(layoutTab_general_map[tmpline]["nDispType"] == "1"){
                        // 遷移先画面IDセット
                        var nDispSizejp = pullDownFieldCreate(tmpline,"遷移先画面ID　","nAfDispId","300px","left",dispIdList);
                        nDispSizejp.style.display = "inline-block";
                        var txtPxJp = document.createElement("span");
                        txtPxJp.textContent = "   ";
                        nDispSizejp.appendChild(txtPxJp);
                        details.appendChild(nDispSizejp);
    
                        // 改行
                        details.appendChild(document.createElement("br"));
                    }
                }
                
                // ボタン-表示位置_X軸 タイトル
                var nDispPisition_X_title = document.createElement("span");
                nDispPisition_X_title.textContent = "ボタン-表示位置_X軸";
                nDispPisition_X_title.style.left = "120px";
                nDispPisition_X_title.style.position = "relative";
                details.appendChild(nDispPisition_X_title);
                // ボタン-表示位置_X軸 日本語
                var nDispPisition_Xjp = textFieldCreate(tmpline,"　日本語　","nDispPosition_Xjp","40px","right","value = numberReplace(value)");
                nDispPisition_Xjp.style.display = "inline-block";
                var txtPxJp = document.createElement("span");
                txtPxJp.textContent = " px";
                nDispPisition_Xjp.appendChild(txtPxJp);
                details.appendChild(nDispPisition_Xjp);
                // ボタン-表示位置_X軸 英語
                var nDispPisition_Xen = textFieldCreate(tmpline,"　英語　","nDispPosition_Xen","40px","right","value = numberReplace(value)");
                nDispPisition_Xen.style.display = "inline-block";
                var txtPxEn = document.createElement("span");
                txtPxEn.textContent = " px";
                nDispPisition_Xen.appendChild(txtPxEn);
                details.appendChild(nDispPisition_Xen);

                // 改行
                details.appendChild(document.createElement("br"));

                // ボタン-表示位置_Y軸 タイトル
                var nDispPisition_Y_title = document.createElement("span");
                nDispPisition_Y_title.textContent = "ボタン-表示位置_Y軸";
                nDispPisition_Y_title.style.left = "120px";
                nDispPisition_Y_title.style.position = "relative";
                details.appendChild(nDispPisition_Y_title);
                // ボタン-表示位置_Y軸 日本語
                var nDispPisition_Yjp = textFieldCreate(tmpline,"　日本語　","nDispPosition_Yjp","40px","right","value = numberReplace(value)");
                nDispPisition_Yjp.style.display = "inline-block";
                var txtPxJp = document.createElement("span");
                txtPxJp.textContent = " px";
                nDispPisition_Yjp.appendChild(txtPxJp);
                details.appendChild(nDispPisition_Yjp);
                // ボタン-表示位置_Y軸 英語
                var nDispPisition_Yen = textFieldCreate(tmpline,"　英語　","nDispPosition_Yen","40px","right","value = numberReplace(value)");
                nDispPisition_Yen.style.display = "inline-block";
                var txtPxEn = document.createElement("span");
                txtPxEn.textContent = " px";
                nDispPisition_Yen.appendChild(txtPxEn);
                details.appendChild(nDispPisition_Yen);

                // 改行
                details.appendChild(document.createElement("br"));

                // 幅 タイトル
                var nWidth_title = document.createElement("span");
                nWidth_title.innerHTML = "幅　　　　　　　　&nbsp;&nbsp;";
                nWidth_title.style.left = "120px";
                nWidth_title.style.position = "relative";
                details.appendChild(nWidth_title);
                // 幅 日本語
                var nWidthjp = textFieldCreate(tmpline,"　日本語　","nWidthjp","40px","right","value = numberReplace(value)");
                nWidthjp.style.display = "inline-block";
                var txtPxJp = document.createElement("span");
                txtPxJp.textContent = " px";
                nWidthjp.appendChild(txtPxJp);
                details.appendChild(nWidthjp);
                // 幅 英語
                var nWidthen = textFieldCreate(tmpline,"　英語　","nWidthen","40px","right","value = numberReplace(value)");
                nWidthen.style.display = "inline-block";
                var txtPxEn = document.createElement("span");
                txtPxEn.textContent = " px";
                nWidthen.appendChild(txtPxEn);
                details.appendChild(nWidthen);

                // 改行
                details.appendChild(document.createElement("br"));

                // 高さ タイトル
                var nHeight_title = document.createElement("span");
                nHeight_title.innerHTML = "高さ　　　　　　　&nbsp;&nbsp;";
                nHeight_title.style.left = "120px";
                nHeight_title.style.position = "relative";
                details.appendChild(nHeight_title);
                // 高さ 日本語
                var nHeightjp = textFieldCreate(tmpline,"　日本語　","nHeightjp","40px","right","value = numberReplace(value)");
                nHeightjp.style.display = "inline-block";
                var txtPxJp = document.createElement("span");
                txtPxJp.textContent = " px";
                nHeightjp.appendChild(txtPxJp);
                details.appendChild(nHeightjp);
                // 高さ 英語
                var nHeighten = textFieldCreate(tmpline,"　英語　","nHeighten","40px","right","value = numberReplace(value)");
                nHeighten.style.display = "inline-block";
                var txtPxEn = document.createElement("span");
                txtPxEn.textContent = " px";
                nHeighten.appendChild(txtPxEn);
                details.appendChild(nHeighten);

                // 改行
                details.appendChild(document.createElement("br"));

                // 高さ タイトル
                var nDispSize_title = document.createElement("span");
                nDispSize_title.innerHTML = "表示サイズ　　　　&nbsp;&nbsp;";
                nDispSize_title.style.left = "120px";
                nDispSize_title.style.position = "relative";
                details.appendChild(nDispSize_title);
                // 高さ 日本語
                var nDispSizejp = textFieldCreate(tmpline,"　日本語　","nDispSizejp","40px","right","value = numberReplace(value)");
                nDispSizejp.style.display = "inline-block";
                var txtPxJp = document.createElement("span");
                txtPxJp.innerHTML = " %";
                nDispSizejp.appendChild(txtPxJp);
                details.appendChild(nDispSizejp);
                // 高さ 英語
                var nDispSizeen = textFieldCreate(tmpline,"　英語　","nDispSizeen","40px","right","value = numberReplace(value)");
                nDispSizeen.style.display = "inline-block";
                var txtPxEn = document.createElement("span");
                txtPxEn.innerHTML = " %";
                nDispSizeen.appendChild(txtPxEn);
                details.appendChild(nDispSizeen);

                // 改行
                details.appendChild(document.createElement("br"));

                // 透過-セット
                details.appendChild(checkBoxCreate(tmpline,"透過　　　&nbsp;","dOpacity"));

                // 改行
                details.appendChild(document.createElement("br"));

                if(layoutTab_general_map[tmpline]["nDispType"] == "5"){
                    //　商品の場合、商品コード設定項目も追加
                    // 商品コード-セット
                    var nDispSizeen = textFieldCreate(tmpline,"商品コード　","nGoodsCode","100px","right","value = numberReplace(value)");
                    nDispSizeen.style.display = "inline-block";
                    details.appendChild(nDispSizeen);

                    // 改行
                    details.appendChild(document.createElement("br"));
                } else if(layoutTab_general_map[tmpline]["nDispType"] == "1" && layoutTab_general_map[tmpline]["nDispId"].length < 5){
                    //　遷移ボタンの場合、商品コード設定項目も追加
                    // 商品区分-セット
                    var nDispSizeen = textFieldCreate(tmpline,"メニュー区分 ※「,」区切りで複数指定可　","nSoldOutIcon_condition_type","100px","right","");
                    nDispSizeen.style.display = "inline-block";
                    details.appendChild(nDispSizeen);

                    // 改行
                    details.appendChild(document.createElement("br"));

                    // 商品コード-セット
                    var nDispSizeen = textFieldCreate(tmpline,"商品コード ※「,」区切りで複数指定可　","nSoldOutIcon_condition_cd","100px","right","");
                    nDispSizeen.style.display = "inline-block";
                    details.appendChild(nDispSizeen);

                    // 改行
                    details.appendChild(document.createElement("br"));
                }

                // if(!(layoutTab_general_map[tmpline]["nDispId"] == "10000"
                //     && ((layoutTab_general_map[tmpline]["nItemId"] == "2" && layoutTab_general_map[tmpline]["cItemName"] == "お会計ボタン")
                //     || (layoutTab_general_map[tmpline]["nItemId"] == "3" && layoutTab_general_map[tmpline]["cItemName"] == "注文履歴ボタン")
                //     || (layoutTab_general_map[tmpline]["nItemId"] == "4" && layoutTab_general_map[tmpline]["cItemName"] == "店員呼び出しボタン")
                //     || (layoutTab_general_map[tmpline]["nItemId"] == "5" && layoutTab_general_map[tmpline]["cItemName"] == "Laguageボタン")))){
                if(!(layoutTab_general_map[tmpline]["nDispId"] == "10000")){
                    // 商品品切れ・準備中アイコン X軸調整-セット
                    var nDispSizeen = textFieldCreate(tmpline,"未販売表示 X軸調整　　　","nSoldOutIcon_X","100px","right","value = numberReplace(value)");
                    nDispSizeen.style.display = "inline-block";
                    var txtPxJp = document.createElement("span");
                    txtPxJp.textContent = " px";
                    nDispSizeen.appendChild(txtPxJp);
                    details.appendChild(nDispSizeen);

                    // 改行
                    details.appendChild(document.createElement("br"));

                    // 商品品切れ・準備中アイコン Y軸調整-セット
                    var nDispSizeen = textFieldCreate(tmpline,"未販売表示 Y軸調整　　　","nSoldOutIcon_Y","100px","right","value = numberReplace(value)");
                    nDispSizeen.style.display = "inline-block";
                    var txtPxJp = document.createElement("span");
                    txtPxJp.textContent = " px";
                    nDispSizeen.appendChild(txtPxJp);
                    details.appendChild(nDispSizeen);

                    // 改行
                    details.appendChild(document.createElement("br"));

                    // 商品品切れ・準備中アイコン 幅調整-セット
                    var nDispSizeen = textFieldCreate(tmpline,"未販売表示 幅調整　　　&nbsp;&nbsp;","nSoldOutIcon_width","100px","right","value = numberReplace(value)");
                    nDispSizeen.style.display = "inline-block";
                    var txtPxJp = document.createElement("span");
                    txtPxJp.textContent = " %";
                    nDispSizeen.appendChild(txtPxJp);
                    details.appendChild(nDispSizeen);

                    // 改行
                    details.appendChild(document.createElement("br"));

                    // 商品品切れ・準備中アイコン 高さ調整-セット
                    var nDispSizeen = textFieldCreate(tmpline,"未販売表示 高さ調整　　&nbsp;&nbsp;","nSoldOutIcon_height","100px","right","value = numberReplace(value)");
                    nDispSizeen.style.display = "inline-block";
                    var txtPxJp = document.createElement("span");
                    txtPxJp.textContent = " %";
                    nDispSizeen.appendChild(txtPxJp);
                    details.appendChild(nDispSizeen);

                    // 改行
                    details.appendChild(document.createElement("br"));

                    // 商品品切れ・準備中アイコン 丸み調整-セット
                    var nDispSizeen = textFieldCreate(tmpline,"未販売表示 丸み調整　　&nbsp;&nbsp;","nSoldOutIcon_radius","100px","right","value = numberReplace(value)");
                    nDispSizeen.style.display = "inline-block";
                    var txtPxJp = document.createElement("span");
                    txtPxJp.textContent = " px";
                    nDispSizeen.appendChild(txtPxJp);
                    details.appendChild(nDispSizeen);

                    // 改行
                    details.appendChild(document.createElement("br"));
                }
            }
            else if(layoutTab_general_map[tmpline]["nDispType"] == "2"){
                // テキスト文言の場合
                // テキスト文言-タイトル-セット
                details.appendChild(titleCreate(tmpline,true,true));
                // 表示ONOFF-セット
                details.appendChild(checkBoxCreate(tmpline,"表示/非表示","nDispFlg"));
                // テキスト文言-日本語文言-セット
                details.appendChild(textFieldCreate(tmpline,"日本語テキスト　","cTextjp","500px","left",""));
                // テキスト文言-英語文言-セット
                details.appendChild(textFieldCreate(tmpline,"英語テキスト　　","cTexten","500px","left",""));

                // 斜体表示-セット
                details.appendChild(checkBoxCreate(tmpline,"日本語斜体ON/OFF","nItalicjp"));
                details.appendChild(checkBoxCreate(tmpline,"英語斜体　ON/OFF","nItalicen"));

                // ボタン-表示位置_X軸 タイトル
                var nDispPisition_X_title = document.createElement("span");
                nDispPisition_X_title.innerHTML = "表示位置_X軸　　　&nbsp;";
                nDispPisition_X_title.style.left = "120px";
                nDispPisition_X_title.style.position = "relative";
                details.appendChild(nDispPisition_X_title);
                // ボタン-表示位置_X軸 日本語
                var nDispPisition_Xjp = textFieldCreate(tmpline,"　日本語　","nDispPosition_Xjp","40px","right","value = numberReplace(value)");
                nDispPisition_Xjp.style.display = "inline-block";
                var txtPxJp = document.createElement("span");
                txtPxJp.textContent = " px";
                nDispPisition_Xjp.appendChild(txtPxJp);
                details.appendChild(nDispPisition_Xjp);
                // ボタン-表示位置_X軸 英語
                var nDispPisition_Xen = textFieldCreate(tmpline,"　英語　","nDispPosition_Xen","40px","right","value = numberReplace(value)");
                nDispPisition_Xen.style.display = "inline-block";
                var txtPxEn = document.createElement("span");
                txtPxEn.textContent = " px";
                nDispPisition_Xen.appendChild(txtPxEn);
                details.appendChild(nDispPisition_Xen);

                // 改行
                details.appendChild(document.createElement("br"));

                // ボタン-表示位置_Y軸 タイトル
                var nDispPisition_Y_title = document.createElement("span");
                nDispPisition_Y_title.innerHTML = "表示位置_Y軸　　　&nbsp;";
                nDispPisition_Y_title.style.left = "120px";
                nDispPisition_Y_title.style.position = "relative";
                details.appendChild(nDispPisition_Y_title);
                // ボタン-表示位置_Y軸 日本語
                var nDispPisition_Yjp = textFieldCreate(tmpline,"　日本語　","nDispPosition_Yjp","40px","right","value = numberReplace(value)");
                nDispPisition_Yjp.style.display = "inline-block";
                var txtPxJp = document.createElement("span");
                txtPxJp.textContent = " px";
                nDispPisition_Yjp.appendChild(txtPxJp);
                details.appendChild(nDispPisition_Yjp);
                // ボタン-表示位置_Y軸 英語
                var nDispPisition_Yen = textFieldCreate(tmpline,"　英語　","nDispPosition_Yen","40px","right","value = numberReplace(value)");
                nDispPisition_Yen.style.display = "inline-block";
                var txtPxEn = document.createElement("span");
                txtPxEn.textContent = " px";
                nDispPisition_Yen.appendChild(txtPxEn);
                details.appendChild(nDispPisition_Yen);

                // 改行
                details.appendChild(document.createElement("br"));

                // 幅 タイトル
                var nWidth_title = document.createElement("span");
                nWidth_title.innerHTML = "幅　　　　　　　　&nbsp;&nbsp;";
                nWidth_title.style.left = "120px";
                nWidth_title.style.position = "relative";
                details.appendChild(nWidth_title);
                // 幅 日本語
                var nWidthjp = textFieldCreate(tmpline,"　日本語　","nWidthjp","40px","right","value = numberReplace(value)");
                nWidthjp.style.display = "inline-block";
                var txtPxJp = document.createElement("span");
                txtPxJp.textContent = " px";
                nWidthjp.appendChild(txtPxJp);
                details.appendChild(nWidthjp);
                // 幅 英語
                var nWidthen = textFieldCreate(tmpline,"　英語　","nWidthen","40px","right","value = numberReplace(value)");
                nWidthen.style.display = "inline-block";
                var txtPxEn = document.createElement("span");
                txtPxEn.textContent = " px";
                nWidthen.appendChild(txtPxEn);
                details.appendChild(nWidthen);

                // 改行
                details.appendChild(document.createElement("br"));

                // 高さ タイトル
                var nHeight_title = document.createElement("span");
                nHeight_title.innerHTML = "高さ　　　　　　　&nbsp;&nbsp;";
                nHeight_title.style.left = "120px";
                nHeight_title.style.position = "relative";
                details.appendChild(nHeight_title);
                // 高さ 日本語
                var nHeightjp = textFieldCreate(tmpline,"　日本語　","nHeightjp","40px","right","value = numberReplace(value)");
                nHeightjp.style.display = "inline-block";
                var txtPxJp = document.createElement("span");
                txtPxJp.textContent = " px";
                nHeightjp.appendChild(txtPxJp);
                details.appendChild(nHeightjp);
                // 高さ 英語
                var nHeighten = textFieldCreate(tmpline,"　英語　","nHeighten","40px","right","value = numberReplace(value)");
                nHeighten.style.display = "inline-block";
                var txtPxEn = document.createElement("span");
                txtPxEn.textContent = " px";
                nHeighten.appendChild(txtPxEn);
                details.appendChild(nHeighten);

                // 改行
                details.appendChild(document.createElement("br"));

                // 高さ タイトル
                var nDispSize_title = document.createElement("span");
                nDispSize_title.innerHTML = "表示サイズ　　　　&nbsp;&nbsp;";
                nDispSize_title.style.left = "120px";
                nDispSize_title.style.position = "relative";
                details.appendChild(nDispSize_title);
                // 高さ 日本語
                var nDispSizejp = textFieldCreate(tmpline,"　日本語　","nDispSizejp","40px","right","value = numberReplace(value)");
                nDispSizejp.style.display = "inline-block";
                var txtPxJp = document.createElement("span");
                txtPxJp.textContent = " px";
                nDispSizejp.appendChild(txtPxJp);
                details.appendChild(nDispSizejp);
                // 高さ 英語
                var nDispSizeen = textFieldCreate(tmpline,"　英語　","nDispSizeen","40px","right","value = numberReplace(value)");
                nDispSizeen.style.display = "inline-block";
                var txtPxEn = document.createElement("span");
                txtPxEn.textContent = " px";
                nDispSizeen.appendChild(txtPxEn);
                details.appendChild(nDispSizeen);

                // 改行
                details.appendChild(document.createElement("br"));

                // フォントサイズ タイトル
                var nDispSize_title = document.createElement("span");
                nDispSize_title.innerHTML = "フォントサイズ　　&nbsp;&nbsp;";
                nDispSize_title.style.left = "120px";
                nDispSize_title.style.position = "relative";
                details.appendChild(nDispSize_title);
                // フォントサイズ 日本語
                var nDispSizejp = textFieldCreate(tmpline,"　日本語　","nFontSizejp","40px","right","value = numberReplace(value)");
                nDispSizejp.style.display = "inline-block";
                var txtPxJp = document.createElement("span");
                txtPxJp.textContent = " px";
                nDispSizejp.appendChild(txtPxJp);
                details.appendChild(nDispSizejp);
                // フォントサイズ 英語
                var nDispSizeen = textFieldCreate(tmpline,"　英語　","nFontSizeen","40px","right","value = numberReplace(value)");
                nDispSizeen.style.display = "inline-block";
                var txtPxEn = document.createElement("span");
                txtPxEn.textContent = " px";
                nDispSizeen.appendChild(txtPxEn);
                details.appendChild(nDispSizeen);

                // 改行
                details.appendChild(document.createElement("br"));

                // 色 タイトル
                var nDispSize_title = document.createElement("span");
                nDispSize_title.innerHTML = "色　　　　　　　　&nbsp;&nbsp;";
                nDispSize_title.style.left = "120px";
                nDispSize_title.style.position = "relative";
                details.appendChild(nDispSize_title);
                // 色 日本語
                var nDispSizejp = textFieldCreate(tmpline,"　日本語　","cColorjp","120px","left","");
                nDispSizejp.style.display = "inline-block";
                var txtPxJp = document.createElement("span");
                txtPxJp.textContent = "   ";
                nDispSizejp.appendChild(txtPxJp);
                details.appendChild(nDispSizejp);
                // 色 英語
                var nDispSizeen = textFieldCreate(tmpline,"　英語　","cColoren","120px","left","");
                nDispSizeen.style.display = "inline-block";
                var txtPxEn = document.createElement("span");
                txtPxEn.textContent = "   ";
                nDispSizeen.appendChild(txtPxEn);
                details.appendChild(nDispSizeen);

                // 改行
                details.appendChild(document.createElement("br"));

                // 太さ タイトル
                var nDispSize_title = document.createElement("span");
                nDispSize_title.innerHTML = "太さ　　　　　　　&nbsp;&nbsp;";
                nDispSize_title.style.left = "120px";
                nDispSize_title.style.position = "relative";
                details.appendChild(nDispSize_title);
                // 太さ 日本語
                var nDispSizejp = pullDownFieldCreate(tmpline,"　日本語　","nFontWeightjp","70px","left",{500:"500",600:"600",800:"800"});
                nDispSizejp.style.display = "inline-block";
                var txtPxJp = document.createElement("span");
                txtPxJp.textContent = "   ";
                nDispSizejp.appendChild(txtPxJp);
                details.appendChild(nDispSizejp);
                // 太さ 英語
                var nDispSizeen = pullDownFieldCreate(tmpline,"　英語　","nFontWeighten","70px","left",{100:"100",200:"200",300:"300",400:"400",500:"500",600:"600",700:"700",800:"800",900:"900"});
                nDispSizeen.style.display = "inline-block";
                var txtPxEn = document.createElement("span");
                txtPxEn.textContent = "   ";
                nDispSizeen.appendChild(txtPxEn);
                details.appendChild(nDispSizeen);

                // 改行
                details.appendChild(document.createElement("br"));
            }
            else if(layoutTab_general_map[tmpline]["nDispType"] == "3"){
                // 画像の場合
                // 項目タイトル-セット
                details.appendChild(titleCreate(tmpline,true,true));
                // 表示ONOFF-セット
                details.appendChild(checkBoxCreate(tmpline,"表示/非表示","nDispFlg"));

                // ボタン-画像編集タグセット
                details.appendChild(imgTableCreate(tmpline));

                // 画像-表示位置_X軸 タイトル
                var nDispPisition_X_title = document.createElement("span");
                nDispPisition_X_title.textContent = "画像-表示位置_X軸　";
                nDispPisition_X_title.style.left = "120px";
                nDispPisition_X_title.style.position = "relative";
                details.appendChild(nDispPisition_X_title);
                // 画像-表示位置_X軸 日本語
                var nDispPisition_Xjp = textFieldCreate(tmpline,"　日本語　","nDispPosition_Xjp","40px","right","value = numberReplace(value)");
                nDispPisition_Xjp.style.display = "inline-block";
                var txtPxJp = document.createElement("span");
                txtPxJp.textContent = " px";
                nDispPisition_Xjp.appendChild(txtPxJp);
                details.appendChild(nDispPisition_Xjp);
                // 画像-表示位置_X軸 英語
                var nDispPisition_Xen = textFieldCreate(tmpline,"　英語　","nDispPosition_Xen","40px","right","value = numberReplace(value)");
                nDispPisition_Xen.style.display = "inline-block";
                var txtPxEn = document.createElement("span");
                txtPxEn.textContent = " px";
                nDispPisition_Xen.appendChild(txtPxEn);
                details.appendChild(nDispPisition_Xen);

                // 改行
                details.appendChild(document.createElement("br"));

                // 画像-表示位置_Y軸 タイトル
                var nDispPisition_Y_title = document.createElement("span");
                nDispPisition_Y_title.textContent = "画像-表示位置_Y軸　";
                nDispPisition_Y_title.style.left = "120px";
                nDispPisition_Y_title.style.position = "relative";
                details.appendChild(nDispPisition_Y_title);
                // 画像-表示位置_Y軸 日本語
                var nDispPisition_Yjp = textFieldCreate(tmpline,"　日本語　","nDispPosition_Yjp","40px","right","value = numberReplace(value)");
                nDispPisition_Yjp.style.display = "inline-block";
                var txtPxJp = document.createElement("span");
                txtPxJp.textContent = " px";
                nDispPisition_Yjp.appendChild(txtPxJp);
                details.appendChild(nDispPisition_Yjp);
                // 画像-表示位置_Y軸 英語
                var nDispPisition_Yen = textFieldCreate(tmpline,"　英語　","nDispPosition_Yen","40px","right","value = numberReplace(value)");
                nDispPisition_Yen.style.display = "inline-block";
                var txtPxEn = document.createElement("span");
                txtPxEn.textContent = " px";
                nDispPisition_Yen.appendChild(txtPxEn);
                details.appendChild(nDispPisition_Yen);

                // 改行
                details.appendChild(document.createElement("br"));

                // 幅 タイトル
                var nWidth_title = document.createElement("span");
                nWidth_title.innerHTML = "幅　　　　　　　　&nbsp;&nbsp;";
                nWidth_title.style.left = "120px";
                nWidth_title.style.position = "relative";
                details.appendChild(nWidth_title);
                // 幅 日本語
                var nWidthjp = textFieldCreate(tmpline,"　日本語　","nWidthjp","40px","right","value = numberReplace(value)");
                nWidthjp.style.display = "inline-block";
                var txtPxJp = document.createElement("span");
                txtPxJp.textContent = " px";
                nWidthjp.appendChild(txtPxJp);
                details.appendChild(nWidthjp);
                // 幅 英語
                var nWidthen = textFieldCreate(tmpline,"　英語　","nWidthen","40px","right","value = numberReplace(value)");
                nWidthen.style.display = "inline-block";
                var txtPxEn = document.createElement("span");
                txtPxEn.textContent = " px";
                nWidthen.appendChild(txtPxEn);
                details.appendChild(nWidthen);

                // 改行
                details.appendChild(document.createElement("br"));

                // 高さ タイトル
                var nHeight_title = document.createElement("span");
                nHeight_title.innerHTML = "高さ　　　　　　　&nbsp;&nbsp;";
                nHeight_title.style.left = "120px";
                nHeight_title.style.position = "relative";
                details.appendChild(nHeight_title);
                // 高さ 日本語
                var nHeightjp = textFieldCreate(tmpline,"　日本語　","nHeightjp","40px","right","value = numberReplace(value)");
                nHeightjp.style.display = "inline-block";
                var txtPxJp = document.createElement("span");
                txtPxJp.textContent = " px";
                nHeightjp.appendChild(txtPxJp);
                details.appendChild(nHeightjp);
                // 高さ 英語
                var nHeighten = textFieldCreate(tmpline,"　英語　","nHeighten","40px","right","value = numberReplace(value)");
                nHeighten.style.display = "inline-block";
                var txtPxEn = document.createElement("span");
                txtPxEn.textContent = " px";
                nHeighten.appendChild(txtPxEn);
                details.appendChild(nHeighten);

                // 改行
                details.appendChild(document.createElement("br"));

                // 高さ タイトル
                var nDispSize_title = document.createElement("span");
                nDispSize_title.innerHTML = "表示サイズ　　　　&nbsp;&nbsp;";
                nDispSize_title.style.left = "120px";
                nDispSize_title.style.position = "relative";
                details.appendChild(nDispSize_title);
                // 高さ 日本語
                var nDispSizejp = textFieldCreate(tmpline,"　日本語　","nDispSizejp","40px","right","value = numberReplace(value)");
                nDispSizejp.style.display = "inline-block";
                var txtPxJp = document.createElement("span");
                txtPxJp.textContent = " px";
                nDispSizejp.appendChild(txtPxJp);
                details.appendChild(nDispSizejp);
                // 高さ 英語
                var nDispSizeen = textFieldCreate(tmpline,"　英語　","nDispSizeen","40px","right","value = numberReplace(value)");
                nDispSizeen.style.display = "inline-block";
                var txtPxEn = document.createElement("span");
                txtPxEn.textContent = " px";
                nDispSizeen.appendChild(txtPxEn);
                details.appendChild(nDispSizeen);

                // 改行
                details.appendChild(document.createElement("br"));

                // // 透過-セット
                // details.appendChild(checkBoxCreate(tmpline,"透過　　　&nbsp;","dOpacity"));

            }
            else if(layoutTab_general_map[tmpline]["nDispType"] == "4"){
                // 背景画像の場合
                // 背景画像-タイトル-セット
                details.appendChild(titleCreate(tmpline,false,false));
                var reg = new RegExp(/^[\d_]*$/);
                if(layoutTab_general_map[tmpline]["nDispId"].length < 5){
                    // 継承画面プルダウン-セット
                    var tmpExtendsBgImgList = jQuery.extend(true, {}, extendsBgImgList);
                    delete tmpExtendsBgImgList[tmpline];
                    var nDispSizejp = pullDownFieldCreate(tmpline,"画像継承先画面　","cDefaultImagePath","300px","left",tmpExtendsBgImgList);
                    nDispSizejp.style.display = "inline-block";
                    var txtPxJp = document.createElement("span");
                    txtPxJp.textContent = "   ";
                    nDispSizejp.appendChild(txtPxJp);
                    details.appendChild(nDispSizejp);

                    if(extendsBgImgList[layoutTab_general_map[tmpline]["cDefaultImagePath"]] == null
                        && reg.test(layoutTab_general_map[tmpline]["cDefaultImagePath"])){
                        var warnMsg = document.createElement("div");
                        warnMsg.textContent = "※継承先の画面削除を検知しました。プルダウンを選択し再保存して下さい。";
                        warnMsg.style.color = "red";
                        warnMsg.style.position = "relative";
                        warnMsg.style.left = "120px";
                        warnMsg.style.top = "10px";
                        warnMsg.style.height = "30px";
                        details.appendChild(warnMsg);

                        var menubookCd = document.getElementById("layout_menubooks").value;
                        var dispId = layoutTab_general_map[tmpline]["nDispId"];
                        var itemId = layoutTab_general_map[tmpline]["nItemId"];
                        var path = "images/level/"+menubookCd+"/"+dispId+"/"+dispId+"_"+itemId+".png"

                        layoutTab_general_map[tmpline]["cDefaultImagePath"] = path;
                    }
                }

                if(!(reg.test(layoutTab_general_map[tmpline]["cDefaultImagePath"]))){
                    // ボタン-画像編集タグセット
                    details.appendChild(imgTableCreate(tmpline));
                }
            }
            else if(layoutTab_general_map[tmpline]["nDispType"] == "7"){
                // メニュータイトルの場合
                // メニュータイトル タイトル
                details.appendChild(titleCreate(tmpline,false,false));

                var nDispSizeen = textFieldCreate(tmpline,"日本語　","cTextjp","150px","left","");
                nDispSizeen.style.display = "inline-block";
                var txtPxEn = document.createElement("span");
                txtPxEn.textContent = "";
                nDispSizeen.appendChild(txtPxEn);
                details.appendChild(nDispSizeen);

                // 改行
                details.appendChild(document.createElement("br"));

                var nDispSizeen = textFieldCreate(tmpline,"英語　　","cTexten","150px","left","");
                nDispSizeen.style.display = "inline-block";
                var txtPxEn = document.createElement("span");
                txtPxEn.textContent = "";
                nDispSizeen.appendChild(txtPxEn);
                details.appendChild(nDispSizeen);

                // 改行
                details.appendChild(document.createElement("br"));
            }
            else if(layoutTab_general_map[tmpline]["nDispType"] == "8"){
                // コップ画像の場合
                // コップ画像 タイトル
                details.appendChild(titleCreate(tmpline,false,false));
                // コップ画像-画像編集タグセット
                details.appendChild(imgTableSingleCreate(tmpline));
            }
            else if(layoutTab_general_map[tmpline]["nDispType"] == "9"){
                // コップ背景画像の場合
                // コップ背景画像 タイトル
                details.appendChild(titleCreate(tmpline,false,false));
                // コップ背景画像-画像編集タグセット
                details.appendChild(imgTableSingleCreate(tmpline));
            }
            else if(layoutTab_general_map[tmpline]["nDispType"] == "6"){
                // サイドリンクバーの場合
                // 別ループで処理
            }
            else if(layoutTab_general_map[tmpline]["nDispType"] == "10"){
                // 遷移先候補画面の場合
                // 遷移先候補画面 タイトル
                details.appendChild(titleCreate(tmpline,false,false));

                var tmpDispIdList = jQuery.extend(true, {}, dispIdList);
                tmpDispIdList[-1] = "未設定";

                for(var i=1; i<=5;i++){
                    // 太さ 英語
                    var nDispSizeen = pullDownFieldCreate(tmpline,"遷移先候補画面"+i+"　","nAfDispId"+i,"300px","left",tmpDispIdList);
                    nDispSizeen.style.display = "inline-block";
                    var txtPxEn = document.createElement("span");
                    txtPxEn.textContent = "   ";
                    nDispSizeen.appendChild(txtPxEn);
                    details.appendChild(nDispSizeen);

                    // 改行
                    details.appendChild(document.createElement("br"));
                }
            }
        }
    }
    // サイドリンクバーデータ項目を生成
    fstFlg = true;
    for(tmpline in layoutTab_general_map) {
        if(menubookCd == layoutTab_general_map[tmpline]["nMenuBookCode"]
        && screenId == layoutTab_general_map[tmpline]["nDispId"]){
            // 対象画面以外スキップ
                // 初回行のみの処理
                if(layoutTab_general_map[tmpline]["nDispId"].length < 5 && layoutTab_general_map[tmpline]["nDetailDispType"] == "5"){
                   if(fstFlg){
                        // 現状なし
                    }
                }

            if(layoutTab_general_map[tmpline]["nDispType"] == "6"){
                // サイドリンクバー タイトル
                details.appendChild(titleCreate(tmpline,false,false));
                // サイドリンクバー 選択プルダウンセット
                details.appendChild(pullDownFieldCreate(tmpline,"プリセット名　","nSideLinkId","200px","left",sideLinkIdList));
            }
        }
    }
    // 項目追加ボタンのセット
    if(layoutTab_general_map[fstline]["nDispId"] != "10002"
    && layoutTab_general_map[fstline]["nDispId"] != "10003"){
        var addItemBtn_div = document.createElement("div");
        addItemBtn_div.style.marginTop = "40px";
        addItemBtn_div.style.position = "relative";
        addItemBtn_div.style.left = "100px";

        var addItemBtn_div_select = document.createElement("select");
        addItemBtn_div_select.id = "addItemBtn";
        addItemBtn_div_select.style.position = "relative";
        addItemBtn_div_select.style.left = "0px";
        addItemBtn_div_select.style.height = "30px";
        addItemBtn_div_select.style.width = "120px";

        var optionArray = {1:"遷移ボタン",2:"テキスト文言",3:"画像",5:"商品ボタン"};
        if(layoutTab_general_map[fstline]["nDetailDispType"] != "5"){
            // ボタン追加は階層画面の場合のみ可能とする
            optionArray = {2:"テキスト文言",3:"画像"};
        }
        if(layoutTab_general_map[fstline]["nDispId"] == "10001"){
            // 人数入力画面の場合
            optionArray = {3:"画像"};
        }
        else if(layoutTab_general_map[fstline]["nDispId"] == "10000"){
            // TOP画面の場合
            optionArray = {1:"遷移ボタン",2:"テキスト文言",3:"画像"};
        }
        for(var oa in optionArray){
            var addItemBtn_div_select_option = document.createElement("option");
            addItemBtn_div_select_option.value = oa;
            addItemBtn_div_select_option.textContent = optionArray[oa];
            addItemBtn_div_select.appendChild(addItemBtn_div_select_option);
        }

        addItemBtn_div.appendChild(addItemBtn_div_select);
        var addItemBtn_div_input = document.createElement("input");
        addItemBtn_div_input.type = "button";
        addItemBtn_div_input.setAttribute("onclick","addItemBtn();");
        addItemBtn_div_input.classList.add("m-btn");
        addItemBtn_div_input.classList.add("layoutEdit-item-add");
        addItemBtn_div_input.value = "項目追加";
        addItemBtn_div_input.style.marginLeft = "30px";
        addItemBtn_div.appendChild(addItemBtn_div_input);
        details.appendChild(addItemBtn_div);
    }


    // ファイル読み込み機能適用
    $(function(){
        $('.img_cng').on('change', function (e) {
            getId = "#"+e.target.id.replace("_cng","");
            var reader = new FileReader();
            reader.onload = function (e) {
                // 項目内の画像表示に反映
                $(getId).attr('src', e.target.result);
                // 項目追加時にリセットされないようmapに画像データを残す
                var getDispItemDataJp = getId.replace("#levelItem_","").replace("_img_jp","").split("_");
                var getDispItemDataEn = getId.replace("#levelItem_","").replace("_img_en","").split("_");
                var getMenuBookCd = document.getElementById("layout_menubooks").value;
                for(var ck in layoutTab_general_map){
                    if(layoutTab_general_map[ck]["nMenuBookCode"] == getMenuBookCd
                        && layoutTab_general_map[ck]["nDispId"] == getDispItemDataJp[0]
                        && layoutTab_general_map[ck]["nItemId"] == getDispItemDataJp[1]
                        && getDispItemDataJp.length == 2){
                            layoutTab_general_map[ck]["tmpcDefaultImagePathJp"] = e.target.result;
                            break;
                    }
                    if(layoutTab_general_map[ck]["nMenuBookCode"] == getMenuBookCd
                        && layoutTab_general_map[ck]["nDispId"] == getDispItemDataEn[0]
                        && layoutTab_general_map[ck]["nItemId"] == getDispItemDataEn[1]
                        && getDispItemDataEn.length == 2){
                            layoutTab_general_map[ck]["tmpcDefaultImagePathEn"] = e.target.result;
                            break;
                    }
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        });
    });

    // プレビュー反映
    layoutTabPrev();
}

/**
 * 画像アップロード項目タグ生成処理(多言語)
 * @param key値(layoutTab_general_map)
 * return tableタグ
 */
function imgTableCreate(tmpline){
    // 背景画像-ファイルアップロード日本語
    var en_order_id = "levelItem_"+layoutTab_general_map[tmpline]["nDispId"]+"_"+layoutTab_general_map[tmpline]["nItemId"];
    // 画像
    var table_image = document.createElement("table");
    table_image.classList.add("layout_tab-items_onedown");
    table_image.border = "1";
    table_image.cellSpacing = "0";
    table_image.cellpadding = "5";
    table_image.bordercolor = "#333333";
    table_image.style.lineHeight = "20px";
    table_image.style.marginTop = "10px";
    table_image.width = "410px";

    // 画像-タイトルテキスト行
    var tr_title_text = document.createElement("tr");
    // 画像-タイトルテキスト行-日本語列
    var td_title_text_jp = document.createElement("td");
    td_title_text_jp.bgcolor = "#FFFFFF";
    td_title_text_jp.valign = "top";
    td_title_text_jp.height = "40px";
    td_title_text_jp.width = "200px";
    // if(menubookCd != '99999'){
        // 画像-タイトルテキスト行-日本語列-削除
        var span_delete = document.createElement("span");
        span_delete.textContent = "削除　";
        var input_delete_ckBox = document.createElement("input");
        input_delete_ckBox.id = en_order_id+"_img_jp_delete";
        input_delete_ckBox.type = "checkbox";
        if(layoutTab_general_map[tmpline]["imgDelFlgjp"] != null){
            input_delete_ckBox.checked = layoutTab_general_map[tmpline]["imgDelFlgjp"];
        }
        input_delete_ckBox.setAttribute("onchange","delCheckBox('"+en_order_id+"','jp',this)");
        
        span_delete.appendChild(input_delete_ckBox);
        td_title_text_jp.innerHTML = "日本語<br>";
        td_title_text_jp.appendChild(span_delete);
    // }else{
    //     td_title_text_jp.innerHTML = "日本語<br>　";
    // }
    tr_title_text.appendChild(td_title_text_jp);

    // 画像-タイトルテキスト行-英語列
    var td_title_text_en = document.createElement("td");
    td_title_text_en.bgcolor = "#FFFFFF";
    td_title_text_en.valign = "top";
    td_title_text_en.height = "40px";
    td_title_text_en.width = "200px";


    // if(menubookCd != '99999'){
        // 画像-タイトルテキスト行-英語列-削除
        var span_delete = document.createElement("span");
        span_delete.textContent = "削除　";
        var input_delete_ckBox = document.createElement("input");
        input_delete_ckBox.id = en_order_id+"_img_en_delete";
        input_delete_ckBox.type = "checkbox";
        // input_delete_ckBox.onchange = "delCheckBox("+en_order_id+",en,this)";
        if(layoutTab_general_map[tmpline]["imgDelFlgen"] != null){
            input_delete_ckBox.checked = layoutTab_general_map[tmpline]["imgDelFlgen"];
        }
        input_delete_ckBox.setAttribute("onchange","delCheckBox('"+en_order_id+"','en',this)");
        span_delete.appendChild(input_delete_ckBox);
        td_title_text_en.innerHTML = "英語<br>";
        td_title_text_en.appendChild(span_delete);
    // } else {
    //     td_title_text_en.innerHTML = "英語<br>　";
    // }
    tr_title_text.appendChild(td_title_text_en);
    table_image.appendChild(tr_title_text);

    // 画像-イメージ行
    var tr_image = document.createElement("tr");
    // 画像-イメージ行-日本語列
    var td_image_jp = document.createElement("td");
    td_image_jp.bgcolor = "#FFFFFF";
    td_image_jp.valign = "top";
    td_image_jp.height = "180px";
    td_image_jp.width = "200px";
    // 画像-イメージ行-日本語列-イメージタグ
    var img_image_jp_image = document.createElement("img");
    img_image_jp_image.id = en_order_id+"_img_jp";
    img_image_jp_image.classList.add("layout_tab_img_jp");
    img_image_jp_image.classList.add("layoutImgTag");

    if(layoutTab_general_map[tmpline]["tmpcDefaultImagePathJp"] != null){
        img_image_jp_image.src = layoutTab_general_map[tmpline]["tmpcDefaultImagePathJp"];
    } else {
        img_image_jp_image.src = layoutTab_general_map[tmpline]["cDefaultImagePath"];
    }
    img_image_jp_image.setAttribute("tmp",layoutTab_general_map[tmpline]["cDefaultImagePath"]);

    img_image_jp_image.alt = "設定なし";
    img_image_jp_image.onerror = "this.style.display='none'";
    img_image_jp_image.onload = "this.style.display='block'";
    td_image_jp.appendChild(img_image_jp_image);
    tr_image.appendChild(td_image_jp);

    // 画像-イメージ行-英語列
    var td_image_en = document.createElement("td");
    td_image_en.bgcolor = "#FFFFFF";
    td_image_en.valign = "top";
    td_image_en.height = "180px";
    td_image_en.width = "200px";
    // 画像-イメージ行-英語列-イメージタグ
    var img_image_en_image = document.createElement("img");
    img_image_en_image.id = en_order_id+"_img_en";
    img_image_en_image.classList.add("layout_tab_img_en");
    img_image_en_image.classList.add("layoutImgTag");

    if(layoutTab_general_map[tmpline]["tmpcDefaultImagePathEn"] != null){
        img_image_en_image.src = layoutTab_general_map[tmpline]["tmpcDefaultImagePathEn"];
    } else {
        img_image_en_image.src = layoutTab_general_map[tmpline]["cDefaultImagePath"].replace("images/","images/otherLanguage/en/");
    }
    img_image_en_image.setAttribute("tmp",layoutTab_general_map[tmpline]["cDefaultImagePath"].replace("images/","images/otherLanguage/en/"));

    img_image_en_image.alt = "設定なし";
    img_image_en_image.onerror = "this.style.display='none'";
    img_image_en_image.onload = "this.style.display='block'";
    td_image_en.appendChild(img_image_en_image);
    tr_image.appendChild(td_image_en);
    table_image.appendChild(tr_image);

    // 画像-ボタン行
    var tr_btn = document.createElement("tr");
    // 画像-ボタン行-日本語列
    var td_btn_jp = document.createElement("td");
    td_btn_jp.bgcolor = "#FFFFFF";
    td_btn_jp.valign = "top";
    td_btn_jp.width = "200px";
    // 画像-ボタン行-日本語列-画像読み込みボタン
    var input_td_btn_jp_read = document.createElement("input");
    input_td_btn_jp_read.id = en_order_id+"_img_jp_cng";
    input_td_btn_jp_read.classList.add("img_cng");
    input_td_btn_jp_read.classList.add("layout_tab_img_cng");
    input_td_btn_jp_read.type = "file";
    input_td_btn_jp_read.name = "s_file";
    input_td_btn_jp_read.accept = "image/png";
    input_td_btn_jp_read.multiple = true;
    td_btn_jp.appendChild(input_td_btn_jp_read);
    // 画像-ボタン行-日本語列-プレビューボタン
    var button_td_btn_jp_prev = document.createElement("button");
    var btnId = "";
    if(layoutTab_general_map[tmpline]["nDispType"] == "4" && layoutTab_general_map[tmpline]["nDetailDispType"] == "2"){
        btnId = "_kids";
    } else if (layoutTab_general_map[tmpline]["nDispType"] == "4" && layoutTab_general_map[tmpline]["nDetailDispType"] == "3"){
        btnId = "_drink";
    } else if (layoutTab_general_map[tmpline]["nDispType"] == "4" && layoutTab_general_map[tmpline]["nDetailDispType"] == "4"){
        btnId = "_kids";
    } else if (layoutTab_general_map[tmpline]["nDispType"] == "8" && layoutTab_general_map[tmpline]["nDetailDispType"] == "3"){
        btnId = "_drinkcup";
    } else if (layoutTab_general_map[tmpline]["nDispType"] == "9" && layoutTab_general_map[tmpline]["nDetailDispType"] == "3"){
        btnId = "_drinkcupbg";
    } else if (layoutTab_general_map[tmpline]["nDispType"] == "4" && layoutTab_general_map[tmpline]["nDispId"] == "10002"){
        btnId = "_footer";
    }
    button_td_btn_jp_prev.id = en_order_id+"_img_jp_prevText"+btnId;
    button_td_btn_jp_prev.classList.add("layout_tab_img_prevTxt");
    button_td_btn_jp_prev.setAttribute("onclick","layoutTabPrevImg(this.id);");
    button_td_btn_jp_prev.textContent = "プレビュー";
    td_btn_jp.appendChild(button_td_btn_jp_prev);
    tr_btn.appendChild(td_btn_jp);


    // 画像-ボタン行-英語列
    var td_btn_en = document.createElement("td");
    td_btn_en.bgcolor = "#FFFFFF";
    td_btn_en.valign = "top";
    td_btn_en.width = "200px";
    // 画像-ボタン行-英語列-画像読み込みボタン
    var input_td_btn_en_read = document.createElement("input");
    input_td_btn_en_read.id = en_order_id+"_img_en_cng";
    input_td_btn_en_read.classList.add("img_cng");
    input_td_btn_en_read.classList.add("layout_tab_img_cng");
    input_td_btn_en_read.type = "file";
    input_td_btn_en_read.name = "s_file";
    input_td_btn_en_read.accept = "image/png";
    input_td_btn_en_read.multiple = true;
    td_btn_en.appendChild(input_td_btn_en_read);
    // 画像-ボタン行-英語列-プレビューボタン
    var button_td_btn_en_prev = document.createElement("button");
    var btnId = "";
    if(layoutTab_general_map[tmpline]["nDispType"] == "4" && layoutTab_general_map[tmpline]["nDetailDispType"] == "2"){
        btnId = "_kids";
    } else if (layoutTab_general_map[tmpline]["nDispType"] == "4" && layoutTab_general_map[tmpline]["nDetailDispType"] == "3"){
        btnId = "_drink";
    } else if (layoutTab_general_map[tmpline]["nDispType"] == "4" && layoutTab_general_map[tmpline]["nDetailDispType"] == "4"){
        btnId = "_kids";
    } else if (layoutTab_general_map[tmpline]["nDispType"] == "8" && layoutTab_general_map[tmpline]["nDetailDispType"] == "3"){
        btnId = "_drinkcup";
    } else if (layoutTab_general_map[tmpline]["nDispType"] == "9" && layoutTab_general_map[tmpline]["nDetailDispType"] == "3"){
        btnId = "_drinkcupbg";
    }
    button_td_btn_en_prev.id = en_order_id+"_img_en_prevText"+btnId;
    button_td_btn_en_prev.classList.add("layout_tab_img_prevTxt");
    button_td_btn_en_prev.setAttribute("onclick","layoutTabPrevImg(this.id);");
    button_td_btn_en_prev.textContent = "プレビュー";
    td_btn_en.appendChild(button_td_btn_en_prev);
    tr_btn.appendChild(td_btn_en);

    table_image.appendChild(tr_btn);

    return table_image;
}

/**
 * 項目追加ボタン処理
 */
function addItemBtn(){
    // 追加対象取得
    var addItemBtn =  document.getElementById("addItemBtn").value;
    // 一覧取得
    var details = document.getElementById("layout_detail");
    // 対象画面ID取得
    var tgtDispId = document.getElementById("layout_screens").value;
    // 対象メニューブック取得
    var tgtMenubookCd = document.getElementById("layout_menubooks").value;

    // 主キー採番
    var createKey = keyCdCreate();
    // 最大アイテムIDのキー取得
    var maxKey = keyCdGetMax(tgtDispId,tgtMenubookCd);
    // アイテムID採番
    var createItemId = parseInt(layoutTab_general_map[maxKey]["nItemId"]);
    createItemId++;
    console

    if(addItemBtn == null){
        return;
    } else if(addItemBtn == "1"){
        // 遷移ボタン
        layoutTab_general_map[createKey] = 
        {"cColorcn": '0',
        "cColoren": '0',
        "cColorjp": '0',
        "cColorkr": '0',
        "cCreateId": '0',
        "cDefaultImagePath": 'images/level/'+tgtMenubookCd+"/"+tgtDispId+'/'+tgtDispId+'_'+createItemId+'.png',
        "cDispName": layoutTab_general_map[maxKey]["cDispName"],
        "cItemName": '新規ボタン',
        "cTextcn": '',
        "cTexten": '',
        "cTextjp": '',
        "cTextkr": '',
        "cUpdateId": '0',
        "dOpacity": '1.0',
        "nAfDispId": '1',
        "nAfDispId1": '0',
        "nAfDispId2": '0',
        "nAfDispId3": '0',
        "nAfDispId4": '0',
        "nAfDispId5": '0',
        "nDefaultFlg": '0',
        "nDetailDispType": layoutTab_general_map[maxKey]["nDetailDispType"],
        "nDispFlg": '1',
        "nDispId": tgtDispId,
        "nDispMenuType": layoutTab_general_map[maxKey]["nDispMenuType"],
        "nDispPosition_Xcn": '0',
        "nDispPosition_Xen": '0',
        "nDispPosition_Xjp": '0',
        "nDispPosition_Xkr": '0',
        "nDispPosition_Ycn": '0',
        "nDispPosition_Yen": '0',
        "nDispPosition_Yjp": '0',
        "nDispPosition_Ykr": '0',
        "nDispSizecn": '100',
        "nDispSizeen": '100',
        "nDispSizejp": '100',
        "nDispSizekr": '100',
        "nDispType": '1',
        "nFontSizecn": '0',
        "nFontSizeen": '0',
        "nFontSizejp": '0',
        "nFontSizekr": '0',
        "nFontWeightcn": '0',
        "nFontWeighten": '0',
        "nFontWeightjp": '0',
        "nFontWeightkr": '0',
        "nGoodsCode": '0',
        "nHeightcn": '200',
        "nHeighten": '200',
        "nHeightjp": '200',
        "nHeightkr": '200',
        "nHierarchyCode": createKey,
        "nItemId": createItemId,
        "nMenuBookCode": tgtMenubookCd,
        "nSideLinkId": '0',
        "nSoldOutIcon_condition_cd": '',
        "nSoldOutIcon_condition_type": '',
        "nSoldOutIcon_height": '100',
        "nSoldOutIcon_radius": '0',
        "nSoldOutIcon_width": '100',
        "nSoldOutIcon_X": '0',
        "nSoldOutIcon_Y": '0',
        "nVerticalFlg": '0',
        "nWidthcn": '200',
        "nWidthen": '200',
        "nWidthjp": '200',
        "nWidthkr": '200',
        "tCreateTime": '0000-00-00 00:00:00',
        "tUpdateTime": '0000-00-00 00:00:00'};
        dispBtn(false);
    } else if(addItemBtn == "2"){
        // テキスト文言
        layoutTab_general_map[createKey] = 
        {"cColorcn": 'white',
        "cColoren": 'white',
        "cColorjp": 'white',
        "cColorkr": 'white',
        "cCreateId": '0',
        "cDefaultImagePath": '',
        "cDispName": layoutTab_general_map[maxKey]["cDispName"],
        "cItemName": '新規テキスト',
        "cTextcn": '新規テキスト',
        "cTexten": '新規テキスト',
        "cTextjp": '新規テキスト',
        "cTextkr": '新規テキスト',
        "nItaliccn": '0',
        "nItalicen": '0',
        "nItalicjp": '0',
        "nItalickr": '0',
        "cUpdateId": '0',
        "dOpacity": '1.0',
        "nAfDispId": '0',
        "nAfDispId1": '0',
        "nAfDispId2": '0',
        "nAfDispId3": '0',
        "nAfDispId4": '0',
        "nAfDispId5": '0',
        "nDefaultFlg": '0',
        "nDetailDispType": layoutTab_general_map[maxKey]["nDetailDispType"],
        "nDispFlg": '1',
        "nDispId": tgtDispId,
        "nDispMenuType": layoutTab_general_map[maxKey]["nDispMenuType"],
        "nDispPosition_Xcn": '0',
        "nDispPosition_Xen": '0',
        "nDispPosition_Xjp": '0',
        "nDispPosition_Xkr": '0',
        "nDispPosition_Ycn": '0',
        "nDispPosition_Yen": '0',
        "nDispPosition_Yjp": '0',
        "nDispPosition_Ykr": '0',
        "nDispSizecn": '100',
        "nDispSizeen": '100',
        "nDispSizejp": '100',
        "nDispSizekr": '100',
        "nDispType": '2',
        "nFontSizecn": '50',
        "nFontSizeen": '50',
        "nFontSizejp": '50',
        "nFontSizekr": '50',
        "nFontWeightcn": '500',
        "nFontWeighten": '500',
        "nFontWeightjp": '500',
        "nFontWeightkr": '500',
        "nGoodsCode": '0',
        "nHeightcn": '50',
        "nHeighten": '50',
        "nHeightjp": '50',
        "nHeightkr": '50',
        "nHierarchyCode": createKey,
        "nItemId": createItemId,
        "nMenuBookCode": tgtMenubookCd,
        "nSideLinkId": '0',
        "nSoldOutIcon_condition_cd": '',
        "nSoldOutIcon_condition_type": '',
        "nSoldOutIcon_height": '0',
        "nSoldOutIcon_radius": '0',
        "nSoldOutIcon_width": '0',
        "nSoldOutIcon_X": '0',
        "nSoldOutIcon_Y": '0',
        "nVerticalFlg": '0',
        "nWidthcn": '300',
        "nWidthen": '300',
        "nWidthjp": '300',
        "nWidthkr": '300',
        "tCreateTime": '0000-00-00 00:00:00',
        "tUpdateTime": '0000-00-00 00:00:00'};
        dispBtn(false);
    } else if(addItemBtn == "3"){
        // 画像
        layoutTab_general_map[createKey] = 
        {"cColorcn": '0',
        "cColoren": '0',
        "cColorjp": '0',
        "cColorkr": '0',
        "cCreateId": '0',
        "cDefaultImagePath": 'images/level/'+tgtMenubookCd+"/"+tgtDispId+'/'+tgtDispId+'_'+createItemId+'.png',
        "cDispName": layoutTab_general_map[maxKey]["cDispName"],
        "cItemName": '新規画像',
        "cTextcn": '',
        "cTexten": '',
        "cTextjp": '',
        "cTextkr": '',
        "nItaliccn": '0',
        "nItalicen": '0',
        "nItalicjp": '0',
        "nItalickr": '0',
        "cUpdateId": '0',
        "dOpacity": '1.0',
        "nAfDispId": '1',
        "nAfDispId1": '0',
        "nAfDispId2": '0',
        "nAfDispId3": '0',
        "nAfDispId4": '0',
        "nAfDispId5": '0',
        "nDefaultFlg": '0',
        "nDetailDispType": layoutTab_general_map[maxKey]["nDetailDispType"],
        "nDispFlg": '1',
        "nDispId": tgtDispId,
        "nDispMenuType": layoutTab_general_map[maxKey]["nDispMenuType"],
        "nDispPosition_Xcn": '0',
        "nDispPosition_Xen": '0',
        "nDispPosition_Xjp": '0',
        "nDispPosition_Xkr": '0',
        "nDispPosition_Ycn": '0',
        "nDispPosition_Yen": '0',
        "nDispPosition_Yjp": '0',
        "nDispPosition_Ykr": '0',
        "nDispSizecn": '100',
        "nDispSizeen": '100',
        "nDispSizejp": '100',
        "nDispSizekr": '100',
        "nDispType": '3',
        "nFontSizecn": '0',
        "nFontSizeen": '0',
        "nFontSizejp": '0',
        "nFontSizekr": '0',
        "nFontWeightcn": '0',
        "nFontWeighten": '0',
        "nFontWeightjp": '0',
        "nFontWeightkr": '0',
        "nGoodsCode": '0',
        "nHeightcn": '200',
        "nHeighten": '200',
        "nHeightjp": '200',
        "nHeightkr": '200',
        "nHierarchyCode": createKey,
        "nItemId": createItemId,
        "nMenuBookCode": tgtMenubookCd,
        "nSideLinkId": '0',
        "nSoldOutIcon_condition_cd": '',
        "nSoldOutIcon_condition_type": '',
        "nSoldOutIcon_height": '0',
        "nSoldOutIcon_radius": '0',
        "nSoldOutIcon_width": '0',
        "nSoldOutIcon_X": '0',
        "nSoldOutIcon_Y": '0',
        "nVerticalFlg": '0',
        "nWidthcn": '200',
        "nWidthen": '200',
        "nWidthjp": '200',
        "nWidthkr": '200',
        "tCreateTime": '0000-00-00 00:00:00',
        "tUpdateTime": '0000-00-00 00:00:00'};
        dispBtn(false);
    } else if(addItemBtn == "5"){
        // 商品ボタン
        // 画像
        layoutTab_general_map[createKey] = 
        {"cColorcn": '0',
        "cColoren": '0',
        "cColorjp": '0',
        "cColorkr": '0',
        "cCreateId": '0',
        "cDefaultImagePath": 'images/level/'+tgtMenubookCd+'/'+tgtDispId+'/'+tgtDispId+'_'+createItemId+'.png',
        "cDispName": layoutTab_general_map[maxKey]["cDispName"],
        "cItemName": '新規商品',
        "cTextcn": '',
        "cTexten": '',
        "cTextjp": '',
        "cTextkr": '',
        "nItaliccn": '0',
        "nItalicen": '0',
        "nItalicjp": '0',
        "nItalickr": '0',
        "cUpdateId": '0',
        "dOpacity": '1.0',
        "nAfDispId": '1',
        "nAfDispId1": '0',
        "nAfDispId2": '0',
        "nAfDispId3": '0',
        "nAfDispId4": '0',
        "nAfDispId5": '0',
        "nDefaultFlg": '0',
        "nDetailDispType": layoutTab_general_map[maxKey]["nDetailDispType"],
        "nDispFlg": '1',
        "nDispId": tgtDispId,
        "nDispMenuType": layoutTab_general_map[maxKey]["nDispMenuType"],
        "nDispPosition_Xcn": '0',
        "nDispPosition_Xen": '0',
        "nDispPosition_Xjp": '0',
        "nDispPosition_Xkr": '0',
        "nDispPosition_Ycn": '0',
        "nDispPosition_Yen": '0',
        "nDispPosition_Yjp": '0',
        "nDispPosition_Ykr": '0',
        "nDispSizecn": '100',
        "nDispSizeen": '100',
        "nDispSizejp": '100',
        "nDispSizekr": '100',
        "nDispType": '5',
        "nFontSizecn": '0',
        "nFontSizeen": '0',
        "nFontSizejp": '0',
        "nFontSizekr": '0',
        "nFontWeightcn": '0',
        "nFontWeighten": '0',
        "nFontWeightjp": '0',
        "nFontWeightkr": '0',
        "nGoodsCode": '0',
        "nHeightcn": '200',
        "nHeighten": '200',
        "nHeightjp": '200',
        "nHeightkr": '200',
        "nHierarchyCode": createKey,
        "nItemId": createItemId,
        "nMenuBookCode": tgtMenubookCd,
        "nSideLinkId": '0',
        "nSoldOutIcon_condition_cd": '',
        "nSoldOutIcon_condition_type": '',
        "nSoldOutIcon_height": '100',
        "nSoldOutIcon_radius": '0',
        "nSoldOutIcon_width": '100',
        "nSoldOutIcon_X": '0',
        "nSoldOutIcon_Y": '0',
        "nVerticalFlg": '0',
        "nWidthcn": '200',
        "nWidthen": '200',
        "nWidthjp": '200',
        "nWidthkr": '200',
        "tCreateTime": '0000-00-00 00:00:00',
        "tUpdateTime": '0000-00-00 00:00:00'};
        dispBtn(false);
    }
}

/**
 * 画像アップロード項目タグ生成処理
 * @param key値(layoutTab_general_map)
 * return tableタグ
 */
 function imgTableSingleCreate(tmpline){
    // 背景画像-ファイルアップロード日本語
    var en_order_id = "levelItem_"+layoutTab_general_map[tmpline]["nDispId"]+"_"+layoutTab_general_map[tmpline]["nItemId"];
    // 画像
    var table_image = document.createElement("table");
    table_image.classList.add("layout_tab-items_onedown");
    table_image.border = "1";
    table_image.cellSpacing = "0";
    table_image.cellpadding = "5";
    table_image.bordercolor = "#333333";
    table_image.style.lineHeight = "20px";
    table_image.style.marginTop = "10px";
    table_image.width = "205px";

    // 画像-タイトルテキスト行
    var tr_title_text = document.createElement("tr");
    // 画像-タイトルテキスト行-日本語列
    var td_title_text_jp = document.createElement("td");
    td_title_text_jp.bgcolor = "#FFFFFF";
    td_title_text_jp.valign = "top";
    td_title_text_jp.height = "40px";
    td_title_text_jp.width = "200px";
    // if(menubookCd != '99999'){
        // 画像-タイトルテキスト行-日本語列-削除
        var span_delete = document.createElement("span");
        span_delete.textContent = "削除　";
        var input_delete_ckBox = document.createElement("input");
        input_delete_ckBox.id = en_order_id+"_img_jp_delete";
        input_delete_ckBox.type = "checkbox";
        input_delete_ckBox.setAttribute("onchange","delCheckBox('"+en_order_id+"','jp',this)");
        
        span_delete.appendChild(input_delete_ckBox);
        td_title_text_jp.innerHTML = "言語共通<br>";
        td_title_text_jp.appendChild(span_delete);
    // }else{
    //     td_title_text_jp.innerHTML = "日本語<br>　";
    // }
    tr_title_text.appendChild(td_title_text_jp);
    table_image.appendChild(tr_title_text);

    // 画像-イメージ行
    var tr_image = document.createElement("tr");
    // 画像-イメージ行-日本語列
    var td_image_jp = document.createElement("td");
    td_image_jp.bgcolor = "#FFFFFF";
    td_image_jp.valign = "top";
    td_image_jp.height = "180px";
    td_image_jp.width = "200px";
    // 画像-イメージ行-日本語列-イメージタグ
    var img_image_jp_image = document.createElement("img");
    img_image_jp_image.id = en_order_id+"_img_jp";
    img_image_jp_image.classList.add("layout_tab_img_jp");
    img_image_jp_image.classList.add("layoutImgTag");

    img_image_jp_image.src = layoutTab_general_map[tmpline]["cDefaultImagePath"];
    img_image_jp_image.setAttribute("tmp",layoutTab_general_map[tmpline]["cDefaultImagePath"]);

    img_image_jp_image.alt = "設定なし";
    img_image_jp_image.onerror = "this.style.display='none'";
    img_image_jp_image.onload = "this.style.display='block'";
    td_image_jp.appendChild(img_image_jp_image);
    tr_image.appendChild(td_image_jp);

    table_image.appendChild(tr_image);

    // 画像-ボタン行
    var tr_btn = document.createElement("tr");
    // 画像-ボタン行-日本語列
    var td_btn_jp = document.createElement("td");
    td_btn_jp.bgcolor = "#FFFFFF";
    td_btn_jp.valign = "top";
    td_btn_jp.width = "200px";
    // 画像-ボタン行-日本語列-画像読み込みボタン
    var input_td_btn_jp_read = document.createElement("input");
    input_td_btn_jp_read.id = en_order_id+"_img_jp_cng";
    input_td_btn_jp_read.classList.add("img_cng");
    input_td_btn_jp_read.classList.add("layout_tab_img_cng");
    input_td_btn_jp_read.type = "file";
    input_td_btn_jp_read.name = "s_file";
    input_td_btn_jp_read.accept = "image/png";
    input_td_btn_jp_read.multiple = true;
    td_btn_jp.appendChild(input_td_btn_jp_read);
    // 画像-ボタン行-日本語列-プレビューボタン
    var button_td_btn_jp_prev = document.createElement("button");
    var btnId = "";
    if(layoutTab_general_map[tmpline]["nDispType"] == "4" && layoutTab_general_map[tmpline]["nDetailDispType"] == "2"){
        btnId = "_kids";
    } else if (layoutTab_general_map[tmpline]["nDispType"] == "4" && layoutTab_general_map[tmpline]["nDetailDispType"] == "3"){
        btnId = "_drink";
    } else if (layoutTab_general_map[tmpline]["nDispType"] == "4" && layoutTab_general_map[tmpline]["nDetailDispType"] == "4"){
        btnId = "_kids";
    } else if (layoutTab_general_map[tmpline]["nDispType"] == "8" && layoutTab_general_map[tmpline]["nDetailDispType"] == "3"){
        btnId = "_drinkcup";
    } else if (layoutTab_general_map[tmpline]["nDispType"] == "9" && layoutTab_general_map[tmpline]["nDetailDispType"] == "3"){
        btnId = "_drinkcupbg";
    }
    button_td_btn_jp_prev.id = en_order_id+"_img_jp_prevText"+btnId;
    button_td_btn_jp_prev.classList.add("layout_tab_img_prevTxt");
    button_td_btn_jp_prev.setAttribute("onclick","layoutTabPrevImg(this.id);");
    button_td_btn_jp_prev.textContent = "プレビュー";
    td_btn_jp.appendChild(button_td_btn_jp_prev);
    tr_btn.appendChild(td_btn_jp);

    table_image.appendChild(tr_btn);

    return table_image;
}

/**
 * 表示ONOFFタグ生成処理
 * @param key値(layoutTab_general_map)
 * @param タイトル
 * @param 対象カラム名
 * return タグ
 */
function checkBoxCreate(tmpline,tagTitle,clmName){
    var onOff_div = document.createElement("div");
    onOff_div.style.marginTop = "20px";
    onOff_div.style.position = "relative";
    onOff_div.style.left = "120px";

    // 表示ONOFF-タイトル
    onOff_div_span = document.createElement("span");
    onOff_div_span.innerHTML = tagTitle;

    onOff_div_input = document.createElement("input");
    onOff_div_input.style.left = "5px";
    onOff_div_input.type = "checkbox";
    if(clmName == "dOpacity"){
        onOff_div_input.checked = layoutTab_general_map[tmpline][clmName] == "0.0";
        onOff_div_input.setAttribute("onchange","layoutTab_general_map["+tmpline+"]['"+clmName+"'] = this.checked ? '0.0':'1.0';layoutTabPrev();");
    } else if(contains(clmName, "nItalic")){
        onOff_div_input.checked = layoutTab_general_map[tmpline][clmName] == "1";
        onOff_div_input.setAttribute("onchange","layoutTab_general_map["+tmpline+"]['"+clmName+"'] = this.checked ? '1':'0';layoutTabPrev();");
    } else {
        onOff_div_input.checked = layoutTab_general_map[tmpline][clmName] == "0";
        onOff_div_input.setAttribute("onchange","layoutTab_general_map["+tmpline+"]['"+clmName+"'] = this.checked ? '0':'1';layoutTabPrev();");
    }
    onOff_div_input.style.position = "relative";

    // 表示ONOFF-タグ合成
    onOff_div.appendChild(onOff_div_span);
    onOff_div.appendChild(onOff_div_input);

    return onOff_div;
}

/**
 * メニュー区分更新処理
 * @param 画面ID
 * @param 選択メニュー区分
 */
function goodsTypePullChange(dispId,value){
    for(var tmpline in layoutTab_general_map){
        if(layoutTab_general_map[tmpline]["nDispId"] == dispId){
            layoutTab_general_map[tmpline]["nDispMenuType"] = value;
        }
    }
    // プレビュー更新
    layoutTabPrev();
}

/**
 * タイトルタグ生成処理
 * @param key値(layoutTab_general_map)
 * @param タイトル編集可否
 * @param 項目削除ボタン有無
 * return タグ
 */
function titleCreate(tmpline,editFlg,deleteBtnFlg){
    if(editFlg){
        // 編集可の場合
        var div = document.createElement("div");
        div.style.marginTop = "20px";
        div.style.position = "relative";
        div.style.left = "100px";
        // div.style.maxWidth = "200px";

        // タイトル-タイトル
        div_span = document.createElement("span");
        div_span.textContent = "■";
        div.appendChild(div_span);

        div_input = document.createElement("input");
        div_input.type = "text";
        div_input.style.position = "relative";
        div_input.style.left = "0px";
        div_input.style.height = "20px";
        div_input.style.width = "300px";
        div_input.value = layoutTab_general_map[tmpline]["cItemName"];
        div_input.setAttribute("onchange","layoutTab_general_map["+tmpline+"]['cItemName'] = this.value");
        div_input.setAttribute("oninput","value=titleReplace(value)");
        div.appendChild(div_input);

        if(deleteBtnFlg){
            // 削除ボタン表示
            var div_input2 = document.createElement("input");
            div_input2.setAttribute("onclick","deleteItemBtn("+tmpline+");");
            div_input2.type = "button";
            div_input2.classList.add("m-btn");
            div_input2.classList.add("layoutEdit-item-delete");
            div_input2.value = "項目削除";
            div_input2.style.marginLeft = "30px";
            div.appendChild(div_input2);
        }

        return div;
    } else {
        // 編集不可の場合
        var div = document.createElement("div");
        div.style.marginTop = "20px";
        div.style.position = "relative";
        div.style.left = "100px";

        // タイトル-タイトル
        div_span = document.createElement("span");
        div_span.textContent = "■"+layoutTab_general_map[tmpline]["cItemName"];
        div.appendChild(div_span);

        if(deleteBtnFlg){
            // 削除ボタン表示
            var div_input2 = document.createElement("input");
            div_input2.setAttribute("onclick","deleteItemBtn("+tmpline+");");
            div_input2.type = "button";
            div_input2.classList.add("m-btn");
            div_input2.classList.add("layoutEdit-item-delete");
            div_input2.value = "項目削除";
            div_input2.style.marginLeft = "30px";
            div.appendChild(div_input2);
        }

        return div;
    }
}

/**
 * テキストフィールドタグ生成処理
 * @param key値(layoutTab_general_map)
 * @param 項目タイトル
 * @param 対象カラム名
 * @param テキストフィールド幅(pxまで含む文字列)
 * @param 文字の左右寄せ(right Or left)
 * @param oninput ※入力制限等の処理追加用
 * return タグ
 */
function textFieldCreate(tmpline,tagTitle,clmName,fWidth,textAlign,oninput){
    var div = document.createElement("div");
    div.style.marginTop = "20px";
    div.style.position = "relative";
    div.style.left = "120px";
    // div.style.maxWidth = "200px";

    // タイトル-タイトル
    div_span = document.createElement("span");
    div_span.innerHTML = tagTitle;
    div.appendChild(div_span);

    div_input = document.createElement("input");
    div_input.type = "text";
    div_input.style.position = "relative";
    div_input.style.left = "0px";
    div_input.style.height = "20px";
    div_input.style.width = fWidth;
    div_input.style.textAlign = textAlign;
    div_input.value = layoutTab_general_map[tmpline][clmName];
    div_input.setAttribute("oninput",oninput);
    div_input.setAttribute("onchange","layoutTab_general_map["+tmpline+"]['"+clmName+"'] = this.value;layoutTabPrev();");
    // div_input.setAttribute("oninput","value=titleReplace(value)");
    div.appendChild(div_input);

    return div;
}

/**
 * プルダウンフィールドタグ生成処理
 * @param key値(layoutTab_general_map)
 * @param 項目タイトル
 * @param 対象カラム名
 * @param テキストフィールド幅(pxまで含む文字列)
 * @param 文字の左右寄せ(right Or left)
 * @param オプション配列 ※例[{1:"小"},{2:"中"},{3:"大"}]
 * return タグ
 */
 function pullDownFieldCreate(tmpline,tagTitle,clmName,fWidth,textAlign,optionArray){
    var div = document.createElement("div");
    div.style.marginTop = "20px";
    div.style.position = "relative";
    div.style.left = "120px";
    // div.style.maxWidth = "200px";

    // タイトル-タイトル
    div_span = document.createElement("span");
    div_span.textContent = tagTitle;
    div.appendChild(div_span);

    var select = document.createElement("select");
    select.style.position = "relative";
    select.style.left = "0px";
    select.style.height = "30px";
    select.style.width = fWidth;
    select.style.textAlign = textAlign;
    select.value = layoutTab_general_map[tmpline][clmName];
    if("cDefaultImagePath" == clmName){
        // 背景画像の継承項目の場合は専用処理
        select.setAttribute("onchange","extendsBgImg("+tmpline+",this.value);");
    } else {
        select.setAttribute("onchange","layoutTab_general_map["+tmpline+"]['"+clmName+"'] = this.value;layoutTabPrev();");
    }

    for(var oa in optionArray){
        var option = document.createElement("option");
        option.value = oa;
        option.textContent = optionArray[oa];
        if(oa == layoutTab_general_map[tmpline][clmName]){
            option.selected = true;
        }
        select.appendChild(option);
    }

    div.appendChild(select);

    return div;
}

/**
 * 背景画像の継承プルダウン処理
 */
function extendsBgImg(tmpline,value){
    if(value == 0){
        var menubookCd = document.getElementById("layout_menubooks").value;
        var dispId = layoutTab_general_map[tmpline]["nDispId"];
        var itemId = layoutTab_general_map[tmpline]["nItemId"];
        var path = "images/level/"+menubookCd+"/"+dispId+"/"+dispId+"_"+itemId+".png"
        layoutTab_general_map[tmpline]["cDefaultImagePath"] = path;
    } else {
        layoutTab_general_map[tmpline]["cDefaultImagePath"] = value;
    }

    layoutTabPrev();
    dispBtn(false);
}

/**
 * タイトル不正文字置成処理
 * return 置換データ
 */
function titleReplace(value){
     return value.replace("'","").replace("_","").replace('"','');
}

/**
 * 数値以外入力制限処理
 * return 置換データ
 */
function numberReplace(value){
    value = value.replace(/[０-９]/g,s => String.fromCharCode(s.charCodeAt(0) - 65248)).replace(/\D/g,'');
    return value;
}

function delCheckBox(en_order_id,lang,elm){
    var getDispItemData = en_order_id.replace("levelItem_","").split("_");
    var getMenuBookCd = document.getElementById("layout_menubooks").value;
    document.getElementById(en_order_id+"_img_"+lang).setAttribute("del",elm.checked ? 1:0);
    for(var ck in layoutTab_general_map){
        if(layoutTab_general_map[ck]["nMenuBookCode"] == getMenuBookCd
            && layoutTab_general_map[ck]["nDispId"] == getDispItemData[0]
            && layoutTab_general_map[ck]["nItemId"] == getDispItemData[1]){
                layoutTab_general_map[ck]["imgDelFlg"+lang] = elm.checked;
                break;
        }
    }
}

/**
 * プレビュー反映処理
 */
function layoutTabPrev() {
    // 配列に最新情報取込
    // layoutTab_general_map_cpy = layoutTabArrayUpdate(layoutTab_general_map);
    layoutTab_general_map_cpy = layoutTab_general_map;
    console.log("プレビュー反映用配列生成完了");
    console.log(layoutTab_general_map_cpy);

    var guiPrevPost = function(map){
        var info = {
            'message_id': 'gui_prev',
            'message_body': map
        };
        postParent(info);
    }
    // エンタメに配列を連携
    guiPrevPost(layoutTab_general_map_cpy);
    console.log("プレビュー反映完了");
}
// 反映POST
var postParent = function(info){
    // window.parent.postMessage(info,'*');
    var postParent = document.querySelector('.prevDisp_class').contentWindow;
    postParent.postMessage(info, '*');
}

var getId = "";

/**
 * 配列反映処理
 * @param ボタンID
 */
function layoutTabArrayUpdate(layoutTab_general_map) {
    layoutTab_general_map_cpy = jQuery.extend(true, [], layoutTab_general_map);
    // メニューブックコード
    var menubookCd = document.getElementById("layout_menubooks").value;
    for(line in layoutTab_general_map_cpy) {
        // 表示ONOFFの反映
        var elem_hidden = document.getElementById(layoutTab_general_map_cpy[line]["cValue1"]+"_"+menubookCd+"_hidden");
        if(isNotEmpty(elem_hidden)){
            try{
                layoutTab_general_map_cpy[line]["cValue7"] = elem_hidden.checked ? '1':'0';
            }catch(e){
                console.log("レイアウトタブ-初期表示処理-表示-反映エラー-対象エレメント："+layoutTab_general_map_cpy[line]["cValue1"]);
            }
        }
        // 表示位置_Y軸の反映
        var elem_y = document.getElementById(layoutTab_general_map_cpy[line]["cValue1"]+"_"+menubookCd+"_y");
        if(isNotEmpty(elem_y)){
            try{
                layoutTab_general_map_cpy[line]["cValue2"] = parseInt(elem_y.value);
            }catch(e){
                layoutTab_general_map_cpy[line]["cValue2"] = parseInt(0);
                console.log("レイアウトタブ-初期表示処理-表示位置_Y軸-プレビュー反映エラー-対象エレメント："+layoutTab_general_map_cpy[line]["cValue1"])
            }
        }
        // 表示位置_X軸の反映
        var elem_x = document.getElementById(layoutTab_general_map_cpy[line]["cValue1"]+"_"+menubookCd+"_x");
        if(isNotEmpty(elem_x)){
            try{
                layoutTab_general_map_cpy[line]["cValue3"] = parseInt(elem_x.value);
            }catch(e){
                layoutTab_general_map_cpy[line]["cValue3"] = parseInt(0);
                console.log("レイアウトタブ-初期表示処理-表示位置_X軸-プレビュー反映エラー-対象エレメント："+layoutTab_general_map_cpy[line]["cValue1"])
            }
        }
        // 表示サイズの反映
        var elem_s = document.getElementById(layoutTab_general_map_cpy[line]["cValue1"]+"_"+menubookCd+"_s");
        if(isNotEmpty(elem_s)){
            try{
                layoutTab_general_map_cpy[line]["cValue4"] = parseInt(elem_s.value);
            }catch(e){
                layoutTab_general_map_cpy[line]["cValue4"] = parseInt(100);
                console.log("レイアウトタブ-初期表示処理-表示サイズ-プレビュー反映エラー-対象エレメント："+layoutTab_general_map_cpy[line]["cValue1"])
            }
        }

        // 設定有効化の反映
        var elem_active = document.getElementById(layoutTab_general_map_cpy[line]["cValue1"]+"_"+menubookCd+"_active");
        if(isNotEmpty(elem_active)){
            try{
                layoutTab_general_map_cpy[line]["cValue10"] = elem_active.checked ? '1':'0';
            }catch(e){
                // layoutTab_general_map_cpy[line]["cValue10"] = "-";
                console.log("レイアウトタブ-初期表示処理-設定有効化-プレビュー反映エラー-対象エレメント："+layoutTab_general_map_cpy[line]["cValue1"])
            }
        }

        // 表示順番の反映
        var elem_i = document.getElementById(layoutTab_general_map_cpy[line]["cValue1"]+"_"+menubookCd+"_i");
        if(isNotEmpty(elem_i)){
            try{
                layoutTab_general_map_cpy[line]["cValue13"] = parseInt(elem_i.value);
            }catch(e){
                layoutTab_general_map_cpy[line]["cValue13"] = "-";
                console.log("レイアウトタブ-初期表示処理-表示順番-プレビュー反映エラー-対象エレメント："+layoutTab_general_map_cpy[line]["cValue1"])
            }
        }
    }
    return layoutTab_general_map_cpy;
}

/**
 * プレビュー反映処理（画像）
 * @param ボタンID
 */
function layoutTabPrevImg(btnId) {
    console.log("画像プレビュー反映開始");
    var editBtnId = btnId;
    if(contains(btnId,"_kids")){
        editBtnId = "kids-bg";
    } else if(contains(btnId,"_drinkcupbg")){
        editBtnId = "drinkMain";
    } else if(contains(btnId,"_drinkcup")){
        editBtnId = "drink-cup";
    } else if(contains(btnId,"_drink")){
        editBtnId = "drink-bg";
    } else if(contains(btnId,"_footer")){
        editBtnId = "footer_bg";
    }
    // 画像表示タグを取得
    var imgTag = document.getElementById(btnId.replace("_prevText","").replace("_kids","").replace("_drinkcupbg","").replace("_drinkcup","").replace("_drink","").replace("_footer",""));
    // 画像のパスを取得
    var imgPath = imgTag.getAttribute("tmp");
    // 画像データを取得
    var img = imgTag.src;

    // 画像反映POST
    var guiPrevPost = function(btnId,imgPath,img){
        var editId = btnId.replace("_img_jp_prevText","").replace("_img_en_prevText","");
        // for(setMst in menubook_set_mst_map){
        //     editId = editId.replace("_"+menubook_set_mst_map[setMst]["nMenuBookCode"],"");
        // }
        // editId = editId.replace("_99999","");

        var info = {
            'message_id': 'gui_prev_img',
            'message_tgtId': editId,
            'message_path': imgPath,
            'message_data': img
        };
        postParent(info);
    }
    guiPrevPost(editBtnId,imgPath,img);
    console.log("画像プレビュー反映完了");
}

/**
 * インナータブ切替処理
 * @param 切替先タブID
 */
function cngLayoutInnerTab(cngTabId) {
    // インナータブ全非表示
    var allTab = document.getElementsByClassName("layout_inner_tab");
    for(var i = 0; i < allTab.length; i++){
        allTab[i].classList.add("is-hide");
    }
    // 選択タブ表示
    document.getElementById(cngTabId).classList.remove("is-hide");
}


/**
 * DB反映処理
 */
function layoutTabExecute() {
    // 主キーの採番
    var pKey = keyCdCreate();
    var sendFormatAll = "";
    var copyMenubookCd = document.getElementById("layout_menubooks").value;
    var copyDispId = document.getElementById("layout_screens").value;
    for(var lgm in layoutTab_general_map){
        if(layoutTab_general_map[lgm]["nMenuBookCode"] == copyMenubookCd && layoutTab_general_map[lgm]["nDispId"] == copyDispId){
            // コピー対象画面設定行の場合
            var sendFormat = baseSendFormat;
            sendFormat = sendFormat.replace("{nHierarchyCode}",pKey)
                        .replace("{nMenuBookCode}",layoutTab_general_map[lgm]["nMenuBookCode"])
                        .replace("{nDefaultFlg}",layoutTab_general_map[lgm]["nDefaultFlg"])
                        .replace("{nDispId}",layoutTab_general_map[lgm]["nDispId"])
                        .replace("{cDispName}","'"+layoutTab_general_map[lgm]["cDispName"]+"'")
                        .replace("{nItemId}",layoutTab_general_map[lgm]["nItemId"])
                        .replace("{cItemName}","'"+layoutTab_general_map[lgm]["cItemName"]+"'")
                        .replace("{nDispType}",layoutTab_general_map[lgm]["nDispType"])
                        .replace("{cDefaultImagePath}","'"+layoutTab_general_map[lgm]["cDefaultImagePath"]+"'")
                        .replace("{nDispPosition_Xjp}",layoutTab_general_map[lgm]["nDispPosition_Xjp"])
                        .replace("{nDispPosition_Xen}",layoutTab_general_map[lgm]["nDispPosition_Xen"])
                        .replace("{nDispPosition_Xkr}",layoutTab_general_map[lgm]["nDispPosition_Xkr"])
                        .replace("{nDispPosition_Xcn}",layoutTab_general_map[lgm]["nDispPosition_Xcn"])
                        .replace("{nDispPosition_Yjp}",layoutTab_general_map[lgm]["nDispPosition_Yjp"])
                        .replace("{nDispPosition_Yen}",layoutTab_general_map[lgm]["nDispPosition_Yen"])
                        .replace("{nDispPosition_Ykr}",layoutTab_general_map[lgm]["nDispPosition_Ykr"])
                        .replace("{nDispPosition_Ycn}",layoutTab_general_map[lgm]["nDispPosition_Ycn"])
                        .replace("{nDispSizejp}",layoutTab_general_map[lgm]["nDispSizejp"])
                        .replace("{nDispSizeen}",layoutTab_general_map[lgm]["nDispSizeen"])
                        .replace("{nDispSizekr}",layoutTab_general_map[lgm]["nDispSizekr"])
                        .replace("{nDispSizecn}",layoutTab_general_map[lgm]["nDispSizecn"])
                        .replace("{nWidthjp}",layoutTab_general_map[lgm]["nWidthjp"])
                        .replace("{nWidthen}",layoutTab_general_map[lgm]["nWidthen"])
                        .replace("{nWidthkr}",layoutTab_general_map[lgm]["nWidthkr"])
                        .replace("{nWidthcn}",layoutTab_general_map[lgm]["nWidthcn"])
                        .replace("{nHeightjp}",layoutTab_general_map[lgm]["nHeightjp"])
                        .replace("{nHeighten}",layoutTab_general_map[lgm]["nHeighten"])
                        .replace("{nHeightkr}",layoutTab_general_map[lgm]["nHeightkr"])
                        .replace("{nHeightcn}",layoutTab_general_map[lgm]["nHeightcn"])
                        .replace("{cTextjp}","'"+layoutTab_general_map[lgm]["cTextjp"]+"'")
                        .replace("{cTexten}","'"+layoutTab_general_map[lgm]["cTexten"]+"'")
                        .replace("{cTextkr}","'"+layoutTab_general_map[lgm]["cTextkr"]+"'")
                        .replace("{cTextcn}","'"+layoutTab_general_map[lgm]["cTextcn"]+"'")
                        .replace("{nItalicjp}","'"+layoutTab_general_map[lgm]["nItalicjp"]+"'")
                        .replace("{nItalicen}","'"+layoutTab_general_map[lgm]["nItalicen"]+"'")
                        .replace("{nItalickr}","'"+layoutTab_general_map[lgm]["nItalickr"]+"'")
                        .replace("{nItaliccn}","'"+layoutTab_general_map[lgm]["nItaliccn"]+"'")
                        .replace("{nFontSizejp}",layoutTab_general_map[lgm]["nFontSizejp"])
                        .replace("{nFontSizeen}",layoutTab_general_map[lgm]["nFontSizeen"])
                        .replace("{nFontSizekr}",layoutTab_general_map[lgm]["nFontSizekr"])
                        .replace("{nFontSizecn}",layoutTab_general_map[lgm]["nFontSizecn"])
                        .replace("{cColorjp}","'"+layoutTab_general_map[lgm]["cColorjp"]+"'")
                        .replace("{cColoren}","'"+layoutTab_general_map[lgm]["cColoren"]+"'")
                        .replace("{cColorkr}","'"+layoutTab_general_map[lgm]["cColorkr"]+"'")
                        .replace("{cColorcn}","'"+layoutTab_general_map[lgm]["cColorcn"]+"'")
                        .replace("{nFontWeightjp}",layoutTab_general_map[lgm]["nFontWeightjp"])
                        .replace("{nFontWeighten}",layoutTab_general_map[lgm]["nFontWeighten"])
                        .replace("{nFontWeightkr}",layoutTab_general_map[lgm]["nFontWeightkr"])
                        .replace("{nFontWeightcn}",layoutTab_general_map[lgm]["nFontWeightcn"])
                        .replace("{nVerticalFlg}",layoutTab_general_map[lgm]["nVerticalFlg"])
                        .replace("{nAfDispId}",layoutTab_general_map[lgm]["nAfDispId"])
                        .replace("{nGoodsCode}",layoutTab_general_map[lgm]["nGoodsCode"])
                        .replace("{nDetailDispType}",layoutTab_general_map[lgm]["nDetailDispType"])
                        .replace("{nDispMenuType}",layoutTab_general_map[lgm]["nDispMenuType"])
                        .replace("{nDispFlg}",layoutTab_general_map[lgm]["nDispFlg"])
                        .replace("{dOpacity}","'"+layoutTab_general_map[lgm]["dOpacity"]+"'")
                        .replace("{nAfDispId1}","'"+layoutTab_general_map[lgm]["nAfDispId1"]+"'")
                        .replace("{nAfDispId2}","'"+layoutTab_general_map[lgm]["nAfDispId2"]+"'")
                        .replace("{nAfDispId3}","'"+layoutTab_general_map[lgm]["nAfDispId3"]+"'")
                        .replace("{nAfDispId4}","'"+layoutTab_general_map[lgm]["nAfDispId4"]+"'")
                        .replace("{nAfDispId5}","'"+layoutTab_general_map[lgm]["nAfDispId5"]+"'")
                        .replace("{nSoldOutIcon_X}",layoutTab_general_map[lgm]["nSoldOutIcon_X"])
                        .replace("{nSoldOutIcon_Y}",layoutTab_general_map[lgm]["nSoldOutIcon_Y"])
                        .replace("{nSoldOutIcon_width}",layoutTab_general_map[lgm]["nSoldOutIcon_width"])
                        .replace("{nSoldOutIcon_height}",layoutTab_general_map[lgm]["nSoldOutIcon_height"])
                        .replace("{nSoldOutIcon_radius}",layoutTab_general_map[lgm]["nSoldOutIcon_radius"])
                        .replace("{nSoldOutIcon_condition_type}","'"+layoutTab_general_map[lgm]["nSoldOutIcon_condition_type"]+"'")
                        .replace("{nSoldOutIcon_condition_cd}","'"+layoutTab_general_map[lgm]["nSoldOutIcon_condition_cd"]+"'")
                        .replace("{nSideLinkId}","'"+layoutTab_general_map[lgm]["nSideLinkId"]+"'")
                        .replace("{tCreateTime}","now()")
                        .replace("{tUpdateTime}","now()")
                        .replace("{cCreateId}","'maintenanceGUI'")
                        .replace("{cUpdateId}","'maintenanceGUI'");
            sendFormatAll += sendFormat;
            sendFormatAll += ",";
            pKey++;
        }
    }
    sendFormatAll = sendFormatAll.slice(0,-1);
    console.log(sendFormatAll);
    updateHierarchyGUI(sendFormatAll,copyDispId,copyMenubookCd,false);
}

/**
 * 画像ファイル反映処理
 * @param 画面削除フラグ
 */
function layoutTabImgFileExecute(dispDelFlg) {
    // 画像情報配列
    var imgList = {};

    // 全画像データタグ
    var images = document.getElementsByClassName("layoutImgTag");
    // for(var img in images){
    for(var img=0;img < images.length;img++){
        if(images[img] != null && images[img].getAttribute("del") == 1){
            // 削除チェックONの場合
            // 保存先ファイルパス
            var filePath = images[img].getAttribute("tmp");
            filePath = filePath.replace(/\//g,'\\').replace('images','..\\images');

            imgList[filePath] = {"filePath":filePath,"imgData":"","del":1,"delfolder":0};

        }
        else if(images[img].src != null 
            && contains(images[img].src,"data:image") 
            && contains(images[img].src,"base64")){
            // 画像が読み込まれている場合

            // 保存先ファイルパス
            var filePath = images[img].getAttribute("tmp");
            filePath = filePath.replace(/\//g,'\\').replace('images','..\\images');

            // 画像データ
            var imgData = images[img].src;

            imgList[filePath] = {"filePath":filePath,"imgData":imgData,"del":0,"delfolder":0};
        }
    }
    // 画面の項目自体の削除検知・画像削除対象追加
    for(var bl in bk_layoutTab_general_map){
        if(layoutTab_general_map[bl] == null
            && bk_layoutTab_general_map[bl]["cDefaultImagePath"] != ""){
            // 編集によって消えている行の場合
            var deleteImgJp = bk_layoutTab_general_map[bl]["cDefaultImagePath"];
            deleteImgJp = deleteImgJp.replace(/\//g,'\\').replace('images','..\\images');
            var deleteImgEn = bk_layoutTab_general_map[bl]["cDefaultImagePath"].replace("images/","images/otherLanguage/en/");
            deleteImgEn = deleteImgEn.replace(/\//g,'\\').replace('images','..\\images');
            imgList[deleteImgJp] = {"filePath":deleteImgJp,"imgData":"","del":1,"delfolder":0};
            imgList[deleteImgEn] = {"filePath":deleteImgEn,"imgData":"","del":1,"delfolder":0};
        }
    }
    if(dispDelFlg){
        // 画面削除の場合
        var menubookCd = document.getElementById("layout_menubooks").value;
        var dispId = document.getElementById("layout_screens").value;
        var deleteImgJp = "images/level/"+menubookCd+"/"+dispId;
        deleteImgJp = deleteImgJp.replace(/\//g,'\\').replace('images','..\\images');
        var deleteImgEn = ("images/level/"+menubookCd+"/"+dispId).replace("images/","images/otherLanguage/en/");
        deleteImgEn = deleteImgEn.replace(/\//g,'\\').replace('images','..\\images');
        imgList[deleteImgJp] = {"filePath":deleteImgJp,"imgData":"","del":0,"delfolder":1};
        imgList[deleteImgEn] = {"filePath":deleteImgEn,"imgData":"","del":0,"delfolder":1};
    }

    if(Object.keys(imgList).length == 0){
        // 画像変更なしの場合ここで終了
        console.log("画面レイアウト-画像ファイル反映処理完了(対象画像なし)");
        alert("登録が完了しました。");
        document.getElementById('loading').setAttribute("hidden","hidden");
        // キャンセルボタン押下処理実行
        dispCancelBtn();
        getLayoutInfoGUI();
        return;
    }



    // 送信処理開始
    console.log("画面レイアウト-画像ファイル反映処理開始");
    // タイムアウトフラグ
    var timeoutFlg = false;

    // タイムアウト処理
    setTimeout(function(){
        if(!(timeoutFlg)){
            timeoutFlg = true;
            // リトライ処理
            console.log("画面レイアウト-画像ファイル反映処理失敗、リトライ");
            alert("画面レイアウト-画像ファイル反映処理がタイムアウトしました。");
            document.getElementById('loading').setAttribute("hidden","hidden");
            return false;
        }
    },POST_TIMEOUT_TIME);

    console.log(imgList);

    // 非同期通信で情報を取得
    $.when(
        $.ajax({
            type:'POST',
            url:PHP_EN_ROOT_FOLDER + '/sendLayoutImgGUI.php',
			data:{imgList:imgList
            },
             success:function(data){
                // 基本形ディッシュ組合せマスタ取得
                response_json = data;
                console.log(response_json);
                data = null;
                if(response_json == "over" && !(timeoutFlg)){
                    // メモ：php側で廃止しているため、こないレスポンスパターン
                    timeoutFlg = true;
                    console.log("画面レイアウト-画像ファイル反映処理失敗-容量オーバー");
                    alert("画像の総容量が25MBを超えているため、画像の反映をスキップしました。");
                    document.getElementById('loading').setAttribute("hidden","hidden");
                    return false;
                }else if(response_json != true && !(timeoutFlg)){
                    timeoutFlg = true;
                    // リトライ処理
                    console.log("画面レイアウト-画像ファイル反映処理失敗");
                    alert("画面レイアウト-画像ファイル反映処理に失敗しました。");
                    document.getElementById('loading').setAttribute("hidden","hidden");
                    return false;
                }
            }
        })
    ).done(function() {
        if(response_json == true && !(timeoutFlg)){
            timeoutFlg = true;
            // 次の処理実行
            console.log("画面レイアウト-画像ファイル反映処理完了");
            alert("登録が完了しました。");
            document.getElementById('loading').setAttribute("hidden","hidden");
            // キャンセルボタン押下処理実行
            dispCancelBtn();
            getLayoutInfoGUI();
        }else{
            timeoutFlg = true;
        }
    })


}

/**
 * 項目削除ボタン処理
 * @param 削除対象行
*/
function deleteItemBtn(deleteline){
    var result = window.confirm('項目を削除します。よろしいですか？');
    if(result){
        // マップから対象データ削除
        delete layoutTab_general_map[deleteline];
        // 一覧リフレッシュ
        dispBtn(false);
        // プレビュー再表示
        layoutTabPrev();
    }
}


/**
 * 画面追加ボタン処理
*/
function dispCreateBtn() {
    // 関係ないボタンの非活性化
    document.getElementById("layout_menubooks").disabled = true;
    document.getElementById("layout_screens").disabled = true;
    document.getElementById("layout_tab_edit").classList.add("is-hide");
    document.getElementById("layout_tab_disp_add").classList.add("is-hide");
    document.getElementById("layout_tab_delete").classList.add("is-hide");
    document.getElementById("layout_tab_cancel").classList.remove("is-hide");
    document.getElementById("layout_tab_edit_save").classList.add("is-hide");

    // 一覧取得
    var details = document.getElementById("layout_detail");
    // 初期化
    details.innerHTML = null;
    // 作成種別
    var createType_div = document.createElement("div");
    createType_div.id = "createTypeMain";
    createType_div.style.marginTop = "20px";
    createType_div.style.position = "relative";
    createType_div.style.left = "100px";
    createType_div.hidden = true;

    // 作成種別-タイトル
    var createType_div_span = document.createElement("span");
    createType_div_span.textContent = "作成種別";

    // 作成種別-プルダウン
    var createType_div_select = document.createElement("select");
    createType_div_select.id = "createTypeSelect";
    createType_div_select.style.position = "relative";
    createType_div_select.style.left = "20px";
    createType_div_select.style.height = "30px";
    createType_div_select.style.width = "100px";

    createType_div_select.setAttribute("onchange","dispTypeChange();");

    var createType_div_select_option1 = document.createElement("option");
    createType_div_select_option1.value = "1";
    createType_div_select_option1.selected = true;
    createType_div_select_option1.textContent = "新規";

    var createType_div_select_option2 = document.createElement("option");
    createType_div_select_option2.value = "2";
    createType_div_select_option2.selected = false;
    createType_div_select_option2.textContent = "コピー";

    createType_div_select.appendChild(createType_div_select_option1);
    createType_div_select.appendChild(createType_div_select_option2);

    // 作成種別-タグ合成
    createType_div.appendChild(createType_div_span);
    createType_div.appendChild(createType_div_select);

    // 作成種別-セット
    details.appendChild(createType_div);

    // メニューブック
    var menubook_div = document.createElement("div");
    menubook_div.id = "menubookMain";
    menubook_div.style.marginTop = "20px";
    menubook_div.style.position = "relative";
    menubook_div.style.left = "100px";

    // メニューブック-タイトル
    var menubook_div_span = document.createElement("span");
    menubook_div_span.textContent = "メニューブック";

    // メニューブック-プルダウン
    var menubook_div_select = document.createElement("select");
    menubook_div_select.id = "menubookSelect";
    menubook_div_select.style.position = "relative";
    menubook_div_select.style.left = "20px";
    menubook_div_select.style.height = "30px";
    menubook_div_select.style.width = "250px";

    for(var msm in menubook_set_mst_map){
        var menubook_div_select_option = document.createElement("option");
        menubook_div_select_option.value = menubook_set_mst_map[msm]["nMenuBookCode"];
        menubook_div_select_option.textContent = menubook_set_mst_map[msm]["nMenuBookCode"]+":"+menubook_set_mst_map[msm]["cMenuBookName"];
        menubook_div_select.appendChild(menubook_div_select_option);
    }

    // メニューブック-タグ合成
    menubook_div.appendChild(menubook_div_span);
    menubook_div.appendChild(menubook_div_select);

    // メニューブック-セット
    details.appendChild(menubook_div);

    // 画面名
    var dispName_div = document.createElement("div");
    dispName_div.id = "dispNameMain";
    dispName_div.style.marginTop = "20px";
    dispName_div.style.position = "relative";
    dispName_div.style.left = "100px";

    // 画面名-タイトル
    dispName_div_span = document.createElement("span");
    dispName_div_span.textContent = "画面名";

    dispName_div_input = document.createElement("input");
    dispName_div_input.id = "dispNameInput";
    dispName_div_input.type = "text";
    dispName_div_input.style.position = "relative";
    dispName_div_input.style.left = "20px";
    dispName_div_input.style.height = "20px";

    // 画面名-タグ合成
    dispName_div.appendChild(dispName_div_span);
    dispName_div.appendChild(dispName_div_input);

    // 画面名-セット
    details.appendChild(dispName_div);

    // 画面種別
    var dispType_div = document.createElement("div");
    dispType_div.id = "dispTypeMain";
    dispType_div.style.marginTop = "20px";
    dispType_div.style.position = "relative";
    dispType_div.style.left = "100px";

    // 画面種別-タイトル
    var dispType_div_span = document.createElement("span");
    dispType_div_span.textContent = "画面種別";

    // 画面種別-プルダウン
    var dispType_div_select = document.createElement("select");
    dispType_div_select.id = "dispTypeMainSelect";
    dispType_div_select.style.position = "relative";
    dispType_div_select.style.left = "20px";
    dispType_div_select.style.height = "30px";
    dispType_div_select.style.width = "250px";
    dispType_div_select.setAttribute("onchange","goodsTypeChange();");

    var dispType_div_select_option1 = document.createElement("option");
    dispType_div_select_option1.value = "1";
    dispType_div_select_option1.selected = true;
    dispType_div_select_option1.textContent = "1:階層画面";

    var dispType_div_select_option2 = document.createElement("option");
    dispType_div_select_option2.value = "2";
    dispType_div_select_option2.selected = false;
    dispType_div_select_option2.textContent = "2:汎用メニュー";

    var dispType_div_select_option3 = document.createElement("option");
    dispType_div_select_option3.value = "3";
    dispType_div_select_option3.selected = false;
    dispType_div_select_option3.textContent = "3:ドリンクメニュー";

    dispType_div_select.appendChild(dispType_div_select_option1);
    dispType_div_select.appendChild(dispType_div_select_option2);
    dispType_div_select.appendChild(dispType_div_select_option3);

    // 画面種別-タグ合成
    dispType_div.appendChild(dispType_div_span);
    dispType_div.appendChild(dispType_div_select);

    // 画面種別-セット
    details.appendChild(dispType_div);


    // 表示商品区分
    var goodsType_div = document.createElement("div");
    goodsType_div.id = "goodsTypeMain";
    goodsType_div.style.marginTop = "20px";
    goodsType_div.style.position = "relative";
    goodsType_div.style.left = "100px";

    // 表示商品区分-タイトル
    var goodsType_div_span = document.createElement("span");
    goodsType_div_span.textContent = "表示メニュー区分";

    // 表示商品区分-プルダウン
    var goodsType_div_select = document.createElement("select");
    goodsType_div_select.id = "menuTypeSelect";
    goodsType_div_select.style.position = "relative";
    goodsType_div_select.style.left = "20px";
    goodsType_div_select.style.height = "30px";
    goodsType_div_select.style.width = "50px";

    var goodsType_div_select_option1 = document.createElement("option");
    goodsType_div_select_option1.value = "1";
    goodsType_div_select_option1.selected = true;
    goodsType_div_select_option1.textContent = "1";
    goodsType_div_select.appendChild(goodsType_div_select_option1);

    for(var i=2;i <= 50;i++){
        var goodsType_div_select_option2 = document.createElement("option");
        goodsType_div_select_option2.value = i;
        goodsType_div_select_option2.selected = false;
        goodsType_div_select_option2.textContent = i;
        goodsType_div_select.appendChild(goodsType_div_select_option2);
    }

    // 表示商品区分-タグ合成
    goodsType_div.appendChild(goodsType_div_span);
    goodsType_div.appendChild(goodsType_div_select);

    // 表示商品区分-セット
    details.appendChild(goodsType_div);

    // 表示商品区分-初期は非表示化
    document.getElementById("goodsTypeMain").classList.add("is-hide");


    // コピー対象画面
    var copyDisp_div = document.createElement("div");
    copyDisp_div.id = "copyDispMain";
    copyDisp_div.style.marginTop = "20px";
    copyDisp_div.style.position = "relative";
    copyDisp_div.style.left = "100px";

    // コピー対象画面-タイトル
    var copyDisp_div_span = document.createElement("span");
    copyDisp_div_span.textContent = "コピー対象画面";

    // コピー対象画面-プルダウン
    var copyDisp_div_select = document.createElement("select");
    copyDisp_div_select.id = "copyDispSelect";
    copyDisp_div_select.style.position = "relative";
    copyDisp_div_select.style.left = "20px";
    copyDisp_div_select.style.height = "30px";
    copyDisp_div_select.style.width = "600px";

    var tmpScreens = {};

    for(var lgm in layoutTab_general_map){
        // 重複画面をスキップ
        if(tmpScreens[layoutTab_general_map[lgm]["nMenuBookCode"]+"_"+layoutTab_general_map[lgm]["nDispId"]] == null){
            if(layoutTab_general_map[lgm]["nDispId"] != null && layoutTab_general_map[lgm]["nDispId"].length >= 5){
                // デフォルト画面の場合、コピー不可
                continue;
            }
            var copyDisp_div_select_option = document.createElement("option");
            copyDisp_div_select_option.value = layoutTab_general_map[lgm]["nDispId"]+"_"+layoutTab_general_map[lgm]["nMenuBookCode"];
            // copyDisp_div_select_option.setAttribute("menubookCd",layoutTab_general_map[lgm]["nMenuBookCode"]);
            if(menubook_set_mst_map[layoutTab_general_map[lgm]["nMenuBookCode"]] != null){
                copyDisp_div_select_option.textContent = "メニューブック:"
                                +menubook_set_mst_map[layoutTab_general_map[lgm]["nMenuBookCode"]]["cMenuBookName"]+"　画面名:"+layoutTab_general_map[lgm]["cDispName"];
            } else {
                // メモ：存在しない予定のパターン。念のため
                continue;
                // copyDisp_div_select_option.textContent = "画面名:"+layoutTab_general_map[lgm]["cDispName"];
            }
            // セット済みの画面を記録
            tmpScreens[layoutTab_general_map[lgm]["nMenuBookCode"]+"_"+layoutTab_general_map[lgm]["nDispId"]] = "dummy";
            
            copyDisp_div_select.appendChild(copyDisp_div_select_option);
        }
    }

    // コピー対象画面-タグ合成
    copyDisp_div.appendChild(copyDisp_div_span);
    copyDisp_div.appendChild(copyDisp_div_select);

    // コピー対象画面-セット
    details.appendChild(copyDisp_div);

    // コピー対象画面-ブック毎にソート
    maintenanceSort("copyDispSelect","option","menubookCd");

    // コピー対象画面-初期は非表示化
    document.getElementById("copyDispMain").classList.add("is-hide");

    // エラー表示領域
    var errorMsg_div = document.createElement("div");
    errorMsg_div.id = "errorMsgMain";
    errorMsg_div.style.color = "red";
    errorMsg_div.style.height = "30px";
    errorMsg_div.style.marginTop = "30px";
    errorMsg_div.style.marginLeft = "100px";

    // エラー表示領域-セット
    details.appendChild(errorMsg_div);

    // 作成ボタン
    var createBtn_div = document.createElement("div");
    createBtn_div.id = "createBtnFixBtnMain";
    createBtn_div.style.left = "100px";
    createBtn_div.style.position = "relative";
    createBtn_div.style.marginTop = "20px";

    // 作成ボタン-ボタン部
    var createBtn_div_input = document.createElement("input");
    createBtn_div.id = "createBtnFixBtnInput";
    createBtn_div_input.type = "button";
    createBtn_div_input.setAttribute("onclick","dispCreateFixBtn();");
    createBtn_div_input.classList.add("m-btn");
    createBtn_div_input.value = "作成";

    // 作成ボタン-タグ合成
    createBtn_div.appendChild(createBtn_div_input);

    // 作成ボタン-セット
    details.appendChild(createBtn_div);
}

/**
 * 画面作成-画面種別切替処理
 */
function dispTypeChange() {
    var createTypeSelect = document.getElementById("createTypeSelect");
    if(createTypeSelect.value == "1"){
        // 新規
        document.getElementById("dispTypeMain").classList.remove("is-hide");
        document.getElementById("copyDispMain").classList.add("is-hide");
        document.getElementById("dispTypeMainSelect").value = 1;
    } else if(createTypeSelect.value == "2") {
        // コピー
        document.getElementById("dispTypeMain").classList.add("is-hide");
        document.getElementById("copyDispMain").classList.remove("is-hide");
        document.getElementById("goodsTypeMain").classList.add("is-hide");
    }
}

/**
 * 画面種別-表示商品区分切替処理
 */
 function goodsTypeChange() {
    var createTypeSelect = document.getElementById("dispTypeMainSelect");
    if(createTypeSelect.value == "1"){
        // 階層画面
        document.getElementById("goodsTypeMain").classList.add("is-hide");
    } else {
        // 階層画面以外
        document.getElementById("goodsTypeMain").classList.remove("is-hide");
    }
}

/**
 * 画面作成-画面追加確定ボタン処理
 */
function dispCreateFixBtn() {
    // エラー表示リセット
    var errorMsgMain = document.getElementById("errorMsgMain");
    errorMsgMain.innerHTML = null;
    // 入力チェック
    // 画面名入力値
    var dispNameInput = document.getElementById("dispNameInput").value;
    if(dispNameInput == ""){
        // 未入力の場合
        errorMsgMain.textContent = "画面名を入力してください。";
        return;
    } else if(contains(dispNameInput,"'") || contains(dispNameInput,'"')|| contains(dispNameInput,'_')){
        // 入力不可文字の場合
        errorMsgMain.textContent = '「"'+"'_」の文字はは画面名に含められません。　再度入力してください。";
        return;
    }

    // 選択メニューブックコード
    var selectMenubookCd = document.getElementById("menubookSelect").value;

    //画面ID(nDispId)の採番
    var createDispId = dispIdCreate(selectMenubookCd);

    // 主キーの採番
    var pKey = keyCdCreate();
    
    // 作成種別タグ
    var createTypeSelect = document.getElementById("createTypeSelect");

    // 商品詳細画面種別
    var nDetailDispType = 0;

    var nDispMenuType = 0;

    if(createTypeSelect.value == "1"){
        // 新規
        // 作成画面種別
        var dispTypeMainSelect = document.getElementById("dispTypeMainSelect").value;
        if(dispTypeMainSelect == "1"){
            // 階層画面の場合
            nDetailDispType = 5;

        } else if(dispTypeMainSelect == "2"){
            // 汎用メニュー画面の場合
            nDetailDispType = 2;
            nDispMenuType = document.getElementById("menuTypeSelect").value;

        } else if(dispTypeMainSelect == "3"){
            // ドリンクメニュー画面の場合
            nDetailDispType = 3;
            nDispMenuType = document.getElementById("menuTypeSelect").value;
        }

        // 背景画像
        var sendFormat = baseSendFormat;
        sendFormat = sendFormat.replace("{nHierarchyCode}",pKey)
                    .replace("{nMenuBookCode}",selectMenubookCd)
                    .replace("{nDefaultFlg}",0)
                    .replace("{nDispId}",createDispId)
                    .replace("{cDispName}","'"+dispNameInput+"'")
                    .replace("{nItemId}",1)
                    .replace("{cItemName}","'背景画像'")
                    .replace("{nDispType}",4)
                    .replace("{cDefaultImagePath}","'images/level/"+selectMenubookCd+"/"+createDispId+"/"+createDispId+"_1.png'")
                    .replace("{nDispPosition_Xjp}",0)
                    .replace("{nDispPosition_Xen}",0)
                    .replace("{nDispPosition_Xkr}",0)
                    .replace("{nDispPosition_Xcn}",0)
                    .replace("{nDispPosition_Yjp}",0)
                    .replace("{nDispPosition_Yen}",0)
                    .replace("{nDispPosition_Ykr}",0)
                    .replace("{nDispPosition_Ycn}",0)
                    .replace("{nDispSizejp}",100)
                    .replace("{nDispSizeen}",100)
                    .replace("{nDispSizekr}",100)
                    .replace("{nDispSizecn}",100)
                    .replace("{nWidthjp}",0)
                    .replace("{nWidthen}",0)
                    .replace("{nWidthkr}",0)
                    .replace("{nWidthcn}",0)
                    .replace("{nHeightjp}",0)
                    .replace("{nHeighten}",0)
                    .replace("{nHeightkr}",0)
                    .replace("{nHeightcn}",0)
                    .replace("{cTextjp}","''")
                    .replace("{cTexten}","''")
                    .replace("{cTextkr}","''")
                    .replace("{cTextcn}","''")
                    .replace("{nItalicjp}","'0'")
                    .replace("{nItalicen}","'0'")
                    .replace("{nItalickr}","'0'")
                    .replace("{nItaliccn}","'0'")
                    .replace("{nFontSizejp}",0)
                    .replace("{nFontSizeen}",0)
                    .replace("{nFontSizekr}",0)
                    .replace("{nFontSizecn}",0)
                    .replace("{cColorjp}","'0'")
                    .replace("{cColoren}","'0'")
                    .replace("{cColorkr}","'0'")
                    .replace("{cColorcn}","'0'")
                    .replace("{nFontWeightjp}",0)
                    .replace("{nFontWeighten}",0)
                    .replace("{nFontWeightkr}",0)
                    .replace("{nFontWeightcn}",0)
                    .replace("{nVerticalFlg}",0)
                    .replace("{nAfDispId}",0)
                    .replace("{nGoodsCode}",0)
                    .replace("{nDetailDispType}",nDetailDispType)
                    .replace("{nDispMenuType}",nDispMenuType)
                    .replace("{nDispFlg}",1)
                    .replace("{dOpacity}","1.0")
                    .replace("{nAfDispId1}","-1")
                    .replace("{nAfDispId2}","-1")
                    .replace("{nAfDispId3}","-1")
                    .replace("{nAfDispId4}","-1")
                    .replace("{nAfDispId5}","-1")
                    .replace("{nSoldOutIcon_X}",0)
                    .replace("{nSoldOutIcon_Y}",0)
                    .replace("{nSoldOutIcon_width}",100)
                    .replace("{nSoldOutIcon_height}",100)
                    .replace("{nSoldOutIcon_radius}",0)
                    .replace("{nSoldOutIcon_condition_type}","''")
                    .replace("{nSoldOutIcon_condition_cd}","''")
                    .replace("{nSideLinkId}",0)
                    .replace("{tCreateTime}","now()")
                    .replace("{tUpdateTime}","now()")
                    .replace("{cCreateId}","'maintenanceGUI'")
                    .replace("{cUpdateId}","'maintenanceGUI'");
        
        // サイドリンクバー
        var sendFormat2 = "";
        // 汎用メニュータイトル
        var sendFormat3 = "";
        // ドリンクメニューコップ
        var sendFormat4 = "";
        // ドリンクメニューボード
        var sendFormat5 = "";
        if(dispTypeMainSelect == "1"){
            sendFormat2 = baseSendFormat;
            sendFormat2 = sendFormat2.replace("{nHierarchyCode}",pKey+1)
                        .replace("{nMenuBookCode}",selectMenubookCd)
                        .replace("{nDefaultFlg}",0)
                        .replace("{nDispId}",createDispId)
                        .replace("{cDispName}","'"+dispNameInput+"'")
                        .replace("{nItemId}",2)
                        .replace("{cItemName}","'サイドリンクバー'")
                        .replace("{nDispType}",6)
                        .replace("{cDefaultImagePath}","''")
                        .replace("{nDispPosition_Xjp}",0)
                        .replace("{nDispPosition_Xen}",0)
                        .replace("{nDispPosition_Xkr}",0)
                        .replace("{nDispPosition_Xcn}",0)
                        .replace("{nDispPosition_Yjp}",0)
                        .replace("{nDispPosition_Yen}",0)
                        .replace("{nDispPosition_Ykr}",0)
                        .replace("{nDispPosition_Ycn}",0)
                        .replace("{nDispSizejp}",100)
                        .replace("{nDispSizeen}",100)
                        .replace("{nDispSizekr}",100)
                        .replace("{nDispSizecn}",100)
                        .replace("{nWidthjp}",0)
                        .replace("{nWidthen}",0)
                        .replace("{nWidthkr}",0)
                        .replace("{nWidthcn}",0)
                        .replace("{nHeightjp}",0)
                        .replace("{nHeighten}",0)
                        .replace("{nHeightkr}",0)
                        .replace("{nHeightcn}",0)
                        .replace("{cTextjp}","''")
                        .replace("{cTexten}","''")
                        .replace("{cTextkr}","''")
                        .replace("{cTextcn}","''")
                        .replace("{nItalicjp}","'0'")
                        .replace("{nItalicen}","'0'")
                        .replace("{nItalickr}","'0'")
                        .replace("{nItaliccn}","'0'")
                        .replace("{nFontSizejp}",0)
                        .replace("{nFontSizeen}",0)
                        .replace("{nFontSizekr}",0)
                        .replace("{nFontSizecn}",0)
                        .replace("{cColorjp}","'0'")
                        .replace("{cColoren}","'0'")
                        .replace("{cColorkr}","'0'")
                        .replace("{cColorcn}","'0'")
                        .replace("{nFontWeightjp}",0)
                        .replace("{nFontWeighten}",0)
                        .replace("{nFontWeightkr}",0)
                        .replace("{nFontWeightcn}",0)
                        .replace("{nVerticalFlg}",0)
                        .replace("{nAfDispId}",0)
                        .replace("{nGoodsCode}",0)
                        .replace("{nDetailDispType}",nDetailDispType)
                        .replace("{nDispMenuType}",nDispMenuType)
                        .replace("{nDispFlg}",1)
                        .replace("{dOpacity}","1.0")
                        .replace("{nAfDispId1}","-1")
                        .replace("{nAfDispId2}","-1")
                        .replace("{nAfDispId3}","-1")
                        .replace("{nAfDispId4}","-1")
                        .replace("{nAfDispId5}","-1")
                        .replace("{nSoldOutIcon_X}",0)
                        .replace("{nSoldOutIcon_Y}",0)
                        .replace("{nSoldOutIcon_width}",100)
                        .replace("{nSoldOutIcon_height}",100)
                        .replace("{nSoldOutIcon_radius}",0)
                        .replace("{nSoldOutIcon_condition_type}","''")
                        .replace("{nSoldOutIcon_condition_cd}","''")
                        .replace("{nSideLinkId}",1)
                        .replace("{tCreateTime}","now()")
                        .replace("{tUpdateTime}","now()")
                        .replace("{cCreateId}","'maintenanceGUI'")
                        .replace("{cUpdateId}","'maintenanceGUI'");
            updateHierarchyGUI(sendFormat+","+sendFormat2,createDispId,selectMenubookCd,false);
        } else if(dispTypeMainSelect == "2") {
            sendFormat3 = baseSendFormat;
            sendFormat3 = sendFormat3.replace("{nHierarchyCode}",pKey+1)
                        .replace("{nMenuBookCode}",selectMenubookCd)
                        .replace("{nDefaultFlg}",0)
                        .replace("{nDispId}",createDispId)
                        .replace("{cDispName}","'"+dispNameInput+"'")
                        .replace("{nItemId}",2)
                        .replace("{cItemName}","'タイトルテキスト'")
                        .replace("{nDispType}",7)
                        .replace("{cDefaultImagePath}","''")
                        .replace("{nDispPosition_Xjp}",0)
                        .replace("{nDispPosition_Xen}",0)
                        .replace("{nDispPosition_Xkr}",0)
                        .replace("{nDispPosition_Xcn}",0)
                        .replace("{nDispPosition_Yjp}",0)
                        .replace("{nDispPosition_Yen}",0)
                        .replace("{nDispPosition_Ykr}",0)
                        .replace("{nDispPosition_Ycn}",0)
                        .replace("{nDispSizejp}",100)
                        .replace("{nDispSizeen}",100)
                        .replace("{nDispSizekr}",100)
                        .replace("{nDispSizecn}",100)
                        .replace("{nWidthjp}",0)
                        .replace("{nWidthen}",0)
                        .replace("{nWidthkr}",0)
                        .replace("{nWidthcn}",0)
                        .replace("{nHeightjp}",0)
                        .replace("{nHeighten}",0)
                        .replace("{nHeightkr}",0)
                        .replace("{nHeightcn}",0)
                        .replace("{cTextjp}","'新規画面タイトル'")
                        .replace("{cTexten}","'new title'")
                        .replace("{cTextkr}","'new title'")
                        .replace("{cTextcn}","'new title'")
                        .replace("{nItalicjp}","'0'")
                        .replace("{nItalicen}","'0'")
                        .replace("{nItalickr}","'0'")
                        .replace("{nItaliccn}","'0'")
                        .replace("{nFontSizejp}",0)
                        .replace("{nFontSizeen}",0)
                        .replace("{nFontSizekr}",0)
                        .replace("{nFontSizecn}",0)
                        .replace("{cColorjp}","'0'")
                        .replace("{cColoren}","'0'")
                        .replace("{cColorkr}","'0'")
                        .replace("{cColorcn}","'0'")
                        .replace("{nFontWeightjp}",0)
                        .replace("{nFontWeighten}",0)
                        .replace("{nFontWeightkr}",0)
                        .replace("{nFontWeightcn}",0)
                        .replace("{nVerticalFlg}",0)
                        .replace("{nAfDispId}",0)
                        .replace("{nGoodsCode}",0)
                        .replace("{nDetailDispType}",nDetailDispType)
                        .replace("{nDispMenuType}",nDispMenuType)
                        .replace("{nDispFlg}",1)
                        .replace("{dOpacity}","1.0")
                        .replace("{nAfDispId1}","-1")
                        .replace("{nAfDispId2}","-1")
                        .replace("{nAfDispId3}","-1")
                        .replace("{nAfDispId4}","-1")
                        .replace("{nAfDispId5}","-1")
                        .replace("{nSoldOutIcon_X}",0)
                        .replace("{nSoldOutIcon_Y}",0)
                        .replace("{nSoldOutIcon_width}",100)
                        .replace("{nSoldOutIcon_height}",100)
                        .replace("{nSoldOutIcon_radius}",0)
                        .replace("{nSoldOutIcon_condition_type}","''")
                        .replace("{nSoldOutIcon_condition_cd}","''")
                        .replace("{nSideLinkId}",0)
                        .replace("{tCreateTime}","now()")
                        .replace("{tUpdateTime}","now()")
                        .replace("{cCreateId}","'maintenanceGUI'")
                        .replace("{cUpdateId}","'maintenanceGUI'");
            updateHierarchyGUI(sendFormat+","+sendFormat3,createDispId,selectMenubookCd,false);
        } else if(dispTypeMainSelect == "3") {
            sendFormat4 = baseSendFormat;
            sendFormat4 = sendFormat4.replace("{nHierarchyCode}",pKey+2)
                        .replace("{nMenuBookCode}",selectMenubookCd)
                        .replace("{nDefaultFlg}",0)
                        .replace("{nDispId}",createDispId)
                        .replace("{cDispName}","'"+dispNameInput+"'")
                        .replace("{nItemId}",2)
                        .replace("{cItemName}","'コップ画像'")
                        .replace("{nDispType}",8)
                        .replace("{cDefaultImagePath}","'images/level/"+selectMenubookCd+"/"+createDispId+"/"+createDispId+"_2.png'")
                        .replace("{nDispPosition_Xjp}",0)
                        .replace("{nDispPosition_Xen}",0)
                        .replace("{nDispPosition_Xkr}",0)
                        .replace("{nDispPosition_Xcn}",0)
                        .replace("{nDispPosition_Yjp}",0)
                        .replace("{nDispPosition_Yen}",0)
                        .replace("{nDispPosition_Ykr}",0)
                        .replace("{nDispPosition_Ycn}",0)
                        .replace("{nDispSizejp}",100)
                        .replace("{nDispSizeen}",100)
                        .replace("{nDispSizekr}",100)
                        .replace("{nDispSizecn}",100)
                        .replace("{nWidthjp}",0)
                        .replace("{nWidthen}",0)
                        .replace("{nWidthkr}",0)
                        .replace("{nWidthcn}",0)
                        .replace("{nHeightjp}",0)
                        .replace("{nHeighten}",0)
                        .replace("{nHeightkr}",0)
                        .replace("{nHeightcn}",0)
                        .replace("{cTextjp}","''")
                        .replace("{cTexten}","''")
                        .replace("{cTextkr}","''")
                        .replace("{cTextcn}","''")
                        .replace("{nItalicjp}","'0'")
                        .replace("{nItalicen}","'0'")
                        .replace("{nItalickr}","'0'")
                        .replace("{nItaliccn}","'0'")
                        .replace("{nFontSizejp}",0)
                        .replace("{nFontSizeen}",0)
                        .replace("{nFontSizekr}",0)
                        .replace("{nFontSizecn}",0)
                        .replace("{cColorjp}","'0'")
                        .replace("{cColoren}","'0'")
                        .replace("{cColorkr}","'0'")
                        .replace("{cColorcn}","'0'")
                        .replace("{nFontWeightjp}",0)
                        .replace("{nFontWeighten}",0)
                        .replace("{nFontWeightkr}",0)
                        .replace("{nFontWeightcn}",0)
                        .replace("{nVerticalFlg}",0)
                        .replace("{nAfDispId}",0)
                        .replace("{nGoodsCode}",0)
                        .replace("{nDetailDispType}",nDetailDispType)
                        .replace("{nDispMenuType}",nDispMenuType)
                        .replace("{nDispFlg}",1)
                        .replace("{dOpacity}","1.0")
                        .replace("{nAfDispId1}","-1")
                        .replace("{nAfDispId2}","-1")
                        .replace("{nAfDispId3}","-1")
                        .replace("{nAfDispId4}","-1")
                        .replace("{nAfDispId5}","-1")
                        .replace("{nSoldOutIcon_X}",0)
                        .replace("{nSoldOutIcon_Y}",0)
                        .replace("{nSoldOutIcon_width}",100)
                        .replace("{nSoldOutIcon_height}",100)
                        .replace("{nSoldOutIcon_radius}",0)
                        .replace("{nSoldOutIcon_condition_type}","''")
                        .replace("{nSoldOutIcon_condition_cd}","''")
                        .replace("{nSideLinkId}",0)
                        .replace("{tCreateTime}","now()")
                        .replace("{tUpdateTime}","now()")
                        .replace("{cCreateId}","'maintenanceGUI'")
                        .replace("{cUpdateId}","'maintenanceGUI'");
            sendFormat5 = baseSendFormat;
            sendFormat5 = sendFormat5.replace("{nHierarchyCode}",pKey+3)
                        .replace("{nMenuBookCode}",selectMenubookCd)
                        .replace("{nDefaultFlg}",0)
                        .replace("{nDispId}",createDispId)
                        .replace("{cDispName}","'"+dispNameInput+"'")
                        .replace("{nItemId}",3)
                        .replace("{cItemName}","'ボード画像'")
                        .replace("{nDispType}",9)
                        .replace("{cDefaultImagePath}","'images/level/"+selectMenubookCd+"/"+createDispId+"/"+createDispId+"_3.png'")
                        .replace("{nDispPosition_Xjp}",0)
                        .replace("{nDispPosition_Xen}",0)
                        .replace("{nDispPosition_Xkr}",0)
                        .replace("{nDispPosition_Xcn}",0)
                        .replace("{nDispPosition_Yjp}",0)
                        .replace("{nDispPosition_Yen}",0)
                        .replace("{nDispPosition_Ykr}",0)
                        .replace("{nDispPosition_Ycn}",0)
                        .replace("{nDispSizejp}",100)
                        .replace("{nDispSizeen}",100)
                        .replace("{nDispSizekr}",100)
                        .replace("{nDispSizecn}",100)
                        .replace("{nWidthjp}",0)
                        .replace("{nWidthen}",0)
                        .replace("{nWidthkr}",0)
                        .replace("{nWidthcn}",0)
                        .replace("{nHeightjp}",0)
                        .replace("{nHeighten}",0)
                        .replace("{nHeightkr}",0)
                        .replace("{nHeightcn}",0)
                        .replace("{cTextjp}","''")
                        .replace("{cTexten}","''")
                        .replace("{cTextkr}","''")
                        .replace("{cTextcn}","''")
                        .replace("{nItalicjp}","'0'")
                        .replace("{nItalicen}","'0'")
                        .replace("{nItalickr}","'0'")
                        .replace("{nItaliccn}","'0'")
                        .replace("{nFontSizejp}",0)
                        .replace("{nFontSizeen}",0)
                        .replace("{nFontSizekr}",0)
                        .replace("{nFontSizecn}",0)
                        .replace("{cColorjp}","'0'")
                        .replace("{cColoren}","'0'")
                        .replace("{cColorkr}","'0'")
                        .replace("{cColorcn}","'0'")
                        .replace("{nFontWeightjp}",0)
                        .replace("{nFontWeighten}",0)
                        .replace("{nFontWeightkr}",0)
                        .replace("{nFontWeightcn}",0)
                        .replace("{nVerticalFlg}",0)
                        .replace("{nAfDispId}",0)
                        .replace("{nGoodsCode}",0)
                        .replace("{nDetailDispType}",nDetailDispType)
                        .replace("{nDispMenuType}",nDispMenuType)
                        .replace("{nDispFlg}",1)
                        .replace("{dOpacity}","1.0")
                        .replace("{nAfDispId1}","-1")
                        .replace("{nAfDispId2}","-1")
                        .replace("{nAfDispId3}","-1")
                        .replace("{nAfDispId4}","-1")
                        .replace("{nAfDispId5}","-1")
                        .replace("{nSoldOutIcon_X}",0)
                        .replace("{nSoldOutIcon_Y}",0)
                        .replace("{nSoldOutIcon_width}",100)
                        .replace("{nSoldOutIcon_height}",100)
                        .replace("{nSoldOutIcon_radius}",0)
                        .replace("{nSoldOutIcon_condition_type}","''")
                        .replace("{nSoldOutIcon_condition_cd}","''")
                        .replace("{nSideLinkId}",0)
                        .replace("{tCreateTime}","now()")
                        .replace("{tUpdateTime}","now()")
                        .replace("{cCreateId}","'maintenanceGUI'")
                        .replace("{cUpdateId}","'maintenanceGUI'");
            updateHierarchyGUI(sendFormat+","+sendFormat4+","+sendFormat5,createDispId,selectMenubookCd,false);
        } else {
            updateHierarchyGUI(sendFormat,createDispId,selectMenubookCd);
        }

    } else if(createTypeSelect.value == "2") {
        // コピー
        var copyDispSelect = document.getElementById("copyDispSelect");
        var copyData = copyDispSelect.value.split("_");
        if(copyData.length != 2){
            errorMsgMain.textContent = 'コピー対象画面の情報に不正があるため、コピーに失敗しました。';
            return;
        }
        var copyDispId = copyData[0];
        var copyMenubookCd = copyData[1];

        var sendFormatAll = "";
        for(var lgm in layoutTab_general_map){
            if(layoutTab_general_map[lgm]["nMenuBookCode"] == copyMenubookCd && layoutTab_general_map[lgm]["nDispId"] == copyDispId){
                // コピー対象画面設定行の場合
                var sendFormat = baseSendFormat;
                sendFormat = sendFormat.replace("{nHierarchyCode}",pKey)
                            .replace("{nMenuBookCode}",selectMenubookCd)
                            .replace("{nDefaultFlg}",layoutTab_general_map[lgm]["nDefaultFlg"])
                            .replace("{nDispId}",createDispId)
                            .replace("{cDispName}","'"+dispNameInput+"'")
                            .replace("{nItemId}",layoutTab_general_map[lgm]["nItemId"])
                            .replace("{cItemName}","'"+layoutTab_general_map[lgm]["cItemName"]+"'")
                            .replace("{nDispType}",layoutTab_general_map[lgm]["nDispType"])
                            .replace("{cDefaultImagePath}","'"+layoutTab_general_map[lgm]["cDefaultImagePath"]+"'")
                            .replace("{nDispPosition_Xjp}",layoutTab_general_map[lgm]["nDispPosition_Xjp"])
                            .replace("{nDispPosition_Xen}",layoutTab_general_map[lgm]["nDispPosition_Xen"])
                            .replace("{nDispPosition_Xkr}",layoutTab_general_map[lgm]["nDispPosition_Xkr"])
                            .replace("{nDispPosition_Xcn}",layoutTab_general_map[lgm]["nDispPosition_Xcn"])
                            .replace("{nDispPosition_Yjp}",layoutTab_general_map[lgm]["nDispPosition_Yjp"])
                            .replace("{nDispPosition_Yen}",layoutTab_general_map[lgm]["nDispPosition_Yen"])
                            .replace("{nDispPosition_Ykr}",layoutTab_general_map[lgm]["nDispPosition_Ykr"])
                            .replace("{nDispPosition_Ycn}",layoutTab_general_map[lgm]["nDispPosition_Ycn"])
                            .replace("{nDispSizejp}",layoutTab_general_map[lgm]["nDispSizejp"])
                            .replace("{nDispSizeen}",layoutTab_general_map[lgm]["nDispSizeen"])
                            .replace("{nDispSizekr}",layoutTab_general_map[lgm]["nDispSizekr"])
                            .replace("{nDispSizecn}",layoutTab_general_map[lgm]["nDispSizecn"])
                            .replace("{nWidthjp}",layoutTab_general_map[lgm]["nWidthjp"])
                            .replace("{nWidthen}",layoutTab_general_map[lgm]["nWidthen"])
                            .replace("{nWidthkr}",layoutTab_general_map[lgm]["nWidthkr"])
                            .replace("{nWidthcn}",layoutTab_general_map[lgm]["nWidthcn"])
                            .replace("{nHeightjp}",layoutTab_general_map[lgm]["nHeightjp"])
                            .replace("{nHeighten}",layoutTab_general_map[lgm]["nHeighten"])
                            .replace("{nHeightkr}",layoutTab_general_map[lgm]["nHeightkr"])
                            .replace("{nHeightcn}",layoutTab_general_map[lgm]["nHeightcn"])
                            .replace("{cTextjp}","'"+layoutTab_general_map[lgm]["cTextjp"]+"'")
                            .replace("{cTexten}","'"+layoutTab_general_map[lgm]["cTexten"]+"'")
                            .replace("{cTextkr}","'"+layoutTab_general_map[lgm]["cTextkr"]+"'")
                            .replace("{cTextcn}","'"+layoutTab_general_map[lgm]["cTextcn"]+"'")
                            .replace("{nItalicjp}","'"+layoutTab_general_map[lgm]["nItalicjp"]+"'")
                            .replace("{nItalicen}","'"+layoutTab_general_map[lgm]["nItalicen"]+"'")
                            .replace("{nItalickr}","'"+layoutTab_general_map[lgm]["nItalickr"]+"'")
                            .replace("{nItaliccn}","'"+layoutTab_general_map[lgm]["nItaliccn"]+"'")
                            .replace("{nFontSizejp}",layoutTab_general_map[lgm]["nFontSizejp"])
                            .replace("{nFontSizeen}",layoutTab_general_map[lgm]["nFontSizeen"])
                            .replace("{nFontSizekr}",layoutTab_general_map[lgm]["nFontSizekr"])
                            .replace("{nFontSizecn}",layoutTab_general_map[lgm]["nFontSizecn"])
                            .replace("{cColorjp}","'"+layoutTab_general_map[lgm]["cColorjp"]+"'")
                            .replace("{cColoren}","'"+layoutTab_general_map[lgm]["cColoren"]+"'")
                            .replace("{cColorkr}","'"+layoutTab_general_map[lgm]["cColorkr"]+"'")
                            .replace("{cColorcn}","'"+layoutTab_general_map[lgm]["cColorcn"]+"'")
                            .replace("{nFontWeightjp}",layoutTab_general_map[lgm]["nFontWeightjp"])
                            .replace("{nFontWeighten}",layoutTab_general_map[lgm]["nFontWeighten"])
                            .replace("{nFontWeightkr}",layoutTab_general_map[lgm]["nFontWeightkr"])
                            .replace("{nFontWeightcn}",layoutTab_general_map[lgm]["nFontWeightcn"])
                            .replace("{nVerticalFlg}",layoutTab_general_map[lgm]["nVerticalFlg"])
                            .replace("{nAfDispId}",layoutTab_general_map[lgm]["nAfDispId"])
                            .replace("{nGoodsCode}",layoutTab_general_map[lgm]["nGoodsCode"])
                            .replace("{nDetailDispType}",layoutTab_general_map[lgm]["nDetailDispType"])
                            .replace("{nDispMenuType}",layoutTab_general_map[lgm]["nDispMenuType"])
                            .replace("{nDispFlg}",layoutTab_general_map[lgm]["nDispFlg"])
                            .replace("{dOpacity}","'"+layoutTab_general_map[lgm]["dOpacity"]+"'")
                            .replace("{nAfDispId1}","'"+layoutTab_general_map[lgm]["nAfDispId1"]+"'")
                            .replace("{nAfDispId2}","'"+layoutTab_general_map[lgm]["nAfDispId2"]+"'")
                            .replace("{nAfDispId3}","'"+layoutTab_general_map[lgm]["nAfDispId3"]+"'")
                            .replace("{nAfDispId4}","'"+layoutTab_general_map[lgm]["nAfDispId4"]+"'")
                            .replace("{nAfDispId5}","'"+layoutTab_general_map[lgm]["nAfDispId5"]+"'")
                            .replace("{nSoldOutIcon_X}",layoutTab_general_map[lgm]["nSoldOutIcon_X"])
                            .replace("{nSoldOutIcon_Y}",layoutTab_general_map[lgm]["nSoldOutIcon_Y"])
                            .replace("{nSoldOutIcon_width}",layoutTab_general_map[lgm]["nSoldOutIcon_width"])
                            .replace("{nSoldOutIcon_height}",layoutTab_general_map[lgm]["nSoldOutIcon_height"])
                            .replace("{nSoldOutIcon_radius}",layoutTab_general_map[lgm]["nSoldOutIcon_radius"])
                            .replace("{nSoldOutIcon_condition_type}","'"+layoutTab_general_map[lgm]["nSoldOutIcon_condition_type"]+"'")
                            .replace("{nSoldOutIcon_condition_cd}","'"+layoutTab_general_map[lgm]["nSoldOutIcon_condition_cd"]+"'")
                            .replace("{nSideLinkId}","'"+layoutTab_general_map[lgm]["nSideLinkId"]+"'")
                            .replace("{tCreateTime}","now()")
                            .replace("{tUpdateTime}","now()")
                            .replace("{cCreateId}","'maintenanceGUI'")
                            .replace("{cUpdateId}","'maintenanceGUI'");
                sendFormatAll += sendFormat;
                sendFormatAll += ",";
                pKey++;
            }
        }
        sendFormatAll = sendFormatAll.slice(0,-1);
        console.log(sendFormatAll);
        updateHierarchyGUI(sendFormatAll,createDispId,selectMenubookCd,false);
    }
}

/**
 * 画面ID採番処理
 * @param menubookCd
 * @return 画面ID
 */
function dispIdCreate(menubookCd) {
    var dispId = 0;
    for(var lgm in layoutTab_general_map){
        if(menubookCd == layoutTab_general_map[lgm]["nMenuBookCode"] && layoutTab_general_map[lgm]["nDispId"].length < 5){
            // 対象メニューブックコードかつ、デフォルト画面以外の場合
            var tmpDispId = parseInt(layoutTab_general_map[lgm]["nDispId"]);
            if(dispId < tmpDispId){
                // 数値が高い画面IDを記録
                dispId = tmpDispId;
            }
        }
    }
    // 最後に+1カウントアップ
    dispId++;
    return dispId;
}

/**
 * テーブル主キー採番処理
 * @return 主キー値
 */
 function keyCdCreate() {
    var keyCd = 0;
    for(var lgm in layoutTab_general_map){
        var tmpkeyCd = parseInt(lgm);
        if(keyCd < tmpkeyCd){
            // 数値が高い画面IDを記録
            keyCd = tmpkeyCd;
        }
    }
    // 最後に+1カウントアップ
    keyCd++;
    return keyCd;
}

/**
 * 対象画面の最大アイテムID行取得処理
 * @param 画面ID
 * @param 画面メニューブックコード
 * @return キー値
 */
function keyCdGetMax(dispId,menubookCd){
    var maxId = 0;
    var maxKey = 0;
    for(var lgm in layoutTab_general_map){
        if(layoutTab_general_map[lgm]["nDispId"] == dispId
        && layoutTab_general_map[lgm]["nMenuBookCode"] == menubookCd){
            // 対象画面の場合
            var itemId = parseInt(layoutTab_general_map[lgm]["nItemId"]);
            if(itemId >= maxId){
                // 高いID値の場合記録
                maxId = itemId;
                maxKey = lgm;
            }
        }
    }
    return maxKey;
}

/**
 * 画面階層マスタ更新処理
 * @param insertデータ
 * @param 画面ID
 * @param メニュ－ブックコード
 */
 function updateHierarchyGUI(insertData,nDispId,menubookCd,dispDelFlg) {
    console.log("画面レイアウト-画面階層マスタ更新処理開始");
    // プログレスアイコン表示
    document.getElementById('loading').removeAttribute("hidden");
    
    // タイムアウトフラグ
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
            // リトライ処理
            console.log("画面レイアウト-画面階層マスタ更新処理失敗、リトライ");
			updateHierarchyGUI(insertData,nDispId,menubookCd)
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/updateHierarchyGUI.php',
            data:{
                'insertData':insertData,
                'nDispId':nDispId,
                "menubookCd":menubookCd
            },
			success:function(data){
				// 汎用マスタ取得
                response_json = data;
				data = null;
				if(response_json == false || contains(response_json,CONNECT_ERR_MSG) && !(timeoutFlg)){
					timeoutFlg = true;
                    // リトライ処理
                    console.log("画面レイアウト-画面階層マスタ更新処理失敗、リトライ");
					updateHierarchyGUI(insertData,nDispId,menubookCd);
					return false;
                }
			}
		})
	).done(function() {
		if(!(response_json == false || contains(response_json,CONNECT_ERR_MSG)) && !(timeoutFlg)){
			timeoutFlg = true;
            // 次の処理実行
            console.log("画面レイアウト-画面階層マスタ更新処理完了");
            layoutTabImgFileExecute(dispDelFlg);
            // プログレスアイコン非表示
            document.getElementById('loading').setAttribute("hidden","hidden");
		}else{
			timeoutFlg = true;
		}
	})
}


/**
 * 画面プルダウンソート(50音順)処理
 */
 function layoutScreensSort() {
    maintenanceSortNum("layout_screens","option","value");
    return;
    // ノード取得
    var myUL = document.getElementById("layout_screens");
    var myNodeList = myUL.getElementsByTagName("option");
    // 配列取得
    var myArray = Array.prototype.slice.call(myNodeList);
    // ソート
    function compareText (a,b) {
        return a.textContent.localeCompare(b.textContent, 'ja');
        }
    myArray.sort(compareText);
    // ソート結果反映
    for (var i=0; i<myArray.length; i++) {
        myUL.appendChild(myUL.removeChild(myArray[i]))
    }
}