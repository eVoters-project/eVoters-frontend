import { Component, inject, OnInit } from '@angular/core';
import { Status } from '../../../data';
import { Subject } from 'rxjs';
import { PerformApiService } from '../../../service';
import { LeaderApiService, PartyApiService } from '../../../service/api';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

interface LeaderInterface {
  id: string;
  name: string;
}

@Component({
  selector: 'app-party-entry',
  templateUrl: './party-entry.component.html',
  styleUrl: './party-entry.component.scss',
  providers: [LeaderApiService]
})
export class PartyEntryComponent implements OnInit {
  isLoading = true;
  isSaving = false;
  status = Status;

  private fb = inject(FormBuilder);
  private performApi = inject(PerformApiService);
  private leaderApi = inject(LeaderApiService);
  private partyApi = inject(PartyApiService);
  private messageService = inject(MessageService);
  private dialogRef = inject(DynamicDialogRef);

  protected leaders: LeaderInterface[] = [];
  protected rf = this.fb.group({
    code: this.fb.control(""),
    name: this.fb.control("", { validators: [Validators.required] }),
    description: this.fb.control(""),
    remarks: this.fb.control(""),
    leader: this.fb.control("", { validators: [Validators.required] }),
    status: this.fb.control("", { validators: [Validators.required] })
  })

  constructor() { }

  ngOnInit(): void {
    const unsub$ = new Subject<void>();
    this.performApi.performApi([
      { action: () => this.leaderApi.getAll(), tag: 'leaders' }
    ], unsub$).subscribe({
      next: ((res) => {
        this.isLoading = false;
        this.leaders = res.find(r => r.tag === "leaders")?.result?.data.map((d: any) => { return { id: d.id, name: d.voter } });
        unsub$.next();
        unsub$.complete();
      })
    });
  }

  protected partySave() {
    if (this.rf.invalid) {
      this.rf.markAllAsTouched();
      return;
    };

    this.isSaving = true;

    const unsub$ = new Subject<void>();

    this.performApi.performApi([
      { action: () => this.partyApi.create(this.rf.getRawValue()), tag: 'create-party' }
    ], unsub$).subscribe({
      next: (res) => {
        this.isSaving = false;
        if (res[0].error !== null) {
          this.messageService.add({ severity: 'error', summary: '', detail: '' });
        }

        this.messageService.add({ severity: 'success', summary: 'Party Created', detail: '' })

        unsub$.next();
        unsub$.complete();

        this.rf.reset();
        // this.saveCount++;
      }
    });
  }
}
