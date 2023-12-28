import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {UserService, NotificationService} from '../../shared';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    animations: [routerTransition()]
})
export class SettingsComponent implements OnInit {
    user;

    constructor(
        private userService: UserService,
        private notif: NotificationService
    ) {}

    ngOnInit() {
        this.user = this.userService.getUser();

        console.log('!!!: ', this.user);
    }

    saveAccount(){
        this.userService.saveUser(this.user)
            .then(d => {
                this.notif.showOne('Сохранено');
            })
    }

    uploadFile(event){
        let files = event.srcElement.files;
        let fileCount = files.length;
        if (fileCount > 0) {
            this.userService.uploadFile(files[0])
                .then((uploadData: any) => {
                    this.user.photo = uploadData;
                })
        }
    }

    changeUrgent(){
        this.user.take_urgent = this.user.take_urgent == 1 ? 0 : 1;
    }

    changeNotUrgent(){
        this.user.take_not_urgent = this.user.take_not_urgent == 1 ? 0 : 1;
    }
}
