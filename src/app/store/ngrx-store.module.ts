import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {dataServiceConfig, entityConfig, registeredEffects, storeConfig} from './config';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {DefaultDataServiceConfig, EntityDataModule, EntityDataService} from '@ngrx/data';
import {SpeciesCollectionService} from './species/species-collection.service';
import {environment} from '../../environments/environment';
import {PersonCollectionService} from './person/person-collection.service';
import * as species from './species';
import {SpeciesCollectionDataService} from './species/species-collection-data.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(storeConfig),
    EffectsModule.forRoot(registeredEffects),
    EntityDataModule.forRoot(entityConfig),
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ],
  providers: [
    {
      provide: DefaultDataServiceConfig,
      useValue: dataServiceConfig
    },
    PersonCollectionService,
    SpeciesCollectionService,
    SpeciesCollectionDataService
  ]
})
export class NGRXStoreModule {
  constructor(private entityDataService: EntityDataService, private speciesCollectionDataService: SpeciesCollectionDataService) {
    entityDataService.registerService(
      species.entityCollectionName,
      speciesCollectionDataService
    );
  }
}
