import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { ConfService } from './conf.service';


@Injectable()
export class HttpInterceptor_ implements HttpInterceptor {

    constructor(private confService: ConfService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Clone the request to add the new header.

        if (this.confService['data_server']) {
            var req = req.clone({url: `${this.confService['data_server']}/${req.url}`});
        }
        //const authReq = req.clone({headers: req.headers.set("headerName", "headerValue")});

        //send the newly created request
        return next.handle(req);
    }
}