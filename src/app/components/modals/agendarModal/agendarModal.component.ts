import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgendamentoComponent } from 'src/app/pages/agendamento/agendamento.component';
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

  constructor(private fb: FormBuilder, private agendamentoService: AgendamentoService, 
    private loginService: LoginService, 
    //private agendamento: AgendamentoComponent
  ) {
    this.agendarForm = this.fb.group({
      data: [{ value: '', disabled: true }, Validators.required],
      hora: [{ value: '', disabled: true }, Validators.required],
      titulo: ['', Validators.required],
      observacao: ['', Validators.required],
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
      this.agendamentoService.addAgendamento(formData, userId?.id);
      //this.agendamento.AtualizarPosAcao();
      this.fecharModal();
    }
  }

  fecharModal() {
    this.closedModal();
  }
}
