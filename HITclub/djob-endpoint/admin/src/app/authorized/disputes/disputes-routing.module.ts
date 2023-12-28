import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisputesComponent } from './disputes.component';
import { DisputesListComponent } from './disputes-list/disputes-list.component';
import { DisputesInfoComponent } from './disputes-info/disputes-info.component';

const routes: Routes = [
    {
        path: '',
        component: DisputesComponent,
        children: [
            {path: '',component: DisputesListComponent},
            {path: 'info/:id',component: DisputesInfoComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DisputesRoutingModule {}
