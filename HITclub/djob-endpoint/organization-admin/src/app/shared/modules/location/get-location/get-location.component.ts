import {Component, OnInit, ViewChild, ElementRef, NgZone, Output, EventEmitter, Input} from '@angular/core';
import {MapsAPILoader, MouseEvent} from "@agm/core";

@Component({
    selector: 'app-get-location',
    templateUrl: './get-location.component.html',
    styleUrls: ['./get-location.component.scss']
})
export class GetLocationComponent implements OnInit {
    @Output() change = new EventEmitter();
    @Input() default;

    latitude: number = 55.74824379707918;
    longitude: number = 37.62732256423783;
    zoom: number = 15;
    address: string;
    city: string;
    region: string;
    private geoCoder;

    @ViewChild('search', {static: false})
    public searchElementRef: ElementRef;

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {}

    ngOnInit() {
        this.mapsAPILoader.load().then(() => {
            if(this.default){
                this.longitude = this.default.longitude;
                this.latitude = this.default.latitude;
            } else {
                this.setCurrentLocation();
            }
            this.geoCoder = new google.maps.Geocoder;

            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });

            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.getAddress();
                });
            });
        });
    }

    private setCurrentLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.getAddress();
            });
        }
    }

    clickMap($event: MouseEvent){
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
        this.getAddress();
    }

    markerDragEnd($event: MouseEvent) {
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
        this.getAddress();
    }

    getAddress() {
        this.geoCoder.geocode({ 'location': { lat: this.latitude, lng: this.longitude }, language: 'ru' }, (results, status) => {
            console.log(results);

            if (status === 'OK') {
                if (results[0]) {
                    this.zoom = 15;
                    let address = results[0].address_components;

                    this.city = '';
                    this.address = '';
                    this.region = '';
                    let address_obj = {
                        number: null,
                        route: ''
                    };

                    for(let i=0;i<address.length;i++){
                        if(address[i].types && address[i].types.length){
                            if(address[i].types.indexOf('street_number') !== -1){
                                address_obj.number = address[i].long_name;
                            }
                            if(address[i].types.indexOf('route') !== -1){
                                address_obj.route = address[i].long_name;
                            }
                            if(address[i].types.indexOf('locality') !== -1){
                                this.city = address[i].long_name;
                            }
                            if(address[i].types.indexOf('administrative_area_level_1') !== -1){
                                this.region = address[i].long_name;
                            }
                        }
                    }

                    this.address = address_obj.route;
                    if(address_obj.number){
                        this.address += ', ' + address_obj.number
                    }


                    this.change.emit({
                        setvalue: true,
                        location: {
                            lat: this.latitude,
                            lon: this.longitude,
                            city: this.city,
                            address: this.address,
                            region: this.region,
                        }
                    });
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }

        });
    }
}
