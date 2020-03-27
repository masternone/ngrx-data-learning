import {EntityDataModuleConfig, EntityMetadataMap, PropsFilterFnFactory} from '@ngrx/data';
import * as species from '../species';
import * as person from '../person';

export type CustomEntityFilterFn<T> = (
  entities: T[],
  pattern?: any,
  value?: any
) => T[];
/**
 * Creates an {EntityFilterFn} that matches RegExp or RegExp string pattern
 * anywhere in any of the given props of an entity.
 * If pattern is a string, spaces are significant and ignores case.
 */
export function CustomPropsFilterFnFactory<T = any>(
  props: (keyof T)[] = []
): CustomEntityFilterFn<T> {
  if (props.length === 0) {
    // No properties -> nothing could match -> return unfiltered
    return (entities: T[]) => entities;
  }

  return (entities: T[], pattern: string | RegExp, value?: any) => {
    if (!entities) {
      return [];
    }

    if (value === null || value === undefined || value.length === '') {
      const regExp =
        typeof pattern === 'string' ? new RegExp(pattern, 'i') : pattern;
      if (regExp) {
        const predicate = (e: any) => props.some(prop => regExp.test(e[prop]));
        return entities.filter(predicate);
      }
      return entities;
    } else {
      const predicate = (e: any) =>
        props.some(prop => {
          // Find the matching property name (will be the pattern)
          if (prop !== pattern) {
            return;
          }
          return e[prop] === value;
        });
      return entities.filter(predicate);
    }
  };
}


// This creates the filter for ... filtering
function nameFilter(entities: { name: string }[], search: string) {
  return entities.filter(e => -1 < e.name.indexOf(search));
}

function advancedFilter(entities: species.Species[], pattern: string) {
  return PropsFilterFnFactory<species.Species>([
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
