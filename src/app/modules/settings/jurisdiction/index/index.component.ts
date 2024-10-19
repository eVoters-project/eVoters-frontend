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
        { label: 'Purok', icon: 'pi pi-slack', routerLink: ['purok'] },
        { label: 'Barangay', icon: 'pi pi-slack', routerLink: ['barangay'] },
        { label: 'LGU', icon: 'pi pi-slack', routerLink: ['lgu'] },
        { label: 'Province', icon: 'pi pi-slack', routerLink: ['province'] },
        { label: 'Region', icon: 'pi pi-slack', routerLink: ['region'] }
      ]
    }
  ]

}
