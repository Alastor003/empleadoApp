import { Component, OnInit, inject } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../interfaces/empleado.interface';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-nuevo-empleado',
  standalone: true,
  imports: [TitleComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './nuevo-empleado.component.html',
  styles: ``
})
export default class NuevoEmpleadoComponent implements OnInit {

  private router = inject( Router)
  private fb = inject(FormBuilder)
  private empleadoService = inject(EmpleadoService)
  private activatedRoute = inject(ActivatedRoute)

  public myForm: FormGroup = this.fb.group({
    id: [''],
    username: ['',[Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
    nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/), Validators.minLength(4), Validators.maxLength(50) ] ],
    apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/), Validators.minLength(4), Validators.maxLength(50) ]],
    activo: [true, []],
  })

  ngOnInit(): void {
     if(!this.router.url.includes('editar')) return;

     this.activatedRoute.params.subscribe(({ id }) => {
        const empleado = this.empleadoService.empleadoPorId(id);
        this.myForm.reset(empleado)
     })
  }

  public esUnCampoValido(field: string) {

    return this.myForm.controls[field].errors
           && this.myForm.controls[field].touched;
  }

  obtenerErrorPorCampo( field: string): string | null {
    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
       switch(key) {
         case 'required':
          return 'este campo es obligatorio';

         case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres`;

        case 'maxlength':
          return `Máximo ${ errors['maxlength'].requiredLength } caracteres`;
       }
    }

    return null;
  }

  get EmpleadoActual(): Empleado {
    return this.myForm.value as Empleado;
  }

  tituloActual(): string {
     return this.EmpleadoActual.id ? 'Editar' : 'Agregar';
  }

  onSubmit():void {

    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return;
    }

    if(this.EmpleadoActual.id) {
      this.empleadoService.editarEmpleado(this.EmpleadoActual);
      this.router.navigateByUrl('/empleados/lista');
      return;
    }

    this.EmpleadoActual.id = uuidv4();
    this.empleadoService.agregarEmpleado(this.EmpleadoActual);
    this.router.navigateByUrl('/empleados/lista');
  }

}
