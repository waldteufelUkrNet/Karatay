import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PushComponent } from './push.component';
import { PushListComponent } from './push-list/push-list.component';

const routes: Routes = [
    {
        path: '',
        component: PushComponent,
        children: [
            {path: '',component: PushListComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PushRoutingModule {}
