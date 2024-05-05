import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Agendamento from '../models/agendamento.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AgendamentoService {
  private url = 'http://localhost:8888/api';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.url}/agenda`);
  }

  addAgendamento(
    data: any,
    _id: number,
    successCallback: (response: any) => void,
    errorCallback: (error: any) => void
  ) {
    this.http.post(`${this.url}/agenda/${_id}`, data).subscribe({
      next: (response) => {
        successCallback(response);
      },
      error: (error) => {
        errorCallback(error);
      },
    });
  }

  updateAgendamento(data: Agendamento, _id: number) {
    return this.http
      .put(`${this.url}/agenda/${_id}`, data, { responseType: 'text' })
      .subscribe({
        next: () => {
          this.toastr.success(
            'Agendamento atualizado com sucesso!',
            'ATENÇÃO!',
            {
              timeOut: 2000,
            }
          );
        },
        error: () => {
          this.toastr.error(
            'Erro ao tentar atualizar, favor tente novamente.',
            'ATENÇÃO!',
            {
              timeOut: 2000,
            }
          );
        },
      });
  }

  deleteAgendamento(_id: number) {
    return this.http
      .delete(`${this.url}/agenda/${_id}`, { responseType: 'text' })
      .subscribe({
        next: () => {
          this.toastr.success('Agendamento excluído com sucesso!', 'ATENÇÃO!', {
            timeOut: 2000,
          });
        },
        error: () => {
          this.toastr.error(
            'Erro ao tentar excluído, favor tente novamente.',
            'ATENÇÃO!',
            {
              timeOut: 2000,
            }
          );
        },
      });
  }
}
