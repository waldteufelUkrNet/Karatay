import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LinkPipe, DatePipe} from './index'

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        LinkPipe,
        DatePipe
    ],
    declarations: [
        LinkPipe,
        DatePipe
    ],
    exports: [
        LinkPipe,
        DatePipe
    ]
})
export class PipesModule { }
