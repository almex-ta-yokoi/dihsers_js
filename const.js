/**
 * 定数定義
 */

const guiCode = 1;

// エラー検出文言
const CONNECT_ERR_MSG = "<b>Warning</b>:  mysql_connect()";

// 画像の中心位置
const ORDERMADE_X = 30;
const ORDERMADE_Y = 20;
const ORDERMADE_Z = 100;

// オーダーメイドディッシュ共通商品コード
// TODO：仮値を設定
const ORDERMADE_BASE_CD = '9999';

// オーダーメイドディッシュ共通サブメニューコード
// TODO：仮値を設定
const ORDERMADE_SUBMENU_CD = "'9999'";

// phpルートフォルダパス
const PHP_ROOT_FOLDER = '../mcs_combo';

// エンタメオーダ用phpルートフォルダパス
const PHP_EN_ROOT_FOLDER = '/en_order/php';

// POSTタイムアウト時間
var POST_TIMEOUT_TIME = 15000;

// ハンバーグ用ビニール袋商品コード
var HB_PLS_BAG_CODE = '90001000';

// ドリンク・みそ汁用ビニール袋商品コード
var DM_PLS_BAG_CODE = '90001001';

// ダミー商品コード
var DUMMY_GOODS_CD = 1234567890;

// 画面_単位
var DISP_UNIT = "px";
// 画面ID
// TOP画面
var HOME_DISP_ID = 10000;
// 人数入力画面
var PEOPLE_DISP_ID = 10001;
// フッター
var FOOTER_DISP_ID = 10002;
// 注文確定
var ORD_FIX_DISP_ID = 10003;

// ブック共通コード
var MENUBOOK_ALL = 99999;

// 言語指定マッピング
var SLCT_LANG_MAPPING = {"jp":"","en":"En","kr":"Kr","cn":"Cn"}

// 階層画面押下処理内容
// オーダーメイド
var ORD_MADE_BTN_CLICK = "touch(); basedishcomboMstEdit();ordermadeBaseImage();orderMadeDishBaseSelectReset();orderMadeDishBaseSelectCheck(1);orderMadeDishBaseSelectCheck(2);orderMadeDishBaseSelectCheck(3);orderMadeDishBaseSelectCheck(4);orderMadeDishBaseSelectCheck(5);orderMadeDishBaseSelectCheck(6);"
var ORD_MADE_BTN_HREF = "root/ordermade";
var ORD_MADE_BTN_CLASS = "jBtn main_menu1_btn1";

// 階層画面ポップアップ-値段表示フラグ
var LEVEL_POP_PRICE_FLG = true;

// 塩分表示フラグ
var SOLT_DISP_FLG = true;

// カロリー表示フラグ
var CAL_DISP_FLG = true;

// 画像参照先が一部配列に切り替えれない
// 明示的に下記リストに記載されたidタグのbackGroundImageを書き換える
var EXP_CNG_IMG = ["ord-fix-bga"];

/*            運用保守ツール関連               */
// 画面階層管理マスタ jsonテンプレート
const baseSendFormat = "({nHierarchyCode}, {nMenuBookCode}, {nDefaultFlg}, {nDispId}, {cDispName}, {nItemId}, {cItemName}, {nDispType}, {cDefaultImagePath}, {nDispPosition_Xjp}, {nDispPosition_Xen}, {nDispPosition_Xkr}, {nDispPosition_Xcn}, {nDispPosition_Yjp}, {nDispPosition_Yen}, {nDispPosition_Ykr}, {nDispPosition_Ycn}, {nDispSizejp}, {nDispSizeen}, {nDispSizekr}, {nDispSizecn}, {nWidthjp}, {nWidthen}, {nWidthkr}, {nWidthcn}, {nHeightjp}, {nHeighten}, {nHeightkr}, {nHeightcn}, {cTextjp}, {cTexten}, {cTextkr}, {cTextcn}, {nItalicjp}, {nItalicen}, {nItalickr}, {nItaliccn}, {nFontSizejp}, {nFontSizeen}, {nFontSizekr}, {nFontSizecn}, {cColorjp}, {cColoren}, {cColorkr}, {cColorcn}, {nFontWeightjp}, {nFontWeighten}, {nFontWeightkr}, {nFontWeightcn}, {nVerticalFlg}, {nAfDispId}, {nGoodsCode}, {nDetailDispType}, {nDispMenuType}, {nDispFlg}, {dOpacity}, {nAfDispId1}, {nAfDispId2}, {nAfDispId3}, {nAfDispId4}, {nAfDispId5}, {nSoldOutIcon_X}, {nSoldOutIcon_Y}, {nSoldOutIcon_width}, {nSoldOutIcon_height}, {nSoldOutIcon_radius}, {nSoldOutIcon_condition_type}, {nSoldOutIcon_condition_cd}, {nSideLinkId}, {tCreateTime}, {tUpdateTime}, {cCreateId}, {cUpdateId})";

const baseLinkbarSendFormat = "({nSidLinkBerCode}, {nMenuBookCode}, {nSideLinkId}, {cSideLinkName}, {nItemId}, {cItemName}, {cDefaultImagePath}, {nAfDispId}, {nTitleFlg}, {nSoldOutIcon_condition_type}, {nSoldOutIcon_condition_cd}, {tCreateTime}, {tUpdateTime}, {cCreateId}, {cUpdateId})";

const submenuSendFormat = "({nSubmenuCode}, {byActFlg}, {tStartDate}, {tEndDate}, {byType}, {cTitleMsg}, {cTitleMsgEn}, {cTitleMsgKr}, {cTitleMsgCn}, {nGoodsCode}, {nSubGoodsCode1}, {nSubGoodsCode2}, {nSubGoodsCode3}, {nSubGoodsCode4}, {nDefaultPosition}, {byGoodsNameDispType}, {cFreeName1}, {cFreeName1En}, {cFreeName1Kr}, {cFreeName1Cn}, {cFreeName2}, {cFreeName2En}, {cFreeName2Kr}, {cFreeName2Cn}, {cFreeName3}, {cFreeName3En}, {cFreeName3Kr}, {cFreeName3Cn}, {cFreeName4}, {cFreeName4En}, {cFreeName4Kr}, {cFreeName4Cn}, {byDifferenceDispFlg}, {tCreateTime}, {tUpdateTime}, {cCreateId}, {cUpdateId})";

const menubookitemsFormat = "({nMenuBookCode}, {nGoodsCode}, {tStartValidDate}, {tEndValidDate}, {tCreateTime}, {tUpdateTime}, {cCreateId}, {cUpdateId})";

const negoodsgroupFormat = "({nNgGoodsGroupCode}, {nGoodsCode}, {cGoodsName}, {nNgGoodsCode}, {cNgGoodsName}, {tCreateTime}, {tUpdateTime}, {cCreateId}, {cUpdateId})";

const goodsDetailFormat = "UPDATE m_goodsdetail SET cGoodsName = {cGoodsName},cGoodsNameEn = {cGoodsNameEn},nCal = {nCal},nSalt = {nSalt},byMenuType = {byMenuType},nGoodsType = {nGoodsType},byAlcohol = {byAlcohol},bySelectCntFlg = {bySelectCntFlg},nDispPositionX = {nDispPositionX},nDispPositionY = {nDispPositionY},nHeightRate = {nHeightRate},nWidthRate = {nWidthRate},nZline = {nZline},wSelectEnableCount = {wSelectEnableCount},nDetailIndex = {nDetailIndex},byAllergyDetailDispFlg = {byAllergyDetailDispFlg},byAllergie1 = {byAllergie1},byAllergie2 = {byAllergie2},byAllergie3 = {byAllergie3},byAllergie4 = {byAllergie4},byAllergie5 = {byAllergie5},byAllergie6 = {byAllergie6},byAllergie7 = {byAllergie7},byAllergie8 = {byAllergie8},byAllergie9 = {byAllergie9},byAllergie10 = {byAllergie10},byAllergie11 = {byAllergie11},byAllergie12 = {byAllergie12},byAllergie13 = {byAllergie13},byAllergie14 = {byAllergie14},byAllergie15 = {byAllergie15},byAllergie16 = {byAllergie16},byAllergie17 = {byAllergie17},byAllergie18 = {byAllergie18},byAllergie19 = {byAllergie19},byAllergie20 = {byAllergie20},byAllergie21 = {byAllergie21},byAllergie22 = {byAllergie22},byAllergie23 = {byAllergie23},byAllergie24 = {byAllergie24},byAllergie25 = {byAllergie25},byAllergie26 = {byAllergie26},byAllergie27 = {byAllergie27},byAllergie28 = {byAllergie28},byAllergie29 = {byAllergie29},byAllergie30 = {byAllergie30},tUpdateTime = {tUpdateTime},cUpdateId = {cUpdateId} WHERE nGoodsCode = {nGoodsCode};";

const genericFormat = "({cFeatureName}, {cUseName}, {byId}, {byActFlg}, {tStartDate}, {tEndDate}, {cValue1}, {cValue2}, {cValue3}, {cValue4}, {cValue5}, {cValue6}, {cValue7}, {cValue8}, {cValue9}, {cValue10}, {cValue11}, {cValue12}, {cValue13}, {cValue14}, {cValue15}, {cValue16}, {cValue17}, {cValue18}, {cValue19}, {cValue20}, {cComment}, {tCreateTime}, {tUpdateTime}, {cCreateId}, {cUpdateId})";

const goods40mFormat = "UPDATE b0db040m SET byTakeoutDefaultType = {byTakeoutDefaultType},tUpdateTime = {tUpdateTime},cUpdateId = {cUpdateId} WHERE nGoodsCode = {nGoodsCode};";

const basedishcomboFormat = "({nBaseDishCode}, {nGoodsCode}, {nCngSourceGoodsCode1}, {nCngSourceGoodsCode2}, {nCngSourceGoodsCode3}, {cBaseDishName}, {cDispName}, {cBaseDishImage}, {nHamburgGoodsCode}, {nToppingGoodsCode}, {nSourceGoodsCode}, {nRiceGoodsCode}, {nSaladGoodsCode}, {tStartValidDate}, {tEndValidDate}, {tCreateTime}, {tUpdateTime}, {cCreateId}, {cUpdateId})";