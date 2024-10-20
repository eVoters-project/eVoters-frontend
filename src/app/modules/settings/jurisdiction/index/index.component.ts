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
        { label: 'Purok', icon: '', routerLink: ['purok'] },
        { label: 'Barangay', icon: '', routerLink: ['barangay'] },
        { label: 'LGU', icon: '', routerLink: ['lgu'] },
        { label: 'Province', icon: '', routerLink: ['province'] },
        { label: 'Region', icon: '', routerLink: ['region'] }
      ]
    }
  ]

}
