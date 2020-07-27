var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

var exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/set-queue-path.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: SettingKeys */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingKeys", function() { return SettingKeys; });
var SettingKeys = {
  S3_BUCKET: "gxBucket",
  S3_SECRET_KEY: "gxS3SecretKey",
  S3_ACCESS_KEY: "gxS3AccessKey",
  ENABLE_S3: "gxS3Enabled",
  DESIGN_QUEUE: "DesignOpsQueue"
};

/***/ }),

/***/ "./src/set-queue-path.js":
/*!*******************************!*\
  !*** ./src/set-queue-path.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch/settings */ "sketch/settings");
/* harmony import */ var sketch_settings__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_settings__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _uidialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uidialog */ "./src/uidialog.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/constants.js");



/* harmony default export */ __webpack_exports__["default"] = (function () {
  // Read settings
  var enableS3 = sketch_settings__WEBPACK_IMPORTED_MODULE_0___default.a.settingForKey(_constants__WEBPACK_IMPORTED_MODULE_2__["SettingKeys"].ENABLE_S3) == 1;
  var s3Bucket = sketch_settings__WEBPACK_IMPORTED_MODULE_0___default.a.settingForKey(_constants__WEBPACK_IMPORTED_MODULE_2__["SettingKeys"].S3_BUCKET);
  var s3SecretKey = sketch_settings__WEBPACK_IMPORTED_MODULE_0___default.a.settingForKey(_constants__WEBPACK_IMPORTED_MODULE_2__["SettingKeys"].S3_SECRET_KEY);
  var s3AccessKey = sketch_settings__WEBPACK_IMPORTED_MODULE_0___default.a.settingForKey(_constants__WEBPACK_IMPORTED_MODULE_2__["SettingKeys"].S3_ACCESS_KEY);
  var queueDesign = sketch_settings__WEBPACK_IMPORTED_MODULE_0___default.a.settingForKey(_constants__WEBPACK_IMPORTED_MODULE_2__["SettingKeys"].DESIGN_QUEUE);
  if (undefined == queueDesign) queueDesign = "";
  if (undefined == s3AccessKey) s3AccessKey = "<your access key here>";
  if (undefined == s3Bucket) s3Bucket = "<your bucket name>";
  if (undefined == s3SecretKey) s3SecretKey = "<your secret key>"; // Build dialog

  var dialog = new _uidialog__WEBPACK_IMPORTED_MODULE_1__["UIDialog"]("Configure", NSMakeRect(0, 0, 400, 300), "Save", "Edit where to share your designs.");

  var onCheck = function onCheck() {
    var editable = textS3Bucket.isEditable();
    textS3Bucket.setEnabled(!editable);
    textS3Bucket.setEditable(!editable);
    textS3AccessKey.setEditable(!editable);
    textS3AccessKey.setEnabled(!editable);
    textS3SecretKey.setEditable(!editable);
    textS3SecretKey.setEnabled(!editable);
    txtQueueDesign.setEditable(editable);
    txtQueueDesign.setEnabled(editable);
  };

  dialog.addLeftLabel("", "Sharing Options");
  dialog.addDivider();
  dialog.addCheckbox("enableS3", "Enable S3 Sharing", enableS3, onCheck);
  dialog.addLeftLabel("", "S3 Bucket");
  var textS3Bucket = dialog.addTextInput("s3Bucket", "", s3Bucket, "Enter bucket name");
  textS3Bucket.setEditable(enableS3);
  textS3Bucket.setEnabled(enableS3);
  dialog.addLeftLabel("", "S3 Access Key");
  var textS3AccessKey = dialog.addTextInput("s3AccessKey", "", s3AccessKey, "Enter access Key");
  textS3AccessKey.setEditable(enableS3);
  textS3AccessKey.setEnabled(enableS3);
  dialog.addLeftLabel("", "S3 Secret Key");
  var textS3SecretKey = dialog.addTextInput("s3SecretKey", "", s3SecretKey, "Enter secret Key");
  textS3SecretKey.setEditable(enableS3);
  textS3SecretKey.setEnabled(enableS3);
  dialog.addDivider();
  dialog.addLeftLabel("", "Queue Path");
  var txtQueueDesign = dialog.addTextInput("queueDesign", "", queueDesign, "Path to filesystem queue");
  txtQueueDesign.setEditable(!enableS3);
  txtQueueDesign.setEnabled(!enableS3);
  dialog.y -= 20; // Run event loop

  while (true) {
    var result = dialog.run();

    if (!result) {
      dialog.finish();
      return false;
    }

    var enableS3Num = dialog.views['enableS3'].state();
    queueDesign = dialog.views['queueDesign'].stringValue() + "";
    s3SecretKey = dialog.views['s3SecretKey'].stringValue() + "";
    s3AccessKey = dialog.views['s3AccessKey'].stringValue() + "";
    s3Bucket = dialog.views['s3Bucket'].stringValue() + "";
    sketch_settings__WEBPACK_IMPORTED_MODULE_0___default.a.setSettingForKey("DesignOpsQueue", queueDesign);
    sketch_settings__WEBPACK_IMPORTED_MODULE_0___default.a.setSettingForKey("gxS3Enabled", enableS3Num);
    if (!s3AccessKey.startsWith("<")) sketch_settings__WEBPACK_IMPORTED_MODULE_0___default.a.setSettingForKey("gxS3AccessKey", s3AccessKey);
    if (!s3SecretKey.startsWith("<")) sketch_settings__WEBPACK_IMPORTED_MODULE_0___default.a.setSettingForKey("gxS3SecretKey", s3SecretKey);
    if (!s3Bucket.startsWith("<")) sketch_settings__WEBPACK_IMPORTED_MODULE_0___default.a.setSettingForKey("gxBucket", s3Bucket);
    break;
  }

  dialog.finish();
});

/***/ }),

/***/ "./src/uidialog.js":
/*!*************************!*\
  !*** ./src/uidialog.js ***!
  \*************************/
/*! exports provided: UIDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIDialog", function() { return UIDialog; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UIDialog_iconImage = null;
var TAB_HEIGHT = 55;

function Class(className, BaseClass, selectorHandlerDict) {
  var uniqueClassName = className + NSUUID.UUID().UUIDString();
  var delegateClassDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(uniqueClassName, BaseClass);

  for (var selectorString in selectorHandlerDict) {
    delegateClassDesc.addInstanceMethodWithSelector_function_(selectorString, selectorHandlerDict[selectorString]);
  }

  delegateClassDesc.registerClass();
  return NSClassFromString(uniqueClassName);
}

;

var UIAbstractWindow = /*#__PURE__*/function () {
  function UIAbstractWindow(window, intRect) {
    _classCallCheck(this, UIAbstractWindow);

    this.window = window;
    var container = NSView.alloc().initWithFrame(intRect);
    this.container = container;
    this.topContainer = container;
    this.views = [];
    this.leftOffset = 0;
    this.rect = intRect;
    this.y = NSHeight(this.rect);
    this.leftColumn = true;
    this.leftColWidth = 120;
    this.textOffset = 2;
  }

  _createClass(UIAbstractWindow, [{
    key: "removeLeftColumn",
    value: function removeLeftColumn() {
      this.leftColumn = false;
      this.leftColWidth = 0;
      this.textOffset = 0;
    }
  }, {
    key: "initTabs",
    value: function initTabs(tabs) {
      var intRect = this.rect;
      this.tabs = tabs.map(function (tab) {
        return {
          label: tab
        };
      });
      var tabView = NSTabView.alloc().initWithFrame(intRect);
      this.tabs.forEach(function (tab, index) {
        var viewController = NSViewController.alloc().init();
        viewController.originalSize = intRect;
        var view = NSView.alloc().initWithFrame(intRect);
        view.wantsLayer = false;
        viewController.view = view;
        var tabViewIem = NSTabViewItem.alloc().init();
        tabViewIem.viewController = viewController;
        tabViewIem.label = tab.label;
        tabViewIem.initialFirstResponder = view;
        tabView.addTabViewItem(tabViewIem);
        tab.container = view;
      }, this);
      this.tabView = tabView;
      this.container = this.tabs[0].container;
      this.topContainer = tabView;
      this.leftOffset = 20;
      this.y = NSHeight(this.rect) - TAB_HEIGHT;
    }
  }, {
    key: "setTabForViewsCreating",
    value: function setTabForViewsCreating(tabIndex) {
      this.container = this.tabs[tabIndex].container;
      this.y = NSHeight(this.rect) - TAB_HEIGHT;
    }
  }, {
    key: "enableTextByID",
    value: function enableTextByID(id, enabled) {
      if (!(id in dialog.views)) return;
      var text = dialog.views[id];
      if (!enabled) text.textColor = NSColor.disabledControlTextColor();else text.textColor = NSColor.controlTextColor();
    }
  }, {
    key: "enableHintByID",
    value: function enableHintByID(id, enabled) {
      if (!(id in dialog.views)) return;
      var text = dialog.views[id];
      if (!enabled) text.textColor = NSColor.disabledControlTextColor();else text.textColor = NSColor.secondaryLabelColor();
    }
  }, {
    key: "enableControlByID",
    value: function enableControlByID(id, enabled) {
      var control = dialog.views[id];
      control.enabled = enabled;
      this.enableTextByID(id + 'Label', enabled);
      this.enableHintByID(id + 'Hint', enabled);
    }
  }, {
    key: "getNewFrame",
    value: function getNewFrame() {
      var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 25;
      var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      var yinc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
      var frame = NSMakeRect(this.leftColWidth, this.y - height, width == -1 ? NSWidth(this.rect) - 10 - this.leftColWidth : width, height);
      this.y -= height + (yinc >= 0 ? yinc : 10);
      return frame;
    }
  }, {
    key: "addSpace",
    value: function addSpace() {
      this.getNewFrame(0);
    }
  }, {
    key: "addLeftLabel",
    value: function addLeftLabel(id, text) {
      var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 40;
      var frame = null;
      if (this.leftColumn) frame = NSMakeRect(0, this.y - height - this.textOffset, this.leftColWidth - 10, height);else frame = this.getNewFrame(height);
      var label = NSTextField.alloc().initWithFrame(frame);
      label.setStringValue(text);
      label.setBezeled(false);
      label.setDrawsBackground(false);
      label.setEditable(false);
      label.setSelectable(false);

      if (this.leftColumn) {
        label.setFont(NSFont.boldSystemFontOfSize(12));
        label.setAlignment(NSTextAlignmentRight);
      }

      if ('' != id) this.views[id] = label;
      this.container.addSubview(label);
      return label;
    }
  }, {
    key: "addLabel",
    value: function addLabel(id, text) {
      var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 25;
      var frame = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var myframe = frame ? Utils.copyRect(frame) : undefined;
      if (myframe) myframe.size.height = height;
      var label = NSTextField.alloc().initWithFrame(myframe ? myframe : this.getNewFrame(height));
      label.setStringValue(text);
      label.setBezeled(false);
      label.setDrawsBackground(false);
      label.setEditable(false);
      label.setSelectable(false);
      if ('' != id) this.views[id] = label;
      this.container.addSubview(label);
      this.y += 5;
      return label;
    } // required:  id:, options:
    // opional:  label: "", width: 220, frame: undefined

  }, {
    key: "addComboBox",
    value: function addComboBox(opt) {
      if (undefined == opt.label) opt.label = "";
      if (undefined == opt.width) opt.width = 220;
      if (opt.label != '') this.addLabel(id + "Label", opt.label, 17);
      var v = NSComboBox.alloc().initWithFrame(opt.frame ? opt.frame : this.getNewFrame(20, opt.width));

      if (opt.options.length > 0) {
        v.addItemsWithObjectValues(opt.options);
        v.setNumberOfVisibleItems(opt.options.length);
        v.selectItemAtIndex(0);
      }

      v.setCompletes(1);
      this.container.addSubview(v);
      this.views[opt.id] = v;
      return v;
    }
  }, {
    key: "addCheckbox",
    value: function addCheckbox(id, label, checked, func) {
      var height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 18;
      checked = checked == false ? NSOffState : NSOnState;
      var checkbox = NSButton.alloc().initWithFrame(this.getNewFrame(height, -1, 6));
      checkbox.setButtonType(NSSwitchButton);
      checkbox.setBezelStyle(0);
      checkbox.setTitle(label);
      checkbox.setState(checked);
      checkbox.setCOSJSTargetFunction(func);
      this.container.addSubview(checkbox);
      this.views[id] = checkbox;
      return checkbox;
    }
  }, {
    key: "addTextBox",
    value: function addTextBox(id, label, textValue) {
      var inlineHint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
      var height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 120;
      if (label != '') this.addLabel(id + "Label", label, 17);
      var textBox = NSTextField.alloc().initWithFrame(this.getNewFrame(height));
      textBox.setEditable(true);
      textBox.setBordered(true);
      textBox.setStringValue(textValue);

      if (inlineHint != "") {
        textBox.setPlaceholderString(inlineHint);
      }

      this.container.addSubview(textBox);
      this.views[id] = textBox;
      return textBox;
    }
  }, {
    key: "addTextViewBox",
    value: function addTextViewBox(id, label, textValue) {
      var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 120;
      if (label != '') this.addLabel(id + "Label", label, 17);
      var frame = this.getNewFrame(height);
      var scrollView = NSScrollView.alloc().initWithFrame(frame);
      scrollView.setHasVerticalScroller(true);
      scrollView.setHasHorizontalScroller(true);
      var textView = NSTextView.alloc().initWithFrame(frame);
      textView.setEditable(false);
      textView.setString(textValue + "");
      scrollView.addSubview(textView);
      scrollView.setDocumentView(textView);
      this.container.addSubview(scrollView);
      this.views[id] = textView;
      return textView;
    }
  }, {
    key: "addTextInput",
    value: function addTextInput(id, label, textValue) {
      var inlineHint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
      var width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 220;
      var frame = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      if (label != '') this.addLabel(id + "Label", label, 17, frame);
      var input = NSTextField.alloc().initWithFrame(frame ? frame : this.getNewFrame(20, width));
      input.setEditable(true);
      input.setBordered(true);
      input.setStringValue(textValue + "");

      if (inlineHint != "") {
        input.setPlaceholderString(inlineHint);
      }

      this.container.addSubview(input);
      this.views[id] = input;
      return input;
    } // opt: required: id, label, labelSelect, textValue
    //      optional: inlineHint = "", width = 220, widthSelect = 50), askFilePath=false
    //       comboBoxOptions: string array

  }, {
    key: "addPathInput",
    value: function addPathInput(opt) {
      if (!('width' in opt)) opt.width = 220;
      if (!('widthSelect' in opt)) opt.widthSelect = 50;
      if (!('inlineHint' in opt)) opt.inlineHint = "";
      if (!('askFilePath' in opt)) opt.askFilePath = false;
      if (opt.label != '') this.addLabel(opt.id + "Label", opt.label, 17);
      var frame = this.getNewFrame(28, opt.width - opt.widthSelect - 5);
      var frame2 = Utils.copyRect(frame);
      frame2.origin.x = frame2.origin.x + opt.width - opt.widthSelect;
      frame2.origin.y -= 3;
      var input = 'comboBoxOptions' in opt ? this.addComboBox({
        id: opt.id,
        options: opt.comboBoxOptions,
        width: 0,
        frame: frame
      }) : this.addTextInput(opt.id, "", opt.textValue, opt.inlineHint, 0, frame);
      this.addButton(opt.id + "Select", opt.labelSelect, function () {
        var newPath = opt.askFilePath ? Utils.askFilePath(input.stringValue() + "") : Utils.askPath(input.stringValue() + "");

        if (newPath != null) {
          input.setStringValue(newPath);
        }

        return;
      }, 0, frame2);
      return input;
    }
  }, {
    key: "addSelect",
    value: function addSelect(id, label, selectItem, options) {
      var width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 100;
      if (label != '') this.addLabel(id + "Label", label, 15);
      var v = NSPopUpButton.alloc().initWithFrame(this.getNewFrame(23, width));
      v.addItemsWithTitles(options);
      v.selectItemAtIndex(selectItem);
      this.container.addSubview(v);
      this.views[id] = v;
      return v;
    }
  }, {
    key: "addRadioButtons",
    value: function addRadioButtons(id, label, selectItem, options) {
      var width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 100;
      if (label != '') this.addLabel(id + "Label", label, 15); // pre-select the first item

      if (selectItem < 0) selectItem = 0;
      var group = this.startRadioButtions(id, selectItem);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;
          var index = group.btns.length;
          var btn = NSButton.alloc().initWithFrame(this.getNewFrame(18, width));
          btn.setButtonType(NSRadioButton);
          btn.setTitle(item);
          btn.setState(index != selectItem ? NSOffState : NSOnState);
          btn.myGroup = group;
          btn.myIndex = index;
          btn.setCOSJSTargetFunction(group.radioTargetFunction);
          this.container.addSubview(btn);
          group.btns.push(btn);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return group;
    }
  }, {
    key: "startRadioButtions",
    value: function startRadioButtions(idGroup, selectedIndex) {
      var groups = {
        id: idGroup,
        btns: [],
        selectedIndex: selectedIndex,
        radioTargetFunction: function radioTargetFunction(sender) {
          sender.myGroup.selectedIndex = sender.myIndex;
        }
      };
      this._buttonsGroups = groups;
      this.views[idGroup] = this._buttonsGroups;
      return this._buttonsGroups;
    }
  }, {
    key: "addRadioButton",
    value: function addRadioButton(id, title, index, frame) {
      var selected = this._buttonsGroups.selectedIndex == index;
      var btn = NSButton.alloc().initWithFrame(frame);
      btn.setButtonType(NSRadioButton);
      if (title != '') btn.setTitle(title);
      btn.setState(!selected ? NSOffState : NSOnState);
      btn.myGroup = this._buttonsGroups;
      btn.myIndex = index;
      btn.setCOSJSTargetFunction(this._buttonsGroups.radioTargetFunction);
      this.views[id] = btn;
      this.container.addSubview(btn);

      this._buttonsGroups.btns.push(btn);

      return btn;
    }
  }, {
    key: "addButton",
    value: function addButton(id, label, func) {
      var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;
      var frame = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      // create OK button
      var btn = NSButton.alloc().initWithFrame(frame ? frame : this.getNewFrame(20, width));
      btn.setTitle(label);
      btn.setBezelStyle(NSRoundedBezelStyle);
      btn.sizeToFit();
      btn.setCOSJSTargetFunction(func);
      this.container.addSubview(btn);
      this.views[id] = btn;
      return btn;
    }
  }, {
    key: "addHint",
    value: function addHint(id, label) {
      var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 23;
      this.y += 3;
      var hint = NSTextField.alloc().initWithFrame(this.getNewFrame(height, -1, 3));
      hint.setStringValue(label);
      hint.setColor = NSColor.secondaryLabelColor();
      hint.setBezeled(false);
      hint.setDrawsBackground(false);
      hint.setEditable(false);
      hint.setSelectable(false);
      hint.setFont(NSFont.systemFontOfSize(10));
      this.container.addSubview(hint);
      if ('' != id) this.views[id] = hint;
      return hint;
    }
  }, {
    key: "addDivider",
    value: function addDivider() {
      var height = 1;
      var frame = NSMakeRect(0, this.y - height, NSWidth(this.rect) - 10, height);
      this.y -= height + 10;
      var divider = NSView.alloc().initWithFrame(frame);
      divider.setWantsLayer(1);
      divider.layer().setBackgroundColor(CGColorCreateGenericRGB(204 / 255, 204 / 255, 204 / 255, 1));
      this.container.addSubview(divider);
      return divider;
    } // image: NSImage

  }, {
    key: "addImage",
    value: function addImage(id, image, frame) {
      var nImageView = NSImageView.alloc().initWithFrame(frame);
      nImageView.setImage(image);
      this.container.addSubview(nImageView);
      this.views[id] = nImageView;
      return nImageView;
    }
  }, {
    key: "finish",
    value: function finish() {
      this.window = null;
    }
  }]);

  return UIAbstractWindow;
}();

var UIDialog = /*#__PURE__*/function (_UIAbstractWindow) {
  _inherits(UIDialog, _UIAbstractWindow);

  _createClass(UIDialog, null, [{
    key: "setUp",
    value: function setUp(context) {
      UIDialog_iconImage = NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("icon.png").path());
    }
  }]);

  function UIDialog(title, rect, okButtonTitle) {
    var description = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var cancelButtonTitle = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "Cancel";
    var thirdButtonTitle = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;

    _classCallCheck(this, UIDialog);

    var window = NSAlert.alloc().init(); //   window.setIcon(UIDialog_iconImage)

    window.setMessageText(title);

    if (description != '') {
      window.setInformativeText(description);
    }

    if (okButtonTitle) window.addButtonWithTitle(okButtonTitle);
    if (cancelButtonTitle) window.addButtonWithTitle(cancelButtonTitle);
    if (thirdButtonTitle) window.addButtonWithTitle(thirdButtonTitle);
    return _possibleConstructorReturn(this, _getPrototypeOf(UIDialog).call(this, window, rect));
  }

  _createClass(UIDialog, [{
    key: "run",
    value: function run() {
      this.window.setAccessoryView(this.topContainer);
      var res = this.window.runModal();
      this.userClickedOk = res == '1000';
      this.userClickedCancel = res == '1001';
      this.userClickedThird = res == '1002';
      return this.userClickedOk;
    }
  }]);

  return UIDialog;
}(UIAbstractWindow);

/***/ }),

/***/ "sketch/settings":
/*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=__set-queue-path.js.map