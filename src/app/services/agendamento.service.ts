import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import Agendamento from '../models/agendamento.model';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private mocks = 'assets/mocks/data.json';

  constructor(private http: HttpClient) { }

  // getAgendamentos(): Observable<Agendamento[]> {
  //   return this.http.get<{ agendamento: Agendamento[] }>(this.mocks).pipe(
  //     map(response => response.agendamento)
  //   );
  // }


  getAgendamentos(data: string): Observable<Agendamento[]> {
    return this.http.get<{ agendamento: Agendamento[] }>(this.mocks).pipe(
      map(response => response.agendamento.filter(agendamento => agendamento.data === data))
    );
  }
}
