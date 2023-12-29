import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Empleado } from '../../../../models/interfaces/empleado.interface';
import { EmpleadoService } from '../../../../services/empleado.service';
import { ActivatedRoute } from '@angular/router';
import { TitleComponent } from '../../components/title.component';
import { EstaActivo } from '../../pipes/estaActivo.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleado-detalles',
  standalone: true,
  imports: [TitleComponent, EstaActivo, CommonModule],
  templateUrl: './empleado-detalles.component.html',
  styles: ``
})
export default class EmpleadoDetallesComponent implements OnInit {

  private empleadoService = inject(EmpleadoService)
  private activatedRoute = inject(ActivatedRoute)

  public _empleado = signal<Empleado | undefined>(undefined)

  public nombreCompleto = computed(() =>
    this._empleado()?.id ? `${this._empleado()?.nombre} ${this._empleado()?.apellido}` : 'No se encontro empleado'
  )

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      const empleado = this.empleadoService.empleadoPorId(id);
      this._empleado.set(empleado)
   })
  }

}
