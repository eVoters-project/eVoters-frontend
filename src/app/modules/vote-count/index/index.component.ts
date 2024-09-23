import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { VoteCountService } from '../vote-count.service';
import { Subscription } from 'rxjs';
import { VoteCountFilterInterface } from '../interface/filter.interface';

@Component({
  selector: 'ev-vote-count-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  providers: [
    VoteCountService
  ]
})
export class IndexComponent implements OnInit, AfterViewInit {
  title = 'Vote Count';

  menuItems: MenuItem[] | undefined;

  voteCountService = inject(VoteCountService);
  fb = inject(FormBuilder);
  rf = this.fb.group({
    result: this.fb.control('survey'),
    barangay: this.fb.control(''),
    purok: this.fb.control(''),
    position: this.fb.control(''),
    precinct: this.fb.control('')
  });

  arraySubs = new Array(Subscription);

  constructor() { }

  ngOnInit(): void {

    this.rf.valueChanges.subscribe((form) => {
      this.voteCountService.setFilters(form as VoteCountFilterInterface);
    });

    this.menuItems = [
      { label: 'Per Rank', icon: 'pi pi-chart-line', routerLink: 'per-rank', queryParams: {} },
      { label: 'Per Location', icon: 'pi pi-map-marker', routerLink: 'per-location' },
      { label: 'Per Position', icon: 'pi pi-face-smile', routerLink: 'per-position' }
    ];
  }

  ngAfterViewInit(): void {

  }

}
