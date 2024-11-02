import { Component } from '@angular/core';
import { MenuInterface } from '../../../layout/interface/menu.interface';

@Component({
  selector: 'app-settings-voter-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  menuItems: MenuInterface[] = [
    {
      label: 'Settings Menu',
      visible: true,
      items: [
        { label: 'Voter Base', icon: '', routerLink: ['voter-base'] },
        { label: 'Voter Influence', icon: '', routerLink: ['voter-influence'] },
        { label: 'Voter Influence Sub', icon: '', routerLink: ['voter-influence-sub'] },
        { label: 'Voter Leader', icon: '', routerLink: ['voter-leader'] },
        { label: 'Voter Leader Sub', icon: '', routerLink: ['voter-leader-sub'] },
        { label: 'Voter Position', icon: '', routerLink: ['voter-position'] },
        { label: 'Voter Status', icon: '', routerLink: ['voter-status'] },
        { label: 'Voter Type', icon: '', routerLink: ['voter-type'] },
      ]
    }
  ]

}
