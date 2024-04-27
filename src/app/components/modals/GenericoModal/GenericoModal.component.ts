import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-generico-modal',
  templateUrl: './GenericoModal.component.html',
  styleUrls: ['./GenericoModal.component.css']
})
export class GenericoModalComponent {

  dados: any;

  constructor(
    public dialogRef: MatDialogRef<GenericoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dados = data;
    this.fecharModal = this.fecharModal.bind(this);
  }

  fecharModal(): void {
    this.dialogRef.close();
  }
 }
