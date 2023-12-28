import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { HistoryListComponent } from './history-list/history-list.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule, PipesModule, AutocompleteModule, LocationModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        HistoryRoutingModule,
        PageHeaderModule,
        PipesModule,
        NgbTooltipModule,
        FormsModule,
        NgbModule,
        AutocompleteModule,
        LocationModule
    ],
    declarations: [
        HistoryComponent,
        HistoryListComponent
    ]
})
export class HistoryModule {}
