import { Component, OnInit} from '@angular/core';
import {ExecutorService, NotificationService, PushService} from '../../../shared';
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-executors-info',
  templateUrl: './executors-info.component.html',
  styleUrls: ['./executors-info.component.scss']
})
export class ExecutorsInfoComponent implements OnInit {
    executor;
    orderHistory;
    referralHistory;
    financialBalanceHistory;
    financialOperation = null;
    financialBonusHistory;
    financialAdminHistory;
    financialOperationError = null;
    financialCardHistory;
    orderHistoryParams = {
        executor_id: null,
        start: 0,
        limit: 20
    };
    referralHistoryParams = {
        executor_id: null,
        start: 0,
        limit: 20
    };
    financialBalanceHistoryParams = {
        executor_id: null,
        type: 'BALANCE',
        start: 0,
        limit: 20
    };
    financialBonusHistoryParams = {
        executor_id: null,
        type: 'BONUS',
        start: 0,
        limit: 20
    };
    financialAdminHistoryParams = {
        executor_id: null,
        type: 'ADMIN',
        start: 0,
        limit: 20
    };
    financialCardHistoryParams = {
        executor_id: null,
        type: 'TRANSFER',
        start: 0,
        limit: 20
    };
    ohloadMore = true;
    rhloadMore = true;
    fhbalanceloadMore = true;
    fhbonusloadMore = true;
    fhadminloadMore = true;
    fhcardloadMore = true;
    pushMessage = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private executorService: ExecutorService,
        private pushService: PushService,
        private notif: NotificationService,
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.executorService.getOne(params['id'])
                .then(data => {
                    this.executor = data;
                    this.orderHistoryParams.executor_id = this.executor.id;
                    this.referralHistoryParams.executor_id = this.executor.id;
                    this.financialBalanceHistoryParams.executor_id = this.executor.id;
                    this.financialBonusHistoryParams.executor_id = this.executor.id;
                    this.financialCardHistoryParams.executor_id = this.executor.id;
                    this.financialAdminHistoryParams.executor_id = this.executor.id;

                    this.executorService.getOrderHistory(this.orderHistoryParams)
                        .then((ohData: Array<any>) => {
                            this.orderHistory = ohData;
                            if(!ohData.length){
                                this.ohloadMore = false;
                            }
                        });

                    this.executorService.getReferralHistory(this.referralHistoryParams)
                        .then((rhData: Array<any>) => {
                            this.referralHistory = rhData;
                            if(!rhData.length){
                                this.rhloadMore = false;
                            }
                        });

                    this.executorService.getFinancialHistory(this.financialBalanceHistoryParams)
                        .then((fhData: Array<any>) => {
                            this.financialBalanceHistory = fhData;
                            if(!fhData.length){
                                this.fhbalanceloadMore = false;
                            }
                        });

                    this.executorService.getFinancialHistory(this.financialAdminHistoryParams)
                        .then((fhData: Array<any>) => {
                            this.financialAdminHistory = fhData;
                            if(!fhData.length){
                                this.fhadminloadMore = false;
                            }
                        });

                    this.executorService.getFinancialHistory(this.financialCardHistoryParams)
                        .then((fhData: Array<any>) => {
                            this.financialCardHistory = fhData;
                            if(!fhData.length){
                                this.fhcardloadMore = false;
                            }
                        });
                });
        });
    }

    loadMoreOrderHistory(){
        this.orderHistoryParams.start += this.orderHistoryParams.limit;
        this.executorService.getOrderHistory(this.orderHistoryParams)
            .then((ohData: Array<any>) => {
                this.orderHistory = this.orderHistory.concat(ohData);
                if(!ohData.length){
                    this.ohloadMore = false;
                }
            });
    }

    loadMoreReferralHistory(){
        this.referralHistoryParams.start += this.referralHistoryParams.limit;
        this.executorService.getReferralHistory(this.referralHistoryParams)
            .then((rhData: Array<any>) => {
                this.referralHistory = this.referralHistory.concat(rhData);
                if(!rhData.length){
                    this.rhloadMore = false;
                }
            });
    }

    loadMoreFinancialBalanceHistory(){
        this.financialBalanceHistoryParams.start += this.financialBalanceHistoryParams.limit;
        this.executorService.getFinancialHistory(this.financialBalanceHistoryParams)
            .then((fhData: Array<any>) => {
                this.financialBalanceHistory = this.financialBalanceHistory.concat(fhData);
                if(!fhData.length){
                    this.fhbalanceloadMore = false;
                }
            });
    }

    loadMoreFinancialAdminHistory(refresh = false){
        if(!refresh)
            this.financialAdminHistoryParams.start += this.financialAdminHistoryParams.limit;
        else
            this.financialAdminHistoryParams.start = 0;

        this.executorService.getFinancialHistory(this.financialAdminHistoryParams)
            .then((fhData: Array<any>) => {
                this.financialAdminHistory = fhData;
                if(!fhData.length){
                    this.fhadminloadMore = false;
                }
            });
    }

    loadMoreFinancialBonusHistory(){
        this.financialBonusHistoryParams.start += this.financialBonusHistoryParams.limit;
        this.executorService.getFinancialHistory(this.financialBonusHistoryParams)
            .then((fhData: Array<any>) => {
                this.financialBonusHistory = this.financialBonusHistory.concat(fhData);
                if(!fhData.length){
                    this.fhbonusloadMore = false;
                }
            });
    }

    loadMoreFinancialCardHistory(){
        this.financialCardHistoryParams.start += this.financialCardHistoryParams.limit;
        this.executorService.getFinancialHistory(this.financialCardHistoryParams)
            .then((fhData: Array<any>) => {
                this.financialCardHistory = this.financialCardHistory.concat(fhData);
                if(!fhData.length){
                    this.fhcardloadMore = false;
                }
            });
    }

    getOrderStatus(status) {
        if (parseInt('' + status) < 100)
            return "В процессе";
        if (parseInt('' + status) === 100)
            return "Успешно завершен";
        if (parseInt('' + status) > 100)
            return "Отменен";

        return "-";
    }

    saveExecutor(){
        let sendAccess = true;
        if(this.executor.registered == -1 && (!this.executor.reject_reason || this.executor.reject_reason === '')){
            sendAccess = false;
            this.notif.showOne('Введите причину отказа', 'warning');
        }

        if(sendAccess){
            this.executorService.update(this.executor.id, {registered: this.executor.registered, reject_reason: this.executor.reject_reason})
                .then(upData => {
                    this.notif.showOne('Сохранено!')
                })
        }
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

    openFinancialForm(content){
        this.financialOperation = {
            executor_id: this.executor.id,
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
            this.executorService.addFinancialOperation({executor_id: this.executor.id, balance_type: this.financialOperation.balance_type, summ: this.financialOperation.summ, info: this.financialOperation.info })
                .then(upData => {
                    this.notif.showOne('Сохранено!');
                    this.loadMoreFinancialAdminHistory(true);
                    this.modalService.dismissAll();
                    this.executorService.getOne(this.executor.id)
                        .then(data => {
                            this.executor = data;
                        })
                })
        }
    }

    sendPersonalPush(){
        this.pushService.createPersonal({user_id: this.executor.id, user_type: 'EXECUTOR', text: this.pushMessage })
            .then(upData => {
                this.pushMessage = '';
            })
    }
}
