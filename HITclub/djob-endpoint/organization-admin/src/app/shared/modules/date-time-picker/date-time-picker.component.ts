import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-date-time-picker',
    templateUrl: './date-time-picker.component.html',
    styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit {
    @Input() minView="minute";
    @Input() step='5';
    @Input() picker_type;
    @Input() val;
    @Output() change = new EventEmitter();

    retval;
    selectedDateTime;
    selectedTimer;
    constructor() {}

    ngOnInit() {
        if(!this.picker_type){
            if(!this.val){
                this.val = moment().format('YYYY-MM-DD HH:mm:ss');
            }

            this.retval = moment(this.val).format('YYYY-MM-DD HH:mm:ss');
            this.selectedDateTime = new Date(this.val);
        }

        if(this.picker_type === 'timer'){
            if(!this.val){
                this.val = moment().format('YYYY-MM-DD HH:mm:ss');
            } else {
                this.val = moment().format('YYYY-MM-DD ') + this.val + ':00';
            }

            this.retval = moment(this.val).format('HH:mm');
            this.selectedTimer = new Date(this.val);
        }
    }

    setOutputDateTime(){
        this.retval = moment(this.selectedDateTime).format('YYYY-MM-DD HH:mm:ss');
        this.change.emit(this.retval);
    }

    setOutputTimer(){
        this.retval = moment(this.selectedTimer).format('HH:mm');
        this.change.emit(this.retval);
    }
}
