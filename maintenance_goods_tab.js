/**      商品設定タブ用処理           */

// 商品マスタ
var tb_8m_map = [];
var bk_tb_8m_map = [];

// 商品詳細マスタ
var tb_detail_map = [];
var bk_tb_detail_map = [];

// 拡張商品マスタ
var tb_40m_map = [];
var bk_tb_40m_map = [];

// メニューブックアイテムマスタ
var tb_menubookitem_map = [];
var bk_tb_menubookitem_map = [];

// サブメニュー設定情報マスタ
var tb_submenu_map = [];
var bk_tb_submenu_map = [];

// 組み合わせ不可商品マスタ
var tb_nggoodsgroup_map = [];
var bk_tb_nggoodsgroup_map = [];

// 基本形ディッシュ組合せマスタ
var tb_basedishcombo_map = [];
var bk_tb_basedishcombo_map = [];

// メニューブック設定マスタ
var tb_19m_map = [];

// アレルギーマスタ
var tb_allergy_map = [];

/**
 * php実行処理1(商品情報取得)
 * 　非同期通信で情報を取得する
 */
 function getGoodsTables() {
    console.log("商品設定-商品情報取得処理開始");
    // プログレスアイコン表示
    document.getElementById('loading').removeAttribute("hidden");
    
    // タイムアウトフラグ
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
            // リトライ処理
            console.log("商品設定-商品情報取得処理失敗、リトライ");
			getGoodsTables();
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
                    console.log("商品設定-商品情報取得処理失敗、リトライ");
					getGoodsTables();
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
                    tb_basedishcombo_map = jQuery.extend(true, {}, all_data_map["basedishcombo"]);
                    bk_tb_basedishcombo_map = jQuery.extend(true, {}, all_data_map["basedishcombo"]);

                }catch(e){
                    // フォーマット不正の場合、リトライ
                    timeoutFlg = true;
                    console.log("商品設定-商品情報取得処理失敗、リトライ");
                    getGoodsTables();
					return false;
                }
			}
		})
	).done(function() {
		if(!(response_json == false || contains(response_json,CONNECT_ERR_MSG)) && !(timeoutFlg)){
			timeoutFlg = true;
            // 次の処理実行
            console.log("商品設定-商品情報取得処理完了");
            goodsFstCreate();
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * php実行処理2(商品情報登録)
 * 　非同期通信で情報を取得する
 *  @param 商品コード
 *  @param サブメニュークエリ
 *  @param メニューブックアイテムマスタクエリ
 *  @param 組み合わせ不可商品マスタクエリ
 *  @param 商品詳細マスタクエリ
 */
 function setGoodsTables(nGoodsCode,submenuQuery,menubookitemQuery,nggoodsQuery,goodsDetailQuery,goods40mQuery,goodsdishcomboQuery) {
    console.log("商品設定-商品情報登録処理開始");
    // プログレスアイコン表示
    document.getElementById('loading').removeAttribute("hidden");
    
    // タイムアウトフラグ
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
            // リトライ処理
            console.log("商品設定-商品情報登録処理失敗、リトライ");
			setGoodsTables(nGoodsCode,submenuQuery,menubookitemQuery,nggoodsQuery,goodsDetailQuery,goods40mQuery,goodsdishcomboQuery);
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/sendGoodsTablesGUI.php',
            data:{
                'nGoodsCode':nGoodsCode,
                'submenuQuery':submenuQuery,
                'menubookitemQuery':menubookitemQuery,
                'nggoodsQuery':nggoodsQuery,
                'goodsDetailQuery':goodsDetailQuery,
                'goods40mQuery':goods40mQuery,
                'goodsdishcomboQuery':goodsdishcomboQuery,
            },
			success:function(data){
                response_json = data;
				if(response_json == false || contains(response_json,CONNECT_ERR_MSG) && !(timeoutFlg)){
					timeoutFlg = true;
                    // リトライ処理
                    console.log("商品設定-商品情報登録処理失敗、リトライ");
					setGoodsTables(nGoodsCode,submenuQuery,menubookitemQuery,nggoodsQuery,goodsDetailQuery,goods40mQuery,goodsdishcomboQuery);
					return false;
                }
			}
		})
	).done(function() {
		if(!(response_json == false || contains(response_json,CONNECT_ERR_MSG)) && !(timeoutFlg)){
			timeoutFlg = true;
            // 次の処理実行
            console.log("商品設定-商品情報登録処理完了");
            document.getElementById("tabBtn5").click();
		}else{
			timeoutFlg = true;
		}
	})
}

/**
 * 初期表示処理
 */
function goodsFstCreate(){
    // 詳細項目非表示化
    document.getElementById("goodsTabDetail").style.display = "none";
    document.getElementById("goodsExecuteBtn").style.display = "none";
    document.getElementById("goodsCancelBtn").style.display = "none";
    // 商品リスト生成処理
    // 一覧取得
    var details = document.getElementById("goodsList");
    // 初期化
    details.innerHTML = null;

    for(var m8 in tb_8m_map){
        if(tb_detail_map[m8] == null || tb_40m_map[m8] == null){
            // 必須のテーブルデータがない場合、不正データとみなし処理対象外
            continue;
        }

        var option = document.createElement("option");
        option.value = tb_8m_map[m8]["nGoodsCode"];
        option.textContent = tb_8m_map[m8]["nGoodsCode"]+":"+tb_8m_map[m8]["cGoodsName"]+"(￥"+tb_8m_map[m8]["nUnitCost"]+")";
        option.setAttribute("onchange","goodsSelect("+tb_8m_map[m8]["nGoodsCode"]+")");
        details.appendChild(option);
    }

    // メニュー区分一覧生成処理
    var goods_menuType = document.getElementById("goods_menuType");
    goods_menuType.innerHTML = '<option value="0">0:設定なし</option><option value="1">1:オーダーメイドディッシュ</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option>';
    var goods_menuTypes = goods_menuType.children;
    for(var i=2;i < goods_menuTypes.length; i++){
        // goods_menuTypes[i].textContent = goods_menuTypes[i].textContent+":";
        for(var m8 in tb_8m_map){
            if(tb_detail_map[m8] == null || tb_40m_map[m8] == null){
                // 必須のテーブルデータがない場合、不正データとみなし処理対象外
                continue;
            }
            if(tb_detail_map[m8]["byMenuType"] == goods_menuTypes[i].value){
                if(contains(goods_menuTypes[i].textContent,":")){
                    goods_menuTypes[i].textContent = goods_menuTypes[i].textContent+","+tb_8m_map[m8]["cGoodsName"];
                } else {
                    goods_menuTypes[i].textContent = goods_menuTypes[i].textContent+":"+tb_8m_map[m8]["cGoodsName"];
                }
            }
        }
    }

    // プログレスアイコン非表示
    document.getElementById('loading').setAttribute("hidden","hidden");
}

/**
 * 商品選択処理
 * @param 商品コード
 */
function goodsSelect(goodsCd){
    // 詳細非表示化
    var detail = document.getElementById("goodsTabDetail");
    detail.style.display = "none";
    document.getElementById("goodsExecuteBtn").style.display = "none";
    document.getElementById("goodsCancelBtn").style.display = "none";

    goodsMapReset();

    // 商品名
    var goodsGoodsNameJp = document.getElementById("goodsGoodsNameJp");
    goodsGoodsNameJp.value = tb_detail_map[goodsCd]["cGoodsName"];
    var goodsGoodsNameEn = document.getElementById("goodsGoodsNameEn");
    goodsGoodsNameEn.value = tb_detail_map[goodsCd]["cGoodsNameEn"];


    // 商品画像
    var goodsImg1 = document.getElementById("goods_img_1");
    goodsImg1.setAttribute("del","0");
    goodsImg1.src = "images/goods/"+goodsCd+".png?"+Date.now();
    goodsImg1.setAttribute("tmp","images/goods/"+goodsCd+".png");
    document.getElementById("goods_img_"+1+"_cng").value = null;
    document.getElementById("goods_img_"+1+"_del").checked = false;
    var goodsImg2 = document.getElementById("goods_img_2");
    goodsImg2.setAttribute("del","0");
    goodsImg2.src = "images/goods/"+goodsCd+"_unsel.png?"+Date.now();
    goodsImg2.setAttribute("tmp","images/goods/"+goodsCd+"_unsel.png");
    document.getElementById("goods_img_"+2+"_cng").value = null;
    document.getElementById("goods_img_"+2+"_del").checked = false;
    var goodsImg3 = document.getElementById("goods_img_3");
    goodsImg3.setAttribute("del","0");
    goodsImg3.src = "images/goods/"+goodsCd+"_sel.png?"+Date.now();
    goodsImg3.setAttribute("tmp","images/goods/"+goodsCd+"_sel.png");
    document.getElementById("goods_img_"+3+"_cng").value = null;
    document.getElementById("goods_img_"+3+"_del").checked = false;

    var goodsImg4 = document.getElementById("goods_img_4");
    goodsImg4.setAttribute("del","0");
    goodsImg4.src = "images/goods/"+goodsCd+"_prev.png?"+Date.now();
    goodsImg4.setAttribute("tmp","images/goods/"+goodsCd+"_prev.png");
    document.getElementById("goods_img_"+4+"_cng").value = null;
    document.getElementById("goods_img_"+4+"_del").checked = false;

    // 登録メニューブック
    // 初期化
    var goods_menubook_off = document.getElementById("goods_menubook_off");
    goods_menubook_off.innerHTML = null;
    var goods_menubook_on = document.getElementById("goods_menubook_on");
    goods_menubook_on.innerHTML = null;
    for(var i in tb_19m_map){
        var option = document.createElement("option");
        option.value = tb_19m_map[i]["nMenuBookCode"];
        option.textContent = tb_19m_map[i]["nMenuBookCode"]+"："+tb_19m_map[i]["cMenuBookName"];

        if(tb_menubookitem_map[tb_19m_map[i]["nMenuBookCode"]+"_"+goodsCd] == null){
            // 未登録の場合
            goods_menubook_off.appendChild(option);
        } else {
            // 登録済みの場合
            goods_menubook_on.appendChild(option);
        }
    }

    // メニュー区分
    var goodsMenuType = document.getElementById("goods_menuType");
    goodsMenuType.value = tb_detail_map[goodsCd]["byMenuType"];
    // メニュー区分がオーダーメイドディッシュ(1)以外の場合、商品区分・組み合わせ不可商品非表示
    if(tb_detail_map[goodsCd]["byMenuType"] != "1"){
        document.getElementById("ngGoodsGroup_menuType").style.display = "none";
    } else {
        document.getElementById("ngGoodsGroup_menuType").style.display = "block";
    }
    // 商品区分
    var goodsGoodsType = document.getElementById("goodsGoodsType");
    goodsGoodsType.value = tb_detail_map[goodsCd]["nGoodsType"];

    // 組み合わせ不可商品
    var goods_NgGoodsGroup_off = document.getElementById("goods_NgGoodsGroup_off");
    var goods_NgGoodsGroup_on = document.getElementById("goods_NgGoodsGroup_on");
    goods_NgGoodsGroup_off.innerHTML = null;
    goods_NgGoodsGroup_on.innerHTML = null;

    for(var m8 in tb_8m_map){
        if(tb_detail_map[m8] == null || tb_40m_map[m8] == null){
            // 必須のテーブルデータがない場合、不正データとみなし処理対象外
            continue;
        }

        var option = document.createElement("option");
        option.value = tb_8m_map[m8]["nGoodsCode"];
        option.textContent = tb_8m_map[m8]["nGoodsCode"]+":"+tb_8m_map[m8]["cGoodsName"];

        // 一旦未登録に反映
        goods_NgGoodsGroup_off.appendChild(option);

        for(var nm in tb_nggoodsgroup_map){
            if(tb_nggoodsgroup_map[nm]["nGoodsCode"] == goodsCd && tb_nggoodsgroup_map[nm]["nNgGoodsCode"] == m8){
                // 登録済みの場合、登録済みへ移動
                goods_NgGoodsGroup_on.appendChild(option);
                break;
            }
        }
    }




    // カスタムディッシュ化
    var tgtBdcKey = 0;
    for(var bdc in tb_basedishcombo_map){
        if(tb_basedishcombo_map[bdc]["nGoodsCode"] == goodsCd){
            tgtBdcKey = bdc;
            break;
        }
    }
    // ハンバーグ商品コード
    var hbCd = document.getElementById("hb_cd_ordmade");
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
    // トッピング商品コード
    var tpCd = document.getElementById("tp_cd_ordmade");
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
    // ソース商品コード
    var scCd = document.getElementById("sc_cd_ordmade");
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
    // ライス商品コード
    var rpCd = document.getElementById("rp_cd_ordmade");
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
    // サラダ商品コード
    var srCd = document.getElementById("sr_cd_ordmade");
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
    // 変更可能ソース商品コード１
    var cgnSc1Cd = document.getElementById("cgn_sc1_cd_ordmade");
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
    // 変更可能ソース商品コード２
    var cgnSc2Cd = document.getElementById("cgn_sc2_cd_ordmade");
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
    // 変更可能ソース商品コード３
    var cgnSc3Cd = document.getElementById("cgn_sc3_cd_ordmade");
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
    if(tb_basedishcombo_map[tgtBdcKey] != null){
        document.getElementById("goods_ordmade_title").hidden = false;
        document.getElementById("goods_ordmade_flg").checked = true;
        document.getElementById("goods_ordmade").hidden = false;
        hbCd.value = tb_basedishcombo_map[tgtBdcKey]["nHamburgGoodsCode"] == null ? "":tb_basedishcombo_map[tgtBdcKey]["nHamburgGoodsCode"];
        tpCd.value = tb_basedishcombo_map[tgtBdcKey]["nToppingGoodsCode"] == null ? "":tb_basedishcombo_map[tgtBdcKey]["nToppingGoodsCode"];
        scCd.value = tb_basedishcombo_map[tgtBdcKey]["nSourceGoodsCode"] == null ? "":tb_basedishcombo_map[tgtBdcKey]["nSourceGoodsCode"];
        rpCd.value = tb_basedishcombo_map[tgtBdcKey]["nRiceGoodsCode"] == null ? "":tb_basedishcombo_map[tgtBdcKey]["nRiceGoodsCode"];
        srCd.value = tb_basedishcombo_map[tgtBdcKey]["nSaladGoodsCode"] == null ? "":tb_basedishcombo_map[tgtBdcKey]["nSaladGoodsCode"];
        cgnSc1Cd.value = tb_basedishcombo_map[tgtBdcKey]["nCngSourceGoodsCode1"] == null ? "":tb_basedishcombo_map[tgtBdcKey]["nCngSourceGoodsCode1"];
        cgnSc2Cd.value = tb_basedishcombo_map[tgtBdcKey]["nCngSourceGoodsCode2"] == null ? "":tb_basedishcombo_map[tgtBdcKey]["nCngSourceGoodsCode2"];
        cgnSc3Cd.value = tb_basedishcombo_map[tgtBdcKey]["nCngSourceGoodsCode3"] == null ? "":tb_basedishcombo_map[tgtBdcKey]["nCngSourceGoodsCode3"];
    } else {
        document.getElementById("goods_ordmade_title").hidden = false;
        document.getElementById("goods_ordmade_flg").checked = false;
        document.getElementById("goods_ordmade").hidden = true;
    }
    if(tgtBdcKey == "1" || tgtBdcKey == "2"|| tgtBdcKey == "3"|| tgtBdcKey == "4"|| tgtBdcKey == "5"|| tgtBdcKey == "6"){
        document.getElementById("goods_ordmade_title").hidden = true;
        document.getElementById("goods_ordmade").hidden = true;
    }




    // 商品表示位置調整
    // 表示位置_X軸
    var goodsPosX = document.getElementById("goodsPosX");
    goodsPosX.value = tb_detail_map[goodsCd]["nDispPositionX"];
    // 表示位置_Y軸
    var goodsPosY = document.getElementById("goodsPosY");
    goodsPosY.value = tb_detail_map[goodsCd]["nDispPositionY"];
    // 高さ比率
    var goodsHeight = document.getElementById("goodsHeight");
    goodsHeight.value = tb_detail_map[goodsCd]["nHeightRate"];
    // 幅比率
    var goodsWidth = document.getElementById("goodsWidth");
    goodsWidth.value = tb_detail_map[goodsCd]["nWidthRate"];
    // 表示順序
    var goodsTopDisp = document.getElementById("goodsTopDisp");
    goodsTopDisp.value = tb_detail_map[goodsCd]["nZline"];

    // 最大選択数量
    var goodsMaxCnt = document.getElementById("goodsMaxCnt");
    goodsMaxCnt.value = tb_detail_map[goodsCd]["wSelectEnableCount"];

    // 一覧表示順序
    var goodsIndex = document.getElementById("goodsIndex");
    goodsIndex.value = tb_detail_map[goodsCd]["nDetailIndex"];

    // 塩分
    var goodsSalt = document.getElementById("goodsSalt");
    goodsSalt.value = tb_detail_map[goodsCd]["nSalt"];

    // カロリー
    var goodsCal = document.getElementById("goodsCal");
    goodsCal.value = tb_detail_map[goodsCd]["nCal"];

    // アルコール
    var goodsAlcohol = document.getElementById("goodsAlcohol");
    goodsAlcohol.checked = tb_detail_map[goodsCd]["byAlcohol"] == "1";

    // テイクアウト
    var goodsTakeout = document.getElementById("goodsTakeout");
    goodsTakeout.checked = tb_40m_map[goodsCd]["byTakeoutDefaultType"] == "2";

    // アレルギーフラグ
    var goodsallergyFlg = document.getElementById("goodsallergyFlg");
    goodsallergyFlg.checked = tb_detail_map[goodsCd]["byAllergyDetailDispFlg"] == "1";
    if(goodsMenuType.value == "1"){
        goodsallergyFlg.style.display = "none";
    } else {
        goodsallergyFlg.style.display = "inline";
    }

    // アレルギー
    var goods_allergy_off = document.getElementById("goods_allergy_off");
    var goods_allergy_on = document.getElementById("goods_allergy_on");
    goods_allergy_off.innerHTML = null;
    goods_allergy_on.innerHTML = null;

    for(var al in tb_allergy_map){
        tb_allergy_map[al]
        var option = document.createElement("option");
        option.value = al;
        option.textContent = al+":"+tb_allergy_map[al]["cAllergyName"];
        if(tb_allergy_map[al]["cAllergyName"] == ""){
            option.hidden = true;
        }
        // 一旦未登録に反映
        goods_allergy_off.appendChild(option);

        if(tb_detail_map[goodsCd] != null && tb_detail_map[goodsCd]["byAllergie"+al] == "1"){
            // 登録済みの場合、登録済みへ移動
            goods_allergy_on.appendChild(option);
        }
    }

    // 数量選択ポップアップ
    var goodsCntPop = document.getElementById("goodsCntPop");
    goodsCntPop.checked = tb_detail_map[goodsCd]["bySelectCntFlg"] == "1";
    

    // サブメニュー設定
    var submenuDetail = document.getElementById("submenuDetail");
    // 初期化
    submenuDetail.innerHTML = null;

    for(var sbm in tb_submenu_map){
        if(tb_submenu_map[sbm]["nGoodsCode"] == goodsCd
         && tb_submenu_map[sbm]["byActFlg"] == "1"){
            // 有効かつ、対象商品行の場合
            submenuDetail.appendChild(submenuCreate(sbm));
        }
    }

    // 詳細表示化
    detail.style.display = "block";
    document.getElementById("goodsExecuteBtn").style.display = "block";
    document.getElementById("goodsCancelBtn").style.display = "block";
}

/**
 * 検索欄処理
 * @param 入力値
 */
function goodsSearch(input){

    // 商品リスト取得
    var goodsList = document.getElementById("goodsList");
    // for(var c in goodsList.children){
    for(var c = 0;c < goodsList.children.length;c++){
        if(input == ""){
            // 入力なしの場合、全表示
            goodsList.children[c].style.display = "block";
        } else if(contains(goodsList.children[c].textContent,input)){
            // 入力値が含まれる場合、対象のみ表示
            goodsList.children[c].style.display = "block";
        } else {
            // 入力ありで含まれない場合、非表示
            goodsList.children[c].style.display = "none";
        }
    }
}

/**
 * メニューブック登録処理
 */
function goodsMenuBookOn(){
    var off = document.getElementById("goods_menubook_off");
    var on = document.getElementById("goods_menubook_on");
    if(off.selectedIndex != -1){
        on.appendChild(off[off.selectedIndex]);
        // off.removeChild(off[off.selectedIndex]);
    }
    maintenanceSortNum("goods_menubook_on","option","value");
}

/**
 * メニューブック登録解除処理
 */
function goodsMenuBookOff(){
    var off = document.getElementById("goods_menubook_off");
    var on = document.getElementById("goods_menubook_on");
    if(on.selectedIndex != -1){
        off.appendChild(on[on.selectedIndex]);
        // on.removeChild(on[on.selectedIndex]);
    }
    maintenanceSortNum("goods_menubook_off","option","value");
}

/**
 * 組み合わせ不可商品登録処理
 */
 function goodsNgGoodsGroupOn(){
    var off = document.getElementById("goods_NgGoodsGroup_off");
    var on = document.getElementById("goods_NgGoodsGroup_on");
    if(off.selectedIndex != -1){
        on.appendChild(off[off.selectedIndex]);
        // off.removeChild(off[off.selectedIndex]);
    }
    maintenanceSortNum("goods_NgGoodsGroup_on","option","value");
}

/**
 * 組み合わせ不可商品登録解除処理
 */
function goodsNgGoodsGroupOff(){
    var off = document.getElementById("goods_NgGoodsGroup_off");
    var on = document.getElementById("goods_NgGoodsGroup_on");
    if(on.selectedIndex != -1){
        off.appendChild(on[on.selectedIndex]);
        // on.removeChild(on[on.selectedIndex]);
    }
    maintenanceSortNum("goods_NgGoodsGroup_off","option","value");
}

/**
 * アレルギー登録処理
 */
 function goodsAllergyOn(){
    var off = document.getElementById("goods_allergy_off");
    var on = document.getElementById("goods_allergy_on");
    if(off.selectedIndex != -1){
        on.appendChild(off[off.selectedIndex]);
    }
    maintenanceSortNum("goods_allergy_on","option","value");
}

/**
 * アレルギー登録解除処理
 */
 function goodsAllergyOff(){
    var off = document.getElementById("goods_allergy_off");
    var on = document.getElementById("goods_allergy_on");
    if(on.selectedIndex != -1){
        off.appendChild(on[on.selectedIndex]);
    }
    maintenanceSortNum("goods_allergy_off","option","value");
}

/**
 * メニュー区分切替処理
 */
function goodsMenuTypeChange(){
    var goodsallergyFlg = document.getElementById("goodsallergyFlg");
    var goods_menuType = document.getElementById("goods_menuType");
    if(goods_menuType.value == 1){
        // 商品区分 組み合わせ不可商品表示
        document.getElementById("ngGoodsGroup_menuType").style.display = "block";
        goodsallergyFlg.style.display = "none";
    } else {
        document.getElementById("ngGoodsGroup_menuType").style.display = "none";
        goodsallergyFlg.style.display = "inline";
    }
}

/**
 * サブメニュー追加ボタン処理
 */
function submenuAdd(){
    var select = document.getElementById("goodsSubmenuTypeSelect");
    var submenuDetail = document.getElementById("submenuDetail");
    if(submenuDetail.children.length > 3){
        alert("ポップアップ数が上限のため、追加できません。");
        return;
    }
    
    var newKey = getMaxSubmenuKey();
    var jsonFormat = {"nSubmenuCode":newKey,
    "byActFlg":'1',
    "byDifferenceDispFlg":'0',
    "byGoodsNameDispType":'0',
    "byType":'1',
    "cCreateId":'default',
    "cFreeName1":'-',
    "nDefaultPosition":'1',
    "nSubGoodsCode1":'0',
    "nSubGoodsCode2":'0',
    "nSubGoodsCode3":'0',
    "nSubGoodsCode4":'0',
    "cFreeName1Cn":'-',
    "cFreeName1En":'-',
    "cFreeName1Kr":'-',
    "cFreeName2":'-',
    "cFreeName2Cn":'-',
    "cFreeName2En":'-',
    "cFreeName2Kr":'-',
    "cFreeName3":'-',
    "cFreeName3Cn":'-',
    "cFreeName3En":'-',
    "cFreeName3Kr":'-',
    "cFreeName4":'-',
    "cFreeName4Cn":'-',
    "cFreeName4En":'-',
    "cFreeName4Kr":'-',
    "cTitleMsg":'-',
    "cTitleMsgCn":'-',
    "cTitleMsgEn":'-'};
    jsonFormat["byType"] = select.value;
    // 空のデータを追加
    tb_submenu_map[newKey] = jsonFormat;
    // 画面に項目生成
    submenuDetail.appendChild(submenuCreate(newKey));
}

/**
 * サブメニュー削除ボタン処理
 * 対象タグ
 */
function submenuDel(elm){
    elm.parentNode.parentNode.parentNode.removeChild(elm.parentNode.parentNode);
}

/**
 * サブメニュー項目生成処理
 * @param サブメニューコード
 */
function submenuCreate(sbm){
    // 大枠
    var main_span = document.createElement("span");
    main_span.classList.add("popType_"+tb_submenu_map[sbm]["byType"]);

    // 仕切り
    var hr1 = document.createElement("hr");
    hr1.style.width = "500px";
    main_span.appendChild(hr1);

    // ポップアップ種類表示・削除ボタン
    var nameTxt = '';
    if(tb_submenu_map[sbm]["byType"] == "1"){
        nameTxt = 'ベース商品選択ポップアップ';
    } else if(tb_submenu_map[sbm]["byType"] == "2"){
        nameTxt = 'サブ商品選択ポップアップ(複数)';
    } else if(tb_submenu_map[sbm]["byType"] == "3"){
        nameTxt = 'サブ商品選択ポップアップ(単一)';
    } else if(tb_submenu_map[sbm]["byType"] == "4"){
        nameTxt = 'サブ数量選択ポップアップ';
    } else if(tb_submenu_map[sbm]["byType"] == "6"){
        nameTxt = 'テキスト表示のみポップアップ';
    }

    var popTypeName_p = document.createElement("p");
    popTypeName_p.innerHTML = nameTxt+
            '<input onclick="submenuDel(this);" type="button" class="m-btn goods-sub-delete" value="削除" style="margin-left: 20px;">';
    main_span.appendChild(popTypeName_p);
    
    // タイトル名
    var titleJp_p = document.createElement("p");
    titleJp_p.style.marginLeft = "20px";
    titleJp_p.innerHTML = 'タイトル(日本語)'+
            '<INPUT value="'+tb_submenu_map[sbm]["cTitleMsg"]+'" type="text" class="goodsSubmenuTitleJp" style="margin-left: 30px;width: 500px;height: 25px;"/>';
    main_span.appendChild(titleJp_p);

    var titleEn_p = document.createElement("p");
    titleEn_p.style.marginLeft = "20px";
    titleEn_p.innerHTML = 'タイトル(英語)　'+
            '<INPUT value="'+tb_submenu_map[sbm]["cTitleMsgEn"]+'" type="text" class="goodsSubmenuTitleEn" style="margin-left: 30px;width: 500px;height: 25px;"/>';
    main_span.appendChild(titleEn_p);


    if(tb_submenu_map[sbm]["byType"] != "6"){
        // 商品1
        var goods1_span = document.createElement("span");
        goods1_span.classList.add("goodsMain1");
        // 商品1-タイトル
        var goods1_title_p = document.createElement("p");
        goods1_title_p.style.marginLeft = "20px";
        goods1_title_p.textContent = "商品1";
        goods1_span.appendChild(goods1_title_p);
        // 商品1-商品一覧
        var goods1_detail_p = document.createElement("p");
        goods1_detail_p.style.marginLeft = "40px";
        goods1_detail_p.insertAdjacentHTML("beforeend", "商品コード");
        var goods1_detail_select = document.createElement("select");
        goods1_detail_select.classList.add("goods1");
        goods1_detail_select.classList.add("submenu_goodsList");
        goods1_detail_select.style.marginLeft = "20px";
        goods1_detail_select.style.width = "350px";
        goods1_detail_select.style.height = "25px";

        if(tb_submenu_map[sbm]["byType"] == "3"){
            var option = document.createElement("option");
            option.value = 0;
            option.textContent = "0:なし";

            goods1_detail_select.appendChild(option);
        }

        for(var m8 in tb_8m_map){
            if(tb_detail_map[m8] == null || tb_40m_map[m8] == null){
                // 必須のテーブルデータがない場合、不正データとみなし処理対象外
                continue;
            }
            var option = document.createElement("option");
            option.value = tb_8m_map[m8]["nGoodsCode"];
            option.textContent = tb_8m_map[m8]["nGoodsCode"]+":"+tb_8m_map[m8]["cGoodsName"];

            goods1_detail_select.appendChild(option);
        }
        goods1_detail_select.value = tb_submenu_map[sbm]["nSubGoodsCode1"];
        goods1_detail_p.appendChild(goods1_detail_select);
        goods1_span.appendChild(goods1_detail_p);
        main_span.appendChild(goods1_span);

        var goods1_jpName_p = document.createElement("p");
        goods1_jpName_p.style.marginLeft = "40px";
        goods1_jpName_p.insertAdjacentHTML("beforeend", "表示商品名(日本語)");
        goods1_jpName_input = document.createElement("input");
        goods1_jpName_input.classList.add("goods1");
        goods1_jpName_input.classList.add("goodsJpName");
        goods1_jpName_input.type = "text";
        goods1_jpName_input.style.marginLeft = "30px";
        goods1_jpName_input.style.width = "300px";
        goods1_jpName_input.style.height = "25px";
        goods1_jpName_input.value = tb_submenu_map[sbm]["cFreeName1"];
        goods1_jpName_p.appendChild(goods1_jpName_input);
        goods1_span.appendChild(goods1_jpName_p);
        // main_span.appendChild(goods1_jpName_p);

        var goods1_enName_p = document.createElement("p");
        goods1_enName_p.style.marginLeft = "40px";
        goods1_enName_p.insertAdjacentHTML("beforeend", "表示商品名(英語)　");
        goods1_enName_input = document.createElement("input");
        goods1_enName_input.classList.add("goods1");
        goods1_enName_input.classList.add("goodsEnName");
        goods1_enName_input.type = "text";
        goods1_enName_input.style.marginLeft = "30px";
        goods1_enName_input.style.width = "300px";
        goods1_enName_input.style.height = "25px";
        goods1_enName_input.value = tb_submenu_map[sbm]["cFreeName1En"];
        goods1_enName_p.appendChild(goods1_enName_input);
        goods1_span.appendChild(goods1_enName_p);
        // main_span.appendChild(goods1_enName_p);

        if(tb_submenu_map[sbm]["byType"] != "4"){
            // 商品2
            var goods2_span = document.createElement("span");
            goods2_span.classList.add("goodsMain2");
            // 商品2-タイトル
            var goods2_title_p = document.createElement("p");
            goods2_title_p.style.marginLeft = "20px";
            goods2_title_p.textContent = "商品2";
            goods2_span.appendChild(goods2_title_p);
            // 商品2-商品一覧
            var goods2_detail_p = document.createElement("p");
            goods2_detail_p.style.marginLeft = "40px";
            goods2_detail_p.insertAdjacentHTML("beforeend", "商品コード");
            var goods2_detail_select = document.createElement("select");
            goods2_detail_select.classList.add("goods2");
            goods2_detail_select.classList.add("submenu_goodsList");
            goods2_detail_select.style.marginLeft = "20px";
            goods2_detail_select.style.width = "350px";
            goods2_detail_select.style.height = "25px";

            if(tb_submenu_map[sbm]["byType"] == "3"){
                var option = document.createElement("option");
                option.value = 0;
                option.textContent = "0:なし";

                goods2_detail_select.appendChild(option);
            }

            for(var m8 in tb_8m_map){
                if(tb_detail_map[m8] == null || tb_40m_map[m8] == null){
                    // 必須のテーブルデータがない場合、不正データとみなし処理対象外
                    continue;
                }

                var option = document.createElement("option");
                option.value = tb_8m_map[m8]["nGoodsCode"];
                option.textContent = tb_8m_map[m8]["nGoodsCode"]+":"+tb_8m_map[m8]["cGoodsName"];

                goods2_detail_select.appendChild(option);
            }
            goods2_detail_select.value = tb_submenu_map[sbm]["nSubGoodsCode2"];
            goods2_detail_p.appendChild(goods2_detail_select);
            goods2_span.appendChild(goods2_detail_p);
            main_span.appendChild(goods2_span);

            var goods2_jpName_p = document.createElement("p");
            goods2_jpName_p.style.marginLeft = "40px";
            goods2_jpName_p.insertAdjacentHTML("beforeend", "表示商品名(日本語)");
            goods2_jpName_input = document.createElement("input");
            goods2_jpName_input.classList.add("goods2");
            goods2_jpName_input.classList.add("goodsJpName");
            goods2_jpName_input.type = "text";
            goods2_jpName_input.style.marginLeft = "30px";
            goods2_jpName_input.style.width = "300px";
            goods2_jpName_input.style.height = "25px";
            goods2_jpName_input.value = tb_submenu_map[sbm]["cFreeName2"];
            goods2_jpName_p.appendChild(goods2_jpName_input);
            goods2_span.appendChild(goods2_jpName_p);
            // main_span.appendChild(goods2_jpName_p);

            var goods2_enName_p = document.createElement("p");
            goods2_enName_p.style.marginLeft = "40px";
            goods2_enName_p.insertAdjacentHTML("beforeend", "表示商品名(英語)　");
            goods2_enName_input = document.createElement("input");
            goods2_enName_input.classList.add("goods2");
            goods2_enName_input.classList.add("goodsEnName");
            goods2_enName_input.type = "text";
            goods2_enName_input.style.marginLeft = "30px";
            goods2_enName_input.style.width = "300px";
            goods2_enName_input.style.height = "25px";
            goods2_enName_input.value = tb_submenu_map[sbm]["cFreeName2En"];
            goods2_enName_p.appendChild(goods2_enName_input);
            goods2_span.appendChild(goods2_enName_p);
            // main_span.appendChild(goods2_enName_p);

            // 商品3
            var goods3_span = document.createElement("span");
            goods3_span.classList.add("goodsMain3");
            // 商品3-タイトル
            var goods3_title_p = document.createElement("p");
            goods3_title_p.style.marginLeft = "20px";
            goods3_title_p.textContent = "商品3";
            goods3_span.appendChild(goods3_title_p);
            // 商品3-商品一覧
            var goods3_detail_p = document.createElement("p");
            goods3_detail_p.style.marginLeft = "40px";
            goods3_detail_p.insertAdjacentHTML("beforeend", "商品コード");
            var goods3_detail_select = document.createElement("select");
            goods3_detail_select.classList.add("goods3");
            goods3_detail_select.classList.add("submenu_goodsList");
            goods3_detail_select.style.marginLeft = "30px";
            goods3_detail_select.style.width = "350px";
            goods3_detail_select.style.height = "25px";

            var option = document.createElement("option");
            option.value = 0;
            option.textContent = "0:未使用";

            goods3_detail_select.appendChild(option);

            for(var m8 in tb_8m_map){
                if(tb_detail_map[m8] == null || tb_40m_map[m8] == null){
                    // 必須のテーブルデータがない場合、不正データとみなし処理対象外
                    continue;
                }

                var option = document.createElement("option");
                option.value = tb_8m_map[m8]["nGoodsCode"];
                option.textContent = tb_8m_map[m8]["nGoodsCode"]+":"+tb_8m_map[m8]["cGoodsName"];

                goods3_detail_select.appendChild(option);
            }
            goods3_detail_select.value = tb_submenu_map[sbm]["nSubGoodsCode3"];
            goods3_detail_p.appendChild(goods3_detail_select);
            goods3_span.appendChild(goods3_detail_p);
            main_span.appendChild(goods3_span);

            var goods3_jpName_p = document.createElement("p");
            goods3_jpName_p.style.marginLeft = "40px";
            goods3_jpName_p.insertAdjacentHTML("beforeend", "表示商品名(日本語)");
            goods3_jpName_input = document.createElement("input");
            goods3_jpName_input.classList.add("goods3");
            goods3_jpName_input.classList.add("goodsJpName");
            goods3_jpName_input.type = "text";
            goods3_jpName_input.style.marginLeft = "30px";
            goods3_jpName_input.style.width = "300px";
            goods3_jpName_input.style.height = "25px";
            goods3_jpName_input.value = tb_submenu_map[sbm]["cFreeName3"];
            goods3_jpName_p.appendChild(goods3_jpName_input);
            goods3_span.appendChild(goods3_jpName_p);
            // main_span.appendChild(goods3_jpName_p);

            var goods3_enName_p = document.createElement("p");
            goods3_enName_p.style.marginLeft = "40px";
            goods3_enName_p.insertAdjacentHTML("beforeend", "表示商品名(英語)　");
            goods3_enName_input = document.createElement("input");
            goods3_enName_input.classList.add("goods3");
            goods3_enName_input.classList.add("goodsEnName");
            goods3_enName_input.type = "text";
            goods3_enName_input.style.marginLeft = "30px";
            goods3_enName_input.style.width = "300px";
            goods3_enName_input.style.height = "25px";
            goods3_enName_input.value = tb_submenu_map[sbm]["cFreeName3En"];
            goods3_enName_p.appendChild(goods3_enName_input);
            goods3_span.appendChild(goods3_enName_p);
            // main_span.appendChild(goods3_enName_p);
        }

        if(tb_submenu_map[sbm]["byType"] == "1" || tb_submenu_map[sbm]["byType"] == "3"){
            // デフォルト選択位置
            var default_position_p = document.createElement("p");
            default_position_p.style.marginLeft = "20px";
            default_position_p.insertAdjacentHTML("beforeend","デフォルト選択位置");
            var default_position_select = document.createElement("select");
            default_position_select.style.position = "relative";
            default_position_select.style.left = "20px";
            default_position_select.style.height = "30px";
            default_position_select.style.width = "50px";
            default_position_select.classList.add("defaultPosition");
            for(var i=1;i < 4;i++){
                var default_position_option = document.createElement("option");
                default_position_option.value = i;
                default_position_option.textContent = i;
                default_position_select.appendChild(default_position_option);
            }
            default_position_select.value = tb_submenu_map[sbm]["nDefaultPosition"];
            default_position_p.appendChild(default_position_select);
            main_span.appendChild(default_position_p);
        }
        if(tb_submenu_map[sbm]["byType"] == "1"){
            // 差額表示(1:ON,他:OFF)
            var diff_p = document.createElement("p");
            diff_p.style.marginLeft = "20px";
            diff_p.insertAdjacentHTML("beforeend","差額表示");
            var diff_input = document.createElement("input");
            diff_input.type = "checkbox";
            diff_input.checked = tb_submenu_map[sbm]["byDifferenceDispFlg"] == "1";
            diff_input.style.marginLeft = "20px";
            diff_input.style.top = "1px";
            diff_input.classList.add("diffFlg");
            diff_p.appendChild(diff_input);
            main_span.appendChild(diff_p);
        }
    }
    return main_span;
}

/**
 * 最大キー値取得処理(tb_submenu_map)
 */
 function getMaxSubmenuKey(){
    var max = 0;
    for(var m in tb_submenu_map){
        max = parseInt(tb_submenu_map[m]["nSubmenuCode"]);
    }
    return max+1;
}

/**
 * 最大キー値取得処理(tb_nggoodsgroup_map)
 */
 function getMaxNgGoodsKey(){
    var max = 0;
    for(var m in tb_nggoodsgroup_map){
        max = parseInt(tb_nggoodsgroup_map[m]["nNgGoodsGroupCode"]);
    }
    return max+1;
}

/**
 * 最大キー値取得処理(tb_basedishcombo_map)
 */
 function getMaxBasedishcomboKey(){
    var max = 0;
    for(var m in tb_basedishcombo_map){
        max = parseInt(tb_basedishcombo_map[m]["nBaseDishCode"]);
    }
    return max+1;
}

/**
 * 商品情報更新処理
 */
 function goodsExecuteQuery(){
    // 入力チェック
    // TTO表記商品名(日本語)
    var goodsGoodsNameJp = document.getElementById("goodsGoodsNameJp");
    if(contains(goodsGoodsNameJp.value,'"')){
        alert("対象項目:TTO表記商品名(日本語)\n入力チェックエラー："+'「"」は使用できません。再度入力ください。');
        return;
    }

    // TTO表記商品名(英語)
    var goodsGoodsNameEn = document.getElementById("goodsGoodsNameEn");
    if(contains(goodsGoodsNameEn.value,'"')){
        alert("対象項目:TTO表記商品名(英語)\n入力チェックエラー："+'「"」は使用できません。再度入力ください。');
        return;
    }

    // 商品表示位置調整
    // 表示位置_X軸
    var goodsPosX = document.getElementById("goodsPosX");
    if(contains(goodsPosX.value,"-") && goodsPosX.value[0] != "-"){
        //符号位置不正
        alert("対象項目:X軸(0で皿の中心)\n入力チェックエラー："+'正しい数値で再度入力ください。');
        return;
    }
    if(goodsPosX.value == "-"){
        //符号のみ
        alert("対象項目:X軸(0で皿の中心)\n入力チェックエラー："+'正しい数値で再度入力ください。');
        return;
    }
    if(goodsPosX.value == ""){
        goodsPosX.value = 0;
    }

    // 表示位置_Y軸
    var goodsPosY = document.getElementById("goodsPosY");
    if(contains(goodsPosY.value,"-") && goodsPosY.value[0] != "-"){
        //符号位置不正
        alert("対象項目:Y軸(0で皿の中心)\n入力チェックエラー："+'正しい数値で再度入力ください。');
        return;
    }
    if(goodsPosY.value == "-"){
        //符号のみ
        alert("対象項目:Y軸(0で皿の中心)\n入力チェックエラー："+'正しい数値で再度入力ください。');
        return;
    }
    if(goodsPosY.value == ""){
        goodsPosY.value = 0;
    }
    // 高さ比率
    var goodsHeight = document.getElementById("goodsHeight");
    if(goodsHeight.value > 100){
        alert("対象項目:高さ比率\n入力チェックエラー："+'1~100の数値で再度入力ください。');
        return;
    }
    if(goodsHeight.value == ""){
        goodsHeight.value = 0;
    }
    // 幅比率
    var goodsWidth = document.getElementById("goodsWidth");
    if(goodsWidth.value > 100){
        alert("対象項目:高さ比率\n入力チェックエラー："+'1~100の数値で再度入力ください。');
        return;
    }
    if(goodsWidth.value == ""){
        goodsWidth.value = 0;
    }

    // 塩分
    var goodsSalt = document.getElementById("goodsSalt");
    var saltSplit = goodsSalt.value.split('.');
    if(saltSplit.length == 2){
        // 小数値入力の場合
        if(saltSplit[1].length >= 2){
            alert("対象項目:塩分\n入力チェックエラー：小数点第一位までの数値で入力してください。");
            return;
        }
        if(saltSplit[0].length >= 3){
            alert("対象項目:塩分\n入力チェックエラー：整数値は2桁までで数値を入力してください。");
            return;
        }
        var fst = goodsSalt.value.slice(0,1);
        if(fst == "."){
            alert("対象項目:塩分\n入力チェックエラー：数値が不正です。正しい数値で入力し直してください。");
        }
    } else {
        if(goodsSalt.value.length >= 3){
            alert("対象項目:塩分\n入力チェックエラー：整数値は2桁までで数値を入力してください。");
            return;
        }
    }
    if(goodsSalt.value.length == 0){
        alert("対象項目:塩分\n入力チェックエラー：未入力です。使用しない場合は0を入力ください。");
        return;
    }
    // カロリー
    var goodsCal = document.getElementById("goodsCal");
    if(goodsCal.value.length >= 11){
        alert("対象項目:カロリー\n入力チェックエラー：整数値は11桁までで数値を入力してください。");
        return;
    }
    if(goodsCal.value.length == 0){
        alert("対象項目:カロリー\n入力チェックエラー：未入力です。使用しない場合は0を入力ください。");
        return;
    }
    // サブメニューポップアップ
    var submenuDetails = document.getElementById("submenuDetail").children;
    // タイトル
    for(var i=0;i < submenuDetails.length; i++){
        var titleJp = submenuDetails[i].getElementsByClassName("goodsSubmenuTitleJp")[0];
        if(contains(titleJp.value,'"')){
            alert("対象項目:サブメニューポップアップ"+(i+1)+"つ目-タイトル(日本語)\n入力チェックエラー："+'「"」は使用できません。再度入力ください。');
            return;
        }
        if(titleJp.value == "" || titleJp.value == "-"){
            alert("対象項目:サブメニューポップアップ"+(i+1)+"つ目-タイトル(日本語)\n入力チェックエラー：未入力です。");
            return;
        }

        var titleEn = submenuDetails[i].getElementsByClassName("goodsSubmenuTitleEn")[0];
        if(contains(titleEn.value,'"')){
            alert("対象項目:サブメニューポップアップ"+(i+1)+"つ目-タイトル(英語)\n入力チェックエラー："+'「"」は使用できません。再度入力ください。');
            return;
        }
        if(titleEn.value == "" || titleEn.value == "-"){
            alert("対象項目:サブメニューポップアップ"+(i+1)+"つ目-タイトル(英語)\n入力チェックエラー：未入力です。");
            return;
        }

        // 商品1
        var goodsMain1 = submenuDetails[i].getElementsByClassName("goodsMain1")[0];
        var goodsMain1_jpName = goodsMain1 != null ? goodsMain1.getElementsByClassName("goodsJpName")[0]:null;

        if(goodsMain1_jpName != null && contains(goodsMain1_jpName.value,'"')){
            alert("対象項目:サブメニューポップアップ"+(i+1)+"つ目-商品1-表示商品名(日本語)\n入力チェックエラー："+'「"」は使用できません。再度入力ください。');
            return;
        }
        if(goodsMain1_jpName != null && goodsMain1_jpName.value == ""){
            goodsMain1_jpName.value = "-";
        }

        var goodsMain1_enName = goodsMain1 != null ? goodsMain1.getElementsByClassName("goodsEnName")[0]:null;

        if(goodsMain1_enName != null && contains(goodsMain1_enName.value,'"')){
            alert("対象項目:サブメニューポップアップ"+(i+1)+"つ目-商品1-表示商品名(英語)\n入力チェックエラー："+'「"」は使用できません。再度入力ください。');
            return;
        }
        if(goodsMain1_enName != null && goodsMain1_enName.value == ""){
            goodsMain1_enName.value = "-";
        }

        // 商品2
        var goodsMain2 = submenuDetails[i].getElementsByClassName("goodsMain2")[0];
        var goodsMain2_jpName = goodsMain2 != null ? goodsMain2.getElementsByClassName("goodsJpName")[0]:null;

        if(goodsMain2_jpName != null && contains(goodsMain2_jpName.value,'"')){
            alert("対象項目:サブメニューポップアップ"+(i+1)+"つ目-商品2-表示商品名(日本語)\n入力チェックエラー："+'「"」は使用できません。再度入力ください。');
            return;
        }
        if(goodsMain2_jpName != null && goodsMain2_jpName.value == ""){
            goodsMain2_jpName.value = "-";
        }

        var goodsMain2_enName = goodsMain2 != null ? goodsMain2.getElementsByClassName("goodsEnName")[0]:null;

        if(goodsMain2_enName != null && contains(goodsMain2_enName.value,'"')){
            alert("対象項目:サブメニューポップアップ"+(i+1)+"つ目-商品2-表示商品名(英語)\n入力チェックエラー："+'「"」は使用できません。再度入力ください。');
            return;
        }
        if(goodsMain2_enName != null && goodsMain2_enName.value == ""){
            goodsMain2_enName.value = "-";
        }

        // 商品3
        var goodsMain3 = submenuDetails[i].getElementsByClassName("goodsMain3")[0];
        var goodsMain3_jpName = goodsMain3 != null ? goodsMain3.getElementsByClassName("goodsJpName")[0]:null;

        if(goodsMain3_jpName != null && contains(goodsMain3_jpName.value,'"')){
            alert("対象項目:サブメニューポップアップ"+(i+1)+"つ目-商品3-表示商品名(日本語)\n入力チェックエラー："+'「"」は使用できません。再度入力ください。');
            return;
        }
        if(goodsMain3_jpName != null && goodsMain3_jpName.value == ""){
            goodsMain3_jpName.value = "-";
        }

        var goodsMain3_enName = goodsMain3 != null ? goodsMain3.getElementsByClassName("goodsEnName")[0]:null;

        if(goodsMain3_enName != null && contains(goodsMain3_enName.value,'"')){
            alert("対象項目:サブメニューポップアップ"+(i+1)+"つ目-商品3-表示商品名(英語)\n入力チェックエラー："+'「"」は使用できません。再度入力ください。');
            return;
        }
        if(goodsMain3_enName != null && goodsMain3_enName.value == ""){
            goodsMain3_enName.value = "-";
        }

        // 商品コード
        if(submenuDetails[i].classList.contains("popType_1")){
            // 1:ベース商品選択ポップアップ
            // 商品の整合性
            if(goodsMain1 != null && goodsMain2 != null && goodsMain3 != null){
                var submenu_goodsList1 = goodsMain1.getElementsByClassName("submenu_goodsList")[0];
                var submenu_goodsList2 = goodsMain2.getElementsByClassName("submenu_goodsList")[0];
                var submenu_goodsList3 = goodsMain3.getElementsByClassName("submenu_goodsList")[0];
                if(submenu_goodsList1.value == submenu_goodsList2.value
                || submenu_goodsList1.value == submenu_goodsList3.value
                || submenu_goodsList2.value == submenu_goodsList3.value){
                    // 選択商品に被りがある場合
                    alert("対象項目:サブメニューポップアップ"+(i+1)+"つ目-商品1~3-商品コード\n入力チェックエラー："+'同じ商品が複数設定されています。再度商品を選択してください。');
                    return;
                }
            }
        } else if(submenuDetails[i].classList.contains("popType_2")){
            // 2:サブ商品選択ポップアップ(複数)
            // 商品の整合性
            if(goodsMain1 != null && goodsMain2 != null && goodsMain3 != null){
                var submenu_goodsList1 = goodsMain1.getElementsByClassName("submenu_goodsList")[0];
                var submenu_goodsList2 = goodsMain2.getElementsByClassName("submenu_goodsList")[0];
                var submenu_goodsList3 = goodsMain3.getElementsByClassName("submenu_goodsList")[0];
                if(submenu_goodsList1.value == submenu_goodsList2.value
                || submenu_goodsList1.value == submenu_goodsList3.value
                || submenu_goodsList2.value == submenu_goodsList3.value){
                    // 選択商品に被りがある場合
                    alert("対象項目:サブメニューポップアップ"+(i+1)+"つ目-商品1~3-商品コード\n入力チェックエラー："+'同じ商品が複数設定されています。再度商品を選択してください。');
                    return;
                }
            }
        } else if(submenuDetails[i].classList.contains("popType_3")){
            // 3:サブ商品選択ポップアップ(単一)
            // 商品の整合性
            if(goodsMain1 != null && goodsMain2 != null && goodsMain3 != null){
                var submenu_goodsList1 = goodsMain1.getElementsByClassName("submenu_goodsList")[0];
                var submenu_goodsList2 = goodsMain2.getElementsByClassName("submenu_goodsList")[0];
                var submenu_goodsList3 = goodsMain3.getElementsByClassName("submenu_goodsList")[0];
                var noneCnt = 0;
                submenu_goodsList1.value == 0 ? noneCnt++:noneCnt=noneCnt;
                submenu_goodsList2.value == 0 ? noneCnt++:noneCnt=noneCnt;
                submenu_goodsList3.value == 0 ? noneCnt++:noneCnt=noneCnt;
                if(noneCnt == 3){
                    // NG
                    alert("対象項目:サブメニューポップアップ"+(i+1)+"つ目-商品1~3-商品コード\n入力チェックエラー："+'商品が設定されていません。商品を選択してください。');
                    return;
                }
                if(noneCnt == 2 && submenu_goodsList1.value == submenu_goodsList2.value){
                    // NG
                    alert("対象項目:サブメニューポップアップ"+(i+1)+"つ目-商品1~3-商品コード\n入力チェックエラー："+'商品1,2両方を"なし"に設定することはできません。再度商品を選択してください。');
                    return;
                }
                if((submenu_goodsList1.value == submenu_goodsList2.value
                    || submenu_goodsList1.value == submenu_goodsList3.value
                    || submenu_goodsList2.value == submenu_goodsList3.value)
                    && noneCnt == 0){
                        // 選択商品に被りがある場合
                        alert("対象項目:サブメニューポップアップ"+(i+1)+"つ目-商品1~3-商品コード\n入力チェックエラー："+'同じ商品が複数設定されています。再度商品を選択してください。');
                        return;
                }

                // デフォルト選択位置
                var defaultPosition = submenuDetails[i].getElementsByClassName("defaultPosition")[0];
                if((submenu_goodsList1.value == 0 && defaultPosition.value != 1)){
                    // "なし"商品設定かつ、デフォルト選択に選択していない場合
                    alert("対象項目:サブメニューポップアップ"+(i+1)+"つ目-デフォルト選択位置\n入力チェックエラー："+'"なし"の選択肢を画面に表示する場合、デフォルト選択に指定する必要があります。デフォルト選択位置を変更してください');
                    return;
                }
                if((submenu_goodsList2.value == 0 && defaultPosition.value != 2)){
                    // "なし"商品設定かつ、デフォルト選択に選択していない場合
                    alert("対象項目:サブメニューポップアップ"+(i+1)+"つ目-デフォルト選択位置\n入力チェックエラー："+'"なし"の選択肢を画面に表示する場合、デフォルト選択に指定する必要があります。デフォルト選択位置を変更してください');
                    return;
                }
                if((submenu_goodsList3.value == 0 && defaultPosition.value == 3)){
                    // "未使用"商品設定かつ、デフォルト選択に選択していない場合
                    alert("対象項目:サブメニューポップアップ"+(i+1)+"つ目-デフォルト選択位置\n入力チェックエラー："+'"未使用"の選択肢がデフォルト選択に指定されています。デフォルト選択位置を変更してください');
                    return;
                }
            }
        } else if(submenuDetails[i].classList.contains("popType_4")){
            // 4:サブ数量選択ポップアップ
            var submenu_goodsList1 = goodsMain1.getElementsByClassName("submenu_goodsList")[0];
            if(submenu_goodsList1.value == 0){
                alert("対象項目:サブメニューポップアップ"+(i+1)+"つ目-商品1-商品コード\n入力チェックエラー："+'商品が設定されていません。商品を選択してください。');
                return;
            }
        } else if(submenuDetails[i].classList.contains("popType_6")){
            // 6:テキスト表示のみ
        }
    }
    // 入力チェック終了
    

    // 登録確認モーダル
    var result = window.confirm('変更データを登録します。よろしいですか？');
    if(!result){
        return;
    }

    // サブメニュー情報
    // インサートデータ生成
    var nGoodsCode = document.getElementById("goodsList").value;
    // 主キーの採番
    var pKey = getMaxSubmenuKey();
    var sendFormat = submenuSendFormat;
    var sendFormatAll = "";
    for(var i=0;i < submenuDetails.length; i++){
        var byType = submenuDetails[i].getAttribute("class").replace("popType_","");
        var cTitleMsg = submenuDetails[i].getElementsByClassName("goodsSubmenuTitleJp")[0];
        var cTitleMsgEn = submenuDetails[i].getElementsByClassName("goodsSubmenuTitleEn")[0];
        var goodsMain1 = submenuDetails[i].getElementsByClassName("goodsMain1")[0];
        var submenu_goodsList1 = goodsMain1 != null ? goodsMain1.getElementsByClassName("submenu_goodsList"):null;
        var nSubGoodsCode1 = submenu_goodsList1 != null ? submenu_goodsList1[0].value:"0";
        var goodsMain1_jpName = goodsMain1 != null ? goodsMain1.getElementsByClassName("goodsJpName")[0]:null;
        var cFreeName1 = goodsMain1_jpName != null ? goodsMain1_jpName.value:"-"; 
        var goodsMain1_enName = goodsMain1 != null ? goodsMain1.getElementsByClassName("goodsEnName")[0]:null;
        var cFreeName1En = goodsMain1_enName != null ? goodsMain1_enName.value:"-"; 
        var goodsMain2 = submenuDetails[i].getElementsByClassName("goodsMain2")[0];
        var submenu_goodsList2 = goodsMain2 != null ? goodsMain2.getElementsByClassName("submenu_goodsList"):null;
        var nSubGoodsCode2 = submenu_goodsList2 != null ? submenu_goodsList2[0].value:"0";
        var goodsMain2_jpName = goodsMain2 != null ? goodsMain2.getElementsByClassName("goodsJpName")[0]:null;
        var cFreeName2 = goodsMain2_jpName != null ? goodsMain2_jpName.value:"-";
        var goodsMain2_enName = goodsMain2 != null ? goodsMain2.getElementsByClassName("goodsEnName")[0]:null;
        var cFreeName2En = goodsMain2_enName != null ? goodsMain2_enName.value:"-"; 
        var goodsMain3 = submenuDetails[i].getElementsByClassName("goodsMain3")[0];
        var submenu_goodsList3 = goodsMain3 != null ? goodsMain3.getElementsByClassName("submenu_goodsList"):null;
        var nSubGoodsCode3 = submenu_goodsList3 != null ? submenu_goodsList3[0].value:"0";
        var goodsMain3_jpName = goodsMain3 != null ? goodsMain3.getElementsByClassName("goodsJpName")[0]:null;
        var cFreeName3 = goodsMain3_jpName != null ? goodsMain3_jpName.value:"-";
        var goodsMain3_enName = goodsMain3 != null ? goodsMain3.getElementsByClassName("goodsEnName")[0]:null;
        var cFreeName3En = goodsMain3_enName != null ? goodsMain3_enName.value:"-";
        var defaultPosition = submenuDetails[i].getElementsByClassName("defaultPosition")[0];
        var nDefaultPosition = defaultPosition != null ? defaultPosition.value:"0";
        var diffFlg = submenuDetails[i].getElementsByClassName("diffFlg");
        var byDifferenceDispFlg = diffFlg.length != 0 ? diffFlg[0].checked ? "1":"0":"0";
        var byGoodsNameDispType = cFreeName1 == "-" ? "0":"2";

        sendFormat = submenuSendFormat;
        sendFormat = sendFormat.replace("{nSubmenuCode}",'"'+pKey+'"')
                    .replace("{byActFlg}",'"'+'1'+'"')
                    .replace("{tStartDate}",'"'+'2020-01-01 00:00:00'+'"')
                    .replace("{tEndDate}",'"'+'9999-12-31 23:59:59'+'"')
                    .replace("{byType}",'"'+byType+'"')
                    .replace("{cTitleMsg}",'"'+cTitleMsg.value+'"')
                    .replace("{cTitleMsgEn}",'"'+cTitleMsgEn.value+'"')
                    .replace("{cTitleMsgKr}",'"'+'-'+'"')
                    .replace("{cTitleMsgCn}",'"'+'-'+'"')
                    .replace("{nGoodsCode}",'"'+nGoodsCode+'"')
                    .replace("{nSubGoodsCode1}",'"'+nSubGoodsCode1+'"')
                    .replace("{nSubGoodsCode2}",'"'+nSubGoodsCode2+'"')
                    .replace("{nSubGoodsCode3}",'"'+nSubGoodsCode3+'"')
                    .replace("{nSubGoodsCode4}",'"'+'0'+'"')
                    .replace("{nDefaultPosition}",'"'+nDefaultPosition+'"')
                    .replace("{byGoodsNameDispType}",'"'+byGoodsNameDispType+'"')
                    .replace("{cFreeName1}",'"'+cFreeName1+'"')
                    .replace("{cFreeName1En}",'"'+cFreeName1En+'"')
                    .replace("{cFreeName1Kr}",'"'+'-'+'"')
                    .replace("{cFreeName1Cn}",'"'+'-'+'"')
                    .replace("{cFreeName2}",'"'+cFreeName2+'"')
                    .replace("{cFreeName2En}",'"'+cFreeName2En+'"')
                    .replace("{cFreeName2Kr}",'"'+'-'+'"')
                    .replace("{cFreeName2Cn}",'"'+'-'+'"')
                    .replace("{cFreeName3}",'"'+cFreeName3+'"')
                    .replace("{cFreeName3En}",'"'+cFreeName3En+'"')
                    .replace("{cFreeName3Kr}",'"'+'-'+'"')
                    .replace("{cFreeName3Cn}",'"'+'-'+'"')
                    .replace("{cFreeName4}",'"'+'-'+'"')
                    .replace("{cFreeName4En}",'"'+'-'+'"')
                    .replace("{cFreeName4Kr}",'"'+'-'+'"')
                    .replace("{cFreeName4Cn}",'"'+'-'+'"')
                    .replace("{byDifferenceDispFlg}",'"'+byDifferenceDispFlg+'"')
                    .replace("{tCreateTime}","now()")
                    .replace("{tUpdateTime}","now()")
                    .replace("{cCreateId}",'"maintenanceGUI"')
                    .replace("{cUpdateId}",'"maintenanceGUI"');
        sendFormatAll += sendFormat;
        sendFormatAll += ",";
        pKey++;
    }
    sendFormatAll += "queryend";
    sendFormatAll = sendFormatAll.replace(",queryend","").replace("queryend","");
    var submenuQuery = sendFormatAll;

    // メニューブックアイテムマスタ
    var sendFormat = menubookitemsFormat;
        var sendFormatAll = "";
    var menubooks = document.getElementById("goods_menubook_on").children;
    for(var i=0;i < menubooks.length;i++){
        sendFormat = sendFormat.replace("{nMenuBookCode}",'"'+menubooks[i].value+'"')
                                .replace("{nGoodsCode}",'"'+nGoodsCode+'"')
                                .replace("{tStartValidDate}","now()")
                                .replace("{tEndValidDate}","now()")
                                .replace("{tCreateTime}","now()")
                                .replace("{tUpdateTime}","now()")
                                .replace("{cCreateId}",'"maintenanceGUI"')
                                .replace("{cUpdateId}",'"maintenanceGUI"');
        sendFormatAll += sendFormat;
        sendFormatAll += ",";
    }
    sendFormatAll += "queryend";
    sendFormatAll = sendFormatAll.replace(",queryend","").replace("queryend","");
    var menubookitemQuery = sendFormatAll;


    // 組み合わせ不可商品マスタ
    var pKey = getMaxNgGoodsKey();
    var sendFormat = negoodsgroupFormat;
    var sendFormatAll = "";
    var nggoods = document.getElementById("goods_NgGoodsGroup_on").children;
    for(var i=0;i < nggoods.length;i++){
        sendFormat = negoodsgroupFormat;
        sendFormat = sendFormat.replace("{nNgGoodsGroupCode}",'"'+pKey+'"')
                                .replace("{nGoodsCode}",'"'+nGoodsCode+'"')
                                .replace("{cGoodsName}",'"'+tb_8m_map[nGoodsCode]["cGoodsName"]+'"')
                                .replace("{nNgGoodsCode}",'"'+nggoods[i].value+'"')
                                .replace("{cNgGoodsName}",'"'+tb_8m_map[nggoods[i].value]["cGoodsName"]+'"')
                                .replace("{tCreateTime}","now()")
                                .replace("{tUpdateTime}","now()")
                                .replace("{cCreateId}",'"maintenanceGUI"')
                                .replace("{cUpdateId}",'"maintenanceGUI"');
        sendFormatAll += sendFormat;
        sendFormatAll += ",";
        pKey++;
        sendFormat = negoodsgroupFormat;
        sendFormat = sendFormat.replace("{nNgGoodsGroupCode}",'"'+pKey+'"')
                                .replace("{nGoodsCode}",'"'+nggoods[i].value+'"')
                                .replace("{cGoodsName}",'"'+tb_8m_map[nggoods[i].value]["cGoodsName"]+'"')
                                .replace("{nNgGoodsCode}",'"'+nGoodsCode+'"')
                                .replace("{cNgGoodsName}",'"'+tb_8m_map[nGoodsCode]["cGoodsName"]+'"')
                                .replace("{tCreateTime}","now()")
                                .replace("{tUpdateTime}","now()")
                                .replace("{cCreateId}",'"maintenanceGUI"')
                                .replace("{cUpdateId}",'"maintenanceGUI"');
        sendFormatAll += sendFormat;
        sendFormatAll += ",";
        pKey++;
    }
    sendFormatAll += "queryend";
    sendFormatAll = sendFormatAll.replace(",queryend","").replace("queryend","");
    var nggoodsQuery = sendFormatAll;

    // 商品詳細マスタ
    var sendFormat = goodsDetailFormat;
    var cGoodsName = document.getElementById("goodsGoodsNameJp").value;
    var cGoodsNameEn = document.getElementById("goodsGoodsNameEn").value;
    var nCal = document.getElementById("goodsCal").value;
    var nSalt = document.getElementById("goodsSalt").value;
    var byMenuType = document.getElementById("goods_menuType").value;
    var nGoodsType = document.getElementById("goodsGoodsType").value;
    var byAlcohol = document.getElementById("goodsAlcohol").checked ? "1":"2";
    var bySelectCntFlg = document.getElementById("goodsCntPop").checked ? "1":"0";
    var nDispPositionX = document.getElementById("goodsPosX").value;
    var nDispPositionY = document.getElementById("goodsPosY").value;
    var nHeightRate = document.getElementById("goodsHeight").value;
    var nWidthRate = document.getElementById("goodsWidth").value;
    var nZline = document.getElementById("goodsTopDisp").value;
    var wSelectEnableCount = document.getElementById("goodsMaxCnt").value;
    var nDetailIndex = document.getElementById("goodsIndex").value;
    var allergyOnList = document.getElementById("goods_allergy_on");
    for(var i=1;i <= 30; i++){
        var alFlg = false;
        for(var op in allergyOnList.options){
            if(allergyOnList.options[op].value == i){
                alFlg = true;
                break;
            }
        }
        sendFormat = sendFormat.replace("{byAllergie"+i+"}",'"'+(alFlg ? "1":"0")+'"');
    }
    var byAllergyDetailDispFlg = document.getElementById("goodsallergyFlg").checked ? (byMenuType != "1" ? "1":"0"):"0";
    sendFormat = sendFormat.replace("{nGoodsCode}",'"'+nGoodsCode+'"')
                            .replace("{cGoodsName}",'"'+cGoodsName+'"')
                            .replace("{cGoodsNameEn}",'"'+cGoodsNameEn+'"')
                            .replace("{nCal}",'"'+nCal+'"')
                            .replace("{nSalt}",'"'+nSalt+'"')
                            .replace("{byMenuType}",'"'+byMenuType+'"')
                            .replace("{nGoodsType}",'"'+nGoodsType+'"')
                            .replace("{byAlcohol}",'"'+byAlcohol+'"')
                            .replace("{bySelectCntFlg}",'"'+bySelectCntFlg+'"')
                            .replace("{nDispPositionX}",'"'+nDispPositionX+'"')
                            .replace("{nDispPositionY}",'"'+nDispPositionY+'"')
                            .replace("{nHeightRate}",'"'+nHeightRate+'"')
                            .replace("{nWidthRate}",'"'+nWidthRate+'"')
                            .replace("{nZline}",'"'+nZline+'"')
                            .replace("{wSelectEnableCount}",'"'+wSelectEnableCount+'"')
                            .replace("{nDetailIndex}",'"'+nDetailIndex+'"')
                            .replace("{byAllergyDetailDispFlg}",'"'+byAllergyDetailDispFlg+'"')
                            .replace("{tCreateTime}","now()")
                            .replace("{tUpdateTime}","now()")
                            .replace("{cCreateId}",'"maintenanceGUI"')
                            .replace("{cUpdateId}",'"maintenanceGUI"');
    var goodsDetailQuery = sendFormat;


    // 商品拡張マスタ
    var sendFormat = goods40mFormat;
    var byTakeoutDefaultType = document.getElementById("goodsTakeout").checked ? "2":"1";
    sendFormat = sendFormat.replace("{nGoodsCode}",'"'+nGoodsCode+'"')
                            .replace("{byTakeoutDefaultType}",'"'+byTakeoutDefaultType+'"')
                            .replace("{tCreateTime}","now()")
                            .replace("{tUpdateTime}","now()")
                            .replace("{cCreateId}",'"maintenanceGUI"')
                            .replace("{cUpdateId}",'"maintenanceGUI"');
    var goods40mQuery = sendFormat;

    // 基本形ディッシュ組合せマスタ
    var sendFormat = basedishcomboFormat;
    // 既存データの更新の場合、元キー値特定
    var basedishcomboKey = getMaxBasedishcomboKey();
    for(var roop in tb_basedishcombo_map){
        if(tb_basedishcombo_map[roop]["nGoodsCode"] == nGoodsCode){
            basedishcomboKey = tb_basedishcombo_map[roop]["nBaseDishCode"];
        }
    }
    var nCngSourceGoodsCode1 = document.getElementById("cgn_sc1_cd_ordmade").value == "" ? null:'"'+document.getElementById("cgn_sc1_cd_ordmade").value+'"';
    var nCngSourceGoodsCode2 = document.getElementById("cgn_sc2_cd_ordmade").value == "" ? null:'"'+document.getElementById("cgn_sc2_cd_ordmade").value+'"';
    var nCngSourceGoodsCode3 = document.getElementById("cgn_sc3_cd_ordmade").value == "" ? null:'"'+document.getElementById("cgn_sc3_cd_ordmade").value+'"';
    var nHamburgGoodsCode = document.getElementById("hb_cd_ordmade").value == "" ? null:'"'+document.getElementById("hb_cd_ordmade").value+'"';
    var nToppingGoodsCode = document.getElementById("tp_cd_ordmade").value == "" ? null:'"'+document.getElementById("tp_cd_ordmade").value+'"';
    var nSourceGoodsCode = document.getElementById("sc_cd_ordmade").value == "" ? null:'"'+document.getElementById("sc_cd_ordmade").value+'"';
    var nRiceGoodsCode = document.getElementById("rp_cd_ordmade").value == "" ? null:'"'+document.getElementById("rp_cd_ordmade").value+'"';
    var nSaladGoodsCode = document.getElementById("sr_cd_ordmade").value == "" ? null:'"'+document.getElementById("sr_cd_ordmade").value+'"';
    var cBaseDishImage = "";
    if(basedishcomboKey == "1" || basedishcomboKey == "2"|| basedishcomboKey == "3"|| basedishcomboKey == "4"|| basedishcomboKey == "5"|| basedishcomboKey == "6"){
        // 全般設定画面で設定されているカスタムディッシュ商品の場合
        // 元データをそのままインサート
        cBaseDishImage = "ordermade_btn"+basedishcomboKey+".png";
    }
    sendFormat = sendFormat.replace("{nBaseDishCode}",'"'+basedishcomboKey+'"')
                            .replace("{nGoodsCode}",'"'+nGoodsCode+'"')
                            .replace("{nCngSourceGoodsCode1}",nCngSourceGoodsCode1)
                            .replace("{nCngSourceGoodsCode2}",nCngSourceGoodsCode2)
                            .replace("{nCngSourceGoodsCode3}",nCngSourceGoodsCode3)
                            .replace("{cBaseDishName}",'"'+cGoodsName+'"')
                            .replace("{cDispName}",'"'+""+'"')
                            .replace("{cBaseDishImage}",'"'+cBaseDishImage+'"')
                            .replace("{nHamburgGoodsCode}",nHamburgGoodsCode)
                            .replace("{nToppingGoodsCode}",nToppingGoodsCode)
                            .replace("{nSourceGoodsCode}",nSourceGoodsCode)
                            .replace("{nRiceGoodsCode}",nRiceGoodsCode)
                            .replace("{nSaladGoodsCode}",nSaladGoodsCode)
                            .replace("{tStartValidDate}","cast('2019-12-01 00:00:00' as datetime)")
                            .replace("{tEndValidDate}","cast('2050-01-21 12:00:00' as datetime)")
                            .replace("{tCreateTime}","now()")
                            .replace("{tUpdateTime}","now()")
                            .replace("{cCreateId}",'"maintenanceGUI"')
                            .replace("{cUpdateId}",'"maintenanceGUI"');
    var goodsdishcomboQuery = sendFormat;
    if(!document.getElementById("goods_ordmade_flg").checked){
        // カスタムディッシュ化設定が無効な場合、空データを渡す
        // ※メモ：空データの場合、対象商品レコード行の削除のみをphp側で実行
        goodsdishcomboQuery = "";
    }

    // 画像反映・DB登録処理
    goodsTabImgFileExecute(nGoodsCode,submenuQuery,menubookitemQuery,nggoodsQuery,goodsDetailQuery,goods40mQuery,goodsdishcomboQuery);
    // setGoodsTables(nGoodsCode,submenuQuery,menubookitemQuery,nggoodsQuery,goodsDetailQuery,goods40mQuery);
}

/**
 * 取得時点のデータに戻す
 */
function goodsMapReset(){
    // 商品マスタ
    tb_8m_map = jQuery.extend(true, {}, bk_tb_8m_map);

    // 商品詳細マスタ
    tb_detail_map = jQuery.extend(true, {}, bk_tb_detail_map);

    // 拡張商品マスタ
    tb_40m_map = jQuery.extend(true, {}, bk_tb_40m_map);

    // メニューブックアイテムマスタ
    tb_menubookitem_map = jQuery.extend(true, {}, bk_tb_menubookitem_map);

    // サブメニュー設定情報マスタ
    tb_submenu_map = jQuery.extend(true, {}, bk_tb_submenu_map);

    // 組み合わせ不可商品マスタ
    tb_nggoodsgroup_map = jQuery.extend(true, {}, bk_tb_nggoodsgroup_map);

    // 基本形ディッシュ組合せマスタ
    tb_basedishcombo_map = jQuery.extend(true, {}, bk_tb_basedishcombo_map);
}

/**
 * 画像ファイル反映処理
 */
 function goodsTabImgFileExecute(nGoodsCode,submenuQuery,menubookitemQuery,nggoodsQuery,goodsDetailQuery,goods40mQuery,goodsdishcomboQuery) {
    console.log("商品設定-画像ファイル反映処理開始");
    document.getElementById('loading').removeAttribute("hidden");
    // 画像情報配列
    var imgList = {};

    // 全画像データタグ
    var images = document.getElementsByClassName("goods_tab_img");
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
        console.log("商品設定-画像ファイル反映処理完了(対象なし)");
        setGoodsTables(nGoodsCode,submenuQuery,menubookitemQuery,nggoodsQuery,goodsDetailQuery,goods40mQuery,goodsdishcomboQuery);
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
            console.log("商品設定-画像ファイル反映処理失敗、リトライ");
            alert("商品設定-画像ファイル反映処理がタイムアウトしました。");
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
                    console.log("商品設定-画像ファイル反映処理失敗-容量オーバー");
                    alert("画像の総容量が25MBを超えているため、画像の反映をスキップしました。");
                    document.getElementById('loading').setAttribute("hidden","hidden");
                    return false;
                }else if(response_json != true && !(timeoutFlg)){
                    timeoutFlg = true;
                    // リトライ処理
                    console.log("商品設定-画像ファイル反映処理失敗");
                    alert("商品設定-画像ファイル反映処理に失敗しました。");
                    document.getElementById('loading').setAttribute("hidden","hidden");
                    return false;
                }
            }
        })
    ).done(function() {
        if(response_json == true && !(timeoutFlg)){
            timeoutFlg = true;
            // 次の処理実行
            console.log("商品設定-画像ファイル反映処理完了");
            setGoodsTables(nGoodsCode,submenuQuery,menubookitemQuery,nggoodsQuery,goodsDetailQuery,goods40mQuery,goodsdishcomboQuery);
        }else{
            timeoutFlg = true;
        }
    })
}

/**
 * 商品画像削除チェックボックス処理
 * @param タグ
 */
function delCheckBoxGoods(elm){
    if(elm.checked){
        document.getElementById(elm.id.replace("_del","")).setAttribute("del",1);
    }else{
        document.getElementById(elm.id.replace("_del","")).setAttribute("del",0);
    }
}

/**
 * オーダーメイドディッシュ商品の表示調整プレビュー反映処理
 */
 function ordmadeImgPrev() {
    // 配列に最新情報取込
    var sendMap = {};
    // 表示位置_X軸
    var goodsPosX = document.getElementById("goodsPosX");
    sendMap["nDispPositionX"] = goodsPosX.value;
    // 表示位置_Y軸
    var goodsPosY = document.getElementById("goodsPosY");
    sendMap["nDispPositionY"] = goodsPosY.value;
    // 高さ比率
    var goodsHeight = document.getElementById("goodsHeight");
    sendMap["nHeightRate"] = goodsHeight.value;
    // 幅比率
    var goodsWidth = document.getElementById("goodsWidth");
    sendMap["nWidthRate"] = goodsWidth.value;
    // 表示順序
    var goodsTopDisp = document.getElementById("goodsTopDisp");
    sendMap["nZline"] = goodsTopDisp.value;

    sendMap["nGoodsCode"] = document.getElementById("goodsList").value;

    var guiPrevPost = function(map){
        var info = {
            'message_id': 'gui_ordermade_img_prev',
            'message_body': map
        };
        postParent(info);
    }
    // エンタメに配列を連携
    guiPrevPost(sendMap);
}

/**
 * オーダーメイドディッシュ化ONOFF
 */
function goodsOrdMadeOnOff(elm){
    var goods_ordmade = document.getElementById("goods_ordmade");
    goods_ordmade.hidden = !elm.checked;
}