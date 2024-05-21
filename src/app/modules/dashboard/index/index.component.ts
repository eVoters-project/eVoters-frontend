import { Component } from '@angular/core';

@Component({
  selector: 'ev-dashboard-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  title = 'Dashboard';

  statistics = [
    {
      title: 'Total Voters',
      total: 150000
    },
    {
      title: 'Sure',
      total: 80000
    },
    {
      title: 'Note Sure',
      total: 30000
    },
    {
      title: 'Vulnerable/Not Around',
      total: 40000
    }
  ]

}
