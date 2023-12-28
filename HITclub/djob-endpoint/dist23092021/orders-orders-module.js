(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["orders-orders-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/authorized/orders/orders-info/orders-info.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/authorized/orders/orders-info/orders-info.component.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"w-100 pl-2 pr-2 mb-3 page-block\" *ngIf=\"order\">\n    <div class=\"row\">\n        <div class=\"col-12 col-sm-6 pt-3 pb-3\">\n            <div class=\"w-100 p-4\">\n                <div class=\"row item_info\">\n                    <div class=\"col-6 d-inline-flex align-items-center\">ID</div>\n                    <div class=\"col-6\">{{order.id}}</div>\n                </div>\n                <div class=\"row item_info\">\n                    <div class=\"col-6 d-inline-flex align-items-center\">Номер клиента:</div>\n                    <div class=\"col-6\">\n                        <a [routerLink]=\"'executors/info/' + order.executor.id | link\">{{order.executor.phone}}</a>\n                    </div>\n                </div>\n                <div class=\"row item_info\">\n                    <div class=\"col-6 d-inline-flex align-items-center\">Номер исполнителя:</div>\n                    <div class=\"col-6\">\n                        <a [routerLink]=\"'customers/info/' + order.customer.id | link\">{{order.customer.phone}}</a>\n                    </div>\n                </div>\n                <div class=\"row item_info\">\n                    <div class=\"col-6 d-inline-flex align-items-center\">Специальность</div>\n                    <div class=\"col-6\">{{order.specialty.name}}</div>\n                </div>\n                <div class=\"row item_info\">\n                    <div class=\"col-6 d-inline-flex align-items-center\">Статус</div>\n                    <div class=\"col-6\">{{getOrderStatus(order)}}</div>\n                </div>\n                <div class=\"row item_info\">\n                    <div class=\"col-6 d-inline-flex align-items-center\">Тип заказа</div>\n                    <div class=\"col-6\">\n                        <span *ngIf=\"order.for_now\">Срочный</span>\n                        <span *ngIf=\"!order.for_now\">Отложенный</span>\n                    </div>\n                </div>\n                <div class=\"row item_info\" *ngIf=\"!order.for_now\">\n                    <div class=\"col-6 d-inline-flex align-items-center\">Запланированное время</div>\n                    <div class=\"col-6\">{{order.scheduled_time}}</div>\n                </div>\n                <div class=\"row item_info\">\n                    <div  class=\"col-6 d-inline-flex align-items-center\">Место заказа</div>\n                    <div class=\"col-6\">\n                        <span *ngIf=\"order.departure == 'ANY'\">Не определено</span>\n                        <span *ngIf=\"order.departure == 'OFFICE'\">Офис</span>\n                        <span *ngIf=\"order.departure == 'ADDRESS'\">На выезд</span>\n                    </div>\n                </div>\n                <div class=\"row item_info\">\n                    <div  class=\"col-6 d-inline-flex align-items-center\">Адрес</div>\n                    <div class=\"col-6\">{{order.address.name}}</div>\n                </div>\n                <div class=\"row item_info\">\n                    <div  class=\"col-6 d-inline-flex align-items-center\">Создан</div>\n                    <div class=\"col-6\">{{order.createdAt}}</div>\n                </div>\n                <div class=\"row item_info\">\n                    <div  class=\"col-6 d-inline-flex align-items-center\">Сумма</div>\n                    <div class=\"col-6\">{{order.summ}}</div>\n                </div>\n                <div class=\"row item_info\">\n                    <div  class=\"col-6 d-inline-flex align-items-center\">Тип оплаты</div>\n                    <div class=\"col-6\">\n                        <span *ngIf=\"order.summ_type == 'HOURLY'\">Почасовая</span>\n                        <span *ngIf=\"order.summ_type == 'FIXED'\">Одноразовая</span>\n                    </div>\n                </div>\n                <div class=\"row item_info\">\n                    <div  class=\"col-6 d-inline-flex align-items-center\">Способ оплаты</div>\n                    <div class=\"col-6\">\n                        <span *ngIf=\"order.payment_type == 'CASH'\">Наличка</span>\n                        <span *ngIf=\"order.payment_type == 'BONUS'\">Бонусный щет</span>\n                        <span *ngIf=\"order.payment_type == 'CARD'\">Карточка</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-12 col-sm-6 pt-3 pb-3\">\n            <div class=\"w-100 p-4\">\n                <div class=\"row\">\n                    <div class=\"col-12 d-inline-flex align-items-center\">История заказа</div>\n                </div>\n                <div class=\"row\" *ngFor=\"let item of orderHistory\">\n                    <div class=\"col-12\">\n                        <span class=\"date mr-2\">{{item.date}}</span>\n                        <span>{{item.text}}</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/authorized/orders/orders-list/orders-list.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/authorized/orders/orders-list/orders-list.component.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"w-100 mb-3 page-block\">\n    <div class=\"row pt-3 pb-3\">\n        <div class=\"col-12\">\n            <div class=\"col-12 col-sm-6 d-inline-flex align-items-center justify-content-center\">\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"search_phone\" (keyup)=\"searchPhoneRefresh()\" placeholder=\"Поиск по номеру телефона...\">\n            </div>\n            <div class=\"col-12 col-sm-6 d-inline-flex align-items-center justify-content-center\">\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"search_id\" (keyup)=\"searchIdRefresh()\" placeholder=\"Поиск по ID...\">\n            </div>\n        </div>\n    </div>\n    <div class=\"row pb-3\">\n        <div class=\"col-12\">\n            <div class=\"col-12 col-sm-6 d-inline-flex align-items-center justify-content-center\">\n                <select [(ngModel)]=\"filters.status\" class=\"form-control\" (change)=\"refreshOrders(true)\">\n                    <option [value]=\"'all'\">Все</option>\n                    <option [value]=\"'in_progress'\">В процессе</option>\n                    <option [value]=\"'done'\"> Успешно завершеные</option>\n                    <option [value]=\"'cancelled'\">Отмененные</option>\n                </select>\n            </div>\n            <div class=\"col-12 col-sm-6 d-inline-flex align-items-center justify-content-center\">\n                <div class=\"row w-100\">\n                    <div class=\"col-6 d-flex align-items-center\">\n                        От: <app-date-time-picker [val]=\"filters.date_from\" (change)=\"changeDateFrom($event)\"></app-date-time-picker>\n                    </div>\n                    <div class=\"col-6 d-flex align-items-center\">\n                        До: <app-date-time-picker [val]=\"filters.date_to\" (change)=\"changeDateTo($event)\"></app-date-time-picker>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row pb-3\">\n        <div class=\"col-12\">\n            <div class=\"col-12 col-sm-6 d-inline-flex justify-content-around\">\n                <label>\n                    <div class=\"switch-btn\" [class.switch-on]=\"filters.types.indexOf(1) !== -1\" (click)=\"changeType(1)\"></div>\n                    Срочные\n                </label>\n                <label>\n                    <div class=\"switch-btn\" [class.switch-on]=\"filters.types.indexOf(0) !== -1\" (click)=\"changeType(0)\"></div>\n                    Отложенные\n                </label>\n            </div>\n            <div class=\"col-12 col-sm-6 d-inline-flex align-items-center justify-content-center\">\n\n            </div>\n        </div>\n    </div>\n\n</div>\n\n\n<div class=\"card mb-3\">\n    <div class=\"card-header d-flex justify-content-between\">\n        <div>\n            Заказы\n        </div>\n    </div>\n    <div class=\"card-body table-responsive\">\n        <table class=\"table table-hover table-striped text-center\">\n            <thead>\n            <tr>\n                <th>\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">ID</div>\n                </th>\n                <th>\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Тип</div>\n                </th>\n                <th>\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Статус</div>\n                </th>\n                <th>\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Номер клиента</div>\n                </th>\n                <th>\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Номер исполнителя</div>\n                </th>\n                <th>\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Специальность</div>\n                </th>\n                <th>\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Адрес</div>\n                </th>\n                <th>\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Дата создания</div>\n                </th>\n                <th></th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr *ngFor=\"let item of list\">\n                <td>{{item.id}}</td>\n                <td>\n                    <span *ngIf=\"item.for_now\">Срочный</span>\n                    <span *ngIf=\"!item.for_now\">Отложенный</span>\n                </td>\n                <td>{{getOrderStatus(item)}}</td>\n                <td>{{item.customer ? item.customer.phone : ''}}</td>\n                <td>{{item.executor ? item.executor.phone : ''}}</td>\n                <td>{{item.specialty.name}}</td>\n                <td>{{item.address.name}}</td>\n                <td>{{item.createdAt}}</td>\n                <td>\n                    <a [routerLink]=\"'orders/info/' + item.id | link\"  placement=\"left\" ngbTooltip=\"Подробнее\">\n                        <i class=\"fa fa-info-circle\"></i>\n                    </a>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n        <app-my-pagination *ngIf=\"countOrders\" [countItems]=\"countOrders\" [showInPages]=\"countShowInPage\" (changePage)=\"pageChanged($event)\"></app-my-pagination>\n        <!--<app-pagination></app-pagination>-->\n    </div>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/authorized/orders/orders.component.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/authorized/orders/orders.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/authorized/orders/orders-info/orders-info.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/authorized/orders/orders-info/orders-info.component.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".date {\n  color: #050594;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2Rqb2IvZXAvYWRtaW4vc3JjL2FwcC9hdXRob3JpemVkL29yZGVycy9vcmRlcnMtaW5mby9vcmRlcnMtaW5mby5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvYXV0aG9yaXplZC9vcmRlcnMvb3JkZXJzLWluZm8vb3JkZXJzLWluZm8uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxjQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9hdXRob3JpemVkL29yZGVycy9vcmRlcnMtaW5mby9vcmRlcnMtaW5mby5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5kYXRle1xuICAgIGNvbG9yOiAjMDUwNTk0O1xufVxuIiwiLmRhdGUge1xuICBjb2xvcjogIzA1MDU5NDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/authorized/orders/orders-info/orders-info.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/authorized/orders/orders-info/orders-info.component.ts ***!
  \************************************************************************/
/*! exports provided: OrdersInfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersInfoComponent", function() { return OrdersInfoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);





let OrdersInfoComponent = class OrdersInfoComponent {
    constructor(route, router, orderService, notif) {
        this.route = route;
        this.router = router;
        this.orderService = orderService;
        this.notif = notif;
    }
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.orderService.getOne(params['id'])
                .then(data => {
                this.order = data;
                this.orderService.getOrderHistory(this.order.id)
                    .then((history) => {
                    this.orderHistory = [];
                    for (let i = 0; i < history.length; i++) {
                        this.orderHistory.push({
                            date: moment__WEBPACK_IMPORTED_MODULE_4__(history[i].createdAt).format('HH:mm:ss'),
                            text: history[i].text
                        });
                    }
                });
            });
        });
    }
    getOrderStatus(order) {
        return this.orderService.getOrderStatus(order);
    }
};
OrdersInfoComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _shared__WEBPACK_IMPORTED_MODULE_2__["OrderService"] },
    { type: _shared__WEBPACK_IMPORTED_MODULE_2__["NotificationService"] }
];
OrdersInfoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-orders-info',
        template: __webpack_require__(/*! raw-loader!./orders-info.component.html */ "./node_modules/raw-loader/index.js!./src/app/authorized/orders/orders-info/orders-info.component.html"),
        styles: [__webpack_require__(/*! ./orders-info.component.scss */ "./src/app/authorized/orders/orders-info/orders-info.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        _shared__WEBPACK_IMPORTED_MODULE_2__["OrderService"],
        _shared__WEBPACK_IMPORTED_MODULE_2__["NotificationService"]])
], OrdersInfoComponent);



/***/ }),

/***/ "./src/app/authorized/orders/orders-list/orders-list.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/authorized/orders/orders-list/orders-list.component.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".date {\n  color: #050594;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2Rqb2IvZXAvYWRtaW4vc3JjL2FwcC9hdXRob3JpemVkL29yZGVycy9vcmRlcnMtbGlzdC9vcmRlcnMtbGlzdC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvYXV0aG9yaXplZC9vcmRlcnMvb3JkZXJzLWxpc3Qvb3JkZXJzLWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxjQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9hdXRob3JpemVkL29yZGVycy9vcmRlcnMtbGlzdC9vcmRlcnMtbGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5kYXRle1xuICAgIGNvbG9yOiAjMDUwNTk0O1xufVxuIiwiLmRhdGUge1xuICBjb2xvcjogIzA1MDU5NDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/authorized/orders/orders-list/orders-list.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/authorized/orders/orders-list/orders-list.component.ts ***!
  \************************************************************************/
/*! exports provided: OrdersListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersListComponent", function() { return OrdersListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);





let OrdersListComponent = class OrdersListComponent {
    constructor(orderService, modalService) {
        this.orderService = orderService;
        this.modalService = modalService;
        this.countShowInPage = 20;
        this.filters = {
            status: null,
            types: [0, 1],
            date_from: moment__WEBPACK_IMPORTED_MODULE_4__().add(-14, 'days').format('YYYY-MM-DD HH:mm:ss'),
            date_to: moment__WEBPACK_IMPORTED_MODULE_4__().format('YYYY-MM-DD HH:mm:ss')
        };
        this.sort = {};
        this.search_phone = '';
        this.search_id = '';
        this.range = {
            start: 0,
            limit: this.countShowInPage
        };
        this.list = [];
        this.scrollEventActive = false;
    }
    ngOnInit() {
        this.refreshOrders();
    }
    /*    @HostListener('window:scroll', ['$event']) onScrollEvent($event){
            if(document.body.scrollHeight - window.innerHeight - $(window).scrollTop() < 50){
                clearTimeout(this.timeoutLoad);
                this.timeoutLoad = setTimeout(() => {
                    this.scrollEventActive = false;
                    this.range.start += this.countShowInPage;
                    this.refreshOrders(false);
                }, 1000);
            }
        }*/
    refreshOrders(reinit = true) {
        if (reinit) {
            this.range.start = 0;
        }
        let options = {
            range: this.range
        };
        if (this.search_phone !== '') {
            options['search_phone'] = this.search_phone;
        }
        if (this.search_id !== '') {
            options['search_id'] = this.search_id;
        }
        if (!this.isEmpty(this.filters)) {
            options['filters'] = this.filters;
        }
        if (!this.isEmpty(this.sort)) {
            options['sort'] = this.sort;
        }
        this.orderService.getlist(options)
            .then((list) => {
            if (reinit) {
                this.countOrders = 0;
                this.orderService.getlistCount(options)
                    .then(countData => {
                    this.countOrders = countData;
                });
            }
            this.list = list;
        });
    }
    searchIdRefresh() {
        this.search_phone = '';
        clearTimeout(this.timeoutSearch);
        this.timeoutSearch = setTimeout(() => {
            this.refreshOrders();
        }, 1000);
    }
    searchPhoneRefresh() {
        this.search_id = '';
        clearTimeout(this.timeoutSearch);
        this.timeoutSearch = setTimeout(() => {
            this.refreshOrders();
        }, 1000);
    }
    changeDateFrom(val) {
        this.filters.date_from = val;
        this.refreshOrders();
    }
    changeDateTo(val) {
        this.filters.date_to = val;
        this.refreshOrders();
    }
    changeType(val) {
        if (this.filters.types.indexOf(val) !== -1) {
            this.filters.types = this.filters.types.filter(_val => val !== _val);
        }
        else {
            this.filters.types.push(val);
        }
        if (!this.filters.types.length) {
            this.filters.types.push(val === 0 ? 1 : 0);
        }
        this.refreshOrders();
    }
    getOrderStatus(order) {
        return this.orderService.getOrderStatus(order);
    }
    isEmpty(arg) {
        for (let item in arg) {
            return false;
        }
        return true;
    }
    pageChanged(event) {
        this.range.start = (event - 1) * this.countShowInPage;
        this.refreshOrders(false);
    }
};
OrdersListComponent.ctorParameters = () => [
    { type: _shared__WEBPACK_IMPORTED_MODULE_2__["OrderService"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"] }
];
OrdersListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-orders-list',
        template: __webpack_require__(/*! raw-loader!./orders-list.component.html */ "./node_modules/raw-loader/index.js!./src/app/authorized/orders/orders-list/orders-list.component.html"),
        styles: [__webpack_require__(/*! ./orders-list.component.scss */ "./src/app/authorized/orders/orders-list/orders-list.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shared__WEBPACK_IMPORTED_MODULE_2__["OrderService"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"]])
], OrdersListComponent);



/***/ }),

/***/ "./src/app/authorized/orders/orders-routing.module.ts":
/*!************************************************************!*\
  !*** ./src/app/authorized/orders/orders-routing.module.ts ***!
  \************************************************************/
/*! exports provided: OrdersRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersRoutingModule", function() { return OrdersRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _orders_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./orders.component */ "./src/app/authorized/orders/orders.component.ts");
/* harmony import */ var _orders_list_orders_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./orders-list/orders-list.component */ "./src/app/authorized/orders/orders-list/orders-list.component.ts");
/* harmony import */ var _orders_info_orders_info_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./orders-info/orders-info.component */ "./src/app/authorized/orders/orders-info/orders-info.component.ts");






const routes = [
    {
        path: '',
        component: _orders_component__WEBPACK_IMPORTED_MODULE_3__["OrdersComponent"],
        children: [
            { path: '', component: _orders_list_orders_list_component__WEBPACK_IMPORTED_MODULE_4__["OrdersListComponent"] },
            { path: 'info/:id', component: _orders_info_orders_info_component__WEBPACK_IMPORTED_MODULE_5__["OrdersInfoComponent"] }
        ]
    }
];
let OrdersRoutingModule = class OrdersRoutingModule {
};
OrdersRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], OrdersRoutingModule);



/***/ }),

/***/ "./src/app/authorized/orders/orders.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/authorized/orders/orders.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGhvcml6ZWQvb3JkZXJzL29yZGVycy5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/authorized/orders/orders.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/authorized/orders/orders.component.ts ***!
  \*******************************************************/
/*! exports provided: OrdersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersComponent", function() { return OrdersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _router_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../router.animations */ "./src/app/router.animations.ts");



let OrdersComponent = class OrdersComponent {
    constructor() { }
    ngOnInit() {
    }
};
OrdersComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-orders',
        template: __webpack_require__(/*! raw-loader!./orders.component.html */ "./node_modules/raw-loader/index.js!./src/app/authorized/orders/orders.component.html"),
        animations: [Object(_router_animations__WEBPACK_IMPORTED_MODULE_2__["routerTransition"])()],
        styles: [__webpack_require__(/*! ./orders.component.scss */ "./src/app/authorized/orders/orders.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], OrdersComponent);



/***/ }),

/***/ "./src/app/authorized/orders/orders.module.ts":
/*!****************************************************!*\
  !*** ./src/app/authorized/orders/orders.module.ts ***!
  \****************************************************/
/*! exports provided: OrdersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersModule", function() { return OrdersModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _orders_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./orders-routing.module */ "./src/app/authorized/orders/orders-routing.module.ts");
/* harmony import */ var _orders_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./orders.component */ "./src/app/authorized/orders/orders.component.ts");
/* harmony import */ var _orders_list_orders_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./orders-list/orders-list.component */ "./src/app/authorized/orders/orders-list/orders-list.component.ts");
/* harmony import */ var _orders_info_orders_info_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./orders-info/orders-info.component */ "./src/app/authorized/orders/orders-info/orders-info.component.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var ngx_clipboard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-clipboard */ "./node_modules/ngx-clipboard/fesm2015/ngx-clipboard.js");











let OrdersModule = class OrdersModule {
};
OrdersModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _orders_routing_module__WEBPACK_IMPORTED_MODULE_4__["OrdersRoutingModule"],
            _shared__WEBPACK_IMPORTED_MODULE_8__["PageHeaderModule"],
            _shared__WEBPACK_IMPORTED_MODULE_8__["PipesModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbTooltipModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbModule"],
            _shared__WEBPACK_IMPORTED_MODULE_8__["AutocompleteModule"],
            _shared__WEBPACK_IMPORTED_MODULE_8__["LocationModule"],
            ngx_clipboard__WEBPACK_IMPORTED_MODULE_10__["ClipboardModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbTooltipModule"],
            _shared__WEBPACK_IMPORTED_MODULE_8__["DateTimePickerModule"],
            _shared__WEBPACK_IMPORTED_MODULE_8__["PaginationModule"]
        ],
        declarations: [
            _orders_component__WEBPACK_IMPORTED_MODULE_5__["OrdersComponent"],
            _orders_list_orders_list_component__WEBPACK_IMPORTED_MODULE_6__["OrdersListComponent"],
            _orders_info_orders_info_component__WEBPACK_IMPORTED_MODULE_7__["OrdersInfoComponent"]
        ]
    })
], OrdersModule);



/***/ })

}]);
//# sourceMappingURL=orders-orders-module.js.map