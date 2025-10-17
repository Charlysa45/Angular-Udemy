import { Routes } from "@angular/router";
import { CountryLayoutComponent } from "./layout/CountryLayout/CountryLayout.component";
import { BycapitalPageComponent } from "./pages/bycapital-page/bycapital-page.component";
import { BycountryPageComponent } from "./pages/bycountry-page/bycountry-page.component";
import { ByregionPageComponent } from "./pages/byregion/byregion-page.component";
import { CountryPageComponent } from "./pages/country-page/country-page.component";

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
        path: 'by-country',
        component: BycountryPageComponent
      },
      {
        path: 'by-region',
        component: ByregionPageComponent
      },
      {
        path: 'by/:code',
        component: CountryPageComponent
      },
      {
        path: '**',
        redirectTo: 'by-capital'
      }
    ]
  }
]

export default countryRoutes