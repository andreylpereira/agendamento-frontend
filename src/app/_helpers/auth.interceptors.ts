import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (req.url.includes('/api/auth/login')) {
      return next.handle(req);
    }

    const user = this.loginService.getUser();
    if (user && user.token) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + user.token,
        },
      });
    }

    return next.handle(req);
  }
}
