import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExecutorsComponent } from './executors.component';
import { ExecutorsListComponent } from './executors-list/executors-list.component';
import { ExecutorsInfoComponent } from "./executors-info/executors-info.component";

const routes: Routes = [
    {
        path: '',
        component: ExecutorsComponent,
        children: [
            {path: '',component: ExecutorsListComponent},
            {path: 'info/:id',component: ExecutorsInfoComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExecutorsRoutingModule {}
