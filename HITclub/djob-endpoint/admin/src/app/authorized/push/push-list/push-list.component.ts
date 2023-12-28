import { Component, OnInit, HostListener} from '@angular/core';
import {NotificationService, PushService} from '../../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import $ from 'jquery';

@Component({
  selector: 'app-push-list',
  templateUrl: './push-list.component.html',
  styleUrls: ['./push-list.component.scss']
})
export class PushListComponent implements OnInit {
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
    scrollEventActive = false;
    newPush;
    countPush;

    constructor(
        private pushService: PushService,
        private modalService: NgbModal,
        private notif: NotificationService
    ) {}

    ngOnInit() {
        this.refreshPushList();
    }

    refreshPushList(reinit = true){
        if(reinit){
            this.range.start = 0;
        }

        let options = {
            range: this.range
        };

        if(this.search !== ''){
            options['search'] = this.search;
        }

        this.pushService.getlist(options)
            .then((list: Array<Object>) => {
                if(reinit) {
                    this.countPush = 0;
                    this.pushService.getCount(options)
                        .then(countData => {
                            this.countPush = countData;
                        })
                }
                this.list = list;
            })
    }

    searchRefresh(){
        clearTimeout(this.timeoutSearch);
        this.timeoutSearch = setTimeout(() => {
            this.refreshPushList();
        }, 1000);
    }

    isEmpty(arg) {
        for (let item in arg) {
            return false;
        }
        return true;
    }

    openPushModal(content, item=null){
        this.newPush = item ? {
            type: item.sub_type,
            text: item.text
        } : {
            type: 'ALL',
            text: ''
        };

        console.log({item: this.newPush});

        this.modalService.open(content)
    }

    sendPush(){
        this.pushService.create(this.newPush)
            .then(cData => {
                this.modalService.dismissAll();
            })
    }

    pageChanged(event){
        this.range.start = (event - 1) * this.countShowInPage;
        this.refreshPushList(false);
    }
}
