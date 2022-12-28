
function editLayoutInfo() {
  startMeasuringElapsedTime("editLayoutInfoStart");
  outOparationLog("レイアウト調整情報反映処理開始");

  initLayout();

  var dispTypeMap = makeDispTypeMap();
  //var nTypeMap = {}; ↑に変更
  // 初回さんドリンクバーフラグ
  var fstSidekinFlg = true;

  for (var info of layoutInfo_map) {
    if(info["nMenuBookCode"] != menubook_cd && info["nMenuBookCode"] != MENUBOOK_ALL){
      // 対象メニューブック以外スキップ
      continue;
    }
    if(info["nDispId"] == HOME_DISP_ID) {
      // TOP画面の場合
      editHomeDispLayout(info);
    } else if(info["nDispId"] == PEOPLE_DISP_ID && (!fstCreateFlg || guiFlg == "1")){
      // 人数入力画面の場合　※アプリ起動時の初回のみ　※設定ツール起動の場合は毎回処理
      var peopleDisp = document.getElementById("peopleDisp");
      if(info["nDispType"] == 3){
        // 画像の場合
        var new_img = document.createElement("img");
        // 選択中言語の画像をセット
        new_img.src = lis_fact_map[generateLangImgPath(info["cDefaultImagePath"])];

        new_img.style.display = "block";
        new_img.style.position = "absolute";
        new_img.id = "levelItem_"+info["nDispId"]+"_"+info["nItemId"];
        new_img.classList.add("peopleAddItems");

        if(info["nDispFlg"] == 0){
          // 表示無効の場合
          new_img.style.display = "none";
        } else {
          new_img.style.display = "block";
        }

        // 高さ
        new_img.style.height = info["nHeight"+MSG_CSS_LANG]+DISP_UNIT;
        // 幅
        new_img.style.width = info["nWidth"+MSG_CSS_LANG]+DISP_UNIT;
        // Y軸
        new_img.style.top = info["nDispPosition_Y"+MSG_CSS_LANG]+DISP_UNIT;
        // X軸
        new_img.style.left = info["nDispPosition_X"+MSG_CSS_LANG]+DISP_UNIT;

        // 表示サイズ
        var size = parseInt(info["nDispSize"+MSG_CSS_LANG]) * 0.01;
        new_img.style.transform = "scale("+size+", "+size+")";
        new_img.setAttribute("size",size);

        peopleDisp.appendChild(new_img);

      } else if(info["nDispType"] == 4){
        // 背景の場合
        var new_bg_img = document.createElement("img");
        new_bg_img.id = "levelItem_"+info["nDispId"]+"_"+info["nItemId"];
        new_bg_img.style.width = "100%";
        new_bg_img.style.height = "100%";
        new_bg_img.src = lis_fact_map[generateLangImgPath(info["cDefaultImagePath"])];
        new_bg_img.classList.add("peopleAddItems");
        peopleDisp.appendChild(new_bg_img);
      }

    } else if(info["nDispId"] == ORD_FIX_DISP_ID){
      // 注文確定画面の場合
      if(info["nDispType"] == 4){
        // 背景の場合
        var new_bg_img = document.getElementById("ord-fix-bg");
        new_bg_img.style.width = "100%";
        new_bg_img.style.height = "100%";
        //new_bg_img.style.backgroundImage = "url(./"+lis_fact_map[generateLangImgPath(info["cDefaultImagePath"])]+")";
        new_bg_img.style.backgroundImage = lis_fact_map[generateLangImgPath(info["cDefaultImagePath"])];
      } else if(info["nDispType"] == 10){
        // 遷移先候補画面の場合
        ordFixAfDispList = [];
        for(var f1 = 1;f1 <= 5;f1++){
          if(info["nAfDispId"+f1] != "-1"){
            ordFixAfDispList[info["nAfDispId"+f1]] = "";
          }
        }
        
      }
    } else {
      // 階層画面の場合
      var createId = "level-"+info["nDispId"];
      var homeDisp = null;
      var tgtElem = document.getElementById(createId);
      if(tgtElem == null){
        // 画面タグがまだない場合、作成
        homeDisp = document.createElement("div");
        homeDisp.id = "level-"+info["nDispId"];
        homeDisp.classList.add("levels");
        homeDisp.classList.add("is-hide");
        homeDisp.style.width = "100%";
        homeDisp.style.height = "100%";
        document.getElementById("levelAll").appendChild(homeDisp);
      } else {
        // 既にある場合、取得
        homeDisp = tgtElem;
      }
      if(info["nDispType"] == 1 || info["nDispType"] == 5){
        // ボタンの場合
        var new_btn = document.createElement("a");
        // メモ：階層遷移ボタンにも品切れ&準備中表示が必要となったため、判定名称を商品コード⇒階層マスタキー値に変更
        new_btn.classList.add("level_so_"+info["nHierarchyCode"]);

        if(info["nDispType"] == 5){
          new_btn.classList.add("level_goods");
          new_btn.setAttribute("goodsCd",info["nGoodsCode"]);
        }
        if(info["nDispType"] == 1){
          new_btn.classList.add("level_move");
          new_btn.setAttribute("goodsCd",info["nSoldOutIcon_condition_cd"]);
          new_btn.setAttribute("goodsType",info["nSoldOutIcon_condition_type"]);
        }

        new_btn.classList.add(MSG_CSS_LANG);

        // 品切れアイコンサイズ位置
        var css = ".levelItems.off.level_so_"+info["nHierarchyCode"]
              +'::before{left:'+info["nSoldOutIcon_X"]+'px;top:'+info["nSoldOutIcon_Y"]
              +'px;width:'+info["nSoldOutIcon_width"]+'%;height:'+info["nSoldOutIcon_height"]
              +'%;border-radius:'+info["nSoldOutIcon_radius"]+'px;}';
        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.getElementsByTagName('head')[0].appendChild(style);

        var cssAf = ".levelItems.off.level_so_"+info["nHierarchyCode"]
              +'::after{left:'+info["nSoldOutIcon_X"]+'px;width:'+info["nSoldOutIcon_width"]+'%;}';
        var styleAf = document.createElement('style');
        styleAf.appendChild(document.createTextNode(cssAf));
        document.getElementsByTagName('head')[0].appendChild(styleAf);

        if(info["nDispType"] == 1){
          // 画面切替ボタンの場合
          if(nTypeMap[info["nMenuBookCode"]+"_"+info["nAfDispId"]] == 5){
            // 画面遷移ボタンの場合
            new_btn.setAttribute("onclick","cngLevel = "+info['nAfDispId']+";touch();Data.data['scenes']['level'].onEntry(300); checkHierarchyCode("+info['nHierarchyCode']+");");

            // "準備中です"表示判定実施
            var comsoonFlg = true;
            if(info['nSoldOutIcon_condition_type'] != ""){
              // 商品区分のチェック
              var comsoonTypeMap = info['nSoldOutIcon_condition_type'].split(',');
              for(var tp in comsoonTypeMap){
                if(allGoodsMenutypes[comsoonTypeMap[tp]] != null){
                  // 該当する商品区分の商品が１つでもあったら、非準備中
                  comsoonFlg = false;
                }
              }
            }
            if(info['nSoldOutIcon_condition_cd'] != ""){
              // 商品コードのチェック
              var comsoonGoodsMap = info['nSoldOutIcon_condition_cd'].split(',');
              for(var tp in comsoonGoodsMap){
                if(m_goods_map[comsoonGoodsMap[tp]] != null && m_goods_map[comsoonGoodsMap[tp]]["bySalesStatusType"] != "2"){
                  // 商品情報がありかつ、販売可能な商品が１つでもあったら、非準備中
                  comsoonFlg = false;
                }
              }
            }
            if(info['nSoldOutIcon_condition_type'] == "" && info['nSoldOutIcon_condition_cd'] == ""){
              // 単に設定がない場合は、非準備中判定
              comsoonFlg = false;
            }
            if(comsoonFlg){
              // 準備中アイコン有効化
              new_btn.classList.add("comsoon");
              new_btn.classList.add("off");
            }
          } else if(nTypeMap[info["nMenuBookCode"]+"_"+info["nAfDispId"]] != 5
          && nTypeMap[info["nMenuBookCode"]+"_"+info["nAfDispId"]] != 0){
            // 商品詳細表示ボタンの場合
            new_btn.setAttribute("onclick","touch();levelDispGoodsDetail("+info['nAfDispId']+");");
            // "準備中です"表示判定実施
            var comsoonFlg = true;
            if(info['nSoldOutIcon_condition_type'] != ""){
              // 商品区分のチェック
              var comsoonTypeMap = info['nSoldOutIcon_condition_type'].split(',');
              for(var tp in comsoonTypeMap){
                if(allGoodsMenutypes[comsoonTypeMap[tp]] != null){
                  // 該当する商品区分の商品が１つでもあったら、非準備中
                  comsoonFlg = false;
                }
              }
            }
            if(info['nSoldOutIcon_condition_cd'] != ""){
              // 商品コードのチェック
              var comsoonGoodsMap = info['nSoldOutIcon_condition_cd'].split(',');
              for(var tp in comsoonGoodsMap){
                if(m_goods_map[comsoonGoodsMap[tp]] != null && m_goods_map[comsoonGoodsMap[tp]]["bySalesStatusType"] != "2"){
                  // 商品情報がありかつ、販売可能な商品が１つでもあったら、非準備中
                  comsoonFlg = false;
                }
              }
            }
            if(info['nSoldOutIcon_condition_type'] == "" && info['nSoldOutIcon_condition_cd'] == ""){
              // 単に設定がない場合は、非準備中判定
              comsoonFlg = false;
            }
            if(comsoonFlg){
              // 準備中アイコン有効化
              new_btn.classList.add("comsoon");
              new_btn.classList.add("off");
            }
          }
        } else if(info["nDispType"] == 5) {
          // 商品ボタンの場合
          // オーダーメイド化設定のチェック
          var ordmadeGoodsFlg = false;
          var tgtBasedishcomboKey = "";
          for(var mbm in m_basedishcombo_map){
            if(m_basedishcombo_map[mbm]["nGoodsCode"] == info["nGoodsCode"]){
              additionMessage("[OrderMade?]", info["nGoodsCode"] + ": オーダーメイド商品");
              ordmadeGoodsFlg = true;
              tgtBasedishcomboKey = mbm;
              break;
            }
          }
          if(info["nDispType"] == 5 && (m_goods_map[info["nGoodsCode"]] == null || m_goods_map[info["nGoodsCode"]]["bySalesStatusType"] == '2')){
            // ベース商品の情報がそもそもない場合
            ordmadeGoodsFlg = false;
            additionMessage("[OrderMade?]", info["nGoodsCode"] + ": オーダーメイド商品:False");
          }
          if(ordmadeGoodsFlg == true){
            var ordCd = tgtBasedishcomboKey;
            // オーダーメイド設定ありの場合
            // ハンバーグの品切れチェック
            var hbSoldOutFlg = false;
            if(m_basedishcombo_map[ordCd]["nHamburgGoodsCode"] != null){
              if(m_goods_map[m_basedishcombo_map[ordCd]["nHamburgGoodsCode"]] == null || 
                m_goods_map[m_basedishcombo_map[ordCd]["nHamburgGoodsCode"]]["bySalesStatusType"] == '2'){
                hbSoldOutFlg = true;
              }
            }
            // トッピングの品切れチェック
            var tpSoldOutFlg = false;
            if(m_basedishcombo_map[ordCd]["nToppingGoodsCode"] != null){
              if(m_basedishcombo_map[ordCd]["nToppingGoodsCode"] == 15028){
                if(m_goods_map[m_basedishcombo_map[ordCd]["15001"]] == null || 
                  m_goods_map[m_basedishcombo_map[ordCd]["15001"]]["bySalesStatusType"] == '2'){
                  tpSoldOutFlg = true;
                }

                if(m_goods_map[m_basedishcombo_map[ordCd]["15006"]] == null || 
                  m_goods_map[m_basedishcombo_map[ordCd]["15006"]]["bySalesStatusType"] == '2'){
                  tpSoldOutFlg = true;
                }
                tpSoldOutFlg = false;

              } else {
                if(m_goods_map[m_basedishcombo_map[ordCd]["nToppingGoodsCode"]] == null || 
                  m_goods_map[m_basedishcombo_map[ordCd]["nToppingGoodsCode"]]["bySalesStatusType"] == '2'){
                  tpSoldOutFlg = true;
                }
              }
            }
            // ソースの品切れチェック
            var scSoldOutFlg = false;
            if(m_basedishcombo_map[ordCd]["nSourceGoodsCode"] != null){
              if(m_goods_map[m_basedishcombo_map[ordCd]["nSourceGoodsCode"]] == null || 
                m_goods_map[m_basedishcombo_map[ordCd]["nSourceGoodsCode"]]["bySalesStatusType"] == '2'){
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
            if(info["nDispType"] == 5 && m_goods_map[info["nGoodsCode"]] == null){
              // 商品情報がない場合準備中アイコン有効化
              new_btn.classList.add("comsoon");
              new_btn.classList.add("off");
            }
            else if(info["nDispType"] == 5 && m_goods_map[info["nGoodsCode"]]["bySalesStatusType"] == "2"){
              // 品切れの場合、品切れ表示
              new_btn.classList.add("off");
            }
            new_btn.setAttribute("onclick","touch();dispLevelPopup("+info["nGoodsCode"]+")");
          }

        }
        new_btn.href = "javascript:void(0)";

        new_btn.style.display = "block";
        new_btn.style.position = "absolute";
        new_btn.style.zIndex = 1;
        new_btn.id = "levelItem_"+info["nDispId"]+"_"+info["nItemId"];
        new_btn.classList.add("levelItems");

        if(info["nDispFlg"] == 0){
          // 表示無効の場合
          new_btn.style.display = "none";
        } else {
          new_btn.style.display = "block";
        }

        // 高さ
        new_btn.style.height = info["nHeight"+MSG_CSS_LANG]+DISP_UNIT;
        // 幅
        new_btn.style.width = info["nWidth"+MSG_CSS_LANG]+DISP_UNIT;
        // Y軸
        new_btn.style.top = info["nDispPosition_Y"+MSG_CSS_LANG]+DISP_UNIT;
        // X軸
        new_btn.style.left = info["nDispPosition_X"+MSG_CSS_LANG]+DISP_UNIT;

        if(info["cDefaultImagePath"] != null && info["cDefaultImagePath"] != ""){

          var new_btn_img = document.createElement("img");
          new_btn_img.src = lis_fact_map[generateLangImgPath(info["cDefaultImagePath"])];
          new_btn.appendChild(new_btn_img);
        }
          homeDisp.appendChild(new_btn);


        // ボタンサイズ　スケール値化
        var size = parseInt(info["nDispSize"+MSG_CSS_LANG]) * 0.01;
        new_btn.setAttribute("size",size);

        if(info["nDispType"] == 1) {
          // 画面遷移ボタンの場合
          // ボタン通常時サイズ
          var dfcss = '#'+"levelItem_"+info["nDispId"]+"_"+info["nItemId"]+'{transform: scale('+size+');transition-duration: .3s}';
          var dfstyle = document.createElement('style');
          dfstyle.appendChild(document.createTextNode(dfcss));
          document.getElementsByTagName('head')[0].appendChild(dfstyle);

          // ボタン拡大時サイズ
          var css = '#'+"levelItem_"+info["nDispId"]+"_"+info["nItemId"]+':hover{transform: scale('+size*1.05+');transition-duration: .3s}';
          var style = document.createElement('style');
          style.appendChild(document.createTextNode(css));
          document.getElementsByTagName('head')[0].appendChild(style);
        }

        // 透過率
        new_btn.style.opacity = info["dOpacity"];
      } else if(info["nDispType"] == 2){
        // テキスト文言の場合
        var new_txt = document.createElement("div");
        // 選択中言語のテキストをセット
        new_txt.innerHTML = info["cText"+MSG_CSS_LANG];

        new_txt.style.display = "block";
        new_txt.style.position = "absolute";
        if(info["nVerticalFlg"] == "1"){
          // 縦文字設定の場合
          new_txt.style.writingMode = "vertical-rl";
          new_txt.style.textOrientation = "upright";
        }
        new_txt.id = "levelItem_"+info["nDispId"]+"_"+info["nItemId"];
        new_txt.classList.add("levelItems");

        if(info["nItalic"+MSG_CSS_LANG] == 1){
          // 斜体ONの場合
          new_txt.style.fontStyle = "italic";
        } else {
          new_txt.style.fontStyle = "";
        }

        if(info["nDispFlg"] == 0){
          // 表示無効の場合
          new_txt.style.display = "none";
        } else {
          new_txt.style.display = "block";
        }

        // フォントサイズ
        new_txt.style.fontSize = info["nFontSize"+MSG_CSS_LANG]+DISP_UNIT;
        // フォントカラー
        new_txt.style.color = info["cColor"+MSG_CSS_LANG];
        // フォント太さ
        new_txt.style.fontWeight = info["nFontWeight"+MSG_CSS_LANG];

        // 高さ
        new_txt.style.height = info["nHeight"+MSG_CSS_LANG]+DISP_UNIT;
        // 幅
        new_txt.style.width = info["nWidth"+MSG_CSS_LANG]+DISP_UNIT;
        // Y軸
        new_txt.style.top = info["nDispPosition_Y"+MSG_CSS_LANG]+DISP_UNIT;
        // X軸
        new_txt.style.left = info["nDispPosition_X"+MSG_CSS_LANG]+DISP_UNIT;
        homeDisp.appendChild(new_txt);

      } else if(info["nDispType"] == 3){
        // 画像の場合
        var new_img = document.createElement("img");
        // 選択中言語の画像をセット
        new_img.src = lis_fact_map[generateLangImgPath(info["cDefaultImagePath"])];

        new_img.style.display = "block";
        new_img.style.position = "absolute";
        new_img.id = "levelItem_"+info["nDispId"]+"_"+info["nItemId"];
        new_img.classList.add("levelItems");

        if(info["nDispFlg"] == 0){
          // 表示無効の場合
          new_img.style.display = "none";
        } else {
          new_img.style.display = "block";
        }

        // 高さ
        new_img.style.height = info["nHeight"+MSG_CSS_LANG]+DISP_UNIT;
        // 幅
        new_img.style.width = info["nWidth"+MSG_CSS_LANG]+DISP_UNIT;
        // Y軸
        new_img.style.top = info["nDispPosition_Y"+MSG_CSS_LANG]+DISP_UNIT;
        // X軸
        new_img.style.left = info["nDispPosition_X"+MSG_CSS_LANG]+DISP_UNIT;

        // 表示サイズ
        var size = parseInt(info["nDispSize"+MSG_CSS_LANG]) * 0.01;
        new_img.style.transform = "scale("+size+", "+size+")";
        new_img.setAttribute("size",size);

        homeDisp.appendChild(new_img);

      } else if(info["nDispType"] == 4){
        // 背景の場合
        var new_bg_img = document.createElement("img");
        new_bg_img.id = "levelItem_"+info["nDispId"]+"_"+info["nItemId"];
        new_bg_img.style.width = "100%";
        new_bg_img.style.height = "100%";
        var defaultImagePath = info["cDefaultImagePath"];
        var reg = new RegExp(/^[\d_]*$/);
        if(reg.test(defaultImagePath)){
          // 画像パスが数値&-のみのデータの場合、継承する画面のキー値と判定
          var pathSp = defaultImagePath.split("_");
          var getMenuBookCd = pathSp[0];
          var getDispId = pathSp[1];
          var getItemId = pathSp[2];
          var findFlg = false;
          for(var roop in layoutInfo_map){
            if(layoutInfo_map[roop]["nMenuBookCode"] == getMenuBookCd
            && layoutInfo_map[roop]["nDispId"] == getDispId
            && layoutInfo_map[roop]["nItemId"] == getItemId){
              new_bg_img.src = lis_fact_map[generateLangImgPath(layoutInfo_map[roop]["cDefaultImagePath"])];
              findFlg = true;
              break;
            }
          }
          if(!findFlg){
            new_bg_img.src = "";
          }
        } else {
          // それ以外は通常の画像パスと判定
          new_bg_img.src = lis_fact_map[generateLangImgPath(info["cDefaultImagePath"])];
        }
        homeDisp.appendChild(new_bg_img);
      } else if(info["nDispType"] == 6){
        // サイドリンクバーの場合
        for(var sm in sideLinkInfo_map){
          if(sideLinkInfo_map[sm]["nMenuBookCode"] == menubook_cd
          && sideLinkInfo_map[sm]["nSideLinkId"] == info["nSideLinkId"]){
            // 画面に紐づくサイドリンクバー情報行の場合
            if(sideLinkInfo_map[sm]["nAfDispId"] == 0 && nTypeMap[sideLinkInfo_map[sm]["nAfDispId"]] != 5){
              // 遷移先なし(タイトル画像等)の場合
              var titleLine = document.createElement("h2");
              titleLine.classList.add("sidelinkKey_"+sideLinkInfo_map[sm]["nItemId"]);
              titleLine.classList.add("sideLinks");
              titleLine.classList.add("sideLink_"+info["nDispId"]);
              if(!fstSidekinFlg){
                titleLine.classList.add("is-hide");
                titleLine.setAttribute('hidden','hidden');
              }
              var titleLine_img = document.createElement("img");
              titleLine_img.src = lis_fact_map[generateLangImgPath(sideLinkInfo_map[sm]["cDefaultImagePath"])];
              titleLine.appendChild(titleLine_img);
              if(sideLinkInfo_map[sm]["nTitleFlg"] == 1){
                titleLine.classList.add("sideLinkTitles");
                sideLinkBarTitle.appendChild(titleLine);
              } else {
                sideLinkBar.appendChild(titleLine);
              }
            } else if(nTypeMap[sideLinkInfo_map[sm]["nMenuBookCode"]+"_"+sideLinkInfo_map[sm]["nAfDispId"]] == 5){
              // 遷移先　階層画面の場合
              var levelLine = document.createElement("a");
              levelLine.classList.add("sidelinkKey_"+sideLinkInfo_map[sm]["nItemId"]);
              levelLine.classList.add("sideLinks");
              levelLine.classList.add("sideLink_"+info["nDispId"]);
              levelLine.classList.add("jBtn");
              if(!fstSidekinFlg){
                levelLine.classList.add("is-hide");
                levelLine.setAttribute('hidden','hidden');
              }
              if(sideLinkInfo_map[sm]['nAfDispId'] == HOME_DISP_ID){
                // TOP画面の場合
                levelLine.setAttribute("onclick","sideOpeFlg = true;touch(); location.href = '#root/home';");
              } else {
                levelLine.setAttribute("onclick","sideOpeFlg = true;cngLevel = "+sideLinkInfo_map[sm]['nAfDispId']+";touch();Data.data['scenes']['level'].onEntry(0);");
              }
              var levelLine_img = document.createElement("img");
              levelLine_img.src = lis_fact_map[generateLangImgPath(sideLinkInfo_map[sm]["cDefaultImagePath"])];
              levelLine.appendChild(levelLine_img);

              // "準備中です"表示判定実施
              var comsoonFlg = true;
              if(sideLinkInfo_map[sm]['nSoldOutIcon_condition_type'] != ""){
                // 商品区分のチェック
                var comsoonTypeMap = sideLinkInfo_map[sm]['nSoldOutIcon_condition_type'].split(',');
                for(var tp in comsoonTypeMap){
                  if(allGoodsMenutypes[comsoonTypeMap[tp]] != null){
                    // 該当する商品区分の商品が１つでもあったら、非準備中
                    comsoonFlg = false;
                  }
                }
              }
              if(sideLinkInfo_map[sm]['nSoldOutIcon_condition_cd'] != ""){
                // 商品コードのチェック
                var comsoonGoodsMap = sideLinkInfo_map[sm]['nSoldOutIcon_condition_cd'].split(',');
                for(var tp in comsoonGoodsMap){
                  if(m_goods_map[comsoonGoodsMap[tp]] != null && m_goods_map[comsoonGoodsMap[tp]]["bySalesStatusType"] != "2"){
                    // 商品情報がありかつ、販売可能な商品が１つでもあったら、非準備中
                    comsoonFlg = false;
                  }
                }
              }
              if(sideLinkInfo_map[sm]['nSoldOutIcon_condition_type'] == "" && sideLinkInfo_map[sm]['nSoldOutIcon_condition_cd'] == ""){
                // 単に設定がない場合は、非準備中判定
                comsoonFlg = false;
              }
              if(comsoonFlg){
                // 準備中アイコン有効化
                levelLine.classList.add("comsoon");
                levelLine.classList.add("off");
              }

              sideLinkBar.appendChild(levelLine);
            } else if(nTypeMap[sideLinkInfo_map[sm]["nMenuBookCode"]+"_"+sideLinkInfo_map[sm]["nAfDispId"]] != 5){
              // 遷移先　商品詳細画面の場合
              var levelLine = document.createElement("a");
              levelLine.classList.add("sidelinkKey_"+sideLinkInfo_map[sm]["nItemId"]);
              levelLine.classList.add("sideLinks");
              levelLine.classList.add("sideLink_"+info["nDispId"]);
              levelLine.classList.add("jBtn");
              if(!fstSidekinFlg){
                levelLine.classList.add("is-hide");
                levelLine.setAttribute('hidden','hidden');
              }
    
              levelLine.setAttribute("onclick","sideOpeFlg = true;touch();levelDispGoodsDetail("+sideLinkInfo_map[sm]['nAfDispId']+");");
              var levelLine_img = document.createElement("img");
              levelLine_img.src = lis_fact_map[generateLangImgPath(sideLinkInfo_map[sm]["cDefaultImagePath"])];
              levelLine.appendChild(levelLine_img);

              // "準備中です"表示判定実施
              var comsoonFlg = true;
              if(sideLinkInfo_map[sm]['nSoldOutIcon_condition_type'] != ""){
                // 商品区分のチェック
                var comsoonTypeMap = sideLinkInfo_map[sm]['nSoldOutIcon_condition_type'].split(',');
                for(var tp in comsoonTypeMap){
                  if(allGoodsMenutypes[comsoonTypeMap[tp]] != null){
                    // 該当する商品区分の商品が１つでもあったら、非準備中
                    comsoonFlg = false;
                  }
                }
              }
              if(sideLinkInfo_map[sm]['nSoldOutIcon_condition_cd'] != ""){
                // 商品コードのチェック
                var comsoonGoodsMap = sideLinkInfo_map[sm]['nSoldOutIcon_condition_cd'].split(',');
                for(var tp in comsoonGoodsMap){
                  if(m_goods_map[comsoonGoodsMap[tp]] != null && m_goods_map[comsoonGoodsMap[tp]]["bySalesStatusType"] != "2"){
                    // 商品情報がありかつ、販売可能な商品が１つでもあったら、非準備中
                    comsoonFlg = false;
                  }
                }
              }
              if(sideLinkInfo_map[sm]['nSoldOutIcon_condition_type'] == "" && sideLinkInfo_map[sm]['nSoldOutIcon_condition_cd'] == ""){
                // 単に設定がない場合は、非準備中判定
                comsoonFlg = false;
              }
              if(comsoonFlg){
                // 準備中アイコン有効化
                levelLine.classList.add("comsoon");
                levelLine.classList.add("off");
              }
              sideLinkBar.appendChild(levelLine);
            }
          }
        }
        fstSidekinFlg = false;
      }
    }
  }

  // プレビュー反映時、対象の階層画面表示をセットする
  if(contains(location.href,"root/level")){
    Data.data['scenes']['level'].onEntry(0);
  } else if(contains(location.href,"root/kids") || contains(location.href,"root/drink")){
    Data.data['scenes']['level'].onEntry(0);
    $(function(){
      levelDispGoodsDetail(currentDispId);
    });
  }
  fstCreateFlg = true;
  outOparationLog("レイアウト調整情報反映処理終了");
  stopMeasuringElapsedTime("editLayoutInfoStart", "editLayoutInfo完了");
}


function initLayout() {
  var levelItems = document.getElementsByClassName("levelItems");
  for(var i=0 ;i < levelItems.length;i++){
    levelItems[i].parentNode.removeChild(levelItems[i]);
    i--;
  }
  document.getElementById("levelAll").innerHTML = null;
  var sideLinkBar = document.getElementById("sideNav_eatin");
  sideLinkBar.innerHTML = null;
  var sideLinkBarTitle = document.getElementById("side-default-title");
  sideLinkBarTitle.innerHTML = null;
  if(guiFlg == "1"){
    // 設定ツール起動の場合、人数入力画面リフレッシュ
    var peopleAddItems = document.getElementsByClassName("peopleAddItems");
    for(var i = 0; i < peopleAddItems.length; i++){
      peopleAddItems[i].parentNode.removeChild(peopleAddItems[i]);
      i--;
    }
  }
}

function makeDispTypeMap() {
  // 画面種別のマップを作成
  var dispTypeMap = {};
  for(var line in layoutInfo_map){
    if(layoutInfo_map[line]["nDetailDispType"] != 0){
      // 遷移設定可能画面の場合
      dispTypeMap[layoutInfo_map[line]["nMenuBookCode"]+"_"+layoutInfo_map[line]["nDispId"]] = layoutInfo_map[line]["nDetailDispType"];
    }
  }
  // オーダーメイドディッシュのパターンを追加セット
  dispTypeMap[99999] = 1;

  return dispTypeMap;
}

function editHomeDispLayout(layoutInfo) {
  // お会計ボタン、注文履歴ボタン、店員呼び出しボタン、Laguageボタン
  var cItemName = layoutInfo["cItemName"];
  if (cItemName == "お会計ボタン"
    || cItemName == "注文履歴ボタン"
    || cItemName == "店員呼び出しボタン"
    || cItemName == "Laguageボタン"
  ) {

    var btn = getHomeDispButton(cItemName);

    setBtnStyle(btn, layoutInfo);

    // ボタンサイズ　スケール値化
    var scale = 0.01;
    var size = parseInt(layoutInfo["nDispSize"+MSG_CSS_LANG]) * scale;
    setHomeDispButtonCss(btn, size);
  } else {
    // 他
    // TOP画面タグ取得
    var homeDisp = document.getElementById("levelItem_10000_1");
    if (layoutInfo["nDispType"] == 1 || layoutInfo["nDispType"] == 5) {
      // ボタンの場合
      var new_btn = document.createElement("a");
      // メモ：階層遷移ボタンにも品切れ&準備中表示が必要となったため、判定名称を商品コード⇒階層マスタキー値に変更
      new_btn.classList.add("level_so_"+layoutInfo["nHierarchyCode"]);
  
      if (layoutInfo["nDispType"] == 5) {
        new_btn.classList.add("level_goods");
        new_btn.setAttribute("goodsCd",layoutInfo["nGoodsCode"]);
      }

      if (layoutInfo["nDispType"] == 1) {
        new_btn.classList.add("level_move");
        new_btn.setAttribute("goodsCd",layoutInfo["nSoldOutIcon_condition_cd"]);
        new_btn.setAttribute("goodsType",layoutInfo["nSoldOutIcon_condition_type"]);
      }

      new_btn.classList.add(MSG_CSS_LANG);
  
      // 品切れアイコンサイズ位置
      var css = ".levelItems.off.level_so_"+layoutInfo["nHierarchyCode"]
        +'::before{left:'+layoutInfo["nSoldOutIcon_X"]+'px;top:'+layoutInfo["nSoldOutIcon_Y"]
        +'px;width:'+layoutInfo["nSoldOutIcon_width"]+'%;height:'+layoutInfo["nSoldOutIcon_height"]
        +'%;border-radius:'+layoutInfo["nSoldOutIcon_radius"]+'px;}';

      var style = document.createElement('style');
      style.appendChild(document.createTextNode(css));
      document.getElementsByTagName('head')[0].appendChild(style);

      var cssAf = ".levelItems.off.level_so_"+layoutInfo["nHierarchyCode"]
        +'::after{left:'+layoutInfo["nSoldOutIcon_X"]+'px;width:'+layoutInfo["nSoldOutIcon_width"]+'%;}';
          
      var styleAf = document.createElement('style');
      styleAf.appendChild(document.createTextNode(cssAf));
      document.getElementsByTagName('head')[0].appendChild(styleAf);
  
      if (layoutInfo["nDispType"] == 1) {
        // 画面切替ボタンの場合
        if(nTypeMap[layoutInfo["nMenuBookCode"]+"_"+layoutInfo["nAfDispId"]] == 5){
          // 画面遷移ボタンの場合
          new_btn.setAttribute("onclick","startMeasuringElapsedTime("+layoutInfo['nHierarchyCode']+ "); cngLevel = "+layoutInfo['nAfDispId']+";touch();Data.data['scenes']['level'].onEntry(300); checkHierarchyCode("+layoutInfo['nHierarchyCode']+");");
          // "準備中です"表示判定実施
          var comsoonFlg = true;
          if (layoutInfo['nSoldOutIcon_condition_type'] != "") {
            // 商品区分のチェック
            var comsoonTypeMap = layoutInfo['nSoldOutIcon_condition_type'].split(',');
            for(var tp in comsoonTypeMap){
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
              if (layoutInfo['nSoldOutIcon_condition_type'] == "" && layoutInfo['nSoldOutIcon_condition_cd'] == "") {
                // 単に設定がない場合は、非準備中判定
                comsoonFlg = false;
              }
              if (comsoonFlg) {
                // 準備中アイコン有効化
                new_btn.classList.add("comsoon");
                new_btn.classList.add("off");
              }
              // allGoodsMenutypes
          } else if (nTypeMap[layoutInfo["nMenuBookCode"]+"_"+layoutInfo["nAfDispId"]] != 5
            && nTypeMap[layoutInfo["nMenuBookCode"]+"_"+layoutInfo["nAfDispId"]] != 0)
          {
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
      } else if (layoutInfo["nDispType"] == 5) {
        // 商品ボタンの場合
        // オーダーメイド化設定のチェック
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
        
        new_btn.href = "javascript:void(0)";
        new_btn.style.display = "block";
        new_btn.style.position = "absolute";
        new_btn.style.zIndex = 1;
        new_btn.id = "levelItem_"+layoutInfo["nDispId"]+"_"+layoutInfo["nItemId"];
        new_btn.classList.add("levelItems");
  
        if (layoutInfo["nDispFlg"] == 0) {
          // 表示無効の場合
          new_btn.style.display = "none";
        } else {
          new_btn.style.display = "block";
        }
  
        // 高さ
        new_btn.style.height = layoutInfo["nHeight"+MSG_CSS_LANG]+DISP_UNIT;
        // 幅
        new_btn.style.width = layoutInfo["nWidth"+MSG_CSS_LANG]+DISP_UNIT;
        // Y軸
        new_btn.style.top = layoutInfo["nDispPosition_Y"+MSG_CSS_LANG]+DISP_UNIT;
        // X軸
        new_btn.style.left = layoutInfo["nDispPosition_X"+MSG_CSS_LANG]+DISP_UNIT;
  
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
  
        if (layoutInfo["nDispType"] == 1) {
          // 画面遷移ボタンの場合
          // ボタン通常時サイズ
          var dfcss = '#'+"levelItem_"+layoutInfo["nDispId"]+"_"+layoutInfo["nItemId"]+'{transform: scale('+size+');transition-duration: .3s}';
          var dfstyle = document.createElement('style');
          dfstyle.appendChild(document.createTextNode(dfcss));
          document.getElementsByTagName('head')[0].appendChild(dfstyle);
  
          // ボタン拡大時サイズ
          var css = '#'+"levelItem_"+layoutInfo["nDispId"]+"_"+layoutInfo["nItemId"]+':hover{transform: scale('+size*1.05+');transition-duration: .3s}';
          var style = document.createElement('style');
          style.appendChild(document.createTextNode(css));
          document.getElementsByTagName('head')[0].appendChild(style);
        }
  
        // 透過率
        new_btn.style.opacity = layoutInfo["dOpacity"];
      } else if (layoutInfo["nDispType"] == 2) {
        // テキスト文言の場合
        var new_txt = document.createElement("div");
        // 選択中言語のテキストをセット
        new_txt.innerHTML = layoutInfo["cText"+MSG_CSS_LANG];

        new_txt.style.display = "block";
        new_txt.style.position = "absolute";

        if (layoutInfo["nVerticalFlg"] == "1") {
          // 縦文字設定の場合
          new_txt.style.writingMode = "vertical-rl";
        }

        new_txt.id = "levelItem_"+layoutInfo["nDispId"]+"_"+layoutInfo["nItemId"];
        new_txt.classList.add("levelItems");

        if (layoutInfo["nItalic"+MSG_CSS_LANG] == 1) {
          // 斜体ONの場合
          new_txt.style.fontStyle = "italic";
        } else {
          new_txt.style.fontStyle = "";
        }

        if (layoutInfo["nDispFlg"] == 0) {
          // 表示無効の場合
          new_txt.style.display = "none";
        } else {
          new_txt.style.display = "block";
        }

        // フォントサイズ
        new_txt.style.fontSize = layoutInfo["nFontSize"+MSG_CSS_LANG]+DISP_UNIT;
        // フォントカラー
        new_txt.style.color = layoutInfo["cColor"+MSG_CSS_LANG];
        // フォント太さ
        new_txt.style.fontWeight = layoutInfo["nFontWeight"+MSG_CSS_LANG];

        // 高さ
        new_txt.style.height = layoutInfo["nHeight"+MSG_CSS_LANG]+DISP_UNIT;
        // 幅
        new_txt.style.width = layoutInfo["nWidth"+MSG_CSS_LANG]+DISP_UNIT;
        // Y軸
        new_txt.style.top = layoutInfo["nDispPosition_Y"+MSG_CSS_LANG]+DISP_UNIT;
        // X軸
        new_txt.style.left = layoutInfo["nDispPosition_X"+MSG_CSS_LANG]+DISP_UNIT;
        homeDisp.appendChild(new_txt);

      } else if (layoutInfo["nDispType"] == 3) {
        // 画像の場合
        var new_img = document.createElement("img");
        // 選択中言語の画像をセット
        new_img.src = lis_fact_map[generateLangImgPath(layoutInfo["cDefaultImagePath"])];

        new_img.style.display = "block";
        new_img.style.position = "absolute";
        new_img.id = "levelItem_"+layoutInfo["nDispId"]+"_"+layoutInfo["nItemId"];
        new_img.classList.add("levelItems");

        if (layoutInfo["nDispFlg"] == 0) {
          // 表示無効の場合
          new_img.style.display = "none";
        } else {
          new_img.style.display = "block";
        }

        // 高さ
        new_img.style.height = layoutInfo["nHeight"+MSG_CSS_LANG]+DISP_UNIT;
        // 幅
        new_img.style.width = layoutInfo["nWidth"+MSG_CSS_LANG]+DISP_UNIT;
        // Y軸
        new_img.style.top = layoutInfo["nDispPosition_Y"+MSG_CSS_LANG]+DISP_UNIT;
        // X軸
        new_img.style.left = layoutInfo["nDispPosition_X"+MSG_CSS_LANG]+DISP_UNIT;

        // 表示サイズ
        var size = parseInt(layoutInfo["nDispSize"+MSG_CSS_LANG]) * 0.01;
        new_img.style.transform = "scale("+size+", "+size+")";
        new_img.setAttribute("size",size);

        homeDisp.appendChild(new_img);

      }
  }
}

function getHomeDispButton(cItemName) {
  var btnIdMap = {
    "お会計ボタン": "home_btn3",
    "注文履歴ボタン": "top_history_btn",
    "店員呼び出しボタン": "top_call_btn",
    "Laguageボタン": "top_language_btn"
  };

  var btn = document.getElementById(btnIdMap[cItemName]);

  return btn
}

function setBtnStyle(btn, layoutInfo) {
  if (layoutInfo["nDispFlg"] == 0) {
    // 表示無効の場合
    btn.style.display = "none";
  } else {
    btn.style.display = "block";
  }

  // 高さ
  btn.style.height = layoutInfo["nHeight"+MSG_CSS_LANG]+DISP_UNIT;
  // 幅
  btn.style.width = layoutInfo["nWidth"+MSG_CSS_LANG]+DISP_UNIT;
  // Y軸
  btn.style.top = layoutInfo["nDispPosition_Y"+MSG_CSS_LANG]+DISP_UNIT;
  // X軸
  btn.style.left = layoutInfo["nDispPosition_X"+MSG_CSS_LANG]+DISP_UNIT;

  // 透過率
  btn.style.opacity = layoutInfo["dOpacity"];
}

function setHomeDispButtonCss(btn, size) {
  // ボタン通常時サイズ
  var dfcss = '#'+btn.id+'{transform: scale('+size+');transition-duration: .3s}';
  var dfstyle = document.createElement('style');
  dfstyle.appendChild(document.createTextNode(dfcss));
  document.getElementsByTagName('head')[0].appendChild(dfstyle);

  // ボタン拡大時サイズ
  var css = '#'+btn.id+':hover{transform: scale('+size*1.05+');transition-duration: .3s}';
  var style = document.createElement('style');
  style.appendChild(document.createTextNode(css));
  document.getElementsByTagName('head')[0].appendChild(style);
}

function editHomeOtherBtn(layoutInfo) {
  var new_btn = document.createElement("a");
  new_btn.classList.add("level_so_"+layoutInfo["nHierarchyCode"]);
  
  new_btn.classList.add(MSG_CSS_LANG);
  setHomeOtherBtnCss(layoutInfo);

  if (layoutInfo["nDispType"] == 5) {
    new_btn.classList.add("level_goods");
    new_btn.setAttribute("goodsCd",layoutInfo["nGoodsCode"]);
  }

  if (layoutInfo["nDispType"] == 1) {
    new_btn.classList.add("level_move");
    new_btn.setAttribute("goodsCd",layoutInfo["nSoldOutIcon_condition_cd"]);
    new_btn.setAttribute("goodsType",layoutInfo["nSoldOutIcon_condition_type"]);
  }

  

  if (layoutInfo["nDispType"] == 1) {
    // 画面切替ボタンの場合
    if(nTypeMap[layoutInfo["nMenuBookCode"]+"_"+layoutInfo["nAfDispId"]] == 5){
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

      comingSoonFlg = checkComingSoonByGoodsCds(goodsCds);

      if (comingSoonFlg) {
        // 準備中アイコン有効化
        new_btn.classList.add("comsoon");
        new_btn.classList.add("off");
      }
          // allGoodsMenutypes
    } else if (nTypeMap[layoutInfo["nMenuBookCode"]+"_"+layoutInfo["nAfDispId"]] != 5
        && nTypeMap[layoutInfo["nMenuBookCode"]+"_"+layoutInfo["nAfDispId"]] != 0)
    {
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
  } else if (layoutInfo["nDispType"] == 5) {
    // 商品ボタンの場合
    // オーダーメイド化設定のチェック
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
    
    new_btn.href = "javascript:void(0)";
    new_btn.style.display = "block";
    new_btn.style.position = "absolute";
    new_btn.style.zIndex = 1;
    new_btn.id = "levelItem_"+layoutInfo["nDispId"]+"_"+layoutInfo["nItemId"];
    new_btn.classList.add("levelItems");
  
    if (layoutInfo["nDispFlg"] == 0) {
      // 表示無効の場合
      new_btn.style.display = "none";
    } else {
      new_btn.style.display = "block";
    }
  
    // 高さ
    new_btn.style.height = layoutInfo["nHeight"+MSG_CSS_LANG]+DISP_UNIT;
    // 幅
    new_btn.style.width = layoutInfo["nWidth"+MSG_CSS_LANG]+DISP_UNIT;
    // Y軸
    new_btn.style.top = layoutInfo["nDispPosition_Y"+MSG_CSS_LANG]+DISP_UNIT;
    // X軸
    new_btn.style.left = layoutInfo["nDispPosition_X"+MSG_CSS_LANG]+DISP_UNIT;
  
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
  
    if (layoutInfo["nDispType"] == 1) {
      // 画面遷移ボタンの場合
      // ボタン通常時サイズ
      var dfcss = '#'+"levelItem_"+layoutInfo["nDispId"]+"_"+layoutInfo["nItemId"]+'{transform: scale('+size+');transition-duration: .3s}';
      var dfstyle = document.createElement('style');
      dfstyle.appendChild(document.createTextNode(dfcss));
      document.getElementsByTagName('head')[0].appendChild(dfstyle);
  
      // ボタン拡大時サイズ
      var css = '#'+"levelItem_"+layoutInfo["nDispId"]+"_"+layoutInfo["nItemId"]+':hover{transform: scale('+size*1.05+');transition-duration: .3s}';
      var style = document.createElement('style');
      style.appendChild(document.createTextNode(css));
      document.getElementsByTagName('head')[0].appendChild(style);
    }
  
    // 透過率
    new_btn.style.opacity = layoutInfo["dOpacity"];
}

function editHomeMoveButton(btn, layoutInfo) {
  btn.classList.add("level_move");
  btn.setAttribute("goodsCd",layoutInfo["nSoldOutIcon_condition_cd"]);
  btn.setAttribute("goodsType",layoutInfo["nSoldOutIcon_condition_type"]);
}

function editHomeGoodsButton(btn, layoutInfo) {
  btn.classList.add("level_goods");
  btn.setAttribute("goodsCd",layoutInfo["nGoodsCode"]);
}

function setHomeOtherBtnCss(layoutInfo) {
  // 品切れアイコンサイズ位置
  var css = ".levelItems.off.level_so_"+layoutInfo["nHierarchyCode"]
    +'::before{left:'+layoutInfo["nSoldOutIcon_X"]+'px;top:'+layoutInfo["nSoldOutIcon_Y"]
    +'px;width:'+layoutInfo["nSoldOutIcon_width"]+'%;height:'+layoutInfo["nSoldOutIcon_height"]
    +'%;border-radius:'+layoutInfo["nSoldOutIcon_radius"]+'px;}';

  var style = document.createElement('style');
  style.appendChild(document.createTextNode(css));
  document.getElementsByTagName('head')[0].appendChild(style);

  var cssAf = ".levelItems.off.level_so_"+layoutInfo["nHierarchyCode"]
    +'::after{left:'+layoutInfo["nSoldOutIcon_X"]+'px;width:'+layoutInfo["nSoldOutIcon_width"]+'%;}';
      
  var styleAf = document.createElement('style');
  styleAf.appendChild(document.createTextNode(cssAf));
  document.getElementsByTagName('head')[0].appendChild(styleAf);
}

function checkComingSoonByGoodsType(goodsTypes) {
  if (conditionType == "") {
    return true;
  }

  var comingSoonTypeMap = goodsTypes.split(',');
  for(var tp of comingSoonTypeMap){
    if (allGoodsMenutypes[tp] != null) {
      // 該当する商品区分の商品が１つでもあったら、非準備中
      return false;
    }
  }

  return true;
}

function checkComingSoonByGoodsCode(goodsCds) {
  if (goodsCds == "") {
    return false;
  }

  // 商品コードのチェック
  var comingSoonGoodsMap = goodsCds.split(',');
    for (var tp of comingSoonGoodsMap) {
      if (m_goods_map[tp] != null 
        && m_goods_map[tp]["bySalesStatusType"] != "2")
      {
        // 商品情報がありかつ、販売可能な商品が１つでもあったら、非準備中
        return false;
      }
    }
  
  return true;
}