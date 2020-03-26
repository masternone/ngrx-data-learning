import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SpeciesCollectionService } from 'src/app/store/species/species-collection.service';
import { Dictionary } from '@ngrx/entity';
import { Species } from 'src/app/store/species';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-species-table',
  templateUrl: './species-table.component.html',
  styleUrls: ['./species-table.component.scss']
})
export class SpeciesTableComponent implements OnDestroy {
  subscriptions: Array<Subscription> = [];
  species: Dictionary<Species> = {};
  dataSource = new MatTableDataSource<Species>();
  filter: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  filterFormControl = new FormControl();

  displayedColumns = [
    'name',
    'classification',
    'designation',
    'average_lifespan'
  ];

  constructor(private speciesCollection: SpeciesCollectionService) {
    // this will call all next pages from the return value
    speciesCollection.getWithQuery({ page: `1` });

    this.subscriptions.push(
      this.filterFormControl.valueChanges.subscribe(filter => {
        this.speciesCollection.setFilter(filter);
      })
    );

    this.subscriptions.push(
      this.speciesCollection.filteredEntities$.subscribe(
        filteredEntities => {
          this.dataSource = new MatTableDataSource<Species>(filteredEntities);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // The filter function is set up in the entity-metadata function
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
