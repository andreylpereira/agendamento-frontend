import { Injectable } from '@angular/core';
import Login from '../models/login.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly url: string;

  private user: {
    id: number;
    login: string;
    sub: string;
    nome: string;
    token: string;
  } = {
    id: 0,
    login: '',
    sub: '',
    nome: '',
    token: '',
  };


  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private jwtHelper: JwtHelperService
  ) {
    this.url = 'http://localhost:8888/api/auth/login';
  }

  login(login: Login) {
    return this.http.post<Login>(this.url, login).subscribe({
      next: (res: any) => {
        const payload = this.jwtHelper.decodeToken(res.acessToken);
        this.user.id = payload.id
        this.user.sub = payload.sub
        this.user.nome = payload.name
        this.user.token = `${res.acessToken}`
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.router.navigate(['/home']);
        this.toastr.success('Login efetuado com sucesso!', 'SUCESSO!', {
          timeOut: 2000,
        });
      },
      error: (err: any) => {
        this.toastr.error('Não foi possível iniciar a sessão.', 'ATENÇÃO!', {
          timeOut: 2000,
        });
      },
    });
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.toastr.success('Logout efetuado com sucesso!', 'SUCESSO!', {
      timeOut: 2000,
    });
    this.router.navigate(['auth']);
  }

  getUser() {
    const session: any = localStorage.getItem('currentUser');
    const data = JSON.parse(session);
    if (data !== null) {
      this.user.id = data.id;
      this.user.login = data.login;
      this.user.nome = data.nome;
      this.user.sub = data.sub;
      this.user.token = data.token;
      return this.user;
    } else {
      return null;
    }
  }
}
