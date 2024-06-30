import { Component } from '@angular/core';
import { VotersInterface } from '../interface';
import { VoterColumns } from '../data/voter.column';
import { Gender } from '../../../data';

@Component({
  selector: 'ev-voters-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {


  genders = Gender;

  cols = VoterColumns;
  voters!: VotersInterface[];

  addVoterSidebarVisible = false;

}
