import { Component, OnInit, HostListener} from '@angular/core';
import {ExecutorService, NotificationService} from '../../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import $ from 'jquery';

@Component({
  selector: 'app-executors-list',
  templateUrl: './executors-list.component.html',
  styleUrls: ['./executors-list.component.scss']
})
export class ExecutorsListComponent implements OnInit {
    countShowInPage = 20;
    timeoutLoad;
    timeoutSearch;
    filters = {
        registered_passport: true,
        registered_wait: true,
        registered_activate: true,
        registered_declined: true
    };
    sort = {};
    search = '';
    range = {
        start: 0,
        limit: this.countShowInPage
    };
    list = [];
    selectedExecutor;
    countExecutors;

    constructor(
        private executorService: ExecutorService,
        private modalService: NgbModal,
        private notif: NotificationService
    ) {}

    ngOnInit() {
        this.refreshExecutors();
    }

    refreshExecutors(reinit = true){
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

        this.executorService.getlist(options)
            .then((list: Array<Object>) => {
                if(reinit) {
                    this.countExecutors = 0;
                    this.executorService.getCount(options)
                        .then(countData => {
                            this.countExecutors = countData;
                        })
                }
                this.list = list;
            })
    }

    searchRefresh(){
        clearTimeout(this.timeoutSearch);
        this.timeoutSearch = setTimeout(() => {
            this.refreshExecutors();
        }, 1000);
    }

    isEmpty(arg) {
        for (let item in arg) {
            return false;
        }
        return true;
    }

    openExecutorDetails(content, customer){
        this.selectedExecutor = customer;
        this.modalService.open(content)
    }

    saveExecutor(){
        let sendAccess = true;
        if(this.selectedExecutor.registered == -1 && (!this.selectedExecutor.reject_reason || this.selectedExecutor.reject_reason === '')){
            sendAccess = false;
            this.notif.showOne('Введите причину отказа', 'warning');
        }

        if(sendAccess){
            this.executorService.update(this.selectedExecutor.id, {registered: this.selectedExecutor.registered, reject_reason: this.selectedExecutor.reject_reason})
                .then(upData => {
                    this.modalService.dismissAll();
                })
        }
    }

    changeFilter(key){
        this.filters[key] = !this.filters[key];
        this.refreshExecutors();
    }

    pageChanged(event){
        this.range.start = (event - 1) * this.countShowInPage;
        this.refreshExecutors(false);
    }
}
