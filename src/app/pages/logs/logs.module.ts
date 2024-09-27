import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { LoginHistoryComponent } from './login-history/login-history.component';
import { ComponentsPrimeNg } from 'src/app/components-primeng';


@NgModule({
  declarations: [
    LoginHistoryComponent
  ],
  imports: [
    CommonModule,
    LogsRoutingModule,
    ComponentsPrimeNg
  ]
})
export class LogsModule { }
