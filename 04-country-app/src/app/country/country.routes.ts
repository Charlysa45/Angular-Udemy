import { Routes } from "@angular/router";
import { CountryLayoutComponent } from "./layout/CountryLayout/CountryLayout.component";
import { BycapitalPageComponent } from "./pages/bycapital-page/bycapital-page.component";

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      {
        path: 'by-capital',
        component: BycapitalPageComponent
      },
      {
        path: '**',
        redirectTo: 'by-capital'
      }
    ]
  }
]

export default countryRoutes