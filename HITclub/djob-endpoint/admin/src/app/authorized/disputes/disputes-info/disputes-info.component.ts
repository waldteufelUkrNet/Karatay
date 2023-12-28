import { Component, OnInit} from '@angular/core';
import {DisputesService, OrderService, NotificationService} from '../../../shared';
import {ActivatedRoute, Router} from "@angular/router";
import  * as moment from 'moment';

@Component({
  selector: 'app-disputes-info',
  templateUrl: './disputes-info.component.html',
  styleUrls: ['./disputes-info.component.scss']
})
export class DisputesInfoComponent implements OnInit {
    order;
    orderHistory;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private orderService: OrderService,
        private disputesService: DisputesService,
        private notif: NotificationService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.orderService.getOne(params['id'])
                .then(data => {
                    this.order = data;

                    console.log('------------------- order ---------------------: ', this.order);

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
