import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

import {ForgotRoutingModule} from './forgot-routing.module';
import {ForgotComponent} from './forgot.component';
import {FormsModule} from '@angular/forms';
import {PipesModule} from '../shared'

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        ForgotRoutingModule,
        FormsModule,
        PipesModule
    ],
    declarations: [ForgotComponent]
})
export class ForgotModule {
}
