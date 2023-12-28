(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["support-support-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/authorized/support/support-list/support-list.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/authorized/support/support-list/support-list.component.html ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"w-100 mb-3 page-block\">\r\n    <div class=\"col-12 col-sm-4 d-inline-flex align-items-center justify-content-center pt-3 pb-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-12\">\r\n                <div class=\"switch-btn\" [class.switch-on]=\"filters.new\" (click)=\"changeStatusFilter('new')\"></div> Новые\r\n            </div>\r\n            <div class=\"col-12\">\r\n                <div class=\"switch-btn\" [class.switch-on]=\"filters.processed\" (click)=\"changeStatusFilter('processed')\"></div> Обработанные\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-12 col-sm-4 d-inline-flex align-items-center justify-content-center pt-3 pb-3\"></div>\r\n    <div class=\"col-12 col-sm-4 d-inline-flex align-items-center justify-content-end pt-3 pb-3\"></div>\r\n</div>\r\n\r\n\r\n<div class=\"card mb-3\">\r\n    <div class=\"card-header\">\r\n        <div>\r\n            Запросы в сапорт\r\n        </div>\r\n    </div>\r\n    <div class=\"card-body table-responsive\">\r\n        <table class=\"table table-hover table-striped text-center\">\r\n            <thead>\r\n            <tr>\r\n                <th>\r\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">ID</div>\r\n                </th>\r\n                <th>\r\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Телефон</div>\r\n                </th>\r\n                <th>\r\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">E-mail</div>\r\n                </th>\r\n                <th>\r\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Статус</div>\r\n                </th>\r\n            </tr>\r\n            </thead>\r\n            <tbody>\r\n            <tr *ngFor=\"let item of list\" (click)=\"openSupportDetails(supportInfo, item)\" class=\"c-pointer\">\r\n                <td>{{item.id}}</td>\r\n                <td>{{item.phone}}</td>\r\n                <td>{{item.email}}</td>\r\n                <td>{{item.status == 0 ? 'Новый' : 'Обработан'}}</td>\r\n            </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n</div>\r\n\r\n<ng-template #supportInfo let-c=\"close\" let-d=\"dismiss\">\r\n    <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Запрос №{{selectedSupport.id}}</h4>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d()\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <div class=\"d-flex flex-column\">\r\n            <div>ID: {{selectedSupport.id}}</div>\r\n            <div>Телефон: {{selectedSupport.phone}}</div>\r\n            <div>E-mail: {{selectedSupport.email}}</div>\r\n            <div>Текст: {{selectedSupport.text}}</div>\r\n            <div class=\"mt-3\">\r\n                Статус:\r\n                <div class=\"switch-btn\" [class.switch-on]=\"selectedSupport.status == 1\" (click)=\"changeStatus()\"></div>\r\n                <span *ngIf=\"selectedSupport.status == 0\">Новый</span>\r\n                <span *ngIf=\"selectedSupport.status != 0\">Обработан</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-secondary mr-2\" (click)=\"saveSupport()\">Сохранить статус</button>\r\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"c()\">Закрыть</button>\r\n    </div>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/authorized/support/support.component.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/authorized/support/support.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "./src/app/authorized/support/support-list/support-list.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/authorized/support/support-list/support-list.component.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".action-icon {\n  cursor: pointer;\n  margin: 10px;\n}\n\n.switch-btn {\n  margin-right: 10px;\n}\n\n.controls i {\n  margin: 0 5px;\n  cursor: pointer;\n}\n\n.controls i:before {\n  font-size: 12px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aG9yaXplZC9zdXBwb3J0L3N1cHBvcnQtbGlzdC9EOlxcaW5mb1xcd29ya1xccHJvamVjdHNcXFhlbGVudGVjXFxkam9iXFxkam9iLWVuZHBvaW50LmdpdFxcYWRtaW4vc3JjXFxhcHBcXGF1dGhvcml6ZWRcXHN1cHBvcnRcXHN1cHBvcnQtbGlzdFxcc3VwcG9ydC1saXN0LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9hdXRob3JpemVkL3N1cHBvcnQvc3VwcG9ydC1saXN0L3N1cHBvcnQtbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGVBQUE7RUFDQSxZQUFBO0FDQ0o7O0FEQ0E7RUFDSSxrQkFBQTtBQ0VKOztBRENJO0VBQ0ksYUFBQTtFQUNBLGVBQUE7QUNFUjs7QUREUTtFQUNJLGVBQUE7QUNHWiIsImZpbGUiOiJzcmMvYXBwL2F1dGhvcml6ZWQvc3VwcG9ydC9zdXBwb3J0LWxpc3Qvc3VwcG9ydC1saXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFjdGlvbi1pY29ue1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgbWFyZ2luOiAxMHB4O1xyXG59XHJcbi5zd2l0Y2gtYnRue1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG59XHJcbi5jb250cm9sc3tcclxuICAgIGl7XHJcbiAgICAgICAgbWFyZ2luOiAwIDVweDtcclxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgJjpiZWZvcmV7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiLmFjdGlvbi1pY29uIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBtYXJnaW46IDEwcHg7XG59XG5cbi5zd2l0Y2gtYnRuIHtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuXG4uY29udHJvbHMgaSB7XG4gIG1hcmdpbjogMCA1cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5jb250cm9scyBpOmJlZm9yZSB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/authorized/support/support-list/support-list.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/authorized/support/support-list/support-list.component.ts ***!
  \***************************************************************************/
/*! exports provided: SupportListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupportListComponent", function() { return SupportListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_4__);





let SupportListComponent = class SupportListComponent {
    constructor(supportService, modalService, notif) {
        this.supportService = supportService;
        this.modalService = modalService;
        this.notif = notif;
        this.countShowInPage = 20;
        this.filters = {
            new: true,
            processed: false
        };
        this.sort = {};
        this.search = '';
        this.range = {
            start: 0,
            limit: this.countShowInPage
        };
        this.list = [];
        this.scrollEventActive = false;
    }
    ngOnInit() {
        this.refreshSupports();
    }
    onScrollEvent($event) {
        if (document.body.scrollHeight - window.innerHeight - jquery__WEBPACK_IMPORTED_MODULE_4___default()(window).scrollTop() < 50) {
            clearTimeout(this.timeoutLoad);
            this.timeoutLoad = setTimeout(() => {
                this.scrollEventActive = false;
                this.range.start += this.countShowInPage;
                this.refreshSupports(false);
            }, 1000);
        }
    }
    refreshSupports(reinit = true) {
        if (reinit) {
            this.range.start = 0;
        }
        let options = {
            range: this.range,
            filter: this.filters
        };
        this.supportService.getlist(options)
            .then((list) => {
            if (reinit) {
                this.list = [];
            }
            this.list = this.list.concat(list);
            if (list.length) {
                this.scrollEventActive = true;
            }
        });
    }
    searchRefresh() {
        clearTimeout(this.timeoutSearch);
        this.timeoutSearch = setTimeout(() => {
            this.refreshSupports();
        }, 1000);
    }
    isEmpty(arg) {
        for (let item in arg) {
            return false;
        }
        return true;
    }
    openSupportDetails(content, support) {
        this.selectedSupport = support;
        this.modalService.open(content);
    }
    saveSupport() {
        this.supportService.update(this.selectedSupport.id, this.selectedSupport)
            .then(upData => {
            this.refreshSupports();
            this.modalService.dismissAll();
        });
    }
    changeStatus() {
        this.selectedSupport.status = (!this.selectedSupport.status || parseInt('' + this.selectedSupport.status) == 0) ? 1 : 0;
    }
    changeStatusFilter(key) {
        this.filters[key] = !this.filters[key];
        this.refreshSupports();
    }
};
SupportListComponent.ctorParameters = () => [
    { type: _shared__WEBPACK_IMPORTED_MODULE_2__["SupportService"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"] },
    { type: _shared__WEBPACK_IMPORTED_MODULE_2__["NotificationService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('window:scroll', ['$event']),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
], SupportListComponent.prototype, "onScrollEvent", null);
SupportListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-support-list',
        template: __webpack_require__(/*! raw-loader!./support-list.component.html */ "./node_modules/raw-loader/index.js!./src/app/authorized/support/support-list/support-list.component.html"),
        styles: [__webpack_require__(/*! ./support-list.component.scss */ "./src/app/authorized/support/support-list/support-list.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shared__WEBPACK_IMPORTED_MODULE_2__["SupportService"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"],
        _shared__WEBPACK_IMPORTED_MODULE_2__["NotificationService"]])
], SupportListComponent);



/***/ }),

/***/ "./src/app/authorized/support/support-routing.module.ts":
/*!**************************************************************!*\
  !*** ./src/app/authorized/support/support-routing.module.ts ***!
  \**************************************************************/
/*! exports provided: SupportRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupportRoutingModule", function() { return SupportRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _support_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./support.component */ "./src/app/authorized/support/support.component.ts");
/* harmony import */ var _support_list_support_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./support-list/support-list.component */ "./src/app/authorized/support/support-list/support-list.component.ts");





const routes = [
    {
        path: '',
        component: _support_component__WEBPACK_IMPORTED_MODULE_3__["SupportComponent"],
        children: [
            { path: '', component: _support_list_support_list_component__WEBPACK_IMPORTED_MODULE_4__["SupportListComponent"] },
        ]
    }
];
let SupportRoutingModule = class SupportRoutingModule {
};
SupportRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], SupportRoutingModule);



/***/ }),

/***/ "./src/app/authorized/support/support.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/authorized/support/support.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGhvcml6ZWQvc3VwcG9ydC9zdXBwb3J0LmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/authorized/support/support.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/authorized/support/support.component.ts ***!
  \*********************************************************/
/*! exports provided: SupportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupportComponent", function() { return SupportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _router_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../router.animations */ "./src/app/router.animations.ts");



let SupportComponent = class SupportComponent {
    constructor() { }
    ngOnInit() {
    }
};
SupportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-support',
        template: __webpack_require__(/*! raw-loader!./support.component.html */ "./node_modules/raw-loader/index.js!./src/app/authorized/support/support.component.html"),
        animations: [Object(_router_animations__WEBPACK_IMPORTED_MODULE_2__["routerTransition"])()],
        styles: [__webpack_require__(/*! ./support.component.scss */ "./src/app/authorized/support/support.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], SupportComponent);



/***/ }),

/***/ "./src/app/authorized/support/support.module.ts":
/*!******************************************************!*\
  !*** ./src/app/authorized/support/support.module.ts ***!
  \******************************************************/
/*! exports provided: SupportModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupportModule", function() { return SupportModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _support_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./support-routing.module */ "./src/app/authorized/support/support-routing.module.ts");
/* harmony import */ var _support_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./support.component */ "./src/app/authorized/support/support.component.ts");
/* harmony import */ var _support_list_support_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./support-list/support-list.component */ "./src/app/authorized/support/support-list/support-list.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared */ "./src/app/shared/index.ts");










let SupportModule = class SupportModule {
};
SupportModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _support_routing_module__WEBPACK_IMPORTED_MODULE_4__["SupportRoutingModule"],
            _shared__WEBPACK_IMPORTED_MODULE_8__["PageHeaderModule"],
            _shared__WEBPACK_IMPORTED_MODULE_8__["PipesModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__["NgbTooltipModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__["NgbModule"],
            _shared__WEBPACK_IMPORTED_MODULE_8__["AutocompleteModule"],
            _shared__WEBPACK_IMPORTED_MODULE_8__["LocationModule"],
            _shared__WEBPACK_IMPORTED_MODULE_8__["DateTimePickerModule"]
        ],
        declarations: [
            _support_component__WEBPACK_IMPORTED_MODULE_5__["SupportComponent"],
            _support_list_support_list_component__WEBPACK_IMPORTED_MODULE_6__["SupportListComponent"]
        ]
    })
], SupportModule);



/***/ })

}]);
//# sourceMappingURL=support-support-module.js.map