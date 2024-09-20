import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReconciliationsRoutingModule } from './reconciliations-routing.module';
import { ReconciliationsListComponent } from './reconciliations-list/reconciliations-list.component';


@NgModule({
  declarations: [
    ReconciliationsListComponent
  ],
  imports: [
    CommonModule,
    ReconciliationsRoutingModule
  ]
})
export class ReconciliationsModule { }
