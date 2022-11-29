/**      文言設定タブ用処理           */

var text_map = [];

/**
 * php実行処理1(文言情報取得)
 * 　非同期通信で情報を取得する
 */
 function getTextData() {
    console.log("文言設定-文言情報取得処理開始");
    // プログレスアイコン表示
    document.getElementById('loading').removeAttribute("hidden");
    
    // タイムアウトフラグ
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
            // リトライ処理
            console.log("文言設定-文言情報取得処理失敗、リトライ");
			getTextData();
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/getTextDataGUI.php',
			success:function(data){
				// 汎用マスタ取得
                response_json = data;
				if(response_json == false || contains(response_json,CONNECT_ERR_MSG) && !(timeoutFlg)){
					timeoutFlg = true;
                    // リトライ処理
                    console.log("文言設定-文言情報取得処理失敗、リトライ");
					getTextData();
					return false;
                }
                try{
                    // フォーマットチェック
                    text_map = JSON.parse(response_json);

                }catch(e){
                    // フォーマット不正の場合、リトライ
                    timeoutFlg = true;
                    console.log("文言設定-文言情報取得処理失敗、リトライ");
                    getTextData();
					return false;
                }
			}
		})
	).done(function() {
		if(!(response_json == false || contains(response_json,CONNECT_ERR_MSG)) && !(timeoutFlg)){
			timeoutFlg = true;
            // 次の処理実行
            console.log("文言設定-文言情報取得処理完了");
            textFstCreate();
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * php実行処理2(文言情報登録)
 * 　非同期通信で情報を取得する
 *  @param queryData
 */
 function setTextData(queryData) {
    console.log("文言設定-文言情報登録処理開始");
    // プログレスアイコン表示
    document.getElementById('loading').removeAttribute("hidden");
    
    // タイムアウトフラグ
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
            // リトライ処理
            console.log("文言設定-文言情報登録処理失敗、リトライ");
			setTextData(queryData);
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/sendTextDataGUI.php',
            data:{
                'insertData':queryData,
            },
			success:function(data){
                response_json = data;
				if(response_json == false || contains(response_json,CONNECT_ERR_MSG) && !(timeoutFlg)){
					timeoutFlg = true;
                    // リトライ処理
                    console.log("文言設定-文言情報登録処理失敗、リトライ");
					setTextData(queryData);
					return false;
                }
			}
		})
	).done(function() {
		if(!(response_json == false || contains(response_json,CONNECT_ERR_MSG)) && !(timeoutFlg)){
			timeoutFlg = true;
            // 次の処理実行
            console.log("文言設定-文言情報登録処理完了");
            document.getElementById("tabBtn6").click();
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * 初期表示処理
 */
 function textFstCreate(){

    var textDetails = document.getElementById("textDetails");
    // 初期化
    textDetails.innerHTML = '<tr style="height: 30px; background-color: deepskyblue;"><th style="width:5%;">No</th><th style="width:21%;">項目名</th><th style="width:37%;">日本語</th><th style="width:37%;">英語</th></tr>';

    for(var tm in text_map){
        var tr = document.createElement("tr");
        tr.classList.add("text_data");
        
        var no_td = document.createElement("td");
        no_td.textContent = text_map[tm]["byId"];
        tr.appendChild(no_td);

        var title_td = document.createElement("td");
        title_td.textContent = text_map[tm]["cValue2"];
        tr.appendChild(title_td);

        var jpText_td = document.createElement("td");
        var jpText_td_textArea = document.createElement("textarea");
        jpText_td_textArea.classList.add("textArea");
        jpText_td_textArea.classList.add("cancelEnter");
        jpText_td_textArea.textContent = text_map[tm]["cValue3"];
        jpText_td.appendChild(jpText_td_textArea);
        tr.appendChild(jpText_td);

        var enText_td = document.createElement("td");
        var enText_td_textArea = document.createElement("textarea");
        enText_td_textArea.classList.add("textArea");
        enText_td_textArea.classList.add("cancelEnter");
        enText_td_textArea.textContent = text_map[tm]["cValue4"];
        enText_td.appendChild(enText_td_textArea);
        tr.appendChild(enText_td);

        textDetails.appendChild(tr);
    }

    // テキストエリアをエンター(改行)禁止化
    $(function () {
        $('.cancelEnter')
            // cancelEnterとついたクラスにkeydownイベントを付与
            .on('keydown', function (e) {
                // e.key == 'Enter'でエンターキーが押された場合の条件を設定
                if (e.key == 'Enter') {
                    // 何もせずに処理を終える
                    return false;
                }
            })
    });

    // プログレスアイコン非表示
    document.getElementById('loading').setAttribute("hidden","hidden");
 }

 /**
 * 文言情報更新処理
 */
  function textExecuteQuery(){
    // 入力チェック
    // なし

    // 登録確認モーダル
    var result = window.confirm('変更データを登録します。よろしいですか？');
    if(!result){
        return;
    }

    // インサートデータ生成
    var sendFormatAll = "";
    var details = document.getElementsByClassName("text_data");
    for(var i=0;i < details.length;i++){
        var sendFormat = genericFormat;
        var detailNo = details[i].children[0].textContent;
        var detailTitle = details[i].children[1].textContent;
        var detailJpText = details[i].children[2].getElementsByTagName("textarea")[0].value;
        var detailEnText = details[i].children[3].getElementsByTagName("textarea")[0].value;
        var tUpdateTime = "";
        if(text_map[detailNo]["cValue3"] == detailJpText && text_map[detailNo]["cValue4"] == detailEnText){
            tUpdateTime = '"'+text_map[detailNo]["tUpdateTime"]+'"';
        } else {
            tUpdateTime = "now()";
        }

        sendFormat = sendFormat.replace("{cFeatureName}",'"'+'message'+'"')
                                .replace("{cUseName}",'"'+'text'+'"')
                                .replace("{byId}",'"'+detailNo+'"')
                                .replace("{byActFlg}",'"'+'1'+'"')
                                .replace("{tStartDate}",'"'+'2020-01-01 00:00:00'+'"')
                                .replace("{tEndDate}",'"'+'9999-12-31 23:59:59'+'"')
                                .replace("{cValue1}",'"'+text_map[detailNo]["cValue1"]+'"')
                                .replace("{cValue2}",'"'+detailTitle+'"')
                                .replace("{cValue3}",'"'+detailJpText.replace(/"/g,"'")+'"')
                                .replace("{cValue4}",'"'+detailEnText.replace(/"/g,"'")+'"')
                                .replace("{cValue5}",'"'+'-'+'"')
                                .replace("{cValue6}",'"'+'-'+'"')
                                .replace("{cValue7}",'"'+'-'+'"')
                                .replace("{cValue8}",'"'+'-'+'"')
                                .replace("{cValue9}",'"'+'-'+'"')
                                .replace("{cValue10}",'"'+'-'+'"')
                                .replace("{cValue11}",'"'+'-'+'"')
                                .replace("{cValue12}",'"'+'-'+'"')
                                .replace("{cValue13}",'"'+'-'+'"')
                                .replace("{cValue14}",'"'+'-'+'"')
                                .replace("{cValue15}",'"'+'-'+'"')
                                .replace("{cValue16}",'"'+'-'+'"')
                                .replace("{cValue17}",'"'+'-'+'"')
                                .replace("{cValue18}",'"'+'-'+'"')
                                .replace("{cValue19}",'"'+'-'+'"')
                                .replace("{cValue20}",'"'+'-'+'"')
                                .replace("{cComment}",'"'+''+'"')
                                .replace("{tCreateTime}",'"'+'0000-00-00 00:00:00'+'"')
                                .replace("{tUpdateTime}",tUpdateTime)
                                .replace("{cCreateId}",'"maintenanceGUI"')
                                .replace("{cUpdateId}",'"maintenanceGUI"');
        sendFormatAll += sendFormat;
        sendFormatAll += ",";
        if(contains(sendFormat,"を選ぶ</span>")){
            var a = 1;
        }
    }
    sendFormatAll += "queryend";
    sendFormatAll = sendFormatAll.replace(",queryend","").replace("queryend","");

    // クエリ実行
    setTextData(sendFormatAll);
}