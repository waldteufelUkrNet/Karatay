import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-push',
    templateUrl: './push.component.html',
    styleUrls: ['./push.component.scss'],
    animations: [routerTransition()]
})
export class PushComponent implements OnInit {
    constructor() {}

    ngOnInit() {

    }
}
