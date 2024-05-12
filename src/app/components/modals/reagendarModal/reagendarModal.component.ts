import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { updateAgendamento } from 'src/app/_store/agendamento.action';
import { AgendamentoService } from 'src/app/services/agendamento.service';

@Component({
  selector: 'app-reagendar-modal',
  templateUrl: './reagendarModal.component.html',
  styleUrls: ['./reagendarModal.component.scss'],
})
export class ReagendarModalComponent {
  @Input() data: any;
  @Input() closedModal!: Function;

  reagendarForm: FormGroup;
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
  isvalid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private agendamentoService: AgendamentoService,
    private toastr: ToastrService,
    private store: Store
  ) {
    this.reagendarForm = this.fb.group({
      id: ['', Validators.required],
      data: ['', Validators.required],
      hora: ['', Validators.required],
      titulo: ['', Validators.required],
      observacao: ['', Validators.required],
      contato: ['', Validators.required,],
      inicioAtendimento: [''],
      fimAtendimento: [''],
    });
  }

  ngOnInit() {
    this.reagendarForm.patchValue(this.data.dados);
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

  reagendar() {
    if (this.reagendarForm.valid) {
      let formData = this.reagendarForm.value;
      formData.hora = this.formatarHora(formData.hora);
      formData.inicioAtendimento = this.formatarHora(
        formData.inicioAtendimento
      );
      formData.fimAtendimento = this.formatarHora(formData.fimAtendimento);

      if (
        this.isEquals(this.horas, formData.hora) &&
        this.compareTimes(
          formData.inicioAtendimento,
          formData.inicioAtendimento
        )
      ) {
        this.agendamentoService
          .updateAgendamento(formData, formData.id)
          .subscribe({
            next: () => {
              this.store.dispatch(
                updateAgendamento({ id: formData.id, agendamento: formData })
              );
              this.toastr.success(
                'Agendamento atualizado com sucesso!',
                'ATENÇÃO!',
                { timeOut: 2000 }
              );
            },
            error: () => {
              this.toastr.error(
                'Erro ao tentar atualizar, favor tentar novamente.',
                'ATENÇÃO!',
                { timeOut: 2000 }
              );
            },
          });
        this.fecharModal();
      }
    } else {
      this.toastr.error(
        'Não é possível reagendar com dados incorretos, verifique os erros abaixo dos campos.',
        'ATENÇÃO!',
        { timeOut: 2000 }
      );
    }
  }

  iniciarAtendimento() {
    const dataAtual = new Date();
    const horaAtualizada = `${dataAtual.getHours()}:${dataAtual.getMinutes()}`;
    let formData = { ...this.reagendarForm.value };
    formData.hora = this.formatarHora(formData.hora);
    formData.inicioAtendimento = this.formatarHora(horaAtualizada);
    formData.fimAtendimento = this.formatarHora(formData.fimAtendimento);

    if (this.reagendarForm.valid) {
      if (
        this.isEquals(this.horas, formData.hora) &&
        this.compareTimes(
          formData.inicioAtendimento,
          formData.inicioAtendimento
        )
      ) {
        this.agendamentoService
          .updateAgendamento(formData, formData.id)
          .subscribe({
            next: () => {
              this.store.dispatch(
                updateAgendamento({ id: formData.id, agendamento: formData })
              );
              this.toastr.success('Atendimento iniciado!', 'ATENÇÃO!', {
                timeOut: 2000,
              });
              this.fecharModal();
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
    let formData = { ...this.reagendarForm.value };
    formData.hora = this.formatarHora(formData.hora);
    formData.inicioAtendimento = this.formatarHora(formData.inicioAtendimento);
    formData.fimAtendimento = this.formatarHora(horaAtualizada);

    if (this.reagendarForm.valid) {
      if (
        this.isEquals(this.horas, formData.hora) &&
        this.compareTimes(
          formData.inicioAtendimento,
          formData.inicioAtendimento
        )
      ) {
        this.agendamentoService
          .updateAgendamento(formData, formData.id)
          .subscribe({
            next: () => {
              this.store.dispatch(
                updateAgendamento({ id: formData.id, agendamento: formData })
              );
              this.toastr.success('Atendimento finalizado!', 'ATENÇÃO!', {
                timeOut: 2000,
              });
              this.fecharModal();
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

  fecharModal() {
    this.closedModal();
  }

  formatarHora(hora: string) {
    const partes = hora.split(':');
    const horas = partes[0];
    const minutos = partes[1];
    const segundos = partes[2] || '00';
    return `${horas}:${minutos}:${segundos}`;
  }
}
