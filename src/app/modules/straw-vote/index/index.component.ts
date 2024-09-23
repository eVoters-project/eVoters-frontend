import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'ev-straw-vote-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  title = 'Straw Vote';
  menuItems: MenuItem[] | undefined;

  protected fb = inject(FormBuilder);
  protected rf = this.fb.group({
    barangay: this.fb.control(''),
    purok: this.fb.control('')
  })

  constructor() { }

  ngOnInit(): void {
    this.menuItems = [
      { label: 'Details', icon: 'pi pi-chart-line', routerLink: 'details' },
      { label: 'Summary', icon: 'pi pi-map-marker', routerLink: 'summary' },
    ];
  }
}
