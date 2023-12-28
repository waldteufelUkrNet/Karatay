import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigsComponent } from './configs.component';
import { ConfigsFormComponent } from './configs-form/configs-form.component';

const routes: Routes = [
    {
        path: '',
        component: ConfigsComponent,
        children: [
            {path: '',component: ConfigsFormComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfigsRoutingModule {}
