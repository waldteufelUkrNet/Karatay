import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IsAuthentication, NotAuthentication} from './shared';
import { appConfig } from './app.config';

const routes: Routes = [
    { path: appConfig.adminUrl, children: [
            { path: '', loadChildren: () => import('./authorized/authorized.module').then(m => m.AuthorizedModule), canActivate: [IsAuthentication] },
            { path: 'old', loadChildren: () => import('./old/authorized.module').then(m => m.AuthorizedModule), canActivate: [IsAuthentication] },

            { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), canActivate: [NotAuthentication] },
            { path: 'forgot', loadChildren: () => import('./forgot/forgot.module').then(m => m.ForgotModule), canActivate: [NotAuthentication] },

            { path: 'error', loadChildren: () => import('./server-error/server-error.module').then(m => m.ServerErrorModule) },
            { path: 'access-denied', loadChildren: () => import('./access-denied/access-denied.module').then(m => m.AccessDeniedModule) },
            { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
            { path: '**', redirectTo: 'not-found' }
        ]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
