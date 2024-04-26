import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Agendamento from 'src/app/models/agendamento.model';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-agenda-modal',
  templateUrl: './agendaModal.component.html',
  styleUrls: ['./agendaModal.component.scss'],
})
export class AgendaModalComponent {
  @Input() data: any;
  @Input()
  closedModal!: Function;
  agendaForm!: FormGroup;

  constructor(private modalService: ModalService, private fb: FormBuilder, private agendamentoService: AgendamentoService) {
    this.agendaForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      data: [{ value: '', disabled: true }],
      hora: [{ value: '', disabled: true }],
      titulo: [{ value: '', disabled: true }],
      observacao: [{ value: '', disabled: true }],
      contato: [{ value: '', disabled: true }],
      inicioAtendimento: [{ value: '', disabled: true }],
      fimAtendimento: [{ value: '', disabled: true }]
    });
  }

  ngOnInit() {
    this.agendaForm.patchValue(this.data.dados)

  }

  reagendarModal(agenda: Agendamento): void {
    this.modalService.reagendarModal('reagendar', agenda);
    this.closedModal();
  }

  fecharModal() {
    this.closedModal();
  }

  desagendar(_id: number) {
    this.agendamentoService.deleteAgendamento(_id);
    this.closedModal();
  }
}
