import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {dataServiceConfig, entityConfig, registeredEffects, storeConfig} from './config';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {DefaultDataServiceConfig, EntityDataModule} from '@ngrx/data';
import {SpeciesCollectionService} from './species/species-collection.service';
import {environment} from '../../environments/environment';
import {PersonCollectionService} from './person/person-collection.service';

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
    SpeciesCollectionService
  ]
})
export class NGRXStoreModule {}
