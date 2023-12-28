(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["reports-reports-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/authorized/reports/reports-list/reports-list.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/authorized/reports/reports-list/reports-list.component.html ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"w-100 mb-3 page-block\">\r\n    <div class=\"row pt-3 pb-3\">\r\n        <div class=\"col-12 col-sm-6 d-inline-flex justify-content-around align-items-center\">\r\n            <label class=\"m-0\">\r\n                <div class=\"switch-btn\" [class.switch-on]=\"filters.processed\" (click)=\"changeFilter('processed')\"></div>\r\n                Обработанные\r\n            </label>\r\n            <label class=\"m-0\">\r\n                <div class=\"switch-btn\" [class.switch-on]=\"filters.not_processed\" (click)=\"changeFilter('not_processed')\"></div>\r\n                Не обработанные\r\n            </label>\r\n        </div>\r\n        <div class=\"col-12 col-sm-6 d-inline-flex align-items-center justify-content-center\"></div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"card mb-3\">\r\n    <div class=\"card-header d-flex justify-content-between\">\r\n        <div>\r\n            Споры\r\n        </div>\r\n    </div>\r\n    <div class=\"card-body table-responsive\">\r\n        <table class=\"table table-hover table-striped text-center\">\r\n            <thead>\r\n            <tr>\r\n                <th>\r\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Клиент</div>\r\n                </th>\r\n                <th>\r\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Исполнитель</div>\r\n                </th>\r\n                <th>\r\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Инициатор</div>\r\n                </th>\r\n                <th>\r\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Текст</div>\r\n                </th>\r\n                <th>\r\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Статус</div>\r\n                </th>\r\n                <th>\r\n                    <div class=\"d-flex w-100 align-items-center justify-content-center\">Дата</div>\r\n                </th>\r\n            </tr>\r\n            </thead>\r\n            <tbody>\r\n            <tr *ngFor=\"let item of list\" (click)=\"openReport(openedReport, item)\">\r\n                <td>{{item.customer ? item.customer.phone : ''}}</td>\r\n                <td>{{item.executor ? item.executor.phone : ''}}</td>\r\n                <td>{{item.initiator === 'CUSTOMER' ? 'Клиент' : 'Исполнитель'}}</td>\r\n                <td>{{getTextInList(item.text)}}</td>\r\n                <td>{{item.status === 1 ? 'Не обработан' : 'Обработан'}}</td>\r\n                <td>{{item.createdAt}}</td>\r\n            </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n    <app-my-pagination *ngIf=\"countReports\" [countItems]=\"countReports\" [showInPages]=\"countShowInPage\" (changePage)=\"pageChanged($event)\"></app-my-pagination>\r\n</div>\r\n\r\n<ng-template #openedReport let-c=\"close\" let-d=\"dismiss\">\r\n    <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Жалоба №{{selectedReport.id}}\"</h4>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d()\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <ngb-tabset>\r\n            <ngb-tab>\r\n                <ng-template ngbTabTitle>Жалоба</ng-template>\r\n                <ng-template ngbTabContent>\r\n                    <div class=\"d-flex flex-column\">\r\n                        <div class=\"d-flex mb-2\">\r\n                            <span class=\"w-50\">Инициатор:</span>\r\n                            <span>{{selectedReport.initiator === 'CUSTOMER' ? 'Клиент' : 'Исполнитель'}}</span>\r\n                        </div>\r\n                        <div class=\"d-flex mb-2\">\r\n                            <span class=\"w-50\">Текст:</span>\r\n                            <span>{{selectedReport.text}}</span>\r\n                        </div>\r\n                        <div class=\"d-flex mb-2\" *ngIf=\"selectedReport.photo\">\r\n                            <span class=\"w-50\">Фото:</span>\r\n                            <img [src]=\"'/uploads/' + selectedReport.photo\" />\r\n                        </div>\r\n                        <div class=\"d-flex mb-2\">\r\n                            <span class=\"w-50\">Статус:</span>\r\n                            <select class=\"form-control\" [(ngModel)]=\"selectedReport.status\">\r\n                                <option [value]=\"1\">Не обработан</option>\r\n                                <option [value]=\"2\">Обработан</option>\r\n                            </select>\r\n                        </div>\r\n                        <div class=\"d-flex mb-2 justify-content-end\">\r\n                            <button type=\"button\" class=\"btn btn-secondary mr-2\" (click)=\"saveReportStatus()\">Сохранить статус</button>\r\n                        </div>\r\n                    </div>\r\n                </ng-template>\r\n            </ngb-tab>\r\n            <ngb-tab>\r\n                <ng-template ngbTabTitle>Исполнитель</ng-template>\r\n                <ng-template ngbTabContent>\r\n                    <div class=\"col-12 pt-3 pb-3\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-6 d-inline-flex align-items-center\">Имя</div>\r\n                            <div class=\"col-6\">{{selectedReport.executor.name}}</div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-6 d-inline-flex align-items-center\">Телефон</div>\r\n                            <div class=\"col-6\">{{selectedReport.executor.phone}}</div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-6 d-inline-flex align-items-center\">Баланс</div>\r\n                            <div class=\"col-6\">{{selectedReport.executor.balance['$numberDecimal']}}</div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-6 d-inline-flex align-items-center\">Бонус баланс</div>\r\n                            <div class=\"col-6\">{{selectedReport.executor.bonus_balance['$numberDecimal']}}</div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-6 d-inline-flex align-items-center\">Статус аккаунта</div>\r\n                            <div class=\"col-6\">\r\n                                <span *ngIf=\"selectedReport.executor.banned\">Заблокирован</span>\r\n                                <span *ngIf=\"!selectedReport.executor.banned\">Активный</span>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div  class=\"col-6 d-inline-flex align-items-center\">\r\n                                Статус паспотра\r\n                            </div>\r\n                            <div class=\"col-6\">\r\n                                <select [(ngModel)]=\"selectedReport.executor.registered\" class=\"form-control\" disabled>\r\n                                    <option [value]=\"0\">Не все параметры заполнены по паспорту</option>\r\n                                    <option [value]=\"1\">Ожидает подтверждения</option>\r\n                                    <option [value]=\"2\">Подтвержден</option>\r\n                                    <option [value]=\"-1\">Отклонен</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                        <div *ngIf=\"selectedReport.executor.registered == -1\" class=\"row mt-2\">\r\n                            <div  class=\"col-6 d-inline-flex align-items-center\">Причина отказа</div>\r\n                            <div class=\"col-6\">\r\n                                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"selectedReport.executor.reject_reason\" />\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-12 d-inline-flex align-items-center\">Паспорт</div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-6 d-inline-flex align-items-center\">Серия</div>\r\n                            <div class=\"col-6\">{{selectedReport.executor.passport.series}}</div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-6 d-inline-flex align-items-center\">Номер</div>\r\n                            <div class=\"col-6\">{{selectedReport.executor.passport.number}}</div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-6 d-inline-flex align-items-center\">Код</div>\r\n                            <div class=\"col-6\">{{selectedReport.executor.passport.code}}</div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-6 d-inline-flex align-items-center\">Кем выдан</div>\r\n                            <div class=\"col-6\">{{selectedReport.executor.passport.issued_by}}</div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-6 d-inline-flex align-items-center\">Фото</div>\r\n                            <div class=\"col-6\">\r\n                                <a *ngIf=\"selectedReport.executor.passport.main_photo\" [href]=\"'/uploads/'+selectedReport.executor.passport.main_photo\" target=\"popup\">Фото</a>\r\n                                <span *ngIf=\"!selectedReport.executor.passport.main_photo\">-</span>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-6 d-inline-flex align-items-center\">Фото регистрации</div>\r\n                            <div class=\"col-6\">\r\n                                <a *ngIf=\"selectedReport.executor.passport.registration_photo\" [href]=\"'/uploads/'+selectedReport.executor.passport.registration_photo\" target=\"popup\">Фото</a>\r\n                                <span *ngIf=\"!selectedReport.executor.passport.registration_photo\">-</span>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-6 d-inline-flex align-items-center\">Селфи с паспортом</div>\r\n                            <div class=\"col-6\">\r\n                                <a *ngIf=\"selectedReport.executor.passport.selfy_photo\" [href]=\"'/uploads/'+selectedReport.executor.passport.selfy_photo\" target=\"popup\">Фото</a>\r\n                                <span *ngIf=\"!selectedReport.executor.passport.selfy_photo\">-</span>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </ng-template>\r\n            </ngb-tab>\r\n            <ngb-tab>\r\n                <ng-template ngbTabTitle>Клиент</ng-template>\r\n                <ng-template ngbTabContent>\r\n                    <div class=\"col-12 pt-3 pb-3\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-6 d-inline-flex align-items-center\">Имя</div>\r\n                            <div class=\"col-6\">{{selectedReport.customer.name}}</div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-6 d-inline-flex align-items-center\">Телефон</div>\r\n                            <div class=\"col-6\">{{selectedReport.customer.phone}}</div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-6 d-inline-flex align-items-center\">Баланс</div>\r\n                            <div class=\"col-6\">{{selectedReport.customer.balance['$numberDecimal']}}</div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-6 d-inline-flex align-items-center\">Бонус баланс</div>\r\n                            <div class=\"col-6\">{{selectedReport.customer.bonus_balance['$numberDecimal']}}</div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-6 d-inline-flex align-items-center\">Статус</div>\r\n                            <div class=\"col-6\">\r\n                                <select class=\"form-control\" [(ngModel)]=\"selectedReport.customer.banned\" disabled>\r\n                                    <option [value]=\"false\">Активен</option>\r\n                                    <option [value]=\"true\">Заблокирован</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </ng-template>\r\n            </ngb-tab>\r\n            <ngb-tab>\r\n                <ng-template ngbTabTitle>Заказ</ng-template>\r\n                <ng-template ngbTabContent>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-12 pt-3 pb-3\">\r\n                            <div class=\"w-100 p-4\">\r\n                                <div class=\"row item_info\">\r\n                                    <div class=\"col-6 d-inline-flex align-items-center\">ID</div>\r\n                                    <div class=\"col-6\">{{selectedReport.order.id}}</div>\r\n                                </div>\r\n                                <div class=\"row item_info\">\r\n                                    <div class=\"col-6 d-inline-flex align-items-center\">Специальность</div>\r\n                                    <div class=\"col-6\">{{selectedReport.order.specialty.name}}</div>\r\n                                </div>\r\n                                <div class=\"row item_info\">\r\n                                    <div class=\"col-6 d-inline-flex align-items-center\">Статус</div>\r\n                                    <div class=\"col-6\">{{getOrderStatus(selectedReport.order)}}</div>\r\n                                </div>\r\n                                <div class=\"row item_info\">\r\n                                    <div class=\"col-6 d-inline-flex align-items-center\">Тип заказа</div>\r\n                                    <div class=\"col-6\">\r\n                                        <span *ngIf=\"selectedReport.order.for_now\">Срочный</span>\r\n                                        <span *ngIf=\"!selectedReport.order.for_now\">Отложенный</span>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"row item_info\" *ngIf=\"!selectedReport.order.for_now\">\r\n                                    <div class=\"col-6 d-inline-flex align-items-center\">Запланированное время</div>\r\n                                    <div class=\"col-6\">{{selectedReport.order.scheduled_time}}</div>\r\n                                </div>\r\n                                <div class=\"row item_info\">\r\n                                    <div  class=\"col-6 d-inline-flex align-items-center\">Место заказа</div>\r\n                                    <div class=\"col-6\">\r\n                                        <span *ngIf=\"selectedReport.order.departure == 'ANY'\">Не определено</span>\r\n                                        <span *ngIf=\"selectedReport.order.departure == 'OFFICE'\">Офис</span>\r\n                                        <span *ngIf=\"selectedReport.order.departure == 'ADDRESS'\">На выезд</span>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"row item_info\">\r\n                                    <div  class=\"col-6 d-inline-flex align-items-center\">Адрес</div>\r\n                                    <div class=\"col-6\">{{selectedReport.order.address.name}}</div>\r\n                                </div>\r\n                                <div class=\"row item_info\">\r\n                                    <div  class=\"col-6 d-inline-flex align-items-center\">Создан</div>\r\n                                    <div class=\"col-6\">{{selectedReport.order.createdAt}}</div>\r\n                                </div>\r\n                                <div class=\"row item_info\">\r\n                                    <div  class=\"col-6 d-inline-flex align-items-center\">Сумма</div>\r\n                                    <div class=\"col-6\">{{selectedReport.order.summ}}</div>\r\n                                </div>\r\n                                <div class=\"row item_info\">\r\n                                    <div  class=\"col-6 d-inline-flex align-items-center\">Тип оплаты</div>\r\n                                    <div class=\"col-6\">\r\n                                        <span *ngIf=\"selectedReport.order.summ_type == 'HOURLY'\">Почасовая</span>\r\n                                        <span *ngIf=\"selectedReport.order.summ_type == 'FIXED'\">Одноразовая</span>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"row item_info\">\r\n                                    <div  class=\"col-6 d-inline-flex align-items-center\">Способ оплаты</div>\r\n                                    <div class=\"col-6\">\r\n                                        <span *ngIf=\"selectedReport.order.payment_type == 'CASH'\">Наличка</span>\r\n                                        <span *ngIf=\"selectedReport.order.payment_type == 'BONUS'\">Бонусный щет</span>\r\n                                        <span *ngIf=\"selectedReport.order.payment_type == 'CARD'\">Карточка</span>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </ng-template>\r\n            </ngb-tab>\r\n        </ngb-tabset>\r\n    </div>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/authorized/reports/reports.component.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/authorized/reports/reports.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "./src/app/authorized/reports/reports-list/reports-list.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/authorized/reports/reports-list/reports-list.component.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".action-icon {\n  cursor: pointer;\n  margin: 10px;\n}\n\n.switch-btn {\n  margin-right: 10px;\n}\n\n.controls i {\n  margin: 0 5px;\n  cursor: pointer;\n}\n\n.controls i:before {\n  font-size: 12px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aG9yaXplZC9yZXBvcnRzL3JlcG9ydHMtbGlzdC9FOlxccHJvamVjdHNcXFhpdENsdWJcXGRqb2ItZW5kcG9pbnRcXGFkbWluL3NyY1xcYXBwXFxhdXRob3JpemVkXFxyZXBvcnRzXFxyZXBvcnRzLWxpc3RcXHJlcG9ydHMtbGlzdC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvYXV0aG9yaXplZC9yZXBvcnRzL3JlcG9ydHMtbGlzdC9yZXBvcnRzLWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxlQUFBO0VBQ0EsWUFBQTtBQ0NKOztBRENBO0VBQ0ksa0JBQUE7QUNFSjs7QURDSTtFQUNJLGFBQUE7RUFDQSxlQUFBO0FDRVI7O0FERFE7RUFDSSxlQUFBO0FDR1oiLCJmaWxlIjoic3JjL2FwcC9hdXRob3JpemVkL3JlcG9ydHMvcmVwb3J0cy1saXN0L3JlcG9ydHMtbGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hY3Rpb24taWNvbntcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIG1hcmdpbjogMTBweDtcclxufVxyXG4uc3dpdGNoLWJ0bntcclxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcclxufVxyXG4uY29udHJvbHN7XHJcbiAgICBpe1xyXG4gICAgICAgIG1hcmdpbjogMCA1cHg7XHJcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgICY6YmVmb3Jle1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIi5hY3Rpb24taWNvbiB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgbWFyZ2luOiAxMHB4O1xufVxuXG4uc3dpdGNoLWJ0biB7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbn1cblxuLmNvbnRyb2xzIGkge1xuICBtYXJnaW46IDAgNXB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uY29udHJvbHMgaTpiZWZvcmUge1xuICBmb250LXNpemU6IDEycHg7XG59Il19 */"

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
//# sourceMappingURL=reports-reports-module-es2015.js.map