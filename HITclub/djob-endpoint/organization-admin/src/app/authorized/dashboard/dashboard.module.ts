import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PageHeaderModule } from '../../shared';
import {AgmCoreModule} from "@agm/core";
import {appConfig} from "../../app.config";
import {PipesModule, AutocompleteModule} from '../../shared'

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        PageHeaderModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: appConfig.googleKey,
            language: 'ru'
        }),
        PipesModule,
        AutocompleteModule
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule {}
