import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reagendar-modal',
  templateUrl: './reagendarModal.component.html',
  styleUrls: ['./reagendarModal.component.scss'],
})
export class ReagendarModalComponent {
  @Input() data: any;
  @Input()
  closedModal!: Function;
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

  constructor(private fb: FormBuilder) {
    this.reagendarForm = this.fb.group({
      id: [Validators.required],
      data: [Validators.required],
      hora: [Validators.required],
      titulo: ['', Validators.required],
      observacao: ['', Validators.required],
      contato: ['', Validators.required],
      inicioAtendimento: [''],
      fimAtendimento: [''],
    });
  }

  ngOnInit() {
    this.reagendarForm.patchValue(this.data.dados);
  }

  reagendar() {
    if (this.reagendarForm.valid) {
      const formData = this.reagendarForm.value;
      console.log(formData);
      this.fecharModal();
    } else {
      // tratar invalidos
    }
  }

  fecharModal() {
    this.closedModal();
  }
}
