import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'ev-campaign-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit, OnDestroy, AfterViewInit {



  title = 'Campaign';
  isLoading = false;

  protected tabMenuItems = [
    {
      label: 'Event',
      icon: 'pi pi-calendar-plus',
      routerLink: 'event'
    },
    {
      label: 'SMS',
      icon: 'pi pi-envelope',
      routerLink: 'sms'
    }
  ];

  constructor() {

  }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  ngAfterViewInit(): void { }

}
