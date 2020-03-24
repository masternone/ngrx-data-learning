import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs';
import {Dictionary} from '@ngrx/entity';
import {PersonCollectionService} from '../../store/person/person-collection.service';
import {Person} from '../../store/person';

@Component({
  selector: 'app-person',
  template: `
    <mat-list-item>{{(people[personId] || {})['name']}}</mat-list-item>
  `,
  styles: [``]
})
export class PersonComponent implements OnChanges, OnDestroy {
  @Input() personId: string;

  subscriptions: Array<Subscription> = [];
  people: Dictionary<Person> = {};

  constructor(private personCollection: PersonCollectionService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.personId.firstChange) {
      if (this.people[this.personId] === undefined) {
        const extractedValue = /\/(\d*)\/$/.exec(this.personId)[1];
        this.personCollection.getByKey(extractedValue);
        this.subscriptions.push(
          this.personCollection.entities$.subscribe((people: Array<Person>) => {
            people.forEach(person => {
              this.people[person.url] = person;
            });
          })
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
