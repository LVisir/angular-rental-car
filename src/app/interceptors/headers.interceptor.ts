import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from "../services/user.service";

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {
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

  urlCustomer(url: string, customerId: string | null): string {
    let s = url.split('/')
    let result = ''
    for (let x = 0; x < (s.length - 1); x++) {
      result = result + s[x] + '/'
    }
    console.log('result ' + result)
    result = result + 'customers' + '/' + customerId

    return result
  }
}
