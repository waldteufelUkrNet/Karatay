import { Component, OnInit, HostListener} from '@angular/core';
import {SpecialitesService, NotificationService} from '../../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import $ from 'jquery';

@Component({
  selector: 'app-specialties-groups',
  templateUrl: './specialties-groups.component.html',
  styleUrls: ['./specialties-groups.component.scss']
})
export class SpecialtiesGroupsComponent implements OnInit {
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
    selectedGroup;
    deleteGroup;

    constructor(
        private specialitesService: SpecialitesService,
        private modalService: NgbModal,
        private notif: NotificationService
    ) {}

    ngOnInit() {
        this.refreshSpecialitesGroup();
    }

    @HostListener('window:scroll', ['$event']) onScrollEvent($event){
        if(document.body.scrollHeight - window.innerHeight - $(window).scrollTop() < 50){
            clearTimeout(this.timeoutLoad);
            this.timeoutLoad = setTimeout(() => {
                this.scrollEventActive = false;
                this.range.start += this.countShowInPage;
                this.refreshSpecialitesGroup(false);
            }, 1000);
        }
    }

    refreshSpecialitesGroup(reinit = true){
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

        this.specialitesService.getGrouplist(options)
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
            this.refreshSpecialitesGroup();
        }, 1000);
    }

    isEmpty(arg) {
        for (let item in arg) {
            return false;
        }
        return true;
    }

    openGroupDetails(content, group = null){
        if(!group){
            this.selectedGroup = {
                name: ''
            };
        } else {
            this.selectedGroup = group;
        }

        this.modalService.open(content)
    }

    saveGroup(){
        let sendAccess = true;
        if(!this.selectedGroup.name || this.selectedGroup.name === ''){
            sendAccess = false;
            this.notif.showOne('Введите имя групы', 'warning');
        }

        if(sendAccess){
            if(this.selectedGroup.id){
                this.specialitesService.updateGroup(this.selectedGroup.id, {name: this.selectedGroup.name})
                    .then(upData => {
                        this.refreshSpecialitesGroup(true);
                        this.modalService.dismissAll();
                    })
            } else {
                this.specialitesService.createGroup({name: this.selectedGroup.name})
                    .then(cData => {
                        this.refreshSpecialitesGroup(true);
                        this.modalService.dismissAll();
                    })
            }

        }
    }

    deleteConfirm(content, group){
        this.deleteGroup = group;
        this.modalService.open(content)
    }

    deleteGroupConfirm(){
        this.specialitesService.deleteGroup(this.deleteGroup.id)
            .then(upData => {
                this.refreshSpecialitesGroup(true);
                this.modalService.dismissAll();
            })
    }
}
