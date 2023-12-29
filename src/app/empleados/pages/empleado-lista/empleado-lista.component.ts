import { Component, OnInit, inject, signal } from '@angular/core';
import { Empleado } from '../../interfaces/empleado.interface';
import { EmpleadoService } from '../../services/empleado.service';
import { RouterLink } from '@angular/router';
import { TitleComponent } from '../../components/title/title.component';
import { EstaActivo } from '../../pipes/estaActivo.pipe';

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

    borrarEmpleado(id: string): void {
      this.empleadoService.eliminarEmpleado(id);
    }

}
