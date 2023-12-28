import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-promo',
    templateUrl: './promo.component.html',
    styleUrls: ['./promo.component.scss'],
    animations: [routerTransition()]
})
export class PromoComponent implements OnInit {
    constructor() {}

    ngOnInit() {

    }
}
