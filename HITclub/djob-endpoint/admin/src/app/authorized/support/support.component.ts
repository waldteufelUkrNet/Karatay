import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-support',
    templateUrl: './support.component.html',
    styleUrls: ['./support.component.scss'],
    animations: [routerTransition()]
})
export class SupportComponent implements OnInit {
    constructor() {}

    ngOnInit() {

    }
}
