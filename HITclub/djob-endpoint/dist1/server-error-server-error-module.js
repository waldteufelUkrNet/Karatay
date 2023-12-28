(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["server-error-server-error-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/server-error/server-error.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/server-error/server-error.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\r\n  server-error works!\r\n</p>\r\n"

/***/ }),

/***/ "./src/app/server-error/server-error-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/server-error/server-error-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: ServerErrorRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerErrorRoutingModule", function() { return ServerErrorRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _server_error_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./server-error.component */ "./src/app/server-error/server-error.component.ts");




const routes = [
    {
        path: '', component: _server_error_component__WEBPACK_IMPORTED_MODULE_3__["ServerErrorComponent"]
    }
];
let ServerErrorRoutingModule = class ServerErrorRoutingModule {
};
ServerErrorRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], ServerErrorRoutingModule);



/***/ }),

/***/ "./src/app/server-error/server-error.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/server-error/server-error.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NlcnZlci1lcnJvci9zZXJ2ZXItZXJyb3IuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/server-error/server-error.component.ts":
/*!********************************************************!*\
  !*** ./src/app/server-error/server-error.component.ts ***!
  \********************************************************/
/*! exports provided: ServerErrorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerErrorComponent", function() { return ServerErrorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let ServerErrorComponent = class ServerErrorComponent {
    constructor() { }
    ngOnInit() {
    }
};
ServerErrorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-server-error',
        template: __webpack_require__(/*! raw-loader!./server-error.component.html */ "./node_modules/raw-loader/index.js!./src/app/server-error/server-error.component.html"),
        styles: [__webpack_require__(/*! ./server-error.component.scss */ "./src/app/server-error/server-error.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], ServerErrorComponent);



/***/ }),

/***/ "./src/app/server-error/server-error.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/server-error/server-error.module.ts ***!
  \*****************************************************/
/*! exports provided: ServerErrorModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerErrorModule", function() { return ServerErrorModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _server_error_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./server-error-routing.module */ "./src/app/server-error/server-error-routing.module.ts");
/* harmony import */ var _server_error_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./server-error.component */ "./src/app/server-error/server-error.component.ts");





let ServerErrorModule = class ServerErrorModule {
};
ServerErrorModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _server_error_routing_module__WEBPACK_IMPORTED_MODULE_3__["ServerErrorRoutingModule"]
        ],
        declarations: [_server_error_component__WEBPACK_IMPORTED_MODULE_4__["ServerErrorComponent"]]
    })
], ServerErrorModule);



/***/ })

}]);
//# sourceMappingURL=server-error-server-error-module.js.map