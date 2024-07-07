import { Component } from '@angular/core';
import { MapConfig } from '../../../config';

@Component({
  selector: 'ev-dashboard-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  title = 'Dashboard';

  options = new MapConfig();

}
