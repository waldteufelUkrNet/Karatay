import { Component, OnInit, HostListener} from '@angular/core';
import {NotificationService, LinkPipe, OrdersService, SpecialitiesService} from '../../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import $ from 'jquery';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-orders-info',
  templateUrl: './orders-info.component.html',
  styleUrls: ['./orders-info.component.scss']
})
export class OrdersInfoComponent implements OnInit {
    order;
    executors;
    offerData;
    defaultExecutor = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private orderService: OrdersService,
        private modalService: NgbModal,
        private link: LinkPipe,
        private notif: NotificationService,
        public specialitiesService: SpecialitiesService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.orderService.getOne(params['id'])
                .then(data => {
                    this.order = data;
                    if(params['executorId'] !== '0'){
                        this.defaultExecutor = params['executorId'];
                    }
                    this.refreshOfferData();
                })
        });
    }

    refreshOfferData(){
        this.offerData = {
            order_id: this.order.id,
            executor_id: this.defaultExecutor,
            summ_type: null,
            summ: null,
            departure: 'ADDRESS',
            address: {
                name: null,
                lat: null,
                lon: null,
                code: null,
                floor: null,
            }
        };
        this.orderService.getExecutorsForOrderOffer(this.order.id)
            .then(exList => {
                this.executors = exList;
            });
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
                    this.notif.showOne('Предложения сохранено!');
                    this.refreshOfferData();
                });
        }
    }
}
