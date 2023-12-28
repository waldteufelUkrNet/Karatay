import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Headers, Http, RequestOptions} from '@angular/http';
import {NotificationService} from './notification.service';

@Injectable()
export class OrderService {

    constructor(
        private http: Http,
        private router: Router,
        private notif: NotificationService
    ) { }

    getlist(params){
        return new Promise((res, rej) => {
            const headers = new Headers();
            const options = new RequestOptions({headers, params});

            this.http.get('order', options)
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

    getlistCount(params){
        return new Promise((res, rej) => {
            const headers = new Headers();
            const options = new RequestOptions({headers, params});

            this.http.get('order/count', options)
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

            this.http.get('order/fullinfo/' + id, options)
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

    getOrderHistory(order_id){
        return new Promise((res, rej) => {
            const headers = new Headers();
            let params = {};
            const options = new RequestOptions({headers, params});

            this.http.get('order/history/' + order_id, options)
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

    getOrderStatus(order){
        let status_str = '';
        switch(order.status) {
            case 10:
                status_str = !order.for_now ? 'Заказ создан. Предложен исполнителям' : 'Заказ создан';
                break;
            case 11:
                status_str = 'Поиск исполнителей';
                break;
            case 20:
                status_str = 'Исполнитель принял заказ';
                break;
            case 50:
                status_str = 'Исполнитель инициировал начало работы';
                break;
            case 90:
                status_str = 'Сервер инициировал окончание работы из-за недостатка средств';
                break;
            case 100:
                status_str = 'Заказ успешно закрыт';
                break;
            case 110:
                status_str = 'Заказчик отменил поиск исполнителя для заказа';
                break;
            case 112:
                status_str = 'Произошла ошибка при резервировании средств';
                break;
            case 120:
            case 121:
                status_str = 'Клиент отменил заказ';
                break;
            case 131:
                status_str = 'Исполнитель отменил заказ';
                break;
        }

        return status_str;
    }
}
