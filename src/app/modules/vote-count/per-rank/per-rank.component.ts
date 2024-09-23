import { Component, effect, inject, Input, OnInit, signal } from '@angular/core';
import { VoteCountFilterInterface } from '../interface/filter.interface';
import { VoteCountService } from '../vote-count.service';
import { PerRankColumns } from '../grid-columns/per-rank.column';
import { PerRankInterface } from '../interface/per-rank.interface';

@Component({
  selector: 'app-per-rank',
  templateUrl: './per-rank.component.html',
  styleUrl: './per-rank.component.scss'
})
export class PerRankComponent implements OnInit {

  voteCountService = inject(VoteCountService);

  protected columns = PerRankColumns;
  protected perRankVoteCount: PerRankInterface[] = [];
  protected expandedRows = {};

  constructor() {
    effect(() => {
      const filters = this.voteCountService.getFilters()();

      // TODO: use the filter for fetch data from API

      // just logging for now
      console.log('per rank filters', filters);
    });

  }

  ngOnInit(): void {
    this.perRankVoteCount = [
      {
        positionId: '1',
        position: 'Governor',
        candidates: [
          {
            candidateId: '1',
            sequence: 1,
            name: 'Ranel Parba',
            total: 0,
            percentage: 0,
            percentage_bar: ''
          },
          {
            candidateId: '2',
            sequence: 2,
            name: 'Ranel Parba',
            total: 0,
            percentage: 0,
            percentage_bar: ''
          },
          {
            candidateId: '3',
            sequence: 3,
            name: 'Ranel Parba',
            total: 0,
            percentage: 0,
            percentage_bar: ''
          }
        ]
      },
      {
        positionId: '2',
        position: 'Vice Governor',
        candidates: []
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
      },
      {
        positionId: '5',
        position: 'Vice Mayor',
        candidates: []
      }
    ]
  }

  protected expandAll() {
    this.expandedRows = this.perRankVoteCount.reduce((acc: { [key: string]: boolean }, p) => (acc[p.positionId] = true) && acc, {});
  }

  protected collapseAll() {
    this.expandedRows = {};
  }

}
