/**
 * メンテナンス用スクリプト
 */

var selLang = 'jp';
var editCnt = 0;
var menubook_set_mst_map = [];

window.addEventListener('load', function(){
    // 全般設定タブを初期表示
    getGeneralInfoGUI();
});

/**
 * アレルギー情報の新規登録処理
 */
function regist() {
    var name = document.getElementById('input_name');
    var calorie = document.getElementById('input_calorie');
    var salt = document.getElementById('input_salt');
    var materials = document.getElementById('input_materials');

    // 行を追加する親要素（テーブル）を取得
    var aller_list = document.getElementById('allergen_list_' + selLang);

    // タグを生成
    var newRow = document.createElement('tr');
    var newTd1 = document.createElement('td');
    var newTd2 = document.createElement('td');
    var newTd3 = document.createElement('td');
    var newTd4 = document.createElement('td');

    newTd1.innerHTML = name.innerHTML;
    newTd1.setAttribute('class','m-disp-body-name');
    newTd2.textContent = calorie.textContent;
    newTd2.setAttribute('class','m-disp-body-calorie');
    newTd3.textContent = salt.textContent;
    newTd3.setAttribute('class','m-disp-body-salt');
    newTd4.innerHTML = materials.innerHTML;
    newTd4.setAttribute('class','m-disp-body-allergy');
    newRow.appendChild(newTd1);
    newRow.appendChild(newTd2);
    newRow.appendChild(newTd3);
    newRow.appendChild(newTd4);

    // 行削除ボタン
    var newTd5 = document.createElement('td');
    newTd5.setAttribute('class','m-disp-body-del');
    var newDel = document.createElement('input');
    newDel.setAttribute('type', 'button');
    newDel.setAttribute('value', '削除');
    newDel.setAttribute('onclick', 'rowDelete(this);');
    newTd5.appendChild(newDel);
    newRow.appendChild(newTd5);
    
    aller_list.appendChild(newRow);

    // 入力行のセル内容をクリア
    name.innerHTML = '';
    calorie.textContent = '';
    salt.textContent = '';
    materials.innerHTML = '';
}

/**
 * ファイル読込処理
 */
function loadJson() {
    $.getJSON('./json/allergen.json', function(data) {
        for (var row in data) {
            // 言語毎のテーブル作成
            createTable(row, data[row]);
        }
    });
}

/**
 * 言語毎のテーブル作成処理
 * @param lang ：国コード
 * @param langData ：言語毎のテーブル情報
 */
function createTable(lang, langData) {
    // 一覧を追加する親要素を取得
    var parent = document.getElementById('allergen_list_' + lang);

    // 一覧の状態をクリア
    parent.textContent = null;

    for (var name in langData) {
        // 商品名
        var newRow = document.createElement('tr');
        var newTd1 = document.createElement('td');
        newTd1.innerHTML = name;
        newTd1.setAttribute('class','m-disp-body-name');
        newRow.appendChild(newTd1);
        // カロリー
        var newTd2 = document.createElement('td');
        newTd2.textContent = langData[name][0]['calorie'];
        newTd2.setAttribute('class','m-disp-body-calorie');
        newRow.appendChild(newTd2);
        // 塩分
        var newTd3 = document.createElement('td');
        newTd3.textContent = langData[name][0]['salt'];
        newTd3.setAttribute('class','m-disp-body-salt');
        newRow.appendChild(newTd3);
        // アレルギー
        var newTd4 = document.createElement('td');
        newTd4.innerHTML = langData[name][0]['materials'];
        newTd4.setAttribute('class','m-disp-body-allergy');
        newRow.appendChild(newTd4);

        // 行削除ボタン
        var newTd5 = document.createElement('td');
        newTd5.setAttribute('class','m-disp-body-del');
        var newDel = document.createElement('input');
        newDel.setAttribute('type', 'button');
        newDel.setAttribute('value', '削除');
        newDel.setAttribute('onclick', 'rowDelete(this);');
        newTd5.appendChild(newDel);
        newRow.appendChild(newTd5);

        // 行編集ボタン
        var newTd6 = document.createElement('td');
        newTd6.setAttribute('class', 'm-disp-body-del');
        var newEdit = document.createElement('input');
        newEdit.setAttribute('type', 'button');
        newEdit.setAttribute('value', '編集');
        newEdit.setAttribute('onclick', 'rowEdit(this);');
        newTd6.appendChild(newEdit);
        newRow.appendChild(newTd6);

        // テーブルに行を追加
        parent.appendChild(newRow);
    }
}

/**
 * ファイル保存処理
 */
function outputJson() {
    // 編集中の行が存在する場合、処理終了
    if (editCnt > 0) {
        alert('編集中の行があります。確定して下さい。');
        return;
    }

    // JSON形式の連想配列
    var jsonData = {};

    // 言語毎にJSON形式に出力するテーブル要素を取得し、１つの連想配列に集約する
    var aller_list_jp = document.getElementById('allergen_list_jp');
    var aller_list_en = document.getElementById('allergen_list_en');
    // var aller_list_cn = document.getElementById('allergen_list_cn');
    // var aller_list_kr = document.getElementById('allergen_list_kr');

    // if (aller_list_jp.rows.length != aller_list_en.rows.length ||
    //     aller_list_jp.rows.length != aller_list_cn.rows.length ||
    //     aller_list_jp.rows.length != aller_list_kr.rows.length) {
    if (aller_list_jp.rows.length != aller_list_en.rows.length) {
            alert("未登録の言語があります。");
        return;
    }

    jsonData['jp'] = createJsonList(aller_list_jp);
    jsonData['en'] = createJsonList(aller_list_en);
    console.log(jsonData);
    // jsonData['cn'] = createJsonList(aller_list_cn);
    // jsonData['kr'] = createJsonList(aller_list_kr);

    var result;

	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// 通信エラーポップアップ出力処理
			return;
		}
	},POST_TIMEOUT_TIME);

    // 非同期通信でPHPのファイル保存処理を呼出す
    $.when(
        $.ajax( {
            type:'POST',
            url:PHP_EN_ROOT_FOLDER + '/registAllergen.php',
            data:{
                'aData':jsonData
            },
            success:function(data) {
                result = data;
                if(result === false && !(timeoutFlg)) {
                    timeoutFlg = true;
                    return;
                }
            }
        })
    ).done(function() {
        if(!(timeoutFlg)){
            timeoutFlg = true;
            // 非同期通信の完了を監視
            if(result !== false) {
                prevDispRef();
                alert("登録が完了しました。");
            }

        }else{
            timeoutFlg = true;
        }
    });
}

/**
 * 言語毎の連想配列を作成する
 * @param targetTag ：対象のテーブルオブジェクト
 */
function createJsonList(targetTag) {
    // JSON形式の連想配列
    var langjsonData = {};

    // 1行毎に連想配列に格納
    var trInfo = targetTag.getElementsByTagName('tr');

    for (var i=0; i<trInfo.length; i++) {
        var tdInfo = trInfo[i].getElementsByTagName('td');
        var child_text = {"calorie": tdInfo[1].textContent, "salt": tdInfo[2].textContent, "materials": tdInfo[3].innerHTML};
        langjsonData[tdInfo[0].innerHTML] = [child_text];
    }
    return langjsonData;
}

/**
 * 行削除処理
 * @param btn ：削除対象行のボタンオブジェクト
 */
function rowDelete(btn) {
    // 削除ボタンを押下された行を取得
    var targetRow = btn.parentNode.parentNode;

    // 対象行のインデックスを取得
    var idx = targetRow.sectionRowIndex;

    // 親ノード（テーブル）から行を削除する
    var list_jp = document.getElementById('allergen_list_jp');
    var list_en = document.getElementById('allergen_list_en');
    // var list_cn = document.getElementById('allergen_list_cn');
    // var list_kr = document.getElementById('allergen_list_kr');
    if (list_jp.rows.length > idx) {
        list_jp.deleteRow(idx);
    }
    if (list_en.rows.length > idx) {
        list_en.deleteRow(idx);
    }
    // if (list_cn.rows.length > idx) {
    //     list_cn.deleteRow(idx);
    // }
    // if (list_kr.rows.length > idx) {
    //     list_kr.deleteRow(idx);
    // }
}

/**
 * 行編集処理
 * @param btn ：編集対象行のボタンオブジェクト
 */
function rowEdit(btn) {
    // 編集ボタンを押下された行を取得
    var targetRow = btn.parentNode.parentNode;

    // 対象行を編集モードにする
    btn.setAttribute('value', '確定');
    btn.setAttribute('onclick', 'rowConf(this);');
    targetRow.setAttribute('style', 'background-color: yellow;');
    editCnt++;
    
    // 対象行の商品名、アレルギータグを取得
    var trInfo = targetRow.getElementsByTagName('td');

    // セルを編集可能にする
    for (var i=0; i<4; i++) {
        trInfo[i].innerHTML = '<div contenteditable="true">' + trInfo[i].textContent + '</div>';
        trInfo[i].setAttribute('style', 'color: red;');
    }
}

/**
 * 行編集処理確定
 * @param btn 
 */
function rowConf(btn) {
    // 確定ボタンを押下された行を取得
    var targetRow = btn.parentNode.parentNode;

    // 対象の編集モードを解放する
    btn.setAttribute('value', '編集');
    btn.setAttribute('onclick', 'rowEdit(this);');
    targetRow.removeAttribute('style');
    editCnt--;

    // 対象行の商品名、アレルギータグを取得
    var trInfo = targetRow.getElementsByTagName('td');

    // セルを編集不可にする
    for (var i=0; i<4; i++) {
        trInfo[i].innerHTML = trInfo[i].childNodes[0].innerHTML;
        trInfo[i].removeAttribute('style');
    }
}

/**
 * 言語切替処理
 */
function chgLang(lang) {
    // 登録言語の切替
    if (lang == 'reg_jp' || lang == 'reg_en') {
        if (lang == 'reg_jp') {
            selLang = 'jp';
        } else if (lang == 'reg_en'){
            selLang = 'en'
        }
    }

    // 表示言語の切替
    if (lang == 'disp_jp' || lang == 'disp_en') {
        if (lang == 'disp_jp') {
            document.getElementById('en').setAttribute('style', 'display: none;');
            document.getElementById('jp').setAttribute('style', 'display: block;');
        } else if (lang == 'disp_en'){
            document.getElementById('jp').setAttribute('style', 'display: none;');
            document.getElementById('en').setAttribute('style', 'display: block;');
        }
    }
    // document.getElementById('jp').setAttribute('style', 'display: none;');
    // document.getElementById('en').setAttribute('style', 'display: none;');
    // document.getElementById('cn').setAttribute('style', 'display: none;');
    // document.getElementById('kr').setAttribute('style', 'display: none;');
    // document.getElementById(lang).setAttribute('style', 'display: block;');
    // selLang = lang;
}

/**
 * タブ切替処理
 * @param 1:アレルギー表示、2:全般設定、3:画面レイアウト
 */
function changeTab(type) {
    // タブボタン表示初期化
    var tabBtnAll = document.getElementsByClassName("tabBtnAll");
    for (var i=0; i < tabBtnAll.length; i++){
        // console.log(tabBtnAll[i].textContent);
        tabBtnAll[i].classList.remove("selectTabBtn");
    }

    // タブスクリーン表示初期化
    var alltab = document.getElementsByClassName("alltab");
    for (var i=0; i < alltab.length; i++){
        alltab[i].classList.add("is-hide");
    }

    // 選択タブの表示
    if(type == 1){
        // document.getElementById("allergy_tab").classList.remove("is-hide");
        // document.getElementById("tabBtn1").classList.add("selectTabBtn");
    }else if(type == 2){
        document.getElementById("general_tab").classList.remove("is-hide");
        document.getElementById("tabBtn2").classList.add("selectTabBtn");
        generalTabCreate();
    }else if(type == 3){
        document.getElementById("layout_tab").classList.remove("is-hide");
        document.getElementById("tabBtn3").classList.add("selectTabBtn");
        layoutTabCreate();
    }else if(type == 4){
        document.getElementById("linkber_tab").classList.remove("is-hide");
        document.getElementById("tabBtn4").classList.add("selectTabBtn");
        linkberTabCreate();
    }else if(type == 5){
        document.getElementById("goods_tab").classList.remove("is-hide");
        document.getElementById("tabBtn5").classList.add("selectTabBtn");
        getGoodsTables();
    }else if(type == 6){
        document.getElementById("text_tab").classList.remove("is-hide");
        document.getElementById("tabBtn6").classList.add("selectTabBtn");
        // getGoodsTables();
        getTextData();
    }
}

/**
 * nullチェック
 * @param チェック対象
 */
function isNotEmpty(data) {
    if(data == null){
        return false;
    }
    if(data == 'undefined'){
        return false;
    }
    if(data == ''){
        return false;
    }
    return true;
}

/**
 * サーチ処理
 * 　特定の文字列が含まれるかチェックする。
 * @param 検索対象文字列
 * @param 検索文字列
 */
function contains(str, inStr){
	var regexp = new RegExp(inStr);
	return str.search(regexp) !== -1;
}
/**
 * プレビュー表示更新処理
 */
function prevDispRef(menubookCd) {
    document.getElementById("prevDisp").src = '';
    change_pulldown("prevMenubookSelect",menubookCd);
    // // キャッシュクリア
    // $('#prevDisp').each(function() {
    //     this.contentWindow.location.reload(true);
    // });
    // ブック切替
    $(document).ready(function(){
        var URL = "../en_order/index.html?guiFlg=1&guiBookCd=1";
        var targetBookCd = document.getElementById("prevMenubookSelect").value;
        URL = URL.replace("guiBookCd=1","guiBookCd="+targetBookCd);
        document.getElementById("prevDisp").src = null;
        document.getElementById("prevDisp").src = URL;
    });
}

// メニューブックリストの生成
$(document).ready(function(){
    getMenuBookSettingMasterGUI();
});

/**
 * php実行処理（メニューブック設定マスタの取得）
 * 　非同期通信で情報を取得する
 */
function getMenuBookSettingMasterGUI() {
    console.log("プレビュー表示-メニューブック設定マスタ取得処理開始");
    // // プログレスアイコン表示
    document.getElementById('loading').removeAttribute("hidden");
    
    // タイムアウトフラグ
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
            // リトライ処理
            console.log("プレビュー表示-メニューブック設定マスタ取得処理失敗、リトライ");
			getMenuBookSettingMasterGUI();
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/getMenuBookSettingMasterGUI.php',
			success:function(data){
				// 汎用マスタ取得
                response_json = data;
				data = null;
				if(response_json == false || contains(response_json,CONNECT_ERR_MSG) && !(timeoutFlg)){
					timeoutFlg = true;
                    // リトライ処理
                    console.log("プレビュー表示-メニューブック設定マスタ取得処理失敗、リトライ");
					getMenuBookSettingMasterGUI();
					return false;
                }
                try{
                    // フォーマットチェック
                    response_map = JSON.parse(response_json);

                    menubook_set_mst_map = response_map;
                    console.log(menubook_set_mst_map);

                    var mbList = document.getElementById("prevMenubookSelect");
                    mbList.innerHTML = '';
                    for(var line in response_map) {
                        var newOption = document.createElement('option');
                        newOption.value = line;
                        newOption.textContent = response_map[line]["nMenuBookCode"]+"："+response_map[line]["cMenuBookName"];
                        mbList.appendChild(newOption);
                    }
                }catch(e){
                    // フォーマット不正の場合、リトライ
                    timeoutFlg = true;
                    console.log("プレビュー表示-メニューブック設定マスタ取得処理失敗、リトライ");
                    getMenuBookSettingMasterGUI();
					return false;
                }
			}
		})
	).done(function() {
		if(!(response_json == false || contains(response_json,CONNECT_ERR_MSG)) && !(timeoutFlg)){
			timeoutFlg = true;
            // 次の処理実行
            console.log("プレビュー表示-メニューブック設定マスタ取得処理完了");
            document.getElementById('loading').setAttribute("hidden","hidden");
		}else{
			timeoutFlg = true;
		}
	})
}


/**
 * ソート処理
 * @param ソート対象の親タグ
 * @param ソート対象の子タグ種類　※div li等
 * @param ソート対象の属性名
 */
 function maintenanceSort(parentTag,childTagType,elementName) {
    // ノード取得
    var myUL = document.getElementById(parentTag);
    var myNodeList = myUL.getElementsByTagName(childTagType);
    // 配列取得
    var myArray = Array.prototype.slice.call(myNodeList);
    // ソート
    function compareText (a,b) {
        if (a.getAttribute(elementName) > b.getAttribute(elementName))
            return 1;
        else if (a.getAttribute(elementName) < b.getAttribute(elementName))
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
 * @param ソート対象の親タグ
 * @param ソート対象の子タグ種類　※div li等
 * @param ソート対象の属性名
 */
 function maintenanceSortNum(parentTag,childTagType,elementName) {
    // ノード取得
    var myUL = document.getElementById(parentTag);
    var myNodeList = myUL.getElementsByTagName(childTagType);
    // 配列取得
    var myArray = Array.prototype.slice.call(myNodeList);
    // ソート
    function compareText (a,b) {
        if (parseInt(a.getAttribute(elementName)) > parseInt(b.getAttribute(elementName)))
            return 1;
        else if (parseInt(a.getAttribute(elementName)) < parseInt(b.getAttribute(elementName)))
            return -1;
        return 0;
        }
    myArray.sort(compareText);
    // ソート結果反映
    for (var i=0; i<myArray.length; i++) {
        myUL.appendChild(myUL.removeChild(myArray[i]))
    }
}
