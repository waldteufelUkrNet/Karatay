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

    autocomplete(search, filter = null){
        return new Promise((res, rej) => {
            const headers = new Headers();
            let params = {
                search: search,
                limit: 10
            };
            if(filter)
                params['filter'] = filter;

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

    checkPhone(phone){
        return new Promise((res, rej) => {
            this.http.post('executor/check', {phone})
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

    addExecutor(data){
        return new Promise((res, rej) => {
            this.http.post('executor', data)
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

    updateExecutor(id, data){
        return new Promise((res, rej) => {
            this.http.put('executor/' + id, data)
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

    inviteExecutor(id){
        return new Promise((res, rej) => {
            this.http.post('executor/invite', {id})
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

    uploadFile(file){
        return new Promise((res, rej) => {
            const formData = new FormData();
            const headers  = new Headers();
            headers.append('Content-Type', 'multipart/form-data;');
            headers.append('Accept', 'application/json');
            formData.append('file', file, file.name) ;
            const options = new RequestOptions({ headers });
            this.http.post('account/image', formData)
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
}
