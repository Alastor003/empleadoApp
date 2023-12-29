import { Injectable, computed, signal } from '@angular/core';
import { Empleado } from '../interfaces/empleado.interface';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private _empleados = signal<Empleado[]>([
    {
      id: uuidv4(),
      username: 'alvarowo',
      nombre: 'alvaro',
      apellido: 'benitez',
      activo: true,
    }
])

public empleados = computed(() => this._empleados())

  constructor() {
    // console.log(this.getEmpleados())
  }

  empleadoPorId(id: string): Empleado | undefined {
    return this._empleados().find(emp => emp.id === id);
  }

  agregarEmpleado(empleado: Empleado): void {
    this._empleados().push(empleado)
  }

  editarEmpleado(empleadoEditado: Empleado):void {

    if(!empleadoEditado.id) throw Error('se requiere un empleado para editar')

    this._empleados.update(empleados => {
      const empleadoActualizado = empleados.findIndex(empleado => empleado.id === empleadoEditado.id)

      empleados[empleadoActualizado] = empleadoEditado

      return empleados
    })
  }

  // eliminarEmpleado(id: string):void {
  //   this._empleados.update(emp => emp.filter(empleado => empleado.id !== id));
  // }

  darDeBajaEmpleado(id: string): void {
    this._empleados.update(empleados => {
      const empleadoEncontrado = empleados.findIndex(empleado => empleado.id === id);

      empleados[empleadoEncontrado].activo = false;


      return empleados;
    });
  }
}
