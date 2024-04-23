import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import Agendamento from '../models/agendamento.model';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private mocks = 'assets/mocks/data.json';

  constructor(private http: HttpClient) { }

  getAgendamentos(data: string): Observable<Agendamento[]> {
    return this.http.get<{ agendamento: Agendamento[] }>(this.mocks).pipe(
      map(response => response.agendamento.filter(agendamento => agendamento.data === data))
    );
  }

  addAgendamento(data: Agendamento): Observable<any> {
  
    return this.http.post<any>(this.mocks, data).pipe(
      tap((res: any) => {
        console.log(res); 
      }),
      catchError((err: any) => {
        console.error(err); 
        return of(null);
      })
    );
  }
}
