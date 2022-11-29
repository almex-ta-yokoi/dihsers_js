'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// //________________________________________________________________________ Utilityクラス

// var Util = function () {
//   function Util() {
//     _classCallCheck(this, Util);
//   }
//   // 桁ハイフン付金額表示を返す


//   _createClass(Util, null, [{
//     key: 'getPrice',
//     value: function getPrice(value) {
//       return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
//     }
//   }]);

//   return Util;
// }();

//________________________________________________________________________データ管理クラス


var Data = function () {
  function Data() {
    _classCallCheck(this, Data);

    throw new Error("Dataクラスはstaticのみ newは禁止です");
  }

  _createClass(Data, null, [{
    key: 'get',
    value: function get(key) {
      return this.data[key];
    }
  }, {
    key: 'set',
    value: function set(key, value) {
      return this.data[key] = value;
    }
  }, {
    key: 'getItemById',
    value: function getItemById(id) {
      return this.items.find(function (item) {
        return item.id == id;
      });
    }
  }, {
    key: 'load',
    value: function load(url) {
    }
  }, {
    key: 'data',
    get: function get() {
      if (!this.dataObj) this.dataObj = {};
      return this.dataObj;
    }
  }, {
    key: 'items',
    get: function get() {
      if (!this.dataItems) this.dataItems = dataItems['items'];
      return this.dataItems;
    }
  }]);

  return Data;
}();

//________________________________________________________________________ EventDispatcherクラス

var EventDispatcher = function () {
  function EventDispatcher() {
    _classCallCheck(this, EventDispatcher);

    this.listeners = {};
  }

  _createClass(EventDispatcher, [{
    key: 'addEventListener',
    value: function addEventListener(state, callback, isCapture) {
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener(state, callback) {
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(e, data) {
    }
  }]);

  return EventDispatcher;
}();

//________________________________________________________________________状態管理クラス


var Statemachine = function (_EventDispatcher) {
  _inherits(Statemachine, _EventDispatcher);

  function Statemachine(name) {
    _classCallCheck(this, Statemachine);

    var _this2 = _possibleConstructorReturn(this, (Statemachine.__proto__ || Object.getPrototypeOf(Statemachine)).call(this));

    _this2.children = {};
    _this2.name = _this2.currentPath = name;
    _this2.transitionList = [];
    return _this2;
  }

  _createClass(Statemachine, [{
    key: 'addScene',
    value: function addScene(scene) {
      var addSceneDone = scene.name + "addScene完了"
	    startMeasuringElapsedTime("addSceneStart");
      this.children[scene.name] = scene;
			stopMeasuringElapsedTime("addSceneStart", addSceneDone);
    }
  }, {
    key: 'removeScene',
    value: function removeScene(scene) {
      var removeSceneDone = scene.name + "removeScene完了"
	    startMeasuringElapsedTime("removeSceneStart");
      delete this.children[scene.name];
			stopMeasuringElapsedTime("removeSceneStart", removeSceneDone);
    }
  }, {
    key: 'changeScene',
    value: function changeScene(targetPath) {
      console.log(this.currentPath)
      var changeSceneDone = this.cuurentPath + "→" + targetPath + "完了"
	    startMeasuringElapsedTime("changeSceneStart");
      if (!targetPath || targetPath == this.currentPath) {
        return;
      }
      console.log("changeSceneが呼ばれました")
      console.log(targetPath)
      this.dispatchEvent(new Event('onChange'));
      this.setTransitionList(targetPath);
      this.transition();
      this.currentPath = targetPath;
			stopMeasuringElapsedTime("changeSceneStart", changeSceneDone);
    }
  }, {
    key: 'transition',
    value: function transition() {
      console.log("transition")
      if (!this.transitionList[0]) {
        this.dispatchEvent(new Event('onChanged'));
        return;
      }
      var trans = this.transitionList.shift();
      var scene = this.getSceneByPath(trans[0]);
      var _this = this;
      if (!scene) return;
      Promise.resolve().then(function () {
        if (trans[1] == 'onEntry') scene.onEntry();
        if (trans[1] == 'onExit') scene.onExit();
      }).then(function () {
        _this.transition();
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'setTransitionList',
    value: function setTransitionList(targetPath) {
      this.transitionList = [];
      var currentList = this.currentPath.split("/");
      var targetList = targetPath.split("/");
      var len = Math.max(targetList.length, currentList.length);
      var pList1 = [];
      var pList2 = [];
      for (var i = 0; i < len; i++) {
        if (targetList[i] != currentList[i]) {
          if (currentList[i]) {
            pList1.push([currentList.slice(0, i + 1).join("/"), 'onExit']);
          }
          if (targetList[i]) {
            pList2.push([targetList.slice(0, i + 1).join("/"), 'onEntry']);
          }
        }
      }
      this.transitionList = pList1.reverse().concat(pList2);
    }
  }, {
    key: 'getSceneByPath',
    value: function getSceneByPath(path) {
      var scene = this;
      var list = path.split("/");
      for (var i = 1; i < list.length; i++) {
        scene = scene.children[list[i]];
      }
      return scene;
    }
  }]);

  return Statemachine;
}(EventDispatcher);

//____________________________________シーンクラス


var Scene = function (_Statemachine) {
  _inherits(Scene, _Statemachine);

  function Scene(name) {
    _classCallCheck(this, Scene);

    return _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this, name));
  }

  _createClass(Scene, [{
    key: 'onEntry',
    value: function onEntry() {
    }
  }, {
    key: 'onExit',
    value: function onExit() {
    }
  }]);

  return Scene;
}(Statemachine);

// ____________________________________________________________________________________ グロナビ

var Gnav = function () {
  function Gnav() {
    _classCallCheck(this, Gnav);

    this.initEvents();
  }

  _createClass(Gnav, [{
    key: 'initEvents',
    value: function initEvents() {

      function changeByHash() {
      }

      $('.jBtn').each(function (index, el) {
        $(el).on('click', function () {
          if(!($(el).attr('href') == "javascript:void(0)" || $(el).attr('href') == "javascript:void(0);")){
            location.hash = $(el).attr('href');
            return false;
          }
        });
      });

      window.addEventListener("hashchange", function () {
        Gnav.changeByHash();
        console.log("hashchangeEvent発動")
      });

      Data.data['scenes']['root'].addEventListener('onChanged', function () {
        var $btn = $('.c-menu1 a[href^="' + Data.data['scenes']['root'].currentPath + '"]');
        if (!$btn[0]) return;
        $('.c-menu1 a').removeClass('current');
        $btn.addClass('current');
      });
    }
  }], [{
    key: 'changeByHash',
    value: function changeByHash() {
      console.log("changeByHash")
      Data.data['scenes']['root'].changeScene(location.hash.split('#')[1]);
    }
  }, {
    key: 'addMenu',
    value: function addMenu(num) {
    }
  }, {
    key: 'removeMenu',
    value: function removeMenu(num) {
    }
  }]);

  return Gnav;
}();

// ナビ変更付きシーン


var SceneA = function (_Scene) {
  _inherits(SceneA, _Scene);

  function SceneA(name, id) {
    _classCallCheck(this, SceneA);

    var _this4 = _possibleConstructorReturn(this, (SceneA.__proto__ || Object.getPrototypeOf(SceneA)).call(this, name));

    _this4.menuId = id;
    return _this4;
  }

  _createClass(SceneA, [{
    key: 'onEntry',
    value: function onEntry() {
      // Gnav.addMenu(this.menuId);
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      // Gnav.removeMenu(this.menuId);
    }
  }]);

  return SceneA;
}(Scene);

// ____________________________________________________________________________________ ドリンクシーン


var SceneDrink = function (_Scene3) {
  _inherits(SceneDrink, _Scene3);

  function SceneDrink(name) {
    _classCallCheck(this, SceneDrink);

    var _this6 = _possibleConstructorReturn(this, (SceneDrink.__proto__ || Object.getPrototypeOf(SceneDrink)).call(this, name));

    Data.data['drinkView'] = new DrinkView();
    return _this6;
  }

  _createClass(SceneDrink, [{
    key: 'onEntry',
    value: function onEntry() {
      $('#c-menu1__btn5').addClass('current');
      $('.s-drink').removeClass('is-hide');
      outOparationLog("ドリンクメニュー画面表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneDrink.prototype.__proto__ || Object.getPrototypeOf(SceneDrink.prototype), 'onExit', this).call(this);
      $('.s-drink').addClass('is-hide');
    }
  }]);

  return SceneDrink;
}(Scene);

var DrinkView = function () {
  function DrinkView() {
    _classCallCheck(this, DrinkView);

    this.initView();
    this.initEvents();
  }

  _createClass(DrinkView, [{
    key: 'initView',
    value: function initView() {
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
    }
  }]);

  return DrinkView;
}();

// var DrinkView = function () {
//   function DrinkView() {
//     _classCallCheck(this, DrinkView);

//     this.initView();
//     this.initEvents();
//   }

//   _createClass(DrinkView, [{
//     key: 'initView',
//     value: function initView() {
//     }
//   }, {
//     key: 'initEvents',
//     value: function initEvents() {
//     }
//   }]);

//   return DrinkView;
// }();

// ____________________________________________________________________________________ 汎用メニューシーン

var SceneKids = function (_Scene51) {
  _inherits(SceneKids, _Scene51);

  function SceneKids(name) {
    _classCallCheck(this, SceneKids);

    var _this6 = _possibleConstructorReturn(this, (SceneKids.__proto__ || Object.getPrototypeOf(SceneKids)).call(this, name));

    return _this6;
  }

  _createClass(SceneKids, [{
    key: 'onEntry',
    value: function onEntry() {
      $('#c-menu1__btn5').addClass('current');
      $('.s-kids').removeClass('is-hide');
      outOparationLog("汎用メニュー画面表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneKids.prototype.__proto__ || Object.getPrototypeOf(SceneKids.prototype), 'onExit', this).call(this);
      $('.s-kids').addClass('is-hide');
    }
  }]);

  return SceneKids;
}(Scene);

// ____________________________________________________________________________________ 言語シーン

var SceneLanguage = function (_Scene52) {
  _inherits(SceneLanguage, _Scene52);

  function SceneLanguage(name) {
    _classCallCheck(this, SceneLanguage);

    var _this6 = _possibleConstructorReturn(this, (SceneLanguage.__proto__ || Object.getPrototypeOf(SceneLanguage)).call(this, name));

    return _this6;
  }

  _createClass(SceneLanguage, [{
    key: 'onEntry',
    value: function onEntry() {
      $('#c-menu1__btn5').addClass('current');
      $('.s-language').removeClass('is-hide');
      $('.c-menu1').addClass('is-hide');
      $('#takeoutSide').addClass('is-hide');
      $('.eatin-side').addClass('is-hide');
      outOparationLog("言語切替画面表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneLanguage.prototype.__proto__ || Object.getPrototypeOf(SceneLanguage.prototype), 'onExit', this).call(this);
      $('.s-language').addClass('is-hide');
      $('.c-menu1').removeClass('is-hide');
      $('#takeoutSide').removeClass('is-hide');
      $('.eatin-side').removeClass('is-hide');
    }
  }]);

  return SceneLanguage;
}(Scene);

// ____________________________________________________________________________________ オーダーシーン

var SceneOrder = function (_Scene4) {
  _inherits(SceneOrder, _Scene4);

  function SceneOrder(name) {
    _classCallCheck(this, SceneOrder);

    return _possibleConstructorReturn(this, (SceneOrder.__proto__ || Object.getPrototypeOf(SceneOrder)).call(this, name));
  }

  _createClass(SceneOrder, [{
    key: 'onEntry',
    value: function onEntry() {
    }
  }, {
    key: 'onExit',
    value: function onExit() {
    }
  }]);

  return SceneOrder;
}(Scene);

// __________________________________________________選択シーン


var SceneOrderSelect = function (_Scene5) {
  _inherits(SceneOrderSelect, _Scene5);

  function SceneOrderSelect(name) {
    _classCallCheck(this, SceneOrderSelect);

    return _possibleConstructorReturn(this, (SceneOrderSelect.__proto__ || Object.getPrototypeOf(SceneOrderSelect)).call(this, name));
  }

  _createClass(SceneOrderSelect, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-order-select').removeClass('is-hide');
      $('.p-orderSelectBox1').scrollTop(0);
      outOparationLog("オーダーメイドディッシュ作成画面表示");
      console.log("オーダーメイド選択")

    }
  }, {
    key: 'onExit',
    value: function onExit() {
      $('.s-order-select').addClass('is-hide');
      OrderView.reset();
    }
  }]);

  return SceneOrderSelect;
}(Scene);

// __________________________________________________ナイスチョイスシーン
var tmpDelay = 0;
var SceneOrderChoice = function (_Scene7) {
  _inherits(SceneOrderChoice, _Scene7);

  function SceneOrderChoice(name) {
    _classCallCheck(this, SceneOrderChoice);

    return _possibleConstructorReturn(this, (SceneOrderChoice.__proto__ || Object.getPrototypeOf(SceneOrderChoice)).call(this, name));
    //
  }

  _createClass(SceneOrderChoice, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-choice').removeClass('is-hide');
      $('.s-order-select').addClass('is-hide');
      $('.c-menu1').addClass('is-hide');
      $('.c-menu4').addClass('is-hide');
      $('.eatin-side').addClass('is-hide');
      // 選択商品名をセット
      document.getElementById('hbChoice').innerHTML = document.getElementById('hbStatus').innerHTML;
      document.getElementById('tpChoice').innerHTML = document.getElementById('tpStatus').innerHTML;
      document.getElementById('rpChoice').innerHTML = document.getElementById('rpStatus').innerHTML;
      document.getElementById('scChoice').innerHTML = document.getElementById('scStatus').innerHTML;
      document.getElementById('srChoice').innerHTML = document.getElementById('srStatus').innerHTML;
      var tmpWithGoodsDetailFlg = withGoodsDetailFlg;
        $(function (){
          if(withGoodsDetailFlg){
            // ごいっしょにいかがですか処理
            $('.s-dialog23').removeClass('is-hide');
            // 初期選択数
            var fstCnt = document.getElementById("ordermade_animation").getElementsByClassName("ordermade_goods_first").length;
            // 追加数
            var addCnt = document.getElementById("ordermade_animation").getElementsByClassName("ordermade_goods2").length;
            var addCnt2 = document.getElementById("ordermade_animation").getElementsByClassName("ordermade_goods3").length;
            // 待機時間を計算
            var totalCnt = fstCnt + addCnt + addCnt2 - 3;
            tmpDelay = new BigNumber(totalCnt).times(new BigNumber(0.12)).plus(new BigNumber(1.9));
            if(totalCnt == 0){
              tmpDelay = tmpDelay.minus(new BigNumber(0.1));
            }
            if(totalCnt == 1){
              tmpDelay = tmpDelay.minus(new BigNumber(0.1));
            }
            if(totalCnt == 2){
              tmpDelay = tmpDelay.minus(new BigNumber(0.2));
            }
            if(totalCnt == 3){
              tmpDelay = tmpDelay.minus(new BigNumber(0.2));
            }
            if(totalCnt == 4){
              tmpDelay = tmpDelay.minus(new BigNumber(0.45));
            }
            setTimeout(function () {
              document.getElementById("s-dialog23-slid").style.transitionDelay = tmpDelay+'s';
              document.getElementById("s-choice").style.transitionDelay = tmpDelay+'s';
              document.getElementById("s-dialog23-slid").classList.add('s-dialog23-disp');
              document.getElementById("s-choice").classList.add('s-dialog23-disp-bg');
            }, 1000);
            outOparationLog("ご一緒にいかがですか画面-表示");
          }
          // アニメーション処理
          goodsEndAnimation();
        });
      $(function (){
          if(bassingFlg){return;} // 途中でバッシング処理が実行された場合、何もしない
          // 画面キャプチャ取得
          getOrdMadePic();
      });
      setTimeout(function () {
        if(bassingFlg){return;} // 途中でバッシング処理が実行された場合、何もしない
        if(!tmpWithGoodsDetailFlg){
          location.href = '#root/cart';
          Data.data['scenes']['root'].changeScene('root/cart');
          dishEditingFlg = false;
          changeSideLnk();
          $('.c-menu1').removeClass('is-hide');
          $('.eatin-side').removeClass('is-hide');
          $('.c-menu4').removeClass('is-hide');
        }
        $(function (){
          console.log("オーダーメイド画像送信")
          sendOrderMadeImgPost();
        });
      }, 5000);
      outOparationLog("オーダーメイドディッシュ完成画面表示");
    }

  }, {
    key: 'onExit',
    value: function onExit() {
      // _get(SceneOrderChoice.prototype.__proto__ || Object.getPrototypeOf(SceneOrderChoice.prototype), 'onExit', this).call(this);
      $('.s-choice').addClass('is-hide');
      // $('.s-order-select').addClass('is-hide');
      // // Cart.selectReset();
    }
  }]);

  return SceneOrderChoice;
}(Scene);

function removeTags(str) {
  return str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
}

//______________________________________________________________________カートクラス

// var Cart = function () {
//   function Cart() {
//     _classCallCheck(this, Cart);

//     Cart.reset();
//     Cart.selectReset();
//     Cart.updateOrderItemTotal();
//   }

//   _createClass(Cart, [{
//     key: 'addOrderItem',
//     value: function addOrderItem(id, num) {
//     }
//   }, {
//     key: 'addCart',
//     value: function addCart(id) {
//     }
//   }, {
//     key: 'removeCart',
//     value: function removeCart(id) {
//     }
//   }], [{
//     key: 'reset',
//     value: function reset() {
//     }
//   }, {
//     key: 'selectReset',
//     value: function selectReset() {
//       Data.data['ordermadeItem'] = {
//         'hamburg': {},
//         'source': {},
//         'topping': {},
//         'rice': {},
//         'salad': {}
//       };
//       Data.data['currentSelectItem'] = null;
//       Data.data['ordermadeItemTotal'] = null;
//       View.update();
//     }
//   }, {
//     key: 'updateOrderItemTotal',
//     value: function updateOrderItemTotal() {
//       var obj = Data.data['ordermadeItem'];
//       var price = 0;
//       var salt = 0;
//       var cal = 0;
//       var list = '';
//       var items = [];
//       for (var type in obj) {
//         for (var id in obj[type]) {
//           var numStr = '';
//           var num = Number(obj[type][id]);
//           if (num == 0) delete Data.data['ordermadeItem'][type][id];
//           if (num > 1) numStr = " x " + num;
//           var item = Data.getItemById(id);
//           price += Number(item['price']) * num * 100;
//           salt += Number(item['salt']) * num * 100;
//           cal += Number(item['cal']) * num * 100;
//           list += '<li>' + removeTags(item['name']) + numStr + '</li>';
//           items.push(id);
//         }
//       }
//       Data.data['ordermadeItemTotal'] = {};
//       Data.data['ordermadeItemTotal']['price'] = price / 100;
//       Data.data['ordermadeItemTotal']['salt'] = salt / 100;
//       Data.data['ordermadeItemTotal']['cal'] = cal / 100;
//       Data.data['ordermadeItemTotal']['list'] = list;
//       Data.data['ordermadeItemTotal']['items'] = items;
//       Data.data['ordermadeItemTotal']['id'] = 0;
//       Data.data['ordermadeItemTotal']['name'] = 'オーダーメイドディッシュ';
//     }
//   }]);

//   return Cart;
// }();

//______________________________________________________________________買い物かごクラス

// var CartView = function () {
//   function CartView() {
//     this.iTemp = $('.cartItem--temp2').remove();
//   }

//   _createClass(CartView, [{
//     key: 'update',
//     value: function update() {
//     }
//   }, {
//     key: 'setCartItem',
//     value: function setCartItem(cartID, name, list, price, id) {
//     }
//   }, {
//     key: 'initEvents',
//     value: function initEvents() {
//     }
//   }]);

//   return CartView;
// }();

//___________________________________Flash MovieClipsクラス

var MovieClips = function () {
  function MovieClips() {
    _classCallCheck(this, MovieClips);

    //this.mc1 = exportRoot.order_select_mc;
  }

  _createClass(MovieClips, [{
    key: 'reset',
    value: function reset() {
    }
  }, {
    key: 'update',
    value: function update() {
    }
  }]);

  return MovieClips;
}();

//___________________________________オーダーメイン画面


var OrderView = function () {
  function OrderView() {
    _classCallCheck(this, OrderView);

    this.initView();
    this.initEvents();
    OrderView.obj().currentNavNum = 0;
    OrderView.obj().currentNavMaxNum = 0;
  }

  _createClass(OrderView, [{
    key: 'initView',
    value: function initView() {
      var temp = $('.p-orderSelectBtn1').parent();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      $('main').css({ 'opacity': 1, 'pointer-events': 'auto' });
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
      var _this = this;
      $('.p-orderSelectNav__btn').each(function (index, el) {
        $(el).on('click', function () {
          outOparationLog("オーダーメイドディッシュベース作成画面-一覧選択,選択:"+index);
          // 次へボタンの自動実行禁止化
          nextBanFlg = true;

          // 文字色を初期化
          $('.p-orderSelectNav__btn').removeClass('ordermade-selected');
          // 文字色を変更
          $(el).addClass('ordermade-selected');

          $('.p-orderSelectMenu__nav').removeClass('current');
          $('.p-orderSelectMenu__nav').eq(index).addClass('current');
          createorderMadeList($(el).attr('id').replace('Btn',''),null);
          $(el).addClass('ordermade-selected');

          // ガイドメッセージ非表示化
          // document.getElementById('ordmade_guide_msg').style.display= 'none';
	      	document.getElementById('ordmade_guide_msg').style.animation = 'ordmade_guide_msg_ani 0.5s forwards';
        });
      });
    }
  }, {
    key: 'update',
    value: function update() {
    }
  }], [{
    key: 'obj',
    value: function obj() {
      if (!this.staticObj) this.staticObj = {};
      return this.staticObj;
    }
  }, {
    key: 'reset',
    value: function reset() {
    }
  }]);

  return OrderView;
}();

//______________________________________________________________________ 表示画面設定


var View = function () {
  function View() {
    _classCallCheck(this, View);
    Data.data['orderView'] = new OrderView();
  }

  _createClass(View, null, [{
    key: 'update',
    value: function update() {
    }
  }]);

  return View;
}();

//


var RootScene = function (_Scene8) {
  _inherits(RootScene, _Scene8);

  function RootScene(name) {
    _classCallCheck(this, RootScene);
    return _possibleConstructorReturn(this, (RootScene.__proto__ || Object.getPrototypeOf(RootScene)).call(this, name));
  }

  return RootScene;
}(Scene);

// ____________________________________________________________________________________ カートシーン

var SceneCart = function (_SceneA2) {
  _inherits(SceneCart, _SceneA2);

  function SceneCart(name) {
    _classCallCheck(this, SceneCart);

    return _possibleConstructorReturn(this, (SceneCart.__proto__ || Object.getPrototypeOf(SceneCart)).call(this, name, 0));
  }

  _createClass(SceneCart, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-cart').removeClass('is-hide');
      $('.c-menu1').css('z-index', -100);
      $('.eatin-side').css('z-index', -100);
      $('#takeoutSide').addClass('is-hide');
      outOparationLog("注文確定&注文履歴画面表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneCart.prototype.__proto__ || Object.getPrototypeOf(SceneCart.prototype), 'onExit', this).call(this);
      $('.s-cart').addClass('is-hide');
      $('.c-menu1').css('z-index', 11);
      $('.eatin-side').css('z-index', 11);
    }
  }]);

  return SceneCart;
}(SceneA);

// ____________________________________________________________________________________ ホームシーン


var SceneHome = function (_SceneA3) {
  _inherits(SceneHome, _SceneA3);

  function SceneHome(name) {
    _classCallCheck(this, SceneHome);

    return _possibleConstructorReturn(this, (SceneHome.__proto__ || Object.getPrototypeOf(SceneHome)).call(this, name, 0));
  }

  _createClass(SceneHome, [{
    key: 'onEntry',
    value: function onEntry() {
      ordFixAfDispId = "0";
      additionMessage("[Log       ]", "ホームシーン: is-hideクラスremove開始");
      startMeasuringElapsedTime("sceneHomeRemoveStart");
      $('.s-home').removeClass('is-hide');
      stopMeasuringElapsedTime("sceneHomeRemoveStart", "ホームシーンis-hideRemove完了");
      additionMessage("[Log       ]", "ホームシーン: is-hideクラスremove完了");
      recordStopCheckIn();
      outOparationLog("TOP画面表示"+(sideOpeFlg ? "-フッター操作":""));
      sideOpeFlg = false;
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneHome.prototype.__proto__ || Object.getPrototypeOf(SceneHome.prototype), 'onExit', this).call(this);
      additionMessage("[Log       ]", "ホームシーン: is-hideクラスadd開始");
      startMeasuringElapsedTime("sceneHomeAddStart");
      $('.s-home').addClass('is-hide');
      stopMeasuringElapsedTime("sceneHomeAddStart", "ホームシーンis-hideAdd完了");
      additionMessage("[Log       ]", "ホームシーン: is-hideクラスadd完了");
    }
  }]);

  return SceneHome;
}(SceneA);

// ____________________________________________________________________________________ オーダーメードシーン


var SceneOrdermade = function (_SceneA4) {
  _inherits(SceneOrdermade, _SceneA4);

  function SceneOrdermade(name) {
    _classCallCheck(this, SceneOrdermade);

    var _this17 = _possibleConstructorReturn(this, (SceneOrdermade.__proto__ || Object.getPrototypeOf(SceneOrdermade)).call(this, name, 0));

    return _this17;
  }

  _createClass(SceneOrdermade, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-ordermade').removeClass('is-hide');
      outOparationLog("オーダーメイドディッシュベース選択画面表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneOrdermade.prototype.__proto__ || Object.getPrototypeOf(SceneOrdermade.prototype), 'onExit', this).call(this);
      $('.s-ordermade').addClass('is-hide');
    }
  }]);

  return SceneOrdermade;
}(SceneA);

// ____________________________________________________________________________________ アレルギーシーン


var SceneAllergen = function (_SceneA5) {
  _inherits(SceneAllergen, _SceneA5);

  function SceneAllergen(name) {
    _classCallCheck(this, SceneAllergen);

    return _possibleConstructorReturn(this, (SceneAllergen.__proto__ || Object.getPrototypeOf(SceneAllergen)).call(this, name, 0));
  }

  _createClass(SceneAllergen, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-allergen').removeClass('is-hide');
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneAllergen.prototype.__proto__ || Object.getPrototypeOf(SceneAllergen.prototype), 'onExit', this).call(this);
      $('.s-allergen').addClass('is-hide');
    }
  }]);

  return SceneAllergen;
}(SceneA);

// ____________________________________________________________________________________ アレルギーシーン（ドリンク画面）

var SceneAllergenOther = function (_SceneA5) {
  _inherits(SceneAllergenOther, _SceneA5);

  function SceneAllergenOther(name) {
    _classCallCheck(this, SceneAllergenOther);

    return _possibleConstructorReturn(this, (SceneAllergenOther.__proto__ || Object.getPrototypeOf(SceneAllergenOther)).call(this, name, 0));
  }

  _createClass(SceneAllergenOther, [{
    key: 'onEntry',
    value: function onEntry() {
      // css適用遅延箇所を透明化
      $('.aller-modal').removeClass('is-hide');
      document.getElementById('aller_scroll').style.opacity = '0';
      document.getElementById('aller_scroll').scrollTop = 0;
      $(function(){
          $(function(){
            setTimeout(function(){
              // DOM構築完了後、数ミリ秒おき透明化解除
              document.getElementById('aller_scroll').style.opacity = '1';
            },300);
          });
      });
      outOparationLog("アレルギーポップアップ表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneAllergenOther.prototype.__proto__ || Object.getPrototypeOf(SceneAllergenOther.prototype), 'onExit', this).call(this);
      document.getElementById('aller_scroll').style.opacity = '0';
      $('.aller-modal').addClass('is-hide');
    }
  }]);

  return SceneAllergenOther;
}(SceneA);

// ____________________________________________________________________________________ 電源OFFシーン

var SceneOffScreen = function (_SceneA99) {
  _inherits(SceneOffScreen, _SceneA99);

  function SceneOffScreen(name) {
    _classCallCheck(this, SceneOffScreen);

    return _possibleConstructorReturn(this, (SceneOffScreen.__proto__ || Object.getPrototypeOf(SceneOffScreen)).call(this, name, 0));
  }

  _createClass(SceneOffScreen, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-offScreen').removeClass('is-hide');
      outOparationLog("電源OFF画面表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneOffScreen.prototype.__proto__ || Object.getPrototypeOf(SceneOffScreen.prototype), 'onExit', this).call(this);
      $('.s-offScreen').addClass('is-hide');
    }
  }]);

  return SceneOffScreen;
}(SceneA);

// ____________________________________________________________________________________ 画面切替確認ポップアップシーン

var SceneDialog = function (_SceneA99) {
  _inherits(SceneDialog, _SceneA99);

  function SceneDialog(name) {
    _classCallCheck(this, SceneDialog);

    return _possibleConstructorReturn(this, (SceneDialog.__proto__ || Object.getPrototypeOf(SceneDialog)).call(this, name, 0));
  }

  _createClass(SceneDialog, [{
    key: 'onEntry',
    value: function onEntry() {
      // document.getElementById('dialog').setAttribute('href','#root/order/order-select');
      $('.s-dialog').removeClass('is-hide');
      outOparationLog("画面切替確認ポップアップ表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneDialog.prototype.__proto__ || Object.getPrototypeOf(SceneDialog.prototype), 'onExit', this).call(this);
      $('.s-dialog').addClass('is-hide');
    }
  }]);

  return SceneDialog;
}(SceneA);

// ____________________________________________________________________________________ 注文確定エラーポップアップシーン

var SceneDialog2 = function (_SceneA99) {
  _inherits(SceneDialog2, _SceneA99);

  function SceneDialog2(name) {
    _classCallCheck(this, SceneDialog2);

    return _possibleConstructorReturn(this, (SceneDialog2.__proto__ || Object.getPrototypeOf(SceneDialog2)).call(this, name, 0));
  }

  _createClass(SceneDialog2, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-dialog2').removeClass('is-hide');
      outOparationLog("注文確定エラーポップアップ表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneDialog2.prototype.__proto__ || Object.getPrototypeOf(SceneDialog2.prototype), 'onExit', this).call(this);
      $('.s-dialog2').addClass('is-hide');
    }
  }]);

  return SceneDialog2;
}(SceneA);

// ____________________________________________________________________________________ 初回テーブル情報取得エラーポップアップシーン

var SceneDialog3 = function (_SceneA99) {
  _inherits(SceneDialog3, _SceneA99);

  function SceneDialog3(name) {
    _classCallCheck(this, SceneDialog3);

    return _possibleConstructorReturn(this, (SceneDialog3.__proto__ || Object.getPrototypeOf(SceneDialog3)).call(this, name, 0));
  }

  _createClass(SceneDialog3, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-dialog3').removeClass('is-hide');
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneDialog3.prototype.__proto__ || Object.getPrototypeOf(SceneDialog3.prototype), 'onExit', this).call(this);
      $('.s-dialog3').addClass('is-hide');
    }
  }]);

  return SceneDialog3;
}(SceneA);

// ____________________________________________________________________________________ 店員呼び出しポップアップシーン

var SceneDialog4 = function (_SceneA99) {
  _inherits(SceneDialog4, _SceneA99);

  function SceneDialog4(name) {
    _classCallCheck(this, SceneDialog4);

    return _possibleConstructorReturn(this, (SceneDialog4.__proto__ || Object.getPrototypeOf(SceneDialog4)).call(this, name, 0));
  }

  _createClass(SceneDialog4, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-dialog4').removeClass('is-hide');
      outOparationLog("店員呼び出しポップアップ表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneDialog4.prototype.__proto__ || Object.getPrototypeOf(SceneDialog4.prototype), 'onExit', this).call(this);
      $('.s-dialog4').addClass('is-hide');
    }
  }]);

  return SceneDialog4;
}(SceneA);

// ____________________________________________________________________________________ 店員呼び出しエラーシーン

var SceneDialog5 = function (_SceneA99) {
  _inherits(SceneDialog5, _SceneA99);

  function SceneDialog5(name) {
    _classCallCheck(this, SceneDialog5);

    return _possibleConstructorReturn(this, (SceneDialog5.__proto__ || Object.getPrototypeOf(SceneDialog5)).call(this, name, 0));
  }

  _createClass(SceneDialog5, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-dialog5').removeClass('is-hide');
      outOparationLog("店員呼び出しエラーポップアップ表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneDialog5.prototype.__proto__ || Object.getPrototypeOf(SceneDialog5.prototype), 'onExit', this).call(this);
      $('.s-dialog5').addClass('is-hide');
    }
  }]);

  return SceneDialog5;
}(SceneA);


// ____________________________________________________________________________________ 注文確定警告ポップアップシーン

var SceneDialog6 = function (_SceneA99) {
  _inherits(SceneDialog6, _SceneA99);

  function SceneDialog6(name) {
    _classCallCheck(this, SceneDialog6);

    return _possibleConstructorReturn(this, (SceneDialog6.__proto__ || Object.getPrototypeOf(SceneDialog6)).call(this, name, 0));
  }

  _createClass(SceneDialog6, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-dialog6').removeClass('is-hide');
      outOparationLog("注文確定-注文商品なしポップアップ表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneDialog6.prototype.__proto__ || Object.getPrototypeOf(SceneDialog6.prototype), 'onExit', this).call(this);
      $('.s-dialog6').addClass('is-hide');
    }
  }]);

  return SceneDialog6;
}(SceneA);

// ____________________________________________________________________________________ 品切れチェックポップアップシーン

var SceneDialog7 = function (_SceneA99) {
  _inherits(SceneDialog7, _SceneA99);

  function SceneDialog7(name) {
    _classCallCheck(this, SceneDialog7);

    return _possibleConstructorReturn(this, (SceneDialog7.__proto__ || Object.getPrototypeOf(SceneDialog7)).call(this, name, 0));
  }

  _createClass(SceneDialog7, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-dialog7').removeClass('is-hide');
      outOparationLog("注文確定-品切れチェックポップアップ表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneDialog7.prototype.__proto__ || Object.getPrototypeOf(SceneDialog7.prototype), 'onExit', this).call(this);
      $('.s-dialog7').addClass('is-hide');
    }
  }]);

  return SceneDialog7;
}(SceneA);

// ____________________________________________________________________________________ 未確定商品のお知らせポップアップシーン

var SceneDialog8 = function (_SceneA99) {
  _inherits(SceneDialog8, _SceneA99);

  function SceneDialog8(name) {
    _classCallCheck(this, SceneDialog8);

    return _possibleConstructorReturn(this, (SceneDialog8.__proto__ || Object.getPrototypeOf(SceneDialog8)).call(this, name, 0));
  }

  _createClass(SceneDialog8, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-dialog8').removeClass('is-hide');
      outOparationLog("注文確定-注文未確定ポップアップ表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneDialog8.prototype.__proto__ || Object.getPrototypeOf(SceneDialog8.prototype), 'onExit', this).call(this);
      $('.s-dialog8').addClass('is-hide');
    }
  }]);

  return SceneDialog8;
}(SceneA);

// ____________________________________________________________________________________ お会計ポップアップシーン

var SceneDialog9 = function (_SceneA99) {
  _inherits(SceneDialog9, _SceneA99);

  function SceneDialog9(name) {
    _classCallCheck(this, SceneDialog9);

    return _possibleConstructorReturn(this, (SceneDialog9.__proto__ || Object.getPrototypeOf(SceneDialog9)).call(this, name, 0));
  }

  _createClass(SceneDialog9, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-dialog9').removeClass('is-hide');
      outOparationLog("会計確認ポップアップ表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneDialog9.prototype.__proto__ || Object.getPrototypeOf(SceneDialog9.prototype), 'onExit', this).call(this);
      $('.s-dialog9').addClass('is-hide');
    }
  }]);

  return SceneDialog9;
}(SceneA);

// ____________________________________________________________________________________ 卓番号取得エラーポップアップシーン

var SceneDialog10 = function (_SceneA99) {
  _inherits(SceneDialog10, _SceneA99);

  function SceneDialog10(name) {
    _classCallCheck(this, SceneDialog10);

    return _possibleConstructorReturn(this, (SceneDialog10.__proto__ || Object.getPrototypeOf(SceneDialog10)).call(this, name, 0));
  }

  _createClass(SceneDialog10, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-dialog10').removeClass('is-hide');
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneDialog10.prototype.__proto__ || Object.getPrototypeOf(SceneDialog10.prototype), 'onExit', this).call(this);
      $('.s-dialog10').addClass('is-hide');
    }
  }]);

  return SceneDialog10;
}(SceneA);

// ____________________________________________________________________________________ 注文完了ポップアップシーン

var SceneDialog11 = function (_SceneA99) {
  _inherits(SceneDialog11, _SceneA99);

  function SceneDialog11(name) {
    _classCallCheck(this, SceneDialog11);

    return _possibleConstructorReturn(this, (SceneDialog11.__proto__ || Object.getPrototypeOf(SceneDialog11)).call(this, name, 0));
  }

  _createClass(SceneDialog11, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-dialog11').removeClass('is-hide');
      outOparationLog("注文完了ポップアップ表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneDialog11.prototype.__proto__ || Object.getPrototypeOf(SceneDialog11.prototype), 'onExit', this).call(this);
      $('.s-dialog11').addClass('is-hide');
    }
  }]);

  return SceneDialog11;
}(SceneA);

// ____________________________________________________________________________________ メニューブック変更ポップアップシーン

var SceneDialog12 = function (_SceneA99) {
  _inherits(SceneDialog12, _SceneA99);

  function SceneDialog12(name) {
    _classCallCheck(this, SceneDialog12);

    return _possibleConstructorReturn(this, (SceneDialog12.__proto__ || Object.getPrototypeOf(SceneDialog12)).call(this, name, 0));
  }

  _createClass(SceneDialog12, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-dialog12').removeClass('is-hide');
      outOparationLog("メニューブック変更ポップアップ表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneDialog12.prototype.__proto__ || Object.getPrototypeOf(SceneDialog12.prototype), 'onExit', this).call(this);
      $('.s-dialog12').addClass('is-hide');
    }
  }]);

  return SceneDialog12;
}(SceneA);

// ____________________________________________________________________________________ 品切れプッシュ通知ポップアップシーン

var SceneDialog13 = function (_SceneA99) {
  _inherits(SceneDialog13, _SceneA99);

  function SceneDialog13(name) {
    _classCallCheck(this, SceneDialog13);

    return _possibleConstructorReturn(this, (SceneDialog13.__proto__ || Object.getPrototypeOf(SceneDialog13)).call(this, name, 0));
  }

  _createClass(SceneDialog13, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-dialog13').removeClass('is-hide');
      outOparationLog("商品ステータスプッシュ通知-品切れ商品選択取下げポップアップ表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneDialog13.prototype.__proto__ || Object.getPrototypeOf(SceneDialog13.prototype), 'onExit', this).call(this);
      $('.s-dialog13').addClass('is-hide');
    }
  }]);

  return SceneDialog13;
}(SceneA);

// ____________________________________________________________________________________ 注文数量の上限ワーニングポップアップシーン

var Scenedialog14 = function (_SceneA99) {
  _inherits(Scenedialog14, _SceneA99);

  function Scenedialog14(name) {
    _classCallCheck(this, Scenedialog14);

    return _possibleConstructorReturn(this, (Scenedialog14.__proto__ || Object.getPrototypeOf(Scenedialog14)).call(this, name, 0));
  }

  _createClass(Scenedialog14, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-dialog14').removeClass('is-hide');
      outOparationLog("注文数量上限ポップアップ表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(Scenedialog14.prototype.__proto__ || Object.getPrototypeOf(Scenedialog14.prototype), 'onExit', this).call(this);
      $('.s-dialog14').addClass('is-hide');
    }
  }]);

  return Scenedialog14;
}(SceneA);

// ____________________________________________________________________ オーダーメイドディッシュの1皿内の選択商品数量ワーニングポップアップシーン

var Scenedialog15 = function (_SceneA99) {
  _inherits(Scenedialog15, _SceneA99);

  function Scenedialog15(name) {
    _classCallCheck(this, Scenedialog15);

    return _possibleConstructorReturn(this, (Scenedialog15.__proto__ || Object.getPrototypeOf(Scenedialog15)).call(this, name, 0));
  }

  _createClass(Scenedialog15, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-dialog15').removeClass('is-hide');
      outOparationLog("オーダーメイドディッシュ作成画面-皿内上限超過ポップアップ表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(Scenedialog15.prototype.__proto__ || Object.getPrototypeOf(Scenedialog15.prototype), 'onExit', this).call(this);
      $('.s-dialog15').addClass('is-hide');
    }
  }]);

  return Scenedialog15;
}(SceneA);

// ____________________________________________________________________________________ バッシングポップアップシーン

var Scenedialog16 = function (_SceneA99) {
  _inherits(Scenedialog16, _SceneA99);

  function Scenedialog16(name) {
    _classCallCheck(this, Scenedialog16);

    return _possibleConstructorReturn(this, (Scenedialog16.__proto__ || Object.getPrototypeOf(Scenedialog16)).call(this, name, 0));
  }

  _createClass(Scenedialog16, [{
    key: 'onEntry',
    value: function onEntry() {
      location.href = '#root/people';
      $('.s-dialog16').removeClass('is-hide');
      outOparationLog("バッシング画面");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(Scenedialog16.prototype.__proto__ || Object.getPrototypeOf(Scenedialog16.prototype), 'onExit', this).call(this);
      $('.s-dialog16').addClass('is-hide');
    }
  }]);

  return Scenedialog16;
}(SceneA);

// ____________________________________________________________________________________ 飲酒承諾確認ポップアップシーン

var Scenedialog17 = function (_SceneA99) {
  _inherits(Scenedialog17, _SceneA99);

  function Scenedialog17(name) {
    _classCallCheck(this, Scenedialog17);

    return _possibleConstructorReturn(this, (Scenedialog17.__proto__ || Object.getPrototypeOf(Scenedialog17)).call(this, name, 0));
  }

  _createClass(Scenedialog17, [{
    key: 'onEntry',
    value: function onEntry() {
      // document.getElementById('dialog17').setAttribute('href','#root/drinkTopEatIn');
      document.getElementById('s-dialog17').innerHTML = I_1023;
      document.getElementById('s-dialog17').setAttribute('style', 'text-align: left;');
      $('.s-dialog17').removeClass('is-hide');
      outOparationLog("アルコール確認ポップアップ表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(Scenedialog17.prototype.__proto__ || Object.getPrototypeOf(Scenedialog17.prototype), 'onExit', this).call(this);
      $('.s-dialog17').addClass('is-hide');
    }
  }]);

  return Scenedialog17;
}(SceneA);

// ____________________________________________________________________________________ オーダーメイドディッシュリセット確認ポップアップシーン

var Scenedialog18 = function (_SceneA99) {
  _inherits(Scenedialog18, _SceneA99);

  function Scenedialog18(name) {
    _classCallCheck(this, Scenedialog18);

    return _possibleConstructorReturn(this, (Scenedialog18.__proto__ || Object.getPrototypeOf(Scenedialog18)).call(this, name, 0));
  }

  _createClass(Scenedialog18, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-dialog18').removeClass('is-hide');
      outOparationLog("オーダーメイドディッシュ作成画面-リセット確認ポップアップ表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(Scenedialog18.prototype.__proto__ || Object.getPrototypeOf(Scenedialog18.prototype), 'onExit', this).call(this);
      $('.s-dialog18').addClass('is-hide');
    }
  }]);

  return Scenedialog18;
}(SceneA);

// ____________________________________________________________________________________ オーダーメイドディッシュ組合せ不可商品変更確認ポップアップシーン

var Scenedialog19 = function (_SceneA99) {
  _inherits(Scenedialog19, _SceneA99);

  function Scenedialog19(name) {
    _classCallCheck(this, Scenedialog19);

    return _possibleConstructorReturn(this, (Scenedialog19.__proto__ || Object.getPrototypeOf(Scenedialog19)).call(this, name, 0));
  }

  _createClass(Scenedialog19, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-dialog19').removeClass('is-hide');
      outOparationLog("オーダーメイドディッシュ作成画面-組合せ不可商品変更確認ポップアップ表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(Scenedialog19.prototype.__proto__ || Object.getPrototypeOf(Scenedialog19.prototype), 'onExit', this).call(this);
      $('.s-dialog19').addClass('is-hide');
    }
  }]);

  return Scenedialog19;
}(SceneA);

// ____________________________________________________________________________________ オーダーメイド時間経過ポップアップシーン

var Scenedialog20 = function (_SceneA99) {
  _inherits(Scenedialog20, _SceneA99);

  function Scenedialog20(name) {
    _classCallCheck(this, Scenedialog20);

    return _possibleConstructorReturn(this, (Scenedialog20.__proto__ || Object.getPrototypeOf(Scenedialog20)).call(this, name, 0));
  }

  _createClass(Scenedialog20, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-dialog20').removeClass('is-hide');
      outOparationLog("オーダーメイドディッシュ作成画面-オーダーメイド時間経過ポップアップ表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(Scenedialog20.prototype.__proto__ || Object.getPrototypeOf(Scenedialog20.prototype), 'onExit', this).call(this);
      $('.s-dialog20').addClass('is-hide');
    }
  }]);

  return Scenedialog20;
}(SceneA);

// ____________________________________________________________________________________ 店員呼出確認ポップアップシーン

var Scenedialog21 = function (_SceneA99) {
  _inherits(Scenedialog21, _SceneA99);

  function Scenedialog21(name) {
    _classCallCheck(this, Scenedialog21);

    return _possibleConstructorReturn(this, (Scenedialog21.__proto__ || Object.getPrototypeOf(Scenedialog21)).call(this, name, 0));
  }

  _createClass(Scenedialog21, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-dialog21').removeClass('is-hide');
      outOparationLog("店員呼出確認ポップアップ表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(Scenedialog21.prototype.__proto__ || Object.getPrototypeOf(Scenedialog21.prototype), 'onExit', this).call(this);
      $('.s-dialog21').addClass('is-hide');
    }
  }]);

  return Scenedialog21;
}(SceneA);

// ____________________________________________________________________________________ レジ袋確認ポップアップシーン

var Scenedialog22 = function (_SceneA99) {
  _inherits(Scenedialog22, _SceneA99);

  function Scenedialog22(name) {
    _classCallCheck(this, Scenedialog22);

    return _possibleConstructorReturn(this, (Scenedialog22.__proto__ || Object.getPrototypeOf(Scenedialog22)).call(this, name, 0));
  }

  _createClass(Scenedialog22, [{
    key: 'onEntry',
    value: function onEntry() {
      location.href = '#root/cart';
      // 枚数リセット
      regBagReset();
      // 決定ボタンのラベル文言を「不要」にセット
      document.getElementById('regBag_decision').textContent = MSG_CART_30;

      // 値段表示の制御
      if(tmp_m_goods_map[menubook_cd] != null
        && tmp_m_goods_map[menubook_cd][HB_PLS_BAG_CODE] != null
        && tmp_m_goods_map[menubook_cd][DM_PLS_BAG_CODE] != null){
          if(tmp_m_goods_map[menubook_cd][HB_PLS_BAG_CODE]["nUnitCost"] == tmp_m_goods_map[menubook_cd][DM_PLS_BAG_CODE]["nUnitCost"]){
            // 2種類の袋が同じ値段の場合、値段表示
            document.getElementById('s-dialog22_3').textContent = MSG_CART_24.replace('{0}', tmp_m_goods_map[menubook_cd][HB_PLS_BAG_CODE]["nUnitCost"]);
            document.getElementById('s-dialog22_2').hidden = null;
            document.getElementById('s-dialog22_3').hidden = null;
          }else{
            // 異なる場合、非表示
            document.getElementById('s-dialog22_2').hidden = 'hidden';
            document.getElementById('s-dialog22_3').hidden = 'hidden';
          }
      }else{
        // DBの設定漏れの場合、処理なし
      }

      $('.s-dialog22').removeClass('is-hide');
      outOparationLog("レジ袋確認ポップアップ表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(Scenedialog22.prototype.__proto__ || Object.getPrototypeOf(Scenedialog22.prototype), 'onExit', this).call(this);
      $('.s-dialog22').addClass('is-hide');
    }
  }]);

  return Scenedialog22;
}(SceneA);

// ____________________________________________________________________________________ 購入誘導ポップアップシーン

var Scenedialog23 = function (_SceneA99) {
  _inherits(Scenedialog23, _SceneA99);

  function Scenedialog23(name) {
    _classCallCheck(this, Scenedialog23);

    return _possibleConstructorReturn(this, (Scenedialog23.__proto__ || Object.getPrototypeOf(Scenedialog23)).call(this, name, 0));
  }

  _createClass(Scenedialog23, [{
    key: 'onEntry',
    value: function onEntry() {
      // $('.s-dialog23').removeClass('is-hide');
      // $('#s-dialog23-slid').addClass('s-dialog23-disp');
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(Scenedialog23.prototype.__proto__ || Object.getPrototypeOf(Scenedialog23.prototype), 'onExit', this).call(this);
      var tmpHref = location.href;
      $('.s-dialog23').addClass('is-hide');
      $('#s-dialog23-slid').removeClass('s-dialog23-disp');
      $('.s-choice').removeClass('s-dialog23-disp-bg');

      // $('#s-dialog23-slid').css('transition-delay','');
      // $('.s-choice').css('transition-delay','');

      document.getElementById("s-dialog23-slid").style.transitionDelay = '';
      document.getElementById("s-choice").style.transitionDelay = '';

      location.href = '#root/cart';
      Data.data['scenes']['root'].changeScene('root/cart');
      dishEditingFlg = false;
      changeSideLnk();
      $('.c-menu1').removeClass('is-hide');
      $('.eatin-side').removeClass('is-hide');
      $('.c-menu4').removeClass('is-hide');

      if(contains(tmpHref,"root/order/order-select/choice")){
        // 選択情報を内部変数保存
        withGoodsDataUpdate();
      }
      // outOparationLog("ご一緒にいかがですか画面閉じ");
    }
  }, {
    key: 'onExit2',
    value: function onExit() {
      _get(Scenedialog23.prototype.__proto__ || Object.getPrototypeOf(Scenedialog23.prototype), 'onExit', this).call(this);
      $('.s-dialog23').addClass('is-hide');
      $('#s-dialog23-slid').removeClass('s-dialog23-disp');
      $('.s-choice').removeClass('s-dialog23-disp-bg');

      document.getElementById("s-dialog23-slid").style.transitionDelay = '';
      document.getElementById("s-choice").style.transitionDelay = '';

      // dishEditingFlg = false;
      // changeSideLnk();
      // $('.c-menu1').removeClass('is-hide');
      // $('.eatin-side').removeClass('is-hide');
      // $('.c-menu4').removeClass('is-hide');
    }
  }]);

  return Scenedialog23;
}(SceneA);

// ____________________________________________________________________________________ 購入誘導ポップアップ中品切れシーン

var Scenedialog24 = function (_SceneA99) {
  _inherits(SceneDialog24, _SceneA99);

  function SceneDialog24(name) {
    _classCallCheck(this, SceneDialog24);

    return _possibleConstructorReturn(this, (SceneDialog24.__proto__ || Object.getPrototypeOf(SceneDialog24)).call(this, name, 0));
  }

  _createClass(SceneDialog24, [{
    key: 'onEntry',
    value: function onEntry() {
      $('.s-dialog24').removeClass('is-hide');
      outOparationLog("ご一緒にいかがですか画面-品切れポップアップ表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(SceneDialog24.prototype.__proto__ || Object.getPrototypeOf(SceneDialog24.prototype), 'onExit', this).call(this);
      $('.s-dialog24').addClass('is-hide');
    }
  }, {
    key: 'onExit2',
    value: function onExit() {
      _get(SceneDialog24.prototype.__proto__ || Object.getPrototypeOf(SceneDialog24.prototype), 'onExit', this).call(this);
      $('.s-dialog24').addClass('is-hide');

      // スキップ処理実行
      $('.s-dialog23').addClass('is-hide');
      $('#s-dialog23-slid').removeClass('s-dialog23-disp');
      $('.s-choice').removeClass('s-dialog23-disp-bg');

      document.getElementById("s-dialog23-slid").style.transitionDelay = '';
      document.getElementById("s-choice").style.transitionDelay = '';

      location.href = '#root/cart';
      Data.data['scenes']['root'].changeScene('root/cart');
      dishEditingFlg = false;
      changeSideLnk();
      $('.c-menu1').removeClass('is-hide');
      $('.eatin-side').removeClass('is-hide');
      $('.c-menu4').removeClass('is-hide');
    }
  }]);

  return SceneDialog24;
}(SceneA);
// ____________________________________________________________________________________ 人数入力シーン

var ScenePeople = function (_SceneA99) {
  _inherits(ScenePeople, _SceneA99);

  function ScenePeople(name) {
    _classCallCheck(this, ScenePeople);

    return _possibleConstructorReturn(this, (ScenePeople.__proto__ || Object.getPrototypeOf(ScenePeople)).call(this, name, 0));
  }

  _createClass(ScenePeople, [{
    key: 'onEntry',
    value: function onEntry() {
      additionMessage("[Log       ]", "人数入力シーン: is-hideクラスremove開始")
      retryPromise(getOrderMadeImg, 1000)
      startMeasuringElapsedTime("scenePeopleRemoveStart");
      $('.s-people').removeClass('is-hide');
      $('.c-menu1').addClass('is-hide');
      $('.eatin-side').addClass('is-hide');
      $('.c-menu4').addClass('is-hide');
      stopMeasuringElapsedTime("scenePeopleRemoveStart", "人数入力シーンis-hideRemove完了");
      additionMessage("[Log       ]", "人数入力シーン: is-hideクラスremove完了")
      outOparationLog("人数入力画面表示");
    }
  }, {
    key: 'onExit',
    value: function onExit() {
      _get(ScenePeople.prototype.__proto__ || Object.getPrototypeOf(ScenePeople.prototype), 'onExit', this).call(this);
      additionMessage("[Log       ]", "人数入力シーン: is-hideクラスadd開始")
      startMeasuringElapsedTime("scenePeopleAddStart");
      $('.s-people').addClass('is-hide');
      $('.c-menu1').removeClass('is-hide');
      $('.eatin-side').removeClass('is-hide');
      $('.c-menu4').removeClass('is-hide');
      stopMeasuringElapsedTime("scenePeopleAddStart", "人数入力シーンis-hideAdd完了");
      additionMessage("[Log       ]", "人数入力シーン: is-hideクラスadd完了")
    }
  }]);

  return ScenePeople;
}(SceneA);

// ____________________________________________________________________________________ 階層画面シーン


var levelOrdMadePop = 0;
var SceneLevelNav = function (_SceneA) {
  _inherits(SceneLevelNav, _SceneA);

  function SceneLevelNav(name) {
    _classCallCheck(this, SceneLevelNav);

    return _possibleConstructorReturn(this, (SceneLevelNav.__proto__ || Object.getPrototypeOf(SceneLevelNav)).call(this, name, 0));
    //
  }

  _createClass(SceneLevelNav, [{
    key: 'onEntry',
    value: function onEntry(timeout) {
	    startMeasuringElapsedTime("aaaaa");
	    stopMeasuringElapsedTime("aaaaa", "aaaaa完了");

	    startMeasuringElapsedTime("onEntry:階層画面");
      console.log("階層画面OnEntry Called")
      var time = timeout;
      //setTimeout(function(){
        if(contains(location.href,"root/order/order-select") && levelOrdMadePop == 0){
          // オーダーメイド中の場合、ポップアップ挟む
          levelOrdMadePop = 1;
          document.getElementById('dialog_txt').innerHTML = W_2001;
          changeSideLnkFunc(999);
          Data.data['scenes']['dialog'].onEntry();
          return;
        }
        levelOrdMadePop = 0;
        if(sideOpeFlg){
          outOparationLog("階層画面表示-サイドリンクバー操作,画面ID："+cngLevel);
        } else {
          outOparationLog("階層画面表示-ボタン操作,画面ID："+cngLevel);
        }
        sideOpeFlg = false;

        // 注文確定画面-他のメニューを注文するボタン遷移先画面を判定
        if(ordFixAfDispList[cngLevel] == ""){
          ordFixAfDispId = cngLevel;
        }

        // 商品ポップアップを閉じる
        levelCancel();

        $(".s-level").removeClass('is-hide');
        $(".levels").addClass('is-hide');
        $("#level-"+cngLevel).removeClass('is-hide');

        var scrollObj = document.getElementById("sideNav_eatin");

        if($(".sideLink_"+cngLevel+".sideLinkTitles").length == 0){
          // タイトルのあるなしでサイドリンクバー最大縦幅を調整
          // なかった場合
          scrollObj.style.maxHeight = "735px";
          var title = document.getElementById("side-default-title");
          title.height = "0px";
          title.hidden = true;
        } else {
          // あった場合
          scrollObj.style.maxHeight = "635px";
          var title = document.getElementById("side-default-title");
          title.height = "100px";
          title.hidden = false;
          // title.getElementsByTagName("h2")[0].style.width = "100%";
          // title.getElementsByTagName("h2")[0].style.height = "100%";
          // title.getElementsByTagName("h2")[0].getElementsByTagName("img")[0].style.width = "100%";
          // title.getElementsByTagName("h2")[0].getElementsByTagName("img")[0].style.height = "100%";
        }

        // スクロール位置初期化
        scrollObj.scrollTop = 0;

        if($(".sideLink_"+cngLevel).length == 0){
          // サイドリンクバー表示物が0件の場合、枠自体出さない
          document.getElementById("side-default").style.display = "none";
        } else {
          document.getElementById("side-default").style.display = "block";
        }

        $(".sideLinks").addClass('is-hide');
        $(".sideLinks").attr('hidden','hidden');
        $(".sideLink_"+cngLevel).removeClass('is-hide');
        $(".sideLink_"+cngLevel).removeAttr('hidden');
        $(".s-home").addClass('is-hide');

        if(document.getElementById("side-default").clientHeight >= 734){
          scrollObj.style.overflowY = "overlay";
          scrollObj.style.paddingRight = "20px";
          document.getElementById("side-default-title").style.paddingLeft = "7.5px";
          document.getElementById("side-default-title").style.paddingRight = "7.5px";
          document.getElementById("side-default").style.width = "145px";

        } else {
          scrollObj.style.overflowY = "hidden";
          scrollObj.style.paddingRight = "5px";
          document.getElementById("side-default-title").style.paddingLeft = "0px";
          document.getElementById("side-default-title").style.paddingRight = "0px";
          document.getElementById("side-default").style.width = "130px";
        }

        location.href = "#root/level";
      //},time);
	    stopMeasuringElapsedTime("onEntry:階層画面", "階層画面onEntry完了");
    
    }
  }, {
    key: 'onExit',
    value: function onExit(id) {
      _get(SceneLevelNav.prototype.__proto__ || Object.getPrototypeOf(SceneLevelNav.prototype), 'onExit', this).call(this);
      var exit_ward = id + "exit完了"
	    startMeasuringElapsedTime("onExit:階層画面");
      // $(id).addClass('is-hide');
      $(".s-level").addClass('is-hide');
	    stopMeasuringElapsedTime("onExit:階層画面", exit_ward);
    }
  }]);

  return SceneLevelNav;
}(SceneA);

//______________________________________________________________________全体シーン設定クラス


var Scenes = function Scenes() {
  _classCallCheck(this, Scenes);

  Data.data['scenes'] = {};
  Data.data['scenes']['root'] = new RootScene('root');
  Data.data['scenes']['order'] = new SceneOrder('order');
  Data.data['scenes']['select'] = new SceneOrderSelect('order-select');
  Data.data['scenes']['choice'] = new SceneOrderChoice('choice');
  Data.data['scenes']['drink'] = new SceneDrink('drink');
  Data.data['scenes']['kids'] = new SceneKids('kids');
  Data.data['scenes']['language'] = new SceneLanguage('language');
  Data.data['scenes']['level'] = new SceneLevelNav('level');
  Data.data['scenes']['home'] = new SceneHome('home');
  Data.data['scenes']['ordermade'] = new SceneOrdermade('ordermade');
  Data.data['scenes']['cart'] = new SceneCart('cart');
  Data.data['scenes']['allergen'] = new SceneAllergen('allergen');
  Data.data['scenes']['allergenOther'] = new SceneAllergenOther('allergenOther');
  Data.data['scenes']['dialog'] = new SceneDialog('dialog');
  Data.data['scenes']['dialog2'] = new SceneDialog2('dialog2');
  Data.data['scenes']['dialog3'] = new SceneDialog3('dialog3');
  Data.data['scenes']['dialog4'] = new SceneDialog4('dialog4');
  Data.data['scenes']['dialog5'] = new SceneDialog5('dialog5');
  Data.data['scenes']['dialog6'] = new SceneDialog6('dialog6');
  Data.data['scenes']['dialog7'] = new SceneDialog7('dialog7');
  Data.data['scenes']['dialog8'] = new SceneDialog8('dialog8');
  Data.data['scenes']['dialog9'] = new SceneDialog9('dialog9');
  Data.data['scenes']['dialog10'] = new SceneDialog10('dialog10');
  Data.data['scenes']['dialog11'] = new SceneDialog11('dialog11');
  Data.data['scenes']['dialog12'] = new SceneDialog12('dialog12');
  Data.data['scenes']['dialog13'] = new SceneDialog13('dialog13');
  Data.data['scenes']['dialog14'] = new Scenedialog14('dialog14');
  Data.data['scenes']['dialog15'] = new Scenedialog15('dialog15');
  Data.data['scenes']['dialog16'] = new Scenedialog16('dialog16');
  Data.data['scenes']['dialog17'] = new Scenedialog17('dialog17');
  Data.data['scenes']['dialog18'] = new Scenedialog18('dialog18');
  Data.data['scenes']['dialog19'] = new Scenedialog19('dialog19');
  Data.data['scenes']['dialog20'] = new Scenedialog20('dialog20');
  Data.data['scenes']['dialog21'] = new Scenedialog21('dialog21');
  Data.data['scenes']['dialog22'] = new Scenedialog22('dialog22');
  Data.data['scenes']['dialog23'] = new Scenedialog23('dialog23');
  Data.data['scenes']['dialog24'] = new Scenedialog24('dialog24');
  Data.data['scenes']['people'] = new ScenePeople('people');
  Data.data['scenes']['offScreen'] = new SceneOffScreen('offScreen');
  Data.data['scenes']['order'].addScene(Data.data['scenes']['select']);
  Data.data['scenes']['select'].addScene(Data.data['scenes']['choice']);
  Data.data['scenes']['root'].addScene(Data.data['scenes']['order']);
  Data.data['scenes']['root'].addScene(Data.data['scenes']['drink']);
  Data.data['scenes']['root'].addScene(Data.data['scenes']['kids']);
  Data.data['scenes']['root'].addScene(Data.data['scenes']['language']);
  Data.data['scenes']['root'].addScene(Data.data['scenes']['level']);
  Data.data['scenes']['root'].addScene(Data.data['scenes']['home']);
  Data.data['scenes']['root'].addScene(Data.data['scenes']['ordermade']);
  Data.data['scenes']['root'].addScene(Data.data['scenes']['cart']);
  Data.data['scenes']['root'].addScene(Data.data['scenes']['people']);
};

//______________________________________________________________________START

var firstTimeoutFlg = true;
var appStartTime;
function starAnimation() {
  appStartTime = getCurrentTime();
  document.getElementById('loading').removeAttribute("hidden");

  //運用保守GUIの場合、処理なし
  if(guiFlg != '1'){
    location.href = '#';
  }
  new Scenes();
  new Gnav();
  new View();

  if(regFlg == '1'){
    ChangeMsgLanguage(regLang);
    // レジ起動時
    // テーブル番号・卓ステータス取得スキップ
    retryPromise(getJson, 1000)
    .then((result) => {
      getMenuBookMaster(true);
    });

  }else{

    ChangeMsgLanguage('jp');
    //運用保守GUIの場合、処理なし
    if(guiFlg != '1'){
      startMeasuringElapsedTime("tableNoWaiting");

      retryPromise(getJson, 1000)
      .then((result) => {
        additionMessage("[Log       ]", "GetJson完了, 次の処理へ");
        // テーブル番号取得
        getTableNo();
      });

    } else {

      slipNo = "999";
      menubook_cd = guiBookCd;
      getQuantityLimit(1);
      changeMenubookLayout(menubook_cd);

      document.getElementById("slideshow").style.height = '400px';
      // 在卓の場合、TOPまで進める
      retryPromise(getJson, 1000)
      .then((result) => {
	      additionMessage("[Log       ]", "GetJson完了, 次の処理へ");
        location.href = '#root/people';
        getMenuBookMaster(true);
      });

    }
  }
}

// エラーを監視
window.addEventListener('error',loadError);
window.addEventListener('onerror',loadError);

// html読み込みが成功した場合、監視解除・後続処理実行
window.addEventListener('load', function(){
  // ChangeMsgLanguage('jp');
  // getLayoutDataFst();
  // firstTimeoutFlg = false;
  // init();
  // window.removeEventListener('error',loadError);
  // window.removeEventListener('onerror',loadError);
  getMsgLanguage();
});

var fstDispCheckFlg = true;
var menubook_cd = '';
var tmp_tb_status = '';
/**
 * 初期表示判定処理
 */
function checkTableStatus(){
  startMeasuringElapsedTime("checkTableStatusStart");
  outOparationLog("アプリ起動-卓ステータス取得開始");
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
      // ステータス要求失敗の場合、人数入力
      // Data.data['scenes']['root'].changeScene('root/people'); //初期画面に遷移
      // location.href = '#root/people';
      // document.getElementById('loading').setAttribute("hidden","hidden");
      // リトライに変更
      timeoutRetryOccur("checkTableStatus");
      checkTableStatus();
			return;
		}
	},POST_TIMEOUT_TIME);

	// 卓ステータス要求POST送信
	var response_json = null;
  startMeasuringElapsedTime("PostStartIncheckTableStatus");
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/compass_status_request.php',
			data:{
				android_id:androidID,
				term_class:"RTIS1",
				request_id:getCurrentTime()
				},
			success:function(data){
				// POST送信終了
        stopMeasuringElapsedTime("PostStartIncheckTableStatus", "checkTableStatus内compass_status_request.php:post完了");
				response_json = data;
			}
		})
	).done(function() {
    // if(!(timeoutFlg)){
    //   timeoutFlg = true;
    //   if(response_json["status"] == 0){
    //     // 卓ステータス
    //     var tmp_tb_status = response_json["result"]["table_status"];
    //     // メニューブック
    //     menubook_cd = response_json["result"]["table_info"]["book_id"];
    //     changeMenubookLayout(menubook_cd);
    //     // 伝票番号
    //     slipNo = response_json["result"]["slipNo"];
        
    //     if(tmp_tb_status != 0){
    //       getQuantityLimit(response_json["result"]["table_people"]);
    //       // 空卓以外の場合、TOPまで進める
    //       location.href = '#root/home';
    //       getMenuBookMaster(true);
    //     }else{
    //       // 空卓の場合、人数入力
    //       Data.data['scenes']['root'].changeScene('root/people'); //初期画面に遷移
    //       location.href = '#root/people';
    //       document.getElementById('loading').setAttribute("hidden","hidden");
    //     }
    //   }else{
    //     // ステータス要求失敗の場合、人数入力
    //     Data.data['scenes']['root'].changeScene('root/people'); //初期画面に遷移
    //     location.href = '#root/people';
    //     document.getElementById('loading').setAttribute("hidden","hidden");
    //     return;
    //   }
    // }else{
    //   timeoutFlg = true;
    // }

		if(response_json["status"] == 0 && !(timeoutFlg)){
			timeoutFlg = true;
			// 卓ステータス
			// alert(slipNo +"rw"+response_json["result"]["slipNo"]);
			tmp_tb_status = response_json["result"]["table_status"];
			if(tmp_tb_status == 1){
        getQuantityLimit(response_json["result"]["table_people"]);
        // 在卓の場合、TOPまで進める
        location.href = '#root/people';
        getMenuBookMaster(true);
			}else if(tmp_tb_status == 2){
				// オーダ停止の場合の処理
			}else if(tmp_tb_status == 4){
				// オーダ停止の場合の処理
				// 画面OFF
				uica.offScreen();
				Data.data['scenes']['offScreen'].onEntry();
        screenOffFlg = true;
			}else if(tmp_tb_status == 3){
        // バッシングの場合の処理
        bashingEnd();
				document.getElementById('s-dialog16').innerHTML = I_1021;
				Data.data['scenes']['dialog16'].onEntry();
      }

      if(tmp_tb_status != 1){
        // 空卓の場合、人数入力
        // Data.data['scenes']['root'].changeScene('root/people'); //初期画面に遷移
        // location.href = '#root/people';
        // document.getElementById('loading').setAttribute("hidden","hidden");
        // document.getElementById('getData_blank_disp').setAttribute("class","s-offScreen2 jBtn is-hide");
        editAllTableDataStartup();
        getFstLayoutInfo();
      }
      

			slipNo = response_json["result"]["slipNo"];
      menubook_cd = response_json["result"]["table_info"]["book_id"];
      // menubook_cd = 2;
      changeMenubookLayout(menubook_cd);
      outOparationLog("アプリ起動-卓ステータス取得終了,ステータス:"+tmp_tb_status+",伝票番号:"+slipNo+",メニューブックコード:"+menubook_cd);
      stopMeasuringElapsedTime("checkTableStatusStart", "checkTableStatus完了");
		}else{
			timeoutFlg = true;
      // ステータス要求失敗の場合、人数入力
      // Data.data['scenes']['root'].changeScene('root/people'); //初期画面に遷移
      // location.href = '#root/people';
      // document.getElementById('loading').setAttribute("hidden","hidden");
      // リトライに変更
      failureRetryOcuur("checkTableStatus");
      checkTableStatus();
      return;
		}
	})
}

var fstPreloadFlg = false;
/**
 * レイアウトデータのプリロード処理
 */
function fstPreload(type,retry,src){
	if(contains(src,"Thumbs.db")){return;}
	var img = document.createElement('img');
  img.src = src;
  if(retry){
    img.onload = function() {
      fstPreloadFlg = false;
      document.getElementById('body').innerHTML = document.getElementById('body').innerHTML;
      setTimeout(function () {
        if(!(fstPreloadFlg)){
          // ブランク画面解除
          document.getElementById('error_blank_disp').setAttribute("class","s-offScreen2 jBtn is-hide");
          document.getElementById('loading').setAttribute("hidden","hidden");
        }
      }, 2000);
    }
  }
	img.onerror = function(src) { 
    fstPreloadFlg = true;
    // ブランク画面
    document.getElementById('error_blank_disp').setAttribute("class","s-offScreen2 jBtn");
    document.getElementById('loading').removeAttribute("hidden");
    fstPreload(type,true,src.path[0].src);
  }
}

/**
 * ヘッダー読み込み成功処理
 */
function loadSuccess(){
  layoutData_list = JSON.parse(layoutData_json);

  // 画像の明示的読み込み
  // var imgList = document.getElementsByTagName('img');
  // for(var line in imgList){
  //   var src = imgList[line].src;
  //   if(src == null || !(contains(src, 'images'))){
  //     continue;
  //   }
  //   fstPreload(1,false,src);
  // }

  for(var line in layoutData_list){
    var src = layoutData_list[line].replace('en_order/','');
    if(src == null || !(contains(src, 'images'))){
      continue;
    }
    var imgPath = src;

  // 2021/10/18 Base64廃止ここから
    // fstPreload(1,false,src);
    if(contains(imgPath,".wmv") ||contains(imgPath,".wav") ||contains(imgPath,".mp3") || contains(imgPath,".jpg") || contains(imgPath,".png")){
      // 動画・音声・画像データの場合
      toBase64Url("./"+imgPath,imgPath);
      layCnt++;
    }
  // 2021/10/18 Base64廃止ここまで
  }

  // cssの明示的適用
  var head = document.getElementsByTagName('head')[0].children;
  for(var h in head){
    if(head[h].href != null){
      applyCSS(document, head[h].href);
    }
  }

  CheckGetLis();

  // setTimeout(function () {
  //   if(!(fstPreloadFlg)){
  //     // ブランク画面解除
  //     document.getElementById('error_blank_disp').setAttribute("class","s-offScreen2 jBtn is-hide");
  //     // document.getElementById('loading').setAttribute("hidden","hidden");
  //   }
  // }, 2000);
}

/**
 * 画像のbase64参照差替え処理
 */
 function imageBase64Change(){
	// imgタグのsrc属性差替
	var imgs = document.getElementsByTagName("img");
	for(var img = 0; img < imgs.length;img++){
		if(imgs[img].src == null){
			continue;
		}
		// キー値
		var bkSrc = imgs[img].src.substring(imgs[img].src.indexOf("images"), imgs[img].src.length);
		imgs[img].setAttribute("tmpImg",bkSrc);
		if(lis_fact_map[bkSrc] == null ){
			continue;
		}
		imgs[img].src = lis_fact_map[bkSrc];
	}

	// styleのbackground-image差替
	var bgImgs = document.getElementsByClassName("bgImg");
	for(var bgImg = 0; bgImg < bgImgs.length;bgImg++){
		if(bgImgs[bgImg].style == null){
			continue;
		}
		var bgStr = bgImgs[bgImg].style.backgroundImage;
    bgImgs[bgImg].setAttribute("tmpImg",bgStr);
		bgStr = bgStr.replace('url("',"").replace("url('","").replace('")',"").replace("')","");
		bgStr = bgStr.replace('./',"");
		bgImgs[bgImg].style.backgroundImage = 'url("'+lis_fact_map[bgStr]+'")';
	}

  // // 画像参照先が一部配列に切り替えれない
  // // 明示的に下記リストに記載されたidタグのbackGroundImageを書き換える
  // for(var ts in EXP_CNG_IMG){
  //   var tgtTag = document.getElementById(EXP_CNG_IMG[ts]); 
	// 	if(tgtTag == null || tgtTag.style == null){
	// 		continue;
	// 	}
	// 	var bgStr = tgtTag.style.backgroundImage;
  //   tgtTag.setAttribute("tmpImg",bgStr);
	// 	bgStr = bgStr.replace('url("',"").replace("url('","").replace('")',"").replace("')","");
	// 	bgStr = bgStr.replace('./',"");
	// 	tgtTag.style.backgroundImage = 'url("'+lis_fact_map[bgStr]+'")';
  // }

	// タップ音の差替
	var sound = document.getElementById("touchsoundData").src;
	sound = sound.substring(sound.indexOf("sound"), sound.length);
	document.getElementById("touchsoundData").src = lis_fact_map[sound];

}

/**
 * データ取得完了検知処理
 */
 function CheckGetLis() {
	if(layCnt == layFixCnt){
    // 2021/10/18 Base64廃止
		imageBase64Change();
    starAnimation();
    $(window).on('resize', setLayout);
    setLayout();
		document.getElementById('loading').setAttribute("hidden","hidden");
		document.getElementById('error_blank_disp').setAttribute("class","s-offScreen2 jBtn is-hide");
	}else {
		setTimeout(function () {
			CheckGetLis();
		}, 1000);
	}
}


var lis_fact_map = [];
var layCnt = 0;
var layFixCnt = 0;
/**
 * 動画・音声・画像のbase64変換処理
 */
 function toBase64Url(url,path){
	try{
		var success = false;
		var xhr = new XMLHttpRequest();
		xhr.onload = function() {
			var reader = new FileReader();
			reader.onloadend = function() {
				lis_fact_map[path] = reader.result;
				layFixCnt++;
			}
			reader.onerror = function() {
				// 失敗した場合、リトライ
				toBase64Url(url,path);
			}
			reader.readAsDataURL(xhr.response);
		};

		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();
	}catch(e){
			// アクセス制限の場合、リトライ
			toBase64Url(url,path);
	}
}

function applyCSS(doc, cssfile, overwrite)
{
  if (typeof overwrite == "undefined")
    overwrite = 0;      // デフォルト:CSSの追加

  // 既存のCSSを削除
  if (overwrite && doc.styleSheets.length >= 1) {
    var links = doc.getElementsByTagName("link");
    for (var i = 0 ; i < links.length ; i++) {
      if (links[i].rel == "stylesheet")
        links[i].parentNode.removeChild(links[i]);
    }
  }

  // CSS追加
  if (document.all) {
    doc.createStyleSheet(cssfile);
  } else {
    var link = doc.createElement("link");
    link.rel = "stylesheet";
    link.href = cssfile;
    link.type = "text/css"
    doc.getElementsByTagName('head')[0].appendChild(link);
  }
}

/**
 * php実行処理5(レイアウトデータパス取得)
 * 　非同期通信で情報を取得する
 */
function getLayoutDataFst() {
  // outOparationLog("アプリ起動-imagesフォルダ内ファイル情報取得開始");
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// 通信エラーポップアップ出力処理
      getLayoutDataFst();
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
	$.when(
		$.ajax({
			type:'POST',
			url:PHP_EN_ROOT_FOLDER + '/getLayoutData.php',
			success:function(data){
				// レイアウトデータパス取得
				layoutData_json = data;
        data = null;
				if(layoutData_json == false && !(timeoutFlg)){
					timeoutFlg = true;
					getLayoutDataFst();
					return false;
				}
			}
		})
	).done(function() {
		// 非同期通信の完了を監視
		if(layoutData_json != false && !(timeoutFlg)){
      timeoutFlg = true;
      // outOparationLog("アプリ起動-imagesフォルダ内ファイル情報取得終了");
			loadSuccess();
		}else{
			timeoutFlg = true;
		}
	})
}

var fstLayoutInfo_json = null;
/**
 * php実行処理(レイアウト調整情報取得)
 * 　非同期通信で情報を取得する
 */
function getFstLayoutInfo() {
  outOparationLog("アプリ起動-レイアウト調整情報取得開始");
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// リトライ処理に変更
			getFstLayoutInfo();
			return false;
		}
	},POST_TIMEOUT_TIME);

	// 非同期通信で情報を取得
	$.when(
        $.ajax({
            type:'POST',
            url:PHP_EN_ROOT_FOLDER + '/getLayoutInfo.php',
            // data:{
            //     'fName':'layout',
            //     'uName':'position'
            // },
            success:function(data){
                fstLayoutInfo_json = data;
				if((fstLayoutInfo_json === false || fstLayoutInfo_json === '') && !(timeoutFlg)){
                    timeoutFlg = true;
                    getFstLayoutInfo();
                    return;
				}
            }
        })
	).done(function() {
		if(fstLayoutInfo_json !== false && fstLayoutInfo_json !== '' && !(timeoutFlg)){
      timeoutFlg = true;
      outOparationLog("アプリ起動-レイアウト調整情報取得終了");
      // 非同期通信の完了を監視
      // レイアウト調整情報取得
      layoutInfo_map = JSON.parse(fstLayoutInfo_json);
      // レイアウト調整処理
      editLayoutInfo();
      // 空卓の場合、人数入力
      Data.data['scenes']['root'].changeScene('root/people'); //初期画面に遷移
      location.href = '#root/people';
      document.getElementById('loading').setAttribute("hidden","hidden");
      document.getElementById('getData_blank_disp').setAttribute("class","s-offScreen2 jBtn is-hide");
		}else{
			timeoutFlg = true;
		}
	})
}