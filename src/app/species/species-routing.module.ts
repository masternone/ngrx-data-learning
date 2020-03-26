import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SpeciesListComponent} from './species-list/species-list.component';
import { SpeciesTableComponent } from './species-table/species-table.component';

const routs: Routes = [
  {
    path: '',
    component: SpeciesListComponent,
  },
  {
    path: 'table',
    component: SpeciesTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routs)],
  exports: [RouterModule]
})
export class SpeciesRoutingModule {}
