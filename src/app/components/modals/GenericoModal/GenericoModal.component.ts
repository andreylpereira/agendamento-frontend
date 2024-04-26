import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { retrievedAgendamentoList } from 'src/app/_store/agendamento.action';
import { AppState } from 'src/app/app.state';
import Agendamento from 'src/app/models/agendamento.model';
import { AgendamentoService } from 'src/app/services/agendamento.service';


@Component({
  selector: 'app-generico-modal',
  templateUrl: './GenericoModal.component.html',
  styleUrls: ['./GenericoModal.component.css']
})
export class GenericoModalComponent {

  dados: any;

  constructor(
    private agendamentoService: AgendamentoService,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<GenericoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dados = data;
    this.fecharModal = this.fecharModal.bind(this);
  }

  atualizarListagem(): void {
    this.agendamentoService.getAgendamentos().pipe(
      filter((agendamentos: Agendamento[]) => 
        agendamentos.some(agendamento => agendamento.data === this.data.dataSelecionada)
      )
    ).subscribe(
      (agendamentosFiltrados: Agendamento[]) => {
        this.store.dispatch(retrievedAgendamentoList({ agendamentos: agendamentosFiltrados }));
      },
      (error: any) => {
        console.error('Erro ao carregar os agendamentos:', error);
      }
    );
  }

  fecharModal(): void {
    this.atualizarListagem();
    this.dialogRef.close();
  }
 }
