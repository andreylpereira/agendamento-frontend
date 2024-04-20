import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reagendar-modal',
  templateUrl: './reagendarModal.component.html',
  styleUrls: ['./reagendarModal.component.scss'],
})
export class ReagendarModalComponent {
  @Input() data: any;

}
