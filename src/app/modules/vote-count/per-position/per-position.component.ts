import { Component, effect, inject } from '@angular/core';
import { VoteCountService } from '../vote-count.service';

@Component({
  selector: 'app-per-position',
  templateUrl: './per-position.component.html',
  styleUrl: './per-position.component.scss'
})
export class PerPositionComponent {

  private voteCountService = inject(VoteCountService);

  constructor() {
    effect(() => {
      const filters = this.voteCountService.getFilters()();

      // TODO: use the filter for fetch data from API

      // just logging for now
      console.log('per position filters', filters);
    })
  }
}
