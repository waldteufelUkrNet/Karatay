import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigsRoutingModule } from './configs-routing.module';
import { ConfigsComponent } from './configs.component';
import { ConfigsFormComponent } from './configs-form/configs-form.component';
import { PageHeaderModule, PipesModule, AutocompleteModule, LocationModule } from '../../shared';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
    imports: [
        CommonModule,
        ConfigsRoutingModule,
        PageHeaderModule,
        PipesModule,
        NgbTooltipModule,
        FormsModule,
        NgbModule,
        AutocompleteModule,
        LocationModule,
        ClipboardModule,
        NgbTooltipModule
    ],
    declarations: [
        ConfigsComponent,
        ConfigsFormComponent
    ]
})
export class ConfigsModule {}
