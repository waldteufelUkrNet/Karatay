import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ReportsListComponent } from './reports-list/reports-list.component';
import { PageHeaderModule, PipesModule, AutocompleteModule, LocationModule, DateTimePickerModule, PaginationModule } from '../../shared';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
    imports: [
        CommonModule,
        ReportsRoutingModule,
        PageHeaderModule,
        PipesModule,
        NgbTooltipModule,
        FormsModule,
        NgbModule,
        AutocompleteModule,
        LocationModule,
        ClipboardModule,
        NgbTooltipModule,
        DateTimePickerModule,
        PaginationModule
    ],
    declarations: [
        ReportsComponent,
        ReportsListComponent
    ]
})
export class ReportsModule {}
