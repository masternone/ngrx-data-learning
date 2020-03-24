import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import * as species from './store/species';

const routes: Routes = [
  {
    path: '',
    redirectTo: species.entityCollectionEndPoint,
    pathMatch: 'full'
  },
  {
    path: species.entityCollectionEndPoint,
    loadChildren: () => import('./species/species.module').then(m => m.SpeciesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
