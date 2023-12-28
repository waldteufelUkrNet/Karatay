import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportComponent } from './support.component';
import { SupportListComponent } from './support-list/support-list.component';

const routes: Routes = [
    {
        path: '',
        component: SupportComponent,
        children: [
            {path: '',component: SupportListComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SupportRoutingModule {}
