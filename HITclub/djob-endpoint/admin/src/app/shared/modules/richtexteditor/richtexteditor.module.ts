import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RichtexteditorComponent } from './richtexteditor.component';
import { FormsModule } from '@angular/forms';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        RichTextEditorAllModule
    ],
    declarations: [RichtexteditorComponent],
    exports: [RichtexteditorComponent]
})
export class RichtexteditorModule {}
