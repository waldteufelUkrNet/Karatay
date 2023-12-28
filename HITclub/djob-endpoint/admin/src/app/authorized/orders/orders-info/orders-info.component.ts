import { Component, OnInit} from '@angular/core';
import {OrderService, NotificationService} from '../../../shared';
import {ActivatedRoute, Router} from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: 'app-orders-info',
  templateUrl: './orders-info.component.html',
  styleUrls: ['./orders-info.component.scss']
})
export class OrdersInfoComponent implements OnInit {
    order;
    orderHistory;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private orderService: OrderService,
        private notif: NotificationService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.orderService.getOne(params['id'])
                .then(data => {
                    this.order = data;

                    this.orderService.getOrderHistory(this.order.id)
                        .then((history: Array<any>) => {
                            this.orderHistory = [];
                            for(let i=0;i<history.length;i++){
                                this.orderHistory.push({
                                    date: moment(history[i].createdAt).format('HH:mm:ss'),
                                    text: history[i].text
                                })
                            }
                        })
                });
        });
    }

    getOrderStatus(order){
        return this.orderService.getOrderStatus(order);
    }
}
