import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Login from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(5)]],
      senha: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  login() {
    this.isLoading = true;

    setTimeout(() => {
      if (this.loginForm.invalid) {
        this.isLoading = false;
        return;
      }

      const usuario: Login = {
        login: this.loginForm.value.login,
        senha: this.loginForm.value.senha,
      };

      this.loginService.login(usuario);
      this.loginForm.reset();
      this.isLoading = false;
    }
    , 2000);

}
}
