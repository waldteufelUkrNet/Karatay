import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './history.component';
import { HistoryListComponent } from './history-list/history-list.component';

const routes: Routes = [
    {
        path: '',
        component: HistoryComponent,
        children: [
            {path: '',component: HistoryListComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HistoryRoutingModule {}
