import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SpeciesCollectionService } from 'src/app/store/species/species-collection.service';
import { Dictionary } from '@ngrx/entity';
import { Species } from 'src/app/store/species';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-species-table',
  templateUrl: './species-table.component.html',
  styleUrls: ['./species-table.component.scss']
})
export class SpeciesTableComponent implements OnInit, OnDestroy {
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
    // 'designation',
    // 'average_height',
    // 'skin_colors',
    // 'hair_colors',
    // 'eye_colors',
    // 'average_lifespan',
    // 'homeworld',
    // 'language',
    // 'people',
    // 'films',
    // 'created',
    // 'edited',
    // 'url'
  ];

  constructor(private speciesCollection: SpeciesCollectionService) {
    // this will call all next pages from the return value
    speciesCollection.getWithQuery({ page: `1` });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.subscriptions.push(
      this.filterFormControl.valueChanges.subscribe(filter => {
        this.speciesCollection.setFilter(filter);
      })
    );

    this.subscriptions.push(
      this.speciesCollection.filteredEntities$.subscribe(
        filteredEntities => {
          this.dataSource = new MatTableDataSource<Species>(filteredEntities);
        }
      )
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
