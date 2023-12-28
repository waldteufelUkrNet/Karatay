import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-configs',
    templateUrl: './configs.component.html',
    styleUrls: ['./configs.component.scss'],
    animations: [routerTransition()]
})
export class ConfigsComponent implements OnInit {
    constructor() {}

    ngOnInit() {

    }
}
