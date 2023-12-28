(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["configs-configs-module"],{

/***/ "./node_modules/@tinymce/tinymce-angular/fesm2015/tinymce-tinymce-angular.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@tinymce/tinymce-angular/fesm2015/tinymce-tinymce-angular.js ***!
  \***********************************************************************************/
/*! exports provided: EditorComponent, EditorModule, TINYMCE_SCRIPT_SRC, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorComponent", function() { return EditorComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorModule", function() { return EditorModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TINYMCE_SCRIPT_SRC", function() { return TINYMCE_SCRIPT_SRC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return Events; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");





/**
 * Copyright (c) 2017-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const getTinymce = () => {
    const w = typeof window !== 'undefined' ? window : undefined;
    return w && w.tinymce ? w.tinymce : null;
};
const ɵ0 = getTinymce;

class Events {
    constructor() {
        this.onBeforePaste = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onBlur = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onClick = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onContextMenu = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onCopy = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onCut = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onDblclick = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onDrag = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onDragDrop = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onDragEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onDragGesture = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onDragOver = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onDrop = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onFocus = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onFocusIn = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onFocusOut = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onKeyDown = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onKeyPress = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onKeyUp = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onMouseDown = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onMouseEnter = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onMouseLeave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onMouseMove = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onMouseOut = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onMouseOver = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onMouseUp = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onPaste = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onSelectionChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onActivate = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onAddUndo = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onBeforeAddUndo = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onBeforeExecCommand = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onBeforeGetContent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onBeforeRenderUI = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onBeforeSetContent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onClearUndos = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onDeactivate = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onDirty = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onExecCommand = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onGetContent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onHide = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onInit = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onLoadContent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onNodeChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onPostProcess = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onPostRender = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onPreInit = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onPreProcess = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onProgressState = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onRedo = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onRemove = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onReset = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onSaveContent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onSetAttrib = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onObjectResizeStart = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onObjectResized = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onObjectSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onSetContent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onShow = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onSubmit = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onUndo = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onVisualAid = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
}
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onBeforePaste", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onBlur", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onClick", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onContextMenu", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onCopy", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onCut", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onDblclick", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onDrag", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onDragDrop", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onDragEnd", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onDragGesture", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onDragOver", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onDrop", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onFocus", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onFocusIn", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onFocusOut", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onKeyDown", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onKeyPress", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onKeyUp", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onMouseDown", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onMouseEnter", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onMouseLeave", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onMouseMove", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onMouseOut", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onMouseOver", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onMouseUp", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onPaste", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onSelectionChange", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onActivate", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onAddUndo", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onBeforeAddUndo", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onBeforeExecCommand", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onBeforeGetContent", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onBeforeRenderUI", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onBeforeSetContent", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onChange", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onClearUndos", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onDeactivate", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onDirty", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onExecCommand", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onGetContent", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onHide", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onInit", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onLoadContent", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onNodeChange", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onPostProcess", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onPostRender", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onPreInit", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onPreProcess", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onProgressState", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onRedo", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onRemove", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onReset", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onSaveContent", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onSetAttrib", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onObjectResizeStart", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onObjectResized", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onObjectSelected", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onSetContent", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onShow", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onSubmit", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onUndo", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], Events.prototype, "onVisualAid", void 0);
const validEvents = [
    'onActivate',
    'onAddUndo',
    'onBeforeAddUndo',
    'onBeforeExecCommand',
    'onBeforeGetContent',
    'onBeforeRenderUI',
    'onBeforeSetContent',
    'onBeforePaste',
    'onBlur',
    'onChange',
    'onClearUndos',
    'onClick',
    'onContextMenu',
    'onCopy',
    'onCut',
    'onDblclick',
    'onDeactivate',
    'onDirty',
    'onDrag',
    'onDragDrop',
    'onDragEnd',
    'onDragGesture',
    'onDragOver',
    'onDrop',
    'onExecCommand',
    'onFocus',
    'onFocusIn',
    'onFocusOut',
    'onGetContent',
    'onHide',
    'onInit',
    'onKeyDown',
    'onKeyPress',
    'onKeyUp',
    'onLoadContent',
    'onMouseDown',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseMove',
    'onMouseOut',
    'onMouseOver',
    'onMouseUp',
    'onNodeChange',
    'onObjectResizeStart',
    'onObjectResized',
    'onObjectSelected',
    'onPaste',
    'onPostProcess',
    'onPostRender',
    'onPreProcess',
    'onProgressState',
    'onRedo',
    'onRemove',
    'onReset',
    'onSaveContent',
    'onSelectionChange',
    'onSetAttrib',
    'onSetContent',
    'onShow',
    'onSubmit',
    'onUndo',
    'onVisualAid'
];

/**
 * Copyright (c) 2017-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const bindHandlers = (ctx, editor) => {
    validEvents.forEach((eventName) => {
        const eventEmitter = ctx[eventName];
        editor.on(eventName.substring(2), (event) => ctx.ngZone.run(() => eventEmitter.emit({ event, editor })));
    });
};
const ɵ0$1 = bindHandlers;
let unique = 0;
const uuid = (prefix) => {
    const date = new Date();
    const time = date.getTime();
    const random = Math.floor(Math.random() * 1000000000);
    unique++;
    return prefix + '_' + random + unique + String(time);
};
const ɵ1 = uuid;
const isTextarea = (element) => {
    return typeof element !== 'undefined' && element.tagName.toLowerCase() === 'textarea';
};
const ɵ2 = isTextarea;
const normalizePluginArray = (plugins) => {
    if (typeof plugins === 'undefined' || plugins === '') {
        return [];
    }
    return Array.isArray(plugins) ? plugins : plugins.split(' ');
};
const ɵ3 = normalizePluginArray;
const mergePlugins = (initPlugins, inputPlugins) => normalizePluginArray(initPlugins).concat(normalizePluginArray(inputPlugins));
const ɵ4 = mergePlugins;
// tslint:disable-next-line:no-empty
const noop = () => { };
const ɵ5 = noop;
const isNullOrUndefined = (value) => value === null || value === undefined;
const ɵ6 = isNullOrUndefined;

/**
 * Copyright (c) 2017-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const createState = () => {
    return {
        listeners: [],
        scriptId: uuid('tiny-script'),
        scriptLoaded: false
    };
};
const ɵ0$2 = createState;
const CreateScriptLoader = () => {
    let state = createState();
    const injectScriptTag = (scriptId, doc, url, callback) => {
        const scriptTag = doc.createElement('script');
        scriptTag.referrerPolicy = 'origin';
        scriptTag.type = 'application/javascript';
        scriptTag.id = scriptId;
        scriptTag.src = url;
        const handler = () => {
            scriptTag.removeEventListener('load', handler);
            callback();
        };
        scriptTag.addEventListener('load', handler);
        if (doc.head) {
            doc.head.appendChild(scriptTag);
        }
    };
    const load = (doc, url, callback) => {
        if (state.scriptLoaded) {
            callback();
        }
        else {
            state.listeners.push(callback);
            if (!doc.getElementById(state.scriptId)) {
                injectScriptTag(state.scriptId, doc, url, () => {
                    state.listeners.forEach((fn) => fn());
                    state.scriptLoaded = true;
                });
            }
        }
    };
    // Only to be used by tests.
    const reinitialize = () => {
        state = createState();
    };
    return {
        load,
        reinitialize
    };
};
const ɵ1$1 = CreateScriptLoader;
const ScriptLoader = CreateScriptLoader();

const TINYMCE_SCRIPT_SRC = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('TINYMCE_SCRIPT_SRC');
const EDITOR_COMPONENT_VALUE_ACCESSOR = {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NG_VALUE_ACCESSOR"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => EditorComponent),
    multi: true
};
let EditorComponent = class EditorComponent extends Events {
    constructor(elementRef, ngZone, platformId, tinymceScriptSrc) {
        super();
        this.platformId = platformId;
        this.tinymceScriptSrc = tinymceScriptSrc;
        this.cloudChannel = '5';
        this.apiKey = 'no-api-key';
        this.id = '';
        this.modelEvents = 'change keyup undo redo';
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this._elementRef = elementRef;
        this.ngZone = ngZone;
        this.initialise = this.initialise.bind(this);
    }
    set disabled(val) {
        this._disabled = val;
        if (this._editor && this._editor.initialized) {
            this._editor.setMode(val ? 'readonly' : 'design');
        }
    }
    get disabled() {
        return this._disabled;
    }
    get editor() {
        return this._editor;
    }
    writeValue(value) {
        if (this._editor && this._editor.initialized) {
            this._editor.setContent(isNullOrUndefined(value) ? '' : value);
        }
        else {
            this.initialValue = value === null ? undefined : value;
        }
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    setDisabledState(isDisabled) {
        if (this._editor) {
            this._editor.setMode(isDisabled ? 'readonly' : 'design');
        }
        else if (isDisabled) {
            this.init = Object.assign({}, this.init, { readonly: true });
        }
    }
    ngAfterViewInit() {
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(this.platformId)) {
            this.id = this.id || uuid('tiny-angular');
            this.inline =
                typeof this.inline !== 'undefined' ? (typeof this.inline === 'boolean' ? this.inline : true) : this.init && this.init.inline;
            this.createElement();
            if (getTinymce() !== null) {
                this.initialise();
            }
            else if (this._element && this._element.ownerDocument) {
                ScriptLoader.load(this._element.ownerDocument, this.getScriptSrc(), this.initialise);
            }
        }
    }
    ngOnDestroy() {
        if (getTinymce() !== null) {
            getTinymce().remove(this._editor);
        }
    }
    createElement() {
        const tagName = typeof this.tagName === 'string' ? this.tagName : 'div';
        this._element = document.createElement(this.inline ? tagName : 'textarea');
        if (this._element) {
            this._element.id = this.id;
            if (isTextarea(this._element)) {
                this._element.style.visibility = 'hidden';
            }
            this._elementRef.nativeElement.appendChild(this._element);
        }
    }
    initialise() {
        const finalInit = Object.assign({}, this.init, { target: this._element, inline: this.inline, readonly: this.disabled, plugins: mergePlugins(this.init && this.init.plugins, this.plugins), toolbar: this.toolbar || (this.init && this.init.toolbar), setup: (editor) => {
                this._editor = editor;
                editor.on('init', (e) => {
                    this.initEditor(editor);
                });
                bindHandlers(this, editor);
                if (this.init && typeof this.init.setup === 'function') {
                    this.init.setup(editor);
                }
            } });
        if (isTextarea(this._element)) {
            this._element.style.visibility = '';
        }
        this.ngZone.runOutsideAngular(() => {
            getTinymce().init(finalInit);
        });
    }
    getScriptSrc() {
        return isNullOrUndefined(this.tinymceScriptSrc) ?
            `https://cdn.tiny.cloud/1/${this.apiKey}/tinymce/${this.cloudChannel}/tinymce.min.js` :
            this.tinymceScriptSrc;
    }
    initEditor(editor) {
        editor.on('blur', () => this.ngZone.run(() => this.onTouchedCallback()));
        editor.on(this.modelEvents, () => {
            this.ngZone.run(() => this.onChangeCallback(editor.getContent({ format: this.outputFormat })));
        });
        if (typeof this.initialValue === 'string') {
            this.ngZone.run(() => editor.setContent(this.initialValue));
        }
    }
};
EditorComponent.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
    { type: Object, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"],] }] },
    { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [TINYMCE_SCRIPT_SRC,] }] }
];
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], EditorComponent.prototype, "disabled", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], EditorComponent.prototype, "cloudChannel", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], EditorComponent.prototype, "apiKey", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], EditorComponent.prototype, "init", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], EditorComponent.prototype, "id", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], EditorComponent.prototype, "initialValue", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], EditorComponent.prototype, "outputFormat", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], EditorComponent.prototype, "inline", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], EditorComponent.prototype, "tagName", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], EditorComponent.prototype, "plugins", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], EditorComponent.prototype, "toolbar", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], EditorComponent.prototype, "modelEvents", void 0);
EditorComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'editor',
        template: '<ng-template></ng-template>',
        providers: [EDITOR_COMPONENT_VALUE_ACCESSOR],
        styles: [':host { display: block; }']
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(TINYMCE_SCRIPT_SRC))
], EditorComponent);

let EditorModule = class EditorModule {
};
EditorModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"]],
        declarations: [EditorComponent],
        exports: [EditorComponent]
    })
], EditorModule);

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=tinymce-tinymce-angular.js.map


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/authorized/configs/configs-form/configs-form.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/authorized/configs/configs-form/configs-form.component.html ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"w-100 mb-3 page-block\">\n    <div class=\"row mt-2\">\n        <div class=\"col-12 d-inline-flex\">\n            <div class=\"w-100  p-3\">\n                <span class=\"mr-3 w50\">Privacy policy</span>\n                <editor apiKey=\"909wv7xpe5bxn0fl08gdrl2vkpitrqgsxwtjoyvd3bne1w73\" [init]=\"{menu: {\n                    insert: {title: 'Insert', items: 'link media | template hr'},\n                    view: {title: 'View', items: 'visualaid'},\n                    format: {title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'},\n                    table: {title: 'Table', items: 'inserttable tableprops deletetable | cell row column'},\n                    tools: {title: 'Tools', items: 'spellchecker code'}\n                  }}\"  [(ngModel)]=\"configs.privacy_policy\"></editor>\n                \n            </div>\n        </div>\n        <div class=\"col-12 d-inline-flex\">\n            <div class=\"w-100  p-3\">\n                <span class=\"mr-3 w50\">Terms of conditions</span>\n                <editor apiKey=\"909wv7xpe5bxn0fl08gdrl2vkpitrqgsxwtjoyvd3bne1w73\" [init]=\"{menu: {\n                    insert: {title: 'Insert', items: 'link media | template hr'},\n                    view: {title: 'View', items: 'visualaid'},\n                    format: {title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'},\n                    table: {title: 'Table', items: 'inserttable tableprops deletetable | cell row column'},\n                    tools: {title: 'Tools', items: 'spellchecker code'}\n                  }}\"  [(ngModel)]=\"configs.terms_of_conditions\"></editor>\n                \n            </div>\n        </div>\n\n\n        <div class=\"col-12 d-inline-flex\">\n            <div class=\"w-100 d-flex p-3\">\n                <span class=\"mr-3 w50\">Комиссия по реферальной программе</span>\n                <input type=\"number\" [(ngModel)]=\"configs.referral_program_commissions\" class=\"form-control w50\">\n            </div>\n        </div>\n        <div class=\"col-12 d-inline-flex\">\n            <div class=\"w-100 d-flex p-3\">\n                <span class=\"mr-3 w50\">Комиссия системы</span>\n                <input type=\"number\" [(ngModel)]=\"configs.system_commission\" class=\"form-control w50\">\n            </div>\n        </div>\n        <div class=\"col-12 d-inline-flex\">\n            <div class=\"w-100 d-flex p-3\">\n                <span class=\"mr-3 w50\">Количество доступныйх поисков исполнителя</span>\n                <input type=\"number\" [(ngModel)]=\"configs.executor_find_counter\" class=\"form-control w50\">\n            </div>\n        </div>\n        <div class=\"col-12 d-inline-flex\">\n            <div class=\"w-100 d-flex p-3\">\n                <span class=\"mr-3 w50\">Время ожидания принятия заказа (секунды)</span>\n                <input type=\"number\" [(ngModel)]=\"configs.accept_wait_time\" class=\"form-control w50\">\n            </div>\n        </div>\n        <div class=\"col-12 d-inline-flex\">\n            <div class=\"w-100 d-flex p-3\">\n                <span class=\"mr-3 w50\">Минимальный баланс для основного счета.</span>\n                <input type=\"number\" [(ngModel)]=\"configs.min_cash_balance\" class=\"form-control w50\">\n            </div>\n        </div>\n        <div class=\"col-12 d-inline-flex\">\n            <div class=\"w-100 d-flex p-3\">\n                <span class=\"mr-3 w50\">Минимальный баланс для бонусного счета.</span>\n                <input type=\"number\" [(ngModel)]=\"configs.min_cash_bonus_balance\" class=\"form-control w50\">\n            </div>\n        </div>\n        <div class=\"col-12 d-inline-flex\">\n            <div class=\"w-100 d-flex p-3\">\n                <span class=\"mr-3 w50\">Успешных заказов до уровны \"мастер\"</span>\n                <input type=\"number\" [(ngModel)]=\"configs.master_order_count_needed\" class=\"form-control w50\">\n            </div>\n        </div>\n        <div class=\"col-12 d-inline-flex\">\n            <div class=\"w-100 d-flex p-3\">\n                <span class=\"mr-3 w50\">Успешных заказов до уровны \"бывалый\"</span>\n                <input type=\"number\" [(ngModel)]=\"configs.middle_order_count_needed\" class=\"form-control w50\">\n            </div>\n        </div>\n        <div class=\"col-12 d-inline-flex\">\n            <div class=\"w-100 d-flex p-3\">\n                <span class=\"mr-3 w50\">Количество дней до отправки уведомлении клиентов</span>\n                <input type=\"number\" [(ngModel)]=\"configs.return_to_the_application_customer_days\" class=\"form-control w50\">\n            </div>\n        </div>\n        <div class=\"col-12 d-inline-flex\">\n            <div class=\"w-100 d-flex p-3\">\n                <span class=\"mr-3 w50\">Количество дней до отправки уведомлении исполнителей</span>\n                <input type=\"number\" [(ngModel)]=\"configs.return_to_the_application_executor_days\" class=\"form-control w50\">\n            </div>\n        </div>\n        <div class=\"col-12 d-inline-flex\">\n            <div class=\"w-100 d-flex p-3\">\n                <span class=\"mr-3 w50\">Список рандомных уведомлений клиентам</span>\n                <div class=\"w-50\">\n                    <div class=\"row\">\n                        <div class=\"col-12 d-flex mb-1\" *ngFor=\"let item of customer_push_texts\">\n                            <input class=\"text form-control\" type=\"text\" [(ngModel)]=\"item.val\" />\n                            <i class=\"fa fa-remove c-pointer\" (click)=\"deleteCustomerPushMessage(item)\"></i>\n                        </div>\n                        <div class=\"col-12 d-flex justify-content-end\">\n                            <i class=\"fa fa-plus c-pointer\" (click)=\"addCustomerPushMessage()\"></i>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-12 d-inline-flex\">\n            <div class=\"w-100 d-flex p-3\">\n                <span class=\"mr-3 w50\">Список рандомных уведомлений исполнителям</span>\n                <div class=\"w-50\">\n                    <div class=\"row\">\n                        <div class=\"col-12 d-flex mb-1\" *ngFor=\"let item of executor_push_texts\">\n                            <input class=\"text form-control\" type=\"text\" [(ngModel)]=\"item.val\" />\n                            <i class=\"fa fa-remove c-pointer\" (click)=\"deleteExecutorPushMessage(item)\"></i>\n                        </div>\n                        <div class=\"col-12 d-flex justify-content-end\">\n                            <i class=\"fa fa-plus c-pointer\" (click)=\"addExecutorPushMessage()\"></i>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-12 d-inline-flex justify-content-end\">\n            <button class=\"btn btn-primary mr-3 mb-3\" (click)=\"saveConfigs()\">Сохранить</button>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/authorized/configs/configs.component.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/authorized/configs/configs.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/authorized/configs/configs-form/configs-form.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/authorized/configs/configs-form/configs-form.component.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGhvcml6ZWQvY29uZmlncy9jb25maWdzLWZvcm0vY29uZmlncy1mb3JtLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/authorized/configs/configs-form/configs-form.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/authorized/configs/configs-form/configs-form.component.ts ***!
  \***************************************************************************/
/*! exports provided: ConfigsFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigsFormComponent", function() { return ConfigsFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared */ "./src/app/shared/index.ts");



let ConfigsFormComponent = class ConfigsFormComponent {
    constructor(configsService, notif) {
        this.configsService = configsService;
        this.notif = notif;
        this.configs = {
            referral_program_commissions: null,
            system_commission: null,
            executor_find_counter: null,
            accept_wait_time: null,
            min_cash_balance: null,
            min_cash_bonus_balance: null,
            master_order_count_needed: null,
            middle_order_count_needed: null,
            return_to_the_application_customer_days: null,
            return_to_the_application_executor_days: null,
            return_to_the_application_customer_texts: '',
            terms_of_conditions: '',
            privacy_policy: '',
            return_to_the_application_executor_texts: ''
        };
        this.customer_push_texts = [];
        this.executor_push_texts = [];
    }
    ngOnInit() {
        this.configsService.getConfigs()
            .then((confData) => {
            for (let i = 0; i < confData.length; i++) {
                this.configs[confData[i].param] = confData[i].value;
                if (confData[i].param === 'return_to_the_application_customer_texts') {
                    let tmparr = confData[i].value ? confData[i].value.split('|') : [];
                    this.customer_push_texts = [];
                    for (let j = 0; j < tmparr.length; j++) {
                        this.customer_push_texts.push({ val: tmparr[j] });
                    }
                }
                if (confData[i].param === 'return_to_the_application_executor_texts') {
                    let tmparr = confData[i].value ? confData[i].value.split('|') : [];
                    this.executor_push_texts = [];
                    for (let j = 0; j < tmparr.length; j++) {
                        this.executor_push_texts.push({ val: tmparr[j] });
                    }
                }
            }
        });
    }
    saveConfigs() {
        this.configs['return_to_the_application_executor_texts'] = '';
        if (this.executor_push_texts.length) {
            for (let i = 0; i < this.executor_push_texts.length; i++) {
                this.configs['return_to_the_application_executor_texts'] += i === 0 ? this.executor_push_texts[i].val : '|' + this.executor_push_texts[i].val;
            }
        }
        this.configs['return_to_the_application_customer_texts'] = '';
        if (this.customer_push_texts.length) {
            for (let i = 0; i < this.customer_push_texts.length; i++) {
                this.configs['return_to_the_application_customer_texts'] += i === 0 ? this.customer_push_texts[i].val : '|' + this.customer_push_texts[i].val;
            }
        }
        this.configsService.updateConfigs(this.configs)
            .then(upData => {
            this.notif.showOne('Сохранено!');
        });
    }
    addCustomerPushMessage() {
        this.customer_push_texts.push({ val: '' });
    }
    deleteCustomerPushMessage(text) {
        this.customer_push_texts = this.customer_push_texts.filter(_text => text !== _text);
    }
    addExecutorPushMessage() {
        this.executor_push_texts.push({ val: '' });
    }
    deleteExecutorPushMessage(text) {
        this.executor_push_texts = this.executor_push_texts.filter(_text => text !== _text);
    }
};
ConfigsFormComponent.ctorParameters = () => [
    { type: _shared__WEBPACK_IMPORTED_MODULE_2__["ConfigsService"] },
    { type: _shared__WEBPACK_IMPORTED_MODULE_2__["NotificationService"] }
];
ConfigsFormComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-configs-form',
        template: __webpack_require__(/*! raw-loader!./configs-form.component.html */ "./node_modules/raw-loader/index.js!./src/app/authorized/configs/configs-form/configs-form.component.html"),
        styles: [__webpack_require__(/*! ./configs-form.component.scss */ "./src/app/authorized/configs/configs-form/configs-form.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shared__WEBPACK_IMPORTED_MODULE_2__["ConfigsService"],
        _shared__WEBPACK_IMPORTED_MODULE_2__["NotificationService"]])
], ConfigsFormComponent);



/***/ }),

/***/ "./src/app/authorized/configs/configs-routing.module.ts":
/*!**************************************************************!*\
  !*** ./src/app/authorized/configs/configs-routing.module.ts ***!
  \**************************************************************/
/*! exports provided: ConfigsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigsRoutingModule", function() { return ConfigsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _configs_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./configs.component */ "./src/app/authorized/configs/configs.component.ts");
/* harmony import */ var _configs_form_configs_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./configs-form/configs-form.component */ "./src/app/authorized/configs/configs-form/configs-form.component.ts");





const routes = [
    {
        path: '',
        component: _configs_component__WEBPACK_IMPORTED_MODULE_3__["ConfigsComponent"],
        children: [
            { path: '', component: _configs_form_configs_form_component__WEBPACK_IMPORTED_MODULE_4__["ConfigsFormComponent"] }
        ]
    }
];
let ConfigsRoutingModule = class ConfigsRoutingModule {
};
ConfigsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], ConfigsRoutingModule);



/***/ }),

/***/ "./src/app/authorized/configs/configs.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/authorized/configs/configs.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGhvcml6ZWQvY29uZmlncy9jb25maWdzLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/authorized/configs/configs.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/authorized/configs/configs.component.ts ***!
  \*********************************************************/
/*! exports provided: ConfigsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigsComponent", function() { return ConfigsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _router_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../router.animations */ "./src/app/router.animations.ts");



let ConfigsComponent = class ConfigsComponent {
    constructor() { }
    ngOnInit() {
    }
};
ConfigsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-configs',
        template: __webpack_require__(/*! raw-loader!./configs.component.html */ "./node_modules/raw-loader/index.js!./src/app/authorized/configs/configs.component.html"),
        animations: [Object(_router_animations__WEBPACK_IMPORTED_MODULE_2__["routerTransition"])()],
        styles: [__webpack_require__(/*! ./configs.component.scss */ "./src/app/authorized/configs/configs.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], ConfigsComponent);



/***/ }),

/***/ "./src/app/authorized/configs/configs.module.ts":
/*!******************************************************!*\
  !*** ./src/app/authorized/configs/configs.module.ts ***!
  \******************************************************/
/*! exports provided: ConfigsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigsModule", function() { return ConfigsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _tinymce_tinymce_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tinymce/tinymce-angular */ "./node_modules/@tinymce/tinymce-angular/fesm2015/tinymce-tinymce-angular.js");
/* harmony import */ var _configs_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./configs-routing.module */ "./src/app/authorized/configs/configs-routing.module.ts");
/* harmony import */ var _configs_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./configs.component */ "./src/app/authorized/configs/configs.component.ts");
/* harmony import */ var _configs_form_configs_form_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./configs-form/configs-form.component */ "./src/app/authorized/configs/configs-form/configs-form.component.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var ngx_clipboard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-clipboard */ "./node_modules/ngx-clipboard/fesm2015/ngx-clipboard.js");











let ConfigsModule = class ConfigsModule {
};
ConfigsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _configs_routing_module__WEBPACK_IMPORTED_MODULE_5__["ConfigsRoutingModule"],
            _shared__WEBPACK_IMPORTED_MODULE_8__["PageHeaderModule"],
            _shared__WEBPACK_IMPORTED_MODULE_8__["PipesModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbTooltipModule"],
            _tinymce_tinymce_angular__WEBPACK_IMPORTED_MODULE_4__["EditorModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbModule"],
            _shared__WEBPACK_IMPORTED_MODULE_8__["AutocompleteModule"],
            _shared__WEBPACK_IMPORTED_MODULE_8__["LocationModule"],
            ngx_clipboard__WEBPACK_IMPORTED_MODULE_10__["ClipboardModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbTooltipModule"]
        ],
        declarations: [
            _configs_component__WEBPACK_IMPORTED_MODULE_6__["ConfigsComponent"],
            _configs_form_configs_form_component__WEBPACK_IMPORTED_MODULE_7__["ConfigsFormComponent"]
        ]
    })
], ConfigsModule);



/***/ })

}]);
//# sourceMappingURL=configs-configs-module.js.map