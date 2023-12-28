import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersInfoComponent } from './orders-info/orders-info.component';
import { PageHeaderModule, PipesModule, AutocompleteModule, LocationModule, DateTimePickerModule, PaginationModule } from '../../shared';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
    imports: [
        CommonModule,
        OrdersRoutingModule,
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
        OrdersComponent,
        OrdersListComponent,
        OrdersInfoComponent
    ]
})
export class OrdersModule {}
