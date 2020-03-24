import {EntityDataModuleConfig, EntityMetadataMap} from '@ngrx/data';
import * as species from '../species';
import * as person from '../person';

const entityMetadata: EntityMetadataMap = {
  [person.entityCollectionName]: {},
  [species.entityCollectionName]: {}
};

const pluralNames = {
  [person.entityCollectionName]: person.pluralizedEntityName,
  [species.entityCollectionName]: species.pluralizedEntityName
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
