import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'ev-vote-count-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit, AfterViewInit {
  title = 'Vote Count';

  menuItems: MenuItem[] | undefined;
  activeMenu: MenuItem | undefined;

  fb = inject(FormBuilder);
  rf = this.fb.group({
    result: this.fb.control('survey')
  });

  constructor() { }

  ngOnInit(): void {
    this.menuItems = [
      { label: 'Per Rank', icon: 'pi pi-chart-line', routerLink: 'per-rank', queryParams: {} },
      { label: 'Per Location', icon: 'pi pi-map-marker', routerLink: 'per-location' },
      { label: 'Per Position', icon: 'pi pi-face-smile', routerLink: 'per-position' }
    ];
  }

  ngAfterViewInit(): void {

  }
}
