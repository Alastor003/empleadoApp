import { Injectable, computed, signal } from '@angular/core';
import { Empleado } from '../models/interfaces/empleado.interface';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private localStorageKey = 'empleados';
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

    this.cargarEmpleadosDesdeLocalStorage();
  }

  private cargarEmpleadosDesdeLocalStorage(): void {
    const empleadosString = localStorage.getItem(this.localStorageKey);

    if (empleadosString) {
      const empleados = JSON.parse(empleadosString);
      this._empleados.set(empleados);
    }
  }

  private guardarEmpleadosEnLocalStorage(empleados: Empleado[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(empleados));
  }

  empleadoPorId(id: string): Empleado | undefined {
    return this._empleados().find(emp => emp.id === id);
  }

  agregarEmpleado(empleado: Empleado): void {
    const empleados = this._empleados();
    empleados.push(empleado);
    this._empleados.set(empleados);

    this.guardarEmpleadosEnLocalStorage(empleados);
  }

  editarEmpleado(empleadoEditado: Empleado):void {

    if(!empleadoEditado.id) throw Error('se requiere un empleado para editar')

    this._empleados.update(empleados => {
      const empleadoActualizado = empleados.findIndex(empleado => empleado.id === empleadoEditado.id)

      empleados[empleadoActualizado] = empleadoEditado

      this.guardarEmpleadosEnLocalStorage(empleados);

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

      this.guardarEmpleadosEnLocalStorage(empleados);
      return empleados;
    });
  }
}
