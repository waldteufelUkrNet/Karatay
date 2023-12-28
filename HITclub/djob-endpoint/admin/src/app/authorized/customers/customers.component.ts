import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss'],
    animations: [routerTransition()]
})
export class CustomersComponent implements OnInit {
    constructor() {}

    ngOnInit() {

    }
}
