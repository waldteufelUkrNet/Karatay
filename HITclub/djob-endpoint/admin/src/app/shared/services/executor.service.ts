import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Headers, Http, RequestOptions} from '@angular/http';
import {NotificationService} from './notification.service';

@Injectable()
export class ExecutorService {

    constructor(
        private http: Http,
        private router: Router,
        private notif: NotificationService
    ) { }

    getlist(params){
        return new Promise((res, rej) => {
            const headers = new Headers();
            const options = new RequestOptions({headers, params});

            this.http.get('executor', options)
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

            this.http.get('executor/count', options)
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

    getOne(id){
        return new Promise((res, rej) => {
            const headers = new Headers();
            let params = {};
            const options = new RequestOptions({headers, params});

            this.http.get('executor/info/' + id, options)
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

    getOrderHistory(params){
        return new Promise((res, rej) => {
            const headers = new Headers();
            const options = new RequestOptions({headers, params});

            this.http.get('executor/order_history', options)
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

    getReferralHistory(params){
        return new Promise((res, rej) => {
            const headers = new Headers();
            const options = new RequestOptions({headers, params});

            this.http.get('executor/referral_history', options)
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

    getFinancialHistory(params){
        return new Promise((res, rej) => {
            const headers = new Headers();
            const options = new RequestOptions({headers, params});

            this.http.get('executor/financial_history', options)
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

    getAdminHistory(params){
        return new Promise((res, rej) => {
            const headers = new Headers();
            const options = new RequestOptions({headers, params});

            this.http.get('executor/financial_history', options)
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

    update(id, data){
        return new Promise((res, rej) => {
            this.http.put('executor/' + id, data)
                .toPromise()
                .then(response => {
                    const data = JSON.parse(response['_body']);
                    if (data.status == 'OK') {
                        res(true);
                    } else {
                        this.notif.showFromResponse(response);
                    }
                })
                .catch(error => {
                    this.notif.showFromResponse(error);
                });
        });
    }

    addFinancialOperation(data){
        return new Promise((res, rej) => {
            this.http.post('executor/financial_history', data)
                .toPromise()
                .then(response => {
                    const data = JSON.parse(response['_body']);
                    if (data.status == 'OK') {
                        res(true);
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
