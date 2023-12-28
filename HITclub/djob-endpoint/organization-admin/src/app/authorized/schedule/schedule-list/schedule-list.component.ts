import { Component, OnInit, HostListener} from '@angular/core';
import {NotificationService, LinkPipe, OrdersService, SpecialitiesService, UserService} from '../../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import $ from 'jquery';
import {Router} from "@angular/router";

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {
    countShowInPage = 100;
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
        this.refreshSchedule();
    }

    refreshSchedule(reinit = true){
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

        this.orderService.getSchedules(options)
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
            this.refreshSchedule();
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

    changeSpeciality(event){
        if(event.changed) {
            this.filters.speciality_ids.push({
                id: event.value,
                name: event.name
            });
            localStorage.setItem('speciality_ids', JSON.stringify(this.filters.speciality_ids));
            this.refreshSchedule();
        }
    }

    openOrder(content, order){
        this.executors = [];
        this.selectedOrder = order;
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

    declineOrder(){
        this.orderService.cancelOrder(this.selectedOrder.id)
            .then(cancData => {
                this.modalService.dismissAll();
            })
    }

    changeDateFrom(event){
        this.filters.date_from = event;
        this.refreshSchedule();
    }

    changeDateTo(event){
        this.filters.date_to = event;
        this.refreshSchedule();
    }
}
