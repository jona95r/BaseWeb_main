import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginHistoryComponent } from './login-history/login-history.component';

const routes: Routes = [
  {
    path: '',
    children: [
        {
            path: 'registros-usuarios',
            component: LoginHistoryComponent,
        },
        { path: '**', redirectTo: 'registros-usuarios' },
    ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
