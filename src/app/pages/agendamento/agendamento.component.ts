import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectAgendamentos } from 'src/app/_store/agendamento.selectors';
import Agendamento from 'src/app/models/agendamento.model';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { ModalService } from 'src/app/services/modal.service';
import { Store } from '@ngrx/store';
import { retrievedAgendamentoList } from 'src/app/_store/agendamento.action';

@Component({
  selector: 'agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss'],
})
export class AgendamentoComponent implements OnInit {
  dataAtual = new Date();
  dataLocal = new Date(this.dataAtual.getTime() - (this.dataAtual.getTimezoneOffset() * 60000));

  dataSelecionada = this.dataLocal.toISOString().split('T')[0]; //resolver gambiarra acima
  agendamentos$ = this.store.select(selectAgendamentos);

  horas: any = [
    '08:00:00', '08:15:00', '08:30:00', '08:45:00', '09:00:00', '09:15:00', '09:30:00', '09:45:00', '10:00:00', '10:15:00', '10:30:00', '10:45:00', '11:00:00', '11:15:00', '11:30:00', '11:45:00', '12:00:00', '12:15:00', '12:30:00', '12:45:00', '13:00:00', '13:15:00', '13:30:00', '13:45:00', '14:00:00', '14:15:00', '14:30:00', '14:45:00', '15:00:00', '15:15:00', '15:30:00', '15:45:00', '16:00:00', '16:15:00', '16:30:00', '16:45:00', '17:00:00', '17:15:00', '17:30:00', '17:45:00', '18:00:00', '18:15:00', '18:30:00', '18:45:00', '19:00:00', '19:15:00', '19:30:00', '19:45:00', '20:00:00',
  ];

  cores: string[] = [
    '#2C3E50', '#34495E', '#7F8C8D', '#16A085', '#27AE60', '#2980B9', '#8E44AD', '#F39C12', '#D35400', '#1ABC9C', '#2ECC71', '#964B00', '#9B59B6', '#E74C3C', '#E67E22', '#95A5A6', '#FF5733', '#FFC300', '#964B00', '#FF57A0', '#57A0FF',
  ];

  constructor(
    private agendamentoService: AgendamentoService,
    private modalService: ModalService,
    private store: Store
  ) {}

  ngOnInit(): void {
    // this.atualizarListagem();
    this.atualizarCoresAleatorias();
  }

  atualizarListagem(): void {
    this.agendamentoService
      .getAgendamentos()
      .pipe(
        map((agendamentos: Agendamento[]) =>
          agendamentos.filter(
            (agendamento) => agendamento.data === this.dataSelecionada
          )
        )
      )
      .subscribe(
        (agendamentosFiltrados: Agendamento[]) => {
          this.store.dispatch(
            retrievedAgendamentoList({ agendamentos: agendamentosFiltrados })
          );
        },
        (error: any) => {
          console.error('Erro ao carregar os agendamentos:', error);
        }
      );
  }

  temAgendamento(hora: string): Observable<boolean> {
    return this.agendamentos$.pipe(
      map((agendamentos: any[]) =>
        agendamentos.some((agenda) => {
          if (agenda.data === this.dataSelecionada) {
            return agenda.hora === hora;
          }
          return false;
        })
      )
    );
  }

  agendarModal(
    referencia: string,
    dataSelecionada?: string,
    hora?: string,
    agendamentoComponent?: AgendamentoComponent
  ): void {
    if (referencia === 'adicionar') {
      this.modalService.agendarModal(
        referencia,
        dataSelecionada,
        hora,
        agendamentoComponent
      );
    }
  }

  agendaModal(referencia: string, agenda: Agendamento): void {
    if (referencia === 'agenda') {
      this.modalService.agendaModal(referencia, agenda);
    }
  }

  atualizarCoresAleatorias(): void {
    this.atualizarListagem();
  }

  diference(begin: string, end: string): string {
    let partBegin = begin.split(':');
    let partEnd = end.split(':');

    let diferenceMin =
      parseInt(partEnd[0]) * 60 +
      parseInt(partEnd[1]) -
      (parseInt(partBegin[0]) * 60 + parseInt(partBegin[1]));

    let hour = Math.floor(diferenceMin / 60);
    let minutes = diferenceMin % 60;

    let diference =
      (hour < 10 ? '0' : '') + hour + ':' + (minutes < 10 ? '0' : '') + minutes;

    return diference;
  }
}
