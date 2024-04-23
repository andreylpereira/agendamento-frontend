import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgendamentoService } from 'src/app/services/agendamento.service';

@Component({
  selector: 'app-agendar-modal',
  templateUrl: './agendarModal.component.html',
  styleUrls: ['./agendarModal.component.scss'],
})
export class AgendarModalComponent {
  @Input() data: any;
  @Input() closedModal!: Function;
  agendarForm: FormGroup;

  constructor(private fb: FormBuilder, private agendamentoService: AgendamentoService) {
    this.agendarForm = this.fb.group({
      data: [{ value: '', disabled: true }, Validators.required],
      hora: [{ value: '', disabled: true }, Validators.required],
      titulo: ['', Validators.required],
      observacao: ['', Validators.required],
      contato: ['', Validators.required],
      inicioAtendimento: [''],
      fimAtendimento: [''],
    });
  }

  ngOnInit() {
    this.agendarForm.patchValue({
      data: this.data.dataSelecionada,
      hora: this.data.hora,
    });
  }

  agendar() {
    if (this.agendarForm.valid) {
      const formData = this.agendarForm.value;
      formData.data = this.data.dataSelecionada;
      formData.hora = this.data.hora;
      this.agendamentoService.addAgendamento(formData);
      this.fecharModal();
    } else {
      // tratar invalidos
    }
  }

  fecharModal() {
    this.closedModal();
  }
}
