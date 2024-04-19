import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horaFormatada'
})
export class HoraFormatadaPipe implements PipeTransform {
  transform(value: string): string {
    
    const date = new Date(`2000-01-01T${value}`);

    const horas = date.getHours().toString().padStart(2, '0');
    const minutos = date.getMinutes().toString().padStart(2, '0');
    
    return `${horas}:${minutos}`;
  }
}