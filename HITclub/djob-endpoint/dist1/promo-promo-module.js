(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["promo-promo-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/authorized/promo/promo-list/promo-list.component.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/authorized/promo/promo-list/promo-list.component.html ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"w-100 mb-3 page-block\">\r\n    <div class=\"col-12 col-sm-4 d-inline-flex align-items-center justify-content-center pt-3 pb-3\">\r\n        <input type=\"text\" class=\"form-control\" [(ngModel)]=\"search\" (keyup)=\"searchRefresh()\" placeholder=\"Поиск...\">\r\n    </div>\r\n    <div class=\"col-12 col-sm-4 d-inline-flex align-items-center justify-content-center pt-3 pb-3\"></div>\r\n    <div class=\"col-12 col-sm-4 d-inline-flex align-items-center justify-content-end pt-3 pb-3\"></div>\r\n</div>\r\n\r\n\r\n<div class=\"card mb-3\">\r\n    <div class=\"card-header d-flex justify-content-between\">\r\n        <div>\r\n            Промо коды\r\n        </div>\r\n\r\n        <div class=\"action-buttons d-flex\">\r\n            <button class=\"btn btn-default\" (click)=\"openPromoDetails(content)\">Создать</button>\r\n        </div>\r\n    </div>\r\n    <div class=\"card-body table-responsive\">\r\n        <table class=\"table table-hover table-striped text-center\">\r\n            <thead>\r\n            <tr>\r\n                <th>\r\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Код</div>\r\n                </th>\r\n                <th>\r\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Тип</div>\r\n                </th>\r\n                <th>\r\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Сумма</div>\r\n                </th>\r\n                <th>\r\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Статус</div>\r\n                </th>\r\n                <th></th>\r\n            </tr>\r\n            </thead>\r\n            <tbody>\r\n            <tr *ngFor=\"let item of list\">\r\n                <td (click)=\"openPromoDetails(content, item)\">{{item.code}}</td>\r\n                <td (click)=\"openPromoDetails(content, item)\">{{item.type}}</td>\r\n                <td (click)=\"openPromoDetails(content, item)\">{{item.amount}}</td>\r\n                <td (click)=\"openPromoDetails(content, item)\">\r\n                    <span *ngIf=\"item.active\">Активный</span>\r\n                    <span *ngIf=\"!item.active\">Использован</span>\r\n                </td>\r\n                <td>\r\n                    <i class=\"fa fa-remove c-pointer mr-2\" *ngIf=\"item.active\" (click)=\"deleteConfirm(deleteConfirmModal, item)\" placement=\"left\" ngbTooltip=\"Удалить\"></i>\r\n                    <i class=\"fa fa-clone c-pointer\"  ngxClipboard [cbContent]=\"item.code\" placement=\"left\" ngbTooltip=\"Скопировать\"></i>\r\n                </td>\r\n            </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n</div>\r\n\r\n<ng-template #content let-c=\"close\" let-d=\"dismiss\">\r\n    <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Промо \"{{selectedPromo.code}}\"</h4>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d()\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <div class=\"d-flex flex-column\">\r\n            <div>Код: {{selectedPromo.code}}</div>\r\n            <div>\r\n                Тип:\r\n                <select class=\"form-control\" [(ngModel)]=\"selectedPromo.type\">\r\n                    <option [value]=\"'SUM'\">Сумма</option>\r\n                    <option [value]=\"'EXPERT'\">Експерт</option>\r\n                    <option [value]=\"'SUM_EXPERT'\">Експерт + сумма</option>\r\n                </select>\r\n            </div>\r\n            <div>Сумма: <input class=\"form-control\" [(ngModel)]=\"selectedPromo.amount\" [disabled]=\"selectedPromo.type == 'EXPERT'\"></div>\r\n            <div>\r\n                Статус:\r\n                <select class=\"form-control\" [(ngModel)]=\"selectedPromo.active\">\r\n                    <option [value]=\"true\">Активный</option>\r\n                    <option [value]=\"false\">Использован</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-secondary mr-2\" (click)=\"savePromo()\">Сохранить</button>\r\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"c()\">Закрыть</button>\r\n    </div>\r\n</ng-template>\r\n\r\n<ng-template #deleteConfirmModal let-c=\"close\" let-d=\"dismiss\">\r\n    <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Промо код \"{{deletePromo.code}}\"</h4>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d()\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <div class=\"d-flex flex-column\">\r\n            Вы уверены что хотите удалить специальность?\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-danger mr-2\" (click)=\"deletePromoConfirm()\">Удалить</button>\r\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"c()\">Закрыть</button>\r\n    </div>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/authorized/promo/promo.component.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/authorized/promo/promo.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "./src/app/authorized/promo/promo-list/promo-list.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/authorized/promo/promo-list/promo-list.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".action-icon {\n  cursor: pointer;\n  margin: 10px;\n}\n\n.switch-btn {\n  margin-right: 10px;\n}\n\n.controls i {\n  margin: 0 5px;\n  cursor: pointer;\n}\n\n.controls i:before {\n  font-size: 12px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aG9yaXplZC9wcm9tby9wcm9tby1saXN0L0Q6XFxpbmZvXFx3b3JrXFxwcm9qZWN0c1xcWGVsZW50ZWNcXGRqb2JcXGRqb2ItZW5kcG9pbnQuZ2l0XFxhZG1pbi9zcmNcXGFwcFxcYXV0aG9yaXplZFxccHJvbW9cXHByb21vLWxpc3RcXHByb21vLWxpc3QuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2F1dGhvcml6ZWQvcHJvbW8vcHJvbW8tbGlzdC9wcm9tby1saXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLFlBQUE7QUNDSjs7QURDQTtFQUNJLGtCQUFBO0FDRUo7O0FEQ0k7RUFDSSxhQUFBO0VBQ0EsZUFBQTtBQ0VSOztBRERRO0VBQ0ksZUFBQTtBQ0daIiwiZmlsZSI6InNyYy9hcHAvYXV0aG9yaXplZC9wcm9tby9wcm9tby1saXN0L3Byb21vLWxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYWN0aW9uLWljb257XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBtYXJnaW46IDEwcHg7XHJcbn1cclxuLnN3aXRjaC1idG57XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbn1cclxuLmNvbnRyb2xze1xyXG4gICAgaXtcclxuICAgICAgICBtYXJnaW46IDAgNXB4O1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICAmOmJlZm9yZXtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIuYWN0aW9uLWljb24ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIG1hcmdpbjogMTBweDtcbn1cblxuLnN3aXRjaC1idG4ge1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG5cbi5jb250cm9scyBpIHtcbiAgbWFyZ2luOiAwIDVweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmNvbnRyb2xzIGk6YmVmb3JlIHtcbiAgZm9udC1zaXplOiAxMnB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/authorized/promo/promo-list/promo-list.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/authorized/promo/promo-list/promo-list.component.ts ***!
  \*********************************************************************/
/*! exports provided: PromoListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromoListComponent", function() { return PromoListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_4__);





let PromoListComponent = class PromoListComponent {
    constructor(promoService, modalService, notif) {
        this.promoService = promoService;
        this.modalService = modalService;
        this.notif = notif;
        this.countShowInPage = 20;
        this.filters = {};
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
        this.refreshPromo();
    }
    onScrollEvent($event) {
        if (document.body.scrollHeight - window.innerHeight - jquery__WEBPACK_IMPORTED_MODULE_4___default()(window).scrollTop() < 50) {
            clearTimeout(this.timeoutLoad);
            this.timeoutLoad = setTimeout(() => {
                this.scrollEventActive = false;
                this.range.start += this.countShowInPage;
                this.refreshPromo(false);
            }, 1000);
        }
    }
    refreshPromo(reinit = true) {
        if (reinit) {
            this.range.start = 0;
        }
        let options = {
            range: this.range
        };
        if (this.search !== '') {
            options['search'] = this.search;
        }
        if (!this.isEmpty(this.filters)) {
            options['filters'] = this.filters;
        }
        if (!this.isEmpty(this.sort)) {
            options['sort'] = this.sort;
        }
        this.promoService.getlist(options)
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
            this.refreshPromo();
        }, 1000);
    }
    isEmpty(arg) {
        for (let item in arg) {
            return false;
        }
        return true;
    }
    openPromoDetails(content, promo) {
        if (!promo) {
            this.selectedPromo = {
                code: null,
                type: null,
                amount: null,
                active: true
            };
        }
        else {
            this.selectedPromo = promo;
        }
        this.modalService.open(content);
    }
    savePromo() {
        let sendAccess = true;
        if (!this.selectedPromo.type || (this.selectedPromo.type == 'SUM' && !this.selectedPromo.amount) || (this.selectedPromo.type == 'SUM_EXPERT' && !this.selectedPromo.amount)) {
            sendAccess = false;
            this.notif.showOne('Введите сумму', 'warning');
        }
        if (sendAccess) {
            if (this.selectedPromo.id) {
                this.promoService.update(this.selectedPromo.id, { type: this.selectedPromo.type, amount: this.selectedPromo.amount, active: this.selectedPromo.active })
                    .then(upData => {
                    this.refreshPromo(true);
                    this.modalService.dismissAll();
                });
            }
            else {
                this.promoService.create({ type: this.selectedPromo.type, amount: this.selectedPromo.amount, active: this.selectedPromo.active })
                    .then(cData => {
                    this.refreshPromo(true);
                    this.modalService.dismissAll();
                });
            }
        }
    }
    deleteConfirm(content, promo) {
        this.deletePromo = promo;
        this.modalService.open(content);
    }
    deletePromoConfirm() {
        this.promoService.delete(this.deletePromo.id)
            .then(upData => {
            this.refreshPromo(true);
            this.modalService.dismissAll();
        });
    }
    copyPromo() {
    }
};
PromoListComponent.ctorParameters = () => [
    { type: _shared__WEBPACK_IMPORTED_MODULE_2__["PromoService"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"] },
    { type: _shared__WEBPACK_IMPORTED_MODULE_2__["NotificationService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('window:scroll', ['$event']),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
], PromoListComponent.prototype, "onScrollEvent", null);
PromoListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-promo-list',
        template: __webpack_require__(/*! raw-loader!./promo-list.component.html */ "./node_modules/raw-loader/index.js!./src/app/authorized/promo/promo-list/promo-list.component.html"),
        styles: [__webpack_require__(/*! ./promo-list.component.scss */ "./src/app/authorized/promo/promo-list/promo-list.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shared__WEBPACK_IMPORTED_MODULE_2__["PromoService"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"],
        _shared__WEBPACK_IMPORTED_MODULE_2__["NotificationService"]])
], PromoListComponent);



/***/ }),

/***/ "./src/app/authorized/promo/promo-routing.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/authorized/promo/promo-routing.module.ts ***!
  \**********************************************************/
/*! exports provided: PromoRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromoRoutingModule", function() { return PromoRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _promo_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./promo.component */ "./src/app/authorized/promo/promo.component.ts");
/* harmony import */ var _promo_list_promo_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./promo-list/promo-list.component */ "./src/app/authorized/promo/promo-list/promo-list.component.ts");





const routes = [
    {
        path: '',
        component: _promo_component__WEBPACK_IMPORTED_MODULE_3__["PromoComponent"],
        children: [
            { path: '', component: _promo_list_promo_list_component__WEBPACK_IMPORTED_MODULE_4__["PromoListComponent"] }
        ]
    }
];
let PromoRoutingModule = class PromoRoutingModule {
};
PromoRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], PromoRoutingModule);



/***/ }),

/***/ "./src/app/authorized/promo/promo.component.scss":
/*!*******************************************************!*\
  !*** ./src/app/authorized/promo/promo.component.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGhvcml6ZWQvcHJvbW8vcHJvbW8uY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/authorized/promo/promo.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/authorized/promo/promo.component.ts ***!
  \*****************************************************/
/*! exports provided: PromoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromoComponent", function() { return PromoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _router_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../router.animations */ "./src/app/router.animations.ts");



let PromoComponent = class PromoComponent {
    constructor() { }
    ngOnInit() {
    }
};
PromoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-promo',
        template: __webpack_require__(/*! raw-loader!./promo.component.html */ "./node_modules/raw-loader/index.js!./src/app/authorized/promo/promo.component.html"),
        animations: [Object(_router_animations__WEBPACK_IMPORTED_MODULE_2__["routerTransition"])()],
        styles: [__webpack_require__(/*! ./promo.component.scss */ "./src/app/authorized/promo/promo.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], PromoComponent);



/***/ }),

/***/ "./src/app/authorized/promo/promo.module.ts":
/*!**************************************************!*\
  !*** ./src/app/authorized/promo/promo.module.ts ***!
  \**************************************************/
/*! exports provided: PromoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromoModule", function() { return PromoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _promo_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./promo-routing.module */ "./src/app/authorized/promo/promo-routing.module.ts");
/* harmony import */ var _promo_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./promo.component */ "./src/app/authorized/promo/promo.component.ts");
/* harmony import */ var _promo_list_promo_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./promo-list/promo-list.component */ "./src/app/authorized/promo/promo-list/promo-list.component.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var ngx_clipboard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-clipboard */ "./node_modules/ngx-clipboard/fesm2015/ngx-clipboard.js");










let PromoModule = class PromoModule {
};
PromoModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _promo_routing_module__WEBPACK_IMPORTED_MODULE_4__["PromoRoutingModule"],
            _shared__WEBPACK_IMPORTED_MODULE_7__["PageHeaderModule"],
            _shared__WEBPACK_IMPORTED_MODULE_7__["PipesModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbTooltipModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbModule"],
            _shared__WEBPACK_IMPORTED_MODULE_7__["AutocompleteModule"],
            _shared__WEBPACK_IMPORTED_MODULE_7__["LocationModule"],
            ngx_clipboard__WEBPACK_IMPORTED_MODULE_9__["ClipboardModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbTooltipModule"]
        ],
        declarations: [
            _promo_component__WEBPACK_IMPORTED_MODULE_5__["PromoComponent"],
            _promo_list_promo_list_component__WEBPACK_IMPORTED_MODULE_6__["PromoListComponent"]
        ]
    })
], PromoModule);



/***/ })

}]);
//# sourceMappingURL=promo-promo-module.js.map