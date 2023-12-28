import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecialtiesComponent } from './specialties.component';
import { SpecialtiesListComponent } from './specialties-list/specialties-list.component';
import { SpecialtiesGroupsComponent } from './specialties-groups/specialties-groups.component';

const routes: Routes = [
    {
        path: '',
        component: SpecialtiesComponent,
        children: [
            {path: '',component: SpecialtiesListComponent},
            {path: 'groups',component: SpecialtiesGroupsComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SpecialtiesRoutingModule {}
