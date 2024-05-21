import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-totals',
  templateUrl: './dashboard-totals.component.html',
  styleUrl: './dashboard-totals.component.scss'
})
export class DashboardTotalsComponent {

  @Input() title!: string;
  @Input() total!: number;


}
