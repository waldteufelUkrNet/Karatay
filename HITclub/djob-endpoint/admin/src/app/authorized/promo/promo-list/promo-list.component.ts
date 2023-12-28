import { Component, OnInit, HostListener} from '@angular/core';
import {PromoService, NotificationService} from '../../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import $ from 'jquery';

@Component({
  selector: 'app-promo-list',
  templateUrl: './promo-list.component.html',
  styleUrls: ['./promo-list.component.scss']
})
export class PromoListComponent implements OnInit {
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
    selectedPromo;
    deletePromo;
    countPromo;
    promoType = 'CUSTOMER';

    constructor(
        private promoService: PromoService,
        private modalService: NgbModal,
        private notif: NotificationService
    ) {}

    ngOnInit() {
        this.refreshPromo();
    }

    refreshPromo(reinit = true){
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

        options['promo_type'] = this.promoType;

        this.promoService.getlist(options)
            .then((list: Array<Object>) => {
                if(reinit) {
                    this.countPromo = 0;
                    this.promoService.getCount(options)
                        .then(countData => {
                            this.countPromo = countData;
                        })
                }
                this.list = list;
            })
    }

    searchRefresh(){
        clearTimeout(this.timeoutSearch);
        this.timeoutSearch = setTimeout(() => {
            this.refreshPromo();
        }, 1000);
    }

    isEmpty(arg) {
        for (let item in arg) {
            return false;
        }
        return true;
    }

    openPromoDetails(content, promo){
        if(!promo){
            this.selectedPromo = {
                code: null,
                type: null,
                amount: null,
                active: true
            };
        } else {
            this.selectedPromo = promo;
        }

        this.modalService.open(content)
    }

    savePromo(){
        let sendAccess = true;
        if(!this.selectedPromo.type || (this.selectedPromo.type == 'SUM' && !this.selectedPromo.amount) || (this.selectedPromo.type == 'SUM_EXPERT' && !this.selectedPromo.amount)){
            sendAccess = false;
            this.notif.showOne('Введите сумму', 'warning');
        }

        this.selectedPromo.promo_type = this.promoType;

        if(sendAccess){
            if(this.selectedPromo.id){
                this.promoService.update(this.selectedPromo.id, {promo_type: this.selectedPromo.promo_type, type: this.selectedPromo.type, amount: this.selectedPromo.amount, active: this.selectedPromo.active})
                    .then(upData => {
                        this.refreshPromo(true);
                        this.modalService.dismissAll();
                    })
            } else {
                this.promoService.create({promo_type: this.selectedPromo.promo_type, type: this.selectedPromo.type, amount: this.selectedPromo.amount, active: this.selectedPromo.active})
                    .then(cData => {
                        this.refreshPromo(true);
                        this.modalService.dismissAll();
                    })
            }

        }
    }



    deleteConfirm(content, promo){
        this.deletePromo = promo;
        this.modalService.open(content)
    }

    deletePromoConfirm(){
        this.promoService.delete(this.deletePromo.id)
            .then(upData => {
                this.refreshPromo(true);
                this.modalService.dismissAll();
            })
    }

    pageChanged(event){
        this.range.start = (event - 1) * this.countShowInPage;
        this.refreshPromo(false);
    }

    typeChanged(event){
        this.promoType = event.nextId;

        this.range = {
            start: 0,
            limit: this.countShowInPage
        };
        this.refreshPromo()
    }
}
