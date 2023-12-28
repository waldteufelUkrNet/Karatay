import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-executors',
    templateUrl: './executors.component.html',
    styleUrls: ['./executors.component.scss'],
    animations: [routerTransition()]
})
export class ExecutorsComponent implements OnInit {
    constructor() {}

    ngOnInit() {

    }
}
