import { Component } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";

@Component({
  selector: 'app-byregion-page',
  imports: [CountryListComponent],
  templateUrl: './byregion-page.component.html',
})
export class ByregionPageComponent { }
