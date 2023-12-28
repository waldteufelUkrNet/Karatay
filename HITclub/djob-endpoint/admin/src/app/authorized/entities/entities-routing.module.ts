import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntitiesComponent } from './entities.component';
import { EntitiesListComponent } from './entities-list/entities-list.component';

const routes: Routes = [
    {
        path: '',
        component: EntitiesComponent,
        children: [
            {path: '',component: EntitiesListComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EntitiesRoutingModule {}
