import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
    @Input() service;
    @Input() placeholder = 'Выберите из списка';
    @Input() default;
    @Input() filter;
    @Input() text_fields = [];
    @Output() change = new EventEmitter();

    isOpened = false;
    selected;
    list;
    search;
    searchTimeout;
    empty = [{id: null, name: 'Не выбрано'}];
    constructor() {}

    ngOnInit() {
        if(this.default){
            this.selected = this.default.value;
            this.search = this.default.text;
        }
    }

    refreshtList(){
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.service.autocomplete(this.search, this.filter)
                .then(resp => {
                    this.list = [];
                    for(let i=0;i<resp.length;i++){
                        let item = resp[i];
                        if(this.text_fields.length){
                            item.label_val = '';
                            for(let i=0;i<this.text_fields.length;i++){
                                item.label_val += (i===0) ? item[this.text_fields[i]] : ' ' + item[this.text_fields[i]]
                            }
                        } else {
                            item.label_val = item.name;
                        }
                        this.list.push(item);
                    }
                    if(this.list.length){
                        this.openOptions();
                    }
                })
        }, 1500);
    }

    openOptions(){
        if((!this.search || this.search === '') && (!this.list || !this.list.length)){
            this.refreshtList();
        }
        this.isOpened = true;
    }

    toggleOptions(){
        this.isOpened = !this.isOpened;
    }

    changeValue(item){
        this.selected = item.id;

        let val_text = '';

        if(this.text_fields.length){
            val_text = '';
            for(let i=0;i<this.text_fields.length;i++){
                val_text += (i===0) ? item[this.text_fields[i]] : ' ' + item[this.text_fields[i]]
            }
        } else {
            val_text = item.name;
        }

        this.search = val_text;
        this.toggleOptions();
        this.change.emit({
            changed: true,
            value: this.selected,
            name: val_text
        });
    }
}
