import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-generico-modal',
  templateUrl: './GenericoModal.component.html',
  styleUrls: ['./GenericoModal.component.css']
})
export class GenericoModalComponent {

  constructor(
    public dialogRef: MatDialogRef<GenericoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  fecharModal(): void {
    this.dialogRef.close();
  }
 }
