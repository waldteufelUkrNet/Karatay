import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizedComponent } from './authorized.component';

const routes: Routes = [
    {
        path: '',
        component: AuthorizedComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'executors', loadChildren: () => import('./executors/executors.module').then(m => m.ExecutorsModule) },
            { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
            { path: 'history', loadChildren: () => import('./history/history.module').then(m => m.HistoryModule) },
            { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
            { path: 'schedule', loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule) },
            { path: '**', redirectTo: 'not-found' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthorizedRoutingModule {}
