import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss'],
    animations: [routerTransition()]
})
export class ScheduleComponent implements OnInit {
    constructor() {}

    ngOnInit() {

    }
}
