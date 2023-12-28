(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["customers-customers-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/authorized/customers/customers-info/customers-info.component.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/authorized/customers/customers-info/customers-info.component.html ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"w-100 mb-3 page-block\" *ngIf=\"customer\">\r\n    <div class=\"col-12 col-sm-6 pt-3 pb-3\">\r\n        <div class=\"row\">\r\n            <div class=\"col-6 d-inline-flex align-items-center\">Имя</div>\r\n            <div class=\"col-6\">{{customer.name}}</div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-6 d-inline-flex align-items-center\">Телефон</div>\r\n            <div class=\"col-6\">{{customer.phone}}</div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-6 d-inline-flex align-items-center\">Баланс</div>\r\n            <div class=\"col-6\">{{customer.balance['$numberDecimal']}}</div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-6 d-inline-flex align-items-center\">Бонус баланс</div>\r\n            <div class=\"col-6\">{{customer.bonus_balance['$numberDecimal']}}</div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-6 d-inline-flex align-items-center\">Статус</div>\r\n            <div class=\"col-6\">\r\n                <select class=\"form-control\" [(ngModel)]=\"customer.banned\">\r\n                    <option [value]=\"false\">Активен</option>\r\n                    <option [value]=\"true\">Заблокирован</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-12\">\r\n                <button type=\"button\" class=\"btn btn-secondary mr-2\" (click)=\"saveCustomer()\">Сохранить</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-12 col-sm-6 d-inline-flex align-items-center justify-content-center pt-3 pb-3\">\r\n\r\n    </div>\r\n</div>\r\n\r\n<div class=\"w-100 pl-2 pr-2 pt-2 pb-2 mb-3 page-block\">\r\n    <div class=\"row\">\r\n        <div class=\"col-12\">\r\n            <ngb-tabset>\r\n                <ngb-tab>\r\n                    <ng-template ngbTabTitle>Финансовые операции админа</ng-template>\r\n                    <ng-template ngbTabContent>\r\n                        <div class=\"row mt-1 mb-3\">\r\n                            <div class=\"col-3 pl-4 pr-4\">Дата</div>\r\n                            <div class=\"col-2 pl-4 pr-4\">Сумма</div>\r\n                            <div class=\"col-2 pl-4 pr-4\">Оператор</div>\r\n                            <div class=\"col-2 pl-4 pr-4\">Баланс после</div>\r\n                            <div class=\"col-3 pl-4 pr-4\">Назначение</div>\r\n                        </div>\r\n                        <div class=\"row\" *ngFor=\"let item of financialAdminHistory\">\r\n                            <div class=\"col-3 pl-4 pr-4\">{{item.date}}</div>\r\n                            <div class=\"col-2 pl-4 pr-4\" [ngClass]=\"{'red': item.summ < 0, 'green': item.summ > 0}\">{{item.summ}}</div>\r\n                            <div class=\"col-2 pl-4 pr-4\">{{item.performer}}</div>\r\n                            <div class=\"col-2 pl-4 pr-4\">{{item.after_balance}}</div>\r\n                            <div class=\"col-3 pl-4 pr-4\">{{item.info}}</div>\r\n                        </div>\r\n                        <div class=\"row mt-3\" *ngIf=\"fhadminloadMore\">\r\n                            <div class=\"col-12 d-flex justify-content-center\">\r\n                                <button type=\"button\" class=\"btn btn-secondary ml-2\" (click)=\"loadMoreFinancialAdminHistory()\">Загрузить еще</button>\r\n                                <button type=\"button\" class=\"btn btn-secondary ml-2\" (click)=\"openFinancialForm(financialForm)\">Добавить</button>\r\n                            </div>\r\n                        </div>\r\n                    </ng-template>\r\n                </ngb-tab>\r\n                <ngb-tab>\r\n                    <ng-template ngbTabTitle>Заказы</ng-template>\r\n                    <ng-template ngbTabContent>\r\n                        <div class=\"row mt-1 mb-3\">\r\n                            <div class=\"col-4 pl-4 pr-4\">ID</div>\r\n                            <div class=\"col-4 pl-4 pr-4\">Дата</div>\r\n                            <div class=\"col-4 pl-4 pr-4\">Статус</div>\r\n                        </div>\r\n                        <div class=\"row\" *ngFor=\"let item of orderHistory\">\r\n                            <div class=\"col-4 pl-4 pr-4\">{{item.id}}</div>\r\n                            <div class=\"col-4 pl-4 pr-4\">{{item.createdAt}}</div>\r\n                            <div class=\"col-4 pl-4 pr-4\">{{getOrderStatus(item.status)}}</div>\r\n                        </div>\r\n                        <div class=\"row\" *ngIf=\"ohloadMore\">\r\n                            <div class=\"col-12 d-flex justify-content-center\">\r\n                                <button type=\"button\" class=\"btn btn-secondary ml-2\" (click)=\"loadMoreOrderHistory()\">Загрузить еще</button>\r\n                            </div>\r\n                        </div>\r\n                    </ng-template>\r\n                </ngb-tab>\r\n                <ngb-tab>\r\n                    <ng-template ngbTabTitle>Реферальные начислении</ng-template>\r\n                    <ng-template ngbTabContent>\r\n                        <div class=\"row mt-1 mb-3\">\r\n                            <div class=\"col-4 pl-4 pr-4\">ID заказа</div>\r\n                            <div class=\"col-4 pl-4 pr-4\">Дата</div>\r\n                            <div class=\"col-4 pl-4 pr-4\">Сумма</div>\r\n                        </div>\r\n                        <div class=\"row\" *ngFor=\"let item of referralHistory\">\r\n                            <div class=\"col-4 pl-4 pr-4\">{{item.order_id}}</div>\r\n                            <div class=\"col-4 pl-4 pr-4\">{{item.date}}</div>\r\n                            <div class=\"col-4 pl-4 pr-4\">{{item.summ}}</div>\r\n                        </div>\r\n                        <div class=\"row\" *ngIf=\"rhloadMore\">\r\n                            <div class=\"col-12 d-flex justify-content-center\">\r\n                                <span class=\"c-pointer\" (click)=\"loadMoreReferralHistory()\">Загрузить еще</span>\r\n                            </div>\r\n                        </div>\r\n                    </ng-template>\r\n                </ngb-tab>\r\n                <ngb-tab>\r\n                    <ng-template ngbTabTitle>Основной баланс</ng-template>\r\n                    <ng-template ngbTabContent>\r\n                        <div class=\"row mt-1 mb-3\">\r\n                            <div class=\"col-4 pl-4 pr-4\">Дата</div>\r\n                            <div class=\"col-4 pl-4 pr-4\">Сумма</div>\r\n                            <div class=\"col-4 pl-4 pr-4\">Информация</div>\r\n                        </div>\r\n                        <div class=\"row\" *ngFor=\"let item of financialBalanceHistory\">\r\n                            <div class=\"col-4 pl-4 pr-4\">{{item.date}}</div>\r\n                            <div class=\"col-4 pl-4 pr-4\" [ngClass]=\"{'red': item.summ < 0, 'green': item.summ > 0}\">{{item.summ}}</div>\r\n                            <div class=\"col-4 pl-4 pr-4\">{{getFinancialInfo(item)}}</div>\r\n                        </div>\r\n                        <div class=\"row\" *ngIf=\"ohloadMore\">\r\n                            <div class=\"col-12 d-flex justify-content-center\">\r\n                                <span class=\"c-pointer\" (click)=\"loadMoreFinancialBalanceHistory()\">Загрузить еще</span>\r\n                            </div>\r\n                        </div>\r\n                    </ng-template>\r\n                </ngb-tab>\r\n                <ngb-tab>\r\n                    <ng-template ngbTabTitle>Бонус баланс</ng-template>\r\n                    <ng-template ngbTabContent>\r\n                        <div class=\"row mt-1 mb-3\">\r\n                            <div class=\"col-4 pl-4 pr-4\">Дата</div>\r\n                            <div class=\"col-4 pl-4 pr-4\">Сумма</div>\r\n                            <div class=\"col-4 pl-4 pr-4\">Информация</div>\r\n                        </div>\r\n                        <div class=\"row\" *ngFor=\"let item of financialBonusHistory\">\r\n                            <div class=\"col-4 pl-4 pr-4\">{{item.date}}</div>\r\n                            <div class=\"col-4 pl-4 pr-4\" [ngClass]=\"{'red': item.summ < 0, 'green': item.summ > 0}\">{{item.summ}}</div>\r\n                            <div class=\"col-4 pl-4 pr-4\">{{getFinancialInfo(item)}}</div>\r\n                        </div>\r\n                        <div class=\"row\" *ngIf=\"ohloadMore\">\r\n                            <div class=\"col-12 d-flex justify-content-center\">\r\n                                <span class=\"c-pointer\" (click)=\"loadMoreFinancialBonusHistory()\">Загрузить еще</span>\r\n                            </div>\r\n                        </div>\r\n                    </ng-template>\r\n                </ngb-tab>\r\n                <ngb-tab>\r\n                    <ng-template ngbTabTitle>Начислении по безналу</ng-template>\r\n                    <ng-template ngbTabContent>\r\n                        <div class=\"row mt-1 mb-3\">\r\n                            <div class=\"col-4 pl-4 pr-4\">Дата</div>\r\n                            <div class=\"col-4 pl-4 pr-4\">Сумма</div>\r\n                            <div class=\"col-4 pl-4 pr-4\">Информация</div>\r\n                        </div>\r\n                        <div class=\"row\" *ngFor=\"let item of financialCardHistory\">\r\n                            <div class=\"col-4 pl-4 pr-4\">{{item.date}}</div>\r\n                            <div class=\"col-4 pl-4 pr-4\" [ngClass]=\"{'red': item.summ < 0, 'green': item.summ > 0}\">{{item.summ}}</div>\r\n                            <div class=\"col-4 pl-4 pr-4\">{{getFinancialInfo(item)}}</div>\r\n                        </div>\r\n                        <div class=\"row\" *ngIf=\"ohloadMore\">\r\n                            <div class=\"col-12 d-flex justify-content-center\">\r\n                                <span class=\"c-pointer\" (click)=\"loadMoreFinancialCardHistory()\">Загрузить еще</span>\r\n                            </div>\r\n                        </div>\r\n                    </ng-template>\r\n                </ngb-tab>\r\n            </ngb-tabset>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<ng-template #financialForm let-c=\"close\" let-d=\"dismiss\">\r\n    <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Новая финансовая операция</h4>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d()\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <div class=\"d-flex mb-2\">\r\n            <span class=\"w-50\">Баланс:</span>\r\n            <select [(ngModel)]=\"financialOperation.balance_type\" class=\"form-control w50\">\r\n                <option [value]=\"'BALANCE'\">Основной баланс</option>\r\n                <option [value]=\"'BONUS'\">Бонус баланс</option>\r\n            </select>\r\n        </div>\r\n        <div class=\"d-flex mb-2\">\r\n            <span class=\"w-50\">Сумма:</span>\r\n            <input type=\"number\" [(ngModel)]=\"financialOperation.summ\" class=\"form-control w50\">\r\n        </div>\r\n        <div class=\"d-flex mb-2\">\r\n            <span class=\"w-50\">Коментарий:</span>\r\n            <input type=\"text\" [(ngModel)]=\"financialOperation.info\" class=\"form-control w50\">\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <div class=\"form-error\" *ngIf=\"financialOperationError\">{{financialOperationError}}</div>\r\n        <button type=\"button\" class=\"btn btn-secondary mr-2\" (click)=\"saveFinancialOperation()\">Сохранить</button>\r\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"c()\">Закрыть</button>\r\n    </div>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/authorized/customers/customers-list/customers-list.component.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/authorized/customers/customers-list/customers-list.component.html ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"w-100 mb-3 page-block\">\r\n    <div class=\"col-12 col-sm-4 d-inline-flex align-items-center justify-content-center pt-3 pb-3\">\r\n        <input type=\"text\" class=\"form-control\" [(ngModel)]=\"search\" (keyup)=\"searchRefresh()\" placeholder=\"Поиск...\">\r\n    </div>\r\n    <div class=\"col-12 col-sm-4 d-inline-flex align-items-center justify-content-center pt-3 pb-3\"></div>\r\n    <div class=\"col-12 col-sm-4 d-inline-flex align-items-center justify-content-end pt-3 pb-3\"></div>\r\n</div>\r\n\r\n\r\n<div class=\"card mb-3\">\r\n    <div class=\"card-header\">\r\n        <div>\r\n            Справочник клиентов\r\n        </div>\r\n    </div>\r\n    <div class=\"card-body table-responsive\">\r\n        <table class=\"table table-hover table-striped text-center\">\r\n            <thead>\r\n            <tr>\r\n                <th>\r\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Имя</div>\r\n                </th>\r\n                <th>\r\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Телефон</div>\r\n                </th>\r\n                <th>\r\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Реферал</div>\r\n                </th>\r\n                <th>\r\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Баланс</div>\r\n                </th>\r\n                <th>\r\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Бонус баланс</div>\r\n                </th>\r\n                <th></th>\r\n            </tr>\r\n            </thead>\r\n            <tbody>\r\n            <tr *ngFor=\"let item of list\">\r\n                <td>{{item.name}}</td>\r\n                <td>{{item.phone}}</td>\r\n                <td>{{item.referral_id}}</td>\r\n                <td>{{item.balance['$numberDecimal']}}</td>\r\n                <td>{{item.bonus_balance['$numberDecimal']}}</td>\r\n                <td>\r\n                    <a [routerLink]=\"'customers/info/' + item.id | link\"  placement=\"left\" ngbTooltip=\"Подробнее\">\r\n                        <i class=\"fa fa-info-circle\"></i>\r\n                    </a>\r\n                </td>\r\n            </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n    <app-my-pagination *ngIf=\"countCustomers\" [countItems]=\"countCustomers\" [showInPages]=\"countShowInPage\" (changePage)=\"pageChanged($event)\"></app-my-pagination>\r\n</div>\r\n\r\n<ng-template #content let-c=\"close\" let-d=\"dismiss\">\r\n    <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Клиент {{selectedCustomer.name}}</h4>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d()\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <div class=\"d-flex flex-column\">\r\n            <div>Имя: {{selectedCustomer.name}}</div>\r\n            <div>Телефон: {{selectedCustomer.phone}}</div>\r\n            <div>Баланс: {{selectedCustomer.phone}}</div>\r\n            <div>Бонус баланс: {{selectedCustomer.phone}}</div>\r\n            <div>Реферал: {{selectedCustomer.referral_id}}</div>\r\n            <div class=\"d-flex\">\r\n                Статус:\r\n                <select [(ngModel)]=\"selectedCustomer.banned\">\r\n                    <option [value]=\"false\">Активен</option>\r\n                    <option [value]=\"true\">Заблокирован</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-secondary mr-2\" (click)=\"saveCustomer()\">Сохранить</button>\r\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"c()\">Закрыть</button>\r\n    </div>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/authorized/customers/customers.component.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/authorized/customers/customers.component.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "./src/app/authorized/customers/customers-info/customers-info.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/authorized/customers/customers-info/customers-info.component.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".action-icon {\n  cursor: pointer;\n  margin: 10px;\n}\n\n.switch-btn {\n  margin-right: 10px;\n}\n\n.controls i {\n  margin: 0 5px;\n  cursor: pointer;\n}\n\n.controls i:before {\n  font-size: 12px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aG9yaXplZC9jdXN0b21lcnMvY3VzdG9tZXJzLWluZm8vRTpcXHByb2plY3RzXFxYaXRDbHViXFxkam9iLWVuZHBvaW50XFxhZG1pbi9zcmNcXGFwcFxcYXV0aG9yaXplZFxcY3VzdG9tZXJzXFxjdXN0b21lcnMtaW5mb1xcY3VzdG9tZXJzLWluZm8uY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2F1dGhvcml6ZWQvY3VzdG9tZXJzL2N1c3RvbWVycy1pbmZvL2N1c3RvbWVycy1pbmZvLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLFlBQUE7QUNDSjs7QURDQTtFQUNJLGtCQUFBO0FDRUo7O0FEQ0k7RUFDSSxhQUFBO0VBQ0EsZUFBQTtBQ0VSOztBRERRO0VBQ0ksZUFBQTtBQ0daIiwiZmlsZSI6InNyYy9hcHAvYXV0aG9yaXplZC9jdXN0b21lcnMvY3VzdG9tZXJzLWluZm8vY3VzdG9tZXJzLWluZm8uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYWN0aW9uLWljb257XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBtYXJnaW46IDEwcHg7XHJcbn1cclxuLnN3aXRjaC1idG57XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbn1cclxuLmNvbnRyb2xze1xyXG4gICAgaXtcclxuICAgICAgICBtYXJnaW46IDAgNXB4O1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICAmOmJlZm9yZXtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIuYWN0aW9uLWljb24ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIG1hcmdpbjogMTBweDtcbn1cblxuLnN3aXRjaC1idG4ge1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG5cbi5jb250cm9scyBpIHtcbiAgbWFyZ2luOiAwIDVweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmNvbnRyb2xzIGk6YmVmb3JlIHtcbiAgZm9udC1zaXplOiAxMnB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/authorized/customers/customers-info/customers-info.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/authorized/customers/customers-info/customers-info.component.ts ***!
  \*********************************************************************************/
/*! exports provided: CustomersInfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomersInfoComponent", function() { return CustomersInfoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");





let CustomersInfoComponent = class CustomersInfoComponent {
    constructor(route, router, customerService, notif, modalService) {
        this.route = route;
        this.router = router;
        this.customerService = customerService;
        this.notif = notif;
        this.modalService = modalService;
        this.financialOperation = null;
        this.financialOperationError = null;
        this.orderHistoryParams = {
            customer_id: null,
            start: 0,
            limit: 20
        };
        this.referralHistoryParams = {
            customer_id: null,
            start: 0,
            limit: 20
        };
        this.financialBalanceHistoryParams = {
            customer_id: null,
            type: 'BALANCE',
            start: 0,
            limit: 20
        };
        this.financialBonusHistoryParams = {
            customer_id: null,
            type: 'BONUS',
            start: 0,
            limit: 20
        };
        this.financialCardHistoryParams = {
            customer_id: null,
            type: 'PAYMENT',
            start: 0,
            limit: 20
        };
        this.financialAdminHistoryParams = {
            customer_id: null,
            type: 'ADMIN',
            start: 0,
            limit: 20
        };
        this.ohloadMore = true;
        this.rhloadMore = true;
        this.fhbalanceloadMore = true;
        this.fhbonusloadMore = true;
        this.fhcardloadMore = true;
        this.fhadminloadMore = true;
    }
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.customerService.getOne(params['id'])
                .then(data => {
                this.customer = data;
                this.orderHistoryParams.customer_id = this.customer.id;
                this.referralHistoryParams.customer_id = this.customer.id;
                this.financialBalanceHistoryParams.customer_id = this.customer.id;
                this.financialBonusHistoryParams.customer_id = this.customer.id;
                this.financialCardHistoryParams.customer_id = this.customer.id;
                this.financialAdminHistoryParams.customer_id = this.customer.id;
                this.customerService.getOrderHistory(this.orderHistoryParams)
                    .then((ohData) => {
                    this.orderHistory = ohData;
                    if (!ohData.length) {
                        this.ohloadMore = false;
                    }
                });
                this.customerService.getReferralHistory(this.referralHistoryParams)
                    .then((rhData) => {
                    this.referralHistory = rhData;
                    if (!rhData.length) {
                        this.rhloadMore = false;
                    }
                });
                this.customerService.getFinancialHistory(this.financialBalanceHistoryParams)
                    .then((fhData) => {
                    this.financialBalanceHistory = fhData;
                    if (!fhData.length) {
                        this.fhbalanceloadMore = false;
                    }
                });
                this.customerService.getFinancialHistory(this.financialBonusHistoryParams)
                    .then((fhData) => {
                    this.financialBonusHistory = fhData;
                    if (!fhData.length) {
                        this.fhbonusloadMore = false;
                    }
                });
                this.customerService.getFinancialHistory(this.financialCardHistoryParams)
                    .then((fhData) => {
                    this.financialCardHistory = fhData;
                    if (!fhData.length) {
                        this.fhcardloadMore = false;
                    }
                });
                this.customerService.getFinancialHistory(this.financialAdminHistoryParams)
                    .then((fhData) => {
                    this.financialAdminHistory = fhData;
                    if (!fhData.length) {
                        this.fhadminloadMore = false;
                    }
                });
            });
        });
    }
    loadMoreOrderHistory() {
        this.orderHistoryParams.start += this.orderHistoryParams.limit;
        this.customerService.getOrderHistory(this.orderHistoryParams)
            .then((ohData) => {
            this.orderHistory = this.orderHistory.concat(ohData);
            if (!ohData.length) {
                this.ohloadMore = false;
            }
        });
    }
    loadMoreReferralHistory() {
        this.referralHistoryParams.start += this.referralHistoryParams.limit;
        this.customerService.getReferralHistory(this.referralHistoryParams)
            .then((rhData) => {
            this.referralHistory = this.referralHistory.concat(rhData);
            if (!rhData.length) {
                this.rhloadMore = false;
            }
        });
    }
    loadMoreFinancialBalanceHistory() {
        this.financialBalanceHistoryParams.start += this.financialBalanceHistoryParams.limit;
        this.customerService.getFinancialHistory(this.financialBalanceHistoryParams)
            .then((fhData) => {
            this.financialBalanceHistory = this.financialBalanceHistory.join(fhData);
            if (!fhData.length) {
                this.fhbalanceloadMore = false;
            }
        });
    }
    loadMoreFinancialBonusHistory() {
        this.financialBonusHistoryParams.start += this.financialBonusHistoryParams.limit;
        this.customerService.getFinancialHistory(this.financialBonusHistoryParams)
            .then((fhData) => {
            this.financialBonusHistory = this.financialBonusHistory.join(fhData);
            if (!fhData.length) {
                this.fhbonusloadMore = false;
            }
        });
    }
    loadMoreFinancialCardHistory() {
        this.financialCardHistoryParams.start += this.financialCardHistoryParams.limit;
        this.customerService.getFinancialHistory(this.financialCardHistoryParams)
            .then((fhData) => {
            this.financialCardHistory = this.financialCardHistory.join(fhData);
            if (!fhData.length) {
                this.fhcardloadMore = false;
            }
        });
    }
    getOrderStatus(status) {
        if (status < 100)
            return "В процессе";
        if (status === 100)
            return "Успешно завершен";
        if (status > 100)
            return "Отменен";
        return "-";
    }
    getFinancialInfo(item) {
        let res_str = '';
        if (item.type === 'PAYMENT' || item.type === 'REFILL')
            res_str = 'Пополнения счета';
        if (item.type === 'REFERRAL')
            res_str = 'Перевод с накопительного баланса';
        if (item.type === 'ORDER') {
            if (item.summ > 0) {
                res_str = 'Вознаграждения за выполненный заказ №' + item.order_id;
            }
            else {
                res_str = 'Знятии коммиссии за выполненный заказ №' + item.order_id;
            }
        }
        if (item.type === 'TRANSFER')
            res_str = 'Заказ №' + item.order_id + ' отправлено на кошелек №' + item.info;
        if (item.type === 'PROMO')
            res_str = 'Активация промо кода "' + item.info + '"';
        return res_str;
    }
    saveCustomer() {
        this.customerService.update(this.customer.id, { banned: this.customer.banned })
            .then(upData => {
            this.notif.showOne('Сохранено!');
        });
    }
    loadMoreFinancialAdminHistory(refresh = false) {
        if (!refresh)
            this.financialAdminHistoryParams.start += this.financialAdminHistoryParams.limit;
        else
            this.financialAdminHistoryParams.start = 0;
        this.customerService.getFinancialHistory(this.financialAdminHistoryParams)
            .then((fhData) => {
            this.financialAdminHistory = this.financialAdminHistory.join(fhData);
            if (!fhData.length) {
                this.fhadminloadMore = false;
            }
        });
    }
    openFinancialForm(content) {
        this.financialOperation = {
            executor_id: this.customer.id,
            balance_type: null,
            summ: null,
            info: ''
        };
        this.modalService.open(content);
    }
    saveFinancialOperation() {
        if (!this.financialOperation.balance_type || !this.financialOperation.summ || !this.financialOperation.info) {
            this.financialOperationError = 'Заполните пожалуйста все поля';
            setTimeout(() => {
                this.financialOperationError = null;
            }, 3000);
            return;
        }
        else {
            this.customerService.addFinancialOperation({ customer_id: this.customer.id, balance_type: this.financialOperation.balance_type, summ: this.financialOperation.summ, info: this.financialOperation.info })
                .then(upData => {
                this.notif.showOne('Сохранено!');
                this.loadMoreFinancialAdminHistory(true);
                this.modalService.dismissAll();
                this.customerService.getOne(this.customer.id)
                    .then(data => {
                    this.customer = data;
                });
            });
        }
    }
};
CustomersInfoComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _shared__WEBPACK_IMPORTED_MODULE_2__["CustomerService"] },
    { type: _shared__WEBPACK_IMPORTED_MODULE_2__["NotificationService"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"] }
];
CustomersInfoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-customers-info',
        template: __webpack_require__(/*! raw-loader!./customers-info.component.html */ "./node_modules/raw-loader/index.js!./src/app/authorized/customers/customers-info/customers-info.component.html"),
        styles: [__webpack_require__(/*! ./customers-info.component.scss */ "./src/app/authorized/customers/customers-info/customers-info.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _shared__WEBPACK_IMPORTED_MODULE_2__["CustomerService"],
        _shared__WEBPACK_IMPORTED_MODULE_2__["NotificationService"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"]])
], CustomersInfoComponent);



/***/ }),

/***/ "./src/app/authorized/customers/customers-list/customers-list.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/authorized/customers/customers-list/customers-list.component.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".action-icon {\n  cursor: pointer;\n  margin: 10px;\n}\n\n.switch-btn {\n  margin-right: 10px;\n}\n\n.controls i {\n  margin: 0 5px;\n  cursor: pointer;\n}\n\n.controls i:before {\n  font-size: 12px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aG9yaXplZC9jdXN0b21lcnMvY3VzdG9tZXJzLWxpc3QvRTpcXHByb2plY3RzXFxYaXRDbHViXFxkam9iLWVuZHBvaW50XFxhZG1pbi9zcmNcXGFwcFxcYXV0aG9yaXplZFxcY3VzdG9tZXJzXFxjdXN0b21lcnMtbGlzdFxcY3VzdG9tZXJzLWxpc3QuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2F1dGhvcml6ZWQvY3VzdG9tZXJzL2N1c3RvbWVycy1saXN0L2N1c3RvbWVycy1saXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLFlBQUE7QUNDSjs7QURDQTtFQUNJLGtCQUFBO0FDRUo7O0FEQ0k7RUFDSSxhQUFBO0VBQ0EsZUFBQTtBQ0VSOztBRERRO0VBQ0ksZUFBQTtBQ0daIiwiZmlsZSI6InNyYy9hcHAvYXV0aG9yaXplZC9jdXN0b21lcnMvY3VzdG9tZXJzLWxpc3QvY3VzdG9tZXJzLWxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYWN0aW9uLWljb257XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBtYXJnaW46IDEwcHg7XHJcbn1cclxuLnN3aXRjaC1idG57XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbn1cclxuLmNvbnRyb2xze1xyXG4gICAgaXtcclxuICAgICAgICBtYXJnaW46IDAgNXB4O1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICAmOmJlZm9yZXtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIuYWN0aW9uLWljb24ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIG1hcmdpbjogMTBweDtcbn1cblxuLnN3aXRjaC1idG4ge1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG5cbi5jb250cm9scyBpIHtcbiAgbWFyZ2luOiAwIDVweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmNvbnRyb2xzIGk6YmVmb3JlIHtcbiAgZm9udC1zaXplOiAxMnB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/authorized/customers/customers-list/customers-list.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/authorized/customers/customers-list/customers-list.component.ts ***!
  \*********************************************************************************/
/*! exports provided: CustomersListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomersListComponent", function() { return CustomersListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");




let CustomersListComponent = class CustomersListComponent {
    constructor(customerService, modalService) {
        this.customerService = customerService;
        this.modalService = modalService;
        this.countShowInPage = 20;
        this.filters = {};
        this.sort = {};
        this.search = '';
        this.range = {
            start: 0,
            limit: this.countShowInPage
        };
        this.list = [];
    }
    ngOnInit() {
        this.refreshCustomers();
    }
    refreshCustomers(reinit = true) {
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
        this.customerService.getlist(options)
            .then((list) => {
            if (reinit) {
                this.countCustomers = 0;
                this.customerService.getCount(options)
                    .then(countData => {
                    this.countCustomers = countData;
                });
            }
            this.list = list;
        });
    }
    searchRefresh() {
        clearTimeout(this.timeoutSearch);
        this.timeoutSearch = setTimeout(() => {
            this.refreshCustomers();
        }, 1000);
    }
    isEmpty(arg) {
        for (let item in arg) {
            return false;
        }
        return true;
    }
    openCustomerDetails(content, customer) {
        this.selectedCustomer = customer;
        this.modalService.open(content);
    }
    saveCustomer() {
        console.log('0001: ', this.selectedCustomer);
        this.customerService.update(this.selectedCustomer.id, { banned: this.selectedCustomer.banned })
            .then(upData => {
            this.modalService.dismissAll();
        });
    }
    pageChanged(event) {
        this.range.start = (event - 1) * this.countShowInPage;
        this.refreshCustomers(false);
    }
};
CustomersListComponent.ctorParameters = () => [
    { type: _shared__WEBPACK_IMPORTED_MODULE_2__["CustomerService"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"] }
];
CustomersListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-customers-list',
        template: __webpack_require__(/*! raw-loader!./customers-list.component.html */ "./node_modules/raw-loader/index.js!./src/app/authorized/customers/customers-list/customers-list.component.html"),
        styles: [__webpack_require__(/*! ./customers-list.component.scss */ "./src/app/authorized/customers/customers-list/customers-list.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shared__WEBPACK_IMPORTED_MODULE_2__["CustomerService"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"]])
], CustomersListComponent);



/***/ }),

/***/ "./src/app/authorized/customers/customers-routing.module.ts":
/*!******************************************************************!*\
  !*** ./src/app/authorized/customers/customers-routing.module.ts ***!
  \******************************************************************/
/*! exports provided: CustomersRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomersRoutingModule", function() { return CustomersRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _customers_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./customers.component */ "./src/app/authorized/customers/customers.component.ts");
/* harmony import */ var _customers_list_customers_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./customers-list/customers-list.component */ "./src/app/authorized/customers/customers-list/customers-list.component.ts");
/* harmony import */ var _customers_info_customers_info_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./customers-info/customers-info.component */ "./src/app/authorized/customers/customers-info/customers-info.component.ts");






const routes = [
    {
        path: '',
        component: _customers_component__WEBPACK_IMPORTED_MODULE_3__["CustomersComponent"],
        children: [
            { path: '', component: _customers_list_customers_list_component__WEBPACK_IMPORTED_MODULE_4__["CustomersListComponent"] },
            { path: 'info/:id', component: _customers_info_customers_info_component__WEBPACK_IMPORTED_MODULE_5__["CustomersInfoComponent"] }
        ]
    }
];
let CustomersRoutingModule = class CustomersRoutingModule {
};
CustomersRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], CustomersRoutingModule);



/***/ }),

/***/ "./src/app/authorized/customers/customers.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/authorized/customers/customers.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGhvcml6ZWQvY3VzdG9tZXJzL2N1c3RvbWVycy5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/authorized/customers/customers.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/authorized/customers/customers.component.ts ***!
  \*************************************************************/
/*! exports provided: CustomersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomersComponent", function() { return CustomersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _router_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../router.animations */ "./src/app/router.animations.ts");



let CustomersComponent = class CustomersComponent {
    constructor() { }
    ngOnInit() {
    }
};
CustomersComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-customers',
        template: __webpack_require__(/*! raw-loader!./customers.component.html */ "./node_modules/raw-loader/index.js!./src/app/authorized/customers/customers.component.html"),
        animations: [Object(_router_animations__WEBPACK_IMPORTED_MODULE_2__["routerTransition"])()],
        styles: [__webpack_require__(/*! ./customers.component.scss */ "./src/app/authorized/customers/customers.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], CustomersComponent);



/***/ }),

/***/ "./src/app/authorized/customers/customers.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/authorized/customers/customers.module.ts ***!
  \**********************************************************/
/*! exports provided: CustomersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomersModule", function() { return CustomersModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _customers_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./customers-routing.module */ "./src/app/authorized/customers/customers-routing.module.ts");
/* harmony import */ var _customers_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./customers.component */ "./src/app/authorized/customers/customers.component.ts");
/* harmony import */ var _customers_list_customers_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./customers-list/customers-list.component */ "./src/app/authorized/customers/customers-list/customers-list.component.ts");
/* harmony import */ var _customers_info_customers_info_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./customers-info/customers-info.component */ "./src/app/authorized/customers/customers-info/customers-info.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared */ "./src/app/shared/index.ts");











let CustomersModule = class CustomersModule {
};
CustomersModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _customers_routing_module__WEBPACK_IMPORTED_MODULE_4__["CustomersRoutingModule"],
            _shared__WEBPACK_IMPORTED_MODULE_9__["PageHeaderModule"],
            _shared__WEBPACK_IMPORTED_MODULE_9__["PipesModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbTooltipModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbModule"],
            _shared__WEBPACK_IMPORTED_MODULE_9__["AutocompleteModule"],
            _shared__WEBPACK_IMPORTED_MODULE_9__["LocationModule"],
            _shared__WEBPACK_IMPORTED_MODULE_9__["PaginationModule"]
        ],
        declarations: [
            _customers_component__WEBPACK_IMPORTED_MODULE_5__["CustomersComponent"],
            _customers_list_customers_list_component__WEBPACK_IMPORTED_MODULE_6__["CustomersListComponent"],
            _customers_info_customers_info_component__WEBPACK_IMPORTED_MODULE_7__["CustomersInfoComponent"]
        ]
    })
], CustomersModule);



/***/ }),

/***/ "./src/app/router.animations.ts":
/*!**************************************!*\
  !*** ./src/app/router.animations.ts ***!
  \**************************************/
/*! exports provided: routerTransition, noTransition, slideToRight, slideToLeft, slideToBottom, slideToTop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routerTransition", function() { return routerTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noTransition", function() { return noTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slideToRight", function() { return slideToRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slideToLeft", function() { return slideToLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slideToBottom", function() { return slideToBottom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slideToTop", function() { return slideToTop; });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm2015/animations.js");

function routerTransition() {
    return noTransition();
}
function noTransition() {
    return Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('routerTransition', []);
}
function slideToRight() {
    return Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('routerTransition', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({})),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('*', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({})),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])(':enter', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(-100%)' }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(0%)' }))
        ]),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])(':leave', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(0%)' }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(100%)' }))
        ])
    ]);
}
function slideToLeft() {
    return Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('routerTransition', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({})),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('*', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({})),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])(':enter', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(100%)' }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(0%)' }))
        ]),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])(':leave', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(0%)' }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateX(-100%)' }))
        ])
    ]);
}
function slideToBottom() {
    return Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('routerTransition', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({})),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('*', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({})),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])(':enter', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateY(-100%)' }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateY(0%)' }))
        ]),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])(':leave', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateY(0%)' }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateY(100%)' }))
        ])
    ]);
}
function slideToTop() {
    return Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('routerTransition', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({})),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('*', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({})),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])(':enter', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateY(100%)' }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateY(0%)' }))
        ]),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])(':leave', [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateY(0%)' }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])('0.5s ease-in-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ transform: 'translateY(-100%)' }))
        ])
    ]);
}


/***/ })

}]);
//# sourceMappingURL=customers-customers-module-es2015.js.map