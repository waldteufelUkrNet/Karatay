import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AutocompleteComponent } from './autocomplete.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
    ],
    declarations: [AutocompleteComponent],
    exports: [AutocompleteComponent]
})
export class AutocompleteModule {}
