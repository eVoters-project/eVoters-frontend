import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { VoteCountService } from '../vote-count.service';
import { Subject, Subscription } from 'rxjs';
import { VoteCountFilterInterface } from '../interface/filter.interface';
import { BarangayInterface, PurokInterface } from '../../../interface';
import { PerformApiService } from '../../../service';
import { BarangayApiService, PurokApiService } from '../../../service/api';

@Component({
  selector: 'ev-vote-count-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  providers: [
    VoteCountService,
    PerformApiService,
    BarangayApiService,
    PurokApiService
  ]
})
export class IndexComponent implements OnInit, AfterViewInit {
  title = 'Vote Count';

  menuItems: MenuItem[] | undefined;

  private performApi = inject(PerformApiService);
  private barangayApi = inject(BarangayApiService);
  private purokApi = inject(PurokApiService);
  voteCountService = inject(VoteCountService);
  fb = inject(FormBuilder);
  rf = this.fb.group({
    result: this.fb.control('survey'),
    barangay: this.fb.control(''),
    purok: this.fb.control(''),
    position: this.fb.control(''),
    precinct: this.fb.control('')
  });

  barangayData: BarangayInterface[] | null = null;
  purokData: PurokInterface[] | null = null;

  arraySubs = new Array(Subscription);

  constructor() {
    const unsub$ = new Subject<void>();
    this.performApi.performApi([
      { action: () => this.barangayApi.getBarangays(), tag: 'barangays' },
      { action: () => this.purokApi.getPuroks(), tag: 'puroks' }
    ], unsub$).subscribe({
      next: ((res) => {
        // this.isLoading = false;
        this.barangayData = res.find(r => r.tag === "barangays")
          ?.result?.data.map((d: any) => { return { id: d.id, name: d.name } });
        this.purokData = res.find(r => r.tag === "puroks")
          ?.result?.data.map((d: any) => { return { id: d.id, name: d.name } });
        unsub$.next();
        unsub$.complete();
      })
    });
  }

  ngOnInit(): void {

    this.rf.valueChanges.subscribe((form) => {
      this.voteCountService.setFilters(form as VoteCountFilterInterface);
    });

    this.menuItems = [
      { label: 'Per Rank', icon: 'pi pi-chart-line', routerLink: 'per-rank', queryParams: {} },
      { label: 'Per Location', icon: 'pi pi-map-marker', routerLink: 'per-location' },
      { label: 'Per Position', icon: 'pi pi-face-smile', routerLink: 'per-position', disabled: true }
    ];
  }

  ngAfterViewInit(): void {

  }

}
