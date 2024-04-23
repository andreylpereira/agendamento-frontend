import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import Agendamento from '../models/agendamento.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private url = 'assets/mocks/data.json';
  //http://localhost:8888

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getAgendamentos(data: string): Observable<Agendamento[]> {
    return this.http.get<{ agendamento: Agendamento[] }>(this.url).pipe(
      map(response => response.agendamento.filter(agendamento => agendamento.data === data))
    );
  }

  addAgendamento(data: Agendamento, _id: number) {

    return this.http
      .post<Agendamento>(`${this.url}/agenda/${_id}`, data)
      .subscribe({
        next: () => {
          this.toastr.success("Agendamento efetuado com sucesso!", "ATENÇÃO", {
            timeOut: 2000,
          });
        },
        error: () => {
          this.toastr.error("Erro ao tentar agendar, favor tente novamente!", "ATENÇÃO", {
            timeOut: 2000,
          });
        },
      });
  }

  updateAgendamento(data: Agendamento, _id: number) {
    return this.http
      .put<Agendamento>(`${this.url}/agenda/${_id}`, data)
      .subscribe({
        next: () => {
          this.toastr.success("Agendamento atualizado com sucesso!", "ATENÇÃO", {
            timeOut: 2000,
          });
        },
        error: () => {
          this.toastr.error("Erro ao tentar atualizar, favor tente novamente!", "ATENÇÃO", {
            timeOut: 2000,
          });
        },
      });
  }

  deleteAgendamento(_id: number) {
    return this.http
      .delete<any>(`${this.url}/agenda/${_id}`)
      .subscribe({
        next: () => {
          this.toastr.success("Agendamento atualizado com sucesso!", "ATENÇÃO", {
            timeOut: 2000,
          });
        },
        error: () => {
          this.toastr.error("Erro ao tentar atualizar, favor tente novamente!", "ATENÇÃO", {
            timeOut: 2000,
          });
        },
      });
  }
}
