import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr'; // Correção aqui
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './_helpers/auth.interceptors';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { LoginComponent } from './pages/login/login.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localePT from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HoraFormatadaPipe } from './pipes/HoraFormatadaPipe';
import { NavbarComponent } from './components/navbar.component';

registerLocaleData(localePT);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AgendamentoComponent,
    HoraFormatadaPipe,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  exports: [HoraFormatadaPipe],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-br' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
