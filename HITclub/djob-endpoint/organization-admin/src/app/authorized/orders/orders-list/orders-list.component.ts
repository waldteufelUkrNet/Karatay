import { Component, OnInit, HostListener} from '@angular/core';
import {NotificationService, LinkPipe, OrdersService, SpecialitiesService, UserService} from '../../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import $ from 'jquery';
import {Router} from "@angular/router";

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
    countShowInPage = 20;
    timeoutLoad;
    timeoutSearch;
    filters = {
        speciality_ids: [],
        date_from: null,
        date_to: null,
        departure: null
    };
    sort = {};
    search = '';
    range = {
        start: 0,
        limit: this.countShowInPage
    };
    list = [];
    scrollEventActive = false;
    selectedOrder = null;
    executors;
    offerData;
    user;

    constructor(
        private orderService: OrdersService,
        private modalService: NgbModal,
        private router: Router,
        private link: LinkPipe,
        private notif: NotificationService,
        public specialitiesService: SpecialitiesService,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.user = this.userService.getUser();
        if (typeof localStorage !== 'undefined') {
            this.filters.speciality_ids = JSON.parse(localStorage.getItem('speciality_ids'));
            if (!this.filters.speciality_ids) {
                this.filters.speciality_ids = [];
            }
        } else {
            this.filters.speciality_ids = [];
        }
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

        options['speciality_ids'] = '';
        if(!this.isEmpty(this.filters) && this.filters.speciality_ids){
            for(let i=0;i<this.filters.speciality_ids.length;i++){
                options['speciality_ids'] += i === 0 ? this.filters.speciality_ids[i].id : ',' + this.filters.speciality_ids[i].id;
            }
        }

        if(this.filters.departure)
            options['departure'] = this.filters.departure;

        if(this.filters.date_to)
            options['date_to'] = this.filters.date_to;

        if(this.filters.date_from)
            options['date_from'] = this.filters.date_from;

        if(!this.isEmpty(this.sort)){
            options['sort'] = this.sort;
        }

        this.orderService.getOrdersForOffer(options)
            .then((list: Array<Object>) => {
                console.log('111: ', list);

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

    createOrderOffer(){
        console.log('!!!!!!!!!!!: ', this.offerData);

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

    deleteSpecialityFromFilter(speciality){
        this.filters.speciality_ids = this.filters.speciality_ids.filter(_item => _item != speciality);
        localStorage.setItem('speciality_ids', JSON.stringify(this.filters.speciality_ids));
        this.refreshOrders();
    }

    changeSpeciality(event){
        if(event.changed) {
            this.filters.speciality_ids.push({
                id: event.value,
                name: event.name
            });
            localStorage.setItem('speciality_ids', JSON.stringify(this.filters.speciality_ids));
            this.refreshOrders();
        }
    }

    openOrder(content, order){
        this.executors = [];
        this.selectedOrder = order;
        this.orderService.getExecutorsForOrderOffer(this.selectedOrder.id)
            .then(exList => {
                this.executors = exList;
            });
        this.modalService.open(content)
    }

    openOffer(content){
        this.modalService.dismissAll();
        this.offerData = {
            order_id: this.selectedOrder.id,
            organization_id: this.user.id,
            executor_id: null,
            summ_type: null,
            summ: null,
            departure: this.selectedOrder.departure === 'ANY' ?  null : this.selectedOrder.departure,
            address: null
        };
        this.modalService.open(content)
    }

    getExecutorOffice(executor_id){
        let resp = '';

        if(this.executors.length){
            for(let i=0;i<this.executors.length;i++){
                if(this.executors[i].id == executor_id){
                    if(this.executors[i].office){
                        this.offerData.address = this.executors[i].office;
                        resp = this.executors[i].office.name + ', ' + this.executors[i].office.front + ', ' + this.executors[i].office.floor
                    }
                }
            }
        }

        return resp;
    }

    closeModal(){
        this.modalService.dismissAll();
    }

    changeDateFrom(event){
        this.filters.date_from = event;
        this.refreshOrders();
    }

    changeDateTo(event){
        this.filters.date_to = event;
        this.refreshOrders();
    }
}
