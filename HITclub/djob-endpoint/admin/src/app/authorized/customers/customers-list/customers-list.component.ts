import { Component, OnInit, HostListener} from '@angular/core';
import {CustomerService} from '../../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import $ from 'jquery';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
    countShowInPage = 20;
    timeoutLoad;
    timeoutSearch;
    filters = {};
    sort = {};
    search = '';
    range = {
        start: 0,
        limit: this.countShowInPage
    };
    list = [];
    selectedCustomer;
    countCustomers;

    constructor(
        private customerService: CustomerService,
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        this.refreshCustomers();
    }

    refreshCustomers(reinit = true){
        if(reinit){
            this.range.start = 0;
        }

        let options = {
            range: this.range
        };

        if(this.search !== ''){
            options['search'] = this.search;
        }

        if(!this.isEmpty(this.filters)){
            options['filters'] = this.filters;
        }

        if(!this.isEmpty(this.sort)){
            options['sort'] = this.sort;
        }

        this.customerService.getlist(options)
            .then((list: Array<Object>) => {
                if(reinit) {
                    this.countCustomers = 0;
                    this.customerService.getCount(options)
                        .then(countData => {
                            this.countCustomers = countData;
                        })
                }
                this.list = list;
            })
    }

    searchRefresh(){
        clearTimeout(this.timeoutSearch);
        this.timeoutSearch = setTimeout(() => {
            this.refreshCustomers();
        }, 1000);
    }

    isEmpty(arg) {
        for (let item in arg) {
            return false;
        }
        return true;
    }

    openCustomerDetails(content, customer){
        this.selectedCustomer = customer;
        this.modalService.open(content)
    }

    saveCustomer(){
        console.log('0001: ', this.selectedCustomer);
        this.customerService.update(this.selectedCustomer.id, {banned: this.selectedCustomer.banned})
            .then(upData => {
                this.modalService.dismissAll();
            })
    }

    pageChanged(event){
        this.range.start = (event - 1) * this.countShowInPage;
        this.refreshCustomers(false);
    }
}
