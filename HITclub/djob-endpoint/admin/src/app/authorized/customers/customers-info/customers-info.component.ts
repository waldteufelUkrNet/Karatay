import { Component, OnInit} from '@angular/core';
import {CustomerService, NotificationService, PushService} from '../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-customers-info',
  templateUrl: './customers-info.component.html',
  styleUrls: ['./customers-info.component.scss']
})
export class CustomersInfoComponent implements OnInit {
    customer;
    orderHistory;
    referralHistory;
    financialBalanceHistory;
    financialBonusHistory;
    financialCardHistory;
    financialAdminHistory;
    financialOperation = null;
    financialOperationError = null;
    orderHistoryParams = {
        customer_id: null,
        start: 0,
        limit: 20
    };
    referralHistoryParams = {
        customer_id: null,
        start: 0,
        limit: 20
    };
    financialBalanceHistoryParams = {
        customer_id: null,
        type: 'BALANCE',
        start: 0,
        limit: 20
    };
    financialBonusHistoryParams = {
        customer_id: null,
        type: 'BONUS',
        start: 0,
        limit: 20
    };
    financialCardHistoryParams = {
        customer_id: null,
        type: 'PAYMENT',
        start: 0,
        limit: 20
    };
    financialAdminHistoryParams = {
        customer_id: null,
        type: 'ADMIN',
        start: 0,
        limit: 20
    };
    ohloadMore = true;
    rhloadMore = true;
    fhbalanceloadMore = true;
    fhbonusloadMore = true;
    fhcardloadMore = true;
    fhadminloadMore = true;
    pushMessage = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService,
        private pushService: PushService,
        private notif: NotificationService,
        private modalService: NgbModal
    ) {}

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
                        .then((ohData: Array<any>) => {
                            this.orderHistory = ohData;
                            if(!ohData.length){
                                this.ohloadMore = false;
                            }
                        });

                    this.customerService.getReferralHistory(this.referralHistoryParams)
                        .then((rhData: Array<any>) => {
                            this.referralHistory = rhData;
                            if(!rhData.length){
                                this.rhloadMore = false;
                            }
                        });


                    this.customerService.getFinancialHistory(this.financialBalanceHistoryParams)
                        .then((fhData: Array<any>) => {
                            this.financialBalanceHistory = fhData;
                            if(!fhData.length){
                                this.fhbalanceloadMore = false;
                            }
                        });

                    this.customerService.getFinancialHistory(this.financialBonusHistoryParams)
                        .then((fhData: Array<any>) => {
                            this.financialBonusHistory = fhData;
                            if(!fhData.length){
                                this.fhbonusloadMore = false;
                            }
                        });

                    this.customerService.getFinancialHistory(this.financialCardHistoryParams)
                        .then((fhData: Array<any>) => {
                            this.financialCardHistory = fhData;
                            if(!fhData.length){
                                this.fhcardloadMore = false;
                            }
                        });

                    this.customerService.getFinancialHistory(this.financialAdminHistoryParams)
                        .then((fhData: Array<any>) => {
                            this.financialAdminHistory = fhData;
                            if(!fhData.length){
                                this.fhadminloadMore = false;
                            }
                        });
                });
        });
    }

    loadMoreOrderHistory(){
        this.orderHistoryParams.start += this.orderHistoryParams.limit;
        this.customerService.getOrderHistory(this.orderHistoryParams)
            .then((ohData: Array<any>) => {
                this.orderHistory = this.orderHistory.concat(ohData);
                if(!ohData.length){
                    this.ohloadMore = false;
                }
            });
    }

    loadMoreReferralHistory(){
        this.referralHistoryParams.start += this.referralHistoryParams.limit;
        this.customerService.getReferralHistory(this.referralHistoryParams)
            .then((rhData: Array<any>) => {
                this.referralHistory = this.referralHistory.concat(rhData);
                if(!rhData.length){
                    this.rhloadMore = false;
                }
            });
    }

    loadMoreFinancialBalanceHistory(){
        this.financialBalanceHistoryParams.start += this.financialBalanceHistoryParams.limit;
        this.customerService.getFinancialHistory(this.financialBalanceHistoryParams)
            .then((fhData: Array<any>) => {
                this.financialBalanceHistory = this.financialBalanceHistory.join(fhData);
                if(!fhData.length){
                    this.fhbalanceloadMore = false;
                }
            });
    }

    loadMoreFinancialBonusHistory(){
        this.financialBonusHistoryParams.start += this.financialBonusHistoryParams.limit;
        this.customerService.getFinancialHistory(this.financialBonusHistoryParams)
            .then((fhData: Array<any>) => {
                this.financialBonusHistory = this.financialBonusHistory.join(fhData);
                if(!fhData.length){
                    this.fhbonusloadMore = false;
                }
            });
    }

    loadMoreFinancialCardHistory(){
        this.financialCardHistoryParams.start += this.financialCardHistoryParams.limit;
        this.customerService.getFinancialHistory(this.financialCardHistoryParams)
            .then((fhData: Array<any>) => {
                this.financialCardHistory = this.financialCardHistory.join(fhData);
                if(!fhData.length){
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

    getFinancialInfo(item){
        let res_str = '';
        if(item.type === 'PAYMENT' || item.type === 'REFILL')
            res_str = 'Пополнения счета';

        if(item.type === 'REFERRAL')
            res_str = 'Перевод с накопительного баланса';

        if(item.type === 'ORDER'){
            if(item.summ > 0){
                res_str = 'Вознаграждения за выполненный заказ №' + item.order_id;
            } else {
                res_str = 'Знятии коммиссии за выполненный заказ №' + item.order_id;
            }
        }

        if(item.type === 'TRANSFER')
            res_str = 'Заказ №' + item.order_id + ' отправлено на кошелек №' + item.info;

        if(item.type === 'PROMO')
            res_str = 'Активация промо кода "' + item.info + '"';

        return res_str;
    }

    saveCustomer(){
        this.customerService.update(this.customer.id, {banned: this.customer.banned})
            .then(upData => {
                this.notif.showOne('Сохранено!')
            })
    }

    loadMoreFinancialAdminHistory(refresh = false){
        if(!refresh)
            this.financialAdminHistoryParams.start += this.financialAdminHistoryParams.limit;
        else
            this.financialAdminHistoryParams.start = 0;

        this.customerService.getFinancialHistory(this.financialAdminHistoryParams)
            .then((fhData: Array<any>) => {
                this.financialAdminHistory = this.financialAdminHistory.join(fhData);
                if(!fhData.length){
                    this.fhadminloadMore = false;
                }
            });
    }

    openFinancialForm(content){
        this.financialOperation = {
            executor_id: this.customer.id,
            balance_type: null,
            summ: null,
            info: ''
        };
        this.modalService.open(content)
    }

    saveFinancialOperation(){
        if(!this.financialOperation.balance_type || !this.financialOperation.summ || !this.financialOperation.info){
            this.financialOperationError = 'Заполните пожалуйста все поля';
            setTimeout(() => {
                this.financialOperationError = null;
            }, 3000);
            return;
        } else {
            this.customerService.addFinancialOperation({customer_id: this.customer.id, balance_type: this.financialOperation.balance_type, summ: this.financialOperation.summ, info: this.financialOperation.info })
                .then(upData => {
                    this.notif.showOne('Сохранено!');
                    this.loadMoreFinancialAdminHistory(true);
                    this.modalService.dismissAll();
                    this.customerService.getOne(this.customer.id)
                        .then(data => {
                            this.customer = data;
                        })
                })
        }
    }

    sendPersonalPush(){
        this.pushService.createPersonal({user_id: this.customer.id, user_type: 'CUSTOMER', text: this.pushMessage })
            .then(upData => {
                this.pushMessage = '';
            })
    }
}
