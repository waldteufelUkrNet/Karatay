import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {ExecutorService, LinkPipe, OrdersService} from '../../shared';
import {Router} from "@angular/router";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    lat = 55.755117;
    lng = 37.619012;
    markers = [];
    range = {
        start: 0,
        limit: 9999999999
    };
    showMap = false;

    constructor(
        public executorService: ExecutorService,
        private orderService: OrdersService,
        private router: Router,
        private link: LinkPipe,
    ) {}

    ngOnInit() {
        this.refreshMap();
    }

    refreshMap(){
        let options = {
            range: this.range
        };

        this.executorService.getlist(options)
            .then((exList: Array<any>) => {
                for(let i=0;i<exList.length;i++){
                    let iconUrl = '/assets/images/m-grey.png';
                    if(exList[i].status){
                        iconUrl = '/assets/images/m-green.png';
                    }
                    if(exList[i].order){
                        iconUrl = '/assets/images/m-red.png';
                    }
                    let specialites = '';
                    if(exList[i].specialities && exList[i].specialities.length){
                        for(let j=0;j<exList[i].specialities.length;j++){
                            specialites += j===0 ? exList[i].specialities[j].specialty.name : ', ' + exList[i].specialities[j].specialty.name;
                    }
                    }

                    this.markers.push({
                        lat: exList[i].lat,
                        lon: exList[i].lon,
                        label: exList[i].name,
                        iconUrl: iconUrl,
                        info: {
                            id: exList[i].id,
                            name: exList[i].name,
                            photo: exList[i].photo,
                            phone: exList[i].phone,
                            specialites: specialites,
                            order: exList[i].order,
                        }
                    })
                }
                this.orderService.getOrdersForOffer(options)
                    .then((oList: Array<any>) => {
                        let iconUrl = '/assets/images/m-order.png';
                        for(let i=0;i<oList.length;i++){
                            let address;
                            if(oList[i].address){
                                address = oList[i].address;
                            }
                            if(oList[i].departure_address){
                                address = oList[i].departure_address;
                            }
                            if(address){
                                this.markers.push({
                                    lat: address.lat,
                                    lon: address.lon,
                                    label: ' ',
                                    iconUrl: iconUrl,
                                    order: {
                                        id: oList[i].id,
                                        specialty: oList[i].specialty.name,
                                        filter: {specialities: [oList[i].specialty.id]},
                                        summ: oList[i].summ,
                                        summ_type: oList[i].summ_type,
                                        comment: oList[i].comment,
                                    }
                                })
                            }
                        }

                        this.showMap = true
                    });
            })
    }

    getOrderStatus(order){
        return this.orderService.getOrderStatus(order);
    }

    changeExecutor(event, order){
        if(event.changed){
            this.router.navigate([this.link.transform('/orders/info/' + order.id + '/' + event.value)]);
        }
    }
}
