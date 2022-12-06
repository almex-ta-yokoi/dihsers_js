/**
 * エンタメオーダシステム 品切商品チェック処理
 * @name  getSoldOutInfo.php
 * @category web function
 * @since 2019-11-25
 * @version 1.0
 * @update 2019-11-25
 * @copyright almex.inc
 * @author t.yamamuro
 * @method なし
 * @param なし
 * @return なし
 * @dateil 品切商品チェックの判定結果を返却する
 */

// 品切商品情報
var result;

// 品切商品
var soldOutGoods = null;
var soldOutGoods_map;

/**
 * 品切商品データの取得処理
 * 　非同期通信で店舗IDに紐づく商品情報を取得する
 * @param
 * 　なし
 */
function chkSoldOut() {
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
            chkSoldOut();
            return;
		}
    },POST_TIMEOUT_TIME);

    // 非同期通信で商品情報を取得
	$.when(
        $.ajax({
            type:'POST',
            url:PHP_EN_ROOT_FOLDER + '/getSoldOutInfo.php',
            success:function(data){
                // 結果をJSON形式で取得
                result = data;
				if((result === false || result === '') && !(timeoutFlg)){
                    timeoutFlg = true;
                    chkSoldOut();
					return;
				}
            }
        })
	).done(function() {
        // 非同期通信の完了を監視
		if(result !== false && !(timeoutFlg)){
            timeoutFlg = true;
			chkAjaxComplete(result);
		}else{
            timeoutFlg = true;
        }
	})
}

/**
 * 品切商品データのチェック処理
 * 　非同期通信にて取得した商品情報と、注文カゴ内の商品を比較し、
 * 　品切商品が無いかチェックする。
 * 　データはJSON形式
 * @param
 * 　result_json： DBからの取得結果
 */
function chkAjaxComplete(result_json) {
    soldOutGoods = null;
    if (result_json == 0) {
        // 取得件数0件の場合、チェック、更新不要
        if (ordFixBtnType == '2'){
            // レジ袋選択後の処理の場合
            ordConf();
        }else if((regFlg == '1' && plasticBagFlg_reg == '1') || (regFlg != '1' && plasticBagFlg_tto == '1') && cartTakeoutCheck()){
            // レジ袋確認
            ordPostFlg = false;
            document.getElementById('loading').setAttribute("hidden","hidden");
            Data.data['scenes']['dialog22'].onEntry();
            outOparationLog("注文確定処理一旦終了-レジ袋確認ポップアップ表示");
        }else{
            ordConf();
        }
        return;
    }
    
    // DBからの取得結果をmapに格納
    soldOutGoods_map = JSON.parse(result_json);

    // 更新フラグ
    var chgFlg = false;
    // 品切れ商品の件数分繰返し
    for (var gs in soldOutGoods_map) {
        // メニューブックマスタの件数分繰返し
        for (var mbCd in tmp_m_goods_map) {
            if (tmp_m_goods_map[mbCd][gs] != null && tmp_m_goods_map[mbCd][gs] != 'undefined') {
                if (tmp_m_goods_map[mbCd][gs]["bySalesStatusType"] == 1) {
                    // 商品マップの販売ステータス区分が"1"だった場合、"1"→"2"に更新
                    tmp_m_goods_map[mbCd][gs]["bySalesStatusType"] = soldOutGoods_map[gs]["bySalesStatusType"];
                    chgFlg = true;
                }
            }
        }
    }

    if (chgFlg) {
        // メニューブックマスタのデータ整理
        menuBookMstEdit();

        // 商品マスタのデータ整理
        goodsMstEdit();
    }

    // 注文カゴ内の商品分、処理を繰返す
    for (var oc in bf_order_map) {
        if (bf_order_map[oc]['quantity'] === 0) {
            // 注文数量'0'の商品は対象外にする
            delete bf_order_map[oc];
        } else {
            if (bf_order_map[oc]['orderMadeFlg'] === '0') {
                // オーダーメイドディッシュ以外
                var gc = bf_order_map[oc]['nGoodsCode'];
                if (typeof soldOutGoods_map[gc] != null && typeof soldOutGoods_map[gc] != 'undefined') {
                    // 品切商品を連結
                    var goodsName = soldOutGoods_map[gc]['cGoodsName'];
                    if(goods_lng_map.get(soldOutGoods_map[gc]['nGoodsCode']) != null){
                        goodsName = goods_lng_map.get(soldOutGoods_map[gc]['nGoodsCode'])['name'];
                    }

                    if (soldOutGoods == null) {
                        soldOutGoods = goodsName;
                    } else {
                        soldOutGoods += "," + goodsName;
                    }
                }
            } else {
                // オーダーディッシュ
                if(soldOutGoods_map[bf_order_map[oc]["ordBaseCode"]] != null){
                    // 品切商品を連結
                    var baseName = all_m_goods_map[bf_order_map[oc]["ordBaseCode"]]['cGoodsName'];
                    if (soldOutGoods == null) {
                        soldOutGoods = baseName;
                    } else if(soldOutGoods.indexOf(baseName) == -1){
                        soldOutGoods += "," + baseName;
                    }
                }
                for (var odish in bf_order_map[oc]) {
                    if (odish === 'hb' || odish === 'tp' || odish === 'sc' || odish === 'rp' || odish === 'sr') {
                        var goodsType = bf_order_map[oc][odish];
                        for (var gt in goodsType) {
                            if (typeof soldOutGoods_map[gt] != null && typeof soldOutGoods_map[gt] != 'undefined') {
                                var gName = soldOutGoods_map[gt]['cGoodsName'];
                                if(goods_lng_map.get(soldOutGoods_map[gt]['nGoodsCode']) != null){
                                    gName = goods_lng_map.get(soldOutGoods_map[gt]['nGoodsCode'])['name'];
                                }
                                // 品切商品を連結
                                if (soldOutGoods == null) {
                                    soldOutGoods = gName;
                                } else if(soldOutGoods.indexOf(gName) == -1){
                                    soldOutGoods += "," + gName;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if(soldOutGoods != null){
        // 品切商品があった場合、確認ポップアップ表示
        // 注文失敗ダイアログ表示
        document.getElementById('s-dialog7').innerHTML = I_1002.replace("{0}", soldOutGoods);
        Data.data['scenes']['dialog7'].onEntry();
        ordPostFlg = false;
        // プログレスバー解除
        document.getElementById('loading').setAttribute("hidden","hidden");
    }else if(ordFixBtnType == '2'){
        // レジ袋選択後の処理の場合
        ordConf();
    }else if((regFlg == '1' && plasticBagFlg_reg == '1') || (regFlg != '1' && plasticBagFlg_tto == '1') && cartTakeoutCheck()){
        ordPostFlg = false;
        // プログレスバー解除
        document.getElementById('loading').setAttribute("hidden","hidden");
        Data.data['scenes']['dialog22'].onEntry();
    }else{
        ordConf();
    }
}

var softDrinkFlg = false;
var misoSorpFlg = false;
// var ordConfFlg = false;
/**
 * 注文確定後の事後処理
 * @param
 * 　なし
 */
function ordConf() {
    // if(ordConfFlg){return;}
    // ordConfFlg = true;
    softDrinkFlg = false;
    misoSorpFlg = false;
    var cnt = 0;
    var subCnt = 0;
    var data_item_id = {};
    var data_item_count = {};
    var data_item_payment_type = {};
    var data_sub_item_id = {};
    var data_sub_count = {};

    // ご一緒にいかがですか商品数量[n件]
    var data_with_item_count = {};
    // ご一緒にいかがですか表示選択肢数
    var with_disp_option = 0;
    for(var wg in with_goods_map){
        if(with_goods_map[wg]["onoff"]){
            with_disp_option++;
        }
    }

    if (soldOutGoods == null) {
        // 確定後オーダー用mapに登録する
        for (var key in bf_order_map) {
            if (bf_order_map[key]["quantity"] === 0) {
                continue;
            } else {
                // 注文POST用配列作成
                for (var i = 0; i < parseInt(bf_order_map[key]["quantity"]); i++) {
                    // ソフトドリンク・みそ汁の存在チェック
                    if(bf_order_map[key]["nGoodsCode"] == '40001'
                    || bf_order_map[key]["nGoodsCode"] == '90001'
                    || bf_order_map[key]["nGoodsCode"] == '52007'){
                        softDrinkFlg = true;
                    }else if(bf_order_map[key]["nGoodsCode"] == '35001'
                    || bf_order_map[key]["nGoodsCode"] == '52006'){
                        misoSorpFlg = true;
                    }

                    data_item_id[cnt] = bf_order_map[key]["nGoodsCode"];
                        data_item_count[cnt] = 1;
                    data_item_payment_type[cnt] = '0';

                    if(bf_order_map[key]["orderMadeFlg"] == '3'){
                        data_item_id[cnt] = bf_order_map[key]["ordBaseCode"];

                        data_sub_item_id[cnt] = {};
                        data_sub_count[cnt] = {};

                        var onceLineFlg = false;
                        if(bf_order_map[key]['addHbCnt'] == '0' || bf_order_map[key]['selectRiceCd'] == null){
                            data_sub_item_id[cnt][ORDERMADE_SUBMENU_CD] = '';
                            data_sub_count[cnt][ORDERMADE_SUBMENU_CD] = '';
                            onceLineFlg = true;
                        }else{
                            data_sub_item_id[cnt][ORDERMADE_SUBMENU_CD] = [];
                            data_sub_count[cnt][ORDERMADE_SUBMENU_CD] = [];
                        }
                        // 追加パティ
                        if(bf_order_map[key]['addHbCnt'] != '0'){
                            if(onceLineFlg){
                                data_sub_item_id[cnt][ORDERMADE_SUBMENU_CD] = bf_order_map[key]['addHbCd'];
                                data_sub_count[cnt][ORDERMADE_SUBMENU_CD] = bf_order_map[key]['addHbCnt'];
                            }else{
                                data_sub_item_id[cnt][ORDERMADE_SUBMENU_CD].push(bf_order_map[key]['addHbCd']);
                                data_sub_count[cnt][ORDERMADE_SUBMENU_CD].push(bf_order_map[key]['addHbCnt']);
                            }
                        }
                        // ライス
                        if(bf_order_map[key]['selectRiceCd'] != null){
                            if(onceLineFlg){
                                data_sub_item_id[cnt][ORDERMADE_SUBMENU_CD] = bf_order_map[key]['selectRiceCd'];
                                data_sub_count[cnt][ORDERMADE_SUBMENU_CD] = 1
                            }else{
                                data_sub_item_id[cnt][ORDERMADE_SUBMENU_CD].push(bf_order_map[key]['selectRiceCd']);
                                data_sub_count[cnt][ORDERMADE_SUBMENU_CD].push(1);
                            }
                        }
                    }
                    
                    // オーダーメイドの場合
                    if(bf_order_map[key]["orderMadeFlg"] == '1'){
                        data_item_id[cnt] = bf_order_map[key]["ordBaseCode"];

                        data_sub_item_id[cnt] = {};
                        data_sub_count[cnt] = {};

                        data_sub_item_id[cnt][ORDERMADE_SUBMENU_CD] = [];
                        data_sub_count[cnt][ORDERMADE_SUBMENU_CD] = [];
                        
                        for(var type in mappingList){
                            for(var line in bf_order_map[key][type]){
                                // パスタが選択されている場合、専用のカレーソースに置換
                                if(line == '92003' && (bf_order_map[key]['rp']['26001'] != null || bf_order_map[key]['rp']['26002'] != null))
                                {
                                    data_sub_item_id[cnt][ORDERMADE_SUBMENU_CD].push('93001');
                                }else if(line == '15009' && (bf_order_map[key]['rp']['26001'] != null || bf_order_map[key]['rp']['26002'] != null)){
                                    data_sub_item_id[cnt][ORDERMADE_SUBMENU_CD].push('93002');
                                }else{
                                    data_sub_item_id[cnt][ORDERMADE_SUBMENU_CD].push(line);
                                }

                                data_sub_count[cnt][ORDERMADE_SUBMENU_CD].push(bf_order_map[key][type][line]["quantity"]);
                            }
                        }

                        // あさりと筍の炊き込みご飯ご飯のとききざみのり追加(※キッチンモニタに対する対策)
                        // 帆立と枝豆の炊き込みご飯も同様
                        rice_list_for_add_kizaminori = ['28007', '28008', '28009', '28010', '28011', '28012']
                        if(bf_order_map[key]['rp']['28007'] != null
                            || bf_order_map[key]['rp']['28008'] != null
                            || bf_order_map[key]['rp']['28009'] != null
                            || bf_order_map[key]['rp']['28010'] != null
                            || bf_order_map[key]['rp']['28011'] != null
                            || bf_order_map[key]['rp']['28012'] != null
                        ) {
                            data_sub_item_id[cnt][ORDERMADE_SUBMENU_CD].push("15025")
                            data_sub_count[cnt][ORDERMADE_SUBMENU_CD].push("1")
                        }
                            
                        if(bf_order_map[key]['rp']['28013'] != null
                            || bf_order_map[key]['rp']['28014'] != null
                            || bf_order_map[key]['rp']['28015'] != null
                        ) {
                            // きゅうりライタ 小カップ, パプリカパウダー, パセリ追加
                            data_sub_item_id[cnt][ORDERMADE_SUBMENU_CD].push("15030")
                            data_sub_count[cnt][ORDERMADE_SUBMENU_CD].push("1")

                            data_sub_item_id[cnt][ORDERMADE_SUBMENU_CD].push("15031")
                            data_sub_count[cnt][ORDERMADE_SUBMENU_CD].push("1")

                            data_sub_item_id[cnt][ORDERMADE_SUBMENU_CD].push("15032")
                            data_sub_count[cnt][ORDERMADE_SUBMENU_CD].push("1")
                        }
                    
                        if(Object.keys(data_sub_item_id[cnt][ORDERMADE_SUBMENU_CD]).length == 1){
                            // サブメニューが１件の場合、配列状態を解除
                            data_sub_item_id[cnt][ORDERMADE_SUBMENU_CD] = data_sub_item_id[cnt][ORDERMADE_SUBMENU_CD][0];
                            data_sub_count[cnt][ORDERMADE_SUBMENU_CD] = data_sub_count[cnt][ORDERMADE_SUBMENU_CD][0];
                        }
                    }
                    cnt = cnt + 1;
                }
                // } else {
                //     cnt = cnt + 1;
                // }
            }
        }
        // レジ袋の追加
        // ハンバーグ用
        // 枚数表示タグ取得
        var btnTxt1 = document.getElementById("s-dialog22_8").textContent;
        // 「枚」を除去
        var num1 = btnTxt1.replace(MSG_CART_28,'');
        // 数値取得
        num1 = parseInt(num1);
        if(num1 != 0){
            //  ハンバーグ用レジ袋が選択されている場合
            data_item_id[cnt] = HB_PLS_BAG_CODE;
            data_item_count[cnt] = num1;
            data_item_payment_type[cnt] = '0';
            cnt = cnt + 1;
        }
        // ドリンク・みそ汁用
        // 枚数表示タグ取得
        var btnTxt2 = document.getElementById("s-dialog22_9").textContent;
        // 「枚」を除去
        var num2 = btnTxt2.replace(MSG_CART_28,'');
        // 数値取得
        num2 = parseInt(num2);
        if(num2 != 0){
            //  ハンバーグ用レジ袋が選択されている場合
            data_item_id[cnt] = DM_PLS_BAG_CODE;
            data_item_count[cnt] = num2;
            data_item_payment_type[cnt] = '0';
            cnt = cnt + 1;
        }
        // 注文POST送信
        sendOrderPost(data_item_id,data_item_count,data_item_payment_type,data_sub_item_id,data_sub_count);
    } 
}

/**
 * オーダーメイドディッシュ完成商品画像POST送信処理
 * 　非同期通信で注文POSTを送信する
 */
function sendOrderMadeImgPost() {
    if(guiFlg == '1'){return;}
    var tmp_map = [];
    var numList = [];
    var cnt = 0;
    for(var bf in bf_order_map){
        numList = [];
        if(bf_order_map[bf]["orderMadeFlg"] == 1){
            for(var type in bf_order_map[bf]){
                if(type == "hb" || type == "tp" || type == "sc" || type == "rp" || type == "sr"){
                    for(var  line in bf_order_map[bf][type]){
                        // numList.push(line);
                        if(line == '92003' && (bf_order_map[bf]['rp']['26001'] != null || bf_order_map[bf]['rp']['26002'] != null)){
                            numList.push('93001');
                        }else if(line == '15009' && (bf_order_map[bf]['rp']['26001'] != null || bf_order_map[bf]['rp']['26002'] != null)){
                            numList.push('93002');
                        }else{
                            numList.push(line);
                        } 
                    
                    }
                }
            }

            // あさりと筍の炊き込みご飯ご飯のとききざみのり追加(※キッチンモニタに対する対策)
            // 帆立と枝豆の炊き込みご飯も同様
            if(bf_order_map[bf]['rp']['28007'] != null
                || bf_order_map[bf]['rp']['28008'] != null
                || bf_order_map[bf]['rp']['28009'] != null
                || bf_order_map[bf]['rp']['28010'] != null
                || bf_order_map[bf]['rp']['28011'] != null
                || bf_order_map[bf]['rp']['28012'] != null
            ){
                numList.push('15025');
            }

            if(bf_order_map[bf]['rp']['28013'] != null
            || bf_order_map[bf]['rp']['28014'] != null
            || bf_order_map[bf]['rp']['28015'] != null
            ) {
                // きゅうりライタ 小カップ, パプリカパウダー, パセリ追加
                numList.push("15030")
                numList.push("15031")
                numList.push("15032")
            }

            var goods_code = "";
            numList.sort();
            for(var list in numList){
                if(goods_code != ""){
                    goods_code += "_";
                }
                goods_code += zeroPadding(numList[list],8);
            }
            if(!(contains(ordmadeImg_json,"/"+goods_code+".png"))){
                tmp_map[cnt] = {};
                tmp_map[cnt]["code"] = goods_code;
                tmp_map[cnt]["img"] = bf_order_map[bf]["img"];
                cnt++;
                ordmadeImg_json = ordmadeImg_json+"/"+goods_code+".png";
            }
        }
    }
    if(tmp_map.length == 0){return;}
    
	$.when(
		$.ajax({
			type:'POST',
            url:PHP_EN_ROOT_FOLDER + '/sendOrdmadeImg.php',
			data:{datamap:tmp_map
				},
			success:function(data){
				// POST送信終了
                response_json = data;
			}
		})
	).done(function() {

	})
}

/**
 * 0埋め処理
 * @param 対象数値
 * @param 桁数
 */
function zeroPadding(num,length){
    return ('0000000000' + num).slice(-length);
}

/**
 * 注文POST送信処理
 * 　非同期通信で注文POSTを送信する
 * @param 注文商品配列
 * @param 注文商品数量配列
 * @param 支払種別配列
 */
function sendOrderPost(data_item_id,data_item_count,data_item_payment_type,data_sub_item_id,data_sub_count) {
    if(guiFlg == '1'){
        document.getElementById('loading').setAttribute("hidden","hidden");
        ordPostFlg = false;
        return;
    }
    // 非同期通信でPOSTを送信
    var response_json = null;

    var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
            timeoutFlg = true;

            document.getElementById('s-dialog2').innerHTML = E_9006;
            Data.data['scenes']['dialog2'].onEntry();
            
            // プログレスバー解除
            document.getElementById('loading').setAttribute("hidden","hidden");
            ordPostFlg = false;
		}
	},POST_TIMEOUT_TIME);

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
                sub_count:data_sub_count,
                slip_info:slipinfo
				},
			success:function(data){
				// POST送信終了
                response_json = data;
			}
		})
	).done(function() {
        if(!(timeoutFlg)){
            timeoutFlg = true;
            if(response_json != null){
                // 後続処理
                // 確定後オーダー用mapに登録する
                for (var successkey in response_json["result"]["success_item_list"]) {
                    // オーダーが通った商品コードを特定
                    var item_id = response_json["result"]["success_item_list"][successkey]["item_id"];
                    var targetBfkey = null;
                    for (var bfkey in bf_order_map) {
                        //オーダーが通った商品コードと紐づく、注文確認詳細行を特定
                        if(bf_order_map[bfkey]["nGoodsCode"] == item_id && bf_order_map[bfkey]["orderMadeFlg"] == 0){
                            // オーダーメイドディッシュ以外の場合
                                // オーダーメイド以外の場合
                                targetBfkey = bfkey;
                                // 特定した場合、ループ終了
                                // 後続処理で会計詳細に商品情報を移動する
                                break;
                        }else if(response_json["result"]["success_item_list"][successkey]["sub_list"] != null && bf_order_map[bfkey]["orderMadeFlg"] == 1){
                            // オーダーメイドディッシュの場合
                            // レスポンスの商品詳細
                            var itemDtl = response_json["result"]["success_item_list"][successkey];
                            // 同一商品フラグ
                            var sameFlg = true;
                            // 商品詳細一致フラグ
                            var detailCheckFlg = false;
                            for (type　in mappingList){
                                if(detailCheckFlg){break;}
                                for (line in bf_order_map[bfkey][type]){
                                    if(detailCheckFlg){break;}
                                    detailCheckFlg = false;
                                    for(subLine in itemDtl["sub_list"]){
                                        if(itemDtl["sub_list"][subLine]["sub_item"][0]["item_id"] == bf_order_map[bfkey][type][line]["nGoodsCode"]
                                        && itemDtl["sub_list"][subLine]["sub_item"][0]["item_count"] == bf_order_map[bfkey][type][line]["quantity"]){
                                            detailCheckFlg = true;
                                            break;
                                        }
                                    }
                                    if((!detailCheckFlg)){
                                        // 詳細が一致する商品が見つからなかった場合、別商品判定
                                        sameFlg = false;
                                    }
                                }
                            }
                            if(sameFlg){
                                targetBfkey = bfkey;
                                // 特定した場合、ループ終了
                                // 後続処理で会計詳細に商品情報を移動する
                                break;
                            }else{
                                // 特定できない場合、注文失敗と判定し注文内容に残す
                                continue;
                            }
                        }
                    }

                    var findFlg = false;
                    delete bf_order_map[targetBfkey];
                }

                if(response_json["result"] == ""
                ||  (response_json["result"]["over_item_list"].length != 0
                || response_json["result"]["failure_item_list"].length != 0
                || response_json["result"]["empty_item_list"].length != 0)){
                    // 注文POSTのレスポンスに、異常があった場合
                    //注文確認画面をリフレッシュ
                    createTag(1,null);
                    // 注文失敗ダイアログ表示
                    Data.data['scenes']['dialog2'].onEntry();

                }else{
                    // 精算機起動時の処理
                    if(regFlg == '1'){
                        // ユニークIDを精算機に渡す
                        notifySlip(slipinfo);
                        return;
                    }

                    // 確定前オーダー用mapを空にする
                    bf_order_map = {};
                    // 注文カゴを空にする
                    var parent = document.getElementById('cart_list');
                    var child = parent.getElementsByTagName('tr');
                    for (var i=child.length; i>0; i--) {
                        parent.removeChild(child[i-1]);
                    }
                    // 注文カゴ内の合計数量をクリア
                    ordQuantity = 0;

                    // 注文確定ボタンを非活性にする
                    document.getElementById('ord_fix').setAttribute('onclick','');

                    // 注文カートの合計金額をクリア
                    ordCrtTtlPrice = 0;
                    document.getElementById('cart_price').innerHTML = ordCrtTtlPrice;

                    // アイコンバッジ更新
                    iconRef("clear");

                    // お会計ボタンを有効にする
                    document.getElementById('footer_4').setAttribute('onclick', 'touch(); getAccountInfoPost(1);');
                    document.getElementById('home_btn3').setAttribute('onclick', 'touch(); getAccountInfoPost(1);');

                    // 注文確定処理が正常終了した場合、確認ポップアップ表示後にTOPに遷移
                    location.href = '#root/home';
                    ordEndPop();

                    // ごいっしょにいかがですか情報登録
                    var tmp_with_goods_ope_map = jQuery.extend(true, {}, with_goods_ope_map);
                    withGoodsPost(tmp_with_goods_ope_map);
                    // ごいっしょにいかがですか情報リセット
                    with_goods_ope_map = [];
                }
            }
            // プログレスバー解除
            document.getElementById('loading').setAttribute("hidden","hidden");
            ordPostFlg = false;

            outOparationLog("注文確定処理終了");
        }else{
            timeoutFlg = true;
        }
	})
}

/**
 * 注文エラープッシュ通知処理
 * @param リクエスト
 * 　※サンプル {"command": "ORDER_FAIL_NOTIFY","req_time": "2012/09/26 10:01:15","option": {"order_num": "A-001","is_basket_clear": true,"success_item_list": [{"item_id": "item_005","item_count": 1,"item_payment_type": 1,"sub_list": [{"sub_id": "sub_menu_001","sub_item": {"item_id": "sub_item_001","item_count": 1}}]}],"failure_item_list": [{"item_id": "item_006","item_count": 4,"item_payment_type": 0,"sub_list": [{"sub_id": "sub_menu_001","sub_item": {"item_id": "sub_item_001","item_count": 1}}]}],"empty_item_list": [{"item_id": "item_007","item_count": 3,"item_payment_type": 0,"sub_list": [{"sub_id": "sub_menu_002","sub_item": {"item_id": "sub_item_002","item_count": 1}}]}]}}
 */
function pushOrdErr(request){
    // // 注文失敗ダイアログ表示
}

var postParent = function(info){
    window.parent.postMessage(info,'*');
}
var notifySlip = function(slipinfo){
    var info = {
        'message_id': 'notify_slipinfo',
        'message_body': slipinfo
    };
   postParent(info);
}

/**
 * カート内テイクアウト商品チェック処理
 * @return true：テイクアウトあり、false:テイクアウトなし
 */
function cartTakeoutCheck(){
    var takeoutFlg = false;
    for (var oc in bf_order_map) {
        if(all_m_goods_map[bf_order_map[oc]["goodsData"]["nGoodsCode"]]["byTakeoutDefaultType"] == "2"){
            takeoutFlg = true;
            break;
        }
    }
    return takeoutFlg;
}

/**
 * ご一緒にいかがですか商品情報送信処理
 */
function withGoodsPost(tmp_with_goods_ope_map){
    // var timeoutFlg = false;
    
    // インサートデータフォーマット
    var sendFormat = "((select CASE WHEN COUNT(nWithGoodsSelectCode) = 0 THEN 1 ELSE MAX(nWithGoodsSelectCode) + 1 END from t_withgoodsselect as tmp)"
    +",'{nTableCode}',{nManageDate},cast('{tOperationTime}' as datetime),{nMenuBookCode},{nParent},{nGoodsCode},{nUnitCost},{nSelectCount},{nCount},cast('{tCreateTime}' as datetime),cast('{tUpdateTime}' as datetime),'en_order','en_order')";
    // 現在日時を取得
    var currentDateTime = new Date();
    var currentDateTimeStr = currentDateTime.getFullYear()+'-'+(currentDateTime.getMonth()+1)+'-'+currentDateTime.getDate()
                    +' '+currentDateTime.getHours()+':'+currentDateTime.getMinutes()+':'+currentDateTime.getSeconds();

    // 送信データ
    var sendData = "";

    // データ編集
    for(var wg in tmp_with_goods_ope_map) {
        sendData += sendFormat.replace("{nTableCode}",tmp_with_goods_ope_map[wg]["nTableCode"])
                            .replace("{nManageDate}",tmp_with_goods_ope_map[wg]["nManageDate"])
                            .replace("{tOperationTime}",tmp_with_goods_ope_map[wg]["nOperationTime"])
                            .replace("{nMenuBookCode}",tmp_with_goods_ope_map[wg]["nMenuBookCode"])
                            .replace("{nParent}",tmp_with_goods_ope_map[wg]["nParent"])
                            .replace("{nGoodsCode}",tmp_with_goods_ope_map[wg]["nGoodsCode"])
                            .replace("{nUnitCost}",tmp_with_goods_ope_map[wg]["nUnitCost"])
                            .replace("{nSelectCount}",tmp_with_goods_ope_map[wg]["nSelectCount"])
                            .replace("{nCount}",tmp_with_goods_ope_map[wg]["nCount"])
                            .replace("{tCreateTime}",currentDateTimeStr)
                            .replace("{tUpdateTime}",currentDateTimeStr);
        // カンマ付与
        sendData += ",";
    }
    // 最終行のカンマ削除
    sendData = sendData.slice(0,-1);

    // 対象０件の場合、終了
    if(sendData == ""){
        // timeoutFlg = true;
        return;
    }

	// 非同期通信で情報を取得
	$.when(
		$.ajax({
			type:'POST',
            url:PHP_EN_ROOT_FOLDER + '/sendWithGoodsSelect.php',
            data:{
                insertData:sendData
            },
			success:function(data){
				// メニューブックマスタ取得
				response_json = data;
				data = null;
			}
		})
	).done(function() {
		if(!(response_json == false || contains(response_json,CONNECT_ERR_MSG))){
			// timeoutFlg = true;
			// 非同期通信の完了を監視

		}else{
			// timeoutFlg = true;
		}
	})
}
