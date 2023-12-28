import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import {UserService} from '../shared/services/user.service'

@Component({
    selector: 'app-login',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.scss'],
    animations: [routerTransition()]
})
export class ForgotComponent implements OnInit {
    form = {
        email: ''
    };

    constructor(
      private service: UserService
    ) {}

    ngOnInit() {}

    forgot() {
        this.service.forgot(this.form.email);
    }
}
