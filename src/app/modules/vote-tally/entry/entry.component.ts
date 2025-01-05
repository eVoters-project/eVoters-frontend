import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Status } from '../../../data';
import { PerformApiService } from '../../../service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { format } from 'date-fns';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
  providers: [PerformApiService]
})
export class EntryComponent implements OnInit, OnDestroy, AfterViewInit {
  isLoading = true;
  isSaving = false;
  status = Status;

  performApi = inject(PerformApiService);
  // leaderApi = inject(LeaderApiService);
  // voterApi = inject(VoterApiService);
  // voterLeaderApi = inject(VoterLeaderApiService);
  dialogRef = inject(DynamicDialogRef);
  messageService = inject(MessageService);

  protected fb = inject(FormBuilder);
  // protected voters: VoterInterface[] = [];
  // protected leader_types: LeaderTypeInterface[] = [];
  protected rf = this.fb.group({
    date: this.fb.control(format(new Date(), 'MM/dd/yyyy'), { validators: [Validators.required] }),
    precinct: this.fb.control('', { validators: [Validators.required] }),
    candidate: this.fb.control('', { validators: [Validators.required] }),
    count: this.fb.control(null, { validators: [Validators.required] })
  });

  constructor() { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  ngAfterViewInit(): void {
    this.isLoading = false;
  }

  protected voteTallySave() {

  }
}
