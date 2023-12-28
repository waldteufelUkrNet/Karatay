import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpecialtiesRoutingModule } from './specialties-routing.module';
import { SpecialtiesComponent } from './specialties.component';
import { SpecialtiesListComponent } from './specialties-list/specialties-list.component';
import { SpecialtiesGroupsComponent } from './specialties-groups/specialties-groups.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule, PipesModule, AutocompleteModule, LocationModule, PaginationModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        SpecialtiesRoutingModule,
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
        SpecialtiesComponent,
        SpecialtiesListComponent,
        SpecialtiesGroupsComponent
    ]
})
export class SpecialtiesModule {}
