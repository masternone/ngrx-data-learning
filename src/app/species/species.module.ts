import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpeciesListComponent} from './species-list/species-list.component';
import {SpeciesRoutingModule} from './species-routing.module';
import {MaterialModule} from '../material/material.module';
import {PersonComponent} from './person/person.component';
import { SpeciesTableComponent } from './species-table/species-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PersonComponent, SpeciesListComponent, SpeciesTableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SpeciesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SpeciesModule {}
