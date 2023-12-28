import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocationComponent } from './location.component';
import { GetLocationComponent } from './get-location/get-location.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule } from '@angular/forms';
import {AgmCoreModule} from "@agm/core";
import {appConfig} from '../../../app.config';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        AgmCoreModule.forRoot({
            apiKey: appConfig.googleKey,
            libraries: ['places'],
            language: 'ru'
        }),
        NgbModule
    ],
    declarations: [
        LocationComponent,
        GetLocationComponent
    ],
    exports: [
        LocationComponent,
        GetLocationComponent
    ]
})
export class LocationModule {}
