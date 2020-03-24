import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpeciesListComponent} from './species-list/species-list.component';
import {SpeciesRoutingModule} from './species-routing.module';
import {MaterialModule} from '../material/material.module';
import {PersonComponent} from './person/person.component';

@NgModule({
  declarations: [PersonComponent, SpeciesListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SpeciesRoutingModule
  ]
})
export class SpeciesModule {}
