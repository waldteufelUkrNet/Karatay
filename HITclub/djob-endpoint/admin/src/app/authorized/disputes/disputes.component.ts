import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-disputes',
    templateUrl: './disputes.component.html',
    styleUrls: ['./disputes.component.scss'],
    animations: [routerTransition()]
})
export class DisputesComponent implements OnInit {
    constructor() {}

    ngOnInit() {

    }
}
