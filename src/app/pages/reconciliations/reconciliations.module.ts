import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReconciliationsRoutingModule } from './reconciliations-routing.module';
import { ReconciliationsListComponent } from './reconciliations-list/reconciliations-list.component';
import { ComponentsPrimeNg } from 'src/app/components-primeng';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReconciliationsListComponent
  ],
  imports: [
    CommonModule,
    ReconciliationsRoutingModule,
    ComponentsPrimeNg,
    ReactiveFormsModule
  ]
})
export class ReconciliationsModule { }
