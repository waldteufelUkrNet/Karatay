import {Injectable} from '@angular/core';
import is from 'is_js';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    constructor() {
    }

    email(val) {
        return is.email(val);
    }

    password(val) {
        return val && val.length > 3
    }

    name(val) {
        if(val){
            return val.match(/^([a-zA-ZÀ-ÿ0-9_]).{3,100}$/);
        } else {
            return false;
        }
    }

    contact(val) {
        if(val){
            return val.match(/^([a-zA-ZÀ-ÿ0-9_+]).{3,255}$/);
        } else {
            return false;
        }
    }
}
