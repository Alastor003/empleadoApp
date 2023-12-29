import { Component, OnInit, inject, signal } from '@angular/core';
import { Empleado } from '../../../../models/interfaces/empleado.interface';
import { EmpleadoService } from '../../../../services/empleado.service';
import { RouterLink } from '@angular/router';
import { TitleComponent } from '../../components/title.component';
import { EstaActivo } from '../../pipes/estaActivo.pipe';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-empleado-lista',
  standalone: true,
  imports: [RouterLink, TitleComponent, EstaActivo],
  templateUrl: './empleado-lista.component.html',
  styles: ``
})
export default class EmpleadoListaComponent implements OnInit {

    private empleadoService = inject(EmpleadoService)

    public empleados = signal<Empleado[]>([])

    ngOnInit(): void {
      this.getEmpleados()
    }

    getEmpleados(): void {
      this.empleados.set(this.empleadoService.empleados())
    }

    darDeBajaEmpleado(id: string): void {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción dará de baja al empleado. ¿Deseas continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, dar de baja',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.empleadoService.darDeBajaEmpleado(id);
          Swal.fire('¡Dado de baja!', 'El empleado ha sido dado de baja.', 'success');
        }
      });
    }

}
