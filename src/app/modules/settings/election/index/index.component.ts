import { Component } from '@angular/core';
import { MenuInterface } from '../../../layout/interface/menu.interface';

@Component({
  selector: 'app-settings-election-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  menuItems: MenuInterface[] = [
    {
      label: 'Settings Menu',
      visible: true,
      items: [
        { label: 'Election Schedule', icon: '', routerLink: ['schedule'] },
        { label: 'Election Position', icon: '', routerLink: ['position'] },
        { label: 'Election Precinct', icon: '', routerLink: ['precinct'] },
        { label: 'Election Candidate', icon: '', routerLink: ['candidate'] }
      ]
    }
  ]

}
