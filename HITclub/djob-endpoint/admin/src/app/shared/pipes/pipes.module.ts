import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LinkPipe} from './index'

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        LinkPipe
    ],
    declarations: [
        LinkPipe
    ],
    exports: [
        LinkPipe
    ]
})
export class PipesModule { }
