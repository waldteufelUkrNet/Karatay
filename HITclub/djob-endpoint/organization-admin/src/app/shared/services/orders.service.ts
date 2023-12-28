import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Headers, Http, RequestOptions} from '@angular/http';
import {NotificationService} from './notification.service';

@Injectable()
export class OrdersService {

    constructor(
        private http: Http,
        private router: Router,
        private notif: NotificationService
    ) { }

    getOrdersForOffer(params){
        return new Promise((res, rej) => {
            const headers = new Headers();
            const options = new RequestOptions({headers, params});

            this.http.get('orders/orders_for_offer', options)
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

    getSchedules(params){
        return new Promise((res, rej) => {
            const headers = new Headers();
            const options = new RequestOptions({headers, params});

            this.http.get('orders/schedules', options)
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

            this.http.get('orders/info/' + id, options)
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
            case 121:
                status_str = 'Клиент отменил заказ';
                break;
            case 131:
                status_str = 'Исполнитель отменил заказ';
                break;
        }

        return status_str;
    }

    getExecutorsForOrderOffer(order_id){
        return new Promise((res, rej) => {
            const headers = new Headers();
            let params = {};
            const options = new RequestOptions({headers, params});

            this.http.get('orders/executors_for_order_offer/' + order_id, options)
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

    createOrderOffer(data){
        return new Promise((res, rej) => {
            this.http.post('orders/create_order_offer', data)
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

    cancelOrder(order_id){
        return new Promise((res, rej) => {
            this.http.post('orders/cancel_order_for_later', {order_id})
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

    getHistory(params){
        return new Promise((res, rej) => {
            const headers = new Headers();
            const options = new RequestOptions({headers, params});

            this.http.get('orders/history', options)
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

            this.http.get('orders/order_history/' + order_id, options)
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
