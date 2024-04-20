import { Component, Input } from '@angular/core';
import Agendamento from 'src/app/models/agendamento.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-agenda-modal',
  templateUrl: './agendaModal.component.html',
  styleUrls: ['./agendaModal.component.scss'],
})
export class AgendaModalComponent {
  @Input() data: any;

  constructor(

    private modalService: ModalService
  ) {}

  reagendarModal(agenda: Agendamento): void {
      this.modalService.reagendarModal("reagendar", agenda);
  }
}
