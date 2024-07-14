import { Component } from '@angular/core';
import { MapConfig } from '../../../config';

@Component({
  selector: 'ev-dashboard-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  title = 'Dashboard';

  options = new MapConfig({
    center: { lat: 10.3104108, lng: 123.8858503 },
    zoom: 12.6
  });

}
