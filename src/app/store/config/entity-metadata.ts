import {EntityDataModuleConfig, EntityMetadataMap} from '@ngrx/data';
import * as species from '../species';
import * as person from '../person';

const entityMetadata: EntityMetadataMap = {
  [person.entityCollectionName]: {selectId: (p: person.Person) => p[person.entitySelectId]},
  [species.entityCollectionName]: {selectId: (s: species.Species) => s[species.entitySelectId]}
};

const pluralNames = {
  [person.entityCollectionName]: person.pluralizedEntityName,
  [species.entityCollectionName]: species.pluralizedEntityName
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
