module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./forum.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../core/js/node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!***********************************************************************************************************!*\
  !*** /home/samilyas/www/flarum/packages/core/js/node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inheritsLoose; });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "../../core/js/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  Object(_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "../../core/js/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!************************************************************************************************************!*\
  !*** /home/samilyas/www/flarum/packages/core/js/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _setPrototypeOf; });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./forum.js":
/*!******************!*\
  !*** ./forum.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./src/common/formatBytes.js":
/*!***********************************!*\
  !*** ./src/common/formatBytes.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return formatBytes; });
function formatBytes(bytes, decimals) {
  if (decimals === void 0) {
    decimals = 2;
  }

  if (bytes === 0) return '0 Bytes';
  var k = 1024;
  var dm = decimals < 0 ? 0 : decimals;
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/***/ }),

/***/ "./src/forum/components/CoverEditorModal.js":
/*!**************************************************!*\
  !*** ./src/forum/components/CoverEditorModal.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CoverEditorModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "../../core/js/node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/ItemList */ "flarum/utils/ItemList");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/LoadingIndicator */ "flarum/components/LoadingIndicator");
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _common_formatBytes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/formatBytes */ "./src/common/formatBytes.js");







var CoverEditorModal = /*#__PURE__*/function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(CoverEditorModal, _Modal);

  function CoverEditorModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = CoverEditorModal.prototype;

  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);

    this.maxSize = parseFloat(app.forum.attribute('sycho-profile-cover.max_size') || 2048);
    this.alertAttrs = {
      content: app.translator.trans('sycho-profile-cover.forum.notice', {
        size: Object(_common_formatBytes__WEBPACK_IMPORTED_MODULE_5__["default"])(this.maxSize * Math.pow(2, 10))
      })
    };
    this.loading = false;
    this.cover = this.attrs.user.cover_thumbnail() || this.attrs.user.cover();
    this.context = '';
  };

  _proto.content = function content() {
    var attrs = {};
    var className = 'Modal-image CoverEditor-cover';

    if (this.cover) {
      attrs.style = {
        backgroundImage: "url(" + (app.forum.attribute('baseUrl') + '/assets/covers/' + this.cover) + ")"
      };
      className += ' CoverEditor-active';
    }

    return [m("div", Object.assign({
      className: className
    }, attrs), this.loading ? m(flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4___default.a, null) : ''), m("div", {
      className: "Modal-body"
    }, m("div", {
      className: "Form"
    }, this.fieldsItems().toArray()))];
  };

  _proto.className = function className() {
    return 'Cover-modal Modal--small';
  };

  _proto.title = function title() {
    return app.translator.trans('sycho-profile-cover.forum.edit_cover');
  };

  _proto.fieldsItems = function fieldsItems() {
    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default.a();
    items.add('actions', this.controlItems().toArray());
    return items;
  };

  _proto.controlItems = function controlItems() {
    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default.a();
    items.add('upload', m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a, {
      icon: "fas fa-upload",
      className: "Button",
      onclick: this.openPicker.bind(this)
    }, app.translator.trans('core.forum.user.avatar_upload_button')));
    items.add('remove', m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a, {
      icon: "fas fa-times",
      className: "Button",
      onclick: this.remove.bind(this)
    }, app.translator.trans('core.forum.user.avatar_remove_button')));
    return items;
  };

  _proto.openPicker = function openPicker() {
    var _this = this;

    var input = $('<input type="file">');
    input.appendTo('body').hide().click().on('change', function (e) {
      _this.upload($(e.target)[0].files[0]);
    });
  };

  _proto.upload = function upload(file) {
    if (this.loading) return;
    var data = new FormData();
    data.append('cover', file);
    this.loading = true;
    this.context = 'added';
    m.redraw();
    app.request({
      method: 'POST',
      url: app.forum.attribute('apiUrl') + "/users/" + this.attrs.user.id() + "/cover",
      serialize: function serialize(raw) {
        return raw;
      },
      body: data
    }).then(this.success.bind(this), this.failure.bind(this));
  };

  _proto.remove = function remove() {
    this.loading = true;
    this.context = 'removed';
    m.redraw();
    app.request({
      method: 'DELETE',
      url: app.forum.attribute('apiUrl') + "/users/" + this.attrs.user.id() + "/cover"
    }).then(this.success.bind(this), this.failure.bind(this));
  };

  _proto.success = function success(response) {
    app.store.pushPayload(response);
    this.showAlert('success');
    this.loading = false;
    m.redraw();
    this.hide();
  };

  _proto.failure = function failure() {
    this.showAlert('error');
    this.loading = false;
    m.redraw();
  };

  _proto.showAlert = function showAlert(type) {
    this.alertAttrs.content = app.translator.trans("sycho-profile-cover.forum." + this.context + "." + type);
    this.alertAttrs.type = type;
  };

  return CoverEditorModal;
}(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/models/User */ "flarum/models/User");
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_models_User__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_UserCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/UserCard */ "flarum/components/UserCard");
/* harmony import */ var flarum_components_UserCard__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_UserCard__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_UserControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/UserControls */ "flarum/utils/UserControls");
/* harmony import */ var flarum_utils_UserControls__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_UserControls__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_CoverEditorModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/CoverEditorModal */ "./src/forum/components/CoverEditorModal.js");







app.initializers.add('sycho-profile-cover', function (app) {
  flarum_models_User__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.cover = flarum_Model__WEBPACK_IMPORTED_MODULE_5___default.a.attribute('cover');
  flarum_models_User__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.cover_thumbnail = flarum_Model__WEBPACK_IMPORTED_MODULE_5___default.a.attribute('cover_thumbnail');
  flarum_models_User__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.canSetProfileCover = flarum_Model__WEBPACK_IMPORTED_MODULE_5___default.a.attribute('canSetProfileCover');
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_UserCard__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'view', function (view) {
    if (!view.attrs.style || !this.attrs.user.cover()) return;
    var cover = this.attrs.user.cover();
    var thumbnail = this.attrs.user.cover_thumbnail();
    if (!cover) return;

    if (this.attrs.controlsButtonClassName.includes('Button--icon') && thumbnail) {
      cover = thumbnail;
    }

    var coverUrl = app.forum.attribute('baseUrl') + '/assets/covers/' + cover;
    view.attrs.style = Object.assign(view.attrs.style, {
      '--background-image': "url(" + coverUrl + ")"
    });
  });
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_utils_UserControls__WEBPACK_IMPORTED_MODULE_3___default.a, 'moderationControls', function (items, user) {
    if (!user.canSetProfileCover()) return;
    items.add('cover', m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a, {
      icon: "fas fa-image",
      onclick: function onclick() {
        return app.modal.show(_components_CoverEditorModal__WEBPACK_IMPORTED_MODULE_6__["default"], {
          user: user
        });
      }
    }, app.translator.trans('sycho-profile-cover.forum.cover')));
    return items;
  });
});

/***/ }),

/***/ "flarum/Model":
/*!**********************************************!*\
  !*** external "flarum.core.compat['Model']" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['Model'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/LoadingIndicator":
/*!********************************************************************!*\
  !*** external "flarum.core.compat['components/LoadingIndicator']" ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/LoadingIndicator'];

/***/ }),

/***/ "flarum/components/Modal":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Modal']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Modal'];

/***/ }),

/***/ "flarum/components/UserCard":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/UserCard']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/UserCard'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ }),

/***/ "flarum/models/User":
/*!****************************************************!*\
  !*** external "flarum.core.compat['models/User']" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['models/User'];

/***/ }),

/***/ "flarum/utils/ItemList":
/*!*******************************************************!*\
  !*** external "flarum.core.compat['utils/ItemList']" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/ItemList'];

/***/ }),

/***/ "flarum/utils/UserControls":
/*!***********************************************************!*\
  !*** external "flarum.core.compat['utils/UserControls']" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/UserControls'];

/***/ })

/******/ });
//# sourceMappingURL=forum.js.map