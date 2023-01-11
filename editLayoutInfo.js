
/**
 * レイアウト調整情報反映処理
 */
function editLayoutInfo() {
  startMeasuringElapsedTime("editLayoutInfoStart");
  outOparationLog("レイアウト調整情報反映処理開始");
  // 一旦初期化
  var initInfo = initLayoutInfo(nTypeMap);
  var fstSidekinFlg = initInfo['fstSidekinFlg'];
  var nTypeMap = initInfo['nTypeMap'];
  var sideLinkBar = initInfo['sideLinkBar'];
  var sideLinkBarTitle = initInfo['sideLinkBarTitle'];


  for(var line in layoutInfo_map){
    var layoutInfo = layoutInfo_map[line];
    if(layoutInfo["nMenuBookCode"] != menubook_cd && layoutInfo_map[line]["nMenuBookCode"] != MENUBOOK_ALL){
      // 対象メニューブック以外スキップ
      continue;
    }
    if(layoutInfo["nDispId"] == HOME_DISP_ID){
      // TOP画面の場合
      editHomeDispLayoutInfo(layoutInfo, nTypeMap);
    } else if(layoutInfo["nDispId"] == PEOPLE_DISP_ID && (!fstCreateFlg || guiFlg == GUI_CODE)){
      // 人数入力画面の場合　※アプリ起動時の初回のみ　※設定ツール起動の場合は毎回処理
      var peopleDisp = document.getElementById("peopleDisp");
      if(layoutInfo_map[line]["nDispType"] == 3){
        // 画像の場合
        var new_img = document.createElement("img");
        // 選択中言語の画像をセット
        new_img.src = lis_fact_map[generateLangImgPath(layoutInfo_map[line]["cDefaultImagePath"])];

        new_img.style.display = "block";
        new_img.style.position = "absolute";
        new_img.id = "levelItem_"+layoutInfo_map[line]["nDispId"]+"_"+layoutInfo_map[line]["nItemId"];
        new_img.classList.add("peopleAddItems");
        // new_img.classList.add("levelItems");

        if(layoutInfo_map[line]["nDispFlg"] == 0){
          // 表示無効の場合
          new_img.style.display = "none";
        } else {
          new_img.style.display = "block";
        }

        // 高さ
        new_img.style.height = layoutInfo_map[line]["nHeight"+MSG_CSS_LANG]+DISP_UNIT;
        // 幅
        new_img.style.width = layoutInfo_map[line]["nWidth"+MSG_CSS_LANG]+DISP_UNIT;
        // Y軸
        new_img.style.top = layoutInfo_map[line]["nDispPosition_Y"+MSG_CSS_LANG]+DISP_UNIT;
        // X軸
        new_img.style.left = layoutInfo_map[line]["nDispPosition_X"+MSG_CSS_LANG]+DISP_UNIT;

        // 表示サイズ
        var size = parseInt(layoutInfo_map[line]["nDispSize"+MSG_CSS_LANG]) * 0.01;
        new_img.style.transform = "scale("+size+", "+size+")";
        new_img.setAttribute("size",size);

        peopleDisp.appendChild(new_img);

      } else if(layoutInfo_map[line]["nDispType"] == 4){
        // 背景の場合
        var new_bg_img = document.createElement("img");
        new_bg_img.id = "levelItem_"+layoutInfo_map[line]["nDispId"]+"_"+layoutInfo_map[line]["nItemId"];
        new_bg_img.style.width = "100%";
        new_bg_img.style.height = "100%";
        new_bg_img.src = lis_fact_map[generateLangImgPath(layoutInfo_map[line]["cDefaultImagePath"])];
        new_bg_img.classList.add("peopleAddItems");
        // new_bg_img.classList.add("levelItems");
        peopleDisp.appendChild(new_bg_img);
      }
    } else if(layoutInfo_map[line]["nDispId"] == FOOTER_DISP_ID){
      // フッターの場合
      if(layoutInfo_map[line]["nDispType"] == 4){
        // 背景の場合
        // 作成済みの画像切替処理で対応されるため、処理なし
      }

    } else if(layoutInfo_map[line]["nDispId"] == ORD_FIX_DISP_ID){
      // 注文確定画面の場合
      if(layoutInfo_map[line]["nDispType"] == 4){
        // 背景の場合
        var new_bg_img = document.getElementById("ord-fix-bg");
        new_bg_img.style.width = "100%";
        new_bg_img.style.height = "100%";
        new_bg_img.style.backgroundImage = lis_fact_map[generateLangImgPath(layoutInfo_map[line]["cDefaultImagePath"])];
      } else if(layoutInfo_map[line]["nDispType"] == 10){
        // 遷移先候補画面の場合
        ordFixAfDispList = [];
        for(var f1 = 1;f1 <= 5;f1++){
          if(layoutInfo_map[line]["nAfDispId"+f1] != "-1"){
            ordFixAfDispList[layoutInfo_map[line]["nAfDispId"+f1]] = "";
          }
        }
        
      }
    } else if(false){
      //TODO：フッター人数入力etc
    } else {
      // 階層画面の場合
      var createId = "level-"+layoutInfo_map[line]["nDispId"];
      var homeDisp = null;
      var tgtElem = document.getElementById(createId);
      if(tgtElem == null){
        // 画面タグがまだない場合、作成
        homeDisp = document.createElement("div");
        homeDisp.id = "level-"+layoutInfo_map[line]["nDispId"];
        homeDisp.classList.add("levels");
        homeDisp.classList.add("is-hide");
        homeDisp.style.width = "100%";
        homeDisp.style.height = "100%";
        document.getElementById("levelAll").appendChild(homeDisp);
      } else {
        // 既にある場合、取得
        homeDisp = tgtElem;
      }
      if(layoutInfo_map[line]["nDispType"] == 1 || layoutInfo_map[line]["nDispType"] == 5){
        // ボタンの場合
        var new_btn = document.createElement("a");
        // メモ：階層遷移ボタンにも品切れ&準備中表示が必要となったため、判定名称を商品コード⇒階層マスタキー値に変更
        new_btn.classList.add("level_so_"+layoutInfo_map[line]["nHierarchyCode"]);

        if(layoutInfo_map[line]["nDispType"] == 5){
          new_btn.classList.add("level_goods");
          new_btn.setAttribute("goodsCd",layoutInfo_map[line]["nGoodsCode"]);
        }
        if(layoutInfo_map[line]["nDispType"] == 1){
          new_btn.classList.add("level_move");
          new_btn.setAttribute("goodsCd",layoutInfo_map[line]["nSoldOutIcon_condition_cd"]);
          new_btn.setAttribute("goodsType",layoutInfo_map[line]["nSoldOutIcon_condition_type"]);
        }

        new_btn.classList.add(MSG_CSS_LANG);

        // 品切れアイコンサイズ位置
        var css = ".levelItems.off.level_so_"+layoutInfo_map[line]["nHierarchyCode"]
              +'::before{left:'+layoutInfo_map[line]["nSoldOutIcon_X"]+'px;top:'+layoutInfo_map[line]["nSoldOutIcon_Y"]
              +'px;width:'+layoutInfo_map[line]["nSoldOutIcon_width"]+'%;height:'+layoutInfo_map[line]["nSoldOutIcon_height"]
              +'%;border-radius:'+layoutInfo_map[line]["nSoldOutIcon_radius"]+'px;}';
        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.getElementsByTagName('head')[0].appendChild(style);

        var cssAf = ".levelItems.off.level_so_"+layoutInfo_map[line]["nHierarchyCode"]
              +'::after{left:'+layoutInfo_map[line]["nSoldOutIcon_X"]+'px;width:'+layoutInfo_map[line]["nSoldOutIcon_width"]+'%;}';
        var styleAf = document.createElement('style');
        styleAf.appendChild(document.createTextNode(cssAf));
        document.getElementsByTagName('head')[0].appendChild(styleAf);

        if(layoutInfo_map[line]["nDispType"] == 1){
          // 画面切替ボタンの場合
          if(nTypeMap[layoutInfo_map[line]["nMenuBookCode"]+"_"+layoutInfo_map[line]["nAfDispId"]] == 5){
            // 画面遷移ボタンの場合
            new_btn.setAttribute("onclick","cngLevel = "+layoutInfo_map[line]['nAfDispId']+";touch();Data.data['scenes']['level'].onEntry(300); checkHierarchyCode("+layoutInfo_map[line]['nHierarchyCode']+");");

            // "準備中です"表示判定実施
            var comsoonFlg = true;
            if(layoutInfo_map[line]['nSoldOutIcon_condition_type'] != ""){
              // 商品区分のチェック
              var comsoonTypeMap = layoutInfo_map[line]['nSoldOutIcon_condition_type'].split(',');
              for(var tp in comsoonTypeMap){
                if(allGoodsMenutypes[comsoonTypeMap[tp]] != null){
                  // 該当する商品区分の商品が１つでもあったら、非準備中
                  comsoonFlg = false;
                }
              }
            }
            if(layoutInfo_map[line]['nSoldOutIcon_condition_cd'] != ""){
              // 商品コードのチェック
              var comsoonGoodsMap = layoutInfo_map[line]['nSoldOutIcon_condition_cd'].split(',');
              for(var tp in comsoonGoodsMap){
                if(m_goods_map[comsoonGoodsMap[tp]] != null && m_goods_map[comsoonGoodsMap[tp]]["bySalesStatusType"] != "2"){
                  // 商品情報がありかつ、販売可能な商品が１つでもあったら、非準備中
                  comsoonFlg = false;
                }
              }
            }
            if(layoutInfo_map[line]['nSoldOutIcon_condition_type'] == "" && layoutInfo_map[line]['nSoldOutIcon_condition_cd'] == ""){
              // 単に設定がない場合は、非準備中判定
              comsoonFlg = false;
            }
            if(comsoonFlg){
              // 準備中アイコン有効化
              new_btn.classList.add("comsoon");
              new_btn.classList.add("off");
            }
          } else if(nTypeMap[layoutInfo_map[line]["nMenuBookCode"]+"_"+layoutInfo_map[line]["nAfDispId"]] != 5
          && nTypeMap[layoutInfo_map[line]["nMenuBookCode"]+"_"+layoutInfo_map[line]["nAfDispId"]] != 0){
            // 商品詳細表示ボタンの場合
            new_btn.setAttribute("onclick","touch();levelDispGoodsDetail("+layoutInfo_map[line]['nAfDispId']+");");
            // "準備中です"表示判定実施
            var comsoonFlg = true;
            if(layoutInfo_map[line]['nSoldOutIcon_condition_type'] != ""){
              // 商品区分のチェック
              var comsoonTypeMap = layoutInfo_map[line]['nSoldOutIcon_condition_type'].split(',');
              for(var tp in comsoonTypeMap){
                if(allGoodsMenutypes[comsoonTypeMap[tp]] != null){
                  // 該当する商品区分の商品が１つでもあったら、非準備中
                  comsoonFlg = false;
                }
              }
            }
            if(layoutInfo_map[line]['nSoldOutIcon_condition_cd'] != ""){
              // 商品コードのチェック
              var comsoonGoodsMap = layoutInfo_map[line]['nSoldOutIcon_condition_cd'].split(',');
              for(var tp in comsoonGoodsMap){
                if(m_goods_map[comsoonGoodsMap[tp]] != null && m_goods_map[comsoonGoodsMap[tp]]["bySalesStatusType"] != "2"){
                  // 商品情報がありかつ、販売可能な商品が１つでもあったら、非準備中
                  comsoonFlg = false;
                }
              }
            }
            if(layoutInfo_map[line]['nSoldOutIcon_condition_type'] == "" && layoutInfo_map[line]['nSoldOutIcon_condition_cd'] == ""){
              // 単に設定がない場合は、非準備中判定
              comsoonFlg = false;
            }
            if(comsoonFlg){
              // 準備中アイコン有効化
              new_btn.classList.add("comsoon");
              new_btn.classList.add("off");
            }
          }
        } else if(layoutInfo_map[line]["nDispType"] == 5) {
          // 商品ボタンの場合
          // オーダーメイド化設定のチェック
          var ordmadeGoodsFlg = false;
          var tgtBasedishcomboKey = "";
          for(var mbm in m_basedishcombo_map){
            if(m_basedishcombo_map[mbm]["nGoodsCode"] == layoutInfo_map[line]["nGoodsCode"]){
              additionMessage("[OrderMade?]", layoutInfo_map[line]["nGoodsCode"] + ": オーダーメイド商品");
              ordmadeGoodsFlg = true;
              tgtBasedishcomboKey = mbm;
              break;
            }
          }
          if(layoutInfo_map[line]["nDispType"] == 5 && (m_goods_map[layoutInfo_map[line]["nGoodsCode"]] == null || m_goods_map[layoutInfo_map[line]["nGoodsCode"]]["bySalesStatusType"] == '2')){
            // ベース商品の情報がそもそもない場合
            ordmadeGoodsFlg = false;
            additionMessage("[OrderMade?]", layoutInfo_map[line]["nGoodsCode"] + ": オーダーメイド商品:False");
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
            if(layoutInfo_map[line]["nDispType"] == 5 && m_goods_map[layoutInfo_map[line]["nGoodsCode"]] == null){
              // 商品情報がない場合準備中アイコン有効化
              new_btn.classList.add("comsoon");
              new_btn.classList.add("off");
            }
            else if(layoutInfo_map[line]["nDispType"] == 5 && m_goods_map[layoutInfo_map[line]["nGoodsCode"]]["bySalesStatusType"] == "2"){
              // 品切れの場合、品切れ表示
              new_btn.classList.add("off");
            }
            new_btn.setAttribute("onclick","touch();dispLevelPopup("+layoutInfo_map[line]["nGoodsCode"]+")");
          }

        }
        new_btn.href = "javascript:void(0)";

        new_btn.style.display = "block";
        new_btn.style.position = "absolute";
        new_btn.style.zIndex = 1;
        new_btn.id = "levelItem_"+layoutInfo_map[line]["nDispId"]+"_"+layoutInfo_map[line]["nItemId"];
        new_btn.classList.add("levelItems");

        if(layoutInfo_map[line]["nDispFlg"] == 0){
          // 表示無効の場合
          new_btn.style.display = "none";
        } else {
          new_btn.style.display = "block";
        }

        var arrangement = {
          height: layoutInfo_map[line]["nHeight"+MSG_CSS_LANG]+DISP_UNIT,
          width: layoutInfo_map[line]["nWidth"+MSG_CSS_LANG]+DISP_UNIT,
          top: layoutInfo_map[line]["nDispPosition_Y"+MSG_CSS_LANG]+DISP_UNIT,
          left: layoutInfo_map[line]["nDispPosition_X"+MSG_CSS_LANG]+DISP_UNIT,
          opacity: layoutInfo_map[line]["dOpacity"]
        };

        setComponentStyle(new_btn, arrangement);

        if(layoutInfo_map[line]["cDefaultImagePath"] != null && layoutInfo_map[line]["cDefaultImagePath"] != ""){

          var new_btn_img = document.createElement("img");
          new_btn_img.src = lis_fact_map[generateLangImgPath(layoutInfo_map[line]["cDefaultImagePath"])];
          new_btn.appendChild(new_btn_img);
        }
          homeDisp.appendChild(new_btn);


        // ボタンサイズ　スケール値化
        var size = parseInt(layoutInfo_map[line]["nDispSize"+MSG_CSS_LANG]) * 0.01;
        new_btn.setAttribute("size",size);

        if(layoutInfo_map[line]["nDispType"] == 1) {
          // 画面遷移ボタンの場合
          // ボタン通常時サイズ
          var dfcss = '#'+"levelItem_"+layoutInfo_map[line]["nDispId"]+"_"+layoutInfo_map[line]["nItemId"]+'{transform: scale('+size+');transition-duration: .3s}';
          var dfstyle = document.createElement('style');
          dfstyle.appendChild(document.createTextNode(dfcss));
          document.getElementsByTagName('head')[0].appendChild(dfstyle);

          // ボタン拡大時サイズ
          var css = '#'+"levelItem_"+layoutInfo_map[line]["nDispId"]+"_"+layoutInfo_map[line]["nItemId"]+':hover{transform: scale('+size*1.05+');transition-duration: .3s}';
          var style = document.createElement('style');
          style.appendChild(document.createTextNode(css));
          document.getElementsByTagName('head')[0].appendChild(style);
        }

      } else if(layoutInfo_map[line]["nDispType"] == 2){
        // テキスト文言の場合
        var new_txt = document.createElement("div");
        // 選択中言語のテキストをセット
        new_txt.innerHTML = layoutInfo_map[line]["cText"+MSG_CSS_LANG];

        new_txt.style.display = "block";
        new_txt.style.position = "absolute";
        if(layoutInfo_map[line]["nVerticalFlg"] == "1"){
          // 縦文字設定の場合
          new_txt.style.writingMode = "vertical-rl";
          new_txt.style.textOrientation = "upright";
        }
        new_txt.id = "levelItem_"+layoutInfo_map[line]["nDispId"]+"_"+layoutInfo_map[line]["nItemId"];
        new_txt.classList.add("levelItems");

        if(layoutInfo_map[line]["nItalic"+MSG_CSS_LANG] == 1){
          // 斜体ONの場合
          new_txt.style.fontStyle = "italic";
        } else {
          new_txt.style.fontStyle = "";
        }

        if(layoutInfo_map[line]["nDispFlg"] == 0){
          // 表示無効の場合
          new_txt.style.display = "none";
        } else {
          new_txt.style.display = "block";
        }

        // フォントサイズ
        new_txt.style.fontSize = layoutInfo_map[line]["nFontSize"+MSG_CSS_LANG]+DISP_UNIT;
        // フォントカラー
        new_txt.style.color = layoutInfo_map[line]["cColor"+MSG_CSS_LANG];
        // フォント太さ
        new_txt.style.fontWeight = layoutInfo_map[line]["nFontWeight"+MSG_CSS_LANG];

        // 高さ
        new_txt.style.height = layoutInfo_map[line]["nHeight"+MSG_CSS_LANG]+DISP_UNIT;
        // 幅
        new_txt.style.width = layoutInfo_map[line]["nWidth"+MSG_CSS_LANG]+DISP_UNIT;
        // Y軸
        new_txt.style.top = layoutInfo_map[line]["nDispPosition_Y"+MSG_CSS_LANG]+DISP_UNIT;
        // X軸
        new_txt.style.left = layoutInfo_map[line]["nDispPosition_X"+MSG_CSS_LANG]+DISP_UNIT;
        homeDisp.appendChild(new_txt);

      } else if(layoutInfo_map[line]["nDispType"] == 3){
        // 画像の場合
        var new_img = document.createElement("img");
        // 選択中言語の画像をセット
        new_img.src = lis_fact_map[generateLangImgPath(layoutInfo_map[line]["cDefaultImagePath"])];

        new_img.style.display = "block";
        new_img.style.position = "absolute";
        new_img.id = "levelItem_"+layoutInfo_map[line]["nDispId"]+"_"+layoutInfo_map[line]["nItemId"];
        new_img.classList.add("levelItems");

        if(layoutInfo_map[line]["nDispFlg"] == 0){
          // 表示無効の場合
          new_img.style.display = "none";
        } else {
          new_img.style.display = "block";
        }

        // 高さ
        new_img.style.height = layoutInfo_map[line]["nHeight"+MSG_CSS_LANG]+DISP_UNIT;
        // 幅
        new_img.style.width = layoutInfo_map[line]["nWidth"+MSG_CSS_LANG]+DISP_UNIT;
        // Y軸
        new_img.style.top = layoutInfo_map[line]["nDispPosition_Y"+MSG_CSS_LANG]+DISP_UNIT;
        // X軸
        new_img.style.left = layoutInfo_map[line]["nDispPosition_X"+MSG_CSS_LANG]+DISP_UNIT;

        // 表示サイズ
        var size = parseInt(layoutInfo_map[line]["nDispSize"+MSG_CSS_LANG]) * 0.01;
        new_img.style.transform = "scale("+size+", "+size+")";
        new_img.setAttribute("size",size);

        homeDisp.appendChild(new_img);

      } else if(layoutInfo_map[line]["nDispType"] == 4){
        // 背景の場合
        var new_bg_img = document.createElement("img");
        new_bg_img.id = "levelItem_"+layoutInfo_map[line]["nDispId"]+"_"+layoutInfo_map[line]["nItemId"];
        new_bg_img.style.width = "100%";
        new_bg_img.style.height = "100%";
        var defaultImagePath = layoutInfo_map[line]["cDefaultImagePath"];
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
          new_bg_img.src = lis_fact_map[generateLangImgPath(layoutInfo_map[line]["cDefaultImagePath"])];
        }
        homeDisp.appendChild(new_bg_img);
      } else if(layoutInfo_map[line]["nDispType"] == 6){
        // サイドリンクバーの場合
        for(var sm in sideLinkInfo_map){
          if(sideLinkInfo_map[sm]["nMenuBookCode"] == menubook_cd
          && sideLinkInfo_map[sm]["nSideLinkId"] == layoutInfo_map[line]["nSideLinkId"]){
            // 画面に紐づくサイドリンクバー情報行の場合
            if(sideLinkInfo_map[sm]["nAfDispId"] == 0 && nTypeMap[sideLinkInfo_map[sm]["nAfDispId"]] != 5){
              // 遷移先なし(タイトル画像等)の場合
              var titleLine = document.createElement("h2");
              titleLine.classList.add("sidelinkKey_"+sideLinkInfo_map[sm]["nItemId"]);
              titleLine.classList.add("sideLinks");
              titleLine.classList.add("sideLink_"+layoutInfo_map[line]["nDispId"]);
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
              levelLine.classList.add("sideLink_"+layoutInfo_map[line]["nDispId"]);
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
              levelLine.classList.add("sideLink_"+layoutInfo_map[line]["nDispId"]);
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

/**
 * LayoutInfoを初期化
 * ※editLayoutInfoが長すぎるため別関数化
 */
function initLayoutInfo() {
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
  if(guiFlg == GUI_CODE){
    // 設定ツール起動の場合、人数入力画面リフレッシュ
    var peopleAddItems = document.getElementsByClassName("peopleAddItems");
    for(var i = 0; i < peopleAddItems.length; i++){
      peopleAddItems[i].parentNode.removeChild(peopleAddItems[i]);
      i--;
    }
  }

  // 初回さんドリンクバーフラグ
  var fstSidekinFlg = true;

  // 画面種別のマップを作成
  var nTypeMap = {};
  for(var line in layoutInfo_map){
    if(layoutInfo_map[line]["nDetailDispType"] != 0){
      // 遷移設定可能画面の場合
      nTypeMap[layoutInfo_map[line]["nMenuBookCode"]+"_"+layoutInfo_map[line]["nDispId"]] = layoutInfo_map[line]["nDetailDispType"];
    }
  }
  // オーダーメイドディッシュのパターンを追加セット
  nTypeMap[99999] = 1;


  var initInfo = {
    nTypeMap: nTypeMap,
    fstSidekinFlg: fstSidekinFlg,
    sideLinkBar: sideLinkBar,
    sideLinkBarTitle: sideLinkBarTitle
  }

  return initInfo;

}


function editHomeDispLayoutInfo(layoutInfo, nTypeMap) {
  var btn = checkHomeDispSpecific4Button(layoutInfo["cItemName"]);

  if(btn) {
    editHomeDispSpecific4Button(layoutInfo, btn);
  }else{
    editHomeDispOther(layoutInfo, nTypeMap);
  }
}

function checkHomeDispSpecific4Button(itemName) {
  var btn = null;
  switch(itemName) {
    case "お会計ボタン":
      btn = document.getElementById("home_btn3");
      return btn;
    case "注文履歴ボタン":
      btn = document.getElementById("top_history_btn");
      return btn;
    case "店員呼び出しボタン":
      btn = document.getElementById("top_call_btn");
      return btn;
    case "Laguageボタン":
      btn = document.getElementById("top_language_btn");
      return btn;
    default:
      console.log("ERROR itemName: " + itemName);
      return false;
  }
}

function editHomeDispSpecific4Button(layoutInfo, btn) {
  var arrangement = {
    height: layoutInfo["nHeight"+MSG_CSS_LANG]+DISP_UNIT,
    width: layoutInfo["nWidth"+MSG_CSS_LANG]+DISP_UNIT,
    top: layoutInfo["nDispPosition_Y"+MSG_CSS_LANG]+DISP_UNIT,
    left: layoutInfo["nDispPosition_X"+MSG_CSS_LANG]+DISP_UNIT,
    opacity: layoutInfo["dOpacity"]
  }

  if(layoutInfo["nDispFlg"] == 0){
    // 表示無効の場合
    arrangement["display"] = "none";
  }else{
    arrangement["display"] = "block";
  }

  setComponentStyle(btn, arrangement)

  // ボタンサイズ　スケール値化
  var size = parseInt(layoutInfo["nDispSize"+MSG_CSS_LANG]) * 0.01;
  // 拡大倍率
  var magnification = 1.05;
  makeButtonSizeCss(btn.id, size, magnification);
}

function editHomeDispText(layoutInfo, homeDisp) {
  // テキスト文言の場合
  var new_txt = document.createElement("div");
  new_txt.id = "levelItem_"+layoutInfo["nDispId"]+"_"+layoutInfo["nItemId"];
  // 選択中言語のテキストをセット
  new_txt.innerHTML = layoutInfo["cText"+MSG_CSS_LANG];
  new_txt.classList.add("levelItems");

  var arrangement = setArrangementForHomeDispText(layoutInfo);
  setComponentStyle(new_txt, arrangement);
  homeDisp.appendChild(new_txt);
}

function editImgLayout(layoutInfo, parentDisp, className) {
  var new_img = document.createElement("img");
  new_img.id = "levelItem_"+layoutInfo["nDispId"]+"_"+layoutInfo["nItemId"];
  // 選択中言語の画像をセット
  new_img.src = lis_fact_map[generateLangImgPath(layoutInfo["cDefaultImagePath"])];
  new_img.classList.add(className);

  // 表示サイズ
  var size = parseInt(layoutInfo["nDispSize"+MSG_CSS_LANG]) * 0.01;
  new_img.style.transform = "scale("+size+", "+size+")";
  new_img.setAttribute("size",size);

  var arrangement = setArrangementForImg(layoutInfo);
  setComponentStyle(new_img, arrangement);
  parentDisp.appendChild(new_img);
}

function editHomeDispOther(layoutInfo, nTypeMap) {
  // TOP画面タグ取得
  var homeDisp = document.getElementById("levelItem_10000_1");

  var dispType = parseInt(layoutInfo["nDispType"]);

  switch(dispType) {
    case DISP_TYPE["button"]:
      editHomeDispButton(layoutInfo, homeDisp, nTypeMap);
      break;
    case DISP_TYPE["item_button"]:
      editHomeDispItemButton(layoutInfo, homeDisp);
      break;
    case DISP_TYPE["text"]:
      editHomeDispText(layoutInfo, homeDisp);
      break;
    case DISP_TYPE["img"]:
      editImgLayout(layoutInfo, homeDisp, "levelItems");
      break;
    case DISP_TYPE["background"]:
      // 何もしない
      break;
    default:
      console.log("unknownDispType: " + dispType);
  }
}

function setComponentStyle(component, arrangement) {
  for(const [key, value] of Object.entries(arrangement)) {
    component.style[key] = value;
  }
}

function makeButtonSizeCss(buttonId, size, magnification) {
  // ボタン通常時サイズ
  var dfcss = '#'+buttonId+'{transform: scale('+size+');transition-duration: .3s}';
  var dfstyle = document.createElement('style');
  dfstyle.appendChild(document.createTextNode(dfcss));
  document.getElementsByTagName('head')[0].appendChild(dfstyle);

  // ボタン拡大時サイズ
  var css = '#'+buttonId+':hover{transform: scale('+size*magnification+');transition-duration: .3s}';
  var style = document.createElement('style');
  style.appendChild(document.createTextNode(css));
  document.getElementsByTagName('head')[0].appendChild(style);
}

function makeSoldOutIconCss(layoutInfo) {
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

function editHomeDispButton(layoutInfo, homeDisp, nTypeMap) {
  var btn_info = editHomeDispAnchor(layoutInfo, homeDisp);
  var btn = btn_info[0];
  var arrangement = btn_info[1];
  setComponentStyle(btn, arrangement);

  btn.classList.add("level_move");
  btn.setAttribute("goodsCd",layoutInfo["nSoldOutIcon_condition_cd"]);
  btn.setAttribute("goodsType",layoutInfo["nSoldOutIcon_condition_type"]);

  checkHomeDispButtonComingSoon(btn, layoutInfo);

  // 画面切替ボタンの場合
  if(nTypeMap[layoutInfo["nMenuBookCode"]+"_"+layoutInfo["nAfDispId"]] == 5){
    var onclickMessage = "cngLevel = "+layoutInfo['nAfDispId']+ "; ";
    onclickMessage += "touch();Data.data['scenes']['level'].onEntry(300); ";
    onclickMessage += "checkHierarchyCode("+layoutInfo['nHierarchyCode']+");";
    btn.setAttribute("onclick", onclickMessage);
  }else if(nTypeMap[layoutInfo["nMenuBookCode"]+"_"+layoutInfo["nAfDispId"]] != 0){
    // 商品詳細表示ボタンの場合
    btn.setAttribute("onclick","touch();levelDispGoodsDetail("+layoutInfo['nAfDispId']+");");
  }
}

function editHomeDispItemButton(layoutInfo, homeDisp) {
  var btn_info = editHomeDispAnchor(layoutInfo, homeDisp);
  var btn = btn_info[0];
  var arrangement = btn_info[1];
  setComponentStyle(btn, arrangement);

  btn.classList.add("level_goods");
  btn.setAttribute("goodsCd",layoutInfo["nGoodsCode"]);

  // オーダーメイド化設定のチェック
  var goodsCode = layoutInfo["nGoodsCode"];
  var orderMadeInfo = isOrderMade(goodsCode);

  if(orderMadeInfo["flg"] == true){
    var ordCd = orderMadeInfo["basedishcomboKey"];
    // サブ商品品切れチェック結果
    var ordSoldOutFlg = isOrderMadeGoodsSoldOut(ordCd);
    // 品切れチェック
    if(ordSoldOutFlg){
      btn.classList.add("off");
    }
    btn.setAttribute('onclick','touch(); orderMadeDishBaseSelectCheck('+ordCd+');createOerderDish('+ordCd+');');
  }else{
    if(m_goods_map[layoutInfo["nGoodsCode"]] == null){
      // 商品情報がない場合準備中アイコン有効化
      btn.classList.add("comsoon");
      btn.classList.add("off");
    }else if(m_goods_map[layoutInfo["nGoodsCode"]]["bySalesStatusType"] == "2"){
      // 品切れの場合、品切れ表示
      btn.classList.add("off");
    }
    btn.setAttribute("onclick","touch();dispLevelPopup("+layoutInfo["nGoodsCode"]+")");
  }
}

function makeHomeDispAnchor(layoutInfo, homeDisp) {
  var new_btn = document.createElement("a");
  new_btn.id = "levelItem_"+layoutInfo["nDispId"]+"_"+layoutInfo["nItemId"];
  new_btn.classList.add("level_so_"+layoutInfo["nHierarchyCode"]);
  new_btn.classList.add(MSG_CSS_LANG);
  new_btn.classList.add("levelItems");
  new_btn.href = "javascript:void(0)";
  homeDisp.appendChild(new_btn);

  return new_btn;
}

function makeArrangementForHomeDispAnchor(layoutInfo) {
  var arrangement = {
    position: "absolute",
    zIndex: 1
  };

  if(layoutInfo["nDispFlg"] == 0){
    // 表示無効の場合
    arrangement["display"] = "none";
  }else{
    arrangement["display"] = "block";
  }

  // 高さ
  arrangement["height"] = layoutInfo["nHeight"+MSG_CSS_LANG]+DISP_UNIT;
  // 幅
  arrangement["width"] = layoutInfo["nWidth"+MSG_CSS_LANG]+DISP_UNIT;
  // Y軸
  arrangement["top"] = layoutInfo["nDispPosition_Y"+MSG_CSS_LANG]+DISP_UNIT;
  // X軸
  arrangement["left"] = layoutInfo["nDispPosition_X"+MSG_CSS_LANG]+DISP_UNIT;

  // 透過率
  arrangement["opacity"] = layoutInfo["dOpacity"];

  return arrangement;
}

function addButtonImgForHomeDispAnchor(imgPath, btn) {
  if(imgPath != null && imgPath != ""){
    var btn_img = document.createElement("img");
    btn_img.src = lis_fact_map[generateLangImgPath(imgPath)];
    btn.appendChild(btn_img);
  }
}

function editHomeDispAnchor(layoutInfo, homeDisp) {
  var new_btn = makeHomeDispAnchor(layoutInfo, homeDisp);
  var arrangement = makeArrangementForHomeDispAnchor(layoutInfo);
  var imgPath = layoutInfo["cDefaultImagePath"];
  addButtonImgForHomeDispAnchor(imgPath, new_btn);

  var scale = 0.01;
  var size = parseInt(layoutInfo["nDispSize"+MSG_CSS_LANG]) * scale;
  new_btn.setAttribute("size",size);

  makeSoldOutIconCss(layoutInfo);

  return [new_btn, arrangement]
}

function isOrderMade(goodsCode) {
  var orderMadeInfo = {
    flg: false,
    basedishcomboKey: null
  };

  if(m_goods_map[goodsCode] == null
    || m_goods_map[goodsCode]["bySalesStatusType"] == '2'){
    // ベース商品の情報がそもそもない場合
    return orderMadeInfo;
  }

  for(var mbm in m_basedishcombo_map){
    if(m_basedishcombo_map[mbm]["nGoodsCode"] == layoutInfo["nGoodsCode"]){
      orderMadeInfo["flg"] = true;
      orderMadeInfo["basedishcomboKey"] = mbm;
      return orderMadeInfo;
    }
  }

  return orderMadeInfo;
}

function isOrderMadeGoodsSoldOut(ordCd) {
  // ハンバーグ,トッピング,ソース,ライス,サラダ
  // のいずれか一つでも品切れなら品切れ扱い

  // ハンバーグの品切れチェック
  if(isOrderMadeSubGoodsSoldOut(ordCd, "nHamburgGoodsCode")) {
    return true
  }
  // トッピングの品切れチェック
  if(isOrderMadeSubGoodsSoldOut(ordCd, "nToppingGoodsCode")) {
    return true
  }
  // ソースの品切れチェック
  if(isOrderMadeSubGoodsSoldOut(ordCd, "nSourceGoodsCode")) {
    return true
  }
  // ライスの品切れチェック
  if(isOrderMadeSubGoodsSoldOut(ordCd, "nRiceGoodsCode")) {
    return true;
  }
  // サラダの品切れチェック
  if(isOrderMadeSubGoodsSoldOut(ordCd, "nSaladGoodsCode")) {
    return true;
  }

  return false;
}

function isOrderMadeSubGoodsSoldOut(ordCd, subGroup) {
  if(m_basedishcombo_map[ordCd][subGroup] == null){
    return false;
  }

  var subGoods = m_goods_map[m_basedishcombo_map[ordCd][subGroup]]
  // 設定していなければ品切れになることはない
  if(subGoods == null) {
    return true;
  }

  // 品切れチェック
  var salesStatusType = subGoods["bySalesStatusType"]
  if (salesStatusType == '2'){
    return true;
  }

  return false;
}

function checkHomeDispButtonComingSoon(btn, layoutInfo) {
  var soldOutCategoriesString = layoutInfo['nSoldOutIcon_condition_type'];
  var soldOutGoodsCodeString = layoutInfo['nSoldOutIcon_condition_cd'];

  var comeSoonFlg = isComeSoon(soldOutCategoriesString, soldOutGoodsCodeString);
  console.log(layoutInfo["nMenuBookCode"])
  console.log(layoutInfo["nAfDispId"])
  console.log(`comsoon: ${comeSoonFlg}`)
  if(comeSoonFlg){
    // 準備中アイコン有効化
    btn.classList.add("comsoon");
    btn.classList.add("off");
  }
}

function isComeSoon(categoriesString, goodsCodeString) {
  var comeSoonFlg = true;

  if(categoriesString != "" && goodsCodeString != "") {
    return false;
  }

  comeSoonFlg = isComeSoonByCategories(categoriesString)
  if(!comeSoonFlg) {
    return comeSoonFlg;
  }
  comeSoonFlg = isComeSoonByGoodsCode(goodsCodeString)
  return comeSoonFlg
}

function isComeSoonByCategories(comeSoonString) {
  var comeSoonCategoryArray = comeSoonString.split(',');
  for(var comeSoonCategory in comeSoonCategoryArray){
    if(allGoodsMenutypes[comeSoonCategory] != null){
      // 該当する商品区分の商品が１つでもあったら、非準備中
      return false;
    }
  }
  return true;
}

function isComeSoonByGoodsCode(comeSoonString) {
    // 商品コードのチェック
  var comeSoonGoodsCodeArray = comeSoonString.split(',');
  for(var comeSoonGoodsCode of comeSoonGoodsCodeArray){
    if(m_goods_map[comeSoonGoodsCode] != null 
      && m_goods_map[comeSoonGoodsCode]["bySalesStatusType"] != "2"){
      // 商品情報がありかつ、販売可能な商品が１つでもあったら、非準備中
      return false;
    }
  }
  return true;
}

function setArrangementForHomeDispText(layoutInfo) {
  var arrangement = {};
  arrangement["display"] = "block";
  arrangement["position"] = "absolute";

  if(layoutInfo["nVerticalFlg"] == "1"){
    // 縦文字設定の場合
    arrangement["writingMode"] = "vertical-rl";
  }

  if(layoutInfo["nItalic"+MSG_CSS_LANG] == 1){
    // 斜体ONの場合
    arrangement["fontStyle"] = "italic";
  } else {
    arrangement["fontStyle"] = "";
  }

  if(layoutInfo["nDispFlg"] == 0){
    // 表示無効の場合
    arrangement["display"] = "none";
  } else {
    arrangement["display"] = "block";
  }

  // フォントサイズ
  arrangement["fontSize"] = layoutInfo["nFontSize"+MSG_CSS_LANG]+DISP_UNIT;
  // フォントカラー
  arrangement["color"] = layoutInfo["cColor"+MSG_CSS_LANG];
  // フォント太さ
  arrangement["fontWeight"] = layoutInfo["nFontWeight"+MSG_CSS_LANG];

  // 高さ
  arrangement["height"] = layoutInfo["nHeight"+MSG_CSS_LANG]+DISP_UNIT;
  // 幅
  arrangement["width"] = layoutInfo["nWidth"+MSG_CSS_LANG]+DISP_UNIT;
  // Y軸
  arrangement["top"] = layoutInfo["nDispPosition_Y"+MSG_CSS_LANG]+DISP_UNIT;
  // X軸
  arrangement["left"] = layoutInfo["nDispPosition_X"+MSG_CSS_LANG]+DISP_UNIT;

  return arrangement;
}

function setArrangementForImg(layoutInfo) {
  var arrangement = {};
  arrangement["display"] = "block";

  arrangement["position"] = "absolute";

  if(layoutInfo["nDispFlg"] == 0){
    // 表示無効の場合
    arrangement["display"] = "none";
  } else {
    arrangement["display"] = "block";
  }

  // 高さ
  arrangement["height"] = layoutInfo["nHeight"+MSG_CSS_LANG]+DISP_UNIT;
  // 幅
  arrangement["width"] = layoutInfo["nWidth"+MSG_CSS_LANG]+DISP_UNIT;
  // Y軸
  arrangement["top"] = layoutInfo["nDispPosition_Y"+MSG_CSS_LANG]+DISP_UNIT;
  // X軸
  arrangement["left"] = layoutInfo["nDispPosition_X"+MSG_CSS_LANG]+DISP_UNIT;

  return arrangement;
}

function editPeopleDispLayoutInfo(layoutInfo, nTypeMap) {
  // 人数入力画面の場合　※アプリ起動時の初回のみ　※設定ツール起動の場合は毎回処理
  var peopleDisp = document.getElementById("peopleDisp");
  var dispType = parseInt(layoutInfo["nDispType"]);

  switch(dispType) {
    case DISP_TYPE["img"]:
      editImgLayout(layoutInfo, peopleDisp, "peopleAddItems");
      break;
    case DISP_TYPE["background"]:
      editBackGroundLayout(layoutInfo, peopleDisp, "peopleAddItems");
      break;
    case DISP_TYPE["button"]:
      break;
    case DISP_TYPE["item_button"]:
      break;
    case DISP_TYPE["text"]:
      break;
    default:
      console.log("unknownDispType: " + dispType);
  }
}

function editBackGroundLayout(layoutInfo, parentDisp, className) {
  var new_bg_img = document.createElement("img");
  new_bg_img.id = "levelItem_"+layoutInfo["nDispId"]+"_"+layoutInfo["nItemId"];
  new_bg_img.src = lis_fact_map[generateLangImgPath(layoutInfo["cDefaultImagePath"])];
  new_bg_img.classList.add(className);

  var arrangement = {
    width: "100%",
    height: "100%"
  };

  setComponentStyle(new_bg_img, arrangement);
  parentDisp.appendChild(new_bg_img);
}
