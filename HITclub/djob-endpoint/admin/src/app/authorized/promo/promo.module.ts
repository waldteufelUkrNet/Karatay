import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PromoRoutingModule } from './promo-routing.module';
import { PromoComponent } from './promo.component';
import { PromoListComponent } from './promo-list/promo-list.component';
import { PageHeaderModule, PipesModule, AutocompleteModule, LocationModule, PaginationModule } from '../../shared';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
    imports: [
        CommonModule,
        PromoRoutingModule,
        PageHeaderModule,
        PipesModule,
        NgbTooltipModule,
        FormsModule,
        NgbModule,
        AutocompleteModule,
        LocationModule,
        ClipboardModule,
        NgbTooltipModule,
        PaginationModule
    ],
    declarations: [
        PromoComponent,
        PromoListComponent
    ]
})
export class PromoModule {}
