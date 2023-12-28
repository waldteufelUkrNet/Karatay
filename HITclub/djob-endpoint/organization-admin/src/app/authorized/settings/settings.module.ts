import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        SettingsRoutingModule,
        PageHeaderModule,
        FormsModule
    ],
    declarations: [SettingsComponent]
})
export class SettingsModule {}
