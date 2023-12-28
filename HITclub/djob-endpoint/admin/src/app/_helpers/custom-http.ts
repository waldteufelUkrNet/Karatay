import { Injectable } from '@angular/core';
import { ConnectionBackend, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from '@angular/http'
import { appConfig } from '../app.config';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class CustomHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(appConfig.apiUrl + url, this.addJwt(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(appConfig.apiUrl + url, body, this.addJwt(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(appConfig.apiUrl + url, body, this.addJwt(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(appConfig.apiUrl + url, this.addJwt(options));
    }

    private addJwt(options?: RequestOptionsArgs): RequestOptionsArgs {
        options = options || new RequestOptions();
        options.headers = options.headers || new Headers();
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            options.headers.append('token', user.token);
        }
        return options;
    }

    private handleError(error: any) {
        if (error.status === 401) {
            window.location.href = '/login';
        }

        return Observable.throw(error._body);
    }
}

export function customHttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new CustomHttp(xhrBackend, requestOptions);
}

export let customHttpProvider = {
    provide: Http,
    useFactory: customHttpFactory,
    deps: [XHRBackend, RequestOptions]
};
