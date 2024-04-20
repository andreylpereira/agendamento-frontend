import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-agendar-modal',
  templateUrl: './agendarModal.component.html',
  styleUrls: ['./agendarModal.component.scss'],
})
export class AgendarModalComponent {

  @Input() data: any;

}
