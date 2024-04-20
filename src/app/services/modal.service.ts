import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenericoModalComponent } from '../components/modals/GenericoModal/GenericoModal.component';
import Agendamento from '../models/agendamento.model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(public dialog: MatDialog) {}

  agendarModal(
    referencia: string,
    dataSelecionada?: string,
    hora?: string
  ): void {
    const dialogRef = this.dialog.open(GenericoModalComponent, {
      width: '400px',
      data: { referencia, dataSelecionada, hora },
    });
  }

  reagendarModal(referencia: string, dados: Agendamento): void {
    const dialogRef = this.dialog.open(GenericoModalComponent, {
      width: '400px',
      data: { referencia, dados },
    });
  }

  agendaModal(referencia: string, dados: Agendamento): void {
    const dialogRef = this.dialog.open(GenericoModalComponent, {
      width: '400px',
      data: { referencia, dados },
    });
  }
}
