import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupportRoutingModule } from './support-routing.module';
import { SupportComponent } from './support.component';
import { SupportListComponent } from './support-list/support-list.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule, PipesModule, AutocompleteModule, LocationModule, DateTimePickerModule, PaginationModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        SupportRoutingModule,
        PageHeaderModule,
        PipesModule,
        NgbTooltipModule,
        FormsModule,
        NgbModule,
        AutocompleteModule,
        LocationModule,
        DateTimePickerModule,
        PaginationModule
    ],
    declarations: [
        SupportComponent,
        SupportListComponent
    ]
})
export class SupportModule {}
