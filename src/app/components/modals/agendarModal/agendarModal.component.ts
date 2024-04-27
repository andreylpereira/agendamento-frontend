import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { addAgendamento } from 'src/app/_store/agendamento.action';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-agendar-modal',
  templateUrl: './agendarModal.component.html',
  styleUrls: ['./agendarModal.component.scss'],
})
export class AgendarModalComponent {
  @Input() data: any;
  @Input() closedModal!: Function;
  agendarForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private agendamentoService: AgendamentoService,
    private loginService: LoginService,
    private store: Store,
    private toastr: ToastrService
  ) {
    this.agendarForm = this.fb.group({
      data: [{ value: '', disabled: true }, Validators.required],
      hora: [{ value: '', disabled: true }, Validators.required],
      titulo: ['', Validators.required],
      observacao: [''],
      contato: ['', Validators.required],
      inicioAtendimento: ['00:00:00'],
      fimAtendimento: ['00:00:00'],
    });
  }

  ngOnInit() {
    this.agendarForm.patchValue({
      data: this.data.dataSelecionada,
      hora: this.data.hora,
    });
  }

  agendar() {
    const userId = this.loginService.getUser();

    if (this.agendarForm.valid && userId) {
      const formData = this.agendarForm.value;
      formData.data = this.data.dataSelecionada;
      formData.hora = this.data.hora;

      this.agendamentoService.addAgendamento(
        formData,
        userId?.id,
        (response: any) => {
          formData.id = response.id;
          this.store.dispatch(addAgendamento({ agendamento: formData }));
          this.toastr.success('Agendamento efetuado com sucesso!', 'ATENÇÃO', {
            timeOut: 2000,
          });
          this.fecharModal();
        },
        (error) => {
          console.error('Erro ao tentar agendar:', error);
          this.toastr.error(
            'Erro ao tentar agendar, favor tente novamente!',
            'ATENÇÃO',
            {
              timeOut: 2000,
            }
          );
        }
      );
    }
  }

  fecharModal() {
    this.closedModal();
  }
}
