import { Component, Input } from '@angular/core';
import { MenuInterface } from '../../../layout/interface/menu.interface';

@Component({
  selector: 'app-settings-sidebar',
  templateUrl: './settings-sidebar.component.html',
  styleUrl: './settings-sidebar.component.scss'
})
export class SettingsSidebarComponent {

  @Input()
  menus: MenuInterface[] = [];

}
