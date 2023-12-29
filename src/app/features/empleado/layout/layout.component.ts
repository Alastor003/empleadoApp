import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


interface MenuItems {
  nombre: string;
  ruta: string;
  icono: string;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './layout.component.html',
  styles: ``
})
export default class LayoutComponent {


  public menu: MenuItems[] = [
    {nombre: 'Listado' , ruta: 'lista', icono: '../../../assets/icon/lista.svg'},
    {nombre: 'Agregar' , ruta: 'nuevo', icono: '../../../assets/icon/agregar.svg'},
  ]

}
