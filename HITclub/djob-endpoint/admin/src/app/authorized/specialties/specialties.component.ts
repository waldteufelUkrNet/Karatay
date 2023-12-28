import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-specialties',
    templateUrl: './specialties.component.html',
    styleUrls: ['./specialties.component.scss'],
    animations: [routerTransition()]
})
export class SpecialtiesComponent implements OnInit {
    constructor() {}

    ngOnInit() {

    }
}
