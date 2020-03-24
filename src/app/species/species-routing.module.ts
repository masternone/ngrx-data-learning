import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SpeciesListComponent} from './species-list/species-list.component';

const routs: Routes = [
  {
    path: '',
    component: SpeciesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routs)],
  exports: [RouterModule]
})
export class SpeciesRoutingModule {}
