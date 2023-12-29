import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estaActivo',
  standalone: true,
})

export class EstaActivo implements PipeTransform {
  transform(value: boolean): string {

    if(value) {
      return 'Activo'
    }

    return 'Inactivo'
  }
}
