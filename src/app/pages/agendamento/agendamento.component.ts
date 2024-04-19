import { Component, OnInit } from '@angular/core';
import Agendamento from 'src/app/models/agendamento.model';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { ModalService } from 'src/app/services/modal.service';
@Component({
  selector: 'agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss'],
})
export class AgendamentoComponent implements OnInit {

  dataSelecionada: string = new Date().toISOString().split('T')[0];
  agendamentos: Agendamento[] = [];
  horas: any = [
    '08:00:00', '08:15:00', '08:30:00', '08:45:00', '09:00:00', '09:15:00', '09:30:00', '09:45:00', '10:00:00',
    '10:15:00', '10:30:00', '10:45:00', '11:00:00', '11:15:00', '11:30:00', '11:45:00', '12:00:00', '12:15:00',
    '12:30:00', '12:45:00', '13:00:00', '13:15:00', '13:30:00', '13:45:00', '14:00:00', '14:15:00', '14:30:00',
    '14:45:00', '15:00:00', '15:15:00', '15:30:00', '15:45:00', '16:00:00', '16:15:00', '16:30:00', '16:45:00',
    '17:00:00', '17:15:00', '17:30:00', '17:45:00', '18:00:00', '18:15:00', '18:30:00', '18:45:00', '19:00:00',
    '19:15:00', '19:30:00', '19:45:00', '20:00:00'
  ]

  constructor(private agendamentoService: AgendamentoService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.atualizarListagem();
  }


  atualizarListagem(): void {
    this.agendamentoService.getAgendamentos(this.dataSelecionada).subscribe(
      (data: Agendamento[]) => {
        if (data && data.length > 0) {
          this.agendamentos = data;
        } else {
          this.agendamentos = [];
        }
      },
      (error) => {
        console.error('Erro ao carregar os agendamentos:', error);
      }
    );
  }

  temAgendamento(hora: string): boolean {
    return this.agendamentos.some(agenda => agenda.hora === hora);
  }
  

  abrirMeuModal(): void {
    // Aqui você pode passar os dados que deseja enviar para o modal
    const data = {
      titulo: 'Título do Modal',
      mensagem: 'Esta é uma mensagem para o modal.'
    };
  
    // Chama o método abrirModal do ModalService e passa os dados
    this.modalService.abrirModal(data);
}
}