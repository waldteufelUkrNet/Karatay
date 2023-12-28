import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotifierModule } from 'angular-notifier';
import { HttpModule } from '@angular/http';
import {customHttpProvider} from './_helpers';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {NotAuthentication, IsAuthentication, IsSuperAdmin, UserService, CustomerService, ExecutorService, SpecialitesService, NotificationService, ValidationService, PipesModule, NotificationsModule, PromoService, OrderService, DisputesService, ConfigsService, PushService, EntitiesService, SupportService, ReportsService} from './shared'

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        NotifierModule.withConfig( {
            position: {
                horizontal: {
                    position: 'right',
                    distance: 12
                },
                vertical: {
                    position: 'bottom',
                    distance: 12,
                    gap: 10
                }
            },
            theme: 'material',
            behaviour: {
                autoHide: 5000,
                onClick: false,
                onMouseover: 'pauseAutoHide',
                showDismissButton: true,
                stacking: 4
            },
            animations: {
                enabled: true,
                show: {
                    preset: 'slide',
                    speed: 300,
                    easing: 'ease'
                },
                hide: {
                    preset: 'fade',
                    speed: 300,
                    easing: 'ease',
                    offset: 50
                },
                shift: {
                    speed: 300,
                    easing: 'ease'
                },
                overlap: 150
            }
        } ),
        HttpModule,
        PipesModule,
        NotificationsModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        customHttpProvider,
        NgbActiveModal,
        UserService,
        CustomerService,
        ExecutorService,
        SpecialitesService,
        PromoService,
        OrderService,
        DisputesService,
        ConfigsService,
        NotificationService,
        ValidationService,
        PipesModule,
        NotAuthentication,
        IsAuthentication,
        IsSuperAdmin,
        PushService,
        EntitiesService,
        SupportService,
        ReportsService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
