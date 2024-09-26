import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { LoginHistoryComponent } from './login-history/login-history.component';


@NgModule({
  declarations: [
    LoginHistoryComponent
  ],
  imports: [
    CommonModule,
    LogsRoutingModule
  ]
})
export class LogsModule { }
