import { Component, OnInit, HostListener} from '@angular/core';
import {NotificationService, LinkPipe, OrdersService, SpecialitiesService} from '../../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import $ from 'jquery';
import {Router} from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
    countShowInPage = 20;
    timeoutLoad;
    timeoutSearch;
    filters = {
        waiting: true,
        accepted: true,
        declined: true
    };
    sort = {};
    search = '';
    range = {
        start: 0,
        limit: this.countShowInPage
    };
    list = [];
    scrollEventActive = false;
    selectedItem;
    executors;
    offerData;

    constructor(
        private orderService: OrdersService,
        private modalService: NgbModal,
        private router: Router,
        private link: LinkPipe,
        private notif: NotificationService,
        public specialitiesService: SpecialitiesService
    ) {}

    ngOnInit() {
        this.refreshOrders();
    }

    @HostListener('window:scroll', ['$event']) onScrollEvent($event){
        if(document.body.scrollHeight - window.innerHeight - $(window).scrollTop() < 50){
            clearTimeout(this.timeoutLoad);
            this.timeoutLoad = setTimeout(() => {
                this.scrollEventActive = false;
                this.range.start += this.countShowInPage;
                this.refreshOrders(false);
            }, 1000);
        }
    }

    refreshOrders(reinit = true){
        if(reinit){
            this.range.start = 0;
        }

        let options = {
            range: this.range
        };

        if(this.search !== ''){
            options['search'] = this.search;
        }

        if(!this.isEmpty(this.sort)){
            options['sort'] = this.sort;
        }

        if(this.filters.accepted || this.filters.declined || this.filters.waiting) {
            options['filters'] = {
                status: []
            };

            if(this.filters.accepted)
                options['filters'].status.push('ACCEPTED');

            if(this.filters.declined)
                options['filters'].status.push('DECLINED');

            if(this.filters.waiting)
                options['filters'].status.push('WAITING');
        }

        this.orderService.getHistory(options)
            .then((list: Array<Object>) => {
                if(reinit) {
                    this.list = [];
                }
                this.list = this.list.concat(list);

                if(list.length){
                    this.scrollEventActive = true;
                }
            })
    }

    searchRefresh(){
        clearTimeout(this.timeoutSearch);
        this.timeoutSearch = setTimeout(() => {
            this.refreshOrders();
        }, 1000);
    }

    isEmpty(arg) {
        for (let item in arg) {
            return false;
        }
        return true;
    }

    getOrderStatus(order){
        return this.orderService.getOrderStatus(order);
    }

    openOrderForm(content, order){
        this.selectedItem = order;
        this.orderService.getOrderHistory(this.selectedItem.order.id)
            .then((hlist: Array<any>) => {
                this.selectedItem.history = [];
                for(let i=0;i<hlist.length;i++){
                    this.selectedItem.history.push({
                        date: moment(hlist[i].createdAt).format('HH:mm:ss'),
                        text: hlist[i].text
                    })
                }
            });
        this.modalService.open(content)
    }

    createOrderOffer(){
        let sendAccess = true;
        if(!this.offerData.executor_id){
            sendAccess = false;
            this.notif.showOne('Выберите исполнителя', 'warning')
        }
        if(sendAccess && !this.offerData.summ_type){
            sendAccess = false;
            this.notif.showOne('Выберите тип оплаты', 'warning')
        }
        if(sendAccess && !this.offerData.summ){
            sendAccess = false;
            this.notif.showOne('Выберите сумму', 'warning')
        }
        if(sendAccess && this.offerData.departure == 'OFFICE' && (!this.offerData.address.name || !this.offerData.address.code || !this.offerData.address.floor || !this.offerData.address.lat || !this.offerData.address.lon)){
            sendAccess = false;
            this.notif.showOne('Заполните все поля адреса офиса', 'warning')
        }

        if(sendAccess){
            this.orderService.createOrderOffer(this.offerData)
                .then(st => {
                    this.modalService.dismissAll();
                });
        }
    }

    changeFilter(key){
        this.filters[key] = this.filters[key] == 1 ? 0: 1;
        this.refreshOrders();
    }

}
