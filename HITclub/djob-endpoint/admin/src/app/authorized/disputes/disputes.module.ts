import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DisputesRoutingModule } from './disputes-routing.module';
import { DisputesComponent } from './disputes.component';
import { DisputesListComponent } from './disputes-list/disputes-list.component';
import { DisputesInfoComponent } from './disputes-info/disputes-info.component';
import { PageHeaderModule, PipesModule, AutocompleteModule, LocationModule, DateTimePickerModule, PaginationModule } from '../../shared';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
    imports: [
        CommonModule,
        DisputesRoutingModule,
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
        DisputesComponent,
        DisputesListComponent,
        DisputesInfoComponent
    ]
})
export class DisputesModule {}
