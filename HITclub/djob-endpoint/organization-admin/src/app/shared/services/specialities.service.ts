import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Headers, Http, RequestOptions} from '@angular/http';
import {NotificationService} from './notification.service';

@Injectable()
export class SpecialitiesService {

    constructor(
        private http: Http,
        private router: Router,
        private notif: NotificationService
    ) { }

    autocomplete(search){
        return new Promise((res, rej) => {
            const headers = new Headers();
            let params = {
                search: search,
                limit: 10
            };
            const options = new RequestOptions({headers, params});

            this.http.get('specialities', options)
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
