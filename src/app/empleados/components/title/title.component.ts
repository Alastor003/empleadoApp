import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [],
  template: `
    <h2 class="text-center text-3xl text-blue-600 mb-3 uppercase font-bold"> {{ titulo }} </h2>
  `
})
export class TitleComponent {

  @Input({required: true}) public titulo!: string;

}
