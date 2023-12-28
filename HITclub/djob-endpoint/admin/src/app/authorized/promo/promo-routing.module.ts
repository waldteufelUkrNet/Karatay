import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromoComponent } from './promo.component';
import { PromoListComponent } from './promo-list/promo-list.component';

const routes: Routes = [
    {
        path: '',
        component: PromoComponent,
        children: [
            {path: '',component: PromoListComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PromoRoutingModule {}
