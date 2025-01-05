import { NgModule } from "@angular/core";
import { IndexComponent } from "./components/index/index.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CandidateRoutingModule } from "./candidate-routing.module";
import { DialogService, DynamicDialogModule } from "primeng/dynamicdialog";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ContextMenuModule } from "primeng/contextmenu";
import { DropdownModule } from "primeng/dropdown";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MessageService } from "primeng/api";
import { EntryPartyCandidateComponent } from "./components/entry-party-candidate/entry-party-candidate.component";
import { EntryIndependentCandidateComponent } from "./components/entry-independent-candidate/entry-independent-candidate.component";
import { CalendarModule } from "primeng/calendar";

@NgModule({
  declarations: [
    IndexComponent,
    EntryPartyCandidateComponent,
    EntryIndependentCandidateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CandidateRoutingModule,

    DynamicDialogModule,
    ButtonModule,
    ConfirmDialogModule,
    ContextMenuModule,
    DropdownModule,
    ScrollPanelModule,
    TableModule,
    TagModule,
    ToastModule,
    CalendarModule
  ],
  providers: [
    DialogService,
    ConfirmationService,
    MessageService
  ]
})
export class CandidateModule { }
