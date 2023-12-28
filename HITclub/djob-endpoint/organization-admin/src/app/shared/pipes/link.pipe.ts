import {Pipe, PipeTransform} from '@angular/core';
import {appConfig} from '../../app.config';

@Pipe({
    name: 'link'
})
export class LinkPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let new_link = '/' + appConfig.adminUrl;
        if (value !== '') {
            new_link += '/' + value;
        }
        return new_link;
    }

}
