import { Component, OnInit, HostListener} from '@angular/core';
import {SupportService, NotificationService} from '../../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import $ from 'jquery';

@Component({
  selector: 'app-support-list',
  templateUrl: './support-list.component.html',
  styleUrls: ['./support-list.component.scss']
})
export class SupportListComponent implements OnInit {
    countShowInPage = 20;
    timeoutLoad;
    timeoutSearch;
    filters = {
        new: true,
        processed: false
    };
    sort = {};
    search = '';
    range = {
        start: 0,
        limit: this.countShowInPage
    };
    list = [];
    selectedSupport;
    supportCount;

    constructor(
        private supportService: SupportService,
        private modalService: NgbModal,
        private notif: NotificationService
    ) {}

    ngOnInit() {
        this.refreshSupports();
    }

    refreshSupports(reinit = true){
        if(reinit){
            this.range.start = 0;
        }

        let options = {
            range: this.range,
            filter: this.filters
        };

        this.supportService.getlist(options)
            .then((list: Array<Object>) => {
                if(reinit) {
                    this.supportCount = 0;
                    this.supportService.getCount(options)
                        .then(countData => {
                            this.supportCount = countData;
                        })
                }
                this.list = list;
            })
    }

    searchRefresh(){
        clearTimeout(this.timeoutSearch);
        this.timeoutSearch = setTimeout(() => {
            this.refreshSupports();
        }, 1000);
    }

    isEmpty(arg) {
        for (let item in arg) {
            return false;
        }
        return true;
    }

    openSupportDetails(content, support){
            this.selectedSupport = support;
            this.modalService.open(content)
    }


    saveSupport(){
        this.supportService.update(this.selectedSupport.id, this.selectedSupport)
            .then(upData => {
                this.refreshSupports();
                this.modalService.dismissAll();
            })
    }

    changeStatus(){
        this.selectedSupport.status = (!this.selectedSupport.status || parseInt( '' + this.selectedSupport.status) == 0) ? 1 : 0;
    }

    changeStatusFilter(key){
        this.filters[key] = !this.filters[key];
        this.refreshSupports();
    }

    pageChanged(event){
        this.range.start = (event - 1) * this.countShowInPage;
        this.refreshSupports(false);
    }
}
