import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-entities',
    templateUrl: './entities.component.html',
    styleUrls: ['./entities.component.scss'],
    animations: [routerTransition()]
})
export class EntitiesComponent implements OnInit {
    constructor() {}

    ngOnInit() {

    }
}
