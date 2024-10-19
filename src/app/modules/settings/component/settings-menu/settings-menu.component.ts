import { Component, Input, input } from '@angular/core';
import { MenuInterface } from '../../../layout/interface/menu.interface';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrl: './settings-menu.component.scss'
})
export class SettingsMenuComponent {

  @Input()
  menus: MenuInterface[] = [];

}
