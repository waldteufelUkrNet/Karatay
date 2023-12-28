import { Component, OnInit, HostListener} from '@angular/core';
import {OrderService} from '../../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import $ from 'jquery';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
    countShowInPage = 20;
    timeoutLoad;
    timeoutSearch;
    filters;
    sort = {};
    search_phone = '';
    search_id = '';
    range = {
        start: 0,
        limit: this.countShowInPage
    };
    list = [];
    scrollEventActive = false;
    countOrders;

    constructor(
        private orderService: OrderService,
        private modalService: NgbModal,
    ) {}

    ngOnInit() {
        let filters = JSON.parse(localStorage.getItem('ordersFilter'));
        this.filters = filters || {
            status: 'all',
            types: [0,1],
            date_from: moment().add(-14, 'days').format('YYYY-MM-DD HH:mm:ss'),
            date_to: moment().format('YYYY-MM-DD HH:mm:ss')
        };
        localStorage.setItem('ordersFilter', JSON.stringify(this.filters));
        this.refreshOrders();
    }

/*    @HostListener('window:scroll', ['$event']) onScrollEvent($event){
        if(document.body.scrollHeight - window.innerHeight - $(window).scrollTop() < 50){
            clearTimeout(this.timeoutLoad);
            this.timeoutLoad = setTimeout(() => {
                this.scrollEventActive = false;
                this.range.start += this.countShowInPage;
                this.refreshOrders(false);
            }, 1000);
        }
    }*/

    refreshOrders(reinit = true){
        if(reinit){
            this.range.start = 0;
        }

        let options = {
            range: this.range
        };

        if(this.search_phone !== ''){
            options['search_phone'] = this.search_phone;
        }

        if(this.search_id !== ''){
            options['search_id'] = this.search_id;
        }

        if(!this.isEmpty(this.filters)){
            options['filters'] = this.filters;
        }

        if(!this.isEmpty(this.sort)){
            options['sort'] = this.sort;
        }

        this.orderService.getlist(options)
            .then((list: Array<Object>) => {
                if(reinit) {
                    this.countOrders = 0;
                    this.orderService.getlistCount(options)
                        .then(countData => {
                            this.countOrders = countData;
                        })
                }
                this.list = list;
            })
    }

    searchIdRefresh(){
        this.search_phone = '';
        clearTimeout(this.timeoutSearch);
        this.timeoutSearch = setTimeout(() => {
            this.refreshOrders();
        }, 1000);
    }

    searchPhoneRefresh(){
        this.search_id = '';
        clearTimeout(this.timeoutSearch);
        this.timeoutSearch = setTimeout(() => {
            this.refreshOrders();
        }, 1000);
    }

    changeDateFrom(val){
        this.filters.date_from = val;
        localStorage.setItem('ordersFilter', JSON.stringify(this.filters));
        this.refreshOrders();
    }

    changeDateTo(val){
        this.filters.date_to = val;
        localStorage.setItem('ordersFilter', JSON.stringify(this.filters));
        this.refreshOrders();
    }

    changeType(val){
        if(this.filters.types.indexOf(val) !== -1){
            this.filters.types = this.filters.types.filter(_val => val !== _val);
        } else {
            this.filters.types.push(val);
        }
        if(!this.filters.types.length){
            this.filters.types.push(val === 0 ? 1 : 0)
        }

        localStorage.setItem('ordersFilter', JSON.stringify(this.filters));
        this.refreshOrders();
    }

    getOrderStatus(order){
        return this.orderService.getOrderStatus(order);
    }

    isEmpty(arg) {
        for (let item in arg) {
            return false;
        }
        return true;
    }

    pageChanged(event){
        this.range.start = (event - 1) * this.countShowInPage;
        this.refreshOrders(false);
    }
}
