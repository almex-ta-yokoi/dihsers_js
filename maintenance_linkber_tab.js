/**      リンクバータブ用処理           */

// 画面レイアウト情報取得結果
var linkberTab_general_map = [];

// サイドリンクバー情報取得結果
var linkberTab_sideLink_map = [];

/**
 * php実行処理1(画面階層管理マスタ取得)
 * 　非同期通信で情報を取得する
 */
 function getLinkbarTabLayoutInfoGUI() {
    console.log("リンクバー-画面階層管理マスタ取得処理開始");
    // プログレスアイコン表示
    document.getElementById('loading').removeAttribute("hidden");
    
    // タイムアウトフラグ
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
            // リトライ処理
            console.log("リンクバー-画面階層管理マスタ取得処理失敗、リトライ");
			getLinkbarTabLayoutInfoGUI();
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
                linkberTab_general_json = data;
				data = null;
				if(linkberTab_general_json == false || contains(linkberTab_general_json,CONNECT_ERR_MSG) && !(timeoutFlg)){
					timeoutFlg = true;
                    // リトライ処理
                    console.log("リンクバー-画面階層管理マスタ取得処理失敗、リトライ");
					getLinkbarTabLayoutInfoGUI();
					return false;
                }
                try{
                    // フォーマットチェック
                    linkberTab_general_map = JSON.parse(linkberTab_general_json);
                    bk_linkberTab_general_map = jQuery.extend(true, {}, linkberTab_general_map);
                    console.log(linkberTab_general_map);
                }catch(e){
                    // フォーマット不正の場合、リトライ
                    timeoutFlg = true;
                    console.log("リンクバー-画面階層管理マスタ取得処理失敗、リトライ");
                    getLinkbarTabLayoutInfoGUI();
					return false;
                }
			}
		})
	).done(function() {
		if(!(linkberTab_general_json == false || contains(linkberTab_general_json,CONNECT_ERR_MSG)) && !(timeoutFlg)){
			timeoutFlg = true;
            // 次の処理実行
            console.log("リンクバー-画面階層管理マスタ取得処理完了");
            getLinkbarTabLinkInfoGUI();
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * php実行処理2(サイドリンクバー管理マスタ取得)
 * 　非同期通信で情報を取得する
 */
 function getLinkbarTabLinkInfoGUI() {
    console.log("リンクバー-サイドリンクバー管理マスタ取得処理開始");
    // プログレスアイコン表示
    document.getElementById('loading').removeAttribute("hidden");
    
    // タイムアウトフラグ
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
            // リトライ処理
            console.log("リンクバー-サイドリンクバー管理マスタ取得処理失敗、リトライ");
			getLinkbarTabLinkInfoGUI();
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
                linkberTab_sideLink_json = data;
				data = null;
				if(linkberTab_sideLink_json == false || contains(linkberTab_sideLink_json,CONNECT_ERR_MSG) && !(timeoutFlg)){
					timeoutFlg = true;
                    // リトライ処理
                    console.log("リンクバー-サイドリンクバー管理マスタ取得処理失敗、リトライ");
					getLinkbarTabLinkInfoGUI();
					return false;
                }
                try{
                    // フォーマットチェック
                    linkberTab_sideLink_map = JSON.parse(linkberTab_sideLink_json);
                    // bk_linkberTab_general_map = jQuery.extend(true, {}, linkberTab_general_map);
                }catch(e){
                    // フォーマット不正の場合、リトライ
                    timeoutFlg = true;
                    console.log("リンクバー-サイドリンクバー管理マスタ取得処理失敗、リトライ");
                    getLinkbarTabLinkInfoGUI();
					return false;
                }
			}
		})
	).done(function() {
		if(!(linkberTab_sideLink_json == false || contains(linkberTab_sideLink_json,CONNECT_ERR_MSG)) && !(timeoutFlg)){
			timeoutFlg = true;
            // 次の処理実行
            console.log("リンクバー-サイドリンクバー管理マスタ取得処理完了");
            changeTab(4);
            // プログレスアイコン非表示
            document.getElementById('loading').setAttribute("hidden","hidden");
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * キャンセル処理
 */
function linkberDispCancelBtn() {
    // 編集前のlayoutTab_general_mapを復元
    linkberTab_sideLink_map = jQuery.extend(true, {}, bk_linkberTab_sideLink_map);
    // プルダウンをロック解除
    document.getElementById("linkber_menubooks").disabled = false;
    document.getElementById("linkber_linkbers").disabled = false;
    document.getElementById("linkber_tab_edit").classList.remove("is-hide");
    document.getElementById("linkber_tab_cancel").classList.add("is-hide");
    document.getElementById("linkber_tab_delete").classList.add("is-hide");
    document.getElementById("linkber_tab_disp_add").classList.remove("is-hide");
    // document.getElementById("layout_execute").classList.add("is-hide");
    document.getElementById("linkber_tab_edit_save").classList.add("is-hide");

    // 一覧初期化
    document.getElementById("linkber_detail").innerHTML = null;

    // プルダウン選択初期化
    // change_pulldown("layout_menubooks","99999");
    // change_pulldown("layout_screens","TOP画面");

    // メニューブックコード
    var menubookCd = document.getElementById("linkber_menubooks").value;
    // プレビュー初期化
    prevDispRef(menubookCd);
}

/**
 * 初期表示処理
 */
 function linkberTabCreate() {
    // 一覧を初期化
    document.getElementById("linkber_detail").innerHTML = null;

    // メニューブックプルダウンセット
    var menubooks = document.getElementById("linkber_menubooks");
    // 一旦初期化
    menubooks.innerHTML = null;
    // ブックをセット
    // var option = document.createElement("option");
    // option.value = 99999;
    // option.textContent = "ブック共通設定";
    // menubooks.appendChild(option);
    for(var msm in menubook_set_mst_map){
        var option = document.createElement("option");
        option.value = menubook_set_mst_map[msm]["nMenuBookCode"];
        option.textContent = menubook_set_mst_map[msm]["nMenuBookCode"]+":"+menubook_set_mst_map[msm]["cMenuBookName"];
        menubooks.appendChild(option);
    }

    // リンクバー選択プルダウン設定
    linkbersRef();
 }

 function linkbersRef(){
    // リンクバープルダウンセット
    var screens = document.getElementById("linkber_linkbers");
    // 一旦初期化
    screens.innerHTML = null;
    // リンクバーをセット
    // var cnt = 0;
    var tmpLinks = {};
    dispIdList = {};

    for(var lgm in linkberTab_sideLink_map){
        // 重複画面をスキップ
        if(linkberTab_sideLink_map[lgm]["nMenuBookCode"] == document.getElementById("linkber_menubooks").value
        && tmpLinks[linkberTab_sideLink_map[lgm]["nSideLinkId"]] == null){
            var option = document.createElement("option");
            // option.value = cnt;
            option.value = linkberTab_sideLink_map[lgm]["nSideLinkId"];
            option.textContent = linkberTab_sideLink_map[lgm]["cSideLinkName"];
            // セット済みの画面を記録
            tmpLinks[linkberTab_sideLink_map[lgm]["nSideLinkId"]] = "dummy";
            
            screens.appendChild(option);
        }
    }

    dispIdList = {};
    var tmpScreens = {};

    for(var lgm in linkberTab_general_map){
        if(lgm == 9){
            console.log("ts");
        }
        // 重複画面をスキップ
        if(linkberTab_general_map[lgm]["nMenuBookCode"] == document.getElementById("linkber_menubooks").value
        && tmpScreens[linkberTab_general_map[lgm]["nDispId"]] == null
        && linkberTab_general_map[lgm]["nDispId"] != "10001"
        && linkberTab_general_map[lgm]["nDispId"] != "10002"
        && linkberTab_general_map[lgm]["nDispId"] != "10003"){
            // 遷移先選択プルダウン用に画面IDを記録
            dispIdList[linkberTab_general_map[lgm]["nDispId"]] = linkberTab_general_map[lgm]["cDispName"];
            // セット済みの画面を記録
            tmpScreens[linkberTab_general_map[lgm]["nDispId"]] = "dummy";
        }
    }
    dispIdList["99999"] = "オーダーメイドディッシュ画面";
    dispIdList["0"] = "設定なし";
}

var bk_linkberTab_sideLink_map = [];
/**
 * 表示ボタン処理
 * @param バックアップ実行フラグ
 */
 function linkberDispBtn(bkFlg) {

    if(bkFlg){
        // 編集前のlinkberTab_sideLink_mapを保存
        bk_linkberTab_sideLink_map = jQuery.extend(true, {}, linkberTab_sideLink_map);
    }

    // プルダウンをロック
    document.getElementById("linkber_menubooks").disabled = true;
    document.getElementById("linkber_linkbers").disabled = true;
    document.getElementById("linkber_tab_cancel").classList.remove("is-hide");
    document.getElementById("linkber_tab_delete").classList.remove("is-hide");
    document.getElementById("linkber_tab_disp_add").classList.add("is-hide");
    // document.getElementById("linkber_execute").classList.remove("is-hide");
    document.getElementById("linkber_tab_edit").classList.add("is-hide");
    document.getElementById("linkber_tab_edit_save").classList.remove("is-hide");

    // 一覧取得
    var details = document.getElementById("linkber_detail");

    // 一覧を初期化
    details.innerHTML = null;

    // メニューブックコード
    var menubookCd = document.getElementById("linkber_menubooks").value;

    // // メニューブック名
    // var menubookName = menubook_set_mst_map[menubookCd] == null ? "ブック共通設定" : menubook_set_mst_map[menubookCd]["cMenuBookName"];

    // 画面ID
    var linkberId = document.getElementById("linkber_linkbers").value;

    var fstFlg = true;

    var fstline = "";

    // 機能（ボタン、背景等）毎に一覧データを生成
    for(tmpline in linkberTab_sideLink_map) {

        // 対象画面以外スキップ
        if(menubookCd == linkberTab_sideLink_map[tmpline]["nMenuBookCode"]
        && linkberId == linkberTab_sideLink_map[tmpline]["nSideLinkId"]){
            if(fstFlg){
                // 対象画面の初回行のみの処理
                // 初回フラグOFF
                fstFlg = false;
                // cSideLinkName サイドリンク名のセット
                details.appendChild(linkberTypeTitleCreate(tmpline));
            }

            // 項目名のセット
            var titleFlg = linkberTab_sideLink_map[tmpline]["nTitleFlg"] != "1";
            var titleTag = linkberTitleCreate(tmpline,titleFlg,titleFlg);

            if(titleFlg){
                // 順序入替↑ボタンセット
                titleTag.appendChild(linkbarIdxCngTagCreate(tmpline,"up"));
                // 順序入替↓ボタンセット
                titleTag.appendChild(linkbarIdxCngTagCreate(tmpline,"down"));
            }
            details.appendChild(titleTag);

            // 画像セット
            details.appendChild(linkbarImgTableCreate(tmpline));

            if(titleFlg){
                // 遷移先画面IDセット
                var nDispSizejp = linkbarPullDownFieldCreate(tmpline,"遷移先画面ID　","nAfDispId","300px","left",dispIdList);
                nDispSizejp.style.display = "inline-block";
                var txtPxJp = document.createElement("span");
                txtPxJp.textContent = "   ";
                nDispSizejp.appendChild(txtPxJp);
                details.appendChild(nDispSizejp);

                // 改行
                details.appendChild(document.createElement("br"));

                // メニュー区分セット
                var nDispPisition_Xjp = linkbarTextFieldCreate(tmpline,"メニュー区分 ※「,」区切りで複数指定可　","nSoldOutIcon_condition_type","100px","right","");
                nDispPisition_Xjp.style.display = "inline-block";
                var txtPxJp = document.createElement("span");
                txtPxJp.textContent = "";
                nDispPisition_Xjp.appendChild(txtPxJp);
                details.appendChild(nDispPisition_Xjp);

                // 改行
                details.appendChild(document.createElement("br"));

                // 商品コード-セット
                var nDispPisition_Xjp = linkbarTextFieldCreate(tmpline,"商品コード ※「,」区切りで複数指定可　","nSoldOutIcon_condition_cd","100px","right","");
                nDispPisition_Xjp.style.display = "inline-block";
                var txtPxJp = document.createElement("span");
                txtPxJp.textContent = "";
                nDispPisition_Xjp.appendChild(txtPxJp);
                details.appendChild(nDispPisition_Xjp);

            }
        }
    }

    // 項目追加ボタンのセット
    var addItemBtn_div = document.createElement("div");
    addItemBtn_div.style.marginTop = "40px";
    addItemBtn_div.style.position = "relative";
    addItemBtn_div.style.left = "70px";
    var addItemBtn_div_input = document.createElement("input");
    addItemBtn_div_input.type = "button";
    addItemBtn_div_input.setAttribute("onclick","linkbarAddItemBtn();");
    addItemBtn_div_input.classList.add("m-btn");
    addItemBtn_div_input.classList.add("layoutEdit-item-add");
    addItemBtn_div_input.value = "項目追加";
    addItemBtn_div_input.style.marginLeft = "30px";
    addItemBtn_div.appendChild(addItemBtn_div_input);

    details.appendChild(addItemBtn_div);

    // ファイル読み込み機能適用
    $(function(){
        $('.img_cng').on('change', function (e) {
            getId = "#"+e.target.id.replace("_cng","");
            var reader = new FileReader();
            reader.onload = function (e) {
                $(getId).attr('src', e.target.result);
            }
            reader.readAsDataURL(e.target.files[0]);
        });
    });

    // // プレビュー初期化
    // prevDispRef(menubookCd);
}

/**
 * 画像アップロード項目タグ生成処理(多言語)
 * @param key値(linkberTab_sideLink_map)
 * return tableタグ
 */
 function linkbarImgTableCreate(tmpline){
    // 背景画像-ファイルアップロード日本語
    var en_order_id = "sidelinkKey_"+linkberTab_sideLink_map[tmpline]["nItemId"];
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

    img_image_jp_image.src = linkberTab_sideLink_map[tmpline]["cDefaultImagePath"];
    img_image_jp_image.setAttribute("tmp",linkberTab_sideLink_map[tmpline]["cDefaultImagePath"]);

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

    img_image_en_image.src = linkberTab_sideLink_map[tmpline]["cDefaultImagePath"].replace("images/","images/otherLanguage/en/");
    img_image_en_image.setAttribute("tmp",linkberTab_sideLink_map[tmpline]["cDefaultImagePath"].replace("images/","images/otherLanguage/en/"));

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
    // if(linkberTab_sideLink_map[tmpline]["nDispType"] == "4" && linkberTab_sideLink_map[tmpline]["nDetailDispType"] == "2"){
    //     btnId = "_kids";
    // } else if (linkberTab_sideLink_map[tmpline]["nDispType"] == "4" && linkberTab_sideLink_map[tmpline]["nDetailDispType"] == "3"){
    //     btnId = "_drink";
    // } else if (linkberTab_sideLink_map[tmpline]["nDispType"] == "4" && linkberTab_sideLink_map[tmpline]["nDetailDispType"] == "4"){
    //     btnId = "_kids";
    // } else if (linkberTab_sideLink_map[tmpline]["nDispType"] == "8" && linkberTab_sideLink_map[tmpline]["nDetailDispType"] == "3"){
    //     btnId = "_drinkcup";
    // } else if (linkberTab_sideLink_map[tmpline]["nDispType"] == "9" && linkberTab_sideLink_map[tmpline]["nDetailDispType"] == "3"){
    //     btnId = "_drinkcupbg";
    // }
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
    // if(linkberTab_sideLink_map[tmpline]["nDispType"] == "4" && linkberTab_sideLink_map[tmpline]["nDetailDispType"] == "2"){
    //     btnId = "_kids";
    // } else if (linkberTab_sideLink_map[tmpline]["nDispType"] == "4" && linkberTab_sideLink_map[tmpline]["nDetailDispType"] == "3"){
    //     btnId = "_drink";
    // } else if (linkberTab_sideLink_map[tmpline]["nDispType"] == "4" && linkberTab_sideLink_map[tmpline]["nDetailDispType"] == "4"){
    //     btnId = "_kids";
    // } else if (linkberTab_sideLink_map[tmpline]["nDispType"] == "8" && linkberTab_sideLink_map[tmpline]["nDetailDispType"] == "3"){
    //     btnId = "_drinkcup";
    // } else if (linkberTab_sideLink_map[tmpline]["nDispType"] == "9" && linkberTab_sideLink_map[tmpline]["nDetailDispType"] == "3"){
    //     btnId = "_drinkcupbg";
    // }
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
 * タイトルタグ生成処理
 * @param key値(linkberTab_sideLink_map)
 * @param タイトル編集可否
 * @param 項目削除ボタン有無
 * return タグ
 */
 function linkberTitleCreate(tmpline,editFlg,deleteBtnFlg){
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
        div_input.value = linkberTab_sideLink_map[tmpline]["cItemName"];
        div_input.setAttribute("onchange","linkberTab_sideLink_map["+tmpline+"]['cItemName'] = this.value");
        div_input.setAttribute("oninput","value=titleReplace(value)");
        div.appendChild(div_input);

        if(deleteBtnFlg){
            // 削除ボタン表示
            var div_input2 = document.createElement("input");
            div_input2.setAttribute("onclick","linkberDeleteItemBtn("+tmpline+");");
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
        div_span.textContent = "■"+linkberTab_sideLink_map[tmpline]["cItemName"];
        div.appendChild(div_span);

        if(deleteBtnFlg){
            // 削除ボタン表示
            var div_input2 = document.createElement("input");
            div_input2.setAttribute("onclick","linkberDeleteItemBtn("+tmpline+");");
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
 * リンクバー種別名項目処理
 * @param key値(linkberTab_sideLink_map)
 * @param 項目削除ボタン有無
 * return タグ
 */
 function linkberTypeTitleCreate(tmpline){
    // 編集可の場合
    var div = document.createElement("div");
    div.style.marginTop = "20px";
    div.style.position = "relative";
    div.style.left = "100px";
    // div.style.maxWidth = "200px";

    var menubookCd = document.getElementById("linkber_menubooks").value;

    // タイトル-タイトル
    div_span = document.createElement("span");
    div_span.textContent = "■リンクバー名　";
    div.appendChild(div_span);

    div_input = document.createElement("input");
    div_input.type = "text";
    div_input.style.position = "relative";
    div_input.style.left = "0px";
    div_input.style.height = "20px";
    div_input.style.width = "300px";
    div_input.value = linkberTab_sideLink_map[tmpline]["cSideLinkName"];
    div_input.setAttribute("onchange","linkbarNameChange("+linkberTab_sideLink_map[tmpline]["nSideLinkId"]+",value,"+menubookCd+");");
    div_input.setAttribute("oninput","value=titleReplace(value)");
    div.appendChild(div_input);

    return div;
}

/**
 * リンクバー種別名変更処理
 * @param リンクバーID
 * @param リンクバー種別名
*/
function linkbarNameChange(linkbarId,value,menubookCd){
    for(var lsm in linkberTab_sideLink_map){
        if(linkberTab_sideLink_map[lsm]["nSideLinkId"] == linkbarId
            && linkberTab_sideLink_map[lsm]["nMenuBookCode"] == menubookCd){
            // 同一画面ID行のリンクバー種別名を全て書換
            linkberTab_sideLink_map[lsm]["cSideLinkName"] = value;
        }
    }
}

/**
 * 項目削除ボタン処理
 * @param 削除対象行
*/
function linkberDeleteItemBtn(deleteline){
    var result = window.confirm('項目を削除します。よろしいですか？');
    if(result){
        // マップから対象データ削除
        delete linkberTab_sideLink_map[deleteline];
        // 一覧リフレッシュ
        linkberDispBtn(false);
        // プレビュー再表示
        linkberLayoutTabPrev();
    }
}

/**
 * プレビュー反映処理
 */
 function linkberLayoutTabPrev() {
    // 配列に最新情報取込
    // layoutTab_general_map_cpy = layoutTabArrayUpdate(layoutTab_general_map);
    linkberTab_general_map_cpy = linkberTab_general_map;
    linkberTab_sideLink_map_cpy = linkberTab_sideLink_map;
    console.log("プレビュー反映用配列生成完了");

    var guiPrevPost = function(map,map2){
        var info = {
            'message_id': 'gui_prev',
            'message_body': map,
            'message_body2': map2
        };
        postParent(info);
    }
    // エンタメに配列を連携
    guiPrevPost(linkberTab_general_map_cpy,linkberTab_sideLink_map_cpy);
    console.log("プレビュー反映完了");
}

/**
 * プルダウンフィールドタグ生成処理
 * @param key値(linkberTab_sideLink_map)
 * @param 項目タイトル
 * @param 対象カラム名
 * @param テキストフィールド幅(pxまで含む文字列)
 * @param 文字の左右寄せ(right Or left)
 * @param オプション配列 ※例[{1:"小"},{2:"中"},{3:"大"}]
 * return タグ
 */
 function linkbarPullDownFieldCreate(tmpline,tagTitle,clmName,fWidth,textAlign,optionArray){
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
    select.value = linkberTab_sideLink_map[tmpline][clmName];
    select.setAttribute("onchange","linkberTab_sideLink_map["+tmpline+"]['"+clmName+"'] = this.value;linkberLayoutTabPrev();");

    for(var oa in optionArray){
        var option = document.createElement("option");
        option.value = oa;
        option.textContent = optionArray[oa];
        if(oa == linkberTab_sideLink_map[tmpline][clmName]){
            option.selected = true;
        }
        select.appendChild(option);
    }

    div.appendChild(select);

    return div;
}

/**
 * 順序ボタンタグ生成処理
 * @param key値(linkberTab_sideLink_map)
 * @param "up" or "down"
 * return タグ
 */
function linkbarIdxCngTagCreate(tmpline, type){
    // メモ　流用タグ
    //<input onclick="" type="button" class="m-btn layoutEdit-item-delete" value="↑">

    // メモ　書き換えcss
    // margin-left: 10px;　※↓は0
    // width: 25px;
    // background-image: none;
    // color: black;
    var input = document.createElement("input");
    input.classList.add("m-btn");
    input.classList.add("change-index-btn");

    if(type == "up"){
        // ↑移動の場合
        input.value = "↑";
        input.setAttribute("onclick","linkbarIndexChange("+tmpline+", 'up')");
    } else {
        // ↓移動の場合
        input.value = "↓";
        input.style.marginLeft = "0px";
        input.setAttribute("onclick","linkbarIndexChange("+tmpline+", 'down')");
    }
    return input;


}

/**
 * 順序入替処理
 * @param key値(linkberTab_sideLink_map)
 * @param "up" or "down"
 * return タグ
 */
function linkbarIndexChange(tmpline, type){
    // 対象行をコピー保存
    var baseLineCpy = jQuery.extend(true, {}, linkberTab_sideLink_map[tmpline]);
    // ↑行
    var upLineCpy = {};
    // ↓行
    var downLineCpy = {};
    // 最下行フラグ
    var maxUnderFlg = false;
    // 対象の項目ID
    var nItemId = parseInt(baseLineCpy["nItemId"]);
    for(var lsm in linkberTab_sideLink_map){
        if(linkberTab_sideLink_map[lsm]["nMenuBookCode"] == baseLineCpy["nMenuBookCode"]
        && linkberTab_sideLink_map[lsm]["nSideLinkId"] == baseLineCpy["nSideLinkId"]){
            // 同サイドリンクバー行の場合
            if(maxUnderFlg){
                // 最下行でないことを検知した場合
                maxUnderFlg = false;
            }

            var checkItemId = parseInt(linkberTab_sideLink_map[lsm]["nItemId"]);
            if(nItemId - checkItemId == -1 && type == "down"){
                // 一つ↓の行の場合、行を保存
                downLineCpy = jQuery.extend(true, {}, linkberTab_sideLink_map[lsm]);
            } else if(nItemId - checkItemId == 1 && type == "up"){
                // 一つ↑の行の場合、行を保存
                upLineCpy = jQuery.extend(true, {}, linkberTab_sideLink_map[lsm]);
            } else if(nItemId - checkItemId == 0){
                // 対象行の場合、一旦最下行フラグON
                maxUnderFlg = true;
            }

        }
    }
    if(type == "up"){
        // ↑移動の場合
        if(nItemId >= 10003){
            // 対象行・↑行を一旦削除
            delete linkberTab_sideLink_map[baseLineCpy["nSidLinkBerCode"]];
            delete linkberTab_sideLink_map[upLineCpy["nSidLinkBerCode"]];

            // キー値を入替
            var kbKey = baseLineCpy["nSidLinkBerCode"];
            baseLineCpy["nSidLinkBerCode"] = upLineCpy["nSidLinkBerCode"];
            upLineCpy["nSidLinkBerCode"] = kbKey;

            // 入替後データセット
            linkberTab_sideLink_map[baseLineCpy["nSidLinkBerCode"]] = baseLineCpy;
            linkberTab_sideLink_map[upLineCpy["nSidLinkBerCode"]] = upLineCpy;

            itemIdRef(baseLineCpy["nMenuBookCode"]);

            linkberDispBtn(false);

            // プレビュー再表示
            linkberLayoutTabPrev();
        }
    } else {
        // ↓移動の場合
        if(!maxUnderFlg){
            // 最下行でない場合、対象行・↓行を一旦削除
            delete linkberTab_sideLink_map[baseLineCpy["nSidLinkBerCode"]];
            delete linkberTab_sideLink_map[downLineCpy["nSidLinkBerCode"]];

            // キー値を入替
            var kbKey = baseLineCpy["nSidLinkBerCode"];
            baseLineCpy["nSidLinkBerCode"] = downLineCpy["nSidLinkBerCode"];
            downLineCpy["nSidLinkBerCode"] = kbKey;

            // 入替後データセット
            linkberTab_sideLink_map[baseLineCpy["nSidLinkBerCode"]] = baseLineCpy;
            linkberTab_sideLink_map[downLineCpy["nSidLinkBerCode"]] = downLineCpy;

            itemIdRef(baseLineCpy["nMenuBookCode"]);

            linkberDispBtn(false);

            // プレビュー再表示
            linkberLayoutTabPrev();
        }
    }
}

/**
 * アイテムID順序整形処理
 * @param メニューブックコード
 */
function itemIdRef(menubookCd){
    var itemNo = 10001;
    for(var lsm in linkberTab_sideLink_map){
        if(linkberTab_sideLink_map[lsm]["nMenuBookCode"] == menubookCd){
            linkberTab_sideLink_map[lsm]["nItemId"] = itemNo;
            itemNo++;
        }
    }
}


/**
 * 画像ファイル反映処理
 */
 function linkbarLayoutTabImgFileExecute(dispDelFlg) {
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
    for(var bl in bk_linkberTab_sideLink_map){
        if(linkberTab_sideLink_map[bl] == null
            && bk_linkberTab_sideLink_map[bl]["cDefaultImagePath"] != ""){
            // 編集によって消えている行の場合
            var deleteImgJp = bk_linkberTab_sideLink_map[bl]["cDefaultImagePath"];
            deleteImgJp = deleteImgJp.replace(/\//g,'\\').replace('images','..\\images');
            var deleteImgEn = bk_linkberTab_sideLink_map[bl]["cDefaultImagePath"].replace("images/","images/otherLanguage/en/");
            deleteImgEn = deleteImgEn.replace(/\//g,'\\').replace('images','..\\images');
            imgList[deleteImgJp] = {"filePath":deleteImgJp,"imgData":"","del":1,"delfolder":0};
            imgList[deleteImgEn] = {"filePath":deleteImgEn,"imgData":"","del":1,"delfolder":0};
        }
    }

    if(dispDelFlg){
        // 画面削除の場合
        var menubookCd = document.getElementById("linkber_menubooks").value;
        var dispId = document.getElementById("linkber_linkbers").value;
        var deleteImgJp = "images/linkbar/"+menubookCd+"/"+dispId;
        deleteImgJp = deleteImgJp.replace(/\//g,'\\').replace('images','..\\images');
        var deleteImgEn = ("images/linkbar/"+menubookCd+"/"+dispId).replace("images/","images/otherLanguage/en/");
        deleteImgEn = deleteImgEn.replace(/\//g,'\\').replace('images','..\\images');
        imgList[deleteImgJp] = {"filePath":deleteImgJp,"imgData":"","del":0,"delfolder":1};
        imgList[deleteImgEn] = {"filePath":deleteImgEn,"imgData":"","del":0,"delfolder":1};
    }

    if(Object.keys(imgList).length == 0){
        // 画像変更なしの場合ここで終了
        console.log("リンクバー-画像ファイル反映処理完了");
        document.getElementById('loading').setAttribute("hidden","hidden");
        return;
    }



    // 送信処理開始
    console.log("リンクバー-画像ファイル反映処理開始");
    // タイムアウトフラグ
    var timeoutFlg = false;

    // タイムアウト処理
    setTimeout(function(){
        if(!(timeoutFlg)){
            timeoutFlg = true;
            // リトライ処理
            console.log("リンクバー-画像ファイル反映処理失敗、リトライ");
            alert("リンクバー-画像ファイル反映処理がタイムアウトしました。");
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
                    timeoutFlg = true;
                    console.log("リンクバー-画像ファイル反映処理失敗-容量オーバー");
                    alert("画像の総容量が25MBを超えているため、画像の反映をスキップしました。");
                    document.getElementById('loading').setAttribute("hidden","hidden");
                    return false;
                }else if(response_json != true && !(timeoutFlg)){
                    timeoutFlg = true;
                    // リトライ処理
                    console.log("リンクバー-画像ファイル反映処理失敗");
                    alert("リンクバー-画像ファイル反映処理に失敗しました。");
                    document.getElementById('loading').setAttribute("hidden","hidden");
                    return false;
                }
            }
        })
    ).done(function() {
        if(response_json == true && !(timeoutFlg)){
            timeoutFlg = true;
            // 次の処理実行
            console.log("リンクバー-画像ファイル反映処理完了");
            alert("登録が完了しました。");
            document.getElementById('loading').setAttribute("hidden","hidden");
            // キャンセルボタン押下処理実行
            // dispCancelBtn();
            // getLayoutInfoGUI();
        }else{
            timeoutFlg = true;
        }
    })
}

/**
 * テーブル主キー採番処理
 * @return 主キー値
 */
 function linkbarKeyCdCreate() {
    var keyCd = 0;
    for(var lgm in linkberTab_sideLink_map){
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
 * DB反映処理
 */
 function linkbarLayoutTabExecute() {
    linkbarLayoutTabImgFileExecute(false);
    // 主キーの採番
    var pKey = linkbarKeyCdCreate();
    var sendFormatAll = "";
    var copyMenubookCd = document.getElementById("linkber_menubooks").value;
    var copyLinkId = document.getElementById("linkber_linkbers").value;
    for(var lgm in linkberTab_sideLink_map){
        if(linkberTab_sideLink_map[lgm]["nMenuBookCode"] == copyMenubookCd && linkberTab_sideLink_map[lgm]["nSideLinkId"] == copyLinkId){
            // コピー対象画面設定行の場合
            var sendFormat = baseLinkbarSendFormat;
            sendFormat = sendFormat.replace("{nSidLinkBerCode}",pKey)
                        .replace("{nMenuBookCode}",linkberTab_sideLink_map[lgm]["nMenuBookCode"])
                        .replace("{nSideLinkId}",linkberTab_sideLink_map[lgm]["nSideLinkId"])
                        .replace("{cSideLinkName}","'"+linkberTab_sideLink_map[lgm]["cSideLinkName"]+"'")
                        .replace("{nItemId}",linkberTab_sideLink_map[lgm]["nItemId"])
                        .replace("{cItemName}","'"+linkberTab_sideLink_map[lgm]["cItemName"]+"'")
                        .replace("{cDefaultImagePath}","'"+linkberTab_sideLink_map[lgm]["cDefaultImagePath"]+"'")
                        .replace("{nAfDispId}",linkberTab_sideLink_map[lgm]["nAfDispId"])
                        .replace("{nTitleFlg}","'"+linkberTab_sideLink_map[lgm]["nTitleFlg"]+"'")
                        .replace("{nSoldOutIcon_condition_type}","'"+linkberTab_sideLink_map[lgm]["nSoldOutIcon_condition_type"]+"'")
                        .replace("{nSoldOutIcon_condition_cd}","'"+linkberTab_sideLink_map[lgm]["nSoldOutIcon_condition_cd"]+"'")
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
    linkbarUpdateHierarchyGUI(sendFormatAll,copyLinkId,copyMenubookCd);
}

/**
 * 画面階層マスタ更新処理
 * @param insertデータ
 */
 function linkbarUpdateHierarchyGUI(insertData,nDispId,nMenuBookCode) {
    console.log("リンクバー-画面階層マスタ更新処理開始");
    // プログレスアイコン表示
    document.getElementById('loading').removeAttribute("hidden");
    
    // タイムアウトフラグ
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
            // リトライ処理
            console.log("リンクバー-画面階層マスタ更新処理失敗、リトライ");
			// updateHierarchyGUI();
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/linkbarUpdateHierarchyGUI.php',
            data:{
                'insertData':insertData,
                'nDispId':nDispId,
                'nMenuBookCode':nMenuBookCode
            },
			success:function(data){
				// 汎用マスタ取得
                response_json = data;
				data = null;
				if(response_json == false || contains(response_json,CONNECT_ERR_MSG) && !(timeoutFlg)){
					timeoutFlg = true;
                    // リトライ処理
                    console.log("リンクバー-画面階層マスタ更新処理失敗、リトライ");
					// updateHierarchyGUI();
					return false;
                }
			}
		})
	).done(function() {
		if(!(response_json == false || contains(response_json,CONNECT_ERR_MSG)) && !(timeoutFlg)){
			timeoutFlg = true;
            // 次の処理実行
            console.log("リンクバー-画面階層マスタ更新処理完了");
            // タブをリセット
            linkberDispCancelBtn();getLinkbarTabLayoutInfoGUI();
            // プログレスアイコン非表示
            document.getElementById('loading').setAttribute("hidden","hidden");
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * 項目追加ボタン処理
 */
 function linkbarAddItemBtn(){
    // 一覧取得
    var details = document.getElementById("linkber_detail");
    // 対象画面ID取得
    var tgtLinkId = document.getElementById("linkber_linkbers").value;
    // 対象メニューブック取得
    var tgtMenubookCd = document.getElementById("linkber_menubooks").value;

    // 主キー採番
    var createKey = linkbarKeyCdCreate();
    // 最大アイテムIDのキー取得
    var maxKey = linkbarKeyCdGetMax(tgtLinkId,tgtMenubookCd);
    // アイテムID採番
    var createItemId = parseInt(linkberTab_sideLink_map[maxKey]["nItemId"]);
    createItemId++;

    // 遷移ボタン
    linkberTab_sideLink_map[createKey] = 
    {"cDefaultImagePath": 'images/linkbar/'+tgtMenubookCd+"/"+tgtLinkId+'/'+tgtLinkId+'_'+createItemId+'.png',
    "cSideLinkName": linkberTab_sideLink_map[maxKey]["cSideLinkName"],
    "cItemName": '新規リンク',
    "nAfDispId": '0',
    "nTitleFlg": '0',
    "nSoldOutIcon_condition_type": '',
    "nSoldOutIcon_condition_cd": '',
    "nSideLinkId": tgtLinkId,
    "nSidLinkBerCode": createKey,
    "nItemId": createItemId,
    "nMenuBookCode": tgtMenubookCd,
    "tCreateTime": '0000-00-00 00:00:00',
    "tUpdateTime": '0000-00-00 00:00:00'};
    linkberDispBtn(false);
    // プレビュー反映
    linkberLayoutTabPrev();
}

/**
 * 項目追加ボタン処理
 */
 function linkbarCreateFixBtn(){
    // 一覧取得
    var details = document.getElementById("linkber_detail");
    // 対象メニューブック取得
    var tgtMenubookCd = document.getElementById("linkber_menubooks").value;
    // リンクバーコード採番
    var tgtLinkId = linkbarLinkIdGetMax(tgtMenubookCd)+1;

    // 主キー採番
    var createKey = linkbarKeyCdCreate();
    // 最大アイテムIDのキー取得
    var maxKey = linkbarKeyCdGetMax(tgtLinkId,tgtMenubookCd);

    // 遷移ボタン
    linkberTab_sideLink_map[createKey] = 
    {"cDefaultImagePath": 'images/linkbar/'+tgtMenubookCd+"/"+tgtLinkId+'/'+tgtLinkId+'_'+'10001'+'.png',
    "cSideLinkName": '新規リンクバー',
    "cItemName": 'タイトル',
    "nAfDispId": '0',
    "nTitleFlg": '1',
    "nSoldOutIcon_condition_type": '',
    "nSoldOutIcon_condition_cd": '',
    "nSideLinkId": tgtLinkId,
    "nSidLinkBerCode": createKey,
    "nItemId": '10001',
    "nMenuBookCode": tgtMenubookCd,
    "tCreateTime": '0000-00-00 00:00:00',
    "tUpdateTime": '0000-00-00 00:00:00'};

    // 主キーの採番
    var pKey = linkbarKeyCdCreate();
    var sendFormatAll = "";
    var copyMenubookCd = document.getElementById("linkber_menubooks").value;
    var copyLinkId = tgtLinkId;
    for(var lgm in linkberTab_sideLink_map){
        if(linkberTab_sideLink_map[lgm]["nMenuBookCode"] == copyMenubookCd && linkberTab_sideLink_map[lgm]["nSideLinkId"] == copyLinkId){
            // コピー対象画面設定行の場合
            var sendFormat = baseLinkbarSendFormat;
            sendFormat = sendFormat.replace("{nSidLinkBerCode}",pKey)
                        .replace("{nMenuBookCode}",linkberTab_sideLink_map[lgm]["nMenuBookCode"])
                        .replace("{nSideLinkId}",linkberTab_sideLink_map[lgm]["nSideLinkId"])
                        .replace("{cSideLinkName}","'"+linkberTab_sideLink_map[lgm]["cSideLinkName"]+"'")
                        .replace("{nItemId}",linkberTab_sideLink_map[lgm]["nItemId"])
                        .replace("{cItemName}","'"+linkberTab_sideLink_map[lgm]["cItemName"]+"'")
                        .replace("{cDefaultImagePath}","'"+linkberTab_sideLink_map[lgm]["cDefaultImagePath"]+"'")
                        .replace("{nAfDispId}",linkberTab_sideLink_map[lgm]["nAfDispId"])
                        .replace("{nTitleFlg}","'"+linkberTab_sideLink_map[lgm]["nTitleFlg"]+"'")
                        .replace("{nSoldOutIcon_condition_type}","'"+linkberTab_sideLink_map[lgm]["nSoldOutIcon_condition_type"]+"'")
                        .replace("{nSoldOutIcon_condition_cd}","'"+linkberTab_sideLink_map[lgm]["nSoldOutIcon_condition_cd"]+"'")
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
    linkbarUpdateHierarchyGUI(sendFormatAll,copyLinkId,copyMenubookCd);
}

/**
 * 対象画面の最大アイテムID行取得処理
 * @param 画面ID
 * @param 画面メニューブックコード
 * @return キー値
 */
 function linkbarKeyCdGetMax(linkId,menubookCd){
    var maxId = 0;
    var maxKey = 0;
    for(var lgm in linkberTab_sideLink_map){
        if(linkberTab_sideLink_map[lgm]["nSideLinkId"] == linkId
        && linkberTab_sideLink_map[lgm]["nMenuBookCode"] == menubookCd){
            // 対象画面の場合
            var itemId = parseInt(linkberTab_sideLink_map[lgm]["nItemId"]);
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
 * 対象画面の最大アイテムID行取得処理
 * @param 画面メニューブックコード
 * @return 最大リンクID
 */
 function linkbarLinkIdGetMax(menubookCd){
    var maxId = 0;
    for(var lgm in linkberTab_sideLink_map){
        if(linkberTab_sideLink_map[lgm]["nMenuBookCode"] == menubookCd){
            // 対象画面の場合
            var sideLinkId = parseInt(linkberTab_sideLink_map[lgm]["nSideLinkId"]);
            if(sideLinkId >= maxId){
                // 高いID値の場合記録
                maxId = sideLinkId;
            }
        }
    }
    return maxId;
}

/**
 * 表示ボタン処理
 */
function linkbarDeleteBtn() {
    var result = window.confirm('リンクバーを削除します。よろしいですか？');
    if(result){
        var linkId = document.getElementById("linkber_linkbers").value;
        var menubookCd = document.getElementById("linkber_menubooks").value;
        linkbarLayoutTabImgFileExecute(true);
        linkbarUpdateHierarchyGUI("",linkId,menubookCd);
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
 function linkbarTextFieldCreate(tmpline,tagTitle,clmName,fWidth,textAlign,oninput){
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
    div_input.value = linkberTab_sideLink_map[tmpline][clmName];
    div_input.setAttribute("oninput",oninput);
    div_input.setAttribute("onchange","linkberTab_sideLink_map["+tmpline+"]['"+clmName+"'] = this.value;linkberLayoutTabPrev();");
    // div_input.setAttribute("oninput","value=titleReplace(value)");
    div.appendChild(div_input);

    return div;
}