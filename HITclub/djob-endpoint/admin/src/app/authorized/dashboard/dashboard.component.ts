import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {UserService} from '../../shared';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    user;

    constructor(
        private userService: UserService,
    ) {}

    ngOnInit() {
        this.user = this.userService.getUser();
    }
}
