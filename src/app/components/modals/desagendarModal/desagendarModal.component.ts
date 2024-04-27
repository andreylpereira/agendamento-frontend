import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { removeAgendamento } from 'src/app/_store/agendamento.action';
import { AgendamentoService } from 'src/app/services/agendamento.service';

@Component({
  selector: 'app-desagendar-modal',
  templateUrl: './desagendarModal.component.html',
  styleUrls: ['./desagendarModal.component.scss'],
})
export class DesagendarModalComponent implements OnInit {
  @Input() data: any;
  @Input() closedModal!: Function;
  constructor(
    private agendamentoService: AgendamentoService,
    private store: Store
  ) {}

  ngOnInit(): void {}

  fecharModal() {
    this.closedModal();
  }

  desagendar() {
    this.agendamentoService.deleteAgendamento(this.data._id);
    this.store.dispatch(removeAgendamento({ id: this.data._id }));
    this.closedModal();
  }
}
