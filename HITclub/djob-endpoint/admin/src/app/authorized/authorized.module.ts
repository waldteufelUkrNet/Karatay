import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthorizedRoutingModule } from './authorized-routing.module';
import { AuthorizedComponent } from './authorized.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import {PipesModule} from '../shared'

@NgModule({
    imports: [
        CommonModule,
        AuthorizedRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        PipesModule
    ],
    declarations: [AuthorizedComponent, SidebarComponent, HeaderComponent],
})
export class AuthorizedModule {}
