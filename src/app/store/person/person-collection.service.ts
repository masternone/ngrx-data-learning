import * as person from './';
import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';

@Injectable()
export class PersonCollectionService extends EntityCollectionServiceBase<person.Person> {
  constructor(readonly elementsFactory: EntityCollectionServiceElementsFactory) {
    super(person.entityCollectionName, elementsFactory);
  }
}
