import { Component } from '@angular/core';

@Component({
  selector: 'app-bycapital-page',
  imports: [],
  templateUrl: './bycapital-page.component.html',
})
export class BycapitalPageComponent {
  onSearch(value: string) {
    console.log(value);
  }
}
  