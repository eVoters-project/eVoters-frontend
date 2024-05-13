import { Component } from '@angular/core';
import { VotersInterface } from '../interface';
import { VoterColumns } from '../data/voter.column';

@Component({
  selector: 'ev-voters-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  cols = VoterColumns;
  voters!: VotersInterface[];

}
