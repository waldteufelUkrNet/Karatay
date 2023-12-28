import { Component, OnInit, HostListener} from '@angular/core';
import {NotificationService, SpecialitesService} from '../../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import $ from 'jquery';

@Component({
  selector: 'app-specialties-list',
  templateUrl: './specialties-list.component.html',
  styleUrls: ['./specialties-list.component.scss']
})
export class SpecialtiesListComponent implements OnInit {
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
    selectedSpecialite;
    deleteSpecialite;
    groupsList;
    countSpecialites;

    constructor(
        private specialitesService: SpecialitesService,
        private modalService: NgbModal,
        private notif: NotificationService
    ) {}

    ngOnInit() {
        this.specialitesService.getGrouplist({})
            .then((list: Array<Object>) => {
                this.groupsList = list;
            });

        this.refreshSpecialites();
    }

    refreshSpecialites(reinit = true){
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

        this.specialitesService.getlist(options)
            .then((list: Array<Object>) => {
                if(reinit) {
                    this.countSpecialites = 0;
                    this.specialitesService.getCount(options)
                        .then(countData => {
                            this.countSpecialites = countData;
                        })
                }
                this.list = list;
            })
    }

    searchRefresh(){
        clearTimeout(this.timeoutSearch);
        this.timeoutSearch = setTimeout(() => {
            this.refreshSpecialites();
        }, 1000);
    }

    isEmpty(arg) {
        for (let item in arg) {
            return false;
        }
        return true;
    }

    openSpecialiteDetails(content, specialite = null){
        if(!specialite){
            this.selectedSpecialite = {
                name: '',
                info: '',
                group_id: null
            };
        } else {
            this.selectedSpecialite = specialite;
        }

        this.modalService.open(content)
    }

    saveSpecialite(){
        let sendAccess = true;
        if(!this.selectedSpecialite.name || this.selectedSpecialite.name === ''){
            sendAccess = false;
            this.notif.showOne('Введите имя групы', 'warning');
        }

        if(sendAccess){
            if(this.selectedSpecialite.id){
                this.specialitesService.update(this.selectedSpecialite.id, {name: this.selectedSpecialite.name, info: this.selectedSpecialite.info, group_id: this.selectedSpecialite.group_id})
                    .then(upData => {
                        this.refreshSpecialites(true);
                        this.modalService.dismissAll();
                    })
            } else {
                this.specialitesService.create({name: this.selectedSpecialite.name, info: this.selectedSpecialite.info, group_id: this.selectedSpecialite.group_id})
                    .then(cData => {
                        this.refreshSpecialites(true);
                        this.modalService.dismissAll();
                    })
            }

        }
    }

    deleteConfirm(content, specialite){
        this.deleteSpecialite = specialite;
        this.modalService.open(content)
    }

    deleteSpecialiteConfirm(){
        this.specialitesService.delete(this.deleteSpecialite.id)
            .then(upData => {
                this.refreshSpecialites(true);
                this.modalService.dismissAll();
            })
    }

    pageChanged(event){
        this.range.start = (event - 1) * this.countShowInPage;
        this.refreshSpecialites(false);
    }
}
