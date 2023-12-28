import { Component, OnInit} from '@angular/core';
import {ReportsService, OrderService} from '../../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit {
    countShowInPage = 20;
    filters = {
        processed: false,
        not_processed: true
    };
    range = {
        start: 0,
        limit: this.countShowInPage
    };
    list = [];
    selectedReport;
    countReports;

    constructor(
        private reportsService: ReportsService,
        private orderService: OrderService,
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        this.refreshReports();
    }

    refreshReports(reinit = true){
        if(reinit){
            this.range.start = 0;
        }

        let options = {
            range: this.range
        };

        if(!this.isEmpty(this.filters)){
            options['filters'] = this.filters;
        }

        this.reportsService.getlist(options)
            .then((list: Array<Object>) => {
                if(reinit) {
                    this.countReports = 0;
                    this.reportsService.getCount(options)
                        .then(countData => {
                            this.countReports = countData;
                        })
                }

                this.list = list;
            })
    }

    isEmpty(arg) {
        for (let item in arg) {
            return false;
        }
        return true;
    }


    pageChanged(event){
        this.range.start = (event - 1) * this.countShowInPage;
        this.refreshReports(false);
    }

    changeFilter(key){
        this.filters[key] = !this.filters[key];
        this.refreshReports();
    }

    getTextInList(text) {
        let ret_len =80;
        return text.length > ret_len ? text.substr(0, 80) + '...' : text;
    }

    openReport(content, report){
        this.selectedReport = report;
        this.modalService.open(content)
    }

    saveReportStatus(){
        this.reportsService.updateStatus(this.selectedReport.id, {status: this.selectedReport.status})
            .then(upData => {
                this.modalService.dismissAll();
                this.refreshReports(false);
            })
    }

    getOrderStatus(order){
        console.log('!!!!!', order);
        return this.orderService.getOrderStatus(order);
    }
}
