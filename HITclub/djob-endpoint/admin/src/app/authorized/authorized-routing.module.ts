import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizedComponent } from './authorized.component';

const routes: Routes = [
    {
        path: '',
        component: AuthorizedComponent,
        children: [
            { path: '', redirectTo: 'customers', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
            { path: 'executors', loadChildren: () => import('./executors/executors.module').then(m => m.ExecutorsModule) },
            { path: 'entities', loadChildren: () => import('./entities/entities.module').then(m => m.EntitiesModule) },
            { path: 'specialties', loadChildren: () => import('./specialties/specialties.module').then(m => m.SpecialtiesModule) },
            { path: 'promo', loadChildren: () => import('./promo/promo.module').then(m => m.PromoModule) },
            { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
            { path: 'disputes', loadChildren: () => import('./disputes/disputes.module').then(m => m.DisputesModule) },
            { path: 'configs', loadChildren: () => import('./configs/configs.module').then(m => m.ConfigsModule) },
            { path: 'push', loadChildren: () => import('./push/push.module').then(m => m.PushModule) },
            { path: 'support', loadChildren: () => import('./support/support.module').then(m => m.SupportModule) },
            { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
            { path: '**', redirectTo: 'not-found' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthorizedRoutingModule {}
