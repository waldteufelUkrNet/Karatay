import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleComponent } from './schedule.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';

const routes: Routes = [
    {
        path: '',
        component: ScheduleComponent,
        children: [
            {path: '',component: ScheduleListComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScheduleRoutingModule {}
