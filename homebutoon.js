function editHomeGoods(layoutInfo) {

}

function editHomeOtherBtn(layoutInfo) {
  var homeDisp = document.getElementById("levelItem_10000_1");
  var new_btn = createNewAnchorAtHome();
  setSoldOutIconCss(layoutInfo);
  setBtnStyle(new_btn, layoutInfo);

  setLevelButtonCss(layoutInfo);
  homeDisp.appendChild(new_anchor);
}


function createNewAnchorAtHome(layoutInfo) {
  var new_anchor = document.createElement("a");
  new_anchor.classList.add("level_so_"+layoutInfo['nHierarchyCode']);
  
  new_anchor.classList.add(MSG_CSS_LANG);

  new_anchor.href = "javascript:void(0)";
  new_anchor.style.display = "block";
  new_anchor.style.position = "absolute";
  new_anchor.style.zIndex = 1;
  new_anchor.id = "levelItem_"+layoutInfo['nDispId']+"_"+layoutInfo['nItemId'];
  new_anchor.classList.add("levelItems");

  var defaultImagePath = layoutInfo['cDefaultImagePath'];
  
  if (defaultImagePath != null && defaultImagePath != "") {
    var new_anchor_img = document.createElement("img");
    new_anchor_img.src = lis_fact_map[generateLangImgPath(defaultImagePath)];
    new_anchor.appendChild(new_anchor_img);
  }
        
  // ボタンサイズ　スケール値化 
  var size = parseInt(layoutInfo["nDispSize"+MSG_CSS_LANG]) * 0.01;
  new_anchor.setAttribute("size",size);

  return new_anchor;
}

function editHomeOtherBtnAndGoods(layoutInfo) {
  var new_btn = document.createElement("a");
  new_btn.classList.add("level_so_"+layoutInfo["nHierarchyCode"]);
  
  new_btn.classList.add(MSG_CSS_LANG);
  setSoldOutIconCss(layoutInfo);

  var nDispType = layoutInfo["nDispType"];

  if (nDispType == DISP_TYPE_MAP['goods']) {
    new_btn.classList.add("level_goods");
    new_btn.setAttribute("goodsCd",layoutInfo["nGoodsCode"]);
    // 商品ボタンの場合
    // オーダーメイド化設定のチェック
    var ordmadeGoodsFlg = false;
    var tgtBasedishcomboKey = "";

      
    if (ordmadeGoodsFlg == true) {
      var ordCd = tgtBasedishcomboKey;
      // オーダーメイド設定ありの場合
      // ハンバーグの品切れチェック
      var hbSoldOutFlg = false;

      if (m_basedishcombo_map[ordCd]["nHamburgGoodsCode"] != null) {
        if (m_goods_map[m_basedishcombo_map[ordCd]["nHamburgGoodsCode"]] == null || 
          m_goods_map[m_basedishcombo_map[ordCd]["nHamburgGoodsCode"]]["bySalesStatusType"] == '2')
        {
          hbSoldOutFlg = true;
        }
      }

      // トッピングの品切れチェック
      var tpSoldOutFlg = false;
      if (m_basedishcombo_map[ordCd]["nToppingGoodsCode"] != null) {
        if (m_goods_map[m_basedishcombo_map[ordCd]["nToppingGoodsCode"]] == null || 
          m_goods_map[m_basedishcombo_map[ordCd]["nToppingGoodsCode"]]["bySalesStatusType"] == '2')
        {
          tpSoldOutFlg = true;
        }
      }

      // ソースの品切れチェック
      var scSoldOutFlg = false;
      if (m_basedishcombo_map[ordCd]["nSourceGoodsCode"] != null) {
        if (m_goods_map[m_basedishcombo_map[ordCd]["nSourceGoodsCode"]] == null || 
          m_goods_map[m_basedishcombo_map[ordCd]["nSourceGoodsCode"]]["bySalesStatusType"] == '2')
        {
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
          new_btn.classList.add("off");
        }

        new_btn.setAttribute('onclick','touch(); orderMadeDishBaseSelectCheck('+tgtBasedishcomboKey+');createOerderDish('+tgtBasedishcomboKey+');');
      } else {
        if (layoutInfo["nDispType"] == 5
        && m_goods_map[layoutInfo["nGoodsCode"]] == null) 
        {
          // 商品情報がない場合準備中アイコン有効化
          new_btn.classList.add("comsoon");
          new_btn.classList.add("off");
        } else if (layoutInfo["nDispType"] == 5
        && m_goods_map[layoutInfo["nGoodsCode"]]["bySalesStatusType"] == "2") 
        {
          // 品切れの場合、品切れ表示
          new_btn.classList.add("off");
        }
        new_btn.setAttribute("onclick","touch();dispLevelPopup("+layoutInfo["nGoodsCode"]+")");
      }

  }

  if (nDispType == DISP_TYPE_MAP['button']) {
    new_btn.classList.add("level_move");
    new_btn.setAttribute("goodsCd",layoutInfo["nSoldOutIcon_condition_cd"]);
    new_btn.setAttribute("goodsType",layoutInfo["nSoldOutIcon_condition_type"]);
    // 画面切替ボタンの場合
    var detailDispType = detailDispTypeMap[layoutInfo["nMenuBookCode"]+"_"+layoutInfo["nAfDispId"]];
    if(detailDispType == DETAIL_DISP_TYPE_MAP['hierarchy']){
      // 画面遷移ボタンの場合
      var onClickString = "";

      var cngLevelString = "cngLevel = " +layoutInfo['nAfDispId']+ ";";
      onClickString += cngLevelString;

      var touchString = "touch();"
      onClickString += touchString;

      var onEntryString = "Data.data['scenes']['level'].onEntry(300);";
      onClickString += onEntryString;

      var checkHierarchyCodeString = "checkHierarchyCode(" + layoutInfo['nHierarchyCode'] + ");";
      onClickString += checkHierarchyCodeString;

      new_btn.setAttribute("onclick", onClickString);

      // "準備中です"表示判定実施
      var comingSoonFlg = true;

      var goodsTypes = layoutInfo['nSoldOutIcon_condition_type'];
      
      comingSoonFlg = checkComingSoonByGoodsType(goodsTypes);

      var goodsCds = layoutInfo['nSoldOutIcon_condition_cd'];

      comingSoonFlg = checkComingSoonByGoodsCode(goodsCds);

      if (comingSoonFlg) {
        // 準備中アイコン有効化
        new_btn.classList.add("comsoon");
        new_btn.classList.add("off");
      }
          // allGoodsMenutypes
    } else {
        // 商品詳細表示ボタンの場合
        new_btn.setAttribute("onclick","touch();levelDispGoodsDetail("+layoutInfo['nAfDispId']+");");
        // "準備中です"表示判定実施
        var comsoonFlg = true;
        if (layoutInfo['nSoldOutIcon_condition_type'] != "") {
          // 商品区分のチェック
          var comsoonTypeMap = layoutInfo['nSoldOutIcon_condition_type'].split(',');

          for (var tp in comsoonTypeMap) {
            if (allGoodsMenutypes[comsoonTypeMap[tp]] != null) {
              // 該当する商品区分の商品が１つでもあったら、非準備中
              comsoonFlg = false;
            }
          }
      }
          
      if (layoutInfo['nSoldOutIcon_condition_cd'] != "") {
        // 商品コードのチェック
        var comsoonGoodsMap = layoutInfo['nSoldOutIcon_condition_cd'].split(',');
        for (var tp in comsoonGoodsMap) {
          if (m_goods_map[comsoonGoodsMap[tp]] != null && m_goods_map[comsoonGoodsMap[tp]]["bySalesStatusType"] != "2") {
              // 商品情報がありかつ、販売可能な商品が１つでもあったら、非準備中
              comsoonFlg = false;
          }
        }
      }

      if (layoutInfo['nSoldOutIcon_condition_type'] == "" 
        && layoutInfo['nSoldOutIcon_condition_cd'] == "")
      {
        // 単に設定がない場合は、非準備中判定
        comsoonFlg = false;
      }
      
      if (comsoonFlg) {
        // 準備中アイコン有効化
        new_btn.classList.add("comsoon");
        new_btn.classList.add("off");
      }
    }
  }
    
    new_btn.href = "javascript:void(0)";
    new_btn.style.display = "block";
    new_btn.style.position = "absolute";
    new_btn.style.zIndex = 1;
    new_btn.id = "levelItem_"+layoutInfo["nDispId"]+"_"+layoutInfo["nItemId"];
    new_btn.classList.add("levelItems");
 
    setBtnStyle(new_btn, layoutInfo);
  
    if (layoutInfo["cDefaultImagePath"] != null 
    && layoutInfo["cDefaultImagePath"] != "")
    {
      var new_btn_img = document.createElement("img");
      new_btn_img.src = lis_fact_map[generateLangImgPath(layoutInfo["cDefaultImagePath"])];
      new_btn.appendChild(new_btn_img);
    }
        
    homeDisp.appendChild(new_btn);

    // ボタンサイズ　スケール値化
    var size = parseInt(layoutInfo["nDispSize"+MSG_CSS_LANG]) * 0.01;
    new_btn.setAttribute("size",size);
  
    if (nDispType == DISP_TYPE_MAP['button']) {
      setLevelButtonCss(
        layoutInfo["nDispId"],
        layoutInfo["nItemId"],
        size
      );
    }
}  


function setLevelButtonCss(layoutInfo) {
  var dispId = layoutInfo['nDispId'];
  var itemId = layoutInfo['nItemId'];
  var size = parseInt(layoutInfo["nDispSize"+MSG_CSS_LANG]) * 0.01;
  // ボタン通常時サイズ
  var dfcss = '#'+"levelItem_"+dispId+"_"+itemId+'{transform: scale('+size+');transition-duration: .3s}';
  var dfstyle = document.createElement('style');
  dfstyle.appendChild(document.createTextNode(dfcss));
  document.getElementsByTagName('head')[0].appendChild(dfstyle);
  
  // ボタン拡大時サイズ
  var css = '#'+"levelItem_"+dispId+"_"+itemId+':hover{transform: scale('+size*1.05+');transition-duration: .3s}';
  var style = document.createElement('style');
  style.appendChild(document.createTextNode(css));
  document.getElementsByTagName('head')[0].appendChild(style);
}


function checkOrderMade(layoutInfo) {
  var ordmadeGoodsFlg = false;
  var tgtBasedishcomboKey = "";
  for (var mbm in m_basedishcombo_map) {
    if (m_basedishcombo_map[mbm]["nGoodsCode"] == layoutInfo["nGoodsCode"]) {
      additionMessage("[OrderMade?]", layoutInfo["nGoodsCode"] + ": オーダーメイド商品");
      ordmadeGoodsFlg = true;
      tgtBasedishcomboKey = mbm;
      break;
    }
  }

    if (layoutInfo["nDispType"] == 5 
      && (m_goods_map[layoutInfo["nGoodsCode"]] == null 
        || m_goods_map[layoutInfo["nGoodsCode"]]["bySalesStatusType"] == '2'))
    {
      // ベース商品の情報がそもそもない場合
      ordmadeGoodsFlg = false;
      additionMessage("[OrderMade?]", layoutInfo["nGoodsCode"] + ": オーダーメイド商品:False");
    }
  
  return [ordmadeGoodsFlg, tgtBasedishcomboKey];
}