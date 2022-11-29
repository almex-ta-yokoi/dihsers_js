var create_dish_map;    // 完成後のカスタムオーダー用map
var create_order_map = {};   // 一時格納用map
var bf_order_map = {};  // 確定前オーダー用map
var af_order_map = {};  // 確定後オーダー用map
var ordCnt = 0;
var ordCrtTtlPrice = 0;  // 注文カート内の合計金額
var ordPostFlg = false; // 確定ボタン押下処理中フラグ
var singleFlg = false;  // 非同期処理連続タップ制御フラグ
var ordQuantity = 0;    // 注文カゴ内の合計数量

/**
 * 注文カート表示タグ生成処理
 * 　注文選択により動的にタグを新規作成する
 * @param 1:注文確認、2:注文履歴
 * @param 未清算伝票問い合わせ result
 * 　name： 商品名
 * 　itemid： 商品コード
 */
function createTag(type,postResult) {
    if(type == 1){
        outOparationLog("注文確定&注文履歴画面"+(sideOpeFlg ? "-フッター操作":"")+"-画面生成開始,対象:注文確定");
    } else if(type == 2){
        outOparationLog("注文確定&注文履歴画面"+(sideOpeFlg ? "-フッター操作":"")+"-画面生成開始,対象:注文履歴");
    }
    sideOpeFlg = false;

    // タグを追加する親要素を取得
    var target = document.getElementById('cart_list');

    // 一覧の状態をクリア
    target.textContent = null;

    // 区分に合わせて画面表示を変更
    var ord_fix = document.getElementById('ord_fix');
    var anotherOrderBtn = document.getElementById('anotherOrderBtn');
    var accountEndBtn = document.getElementById('accountEndBtn');
    var accountReturnBtn = document.getElementById('accountReturnBtn');
    var confText = document.getElementById('confText');
    var caution = document.getElementById('caution_text');
    // ord_fix.setAttribute('style', 'display:none;');
    ord_fix.style.display = 'none';
    anotherOrderBtn.setAttribute('style', 'display:none;');
    accountEndBtn.setAttribute('style', 'display:none;');
    accountReturnBtn.setAttribute('style', 'display:none;');
    confText.setAttribute('hidden', 'hidden');
    caution.setAttribute('hidden', 'hidden');

    var singlePriceTag = document.getElementById('singlePriceTag');
    var accoutDelTag = document.getElementById('accoutDelTag');
    singlePriceTag.setAttribute('hidden','hidden');
    accoutDelTag.setAttribute('hidden','hidden');

    if(type == 1){
        document.getElementById('accountTopTitle').textContent = MSG_CART_1;
        //ord_fix.setAttribute('style', 'display:block;');
        ord_fix.style.display = 'block';
        anotherOrderBtn.setAttribute('style', 'display:block;');
        accoutDelTag.removeAttribute('hidden');
        confText.removeAttribute('hidden');
        document.getElementById('cart_price_text').textContent = MSG_CART_3;
        document.getElementById('cart_price_text').setAttribute('style', 'padding-top: 80px;');
        caution.removeAttribute('hidden');
        document.getElementById('cart_yen').textContent = MSG_COMMON_15;
    }else if(type == 2){
        document.getElementById('accountTopTitle').textContent = MSG_CART_14;
        accountReturnBtn.setAttribute('style', 'display:block;');
        singlePriceTag.removeAttribute('hidden');
        document.getElementById('cart_price_text').textContent = MSG_CART_15;
        document.getElementById('cart_price_text').setAttribute('style', 'padding-top: 0px;');
        document.getElementById('cart_yen').innerHTML = MSG_CART_4;
    }

    // 注文カート内の合計金額をクリア
    ordCrtTtlPrice = 0;

    // 1：注文確認画面、2：注文履歴画面
    if(type == 1){
        // 全注文のデータ
        for(var ordCnt in bf_order_map) {
            // 小計金額をクリア
            var totalPrice = 0;

            // タグを作成
            var newRow = document.createElement('tr');
            var newTd1 = document.createElement('td');
            var newTd2 = document.createElement('td');
            var newTd3 = document.createElement('td');
            var newTd4 = document.createElement('td');
            var newName = document.createElement('p');          // 商品名
            var newCost = document.createElement('span');       // 小計
            var newQuantity = document.createElement('span');   // 数量
            var newBtnUp = document.createElement('input');     // ＋ボタン
            var newBtnDwn = document.createElement('input');    // －ボタン
            var newBtnDel = document.createElement('div');      // 削除ボタン
            var newUl = document.createElement('ul');
            // 作成したタグの中身を作成
            newRow.setAttribute('id', 'ord' + ordCnt);
            newRow.setAttribute('itemid', bf_order_map[ordCnt]['nGoodsCode']);
            var cGoodsName = bf_order_map[ordCnt]['goodsData']['cGoodsName'];
            var loopFlg = true;
            while(loopFlg){
                if(contains(cGoodsName,'<br />')){
                    cGoodsName = cGoodsName.replace('<br />',' ');
                }else{
                    loopFlg = false;
                }
            }
            newName.innerHTML = cGoodsName;
            newName.setAttribute('class', 'c-cartList__infoTtl c-menu2List__infoTtl');
            newUl.setAttribute('class', 'c-cartList__infoList c-menu2List__infoList');
            newQuantity.setAttribute('class', 'selOrdNum tNum');
            newQuantity.setAttribute('id', 'ord' + ordCnt + 'num');
            newBtnUp.setAttribute('class', 'selOrdBtnUpDwn');
            newBtnUp.setAttribute('type', 'button');
            newBtnUp.setAttribute('value', '＋');
            newBtnUp.setAttribute('name', 'ord' + ordCnt + 'up');
            newBtnUp.setAttribute('onClick', 'touch(); cntUpDwn(this)');
            newBtnUp.setAttribute('id', 'ord' + ordCnt + 'up');
            newBtnDwn.setAttribute('class', 'selOrdBtnUpDwn');
            newBtnDwn.setAttribute('type', 'button');
            newBtnDwn.setAttribute('value', '－');
            newBtnDwn.setAttribute('name', 'ord' + ordCnt + 'dwn');
            newBtnDwn.setAttribute('onClick', 'touch(); cntUpDwn(this);');
            newBtnDwn.setAttribute('id', 'ord' + ordCnt + 'dwn');
            newCost.setAttribute('class', 'selOrdPrice');
            newCost.setAttribute('id', 'ord' + ordCnt + 'price');
            newBtnDel.setAttribute('class', 'c-cartList__btns');
            newBtnDel.setAttribute('itemid', 'ord' + ordCnt);
            newBtnDel.setAttribute('onClick', 'touch(); delOrd(this);');
            var img_span = document.createElement('span');
            img_span.classList.add('ord_cart_delBtn');
            if(MSG_CSS_LANG == 'en'){
                img_span.style.fontSize = '70%';
            }else{
                img_span.style.fontSize = '90%';
            }
            img_span.textContent = MSG_CART_18;
            newBtnDel.appendChild(img_span);

            newTd1.setAttribute('class', 'c-cartList__info');
            newTd2.setAttribute('class', 'c-cartList__nums');
            newTd3.setAttribute('class', 'c-cartList__price c-menu2List__price');

            var singlePrice = 0;
            var totalPrice = 0;
            if (bf_order_map[ordCnt]['orderMadeFlg'] === '0') {
                // オーダーディッシュ以外
                totalPrice = bf_order_map[ordCnt]['goodsData']['nUnitCost'] * bf_order_map[ordCnt]['quantity'];
                singlePrice = bf_order_map[ordCnt]['goodsData']['nUnitCost'];
            } else if (bf_order_map[ordCnt]['orderMadeFlg'] === '3') {
                // テイクアウトディッシュの場合
                // ベースの金額
                singlePrice = all_m_goods_map[bf_order_map[ordCnt]['ordBaseCode']]['nUnitCost'];
                if(bf_order_map[ordCnt]['addHbCnt'] != '0'){
                    // 追加パティの金額
                    singlePrice = parseInt(singlePrice)+parseInt(all_m_goods_map[bf_order_map[ordCnt]['addHbCd']]['nUnitCost']) * parseInt(bf_order_map[ordCnt]['addHbCnt']);
                }
                // ライスの金額
                if(bf_order_map[ordCnt]['selectRiceCd'] != null){
                    singlePrice = parseInt(singlePrice)+parseInt(all_m_goods_map[bf_order_map[ordCnt]['selectRiceCd']]['nUnitCost']);
                }
                // 数量合計金額
                totalPrice =  singlePrice * bf_order_map[ordCnt]['quantity'];

                // 各商品の表示名もついでに作り込み
                var newLi = document.createElement('li');
                if(bf_order_map[ordCnt]['addHbCnt'] == 1){
                    newLi.innerHTML = all_m_goods_map[bf_order_map[ordCnt]['addHbCd']]['cGoodsName'];
                    newUl.appendChild(newLi);
                }else if(bf_order_map[ordCnt]['addHbCnt'] > 1){
                    newLi.innerHTML = all_m_goods_map[bf_order_map[ordCnt]['addHbCd']]['cGoodsName'] + ' x '+'<span class="tNum">'+bf_order_map[ordCnt]['addHbCnt']+'</span>';
                    newUl.appendChild(newLi);
                }
                if(bf_order_map[ordCnt]['selectRiceCd'] != null){
                    var newLi2 = document.createElement('li');
                    newLi2.innerHTML = all_m_goods_map[bf_order_map[ordCnt]['selectRiceCd']]['cGoodsName'];
                    newUl.appendChild(newLi2);
                }

            } else {
                // オーダーディッシュ
                // ベースの金額を加算
                totalPrice = totalPrice +parseInt(all_m_goods_map[bf_order_map[ordCnt]["ordBaseCode"]]["nUnitCost"]);
                for (var odish in bf_order_map[ordCnt]) {
                    if (odish === 'hb' || odish === 'tp' || odish === 'sc' || odish === 'rp' || odish === 'sr') {
                        // 各商品の金額×数量を合算
                        var goodsType = bf_order_map[ordCnt][odish];
                        for (var gt in goodsType) {
                            totalPrice = totalPrice + (goodsType[gt]['nUnitCost'] * goodsType[gt]['quantity']);
                            // 各商品の表示名もついでに作り込み
                            var newLi = document.createElement('li');
                            var cGoodsName = goodsType[gt]['cGoodsName'];
                                var loopFlg = true;
                                while(loopFlg){
                                    if(contains(cGoodsName,'<br />')){
                                        cGoodsName = cGoodsName.replace('<br />',' ');
                                    }else{
                                        loopFlg = false;
                                    }
                                }
                            if (goodsType[gt]['quantity'] === 1) {
                                newLi.innerHTML = cGoodsName;
                            } else {
                                newLi.innerHTML = cGoodsName + ' x '+'<span class="tNum">' + goodsType[gt]['quantity']+'</span>';
                            }
                            // 詳細リストに追加
                            newUl.appendChild(newLi);
                        }
                    }
                }
                singlePrice = totalPrice;
                totalPrice =  totalPrice * bf_order_map[ordCnt]['quantity'];
            }
            // newCost.innerHTML = '<span class="tNum">'+totalPrice.toLocaleString()+'</span>' + MSG_CART_13;
            newCost.textContent = totalPrice.toLocaleString() + MSG_CART_13;
            newQuantity.textContent = bf_order_map[ordCnt]['quantity'];

            // 注文履歴専用項目の生成
            var newTd99 = document.createElement('td');
            newTd99.setAttribute('class', 'c-cartList__nums');
            newTd99.textContent = parseInt(singlePrice).toLocaleString() + MSG_CART_13;

            // 作成したタグを一つのtrタグに集約
            // 名前
            newTd1.appendChild(newName);
            if (bf_order_map[ordCnt]['orderMadeFlg'] === '1' || bf_order_map[ordCnt]['orderMadeFlg'] === '3') {
                newTd1.appendChild(newUl);
            }
            newRow.appendChild(newTd1);

            // 数量
            newTd2.setAttribute('style','text-align:center;');

                // 選択数量の上限チェック
            if (bf_order_map[ordCnt]['quantity'] > person) {
            // if (bf_order_map[ordCnt]['goodsData']['byTakeoutDefaultType'] != '2' && bf_order_map[ordCnt]['quantity'] > person) {
                        // イートインメニューかつ、選択数量が上限値よりも大きい場合、文字色を赤、背景色を黄色にする
                    newQuantity.setAttribute('style', 'border: solid 1px gray; color:#f54d37; background-color:yellow;');
                } else {
                    // テイクアウトメニューかつ、選択数量が上限値以下の場合、文字色を黒、背景色を白にする
                    newQuantity.setAttribute('style', 'border: solid 1px gray; color:#444; background-color:white;');
                }

            newTd2.appendChild(newQuantity);

            if (bf_order_map[ordCnt]['quantity'] == 1) {
                    // 数量1の場合、－ボタンを非活性
                    newBtnDwn.setAttribute('style', 'background-color:#dcdcdc; pointer-events: none;');
                    // 数量0の場合、対象行のテキストを赤文字にする
                    // newRow.setAttribute('style', 'color:#f54d37;');
                } else if (bf_order_map[ordCnt]['quantity'] >= person) {
            // } else if (bf_order_map[ordCnt]['goodsData']['byTakeoutDefaultType'] != '2' && bf_order_map[ordCnt]['quantity'] >= person) {
                    // イートインメニューかつ、選択数量が卓人数以上の場合、＋ボタンを非活性
                    newBtnUp.setAttribute('style', 'background-color:#dcdcdc; pointer-events: none;');
                }
                newTd2.appendChild(newBtnDwn);
                newTd2.appendChild(newBtnUp);
            newRow.appendChild(newTd2);

            // 小計
            newTd3.setAttribute('style','text-align:right; padding-right:10px;');
            if(MSG_CSS_LANG == 'en'){
                newCost.style.fontSize = '23px';
            }else{
                newCost.style.fontSize = '26px';
            }
            newTd3.appendChild(newCost);
            newRow.appendChild(newTd3);

                // 削除
                newTd4.appendChild(newBtnDel);
                newRow.appendChild(newTd4);
            newRow.setAttribute('byTakeoutDefaultType',selectTax(bf_order_map[ordCnt]['goodsData']['byTakeoutDefaultType']));

            // 指定の要素にタグを子要素として追加
            target.appendChild(newRow);

            // 注文カートの合計金額に加算
            ordCrtTtlPrice = BigNumber(ordCrtTtlPrice).plus(BigNumber(totalPrice).times(selectTax(bf_order_map[ordCnt]['goodsData']['byTakeoutDefaultType'])));
        }
    }else if(type == 2){
        // 全注文のデータ
        var result_map = [];
        var duplication_flg = false;
        var orderMade_flg = false;

        if (postResult["charge"] != 0) {
            // 未清算伝票の取得結果を内部処理用のmapに格納する
            for (i=0; i<postResult["item_list"].length; i++) {
                var result = postResult["item_list"][i];
                var tmp_map = {};

                // オーダーメイドフラグをリセット
                orderMade_flg = false;

                // オーダーメイド判定
                for (var id in tmp_m_basedishcombo_map) {
                    for (var id2 in tmp_m_basedishcombo_map[id]) {
                        if (result["item_id"] == tmp_m_basedishcombo_map[id][id2]["nGoodsCode"]) {
                            orderMade_flg = true;
                            break;
                        }
                    }
                }
                // サブメニューあり商品も、オーダーメイドディッシュと同じ動作をさせる
                var subMenu_flg = false;
                for(sb in submenuData_map){
                    if(submenuData_map[sb]["cValue6"] == result["item_id"]
                    && (submenuData_map[sb]["cValue1"] == "2-1" || submenuData_map[sb]["cValue1"] == "2-2")){
                        orderMade_flg = true;
                        subMenu_flg = true;
                        break;
                    }
                }
                if (orderMade_flg) {
                    // オーダーメイドディッシュ
                    var result_sub = result["sub_list"];
                    // サブアイテム用のマップを作成
                    var goodsCd = "";
                    // var type_id = {};
                    var tmp_hb = {};
                    var tmp_tp = {};
                    var tmp_rp = {};
                    var tmp_sr = {};
                    var tmp_sc = {};

                    // ベース商品コードを連結に追加
                    goodsCd += '_' + result["item_id"];

                    for (var sub in result_sub) {
                        var sub_items = result_sub[sub]["sub_item"];
                        var type_info = {};
                        type_info["cGoodsName"] = all_m_goods_map[sub_items["item_id"]]["cGoodsName"];
                        type_info["nUnitCost"] = sub_items["item_value"];
                        type_info["quantity"] = sub_items["item_count"];

                        // 商品区分毎に一時mapに格納
                        switch (all_m_goods_map[sub_items["item_id"]]["nGoodsType"]) {
                            case '1':
                                // ハンバーグ
                                tmp_hb[sub_items["item_id"]] = type_info;
                                break;
                            case '2':
                                // トッピング
                                tmp_tp[sub_items["item_id"]] = type_info;
                                break;
                            case '3':
                                // ライス・パスタ
                                tmp_rp[sub_items["item_id"]] = type_info;
                                break;
                            case '4':
                                // サラダ
                                tmp_sr[sub_items["item_id"]] = type_info;
                                break;
                            case '5':
                                // ソース
                                tmp_sc[sub_items["item_id"]] = type_info;
                                break;
                        }
                        // サブメニューあり商品の場合、トッピング配列に詰める
                        if(subMenu_flg){
                            tmp_tp[sub_items["item_id"]] = type_info;
                        }
                        if(sub_items["item_id"] == '93001' || sub_items["item_id"] == '93002'){
                            tmp_sc[sub_items["item_id"]] = type_info;
                        }

                        // オーダーメイド用の商品コードを整形
                        if (type_info["quantity"] == 1) {
                            goodsCd += '_' + sub_items["item_id"];
                        } else {
                            goodsCd += '_' + sub_items["item_id"] + 'x' + type_info["quantity"];
                        };
                    };
                    for (var len in result_map) {
                        // 重複商品の場合、数量をカウントアップ
                        if (result_map[len]["nGoodsCode"] == goodsCd.substr(1)) {
                            result_map[len]["quantity"]++;
                            duplication_flg = true;
                            break;
                        }
                    }
                    // 重複している場合、後続をスキップ
                    if (duplication_flg) {
                        duplication_flg = false;
                        continue;
                    }

                    // 内部処理用に詰め替え
                    tmp_map["hb"] = tmp_hb;
                    tmp_map["tp"] = tmp_tp;
                    tmp_map["rp"] = tmp_rp;
                    tmp_map["sr"] = tmp_sr;
                    tmp_map["sc"] = tmp_sc;
                    tmp_map["nGoodsCode"] = goodsCd.substr(1);
                    tmp_map["quantity"] = result["item_count"];
                    tmp_map["orderMadeFlg"] = "1";
                    tmp_map["ordBaseCode"] = result["item_id"];
                    var goodsData = {};
                    goodsData["cGoodsName"] = all_m_goods_map[result["item_id"]]["cGoodsName"];
                    goodsData["nUnitCost"] = 0;
                    tmp_map["goodsData"] = goodsData;
                } else if(all_m_goods_map[result["item_id"]]["byMenuType"] == '5') {
                    // テイクアウトディッシュの場合

                    tmp_map["addHbCd"] = '82001';
                    tmp_map["addHbCnt"] = '0';

                    // 内部処理用に詰め替え
                    var customGoodsCd = result["item_id"];
                    for(sl in result["sub_list"]){
                        if(result["sub_list"][sl]["sub_item"]["item_id"] == '82001'){
                            // 追加パティ
                            customGoodsCd = customGoodsCd +'_'+result["sub_list"][sl]["sub_item"]["item_id"]+'x'+result["sub_list"][sl]["sub_item"]["item_count"]
                            tmp_map["addHbCd"] = result["sub_list"][sl]["sub_item"]["item_id"];
                            tmp_map["addHbCnt"] = result["sub_list"][sl]["sub_item"]["item_count"];
                        }
                        if(result["sub_list"][sl]["sub_item"]["item_id"] == '83001'){
                            // ライス小
                            customGoodsCd = customGoodsCd +'_'+result["sub_list"][sl]["sub_item"]["item_id"];
                            tmp_map["selectRiceCd"] = result["sub_list"][sl]["sub_item"]["item_id"];
                        }
                        if(result["sub_list"][sl]["sub_item"]["item_id"] == '83002'){
                            // ライス大
                            customGoodsCd = customGoodsCd +'_'+result["sub_list"][sl]["sub_item"]["item_id"];
                            tmp_map["selectRiceCd"] = result["sub_list"][sl]["sub_item"]["item_id"];
                        }

                    }

                    for (var len in result_map) {
                        // 重複商品の場合、数量をカウントアップ
                        if (result_map[len]["nGoodsCode"] == customGoodsCd) {
                            result_map[len]["quantity"]++;
                            duplication_flg = true;
                            break;
                        }
                    }

                    // 重複している場合、後続をスキップ
                    if (duplication_flg) {
                        duplication_flg = false;
                        continue;
                    }

                    tmp_map['nGoodsCode'] = customGoodsCd;             // カスタム商品コード
                    tmp_map['quantity'] = result["item_count"];             // 数量
                    tmp_map["orderMadeFlg"] = "3";                     // オーダーメイドフラグ'3：テイクアウトディッシュ'
                    tmp_map['ordBaseCode'] = result["item_id"];      // テイクアウトディッシュベースコード
                    tmp_map['goodsData'] = all_m_goods_map[tmp_map['ordBaseCode']];      // 商品名称
                } else {
                    // オーダーメイドディッシュ以外
                    for (var len in result_map) {
                        // 重複商品の場合、数量をカウントアップ
                        if (result_map[len]["nGoodsCode"] == result["item_id"]) {
                            result_map[len]["quantity"]++;
                            duplication_flg = true;
                            break;
                        }
                    }

                    // 重複している場合、後続をスキップ
                    if (duplication_flg) {
                        duplication_flg = false;
                        continue;
                    }

                    // 内部処理用に詰め替え
                    tmp_map["nGoodsCode"] = result["item_id"];
                    tmp_map["quantity"] = result["item_count"];
                    tmp_map["orderMadeFlg"] = "0";
                    tmp_map["ordBaseCode"] = "";
                    var goodsData = {};
                    goodsData["cGoodsName"] = all_m_goods_map[result["item_id"]]["cGoodsName"];
                    goodsData["nUnitCost"] = result["item_value"];
                    tmp_map["goodsData"] = goodsData;
                }

                // 結果マップに格納
                result_map.push(tmp_map);
            }
        }

        for(var ordCnt in result_map) {
            // 小計金額をクリア
            var totalPrice = 0;

            // タグを作成
            var newRow = document.createElement('tr');
            var newTd1 = document.createElement('td');
            var newTd2 = document.createElement('td');
            var newTd3 = document.createElement('td');
            var newTd4 = document.createElement('td');
            var newName = document.createElement('p');          // 商品名
            var newCost = document.createElement('span');       // 小計
            var newQuantity = document.createElement('span');   // 数量
            var newUl = document.createElement('ul');


            // 作成したタグの中身を作成
            newRow.setAttribute('id', 'ord' + ordCnt);
            newRow.setAttribute('itemid', result_map[ordCnt]['nGoodsCode']);
            var cGoodsName = result_map[ordCnt]['goodsData']['cGoodsName'];
            var loopFlg = true;
            while(loopFlg){
                if(contains(cGoodsName,'<br />')){
                    cGoodsName = cGoodsName.replace('<br />',' ');
                }else{
                    loopFlg = false;
                }
            }
            newName.innerHTML = cGoodsName;
            newName.setAttribute('class', 'c-cartList__infoTtl c-menu2List__infoTtl');
            newUl.setAttribute('class', 'c-cartList__infoList c-menu2List__infoList');
            newQuantity.setAttribute('class', 'selOrdNum');
            newQuantity.setAttribute('id', 'ord' + ordCnt + 'num');
            newQuantity.setAttribute('style', 'margin-right:0px;');
            newCost.setAttribute('class', 'selOrdPrice');
            newCost.setAttribute('id', 'ord' + ordCnt + 'price');

            newTd1.setAttribute('class', 'c-cartList__info');
            newTd2.setAttribute('class', 'c-cartList__nums');
            newTd3.setAttribute('class', 'c-cartList__price c-menu2List__price');

            var singlePrice = 0;
            var totalPrice = 0;
            if (result_map[ordCnt]['orderMadeFlg'] === '0') {
                // オーダーディッシュ以外
                totalPrice = result_map[ordCnt]['goodsData']['nUnitCost'] * result_map[ordCnt]['quantity'];
                singlePrice = result_map[ordCnt]['goodsData']['nUnitCost'];
            } else if (result_map[ordCnt]['orderMadeFlg'] === '3') {
                // テイクアウトディッシュの場合
                // ベースの金額
                singlePrice = all_m_goods_map[result_map[ordCnt]['ordBaseCode']]['nUnitCost'];
                if(result_map[ordCnt]['addHbCnt'] != '0'){
                    // 追加パティの金額
                    singlePrice = parseInt(singlePrice)+parseInt(all_m_goods_map[result_map[ordCnt]['addHbCd']]['nUnitCost']) * parseInt(result_map[ordCnt]['addHbCnt']);
                }
                // ライスの金額
                if(result_map[ordCnt]['selectRiceCd'] != null){
                    singlePrice = parseInt(singlePrice)+parseInt(all_m_goods_map[result_map[ordCnt]['selectRiceCd']]['nUnitCost']);
                }
                // 数量合計金額
                totalPrice =  singlePrice * result_map[ordCnt]['quantity'];

                // 各商品の表示名もついでに作り込み
                var newLi = document.createElement('li');
                if(result_map[ordCnt]['addHbCnt'] == 1){
                    newLi.innerHTML = all_m_goods_map[result_map[ordCnt]['addHbCd']]['cGoodsName'];
                    newUl.appendChild(newLi);
                }else if(result_map[ordCnt]['addHbCnt'] > 1){
                    newLi.innerHTML = all_m_goods_map[result_map[ordCnt]['addHbCd']]['cGoodsName'] + ' x '+'<span class="tNum">'+result_map[ordCnt]['addHbCnt']+'</span>';
                    newUl.appendChild(newLi);
                }
                if(result_map[ordCnt]['selectRiceCd'] != null){
                    var newLi2 = document.createElement('li');
                    newLi2.innerHTML = all_m_goods_map[result_map[ordCnt]['selectRiceCd']]['cGoodsName'];
                    newUl.appendChild(newLi2);
                }
            } else {
                // オーダーディッシュ
                // ベースの金額を加算
                totalPrice = totalPrice +parseInt(all_m_goods_map[result_map[ordCnt]["ordBaseCode"]]["nUnitCost"]);
                for (var odish in result_map[ordCnt]) {
                    if (odish === 'hb' || odish === 'tp' || odish === 'sc' || odish === 'rp' || odish === 'sr') {
                        // 各商品の金額×数量を合算
                        var goodsType = result_map[ordCnt][odish];
                        for (var gt in goodsType) {
                            totalPrice = totalPrice + (goodsType[gt]['nUnitCost'] * goodsType[gt]['quantity']);
                            // 各商品の表示名もついでに作り込み
                            var newLi = document.createElement('li');
                            if (goodsType[gt]['quantity'] === 1) {
                                var cGoodsName = goodsType[gt]['cGoodsName'];
                                var loopFlg = true;
                                while(loopFlg){
                                    if(contains(cGoodsName,'<br />')){
                                        cGoodsName = cGoodsName.replace('<br />',' ');
                                    }else{
                                        loopFlg = false;
                                    }
                                }
                                newLi.innerHTML = cGoodsName;
                            } else {
                                var cGoodsName = goodsType[gt]['cGoodsName'];
                                var loopFlg = true;
                                while(loopFlg){
                                    if(contains(cGoodsName,'<br />')){
                                        cGoodsName = cGoodsName.replace('<br />',' ');
                                    }else{
                                        loopFlg = false;
                                    }
                                }
                                newLi.innerHTML = cGoodsName + ' x '+'<span class="tNum">'+ goodsType[gt]['quantity']+'</span>';
                            }
                            // 詳細リストに追加
                            newUl.appendChild(newLi);
                        }
                    }
                }
                singlePrice = totalPrice;
                totalPrice =  totalPrice * result_map[ordCnt]['quantity'];
            }
            newCost.textContent = totalPrice.toLocaleString() + MSG_CART_13;
            newQuantity.textContent = result_map[ordCnt]['quantity'];

            // 注文履歴専用項目の生成
            var newTd99 = document.createElement('td');
            newTd99.setAttribute('class', 'c-cartList__nums');
            newTd99.textContent = parseInt(singlePrice).toLocaleString() + MSG_CART_13;

            // 作成したタグを一つのtrタグに集約
            // 名前
            newTd1.appendChild(newName);
            if (result_map[ordCnt]['orderMadeFlg'] === '1' || result_map[ordCnt]['orderMadeFlg'] === '3') {
                newTd1.appendChild(newUl);
            }
            newRow.appendChild(newTd1);

            // 単価
            newTd99.setAttribute('style','text-align:right; padding-right:50px;');
            newRow.appendChild(newTd99);

            // 数量
            newTd2.setAttribute('style','text-align:center;');
            newTd2.appendChild(newQuantity);
            newRow.appendChild(newTd2);

            // 小計
            newTd3.setAttribute('style','text-align:right; padding-right:10px;');
            newTd3.appendChild(newCost);
            newRow.appendChild(newTd3);

            // 指定の要素にタグを子要素として追加
            target.appendChild(newRow);

        }
    }

    if(type == 2){
        ordCrtTtlPrice = postResult["charge"];
    }
    if(type == 1){
        // アイコンバッジ更新
        iconRef('add');
    }
    // 注文カゴに1件以上の商品が入っている場合、注文確定ボタンを活性にする
    if (Object.keys(bf_order_map).length >= 1) {
        document.getElementById('ord_fix').setAttribute('onclick', 'touch(); ordFix("1");');
    }

    // 注文カートの合計金額
    document.getElementById('cart_price').textContent = parseInt(ordCrtTtlPrice, 10).toLocaleString();
    if(ordCrtTtlPrice.toLocaleString().length > 5 && MSG_CSS_LANG == 'kr'){
        document.getElementById('cart_price').style.fontSize = '48px';
    }else{
        document.getElementById('cart_price').style.fontSize = '';
    }

    // スクロール位置を一番下に移動
    var detail = document.getElementById('cartDetail');
    detail.scrollTop = detail.scrollHeight;

    // 注文カゴ内の注文数量の上限チェック
    if (!chkQuantityFlg() && type == 1) {
        // 注文カゴ内の＋ボタンを全て非活性にする
        chgDisable(false);
    }

    if(type == 1){
        outOparationLog("注文確定&注文履歴画面-画面生成終了,対象:注文確定");
    } else if(type == 2){
        outOparationLog("注文確定&注文履歴画面-画面生成終了,対象:注文履歴");
    }
}

/**
 * 税率取得処理
 */
function selectTax(taxType){
        // var tax;
        // if(taxType == '2'){
        //     tax = trgtTax["nValue2"];
        // }else{
        //     tax = trgtTax["nValue"];
        // }
        // return BigNumber(tax).times(0.001).plus(1);
        // メモ：税計算廃止
        return BigNumber(1);
}

/**
 * 注文カート表示タグ生成処理（ドリンク用）
 * 　ドリンクメニュー選択時のタグを作成する
 * @param
 * 　drinkCd：商品コード
 * 　drinkNum：数量
 * 　type：メニュー区分（4:ドリンクメニュー、6:TOドリンクメニュー）
 */
function createDrinkTag(drinkCd, drinkNum, type) {
    // 商品コード
    var goodsCd = drinkCd;
    // 数量
    var num = Number(drinkNum);

    if (!chkDrinkQuantityFlg(num)) {
        // 選択数量上限超えポップアップを表示し、処理終了
        document.getElementById('s-dialog14').innerHTML = I_1018.replace('{0}',quantityLimit);
        Data.data['scenes']['dialog14'].onEntry();
        return false;
    }

    // 注文カゴ内の商品と注文商品が一致したらカウントアップする
    for (var ord in bf_order_map) {
        if (bf_order_map[ord]['nGoodsCode'] == goodsCd) {
            // 商品毎の数量上限チェック
            if ((bf_order_map[ord]['quantity'] + num) > person) {
                    // 選択数量上限超えポップアップを表示し、処理終了
                    document.getElementById('s-dialog14').innerHTML = I_1018.replace('{0}',person);
                    Data.data['scenes']['dialog14'].onEntry();
                    return false;
                }    

                // 注文カゴの数量をカウントアップ
                bf_order_map[ord]['quantity'] += num;
                ordQuantity += num;

                // 注文確認画面表示
                // createTag(1,null);
                iconRef('add');
                addMsg(drinkCd);
                levelDispGoodsDetail(currentDispId);
                outOparationLog("カート-ドリンク-商品数量加算,行番号:"+ordCnt+",追加商品データ:"+JSON.stringify(bf_order_map[ordCnt]));
                return false;
        }
    }

    // 一時格納用mapを初期化
    create_order_map = {};

    // 注文件数をカウント
    ordCnt++;
    ordQuantity += num;

    // var drink_map = null;
    // if(type == 4){
    //     // イートインドリンクメニュー
    //     drink_map = drink_goods_map;
    // }else if(type == 6){
    //     // テイクアウトドリンクメニュー
    //     drink_map = takeout_drink_goods_map;
    // }else{
    //     return;
    // }
    var drink_map = all_m_goods_map;

    // 注文確定前mapにデータを格納
    create_order_map['nGoodsCode'] = goodsCd;
    create_order_map['goodsData'] = drink_map[goodsCd];
    create_order_map['quantity'] = num;
    create_order_map['orderMadeFlg'] = '0';
    bf_order_map[ordCnt] = JSON.parse(JSON.stringify(create_order_map));

    // createTag(1,null);
    iconRef('add');
    addMsg(drinkCd);
    levelDispGoodsDetail(currentDispId);

    outOparationLog("カート-ドリンク-商品追加,行番号:"+ordCnt+",追加商品データ:"+JSON.stringify(bf_order_map[ordCnt]));
}

/**
 * 注文カートのタグ削除処理
 * 　削除ボタンが押下された場合、注文カゴから対象の商品を削除する
 * @param
 * 　btn： 押下された削除ボタンのオブジェクト
 */
function delOrd(btn) {
    // タグを削除する親要素を取得
    var parent = document.getElementById('cart_list');
    // 配下の子要素を取得
    var target = parent.getElementsByTagName('tr');

    // 子要素のidと削除ボタンのnameが一致したら子要素を削除する
    for (var i=0; i<target.length; i++) {
        if (target[i].getAttribute('id') == btn.getAttribute('itemid')) {
            var delCnt = target[i].getAttribute('id').replace('ord', '');
            // 注文カートの合計金額を減算
            ordCrtTtlPrice = BigNumber(ordCrtTtlPrice).minus(BigNumber(document.getElementById('ord' + delCnt + 'price').innerHTML.replace(MSG_CART_13, '').replace(',', '')).times(target[i].getAttribute('bytakeoutdefaulttype')));
            document.getElementById('cart_price').innerHTML = parseInt(ordCrtTtlPrice, 10).toLocaleString();

            // 注文カゴ内の注文数量から削除した行の数量を減算
            ordQuantity -= bf_order_map[delCnt]['quantity'];
            // 注文カゴ内の注文数量の上限チェック
            if (chkQuantityFlg()) {
                // 注文カゴ内の＋ボタンを全て活性にする
                chgDisable(true);
            }

            if(0 < bf_order_map[delCnt]['withGoodsCnt']){
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

                // ごいっしょにいかがですか商品セット
                with_ope_data["nSelectCount"] = 0;
                with_ope_data["nParent"] = 0;
                with_ope_data["nTableCode"] = table_code;
                with_ope_data["nManageDate"] = nManageDate;
                with_ope_data["nOperationTime"] = withGoodsOpeTime;
                with_ope_data["nMenuBookCode"] = menubook_cd;
                if(bf_order_map[delCnt]['ordBaseCode'] != null){
                    with_ope_data["nGoodsCode"] = bf_order_map[delCnt]['ordBaseCode'];
                } else {
                    with_ope_data["nGoodsCode"] = bf_order_map[delCnt]['nGoodsCode'];
                }
                with_ope_data["nUnitCost"] = parseInt(BigNumber(document.getElementById('ord' + delCnt + 'price').innerHTML.replace(MSG_CART_13, '').replace(',', '')).div(bf_order_map[delCnt]["withGoodsCnt"]));
                with_ope_data["nCount"] = parseInt("-"+bf_order_map[delCnt]["withGoodsCnt"]);

                with_goods_ope_map.push(jQuery.extend(true, {}, with_ope_data));
            }

                var tmpDelData = bf_order_map[delCnt];
                // 確定前オーダー用mapから削除
                delete bf_order_map[delCnt];

            // 子要素削除
            parent.removeChild(target[i]);

            // 注文カゴの中身が空になった場合、注文確定ボタンを非活性にする
            if (document.getElementById('cart_list').getElementsByTagName('tr').length == 0) {
                document.getElementById('ord_fix').setAttribute('onclick', '');
            }
            tmpDelData["img"] = "";
            outOparationLog("注文確定画面-削除ボタン,行番号:"+delCnt+",削除商品データ:"+JSON.stringify(tmpDelData));
        }
    }

    // アイコンバッジ更新
    iconRef('del');
}

/**
 * 商品追加メッセージ処理
 * @param
 * 　goodsCd： 商品コード
 */
function addMsg(goodsCd) {
    if(all_m_goods_map[goodsCd] != null){
        var msg = document.getElementById('msgBadge');
        msg.innerHTML = '';
        msg.classList.remove('bubble06');
        setTimeout(function () {
            var name = all_m_goods_map[goodsCd]["cGoodsName"];
            var loopFlg = true;
            while(loopFlg){
                if(contains(name,'<br />')){
                    name = name.replace('<br />',' ');
                }else{
                    loopFlg = false;
                }
            }
            msg.innerHTML = '<span style="font-size: 120%;">'+name+ MSG_CART_19;
            msg.classList.add('bubble06');
        }, 100);
    }
}

/**
 * 商品追加メッセージ処理
 * @param
 * 　goodsCd： ベース商品コード
 * 　map: サブメニュー商品コード配列
 */
function addMsgGeneralSubMenu(goodsCd,map) {
    if(all_m_goods_map[goodsCd] != null){
        var msg = document.getElementById('msgBadge');
        msg.innerHTML = '';
        msg.classList.remove('bubble06');
        setTimeout(function () {
            var name = all_m_goods_map[goodsCd]["cGoodsName"];
            var loopFlg = true;
            while(loopFlg){
                if(contains(name,'<br />')){
                    name = name.replace('<br />',' ');
                }else{
                    loopFlg = false;
                }
            }
            msg.innerHTML = '<span style="font-size: 120%;">'+name;

            // 明細行を追加
            for(var i = 0;i < map.length;i++){
                var subName = all_m_goods_map[map[i]]['cGoodsName'];
                if(levelSelectMap != null
                    && levelSelectMap["sub"] != null
                    && levelSelectMap["sub"][map[i]] != null
                    && levelSelectMap["sub"][map[i]]["cnt"] != "1"){
                    subName = subName + ' x ' + levelSelectMap["sub"][map[i]]["cnt"];
                }

                var loopFlg2 = true;
                while(loopFlg2){
                    if(contains(subName,'<br />')){
                        subName = subName.replace('<br />',' ');
                    }else{
                        loopFlg2 = false;
                    }
                }
                msg.innerHTML = msg.innerHTML+ '<br> ・'+subName;
            }

            msg.innerHTML = msg.innerHTML+ MSG_CART_19;

            msg.classList.add('bubble06');
        }, 100);
    }
}

// /**
//  * 商品追加処理
//  * 　重複するオーダーが存在する場合、注文カゴの数量をカウントアップする
//  * @param
//  * 　btn： 押下された商品ボタンのオブジェクト
//  * 　mkbn： 商品区分
//  */
// function addOrd(btn, mKbn) {
//     // 選択数量
//     var choiceCnt = parseInt(document.getElementById('cnt_pop_qnt_'+btn.getAttribute('itemid')).textContent);

//     if (!chkDrinkQuantityFlg(choiceCnt)) {
//         // 選択数量上限超えポップアップを表示し、処理終了
//         document.getElementById('s-dialog14').innerHTML = I_1018.replace('{0}',quantityLimit);
//         Data.data['scenes']['dialog14'].onEntry();
//         return false;
//     }

//     // 一時格納用mapを初期化
//     create_order_map = {};

//     // 注文カゴ内の商品と注文商品が一致したらカウントアップする
//     for (var ord in bf_order_map) {
//         if (bf_order_map[ord]['nGoodsCode'] == btn.getAttribute('itemid')) {
//             // 商品毎の数量上限チェック
//             if (parseInt(bf_order_map[ord]['quantity'])+choiceCnt > person) {
//                     // 選択数量上限超えポップアップを表示し、処理終了
//                     document.getElementById('s-dialog14').innerHTML = I_1018.replace('{0}',person);
//                     Data.data['scenes']['dialog14'].onEntry();
//                     return false;
//                 }
//             // 注文カゴの数量をカウントアップ
//             bf_order_map[ord]['quantity'] = parseInt(bf_order_map[ord]['quantity']) + choiceCnt;
//             ordQuantity = parseInt(ordQuantity) + choiceCnt;

//             // 注文確認画面表示
//             createTag(1,null);
//             addMsg(btn.getAttribute('itemid'));
//             return false;
//         }
//     }
//     // 注文件数をカウント
//     ordCnt++;
//     ordQuantity = parseInt(ordQuantity) + choiceCnt;

//     // 一致する商品が存在しない場合、新規で確定前オーダー用mapと注文カゴに追加する
//     var goodsCd = btn.getAttribute('itemid');
//     create_order_map['nGoodsCode'] = goodsCd;    // 商品コード
//     create_order_map['goodsData'] = all_m_goods_map[goodsCd];

//     // create_order_map['quantity'] = '1';         // 数量
//     create_order_map['quantity'] = choiceCnt;         // 数量
//     create_order_map['orderMadeFlg'] = '0';     // オーダーメイドフラグ"0：オーダーメイド以外"
//     bf_order_map[ordCnt] = JSON.parse(JSON.stringify(create_order_map));

//     // 注文カゴにタグを追加
//     createTag(1,null);
//     addMsg(btn.getAttribute('itemid'));

//     // outOparationLog("???-商品追加,追加行番号:"+ordCnt+",追加商品データ:"+JSON.stringify(bf_order_map[ordCnt]));
// }

/**
 * 商品追加処理
 * 　重複するオーダーが存在する場合、注文カゴの数量をカウントアップする
 * @param
 * 　cnt： 商品数
 * 　mkbn： 商品区分
 * 　withGoodsId： 商品誘導ポップアップ商品コード
 */
function addOrdWithGoods(withGoodsCnt, mKbn, withGoodsId) {
    // 選択数量
    var choiceCnt = parseInt(withGoodsCnt);

    if (!chkDrinkQuantityFlg(choiceCnt)) {
        // 選択数量上限超えポップアップを表示し、処理終了
        document.getElementById('s-dialog14').innerHTML = I_1018.replace('{0}',quantityLimit);
        Data.data['scenes']['dialog14'].onEntry();
        return false;
    }

    // 一時格納用mapを初期化
    create_order_map = {};

    // 注文カゴ内の商品と注文商品が一致したらカウントアップする
    for (var ord in bf_order_map) {
        if (bf_order_map[ord]['nGoodsCode'] == withGoodsId) {
            // 商品毎の数量上限チェック
            if (parseInt(bf_order_map[ord]['quantity'])+choiceCnt > person) {
                    // 選択数量上限超えポップアップを表示し、処理終了
                    document.getElementById('s-dialog14').innerHTML = I_1018.replace('{0}',person);
                    Data.data['scenes']['dialog14'].onEntry();
                    return false;
                }
            // 注文カゴの数量をカウントアップ
            bf_order_map[ord]['quantity'] = parseInt(bf_order_map[ord]['quantity']) + choiceCnt;
            ordQuantity = parseInt(ordQuantity) + choiceCnt;

            // 購入誘導ポップアップからの商品数をカウントアップ
            if(bf_order_map[ord]['withGoodsCnt'] == null){
                bf_order_map[ord]['withGoodsCnt'] = 0;
            }
            bf_order_map[ord]['withGoodsCnt'] = parseInt(bf_order_map[ord]['withGoodsCnt']) + choiceCnt;

            // 注文確認画面表示
            createTag(1,null);
            // addMsg(btn.getAttribute('itemid'));
            return false;
        }
    }
    // 注文件数をカウント
    ordCnt++;
    ordQuantity = parseInt(ordQuantity) + choiceCnt;

    // 一致する商品が存在しない場合、新規で確定前オーダー用mapと注文カゴに追加する
    var goodsCd = withGoodsId;
    create_order_map['nGoodsCode'] = goodsCd;    // 商品コード
    create_order_map['goodsData'] = all_m_goods_map[goodsCd];
    create_order_map['withGoodsCnt'] = choiceCnt;
    create_order_map['quantity'] = choiceCnt;         // 数量
    create_order_map['orderMadeFlg'] = '0';     // オーダーメイドフラグ"0：オーダーメイド以外"
    bf_order_map[ordCnt] = JSON.parse(JSON.stringify(create_order_map));

    // 注文カゴにタグを追加
    createTag(1,null);
    // addMsg(btn.getAttribute('itemid'));

    outOparationLog("カート-ご一緒にいかがですか-商品追加,行番号:"+ordCnt+",追加商品データ:"+JSON.stringify(bf_order_map[ordCnt]));
}

/**
 * 商品追加処理（オーダーメイドディッシュ用）
 * 　オーダーメイドディッシュ完成後の商品コード作成
 * @param
 * 　なし
 */
function createOrd() {
    // 一時格納用mapを初期化
    create_order_map = {};

    // 連想配列が入れ子になっている為、オブジェクトのディープコピーをする
    create_order_map = JSON.parse(JSON.stringify(create_dish_map));

    /** オーダーディッシュ用の商品コードを作成しながら数量が0の商品をmapから除外する */
    var customGoodsCd = "";
    for (var cd in create_order_map) {
        var goodsType = create_order_map[cd];
        switch (cd) {
            // ハンバーグ
            case 'hb':
                for (var hb in goodsType) {
                    var quant = goodsType[hb]['quantity'];
                    if (quant == 0) {
                        // 数量0の場合、mapから除外
                        delete goodsType[hb];
                    } else if (quant == 1) {
                        // 数量1の場合、商品コードのみを設定
                        customGoodsCd += '_' + hb;
                    } else {
                        // 数量2以上の場合、商品コードx数量を設定
                        customGoodsCd += '_' + hb + 'x' + quant;
                    }
                }
                break;
            // トッピング
            case 'tp':
                for (var tp in goodsType) {
                    var quant = goodsType[tp]['quantity'];
                    if (quant == 0) {
                        // 数量0の場合、mapから除外
                        delete goodsType[tp];
                    } else if (quant == 1) {
                        // 数量1の場合、商品コードのみを連結
                        customGoodsCd += '_' + tp;
                    } else {
                        // 数量2以上の場合、商品コードx数量を連結
                        customGoodsCd += '_' + tp + 'x' + quant;
                    }
                }
                break;
            // ソース
            case 'sc':
                for (var sc in goodsType) {
                    var quant = goodsType[sc]['quantity'];
                    if (quant == 0 || sc == '92008') {
                        // 数量0の場合または、ハンバーグソース選択の場合、mapから除外
                        delete goodsType[sc];
                    } else {
                        // 商品コードを連結
                        customGoodsCd += '_' + sc;
                    }
                }
                break;
            // ライス・パスタ
            case 'rp':
                for (var rp in goodsType) {
                    var quant = goodsType[rp]['quantity'];
                    if (quant == 0) {
                        // 数量0の場合、mapから除外
                        delete goodsType[rp];
                    } else {
                        // 商品コードを連結
                        customGoodsCd += '_' + rp;
                    }
                }
                break;
            // サラダ
            case 'sr':
                for (var sr in goodsType) {
                    var quant = goodsType[sr]['quantity'];
                    if (quant == 0) {
                        // 数量0の場合、mapから除外
                        delete goodsType[sr];
                    } else {
                        // 商品コードを連結
                        customGoodsCd += '_' + sr;
                    }
                }
                break;
        }
    }
    if(customGoodsCd != ''){
        // 先頭「_」削除
        customGoodsCd = customGoodsCd.slice(1);
    }

    customGoodsCd = ""
    // 残りの項目をセット
    create_order_map['nGoodsCode'] = customGoodsCd; // カスタム商品コード
    create_order_map['goodsData'] = '';             // 商品情報
    create_order_map['quantity'] = '1';             // 数量
    create_order_map['orderMadeFlg'] = '1';         // オーダーメイドフラグ'1：オーダーメイド'
    if(withGoodsDetailFlg){
        // ごいっしょにいかがですか機能が有効な場合
        create_order_map['withGoodsCnt'] = 1;
    }
    // var goodsName = {cGoodsName:ORD_MADE_DISHERS_LANG};
    // var goodsName = {cGoodsName:m_basedishcombo_map[ordMadeSelectBaseCode]["cBaseDishName"]};
    create_order_map['goodsData'] = all_m_goods_map[m_basedishcombo_map[ordMadeSelectBaseCode]["nGoodsCode"]];      // 商品名称
    create_order_map['ordBaseCode'] = m_basedishcombo_map[ordMadeSelectBaseCode]["nGoodsCode"];      // オーダーメイドディッシュベースコード

    // 注文件数をカウント
    ordCnt++;
    ordQuantity++;

    // 確定前オーダー用mapに追加
    bf_order_map[ordCnt] = JSON.parse(JSON.stringify(create_order_map));

    // 注文カゴにタグを追加
    createTag(1,null);

    outOparationLog("カート-オーダーメイドディッシュ-商品追加,行番号:"+ordCnt+",追加商品データ:"+JSON.stringify(bf_order_map[ordCnt]));
}

/**
 * 商品追加処理（階層画面用）
 * @param ベース商品コード
 */
function createOrdLevel() {
    var goodsCd = levelSelectMap["base"];
    // 一時格納用mapを初期化
    create_order_map = {};
    // 空配列を生成
    create_order_map["hb"] = {};
    create_order_map["rp"] = {};
    create_order_map["sc"] = {};
    create_order_map["sr"] = {};
    m_goods_tp_map = {};

    // 商品数量取得
    var choiceCnt = parseInt(levelSelectMap["cnt"]);

    if (!chkDrinkQuantityFlg(choiceCnt)) {
        // 選択数量上限超えポップアップを表示し、処理終了
        document.getElementById('s-dialog14').innerHTML = I_1018.replace('{0}',quantityLimit);
        Data.data['scenes']['dialog14'].onEntry();
        return false;
    }
    
    // 商品コード連結値
    var customGoodsCd = "_"+goodsCd;

    // 追加メッセージ用配列
    var addMsgList = [];

    for (var i in levelSelectMap["sub"]){
        // サブメニュー商品コード
        var selectcd = levelSelectMap["sub"][i]["goodsCd"];

        m_goods_tp_map[selectcd] = jQuery.extend(true, {}, all_m_goods_map[selectcd]);
        m_goods_tp_map[selectcd]["quantity"] = parseInt(levelSelectMap["sub"][i]["cnt"]);
        customGoodsCd = customGoodsCd + "_" + selectcd+"×"+m_goods_tp_map[selectcd]["quantity"];
        addMsgList.push(selectcd);
    }
    create_order_map["tp"] = jQuery.extend(true, {},m_goods_tp_map);

    if(customGoodsCd != ''){
        // 先頭「_」削除
        customGoodsCd = customGoodsCd.slice(1);
    }

    // 注文カゴ内の商品と注文商品が一致したらカウントアップする
    for (var ord in bf_order_map) {
        if (bf_order_map[ord]['nGoodsCode'] == customGoodsCd) {
            // 商品毎の数量上限チェック
            if (parseInt(bf_order_map[ord]['quantity'])+choiceCnt > person) {
                    // 選択数量上限超えポップアップを表示し、処理終了
                    document.getElementById('s-dialog14').innerHTML = I_1018.replace('{0}',person);
                    Data.data['scenes']['dialog14'].onEntry();
                    return false;
                }
            // 注文カゴの数量をカウントアップ
            bf_order_map[ord]['quantity'] = parseInt(bf_order_map[ord]['quantity']) + choiceCnt;
            ordQuantity = parseInt(ordQuantity) + choiceCnt;

            // 注文確認画面表示
            // createTag(1,null);
            iconRef('add');
            addMsgGeneralSubMenu(goodsCd,addMsgList);
            outOparationLog("カート-サブメニューポップアップ-商品数量加算,行番号:"+ordCnt+",追加商品データ:"+JSON.stringify(bf_order_map[ordCnt]));
            return false;
        }
    }

    // 残りの項目をセット
    create_order_map['nGoodsCode'] = customGoodsCd; // カスタム商品コード
    create_order_map['goodsData'] = '';             // 商品情報
    create_order_map['quantity'] = choiceCnt;             // 数量
    create_order_map['orderMadeFlg'] = '1';         // オーダーメイドフラグ'1：オーダーメイド'

    var goodsName = {cGoodsName:all_m_goods_map[goodsCd]["cGoodsName"]};
    create_order_map['goodsData'] = all_m_goods_map[goodsCd];      // 商品名称
    create_order_map['ordBaseCode'] = all_m_goods_map[goodsCd]["nGoodsCode"];      // オーダーメイドディッシュベースコード

    // 注文件数をカウント
    ordCnt++;
    ordQuantity = parseInt(ordQuantity) + choiceCnt;

    // 確定前オーダー用mapに追加
    bf_order_map[ordCnt] = JSON.parse(JSON.stringify(create_order_map));

    // 注文カゴにタグを追加
    // createTag(1,null);
    iconRef('add');
    addMsgGeneralSubMenu(goodsCd,addMsgList);

    outOparationLog("カート-サブメニューポップアップ-商品追加,行番号:"+ordCnt+",追加商品データ:"+JSON.stringify(bf_order_map[ordCnt]));
}

/**
 * 数量変更処理
 * 　対象商品の数量を変更する
 * @param
 * 　btn： +/-オブジェクト
 */
function cntUpDwn(btn) {
    var chgCnt = btn.getAttribute('name').replace('ord', '').replace('up', '').replace('dwn', '');
    var btnName = btn.getAttribute('name').replace('ord', '');
    var totalPrice = 0;

    // 対象商品の単価を取得
    if (bf_order_map[chgCnt]['orderMadeFlg'] === '0') {
        // オーダーディッシュ以外
        totalPrice = bf_order_map[chgCnt]['goodsData']['nUnitCost'];
    } else if (bf_order_map[chgCnt]['orderMadeFlg'] === '3') {
        // テイクアウトディッシュの場合
        // ベースの金額
        singlePrice = all_m_goods_map[bf_order_map[chgCnt]['ordBaseCode']]['nUnitCost'];
        if(bf_order_map[chgCnt]['addHbCnt'] != '0'){
            // 追加パティの金額
            singlePrice = parseInt(singlePrice)+parseInt(all_m_goods_map[bf_order_map[chgCnt]['addHbCd']]['nUnitCost']) * parseInt(bf_order_map[chgCnt]['addHbCnt']);
        }
        // ライスの金額
        if(bf_order_map[chgCnt]['selectRiceCd'] != null){
            singlePrice = parseInt(singlePrice)+parseInt(all_m_goods_map[bf_order_map[chgCnt]['selectRiceCd']]['nUnitCost']);
        }
        totalPrice =  singlePrice;
    } else {
        // オーダーディッシュ
        // ベースの金額を加算
        totalPrice = totalPrice +parseInt(all_m_goods_map[bf_order_map[chgCnt]["ordBaseCode"]]["nUnitCost"]);
        for (var odish in bf_order_map[chgCnt]) {
            if (odish === 'hb' || odish === 'tp' || odish === 'sc' || odish === 'rp' || odish === 'sr') {
                var goodsType = bf_order_map[chgCnt][odish];
                for (var gt in goodsType) {
                    totalPrice = totalPrice + (goodsType[gt]['nUnitCost'] * goodsType[gt]['quantity'])
                }
            }
        }
    }

    // 数量の増減チェック
    if (btnName.indexOf('up') > -1) {
        // ＋ボタン押下
        // 注文数量の上限チェック（卓人数変更処理のチェック用）
        if (bf_order_map[chgCnt]['quantity'] >= person) {
            // 選択数量が卓人数以上の場合、＋ボタンを非活性
            document.getElementById('ord' + chgCnt + 'up').setAttribute('style', 'background-color:#dcdcdc; pointer-events: none;');
        } else {
            // 注文カゴの数量をカウントアップ
            bf_order_map[chgCnt]['quantity']++;
            if(0 < bf_order_map[chgCnt]['withGoodsCnt']){
                // １個でもご一緒にいかがですか注文があれば、カウントアップ
                bf_order_map[chgCnt]['withGoodsCnt']++;

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

                // ごいっしょにいかがですか商品セット
                with_ope_data["nSelectCount"] = 0;
                with_ope_data["nParent"] = 0;
                with_ope_data["nTableCode"] = table_code;
                with_ope_data["nManageDate"] = nManageDate;
                with_ope_data["nOperationTime"] = withGoodsOpeTime;
                with_ope_data["nMenuBookCode"] = menubook_cd;
                if(bf_order_map[chgCnt]['ordBaseCode'] != null){
                    with_ope_data["nGoodsCode"] = bf_order_map[chgCnt]['ordBaseCode'];
                } else {
                    with_ope_data["nGoodsCode"] = bf_order_map[chgCnt]['nGoodsCode'];
                }
                with_ope_data["nUnitCost"] = parseInt(totalPrice);
                with_ope_data["nCount"] = parseInt(1);

                with_goods_ope_map.push(jQuery.extend(true, {}, with_ope_data));
            }
            // 注文カゴ内の全体数量をカウントアップ
            ordQuantity++;

            document.getElementById('ord' + chgCnt + 'num').textContent = Number(document.getElementById('ord' + chgCnt + 'num').textContent) + 1;
            // 金額を加算
            document.getElementById('ord' + chgCnt + 'price').textContent = (totalPrice * bf_order_map[chgCnt]['quantity']).toLocaleString() + MSG_CART_13;

            // 注文カートの合計金額に加算
            ordCrtTtlPrice = BigNumber(ordCrtTtlPrice).plus(BigNumber(totalPrice).times(selectTax(bf_order_map[chgCnt]['goodsData']['byTakeoutDefaultType'])));

            document.getElementById('cart_price').textContent = parseInt(ordCrtTtlPrice, 10).toLocaleString();
            if(ordCrtTtlPrice.toLocaleString().length > 5 && MSG_CSS_LANG == 'kr'){
                document.getElementById('cart_price').style.fontSize = '48px';
            }else{
                document.getElementById('cart_price').style.fontSize = '';
            }

            if (bf_order_map[chgCnt]['quantity'] > 1) {
                // 数量1より多い場合、－ボタンを活性
                document.getElementById('ord' + chgCnt + 'dwn').setAttribute('style', 'background-color:#cc9966; pointer-events: auto;');
                document.getElementById('ord' + chgCnt).setAttribute('style', 'color:#444;');
            }
            // 注文数量の上限チェック（通常のカウントアップのチェック用）
            if (bf_order_map[chgCnt]['quantity'] >= person) {
                // 選択数量が卓人数以上の場合、＋ボタンを非活性
                document.getElementById('ord' + chgCnt + 'up').setAttribute('style', 'background-color:#dcdcdc; pointer-events: none;');
            }
            // 注文カゴ内の注文数量の上限チェック
            if (!chkQuantityFlg()) {
                // 注文カゴ内の＋ボタンを全て非活性にする
                chgDisable(false);
            }
        }
    } else {
        // －ボタン押下
        // 数量の下限値は'1'
        if (bf_order_map[chgCnt]['quantity'] > 1) {
            // 注文カゴの数量をカウントダウン
            bf_order_map[chgCnt]['quantity']--;
            if(bf_order_map[chgCnt]['quantity'] < bf_order_map[chgCnt]['withGoodsCnt']){
                // 減らす対象が確実に購入誘導ポップアップ追加商品の場合、購入誘導ポップアップ追加数カウントダウン
                bf_order_map[chgCnt]['withGoodsCnt']--;

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
            
                // ごいっしょにいかがですか商品セット
                with_ope_data["nSelectCount"] = 0;
                with_ope_data["nParent"] = 0;
                with_ope_data["nTableCode"] = table_code;
                with_ope_data["nManageDate"] = nManageDate;
                with_ope_data["nOperationTime"] = withGoodsOpeTime;
                with_ope_data["nMenuBookCode"] = menubook_cd;
                if(bf_order_map[chgCnt]['ordBaseCode'] != null){
                    with_ope_data["nGoodsCode"] = bf_order_map[chgCnt]['ordBaseCode'];
                } else {
                    with_ope_data["nGoodsCode"] = bf_order_map[chgCnt]['nGoodsCode'];
                }
                with_ope_data["nUnitCost"] = parseInt(totalPrice);
                with_ope_data["nCount"] = parseInt(-1);

                with_goods_ope_map.push(jQuery.extend(true, {}, with_ope_data));
            }
            // 注文カゴ内の全体数量をカウントダウン
            ordQuantity--;

            document.getElementById('ord' + chgCnt + 'num').textContent = Number(document.getElementById('ord' + chgCnt + 'num').textContent) - 1;
            // 金額を減算
            document.getElementById('ord' + chgCnt + 'price').textContent = (totalPrice * bf_order_map[chgCnt]['quantity']).toLocaleString() + MSG_CART_13;

            // 注文カートの合計金額を減算
            ordCrtTtlPrice = BigNumber(ordCrtTtlPrice).minus(BigNumber(totalPrice).times(selectTax(bf_order_map[chgCnt]['goodsData']['byTakeoutDefaultType'])));

            document.getElementById('cart_price').textContent = parseInt(ordCrtTtlPrice, 10).toLocaleString();
            if(ordCrtTtlPrice.toLocaleString().length > 5 && MSG_CSS_LANG == 'kr'){
                document.getElementById('cart_price').style.fontSize = '48px';
            }else{
                document.getElementById('cart_price').style.fontSize = '';
            }
        }

        if (bf_order_map[chgCnt]['quantity'] === 1) {
            // 数量1の場合、－ボタンを非活性
            document.getElementById('ord' + chgCnt + 'dwn').setAttribute('style', 'background-color:#dcdcdc; pointer-events: none;');
        }

        if (bf_order_map[chgCnt]['quantity'] < (person)) {
            // 選択数量が上限値未満の場合、＋ボタンを活性
            document.getElementById('ord' + chgCnt + 'up').setAttribute('style', 'background-color:#cc9966; pointer-events: auto;');
        }

        // 注文カゴ内の注文数量の上限チェック
        if (chkQuantityFlg()) {
            // 注文カゴ内の＋ボタンを全て活性にする
            chgDisable(true);
        }

        if (bf_order_map[chgCnt]['quantity'] <= (person)) {
            // 選択数量が上限値以下の場合、数量のテキスト、背景色をリセット
            document.getElementById('ord' + chgCnt + 'num').setAttribute('style', 'border: solid 1px gray; color:#444; background-color:white;');
        }
    }
    var tmp_map = JSON.parse(JSON.stringify(bf_order_map[chgCnt]));
    tmp_map["img"] = "";
    outOparationLog("注文確定画面-[+][-]ボタン,行番号:"+chgCnt+",増減:"+(btnName.indexOf('up') > -1 ? "増":"減")+",変更後商品データ:"+JSON.stringify(tmp_map));
    // アイコンバッジ更新
    iconRef();
}

var ordFixBtnType = '1';
/**
 * 注文確定処理
 * 　注文カート内の商品を確定し、TOP画面に遷移する
 * @param 1:注文確定ボタン処理 2:レジ袋選択後処理
 */
function ordFix(btnType) {
    // 注文確定ボタン多重タップ防止
    if(ordPostFlg){return;}
    outOparationLog("注文確定処理開始");
    ordFixBtnType = btnType;
    // プログレスバー表示
    document.getElementById('loading').removeAttribute("hidden");
    ordPostFlg = true;

    orderErrPopMsg();
    
    var ordFlg = false;     // 注文数量チェックフラグ
    var limitFlg = false;   // 数量上限チェックフラグ
    // 注文商品の存在チェック
    for (var oCnt in bf_order_map) {
        if (bf_order_map[oCnt]['quantity'] > 0) {
            ordFlg = true;
            if (bf_order_map[oCnt]['quantity'] > person) {
                // 商品毎の数量上限チェック
                limitFlg = true;

                // 上限超えしている数量のテキスト、背景色を変更する。
                document.getElementById('ord' + oCnt + 'num').setAttribute('style', 'border: solid 1px gray; color:#f54d37; background-color:yellow;');
            }
        }
    }

    if (limitFlg) {
        // 数量上限超えの商品が存在している場合、確認ポップアップ表示
        document.getElementById('s-dialog14').innerHTML = I_1019.replace('{0}',9);
        Data.data['scenes']['dialog14'].onEntry();
        document.getElementById('loading').setAttribute("hidden","hidden");
        ordPostFlg = false;
    } else if (ordFlg) {
        // 品切れチェック処理
        chkSoldOut();
    } else {
        // 注文確定対象の商品が無い場合、確認ポップアップ表示
        Data.data['scenes']['dialog6'].onEntry();
        document.getElementById('loading').setAttribute("hidden","hidden");
        ordPostFlg = false;
    }
}

/** 
 * アイコンバッジ更新処理
 * 　注文カート内の商品件数に応じてアイコンバッジの表示を更新する
 * @param
 * 　なし
 */
function iconRef() {
    var icon = document.getElementById('iconBadge');
    var val = null;

    var goodsCnt = 0;
    for(line in bf_order_map){
        goodsCnt = goodsCnt + parseInt(bf_order_map[line]["quantity"]);
    }
    if(goodsCnt == 0){
        // データが0件の場合
        icon.setAttribute('hidden', 'hidden');
        // 注文確定ボタン点灯解除
        document.getElementById('footer_2').classList.remove("footer_2_anime");
    }else{
        // 件数をセット
        icon.removeAttribute('hidden');
        val = goodsCnt;
        // 注文確定ボタン点灯
        document.getElementById('footer_2').classList.add("footer_2_anime");
    }
    icon.textContent = val;
}

/**
 * 会計情報取得POST送信処理
 * 　非同期通信で会計情報取得POSTを送信する
 * @param １：会計、２：注文履歴
 */
function getAccountInfoPost(type) {
    if(guiFlg == '1'){return;}
    if (singleFlg) {return;};

    if(type == 1){
        outOparationLog("会計情報取得開始"+(sideOpeFlg ? "-フッター操作":"")+",用途:会計");
        sideOpeFlg = false;
    } else if(type == 2){
        outOparationLog("会計情報取得開始"+(sideOpeFlg ? "-フッター操作":"")+",用途:注文履歴");
    }

    document.getElementById('loading').removeAttribute("hidden");
    singleFlg = true;

    var timeoutFlg = false;

    // タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
            // 通信エラー
            location.href = "#root/home";
            document.getElementById('loading').setAttribute("hidden","hidden");
            document.getElementById('s-dialog5').innerHTML = E_9005;
            Data.data['scenes']['dialog5'].onEntry();
            singleFlg = false;
		}
	},POST_TIMEOUT_TIME);

    // 非同期通信でPOSTを送信
    var response_json = null;
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_ROOT_FOLDER + '/tto/compass_slip_request.php',
			data:{android_id:androidID,
				term_class:"RTIS1",
				request_id:getCurrentTime()
				},
			success:function(data){
				// POST送信終了
                response_json = data;
			}
		})
	).done(function() {
        if(!(timeoutFlg)){
            timeoutFlg = true;
            if(response_json != null && response_json["status"] == 0){
                if (type == 1) {
                    // 合計金額を設定
                    document.getElementById('s-dialog9').innerHTML = I_1013.replace('{0}', response_json["result"]["charge"].toLocaleString())+"<br><span style='font-size:23px; vertical-align:top;'>　</span>";
                    // 自動清算機に誘導するポップアップ表示
                    Data.data['scenes']['dialog9'].onEntry();
                } else {
                    // 注文履歴画面表示処理
                    createTag(type,response_json["result"]);
                    location.href = "#root/cart";
                }
                document.getElementById('loading').setAttribute("hidden","hidden");
                singleFlg = false;

                if(type == 1){
                    outOparationLog("会計情報取得終了,用途:会計");
                } else if(type == 2){
                    outOparationLog("会計情報取得終了,用途:注文履歴");
                }
            }else{
                // 通信エラー
                location.href = "#root/home";
                document.getElementById('loading').setAttribute("hidden","hidden");
                document.getElementById('s-dialog5').innerHTML = E_9005;
                Data.data['scenes']['dialog5'].onEntry();
                singleFlg = false;
                sideOpeFlg = false;
            }
        }
	})
}

/**
 * 注文数量上限チェック
 * 　一度に注文可能な商品数量を超過しているかチェックする
 * @returns true：上限値未満、false：上限値を以上
 */
function chkQuantityFlg() {
    if (ordQuantity < quantityLimit) {
        return true;
    }
    return false;
}

/**
 * 注文数量上限チェック
 * 　一度に注文可能な商品数量を超過しているかチェックする
 * @param   quantity：加算数量
 * @returns true：上限値未満、false：上限値を以上
 */
function chkDrinkQuantityFlg(quantity) {
    if ((ordQuantity + quantity) <= quantityLimit) {
        return true;
    }
    return false;
}

/**
 * 
 * @param 数量上限フラグ（true：数量上限以下、false：数量上限を超過）
 */
function chgDisable(quantityLimitFlg) {
    if (quantityLimitFlg) {
        for (var cnt in bf_order_map) {
            // 注文カゴ内の数量が上限値以下の場合、＋ボタンを活性にする
            document.getElementById('ord' + cnt + 'up').setAttribute('style', 'background-color:#cc9966; pointer-events: auto;');

            if (bf_order_map[cnt]['quantity'] >= person) {
                // 選択数量が"9"以上の場合、＋ボタンを非活性
                document.getElementById('ord' + cnt + 'up').setAttribute('style', 'background-color:#dcdcdc; pointer-events: none;');
            }
        }
    } else {
        for (var cnt in bf_order_map) {
            // 注文カゴ内の数量が上限値を超過している場合、＋ボタンを非活性にする
            document.getElementById('ord' + cnt + 'up').setAttribute('style', 'background-color:#dcdcdc; pointer-events: none;');
        }
    }
}