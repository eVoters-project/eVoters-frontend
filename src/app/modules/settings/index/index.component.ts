import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'ev-settings-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  title = 'Settings';
  menuItems: MenuItem[] | undefined;

  ngOnInit(): void {
    this.menuItems = [
      { label: 'Jurisdiction', icon: '', routerLink: 'jurisdiction' },
      { label: 'Election', icon: '', routerLink: 'election' },
      { label: 'Voter', icon: '', routerLink: 'voter' }
    ];
  }
}
