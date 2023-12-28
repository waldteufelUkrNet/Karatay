import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersInfoComponent } from "./orders-info/orders-info.component";

const routes: Routes = [
    {
        path: '',
        component: OrdersComponent,
        children: [
            {path: '',component: OrdersListComponent},
            {path: 'info/:id',component: OrdersInfoComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule {}
