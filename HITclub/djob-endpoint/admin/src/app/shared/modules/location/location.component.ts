import {Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
    @Output() change = new EventEmitter();
    @Input() default;

    constructor(
        private modalService: NgbModal
    ) {}

    ngOnInit() {}

    openModal(content) {
        this.modalService.open(content);
    }

    changeEmit(event) {
        this.change.emit(event);
    }
}
