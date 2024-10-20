import { Component } from '@angular/core';
import { MenuInterface } from '../../../layout/interface/menu.interface';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  menuItems: MenuInterface[] = [
    {
      label: 'Settings Menu',
      visible: true,
      items: [
        { label: 'Schedule', icon: '', routerLink: ['schedule'] },
        { label: 'Position', icon: '', routerLink: ['position'] },
      ]
    }
  ]

}
