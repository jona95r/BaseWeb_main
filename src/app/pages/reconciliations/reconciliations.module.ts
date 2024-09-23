import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReconciliationsRoutingModule } from './reconciliations-routing.module';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { ComponentsPrimeNg } from 'src/app/components-primeng';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccountsListComponent
  ],
  imports: [
    CommonModule,
    ReconciliationsRoutingModule,
    ComponentsPrimeNg,
    ReactiveFormsModule
  ]
})
export class ReconciliationsModule { }
