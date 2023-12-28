import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersInfoComponent } from './customers-info/customers-info.component';

const routes: Routes = [
    {
        path: '',
        component: CustomersComponent,
        children: [
            {path: '',component: CustomersListComponent},
            {path: 'info/:id',component: CustomersInfoComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomersRoutingModule {}
