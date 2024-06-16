import { Component, OnInit } from '@angular/core';
import { MenuInterface } from '../interface/menu.interface';
import { MenuItemComponent } from '../menu-item/menu-item.component';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MenuItemComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  menus: MenuInterface[] = [];

  ngOnInit(): void {

    this.menus = [
      {
        label: 'E-Voters Menu',
        visible: true,
        items: [
          { label: 'Dashboard', icon: 'pi pi-gauge', routerLink: ['/dashboard'] },
          { label: 'Statistics', icon: 'pi pi-gauge', routerLink: ['/statistics'] },
          { label: 'Voters', icon: 'pi pi-slack', routerLink: ['/voters'] },
          { label: 'Leaders', icon: 'pi pi-crown', routerLink: ['/leader'] },
          { label: 'Party', icon: 'pi pi-users', routerLink: ['party'] },
          { label: 'Straw Vote', icon: 'pi pi-lightbulb', routerLink: ['straw-vote'] },
          { label: 'Vote Count', icon: 'pi pi-sort-numeric-down', routerLink: ['/vote-count'] },
          { label: 'Campaign', icon: 'pi pi-chart-bar', routerLink: ['/campaign'] },
          { label: 'Settings', icon: 'pi pi-cog', routerLink: ['/settings'] },
          { label: 'Logout', icon: 'pi pi-sign-out', routerLink: [''] }
        ]
      }
    ]

  }

}
