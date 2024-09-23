import { Component, effect, inject, OnInit } from '@angular/core';
import { VoteCountService } from '../vote-count.service';
import { PerLocationColumns } from '../grid-columns/per-location.column';
import { VoteCountPerLocationInterface } from '../interface/vote-count-per-location.interface';

@Component({
  selector: 'app-per-location',
  templateUrl: './per-location.component.html',
  styleUrl: './per-location.component.scss'
})
export class PerLocationComponent implements OnInit {

  private voteCountService = inject(VoteCountService);

  protected columns = PerLocationColumns;
  protected expandedRows = {};
  protected expandedRows2 = {};
  protected perLocationVoteCount: VoteCountPerLocationInterface[] = [];

  constructor() {
    effect(() => {
      const filters = this.voteCountService.getFilters()();

      // TODO: use the filter for fetch data from API

      // just logging for now
      console.log('per location filters', filters);
    })
  }

  ngOnInit(): void {
    this.perLocationVoteCount = [
      {
        positionId: '1',
        position: 'Governor',
        candidates: [
          {
            candidateId: '1',
            candidate: 'Ranel Parba',
            locations: []
          },
          {
            candidateId: '2',
            candidate: 'Ranel Parba I',
            locations: []
          }
        ]
      },
      {
        positionId: '2',
        position: 'Vice Governor',
        candidates: [
          {
            candidateId: '1',
            candidate: 'Ranel Parba',
            locations: [
              {
                locationId: '1',
                location: 'North Poblacion',
                precincts: [
                  {
                    precinctId: '1',
                    precinct: 'J187',
                    total: 0,
                    votes: 0,
                    percentage: 100
                  }
                ]
              },
              {
                locationId: '2',
                location: 'South Poblacion',
                precincts: []
              }
            ]
          },
          {
            candidateId: '2',
            candidate: 'Ranel Parba I',
            locations: []
          }
        ]
      },
      {
        positionId: '3',
        position: 'Board Member',
        candidates: []
      },
      {
        positionId: '4',
        position: 'Mayor',
        candidates: []
      }
    ]
  }

  protected expandAll() {
    this.expandedRows = this.perLocationVoteCount.reduce((acc: { [key: string]: boolean }, p) => (acc[p.positionId] = true) && acc, {});
    this.expandedRows2 = this.perLocationVoteCount.map(p =>
      p.candidates.map(l =>
        l.locations.reduce((acc: { [key: string]: boolean }, p) => (acc[p.locationId] = true) && acc, {})
      )
    );
  }

  protected collapseAll() {
    this.expandedRows = {};
    this.expandedRows2 = {};
  }

}
