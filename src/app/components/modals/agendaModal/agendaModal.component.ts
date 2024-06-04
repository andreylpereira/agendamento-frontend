import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { updateAgendamento } from 'src/app/_store/agendamento.action';
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
  formData: any;

  horas: any = [
    '08:00:00',
    '08:15:00',
    '08:30:00',
    '08:45:00',
    '09:00:00',
    '09:45:00',
    '10:00:00',
    '10:15:00',
    '10:30:00',
    '10:45:00',
    '11:00:00',
    '11:15:00',
    '11:30:00',
    '11:45:00',
    '12:00:00',
    '12:15:00',
    '12:30:00',
    '12:45:00',
    '13:00:00',
    '13:15:00',
    '13:30:00',
    '13:45:00',
    '14:00:00',
    '14:15:00',
    '14:30:00',
    '14:45:00',
    '15:00:00',
    '15:15:00',
    '15:30:00',
    '15:45:00',
    '16:00:00',
    '16:15:00',
    '16:30:00',
    '16:45:00',
    '17:00:00',
    '17:15:00',
    '17:30:00',
    '17:45:00',
    '18:00:00',
    '18:15:00',
    '18:30:00',
    '18:45:00',
    '19:00:00',
    '19:15:00',
    '19:30:00',
    '19:45:00',
    '20:00:00',
  ];

  constructor(private modalService: ModalService, private fb: FormBuilder,
    private agendamentoService: AgendamentoService,
    private toastr: ToastrService,
    private store: Store
  ) {
    this.agendaForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      data: [{ value: '', disabled: true }],
      hora: [{ value: '', disabled: true }],
      titulo: [{ value: '', disabled: true }],
      observacao: [{ value: '', disabled: true }],
      contato: [{ value: '', disabled: true }],
      inicioAtendimento: [{ value: '', disabled: true }],
      fimAtendimento: [{ value: '', disabled: true }],
    });
  }

  ngOnInit() {
    this.agendaForm.patchValue(this.data.dados);
    this.formData = { ...this.agendaForm.value };
  }

  reagendarModal(agenda: any): void {
    this.modalService.reagendarModal('reagendar', agenda);
    this.closedModal();
  }

  fecharModal() {
    this.closedModal();
  }

  desagendar(_id: number): void {
    this.modalService.desagendarModal('desagendar', _id);
    this.closedModal();
  }

  iniciarAtendimento() {
    const dataAtual = new Date();
    const horaAtualizada = `${dataAtual.getHours()}:${dataAtual.getMinutes()}`;
    this.formData = { ...this.agendaForm.value };
    this.formData.hora = this.formatarHora(this.formData.hora);
    this.formData.inicioAtendimento = this.formatarHora(horaAtualizada);
    this.formData.fimAtendimento = this.formatarHora(this.formData.fimAtendimento);


    if (!this.agendaForm.valid) {
      if (
        this.isEquals(this.horas, this.formData.hora) &&
        this.compareTimes(
          this.formData.inicioAtendimento,
          this.formData.inicioAtendimento
        )
      ) {
        this.agendamentoService
          .updateAgendamento(this.formData, this.formData.id)
          .subscribe({
            next: () => {
              this.store.dispatch(
                updateAgendamento({ id: this.formData.id, agendamento: this.formData })
              );
              this.agendaForm.patchValue({ inicioAtendimento: this.formatarHora(
                this.formData.inicioAtendimento) });
              this.toastr.success('Atendimento iniciado!', 'ATENÇÃO!', {
                timeOut: 2000,
              });

            },
            error: () => {
              this.toastr.error(
                'Erro ao tentar iniciar o atendimento, favor tentar novamente.',
                'ATENÇÃO!',
                { timeOut: 2000 }
              );
            },
          });
      }
    } else {
      this.toastr.error(
        'Não é possível iniciar o atendimento com dados incorretos, verifique os erros abaixo dos campos.',
        'ATENÇÃO!',
        { timeOut: 2000 }
      );
    }
  }

  finalizarAtendimento() {
    const dataAtual = new Date();
    const horaAtualizada = `${dataAtual.getHours()}:${dataAtual.getMinutes()}`;
    this.formData = { ...this.agendaForm.value };
    this.formData.hora = this.formatarHora(this.formData.hora);
    this.formData.inicioAtendimento = this.formatarHora(this.formData.inicioAtendimento);
    this.formData.fimAtendimento = this.formatarHora(horaAtualizada);

    if (!this.agendaForm.valid) {
      if (
        this.isEquals(this.horas, this.formData.hora) &&
        this.compareTimes(
          this.formData.inicioAtendimento,
          this.formData.inicioAtendimento
        )
      ) {
        this.agendamentoService
          .updateAgendamento(this.formData, this.formData.id)
          .subscribe({
            next: () => {
              this.store.dispatch(
                updateAgendamento({ id: this.formData.id, agendamento: this.formData })
              );
              this.agendaForm.patchValue({ fimAtendimento: this.formatarHora(
                this.formData.fimAtendimento) });
              this.toastr.success('Atendimento finalizado!', 'ATENÇÃO!', {
                timeOut: 2000,
              });

            },
            error: () => {
              this.toastr.error(
                'Erro ao tentar finalizar o atendimento, favor tentar novamente.',
                'ATENÇÃO!',
                { timeOut: 2000 }
              );
            },
          });
      }
    } else {
      this.toastr.error(
        'Não é possível finalizar o atendimento com dados incorretos, verifique os erros abaixo dos campos.',
        'ATENÇÃO!',
        { timeOut: 2000 }
      );
    }
  }

  isEquals(hours: string[], hour: string): boolean {
    return hours.includes(hour);
  }

  isValid(time1: string, time2: string): boolean {
    return this.compareTimes(time1, time2);
  }

  compareTimes(time1: string, time2: string): boolean {
    return time2.localeCompare(time1) >= 0;
  }

  formatarHora(hora: string) {
    const partes = hora.split(':');
    const horas = partes[0];
    const minutos = partes[1];
    const segundos = partes[2] || '00';
    return `${horas}:${minutos}:${segundos}`;
  }
}
