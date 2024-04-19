import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenericoModalComponent } from '../components/modals/GenericoModal/GenericoModal.component';


@Injectable({
    providedIn: 'root'
})
export class ModalService {

    constructor(public dialog: MatDialog) { }

    abrirModal(data: any): void {
        const dialogRef = this.dialog.open(GenericoModalComponent, {
            width: '400px',
            data: data
        });
    }
}
