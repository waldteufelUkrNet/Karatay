import { Component, OnInit, HostListener} from '@angular/core';
import {DisputesService, NotificationService, OrderService} from '../../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import $ from 'jquery';

@Component({
  selector: 'app-disputes-list',
  templateUrl: './disputes-list.component.html',
  styleUrls: ['./disputes-list.component.scss']
})
export class DisputesListComponent implements OnInit {
    countShowInPage = 20;
    timeoutLoad;
    timeoutSearch;
    sort = {};
    search_phone = '';
    filters;
    range = {
        start: 0,
        limit: this.countShowInPage
    };
    list = [];
    scrollEventActive = false;
    selectedDispute;
    orderHistory;
    countDisputes;

    constructor(
        private disputesService: DisputesService,
        private modalService: NgbModal,
        private orderService: OrderService
    ) {}

    ngOnInit() {
        let filters = JSON.parse(localStorage.getItem('disputesFilter'));
        this.filters = filters || {
            types: [0,1],
            date_from: moment().add(-14, 'days').format('YYYY-MM-DD HH:mm:ss'),
            date_to: moment().format('YYYY-MM-DD HH:mm:ss')
        };
        localStorage.setItem('disputesFilter', JSON.stringify(this.filters));
        this.refreshDisputes();
    }

    refreshDisputes(reinit = true){
        if(reinit){
            this.range.start = 0;
        }

        let options = {
            range: this.range
        };

        if(this.search_phone !== ''){
            options['search_phone'] = this.search_phone;
        }

        if(!this.isEmpty(this.filters)){
            options['filters'] = this.filters;
        }

        if(!this.isEmpty(this.sort)){
            options['sort'] = this.sort;
        }

        this.disputesService.getlist(options)
            .then((list: Array<Object>) => {
                if(reinit) {
                    this.countDisputes = 0;
                    this.disputesService.getCount(options)
                        .then(countData => {
                            this.countDisputes = countData;
                        })
                }
                this.list = list;
            })
    }


    searchPhoneRefresh(){
        clearTimeout(this.timeoutSearch);
        this.timeoutSearch = setTimeout(() => {
            this.refreshDisputes();
        }, 1000);
    }

    changeDateFrom(val){
        this.filters.date_from = val;
        localStorage.setItem('disputesFilter', JSON.stringify(this.filters));
        this.refreshDisputes();
    }

    changeDateTo(val){
        this.filters.date_to = val;
        localStorage.setItem('disputesFilter', JSON.stringify(this.filters));
        this.refreshDisputes();
    }

    isEmpty(arg) {
        for (let item in arg) {
            return false;
        }
        return true;
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

        localStorage.setItem('disputesFilter', JSON.stringify(this.filters));
        this.refreshDisputes();
    }

    pageChanged(event){
        this.range.start = (event - 1) * this.countShowInPage;
        this.refreshDisputes(false);
    }
}
