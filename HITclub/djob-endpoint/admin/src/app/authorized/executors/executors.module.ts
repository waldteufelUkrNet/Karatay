import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExecutorsRoutingModule } from './executors-routing.module';
import { ExecutorsComponent } from './executors.component';
import { ExecutorsListComponent } from './executors-list/executors-list.component';
import { ExecutorsInfoComponent } from './executors-info/executors-info.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule, PipesModule, AutocompleteModule, LocationModule, PaginationModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        ExecutorsRoutingModule,
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
        ExecutorsComponent,
        ExecutorsListComponent,
        ExecutorsInfoComponent
    ]
})
export class ExecutorsModule {}
