(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["reports-reports-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/authorized/reports/reports-list/reports-list.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/authorized/reports/reports-list/reports-list.component.html ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"w-100 mb-3 page-block\">\n    <div class=\"row pt-3 pb-3\">\n        <div class=\"col-12 col-sm-6 d-inline-flex justify-content-around align-items-center\">\n            <label class=\"m-0\">\n                <div class=\"switch-btn\" [class.switch-on]=\"filters.processed\" (click)=\"changeFilter('processed')\"></div>\n                Обработанные\n            </label>\n            <label class=\"m-0\">\n                <div class=\"switch-btn\" [class.switch-on]=\"filters.not_processed\" (click)=\"changeFilter('not_processed')\"></div>\n                Не обработанные\n            </label>\n        </div>\n        <div class=\"col-12 col-sm-6 d-inline-flex align-items-center justify-content-center\"></div>\n    </div>\n</div>\n\n<div class=\"card mb-3\">\n    <div class=\"card-header d-flex justify-content-between\">\n        <div>\n            Споры\n        </div>\n    </div>\n    <div class=\"card-body table-responsive\">\n        <table class=\"table table-hover table-striped text-center\">\n            <thead>\n            <tr>\n                <th>\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Клиент</div>\n                </th>\n                <th>\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Исполнитель</div>\n                </th>\n                <th>\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Инициатор</div>\n                </th>\n                <th>\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Текст</div>\n                </th>\n                <th>\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Статус</div>\n                </th>\n                <th>\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Дата</div>\n                </th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr *ngFor=\"let item of list\" (click)=\"openReport(openedReport, item)\">\n                <td>{{item.customer ? item.customer.phone : ''}}</td>\n                <td>{{item.executor ? item.executor.phone : ''}}</td>\n                <td>{{item.initiator === 'CUSTOMER' ? 'Клиент' : 'Исполнитель'}}</td>\n                <td>{{getTextInList(item.text)}}</td>\n                <td>{{item.status === 1 ? 'Не обработан' : 'Обработан'}}</td>\n                <td>{{item.createdAt}}</td>\n            </tr>\n            </tbody>\n        </table>\n    </div>\n    <app-my-pagination *ngIf=\"countReports\" [countItems]=\"countReports\" [showInPages]=\"countShowInPage\" (changePage)=\"pageChanged($event)\"></app-my-pagination>\n</div>\n\n<ng-template #openedReport let-c=\"close\" let-d=\"dismiss\">\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title\">Жалоба №{{selectedReport.id}}\"</h4>\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d()\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\">\n        <ngb-tabset>\n            <ngb-tab>\n                <ng-template ngbTabTitle>Жалоба</ng-template>\n                <ng-template ngbTabContent>\n                    <div class=\"d-flex flex-column\">\n                        <div class=\"d-flex mb-2\">\n                            <span class=\"w-50\">Инициатор:</span>\n                            <span>{{selectedReport.initiator === 'CUSTOMER' ? 'Клиент' : 'Исполнитель'}}</span>\n                        </div>\n                        <div class=\"d-flex mb-2\">\n                            <span class=\"w-50\">Текст:</span>\n                            <span>{{selectedReport.text}}</span>\n                        </div>\n                        <div class=\"d-flex mb-2\" *ngIf=\"selectedReport.photo\">\n                            <span class=\"w-50\">Фото:</span>\n                            <img [src]=\"'/uploads/' + selectedReport.photo\" />\n                        </div>\n                        <div class=\"d-flex mb-2\">\n                            <span class=\"w-50\">Статус:</span>\n                            <select class=\"form-control\" [(ngModel)]=\"selectedReport.status\">\n                                <option [value]=\"1\">Не обработан</option>\n                                <option [value]=\"2\">Обработан</option>\n                            </select>\n                        </div>\n                        <div class=\"d-flex mb-2 justify-content-end\">\n                            <button type=\"button\" class=\"btn btn-secondary mr-2\" (click)=\"saveReportStatus()\">Сохранить статус</button>\n                        </div>\n                    </div>\n                </ng-template>\n            </ngb-tab>\n            <ngb-tab>\n                <ng-template ngbTabTitle>Исполнитель</ng-template>\n                <ng-template ngbTabContent>\n                    <div class=\"col-12 pt-3 pb-3\">\n                        <div class=\"row\">\n                            <div class=\"col-6 d-inline-flex align-items-center\">Имя</div>\n                            <div class=\"col-6\">{{selectedReport.executor.name}}</div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-6 d-inline-flex align-items-center\">Телефон</div>\n                            <div class=\"col-6\">{{selectedReport.executor.phone}}</div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-6 d-inline-flex align-items-center\">Баланс</div>\n                            <div class=\"col-6\">{{selectedReport.executor.balance['$numberDecimal']}}</div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-6 d-inline-flex align-items-center\">Бонус баланс</div>\n                            <div class=\"col-6\">{{selectedReport.executor.bonus_balance['$numberDecimal']}}</div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-6 d-inline-flex align-items-center\">Статус аккаунта</div>\n                            <div class=\"col-6\">\n                                <span *ngIf=\"selectedReport.executor.banned\">Заблокирован</span>\n                                <span *ngIf=\"!selectedReport.executor.banned\">Активный</span>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div  class=\"col-6 d-inline-flex align-items-center\">\n                                Статус паспотра\n                            </div>\n                            <div class=\"col-6\">\n                                <select [(ngModel)]=\"selectedReport.executor.registered\" class=\"form-control\" disabled>\n                                    <option [value]=\"0\">Не все параметры заполнены по паспорту</option>\n                                    <option [value]=\"1\">Ожидает подтверждения</option>\n                                    <option [value]=\"2\">Подтвержден</option>\n                                    <option [value]=\"-1\">Отклонен</option>\n                                </select>\n                            </div>\n                        </div>\n                        <div *ngIf=\"selectedReport.executor.registered == -1\" class=\"row mt-2\">\n                            <div  class=\"col-6 d-inline-flex align-items-center\">Причина отказа</div>\n                            <div class=\"col-6\">\n                                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"selectedReport.executor.reject_reason\" />\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-12 d-inline-flex align-items-center\">Паспорт</div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-6 d-inline-flex align-items-center\">Серия</div>\n                            <div class=\"col-6\">{{selectedReport.executor.passport.series}}</div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-6 d-inline-flex align-items-center\">Номер</div>\n                            <div class=\"col-6\">{{selectedReport.executor.passport.number}}</div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-6 d-inline-flex align-items-center\">Код</div>\n                            <div class=\"col-6\">{{selectedReport.executor.passport.code}}</div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-6 d-inline-flex align-items-center\">Кем выдан</div>\n                            <div class=\"col-6\">{{selectedReport.executor.passport.issued_by}}</div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-6 d-inline-flex align-items-center\">Фото</div>\n                            <div class=\"col-6\">\n                                <a *ngIf=\"selectedReport.executor.passport.main_photo\" [href]=\"'/uploads/'+selectedReport.executor.passport.main_photo\" target=\"popup\">Фото</a>\n                                <span *ngIf=\"!selectedReport.executor.passport.main_photo\">-</span>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-6 d-inline-flex align-items-center\">Фото регистрации</div>\n                            <div class=\"col-6\">\n                                <a *ngIf=\"selectedReport.executor.passport.registration_photo\" [href]=\"'/uploads/'+selectedReport.executor.passport.registration_photo\" target=\"popup\">Фото</a>\n                                <span *ngIf=\"!selectedReport.executor.passport.registration_photo\">-</span>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-6 d-inline-flex align-items-center\">Селфи с паспортом</div>\n                            <div class=\"col-6\">\n                                <a *ngIf=\"selectedReport.executor.passport.selfy_photo\" [href]=\"'/uploads/'+selectedReport.executor.passport.selfy_photo\" target=\"popup\">Фото</a>\n                                <span *ngIf=\"!selectedReport.executor.passport.selfy_photo\">-</span>\n                            </div>\n                        </div>\n                    </div>\n                </ng-template>\n            </ngb-tab>\n            <ngb-tab>\n                <ng-template ngbTabTitle>Клиент</ng-template>\n                <ng-template ngbTabContent>\n                    <div class=\"col-12 pt-3 pb-3\">\n                        <div class=\"row\">\n                            <div class=\"col-6 d-inline-flex align-items-center\">Имя</div>\n                            <div class=\"col-6\">{{selectedReport.customer.name}}</div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-6 d-inline-flex align-items-center\">Телефон</div>\n                            <div class=\"col-6\">{{selectedReport.customer.phone}}</div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-6 d-inline-flex align-items-center\">Баланс</div>\n                            <div class=\"col-6\">{{selectedReport.customer.balance['$numberDecimal']}}</div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-6 d-inline-flex align-items-center\">Бонус баланс</div>\n                            <div class=\"col-6\">{{selectedReport.customer.bonus_balance['$numberDecimal']}}</div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-6 d-inline-flex align-items-center\">Статус</div>\n                            <div class=\"col-6\">\n                                <select class=\"form-control\" [(ngModel)]=\"selectedReport.customer.banned\" disabled>\n                                    <option [value]=\"false\">Активен</option>\n                                    <option [value]=\"true\">Заблокирован</option>\n                                </select>\n                            </div>\n                        </div>\n                    </div>\n                </ng-template>\n            </ngb-tab>\n            <ngb-tab>\n                <ng-template ngbTabTitle>Заказ</ng-template>\n                <ng-template ngbTabContent>\n                    <div class=\"row\">\n                        <div class=\"col-12 pt-3 pb-3\">\n                            <div class=\"w-100 p-4\">\n                                <div class=\"row item_info\">\n                                    <div class=\"col-6 d-inline-flex align-items-center\">ID</div>\n                                    <div class=\"col-6\">{{selectedReport.order.id}}</div>\n                                </div>\n                                <div class=\"row item_info\">\n                                    <div class=\"col-6 d-inline-flex align-items-center\">Специальность</div>\n                                    <div class=\"col-6\">{{selectedReport.order.specialty.name}}</div>\n                                </div>\n                                <div class=\"row item_info\">\n                                    <div class=\"col-6 d-inline-flex align-items-center\">Статус</div>\n                                    <div class=\"col-6\">{{getOrderStatus(selectedReport.order)}}</div>\n                                </div>\n                                <div class=\"row item_info\">\n                                    <div class=\"col-6 d-inline-flex align-items-center\">Тип заказа</div>\n                                    <div class=\"col-6\">\n                                        <span *ngIf=\"selectedReport.order.for_now\">Срочный</span>\n                                        <span *ngIf=\"!selectedReport.order.for_now\">Отложенный</span>\n                                    </div>\n                                </div>\n                                <div class=\"row item_info\" *ngIf=\"!selectedReport.order.for_now\">\n                                    <div class=\"col-6 d-inline-flex align-items-center\">Запланированное время</div>\n                                    <div class=\"col-6\">{{selectedReport.order.scheduled_time}}</div>\n                                </div>\n                                <div class=\"row item_info\">\n                                    <div  class=\"col-6 d-inline-flex align-items-center\">Место заказа</div>\n                                    <div class=\"col-6\">\n                                        <span *ngIf=\"selectedReport.order.departure == 'ANY'\">Не определено</span>\n                                        <span *ngIf=\"selectedReport.order.departure == 'OFFICE'\">Офис</span>\n                                        <span *ngIf=\"selectedReport.order.departure == 'ADDRESS'\">На выезд</span>\n                                    </div>\n                                </div>\n                                <div class=\"row item_info\">\n                                    <div  class=\"col-6 d-inline-flex align-items-center\">Адрес</div>\n                                    <div class=\"col-6\">{{selectedReport.order.address.name}}</div>\n                                </div>\n                                <div class=\"row item_info\">\n                                    <div  class=\"col-6 d-inline-flex align-items-center\">Создан</div>\n                                    <div class=\"col-6\">{{selectedReport.order.createdAt}}</div>\n                                </div>\n                                <div class=\"row item_info\">\n                                    <div  class=\"col-6 d-inline-flex align-items-center\">Сумма</div>\n                                    <div class=\"col-6\">{{selectedReport.order.summ}}</div>\n                                </div>\n                                <div class=\"row item_info\">\n                                    <div  class=\"col-6 d-inline-flex align-items-center\">Тип оплаты</div>\n                                    <div class=\"col-6\">\n                                        <span *ngIf=\"selectedReport.order.summ_type == 'HOURLY'\">Почасовая</span>\n                                        <span *ngIf=\"selectedReport.order.summ_type == 'FIXED'\">Одноразовая</span>\n                                    </div>\n                                </div>\n                                <div class=\"row item_info\">\n                                    <div  class=\"col-6 d-inline-flex align-items-center\">Способ оплаты</div>\n                                    <div class=\"col-6\">\n                                        <span *ngIf=\"selectedReport.order.payment_type == 'CASH'\">Наличка</span>\n                                        <span *ngIf=\"selectedReport.order.payment_type == 'BONUS'\">Бонусный щет</span>\n                                        <span *ngIf=\"selectedReport.order.payment_type == 'CARD'\">Карточка</span>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </ng-template>\n            </ngb-tab>\n        </ngb-tabset>\n    </div>\n</ng-template>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/authorized/reports/reports.component.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/authorized/reports/reports.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/authorized/reports/reports-list/reports-list.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/authorized/reports/reports-list/reports-list.component.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".action-icon {\n  cursor: pointer;\n  margin: 10px;\n}\n\n.switch-btn {\n  margin-right: 10px;\n}\n\n.controls i {\n  margin: 0 5px;\n  cursor: pointer;\n}\n\n.controls i:before {\n  font-size: 12px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2Rqb2IvZXAvYWRtaW4vc3JjL2FwcC9hdXRob3JpemVkL3JlcG9ydHMvcmVwb3J0cy1saXN0L3JlcG9ydHMtbGlzdC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvYXV0aG9yaXplZC9yZXBvcnRzL3JlcG9ydHMtbGlzdC9yZXBvcnRzLWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxlQUFBO0VBQ0EsWUFBQTtBQ0NKOztBRENBO0VBQ0ksa0JBQUE7QUNFSjs7QURDSTtFQUNJLGFBQUE7RUFDQSxlQUFBO0FDRVI7O0FERFE7RUFDSSxlQUFBO0FDR1oiLCJmaWxlIjoic3JjL2FwcC9hdXRob3JpemVkL3JlcG9ydHMvcmVwb3J0cy1saXN0L3JlcG9ydHMtbGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hY3Rpb24taWNvbntcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgbWFyZ2luOiAxMHB4O1xufVxuLnN3aXRjaC1idG57XG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuLmNvbnRyb2xze1xuICAgIGl7XG4gICAgICAgIG1hcmdpbjogMCA1cHg7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgJjpiZWZvcmV7XG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIuYWN0aW9uLWljb24ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIG1hcmdpbjogMTBweDtcbn1cblxuLnN3aXRjaC1idG4ge1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG5cbi5jb250cm9scyBpIHtcbiAgbWFyZ2luOiAwIDVweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLmNvbnRyb2xzIGk6YmVmb3JlIHtcbiAgZm9udC1zaXplOiAxMnB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/authorized/reports/reports-list/reports-list.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/authorized/reports/reports-list/reports-list.component.ts ***!
  \***************************************************************************/
/*! exports provided: ReportsListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportsListComponent", function() { return ReportsListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");




let ReportsListComponent = class ReportsListComponent {
    constructor(reportsService, modalService) {
        this.reportsService = reportsService;
        this.modalService = modalService;
        this.countShowInPage = 20;
        this.filters = {
            processed: false,
            not_processed: true
        };
        this.range = {
            start: 0,
            limit: this.countShowInPage
        };
        this.list = [];
    }
    ngOnInit() {
        this.refreshReports();
    }
    refreshReports(reinit = true) {
        if (reinit) {
            this.range.start = 0;
        }
        let options = {
            range: this.range
        };
        if (!this.isEmpty(this.filters)) {
            options['filters'] = this.filters;
        }
        this.reportsService.getlist(options)
            .then((list) => {
            if (reinit) {
                this.countReports = 0;
                this.reportsService.getCount(options)
                    .then(countData => {
                    this.countReports = countData;
                });
            }
            this.list = list;
        });
    }
    isEmpty(arg) {
        for (let item in arg) {
            return false;
        }
        return true;
    }
    pageChanged(event) {
        this.range.start = (event - 1) * this.countShowInPage;
        this.refreshReports(false);
    }
    changeFilter(key) {
        this.filters[key] = !this.filters[key];
        this.refreshReports();
    }
    getTextInList(text) {
        let ret_len = 80;
        return text.length > ret_len ? text.substr(0, 80) + '...' : text;
    }
    openReport(content, report) {
        this.selectedReport = report;
        this.modalService.open(content);
    }
    saveReportStatus() {
        this.reportsService.updateStatus(this.selectedReport.id, { status: this.selectedReport.status })
            .then(upData => {
            this.modalService.dismissAll();
            this.refreshReports(false);
        });
    }
};
ReportsListComponent.ctorParameters = () => [
    { type: _shared__WEBPACK_IMPORTED_MODULE_2__["ReportsService"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"] }
];
ReportsListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-reports-list',
        template: __webpack_require__(/*! raw-loader!./reports-list.component.html */ "./node_modules/raw-loader/index.js!./src/app/authorized/reports/reports-list/reports-list.component.html"),
        styles: [__webpack_require__(/*! ./reports-list.component.scss */ "./src/app/authorized/reports/reports-list/reports-list.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shared__WEBPACK_IMPORTED_MODULE_2__["ReportsService"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"]])
], ReportsListComponent);



/***/ }),

/***/ "./src/app/authorized/reports/reports-routing.module.ts":
/*!**************************************************************!*\
  !*** ./src/app/authorized/reports/reports-routing.module.ts ***!
  \**************************************************************/
/*! exports provided: ReportsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportsRoutingModule", function() { return ReportsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _reports_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reports.component */ "./src/app/authorized/reports/reports.component.ts");
/* harmony import */ var _reports_list_reports_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reports-list/reports-list.component */ "./src/app/authorized/reports/reports-list/reports-list.component.ts");





const routes = [
    {
        path: '',
        component: _reports_component__WEBPACK_IMPORTED_MODULE_3__["ReportsComponent"],
        children: [
            { path: '', component: _reports_list_reports_list_component__WEBPACK_IMPORTED_MODULE_4__["ReportsListComponent"] }
        ]
    }
];
let ReportsRoutingModule = class ReportsRoutingModule {
};
ReportsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], ReportsRoutingModule);



/***/ }),

/***/ "./src/app/authorized/reports/reports.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/authorized/reports/reports.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGhvcml6ZWQvcmVwb3J0cy9yZXBvcnRzLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/authorized/reports/reports.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/authorized/reports/reports.component.ts ***!
  \*********************************************************/
/*! exports provided: ReportsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportsComponent", function() { return ReportsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _router_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../router.animations */ "./src/app/router.animations.ts");



let ReportsComponent = class ReportsComponent {
    constructor() { }
    ngOnInit() {
    }
};
ReportsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-reports',
        template: __webpack_require__(/*! raw-loader!./reports.component.html */ "./node_modules/raw-loader/index.js!./src/app/authorized/reports/reports.component.html"),
        animations: [Object(_router_animations__WEBPACK_IMPORTED_MODULE_2__["routerTransition"])()],
        styles: [__webpack_require__(/*! ./reports.component.scss */ "./src/app/authorized/reports/reports.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], ReportsComponent);



/***/ }),

/***/ "./src/app/authorized/reports/reports.module.ts":
/*!******************************************************!*\
  !*** ./src/app/authorized/reports/reports.module.ts ***!
  \******************************************************/
/*! exports provided: ReportsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportsModule", function() { return ReportsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _reports_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reports-routing.module */ "./src/app/authorized/reports/reports-routing.module.ts");
/* harmony import */ var _reports_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reports.component */ "./src/app/authorized/reports/reports.component.ts");
/* harmony import */ var _reports_list_reports_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./reports-list/reports-list.component */ "./src/app/authorized/reports/reports-list/reports-list.component.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared */ "./src/app/shared/index.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var ngx_clipboard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-clipboard */ "./node_modules/ngx-clipboard/fesm2015/ngx-clipboard.js");










let ReportsModule = class ReportsModule {
};
ReportsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _reports_routing_module__WEBPACK_IMPORTED_MODULE_4__["ReportsRoutingModule"],
            _shared__WEBPACK_IMPORTED_MODULE_7__["PageHeaderModule"],
            _shared__WEBPACK_IMPORTED_MODULE_7__["PipesModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbTooltipModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbModule"],
            _shared__WEBPACK_IMPORTED_MODULE_7__["AutocompleteModule"],
            _shared__WEBPACK_IMPORTED_MODULE_7__["LocationModule"],
            ngx_clipboard__WEBPACK_IMPORTED_MODULE_9__["ClipboardModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbTooltipModule"],
            _shared__WEBPACK_IMPORTED_MODULE_7__["DateTimePickerModule"],
            _shared__WEBPACK_IMPORTED_MODULE_7__["PaginationModule"]
        ],
        declarations: [
            _reports_component__WEBPACK_IMPORTED_MODULE_5__["ReportsComponent"],
            _reports_list_reports_list_component__WEBPACK_IMPORTED_MODULE_6__["ReportsListComponent"]
        ]
    })
], ReportsModule);



/***/ })

}]);
//# sourceMappingURL=reports-reports-module.js.map