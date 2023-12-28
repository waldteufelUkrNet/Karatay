import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ExecutorService, LinkPipe, SpecialitiesService} from '../../../shared';

@Component({
  selector: 'app-executors-info',
  templateUrl: './executors-info.component.html',
  styleUrls: ['./executors-info.component.scss']
})
export class ExecutorsInfoComponent implements OnInit {
    executor;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private link: LinkPipe,
        private executorService: ExecutorService,
        public specialitiesService: SpecialitiesService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            if(params['id'] !== '0'){
                this.executorService.getOne(params['id'])
                    .then(data => {
                        this.executor = data;
                        if(this.executor.office){
                            this.executor.office.lon = this.executor.office.lon['$numberDecimal'];
                            this.executor.office.lat = this.executor.office.lat['$numberDecimal'];
                        }
                    })
            } else {
                this.executor = {
                    phone: null,
                    name: null,
                    surname: null,
                    second_name: null,
                    about: null,
                    photo: null,
                    city: null,
                    inn: null,
                    passport: {
                        series: null,
                        number: null,
                        code: null,
                        issued_by: null,
                        main_photo: null,
                        registration_photo: null,
                    },
                    office: null,
                    sex: 0,
                    specialities: [],
                    registered: 2,
                };

                this.route.queryParams.subscribe((queryParam: any) => {
                    if(queryParam['phone'])
                        this.executor.phone = queryParam['phone'];
                });
            }
        });
    }

    addOffice(){
        this.executor.office = {
            lat: null,
            lon: null,
            name: null,
            front: null,
            code: null,
            floor: null,
        }
    }

    addSpeciality(){
        this.executor.specialities.push({
            specialty_id: null,
            workplace: 1,
            on_departure: 1,
            certificates: [],
            hourly_rate_price: null,
            fixed_rate_price: null,
            hourly_rate_enabled: 0,
            fixed_rate_enabled: 0,
            rate_type_for_now: 'HOURLY',
            enabled: 1
        });
    }

    changeSpeciality(event, spec){
        if(event.changed) {
            spec.specialty_id = event.value;
        }
    }

    removeOffice(){
        this.executor.office = null
    }

    uploadFile(event){
        let files = event.srcElement.files;
        let fileCount = files.length;
        if (fileCount > 0) {
            this.executorService.uploadFile(files[0])
                .then((uploadData: any) => {
                    this.executor.photo = uploadData;
                })
        }
    }

    uploadPassportMainPhoto(event){
        let files = event.srcElement.files;
        let fileCount = files.length;
        if (fileCount > 0) {
            this.executorService.uploadFile(files[0])
                .then((uploadData: any) => {
                    this.executor.passport.main_photo = uploadData;
                })
        }
    }

    uploadPassportRegistrationPhoto(event){
        let files = event.srcElement.files;
        let fileCount = files.length;
        if (fileCount > 0) {
            this.executorService.uploadFile(files[0])
                .then((uploadData: any) => {
                    this.executor.passport.registration_photo = uploadData;
                })
        }
    }

    changeWorkplace(spec){
        spec.workplace = spec.workplace === 1 ? 0 : 1;
    }

    changeDeparture(spec){
        spec.on_departure = spec.on_departure === 1 ? 0 : 1;
    }

    changeHourlyRate(spec){
        spec.hourly_rate_enabled = spec.hourly_rate_enabled === 1 ? 0 : 1;
    }

    changeFixedRate(spec){
        spec.fixed_rate_enabled = spec.fixed_rate_enabled === 1 ? 0 : 1;
    }

    changeStatus(spec){
        spec.enabled = spec.enabled === 1 ? 0 : 1;
    }

    deleteCertificate(spec, cert){
        spec.certificates = spec.certificates.filter(_cert => cert !== _cert);
    }

    uploadCertificate(event, item){
        let files = event.srcElement.files;
        let fileCount = files.length;
        if (fileCount > 0) {
            this.executorService.uploadFile(files[0])
                .then((uploadData: any) => {
                    item.certificates.push(uploadData);
                })
        }
    }

    deleteSpeciality(item){
        this.executor.specialities = this.executor.specialities.filter(_item => item !== _item);
    }

    saveExecutor(){
        if(this.executor.id){
            this.executorService.updateExecutor(this.executor.id, this.executor)
                .then(executorData => {
                    this.router.navigate([this.link.transform('/executors')]);
                })
        } else {
            this.executorService.addExecutor(this.executor)
                .then(executorData => {
                    this.router.navigate([this.link.transform('/executors')]);
                })
        }

    }
}
