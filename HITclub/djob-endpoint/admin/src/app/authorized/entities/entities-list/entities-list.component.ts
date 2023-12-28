import { Component, OnInit, HostListener} from '@angular/core';
import {EntitiesService, NotificationService} from '../../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import $ from 'jquery';
import * as moment from 'moment';

@Component({
  selector: 'app-entities-list',
  templateUrl: './entities-list.component.html',
  styleUrls: ['./entities-list.component.scss']
})
export class EntitiesListComponent implements OnInit {
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
    selectedEntity;
    countEntities;
    isAddExecutorRowVisible = false;

    constructor(
        private entitiesService: EntitiesService,
        private modalService: NgbModal,
        private notif: NotificationService
    ) {}

    ngOnInit() {
        this.refreshEntities();
    }

    refreshEntities(reinit = true){
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

        this.entitiesService.getlist(options)
            .then((list: Array<Object>) => {
                if(reinit) {
                    this.countEntities = 0;
                    this.entitiesService.getCount(options)
                        .then(countData => {
                            this.countEntities = countData;
                        })
                }
                this.list = list;
            })
    }

    searchRefresh(){
        clearTimeout(this.timeoutSearch);
        this.timeoutSearch = setTimeout(() => {
            this.refreshEntities();
        }, 1000);
    }

    isEmpty(arg) {
        for (let item in arg) {
            return false;
        }
        return true;
    }

    openEntityDetails(content, entity = null){
        if(entity){
            this.selectedEntity = entity;
            this.entitiesService.getExecutors(this.selectedEntity.id)
                .then(executorsList => {
                    this.selectedEntity.executors = executorsList;
                    this.selectedEntity.password = '******';
                    this.modalService.open(content)
                })
        } else {
            this.selectedEntity = {
                name: '',
                email: '',
                phone: '',
                balance: 0,
                code: '',
                password: '',
                register_date: null,
                register_agency: ''
            };
            this.modalService.open(content)
        }
    }

    clearPassword(){
        if(this.selectedEntity.password === '******')
            this.selectedEntity.password = '';
    }

    saveEntity(){
        if(!this.selectedEntity.id){
            this.entitiesService.create(this.selectedEntity)
                .then(crData => {
                    this.refreshEntities();
                    this.modalService.dismissAll();
                })
        } else {
            if(this.selectedEntity.password === '******' || this.selectedEntity.password === '')
                delete this.selectedEntity.password;

            this.entitiesService.update(this.selectedEntity.id, this.selectedEntity)
                .then(upData => {
                    this.refreshEntities();
                    this.modalService.dismissAll();
                })
        }
    }

    changeRegisterDate(event){
        this.selectedEntity.register_date = event;
    }

    pageChanged(event){
        this.range.start = (event - 1) * this.countShowInPage;
        this.refreshEntities(false);
    }

    deleteEntity() {
        if(this.selectedEntity.executors.length > 0) {
            return
        }
        this.entitiesService.delete(this.selectedEntity.id);
        this.refreshEntities();
        this.modalService.dismissAll();
    }

    deleteExecutor(event, selectedEntity) {

        const executorHTML = event.target.closest('tr'),
              executorId   = executorHTML.querySelector('td').innerHTML;

        this.entitiesService.detachExecutor(executorId);

        selectedEntity.executors = selectedEntity.executors.filter( executor => {
            return executor.id != executorId;
        });
        this.refreshEntities();
    }

    start = '';
    async searchExecutor(event, companyId){
        console.log('wtest searchExecutor');
        let input         = event.target,
            phone         = input.value,
            viewRegexp    = /^[+]{1}\d{0,13}$/,
            controlRegexp = /^[+]{1}\d{11,14}$/,
            executor;

        if ( !viewRegexp.test(phone) ) {
            phone = this.start;
            input.value = phone;
        }
        this.start = phone;

        if ( controlRegexp.test(phone) ) {
            executor = await this.entitiesService.attachExecutor({phone, companyId});
            console.log('wtest executor', executor);
            if (executor.phone == phone) {
                this.selectedEntity.executors.push(executor);
                this.toggleSearchExecutor('close');
                this.refreshEntities();
            }
        }
    }

    toggleSearchExecutor(how) {
        if (how == 'close') {
            this.isAddExecutorRowVisible = false;
        } else if (how == 'open') {
            this.isAddExecutorRowVisible = true;
        }
    }
}