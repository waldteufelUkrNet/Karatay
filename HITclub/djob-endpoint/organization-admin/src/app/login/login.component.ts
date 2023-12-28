import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import {UserService} from '../shared';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    form = {
        email: '',
        password: ''
    };

    constructor(
      private service: UserService
    ) {}

    ngOnInit() {}

    onLoggedin() {
        this.service.login(this.form.email, this.form.password);
    }
}
