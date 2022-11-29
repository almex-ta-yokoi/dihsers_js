
/**      全般設定タブ用処理           */

// 全般設定タブ-汎用マスタ取得結果
var generalTab_general_map = [];
// 全般設定タブ-基本形ディッシュ組合せマスタ取得結果
var generalTab_basedishcombo_map = [];

/**
 * php実行処理1(汎用マスタ取得)
 * 　非同期通信で情報を取得する
 */
function getGeneralInfoGUI() {
    console.log("全般設定-汎用マスタ取得処理開始");
    // プログレスアイコン表示
    document.getElementById('loading').removeAttribute("hidden");
    
    // タイムアウトフラグ
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
            // リトライ処理
            console.log("全般設定-汎用マスタ取得処理失敗、リトライ");
			getGeneralInfoGUI();
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/getGeneralInfoGUI.php',
			success:function(data){
				// 汎用マスタ取得
                generalTab_general_json = data;
				data = null;
				if(generalTab_general_json == false || contains(generalTab_general_json,CONNECT_ERR_MSG) && !(timeoutFlg)){
					timeoutFlg = true;
                    // リトライ処理
                    console.log("全般設定-汎用マスタ取得処理失敗、リトライ");
					getGeneralInfoGUI();
					return false;
                }
                try{
                    // フォーマットチェック
                    generalTab_general_map = JSON.parse(generalTab_general_json);
                }catch(e){
                    // フォーマット不正の場合、リトライ
                    timeoutFlg = true;
                    console.log("全般設定-汎用マスタ取得処理失敗、リトライ");
                    getGeneralInfoGUI();
					return false;
                }
			}
		})
	).done(function() {
		if(!(generalTab_general_json == false || contains(generalTab_general_json,CONNECT_ERR_MSG)) && !(timeoutFlg)){
			timeoutFlg = true;
            // 次の処理実行
            console.log("全般設定-汎用マスタ取得処理完了");
            getBasedishcomboGUI();
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * php実行処理2(基本形ディッシュ組合せマスタ取得)
 * 　非同期通信で情報を取得する
 */
function getBasedishcomboGUI() {
    console.log("全般設定-基本形ディッシュ組合せマスタ取得処理開始");
    document.getElementById('loading').removeAttribute("hidden");
    // タイムアウトフラグ
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
            // リトライ処理
            console.log("全般設定-基本形ディッシュ組合せマスタ取得処理失敗、リトライ");
			getBasedishcomboGUI();
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/getBasedishcomboGUI.php',
			success:function(data){
				// 基本形ディッシュ組合せマスタ取得
				generalTab_basedishcombo_json = data;
				data = null;
				if(generalTab_basedishcombo_json == false || contains(generalTab_basedishcombo_json,CONNECT_ERR_MSG) && !(timeoutFlg)){
					timeoutFlg = true;
                    // リトライ処理
                    console.log("全般設定-基本形ディッシュ組合せマスタ取得処理失敗、リトライ");
					getBasedishcomboGUI();
					return false;
                }
                try{
                    // フォーマットチェック
                    generalTab_basedishcombo_map = JSON.parse(generalTab_basedishcombo_json);
                }catch(e){
                    // フォーマット不正の場合、リトライ
                    timeoutFlg = true;
                    console.log("全般設定-基本形ディッシュ組合せマスタ取得処理失敗、リトライ");
                    getBasedishcomboGUI();
					return false;
                }
			}
		})
	).done(function() {
		if(!(generalTab_basedishcombo_json == false || contains(generalTab_basedishcombo_json,CONNECT_ERR_MSG)) && !(timeoutFlg)){
			timeoutFlg = true;
            // 次の処理実行
            console.log("全般設定-基本形ディッシュ組合せマスタ取得処理完了");
            getGoodsInfoGUI();
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * php実行処理3(商品情報取得)
 * 　非同期通信で情報を取得する
 */
 function getGoodsInfoGUI() {
    console.log("全般設定-商品情報取得処理開始");
    // プログレスアイコン表示
    document.getElementById('loading').removeAttribute("hidden");
    
    // タイムアウトフラグ
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
            // リトライ処理
            console.log("全般設定-商品情報取得処理失敗、リトライ");
			getGoodsInfoGUI();
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/getGoodsTablesGUI.php',
			success:function(data){
				// 汎用マスタ取得
                response_json = data;
				if(response_json == false || contains(response_json,CONNECT_ERR_MSG) && !(timeoutFlg)){
					timeoutFlg = true;
                    // リトライ処理
                    console.log("全般設定-商品情報取得処理失敗、リトライ");
					getGoodsInfoGUI();
					return false;
                }
                try{
                    // フォーマットチェック
                    var all_data_map = JSON.parse(response_json);

                    tb_8m_map = jQuery.extend(true, {}, all_data_map["8m"]);
                    bk_tb_8m_map = jQuery.extend(true, {}, all_data_map["8m"]);
                    tb_detail_map = jQuery.extend(true, {}, all_data_map["detail"]);
                    bk_tb_detail_map = jQuery.extend(true, {}, all_data_map["detail"]);
                    tb_40m_map = jQuery.extend(true, {}, all_data_map["40m"]);
                    bk_tb_40m_map = jQuery.extend(true, {}, all_data_map["40m"]);
                    tb_menubookitem_map = jQuery.extend(true, {}, all_data_map["menubookitem"]);
                    bk_tb_menubookitem_map = jQuery.extend(true, {}, all_data_map["menubookitem"]);
                    tb_submenu_map = jQuery.extend(true, {}, all_data_map["submenu"]);
                    bk_tb_submenu_map = jQuery.extend(true, {}, all_data_map["submenu"]);
                    tb_nggoodsgroup_map = jQuery.extend(true, {}, all_data_map["nggoodsgroup"]);
                    bk_tb_nggoodsgroup_map = jQuery.extend(true, {}, all_data_map["nggoodsgroup"]);
                    tb_19m_map = jQuery.extend(true, {}, all_data_map["19m"]);
                    tb_allergy_map = jQuery.extend(true, {}, all_data_map["allergy"]);

                }catch(e){
                    // フォーマット不正の場合、リトライ
                    timeoutFlg = true;
                    console.log("全般設定-商品情報取得処理失敗、リトライ");
                    getGoodsInfoGUI();
					return false;
                }
			}
		})
	).done(function() {
		if(!(response_json == false || contains(response_json,CONNECT_ERR_MSG)) && !(timeoutFlg)){
			timeoutFlg = true;
            // 次の処理実行
            console.log("全般設定-商品情報取得処理完了");
            changeTab(2);
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
function generalTabCreate() {
    // 取得データを入力情報へ反映
    // 汎用マスタの取得結果を反映
    for(var general_line in generalTab_general_map){
        if(contains(general_line,"noOpeChk_filePath")){
            // スクリーンセイバー表示画像の反映
            for(var i = 1; i <= 10; i++){
                var tarImgPath = generalTab_general_map[general_line]["cValue"+i];
                document.getElementById("ss_img_"+i+"_del").checked = false;
                document.getElementById("ss_img_"+i+"_cng").value = null;
                var ssImg = document.getElementById("ss_img_"+i);
                ssImg.src = ssImg.getAttribute("tmp");
                ssImg.setAttribute("del","0");
                if(tarImgPath != '-'){
                    document.getElementById("ssCk_"+i).checked = true;
                }else{
                    document.getElementById("ssCk_"+i).checked = false;
                }
            }
        }else if(contains(general_line,"noOpeChk_setTime")){
            // スクリーンセイバー待機時間の反映
            var ss_timeout = generalTab_general_map[general_line]["cValue1"];
            try{
                ss_timeout = parseInt(ss_timeout);
                ss_timeout = ss_timeout / 1000;
            }catch(e){
                ss_timeout = 60;
            }
            document.getElementById("ss_timeout").value = ss_timeout;
        }else if(contains(general_line, "noOpeChk_displayTime")){
            // スクリーンセイバー表示時間の反映
            var ss_display_time = generalTab_general_map[general_line]["cValue1"];
            try{
                ss_display_time = parseInt(ss_display_time);
                ss_display_time = ss_display_time / 1000;
            }catch(e){
                ss_display_time = 3;
            }
            document.getElementById("ss_display_time").value = ss_display_time;
        }
        else if(contains(general_line,"ordLimitControl_quantityLimit")){
            // 注文数上限値の反映
            document.getElementById("goods_qnt_limit").value = generalTab_general_map[general_line]["cValue1"];
        }else if(contains(general_line,"PlasticBag_onOffFlg")){
            // ビニール袋購入確認ポップアップ表示ONOFFの反映
            // TTO
            if(generalTab_general_map[general_line]["cValue1"] == 1){
                document.getElementById("bnl_tto").checked = true;
            }else{
                document.getElementById("bnl_tto").checked = false;
            }
            // 精算機
            if(generalTab_general_map[general_line]["cValue2"] == 1){
                document.getElementById("bnl_reg").checked = true;
            }else{
                document.getElementById("bnl_reg").checked = false;
            }
        }else if(contains(general_line,"regTimeOut_setTime")){
            // 精算機テイクアウト　-　注文タイムアウト時間の反映
            var reg_timeout = generalTab_general_map[general_line]["cValue1"];
            try{
                reg_timeout = parseInt(reg_timeout);
                reg_timeout = reg_timeout / 1000;
            }catch(e){
                reg_timeout = 60;
            }
            document.getElementById("reg_timeout").value = reg_timeout;
        }else if(contains(general_line,"regMenuBookCode_menuBookCode")){
            // 精算機テイクアウト　-　表示メニューブックの反映
            document.getElementById("reg_menubook_cd").value = generalTab_general_map[general_line]["cValue1"];
            // 精算機テイクアウト　-　TOP画面IDの反映
            document.getElementById("reg_disp_cd").value = generalTab_general_map[general_line]["cValue2"];
        }else if(contains(general_line,"allergenBtn_onOffFlg")){
            // アレルギーボタン表示
            if(generalTab_general_map[general_line]["cValue1"] == 1){
                // ON
                document.getElementById("arr_btn_onoff").checked = true;
            }else{
                // OFF
                document.getElementById("arr_btn_onoff").checked = false;
            }
        }else if(contains(general_line,"alcolFstOnly_onOffFlg")){
            // アルコール確認ポップアップ初回のみ表示
            if(generalTab_general_map[general_line]["cValue1"] == 1){
                // ON
                document.getElementById("alco_pop_onoff").checked = true;
            }else{
                // OFF
                document.getElementById("alco_pop_onoff").checked = false;
            }
        }else if(contains(general_line,"addHbDisp_topping")){
            // アルコール確認ポップアップ初回のみ表示
            if(generalTab_general_map[general_line]["cValue1"] == 1){
                // ON
                document.getElementById("addHb_tpDIsp_flg").checked = true;
            }else{
                // OFF
                document.getElementById("addHb_tpDIsp_flg").checked = false;
            }
        }
    }

    // 現在日時を取得
	var currentDate = new Date();

    // 基本形ディッシュ組合せマスタの取得結果を反映
    for(var basedishcombo_line = 1; basedishcombo_line <= 6; basedishcombo_line++){
        if(isNotEmpty(generalTab_basedishcombo_map[basedishcombo_line])){
            // 無効化の反映
            if(new Date(Date.parse(generalTab_basedishcombo_map[basedishcombo_line]["tStartValidDate"])) <= currentDate
            && new Date(Date.parse(generalTab_basedishcombo_map[basedishcombo_line]["tEndValidDate"])) > currentDate){
                // 有効
                document.getElementById("ordBaseCk"+basedishcombo_line).checked = false;
			} else {
                // 無効
                document.getElementById("ordBaseCk"+basedishcombo_line).checked = true;
            }

            // 画像
            document.getElementById("ss_img_"+basedishcombo_line+"_del").checked = false;
            document.getElementById("ss_img_"+basedishcombo_line+"_cng").value = null;
            var ssImg = document.getElementById("ss_img_"+basedishcombo_line);
            ssImg.src = ssImg.getAttribute("tmp");
            ssImg.setAttribute("del","0");

            // ベース商品コード
            var baseCd = document.getElementById("base_goods_cd"+basedishcombo_line);
            baseCd.innerHTML = null;
            baseCd.style.width = "350px";
            baseCd.style.height = "25px";
            for(var m8 in tb_8m_map){
                if(tb_detail_map[m8] == null || tb_40m_map[m8] == null){
                    // 必須のテーブルデータがない場合、不正データとみなし処理対象外
                    continue;
                }
                if(tb_8m_map[m8]["nUnitCost"] != "0"){
                    continue;
                }
                var option = document.createElement("option");
                option.value = tb_8m_map[m8]["nGoodsCode"];
                option.textContent = tb_8m_map[m8]["nGoodsCode"]+":"+tb_8m_map[m8]["cGoodsName"];
                option.setAttribute("onchange","goodsSelect("+tb_8m_map[m8]["nGoodsCode"]+")");
                baseCd.appendChild(option);
            }
            baseCd.value = generalTab_basedishcombo_map[basedishcombo_line]["nGoodsCode"];
            // ベース商品名
            // document.getElementById("base_goods_name"+basedishcombo_line).value = generalTab_basedishcombo_map[basedishcombo_line]["cBaseDishName"];
            // ベース画像ファイル名
            document.getElementById("base_goods_file_name"+basedishcombo_line).value = generalTab_basedishcombo_map[basedishcombo_line]["cBaseDishImage"];
            // ハンバーグ商品コード
            var hbCd = document.getElementById("hb_cd"+basedishcombo_line);
            hbCd.innerHTML = null;
            hbCd.style.width = "350px";
            hbCd.style.height = "25px";
            var option = document.createElement("option");
            option.value = "";
            option.textContent = "-:設定なし";
            hbCd.appendChild(option);
            for(var m8 in tb_8m_map){
                if(tb_detail_map[m8] == null || tb_40m_map[m8] == null){
                    // 必須のテーブルデータがない場合、不正データとみなし処理対象外
                    continue;
                }
                if(tb_detail_map[m8]["byMenuType"] != "1" || tb_detail_map[m8]["nGoodsType"] != "1"){
                    continue;
                }
                var option = document.createElement("option");
                option.value = tb_8m_map[m8]["nGoodsCode"];
                option.textContent = tb_8m_map[m8]["nGoodsCode"]+":"+tb_8m_map[m8]["cGoodsName"];
                hbCd.appendChild(option);
            }
            hbCd.value = generalTab_basedishcombo_map[basedishcombo_line]["nHamburgGoodsCode"] == null ? "":generalTab_basedishcombo_map[basedishcombo_line]["nHamburgGoodsCode"];
            // if(isNotEmpty(generalTab_basedishcombo_map[basedishcombo_line]["nHamburgGoodsCode"])){
            //     // 設定済みの場合、チェックON
            //     document.getElementById("hb_cb"+basedishcombo_line).checked = true;
            //     document.getElementById("hb_cd"+basedishcombo_line).disabled = null;
            // }else{
            //     // 未設定の場合、チェックOFF
            //     document.getElementById("hb_cb"+basedishcombo_line).checked = false;
            //     document.getElementById("hb_cd"+basedishcombo_line).disabled = "disabled";
            // }
            // トッピング商品コード
            var tpCd = document.getElementById("tp_cd"+basedishcombo_line);
            tpCd.innerHTML = null;
            tpCd.style.width = "350px";
            tpCd.style.height = "25px";
            var option = document.createElement("option");
            option.value = "";
            option.textContent = "-:設定なし";
            tpCd.appendChild(option);
            for(var m8 in tb_8m_map){
                if(tb_detail_map[m8] == null || tb_40m_map[m8] == null){
                    // 必須のテーブルデータがない場合、不正データとみなし処理対象外
                    continue;
                }
                if(tb_detail_map[m8]["byMenuType"] != "1" || tb_detail_map[m8]["nGoodsType"] != "2"){
                    continue;
                }
                var option = document.createElement("option");
                option.value = tb_8m_map[m8]["nGoodsCode"];
                option.textContent = tb_8m_map[m8]["nGoodsCode"]+":"+tb_8m_map[m8]["cGoodsName"];
                tpCd.appendChild(option);
            }
            tpCd.value = generalTab_basedishcombo_map[basedishcombo_line]["nToppingGoodsCode"] == null ? "":generalTab_basedishcombo_map[basedishcombo_line]["nToppingGoodsCode"];

            // if(isNotEmpty(generalTab_basedishcombo_map[basedishcombo_line]["nToppingGoodsCode"])){
            //     // 設定済みの場合、チェックON
            //     document.getElementById("tp_cb"+basedishcombo_line).checked = true;
            //     document.getElementById("tp_cd"+basedishcombo_line).disabled = null;
            // }else{
            //     // 未設定の場合、チェックOFF
            //     document.getElementById("tp_cb"+basedishcombo_line).checked = false;
            //     document.getElementById("tp_cd"+basedishcombo_line).disabled = "disabled";
            // }
            // ソース商品コード
            var scCd = document.getElementById("sc_cd"+basedishcombo_line);
            scCd.innerHTML = null;
            scCd.style.width = "350px";
            scCd.style.height = "25px";
            var option = document.createElement("option");
            option.value = "";
            option.textContent = "-:設定なし";
            scCd.appendChild(option);
            for(var m8 in tb_8m_map){
                if(tb_detail_map[m8] == null || tb_40m_map[m8] == null){
                    // 必須のテーブルデータがない場合、不正データとみなし処理対象外
                    continue;
                }
                if(tb_detail_map[m8]["byMenuType"] != "1" || tb_detail_map[m8]["nGoodsType"] != "5"){
                    continue;
                }
                var option = document.createElement("option");
                option.value = tb_8m_map[m8]["nGoodsCode"];
                option.textContent = tb_8m_map[m8]["nGoodsCode"]+":"+tb_8m_map[m8]["cGoodsName"];
                scCd.appendChild(option);
            }
            scCd.value = generalTab_basedishcombo_map[basedishcombo_line]["nSourceGoodsCode"] == null ? "":generalTab_basedishcombo_map[basedishcombo_line]["nSourceGoodsCode"];
            // if(isNotEmpty(generalTab_basedishcombo_map[basedishcombo_line]["nSourceGoodsCode"])){
            //     // 設定済みの場合、チェックON
            //     document.getElementById("sc_cb"+basedishcombo_line).checked = true;
            //     document.getElementById("sc_cd"+basedishcombo_line).disabled = null;
            // }else{
            //     // 未設定の場合、チェックOFF
            //     document.getElementById("sc_cb"+basedishcombo_line).checked = false;
            //     document.getElementById("sc_cd"+basedishcombo_line).disabled = "disabled";
            // }
            // ライス商品コード
            var rpCd = document.getElementById("rp_cd"+basedishcombo_line);
            rpCd.innerHTML = null;
            rpCd.style.width = "350px";
            rpCd.style.height = "25px";
            var option = document.createElement("option");
            option.value = "";
            option.textContent = "-:設定なし";
            rpCd.appendChild(option);
            for(var m8 in tb_8m_map){
                if(tb_detail_map[m8] == null || tb_40m_map[m8] == null){
                    // 必須のテーブルデータがない場合、不正データとみなし処理対象外
                    continue;
                }
                if(tb_detail_map[m8]["byMenuType"] != "1" || tb_detail_map[m8]["nGoodsType"] != "3"){
                    continue;
                }
                var option = document.createElement("option");
                option.value = tb_8m_map[m8]["nGoodsCode"];
                option.textContent = tb_8m_map[m8]["nGoodsCode"]+":"+tb_8m_map[m8]["cGoodsName"];
                rpCd.appendChild(option);
            }
            rpCd.value = generalTab_basedishcombo_map[basedishcombo_line]["nRiceGoodsCode"] == null ? "":generalTab_basedishcombo_map[basedishcombo_line]["nRiceGoodsCode"];
            // if(isNotEmpty(generalTab_basedishcombo_map[basedishcombo_line]["nRiceGoodsCode"])){
            //     // 設定済みの場合、チェックON
            //     document.getElementById("rp_cb"+basedishcombo_line).checked = true;
            //     document.getElementById("rp_cd"+basedishcombo_line).disabled = null;
            // }else{
            //     // 未設定の場合、チェックOFF
            //     document.getElementById("rp_cb"+basedishcombo_line).checked = false;
            //     document.getElementById("rp_cd"+basedishcombo_line).disabled = "disabled";
            // }
            // サラダ商品コード
            var srCd = document.getElementById("sr_cd"+basedishcombo_line);
            srCd.innerHTML = null;
            srCd.style.width = "350px";
            srCd.style.height = "25px";
            var option = document.createElement("option");
            option.value = "";
            option.textContent = "-:設定なし";
            srCd.appendChild(option);
            for(var m8 in tb_8m_map){
                if(tb_detail_map[m8] == null || tb_40m_map[m8] == null){
                    // 必須のテーブルデータがない場合、不正データとみなし処理対象外
                    continue;
                }
                if(tb_detail_map[m8]["byMenuType"] != "1" || tb_detail_map[m8]["nGoodsType"] != "4"){
                    continue;
                }
                var option = document.createElement("option");
                option.value = tb_8m_map[m8]["nGoodsCode"];
                option.textContent = tb_8m_map[m8]["nGoodsCode"]+":"+tb_8m_map[m8]["cGoodsName"];
                srCd.appendChild(option);
            }
            srCd.value = generalTab_basedishcombo_map[basedishcombo_line]["nSaladGoodsCode"] == null ? "":generalTab_basedishcombo_map[basedishcombo_line]["nSaladGoodsCode"];
            // if(isNotEmpty(generalTab_basedishcombo_map[basedishcombo_line]["nSaladGoodsCode"])){
            //     // 設定済みの場合、チェックON
            //     document.getElementById("sr_cb"+basedishcombo_line).checked = true;
            //     document.getElementById("sr_cd"+basedishcombo_line).disabled = null;
            // }else{
            //     // 未設定の場合、チェックOFF
            //     document.getElementById("sr_cb"+basedishcombo_line).checked = false;
            //     document.getElementById("sr_cd"+basedishcombo_line).disabled = "disabled";
            // }
            // 変更可能ソース商品コード１
            var cgnSc1Cd = document.getElementById("cgn_sc1_cd"+basedishcombo_line);
            cgnSc1Cd.innerHTML = null;
            cgnSc1Cd.style.width = "350px";
            cgnSc1Cd.style.height = "25px";
            var option = document.createElement("option");
            option.value = "";
            option.textContent = "-:設定なし";
            cgnSc1Cd.appendChild(option);
            for(var m8 in tb_8m_map){
                if(tb_detail_map[m8] == null || tb_40m_map[m8] == null){
                    // 必須のテーブルデータがない場合、不正データとみなし処理対象外
                    continue;
                }
                if(tb_detail_map[m8]["byMenuType"] != "1" || tb_detail_map[m8]["nGoodsType"] != "5"){
                    continue;
                }
                var option = document.createElement("option");
                option.value = tb_8m_map[m8]["nGoodsCode"];
                option.textContent = tb_8m_map[m8]["nGoodsCode"]+":"+tb_8m_map[m8]["cGoodsName"];
                cgnSc1Cd.appendChild(option);
            }
            cgnSc1Cd.value = generalTab_basedishcombo_map[basedishcombo_line]["nCngSourceGoodsCode1"] == null ? "":generalTab_basedishcombo_map[basedishcombo_line]["nCngSourceGoodsCode1"];
            // if(isNotEmpty(generalTab_basedishcombo_map[basedishcombo_line]["nCngSourceGoodsCode1"])){
            //     // 設定済みの場合、チェックON
            //     document.getElementById("cgn_sc1_cb"+basedishcombo_line).checked = true;
            //     document.getElementById("cgn_sc1_cd"+basedishcombo_line).disabled = null;
            // }else{
            //     // 未設定の場合、チェックOFF
            //     document.getElementById("cgn_sc1_cb"+basedishcombo_line).checked = false;
            //     document.getElementById("cgn_sc1_cd"+basedishcombo_line).disabled = "disabled";
            // }

            // 変更可能ソース商品コード２
            var cgnSc2Cd = document.getElementById("cgn_sc2_cd"+basedishcombo_line);
            cgnSc2Cd.innerHTML = null;
            cgnSc2Cd.style.width = "350px";
            cgnSc2Cd.style.height = "25px";
            var option = document.createElement("option");
            option.value = "";
            option.textContent = "-:設定なし";
            cgnSc2Cd.appendChild(option);
            for(var m8 in tb_8m_map){
                if(tb_detail_map[m8] == null || tb_40m_map[m8] == null){
                    // 必須のテーブルデータがない場合、不正データとみなし処理対象外
                    continue;
                }
                if(tb_detail_map[m8]["byMenuType"] != "1" || tb_detail_map[m8]["nGoodsType"] != "5"){
                    continue;
                }
                var option = document.createElement("option");
                option.value = tb_8m_map[m8]["nGoodsCode"];
                option.textContent = tb_8m_map[m8]["nGoodsCode"]+":"+tb_8m_map[m8]["cGoodsName"];
                cgnSc2Cd.appendChild(option);
            }
            cgnSc2Cd.value = generalTab_basedishcombo_map[basedishcombo_line]["nCngSourceGoodsCode2"] == null ? "":generalTab_basedishcombo_map[basedishcombo_line]["nCngSourceGoodsCode2"];
            // if(isNotEmpty(generalTab_basedishcombo_map[basedishcombo_line]["nCngSourceGoodsCode2"])){
            //     // 設定済みの場合、チェックON
            //     document.getElementById("cgn_sc2_cb"+basedishcombo_line).checked = true;
            //     document.getElementById("cgn_sc2_cd"+basedishcombo_line).disabled = null;
            // }else{
            //     // 未設定の場合、チェックOFF
            //     document.getElementById("cgn_sc2_cb"+basedishcombo_line).checked = false;
            //     document.getElementById("cgn_sc2_cd"+basedishcombo_line).disabled = "disabled";
            // }

            // 変更可能ソース商品コード３
            var cgnSc3Cd = document.getElementById("cgn_sc3_cd"+basedishcombo_line);
            cgnSc3Cd.innerHTML = null;
            cgnSc3Cd.style.width = "350px";
            cgnSc3Cd.style.height = "25px";
            var option = document.createElement("option");
            option.value = "";
            option.textContent = "-:設定なし";
            cgnSc3Cd.appendChild(option);
            for(var m8 in tb_8m_map){
                if(tb_detail_map[m8] == null || tb_40m_map[m8] == null){
                    // 必須のテーブルデータがない場合、不正データとみなし処理対象外
                    continue;
                }
                if(tb_detail_map[m8]["byMenuType"] != "1" || tb_detail_map[m8]["nGoodsType"] != "5"){
                    continue;
                }
                var option = document.createElement("option");
                option.value = tb_8m_map[m8]["nGoodsCode"];
                option.textContent = tb_8m_map[m8]["nGoodsCode"]+":"+tb_8m_map[m8]["cGoodsName"];
                cgnSc3Cd.appendChild(option);
            }
            cgnSc3Cd.value = generalTab_basedishcombo_map[basedishcombo_line]["nCngSourceGoodsCode3"] == null ? "":generalTab_basedishcombo_map[basedishcombo_line]["nCngSourceGoodsCode3"];
            // if(isNotEmpty(generalTab_basedishcombo_map[basedishcombo_line]["nCngSourceGoodsCode3"])){
            //     // 設定済みの場合、チェックON
            //     document.getElementById("cgn_sc3_cb"+basedishcombo_line).checked = true;
            //     document.getElementById("cgn_sc3_cd"+basedishcombo_line).disabled = null;
            // }else{
            //     // 未設定の場合、チェックOFF
            //     document.getElementById("cgn_sc3_cb"+basedishcombo_line).checked = false;
            //     document.getElementById("cgn_sc3_cd"+basedishcombo_line).disabled = "disabled";
            // }
        }
    }

    // ファイル読み込み機能適用
    $(function(){
        $('.img_cng_general').on('change', function (e) {
            getId = "#"+e.target.id.replace("_cng","");
            var reader = new FileReader();
            reader.onload = function (e) {
                $(getId).attr('src', e.target.result);
            }
            reader.readAsDataURL(e.target.files[0]);
        });
    });
}

/**
 * スクリーンセイバー削除チェックボックス処理
 * @param タグ
 */
function delCheckBoxGeneral(elm){
    if(elm.checked){
        document.getElementById(elm.id.replace("_del","")).setAttribute("del",1);
        document.getElementById("ssCk"+elm.id.replace("_del","").replace("ss_img","")).checked = false;
    }else{
        document.getElementById(elm.id.replace("_del","")).setAttribute("del",0);
    }
}

/**
 * スクリーンセイバー有効チェックボックス処理
 * @param 行番号
 */
 function avtiveCheckBoxGeneral(num){
    var delbox = document.getElementById("ss_img_"+num+"_del");
    var activebox = document.getElementById("ssCk_"+num);
    if(activebox.checked && delbox.checked){
        delbox.checked = false;
    }
}

/**
 * オーダーメイドベースチェックボックス操作処理
 * @param チェックボックスオブジェクト
 * @param ハンバーグ商品コード：hb_cd、トッピング商品コード：tp_cd、ソース商品コード：sc_cd、ライス商品コード：rp_cd、サラダ商品コード：sr_cd、
 *        変更可能ソース商品コード１：cgn_sc1_cd、変更可能ソース商品コード２：cgn_sc2_cd、変更可能ソース商品コード３：cgn_sc3_cd、
 * @param 行番号 1~6
 */
function ordBaseCkBoxChange(elem,type,lineNo){
    if (elem.checked) {
        document.getElementById(type+lineNo).disabled = null;
    }else{
        document.getElementById(type+lineNo).disabled = "disabled";
        document.getElementById(type+lineNo).value = null;
    }
}

// 送信用汎用マスタデータテンプレート
const sendFormat = "('{cFeatureName}','{cUseName}',{byId},{byActFlg},cast('2020-01-01 00:00:00' as datetime),cast('{onOff}' as datetime),"+
                    "'{cValue1}','{cValue2}','{cValue3}','{cValue4}','{cValue5}','{cValue6}','{cValue7}','{cValue8}','{cValue9}','{cValue10}',"+
                    "'{cValue11}','{cValue12}','{cValue13}','{cValue14}','{cValue15}',"+
                    "'',cast('{tCreateTime}' as datetime),cast('{tUpdateTime}' as datetime),'maintenanceGUI','maintenanceGUI')";
const sendFormat_on_time = '9999-12-31 23:59:59';
const sendFormat_off_time = '2000-01-01 00:00:00';

/**
 * 全般設定情報反映処理1(汎用マスタ)
 */
function sendGeneralInfoGUI(){
    // 送信データ
    var sendData = "";
	// 現在日時を取得
    var currentDateTime = new Date();
    var currentDateTimeStr = currentDateTime.getFullYear()+'-'+(currentDateTime.getMonth()+1)+'-'+currentDateTime.getDate()
                    +' '+currentDateTime.getHours()+':'+currentDateTime.getMinutes()+':'+currentDateTime.getSeconds();
                    // './images/screensaver/'+
    // スクリーンセイバー表示画像のセット
    var carrentPath = './images/screensaver/';
    var ss_1 = document.getElementById("ssCk_1").checked ? carrentPath+"screensaver1.png":"-";
    var ss_2 = document.getElementById("ssCk_2").checked ? carrentPath+"screensaver2.png":"-";
    var ss_3 = document.getElementById("ssCk_3").checked ? carrentPath+"screensaver3.png":"-";
    var ss_4 = document.getElementById("ssCk_4").checked ? carrentPath+"screensaver4.png":"-";
    var ss_5 = document.getElementById("ssCk_5").checked ? carrentPath+"screensaver5.png":"-";
    var ss_6 = document.getElementById("ssCk_6").checked ? carrentPath+"screensaver6.png":"-";
    var ss_7 = document.getElementById("ssCk_7").checked ? carrentPath+"screensaver7.png":"-";
    var ss_8 = document.getElementById("ssCk_8").checked ? carrentPath+"screensaver8.png":"-";
    var ss_9 = document.getElementById("ssCk_9").checked ? carrentPath+"screensaver9.png":"-";
    var ss_10 = document.getElementById("ssCk_10").checked ? carrentPath+"screensaver10.png":"-";
    sendData += sendFormat.replace("{cFeatureName}","noOpeChk")
                        .replace("{cUseName}","filePath")
                        .replace("{byId}","1")
                        .replace("{byActFlg}","1")
                        .replace("{onOff}",sendFormat_on_time)
                        .replace("{cValue1}",ss_1)
                        .replace("{cValue2}",ss_2)
                        .replace("{cValue3}",ss_3)
                        .replace("{cValue4}",ss_4)
                        .replace("{cValue5}",ss_5)
                        .replace("{cValue6}",ss_6)
                        .replace("{cValue7}",ss_7)
                        .replace("{cValue8}",ss_8)
                        .replace("{cValue9}",ss_9)
                        .replace("{cValue10}",ss_10)
                        .replace("{cValue11}","-")
                        .replace("{cValue12}","-")
                        .replace("{cValue13}","-")
                        .replace("{cValue14}","-")
                        .replace("{cValue15}","-")
                        .replace("{tCreateTime}",currentDateTimeStr)
                        .replace("{tUpdateTime}",currentDateTimeStr);
    // スクリーンセイバー待機時間のセット
    var ss_timeout = document.getElementById("ss_timeout").value;
    try{
        ss_timeout = parseInt(ss_timeout);
        ss_timeout = ss_timeout * 1000;
    }catch(e){
        ss_timeout = 60;
    }
    sendData += ",";
    sendData += sendFormat.replace("{cFeatureName}","noOpeChk")
                        .replace("{cUseName}","setTime")
                        .replace("{byId}","1")
                        .replace("{byActFlg}","1")
                        .replace("{onOff}",sendFormat_on_time)
                        .replace("{cValue1}",ss_timeout)
                        .replace("{cValue2}","-")
                        .replace("{cValue3}","-")
                        .replace("{cValue4}","-")
                        .replace("{cValue5}","-")
                        .replace("{cValue6}","-")
                        .replace("{cValue7}","-")
                        .replace("{cValue8}","-")
                        .replace("{cValue9}","-")
                        .replace("{cValue10}","-")
                        .replace("{cValue11}","-")
                        .replace("{cValue12}","-")
                        .replace("{cValue13}","-")
                        .replace("{cValue14}","-")
                        .replace("{cValue15}","-")
                        .replace("{tCreateTime}",currentDateTimeStr)
                        .replace("{tUpdateTime}",currentDateTimeStr);



    // スクリーンセイバー表示時間のセット
    var ss_display_time = document.getElementById("ss_display_time").value;
    try{
        ss_display_time = parseInt(ss_display_time);
        ss_display_time = ss_display_time * 1000;
    }catch(e){
        ss_display_time = 60;
    }
    sendData += ",";
    sendData += sendFormat.replace("{cFeatureName}","noOpeChk")
                        .replace("{cUseName}","displayTime")
                        .replace("{byId}","1")
                        .replace("{byActFlg}","1")
                        .replace("{onOff}",sendFormat_on_time)
                        .replace("{cValue1}",ss_display_time)
                        .replace("{cValue2}","-")
                        .replace("{cValue3}","-")
                        .replace("{cValue4}","-")
                        .replace("{cValue5}","-")
                        .replace("{cValue6}","-")
                        .replace("{cValue7}","-")
                        .replace("{cValue8}","-")
                        .replace("{cValue9}","-")
                        .replace("{cValue10}","-")
                        .replace("{cValue11}","-")
                        .replace("{cValue12}","-")
                        .replace("{cValue13}","-")
                        .replace("{cValue14}","-")
                        .replace("{cValue15}","-")
                        .replace("{tCreateTime}",currentDateTimeStr)
                        .replace("{tUpdateTime}",currentDateTimeStr);
    // 注文数上限値のセット
    sendData += ",";
    sendData += sendFormat.replace("{cFeatureName}","ordLimitControl")
                        .replace("{cUseName}","quantityLimit")
                        .replace("{byId}","1")
                        .replace("{byActFlg}","1")
                        .replace("{onOff}",sendFormat_on_time)
                        .replace("{cValue1}",document.getElementById("goods_qnt_limit").value)
                        .replace("{cValue2}","-")
                        .replace("{cValue3}","-")
                        .replace("{cValue4}","-")
                        .replace("{cValue5}","-")
                        .replace("{cValue6}","-")
                        .replace("{cValue7}","-")
                        .replace("{cValue8}","-")
                        .replace("{cValue9}","-")
                        .replace("{cValue10}","-")
                        .replace("{cValue11}","-")
                        .replace("{cValue12}","-")
                        .replace("{cValue13}","-")
                        .replace("{cValue14}","-")
                        .replace("{cValue15}","-")
                        .replace("{tCreateTime}",currentDateTimeStr)
                        .replace("{tUpdateTime}",currentDateTimeStr);
    // ビニール袋購入確認ポップアップ表示設定のセット
    sendData += ",";
    sendData += sendFormat.replace("{cFeatureName}","PlasticBag")
                        .replace("{cUseName}","onOffFlg")
                        .replace("{byId}","1")
                        .replace("{byActFlg}","1")
                        .replace("{onOff}",sendFormat_on_time)
                        .replace("{cValue1}",document.getElementById("bnl_tto").checked ? "1" : "0")
                        .replace("{cValue2}",document.getElementById("bnl_reg").checked ? "1" : "0")
                        .replace("{cValue3}","-")
                        .replace("{cValue4}","-")
                        .replace("{cValue5}","-")
                        .replace("{cValue6}","-")
                        .replace("{cValue7}","-")
                        .replace("{cValue8}","-")
                        .replace("{cValue9}","-")
                        .replace("{cValue10}","-")
                        .replace("{cValue11}","-")
                        .replace("{cValue12}","-")
                        .replace("{cValue13}","-")
                        .replace("{cValue14}","-")
                        .replace("{cValue15}","-")
                        .replace("{tCreateTime}",currentDateTimeStr)
                        .replace("{tUpdateTime}",currentDateTimeStr);
    // 精算機テイクアウト　-　注文タイムアウト時間のセット
    var reg_timeout = document.getElementById("reg_timeout").value;
    try{
        reg_timeout = parseInt(reg_timeout);
        reg_timeout = reg_timeout * 1000;
    }catch(e){
        reg_timeout = 60;
    }
    sendData += ",";
    sendData += sendFormat.replace("{cFeatureName}","regTimeOut")
                        .replace("{cUseName}","setTime")
                        .replace("{byId}","1")
                        .replace("{byActFlg}","1")
                        .replace("{onOff}",sendFormat_on_time)
                        .replace("{cValue1}",reg_timeout)
                        .replace("{cValue2}","-")
                        .replace("{cValue3}","-")
                        .replace("{cValue4}","-")
                        .replace("{cValue5}","-")
                        .replace("{cValue6}","-")
                        .replace("{cValue7}","-")
                        .replace("{cValue8}","-")
                        .replace("{cValue9}","-")
                        .replace("{cValue10}","-")
                        .replace("{cValue11}","-")
                        .replace("{cValue12}","-")
                        .replace("{cValue13}","-")
                        .replace("{cValue14}","-")
                        .replace("{cValue15}","-")
                        .replace("{tCreateTime}",currentDateTimeStr)
                        .replace("{tUpdateTime}",currentDateTimeStr);
    // 精算機テイクアウト　-　表示メニューブックのセット
    sendData += ",";
    sendData += sendFormat.replace("{cFeatureName}","regMenuBookCode")
                        .replace("{cUseName}","menuBookCode")
                        .replace("{byId}","1")
                        .replace("{byActFlg}","1")
                        .replace("{onOff}",sendFormat_on_time)
                        .replace("{cValue1}",document.getElementById("reg_menubook_cd").value)
                        .replace("{cValue2}",document.getElementById("reg_disp_cd").value)
                        .replace("{cValue3}","-")
                        .replace("{cValue4}","-")
                        .replace("{cValue5}","-")
                        .replace("{cValue6}","-")
                        .replace("{cValue7}","-")
                        .replace("{cValue8}","-")
                        .replace("{cValue9}","-")
                        .replace("{cValue10}","-")
                        .replace("{cValue11}","-")
                        .replace("{cValue12}","-")
                        .replace("{cValue13}","-")
                        .replace("{cValue14}","-")
                        .replace("{cValue15}","-")
                        .replace("{tCreateTime}",currentDateTimeStr)
                        .replace("{tUpdateTime}",currentDateTimeStr);
    // アレルギーボタン表示
    sendData += ",";
    sendData += sendFormat.replace("{cFeatureName}","allergenBtn")
                        .replace("{cUseName}","onOffFlg")
                        .replace("{byId}","1")
                        .replace("{byActFlg}","1")
                        .replace("{onOff}",sendFormat_on_time)
                        .replace("{cValue1}",document.getElementById("arr_btn_onoff").checked ? "1" : "0")
                        .replace("{cValue2}","-")
                        .replace("{cValue3}","-")
                        .replace("{cValue4}","-")
                        .replace("{cValue5}","-")
                        .replace("{cValue6}","-")
                        .replace("{cValue7}","-")
                        .replace("{cValue8}","-")
                        .replace("{cValue9}","-")
                        .replace("{cValue10}","-")
                        .replace("{cValue11}","-")
                        .replace("{cValue12}","-")
                        .replace("{cValue13}","-")
                        .replace("{cValue14}","-")
                        .replace("{cValue15}","-")
                        .replace("{tCreateTime}",currentDateTimeStr)
                        .replace("{tUpdateTime}",currentDateTimeStr);
    // アルコール確認初回のみ表示
    sendData += ",";
    sendData += sendFormat.replace("{cFeatureName}","alcolFstOnly")
                        .replace("{cUseName}","onOffFlg")
                        .replace("{byId}","1")
                        .replace("{byActFlg}","1")
                        .replace("{onOff}",sendFormat_on_time)
                        .replace("{cValue1}",document.getElementById("alco_pop_onoff").checked ? "1" : "0")
                        .replace("{cValue2}","-")
                        .replace("{cValue3}","-")
                        .replace("{cValue4}","-")
                        .replace("{cValue5}","-")
                        .replace("{cValue6}","-")
                        .replace("{cValue7}","-")
                        .replace("{cValue8}","-")
                        .replace("{cValue9}","-")
                        .replace("{cValue10}","-")
                        .replace("{cValue11}","-")
                        .replace("{cValue12}","-")
                        .replace("{cValue13}","-")
                        .replace("{cValue14}","-")
                        .replace("{cValue15}","-")
                        .replace("{tCreateTime}",currentDateTimeStr)
                        .replace("{tUpdateTime}",currentDateTimeStr);
    // アルコール確認初回のみ表示
    sendData += ",";
    sendData += sendFormat.replace("{cFeatureName}","addHbDisp")
                        .replace("{cUseName}","topping")
                        .replace("{byId}","1")
                        .replace("{byActFlg}","1")
                        .replace("{onOff}",sendFormat_on_time)
                        .replace("{cValue1}",document.getElementById("addHb_tpDIsp_flg").checked ? "1" : "0")
                        .replace("{cValue2}","-")
                        .replace("{cValue3}","-")
                        .replace("{cValue4}","-")
                        .replace("{cValue5}","-")
                        .replace("{cValue6}","-")
                        .replace("{cValue7}","-")
                        .replace("{cValue8}","-")
                        .replace("{cValue9}","-")
                        .replace("{cValue10}","-")
                        .replace("{cValue11}","-")
                        .replace("{cValue12}","-")
                        .replace("{cValue13}","-")
                        .replace("{cValue14}","-")
                        .replace("{cValue15}","-")
                        .replace("{tCreateTime}",currentDateTimeStr)
                        .replace("{tUpdateTime}",currentDateTimeStr);
    console.log(sendData);


    // 送信処理開始
    console.log("全般設定-汎用マスタ反映処理開始");
    document.getElementById('loading').removeAttribute("hidden");
    // タイムアウトフラグ
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
            // リトライ処理
            console.log("全般設定-汎用マスタ反映処理失敗、リトライ");
            // getBasedishcomboGUI();
            // alert("全般設定-汎用マスタ反映処理がタイムアウトしました。")
            sendGeneralInfoGUI();
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
	$.when(
		$.ajax({
			type:'POST',
            url:PHP_EN_ROOT_FOLDER + '/sendGeneralInfoGUI.php',
            data:{
                insertData:sendData
            },
			success:function(data){
				// 基本形ディッシュ組合せマスタ取得
                response_json = data;
                console.log(response_json);
				data = null;
				if(response_json != true && !(timeoutFlg)){
					timeoutFlg = true;
                    // リトライ処理
                    console.log("全般設定-汎用マスタ反映処理失敗");
                    // getBasedishcomboGUI();
                    // alert("全般設定-汎用マスタ反映処理に失敗しました。")
                    sendGeneralInfoGUI();
					return false;
                }
			}
		})
	).done(function() {
		if(response_json == true && !(timeoutFlg)){
			timeoutFlg = true;
            // 次の処理実行
            console.log("全般設定-汎用マスタ反映処理完了");
            sendGeneralInfoGUI2();
		}else{
			timeoutFlg = true;
		}
	})
}

// 送信用基本形ディッシュ組合せマスタデータテンプレート
const sendFormat2 = "({nBaseDishCode},{nGoodsCode},{nCngSourceGoodsCode1},{nCngSourceGoodsCode2},{nCngSourceGoodsCode3},'{cBaseDishName}','{cDispName}',"+
                    "'{cBaseDishImage}',{nHamburgGoodsCode},{nToppingGoodsCode},{nSourceGoodsCode},{nRiceGoodsCode},{nSaladGoodsCode},"+
                    "cast('{tStartValidDate}' as datetime),cast('{tEndValidDate}' as datetime),NOW(),NOW(),'maintenanceGUI','maintenanceGUI')";
const sendFormat2_on_time = '2050-01-21 12:00:00';
const sendFormat2_off_time = '2000-01-21 12:00:00';

/**
 * 全般設定情報反映処理2
 */
function sendGeneralInfoGUI2(){
    // 送信データ
    var sendData = "";
	// 現在日時を取得
    var currentDateTime = new Date();
    var currentDateTimeStr = currentDateTime.getFullYear()+'-'+(currentDateTime.getMonth()+1)+'-'+currentDateTime.getDate()
                    +' '+currentDateTime.getHours()+':'+currentDateTime.getMinutes()+':'+currentDateTime.getSeconds();

    // オーダーメイドディッシュ　-　ベース設定のセット
    for(var basedishcombo_line = 1; basedishcombo_line <= 6; basedishcombo_line++){
        var nCngSourceGoodsCode1 = document.getElementById("cgn_sc1_cd"+basedishcombo_line).value;
        var nCngSourceGoodsCode2 = document.getElementById("cgn_sc2_cd"+basedishcombo_line).value;
        var nCngSourceGoodsCode3 = document.getElementById("cgn_sc3_cd"+basedishcombo_line).value;
        var hb_cd = document.getElementById("hb_cd"+basedishcombo_line).value;
        var tp_cd = document.getElementById("tp_cd"+basedishcombo_line).value;
        var sc_cd = document.getElementById("sc_cd"+basedishcombo_line).value;
        var rp_cd = document.getElementById("rp_cd"+basedishcombo_line).value;
        var sr_cd = document.getElementById("sr_cd"+basedishcombo_line).value;
        sendData += sendFormat2.replace("{nBaseDishCode}",basedishcombo_line)
                            .replace("{nGoodsCode}",document.getElementById("base_goods_cd"+basedishcombo_line).value)
                            .replace("{nCngSourceGoodsCode1}",nCngSourceGoodsCode1 == 0 ? null : nCngSourceGoodsCode1)
                            .replace("{nCngSourceGoodsCode2}",nCngSourceGoodsCode2 == 0 ? null : nCngSourceGoodsCode2)
                            .replace("{nCngSourceGoodsCode3}",nCngSourceGoodsCode3 == 0 ? null : nCngSourceGoodsCode3)
                            // .replace("{cBaseDishName}",document.getElementById("base_goods_name"+basedishcombo_line).value)
                            .replace("{cBaseDishName}","-")
                            .replace("{cDispName}","")
                            .replace("{cBaseDishImage}",document.getElementById("base_goods_file_name"+basedishcombo_line).value)
                            .replace("{nHamburgGoodsCode}",hb_cd == 0 ? null : hb_cd)
                            .replace("{nToppingGoodsCode}",tp_cd == 0 ? null : tp_cd)
                            .replace("{nSourceGoodsCode}",sc_cd == 0 ? null : sc_cd)
                            .replace("{nRiceGoodsCode}",rp_cd == 0 ? null : rp_cd)
                            .replace("{nSaladGoodsCode}",sr_cd == 0 ? null : sr_cd)
                            .replace("{tStartValidDate}","2019-12-01 00:00:00")
                            .replace("{tEndValidDate}",document.getElementById("ordBaseCk"+basedishcombo_line).checked ? sendFormat2_off_time : sendFormat2_on_time);

        if(basedishcombo_line != 6){
            // 最後以外、末尾カンマ付与
            sendData += ",";
        }
    }
    console.log(sendData);

    // 送信処理開始
    console.log("全般設定-基本形ディッシュ組合せマスタ反映処理開始");
    document.getElementById('loading').removeAttribute("hidden");
    // タイムアウトフラグ
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
            // リトライ処理
            console.log("全般設定-基本形ディッシュ組合せマスタ反映処理失敗、リトライ");
            // getBasedishcomboGUI();
            // alert("全般設定-基本形ディッシュ組合せマスタ反映処理がタイムアウトしました。")
            sendGeneralInfoGUI2();
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
	$.when(
		$.ajax({
			type:'POST',
            url:PHP_EN_ROOT_FOLDER + '/sendBasedishcomboGUI.php',
            data:{
                insertData:sendData
            },
			success:function(data){
				// 基本形ディッシュ組合せマスタ取得
                response_json = data;
                console.log(response_json);
				data = null;
				if(response_json != true && !(timeoutFlg)){
					timeoutFlg = true;
                    // リトライ処理
                    console.log("全般設定-基本形ディッシュ組合せマスタ反映処理失敗");
                    // getBasedishcomboGUI();
                    sendGeneralInfoGUI2();
					return false;
                }
			}
		})
	).done(function() {
		if(response_json == true && !(timeoutFlg)){
			timeoutFlg = true;
            // 次の処理実行
            console.log("全般設定-基本形ディッシュ組合せマスタ反映処理完了");
            getGeneralInfoGUI();
            prevDispRef();
            document.getElementById('loading').setAttribute("hidden","hidden");
            alert("登録が完了しました。");
		}else{
			timeoutFlg = true;
		}
	})

}

/**
 * 画像ファイル反映処理
 * @param 画面削除フラグ
 */
 function generalTabImgFileExecute() {
    console.log("全般設定-画像ファイル反映処理開始");
    document.getElementById('loading').removeAttribute("hidden");
    // 画像情報配列
    var imgList = {};

    // 全画像データタグ
    var images = document.getElementsByClassName("general_tab_img");
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

    if(Object.keys(imgList).length == 0){
        // 画像変更なしの場合ここで終了
        console.log("全般設定-画像ファイル反映処理完了(対象なし)");
        sendGeneralInfoGUI();
        return;
    }



    // 送信処理開始
    // タイムアウトフラグ
    var timeoutFlg = false;

    // タイムアウト処理
    setTimeout(function(){
        if(!(timeoutFlg)){
            timeoutFlg = true;
            // リトライ処理
            console.log("全般設定-画像ファイル反映処理失敗、リトライ");
            alert("全般設定-画像ファイル反映処理がタイムアウトしました。");
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
                    console.log("全般設定-画像ファイル反映処理失敗-容量オーバー");
                    alert("画像の総容量が25MBを超えているため、画像の反映をスキップしました。");
                    document.getElementById('loading').setAttribute("hidden","hidden");
                    return false;
                }else if(response_json != true && !(timeoutFlg)){
                    timeoutFlg = true;
                    // リトライ処理
                    console.log("全般設定-画像ファイル反映処理失敗");
                    alert("全般設定-画像ファイル反映処理に失敗しました。");
                    document.getElementById('loading').setAttribute("hidden","hidden");
                    return false;
                }
            }
        })
    ).done(function() {
        if(response_json == true && !(timeoutFlg)){
            timeoutFlg = true;
            // 次の処理実行
            console.log("全般設定-画像ファイル反映処理完了");
            sendGeneralInfoGUI();
        }else{
            timeoutFlg = true;
        }
    })
}