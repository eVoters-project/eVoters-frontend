import { NgModule } from "@angular/core";
import { IndexComponent } from "./components/index/index.component";
import { EntryComponent } from "./components/entry/entry.component";
import { VoteTallyRoutingModule } from "./vote-tally-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { TableModule } from "primeng/table";
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { PerformApiService } from "../../service";
import { CalendarModule } from "primeng/calendar";
import { InputNumberModule } from "primeng/inputnumber";
import { DropdownModule } from "primeng/dropdown";

@NgModule({
  declarations: [
    IndexComponent,
    EntryComponent
  ],
  imports: [
    VoteTallyRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    TableModule,
    CalendarModule,
    InputNumberModule,
    DropdownModule
  ],
  providers: [
    ConfirmationService,
    DialogService,
    PerformApiService,
    MessageService
  ]
})
export class VoteTallyModule { }
