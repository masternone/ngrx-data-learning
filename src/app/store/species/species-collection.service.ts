import * as species from './';
import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';

@Injectable()
export class SpeciesCollectionService extends EntityCollectionServiceBase<species.Species> {
  constructor(readonly elementsFactory: EntityCollectionServiceElementsFactory) {
    super(species.entityCollectionName, elementsFactory);
  }
}
