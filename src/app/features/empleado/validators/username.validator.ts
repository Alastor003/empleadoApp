import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Empleado } from '../../../models/interfaces/empleado.interface';

export function nombreUnicoValidator(empleados: Empleado[]): ValidatorFn {
  return (control: AbstractControl) => {
    const username = control.value;

    if (!username) return null;

    const empleadoEditado = empleados.find(empleado => empleado.username === username);
    const isUsernameUnique = !empleadoEditado || empleadoEditado.id !== control.parent?.get('id')?.value;

    if (!isUsernameUnique && empleados.some(empleado => empleado.username === username)) {
      return { 'Ya existe el usuario': { value: username } };
    }

    return null;
  };
}
