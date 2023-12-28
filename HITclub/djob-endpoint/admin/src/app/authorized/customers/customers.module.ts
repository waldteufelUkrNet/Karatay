import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersInfoComponent } from './customers-info/customers-info.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule, PipesModule, AutocompleteModule, LocationModule, PaginationModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        CustomersRoutingModule,
        PageHeaderModule,
        PipesModule,
        NgbTooltipModule,
        FormsModule,
        NgbModule,
        AutocompleteModule,
        LocationModule,
        PaginationModule
    ],
    declarations: [
        CustomersComponent,
        CustomersListComponent,
        CustomersInfoComponent
    ]
})
export class CustomersModule {}
