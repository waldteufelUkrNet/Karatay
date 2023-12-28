import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-richtexteditor',
    templateUrl: './richtexteditor.component.html',
    styleUrls: ['./richtexteditor.component.scss']
})
export class RichtexteditorComponent implements OnInit {
    @Input() val = '';
    @Output() change = new EventEmitter();

    value;
    tools: object = {
        items: [
            'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
            'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
            'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
            'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
            'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
    };

    constructor() {}

    ngOnInit() {
        this.value = this.val;
    }

    setOutputValue(){
        this.change.emit(this.value);
    }
}
