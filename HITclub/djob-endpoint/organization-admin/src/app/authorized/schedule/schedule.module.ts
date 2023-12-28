import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule, PipesModule, AutocompleteModule, LocationModule, DateTimePickerModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        ScheduleRoutingModule,
        PageHeaderModule,
        PipesModule,
        NgbTooltipModule,
        FormsModule,
        NgbModule,
        AutocompleteModule,
        LocationModule,
        DateTimePickerModule
    ],
    declarations: [
        ScheduleComponent,
        ScheduleListComponent
    ]
})
export class ScheduleModule {}
