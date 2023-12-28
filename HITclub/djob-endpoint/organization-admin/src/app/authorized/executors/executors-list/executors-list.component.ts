import { Component, OnInit, HostListener} from '@angular/core';
import {ExecutorService, NotificationService, LinkPipe} from '../../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import $ from 'jquery';
import {Router} from "@angular/router";

@Component({
  selector: 'app-executors-list',
  templateUrl: './executors-list.component.html',
  styleUrls: ['./executors-list.component.scss']
})
export class ExecutorsListComponent implements OnInit {
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
    newExecutor;

    constructor(
        private executorService: ExecutorService,
        private modalService: NgbModal,
        private router: Router,
        private link: LinkPipe,
        private notif: NotificationService
    ) {}

    ngOnInit() {
        this.refreshExecutors();
    }

    @HostListener('window:scroll', ['$event']) onScrollEvent($event){
        if(document.body.scrollHeight - window.innerHeight - $(window).scrollTop() < 50){
            clearTimeout(this.timeoutLoad);
            this.timeoutLoad = setTimeout(() => {
                this.scrollEventActive = false;
                this.range.start += this.countShowInPage;
                this.refreshExecutors(false);
            }, 1000);
        }
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
            this.refreshExecutors();
        }, 1000);
    }

    isEmpty(arg) {
        for (let item in arg) {
            return false;
        }
        return true;
    }

    openExecutorForm(content){
        this.newExecutor = {
            phone: null,
            info: null
        };
        this.modalService.open(content)
    }

    inviteExecutor(){
        this.executorService.inviteExecutor(this.newExecutor.info.id)
            .then(executorData => {
                this.refreshExecutors();
                this.modalService.dismissAll();
            })
    }

    checkPhone(){
        this.executorService.checkPhone(this.newExecutor.phone)
            .then(executorData => {
                if(executorData){
                    this.newExecutor.info = {
                        id: executorData['id']
                    };
                } else {
                    this.modalService.dismissAll();
                    this.router.navigate([this.link.transform('/executors/info/0')], { queryParams: {phone: this.newExecutor.phone}});
                }
            })
    }
}
