import {EntityDataModuleConfig, EntityMetadataMap, PropsFilterFnFactory} from '@ngrx/data';
import * as species from '../species';
import * as person from '../person';
import { Species } from '../species';

// This creates the filter for ... filtering
function nameFilter(entities: { name: string }[], search: string) {
  return entities.filter(e => -1 < e.name.indexOf(search));
}

function advancedFilter(entities: Species[], pattern: string) {
  return PropsFilterFnFactory<Species>([
    'name',
    'classification',
    'designation',
    'average_lifespan'
  ])(entities, pattern);
}



const entityMetadata: EntityMetadataMap = {
  [person.entityCollectionName]: {selectId: (p: person.Person) => p[person.entitySelectId]},
  [species.entityCollectionName]: {
    selectId: (s: species.Species) => s[species.entitySelectId],
    filterFn: advancedFilter
  }
};

const pluralNames = {
  [person.entityCollectionName]: person.pluralizedEntityName,
  [species.entityCollectionName]: species.pluralizedEntityName
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
