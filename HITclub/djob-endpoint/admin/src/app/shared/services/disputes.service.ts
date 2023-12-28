import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Headers, Http, RequestOptions} from '@angular/http';
import {NotificationService} from './notification.service';

@Injectable()
export class DisputesService {

    constructor(
        private http: Http,
        private router: Router,
        private notif: NotificationService
    ) { }

    getlist(params){
        return new Promise((res, rej) => {
            const headers = new Headers();
            const options = new RequestOptions({headers, params});

            this.http.get('disputes', options)
                .toPromise()
                .then(response => {
                    const data = JSON.parse(response['_body']);
                    if (data.status == 'OK') {
                        res(data.data);
                    } else {
                        this.notif.showFromResponse(response);
                    }
                })
                .catch(error => {
                    this.notif.showFromResponse(error);
                });
        });
    }

    getCount(params){
        return new Promise((res, rej) => {
            const headers = new Headers();
            const options = new RequestOptions({headers, params});

            this.http.get('disputes/count', options)
                .toPromise()
                .then(response => {
                    const data = JSON.parse(response['_body']);
                    if (data.status == 'OK') {
                        res(data.data);
                    } else {
                        this.notif.showFromResponse(response);
                    }
                })
                .catch(error => {
                    this.notif.showFromResponse(error);
                });
        });
    }
}
