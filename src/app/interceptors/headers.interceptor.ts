import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url === 'http://localhost:8091/login') {
      const modifiedRequest = request.clone({
        setHeaders: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
      return next.handle(modifiedRequest);
    }

    let modifiedRequest = request.clone({
      setHeaders: {
        'Content-type': 'application/json',
        'Authorization': `LoginToken ${sessionStorage.getItem('tokenJWT')}`
      }
    })

    return next.handle(modifiedRequest);
  }
}
