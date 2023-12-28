import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Headers, Http, RequestOptions} from '@angular/http';
import {NotificationService} from './notification.service';
import {ValidationService} from './validation.service';
import {LinkPipe} from '../../shared'

@Injectable()
export class UserService {
    User;

    constructor(
        private http: Http,
        private router: Router,
        private notif: NotificationService,
        private valid: ValidationService,
        private linkPipe: LinkPipe
    ) {
        this.checkLogin();
    }

    login(username, password){
        if(!this.valid.email(username) || !this.valid.password(password)){
            if(!this.valid.email(username)){
                this.notif.showOne('E-mail is not valid', 'error');
            }
            if(!this.valid.password(password)){
                this.notif.showOne('Password is not valid', 'error');
            }
        } else {
            this.http.post('signin', { email: username, password: password })
                .toPromise()
                .then(response => {
                    const resp = JSON.parse(response['_body']);
                    if(resp.status == 'OK'){
                        this.User = resp.data;
                        localStorage.setItem('user', JSON.stringify(this.User));
                        this.router.navigate([this.linkPipe.transform('/dashboard')]);
                    } else {
                        this.notif.showFromResponse(response);
                    }
                })
                .catch(error => {
                    this.notif.showFromResponse(error);
                });
        }
    }

    getCounters(){
        return new Promise((res, rej) => {
            const headers = new Headers();
            let params = {};
            const options = new RequestOptions({headers, params});
            this.http.get('counters', options)
                .toPromise()
                .then(response => {
                    const resp = JSON.parse(response['_body']);
                    if(resp.status == 'OK'){
                        res(resp.data);
                    } else {
                        this.notif.showFromResponse(response);
                    }
                })
                .catch(error => {
                    this.notif.showFromResponse(error);
                });
        });
    }

    checkLogin() {
        if (typeof localStorage !== 'undefined') {
            this.User = JSON.parse(localStorage.getItem('user'));
            if (this.User && this.User.token) {
                return this.User;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    logout() {
        localStorage.removeItem('user');
        this.router.navigate([this.linkPipe.transform('/login')])
    }

    forgot(email){
        if(!this.valid.email(email)){
            this.notif.showOne('E-mail is not valid', 'error');
        } else {
            this.http.post('user/forgot', { email: email })
                .toPromise()
                .then(response => {
                    const resp = JSON.parse(response['_body']);
                    if(resp.status == 'OK'){
                        this.router.navigate(['/login']);
                        this.notif.showOne('Success! Please check your mailbox.');
                    } else {
                        this.notif.showFromResponse(response);
                    }
                })
                .catch(error => {
                    this.notif.showFromResponse(error);
                });
        }
    }

    getUser(){
        return this.User;
    }

    isSuper(){
        return this.User && this.User.role === 'SUPER_ADMIN';
    }
}
