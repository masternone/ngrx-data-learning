import {Component, OnDestroy} from '@angular/core';
import {SpeciesCollectionService} from '../../store/species/species-collection.service';
import {Subscription} from 'rxjs';
import {Species} from '../../store/species';
import {Dictionary} from '@ngrx/entity';

@Component({
  selector: 'app-species-list',
  template: `
    <div class="app-species-list">
      <ng-container *ngFor="let s of species | keyvalue">
        <mat-card class="no-padding">
          <mat-card-title><h1>{{s.value.name}}</h1></mat-card-title>
          <mat-card-content>
            <mat-list>
              <ng-container *ngFor="let personId of s.value.people">
                <app-person [personId]="personId"></app-person>
              </ng-container>
            </mat-list>
          </mat-card-content>
        </mat-card>
      </ng-container>
    </div>
  `,
  styleUrls: ['./species-list.component.scss']
})
export class SpeciesListComponent implements OnDestroy {
  subscriptions: Array<Subscription> = [];
  species: Dictionary<Species> = {};

  constructor(private spicesCollection: SpeciesCollectionService) {
    /* This is required because I could not figure out where to put the custom reducer
     calling get_all and looping over that would be better then calling in a loop
     */
    for (let i = 1; i <= 37; i++) {
      spicesCollection.getByKey(i);
    }
    this.subscriptions.push(
      spicesCollection.entities$.subscribe((spices: Array<Species>) => {
        console.log(spices);
        spices.forEach(s => {
          this.species[s.url] = s;
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
