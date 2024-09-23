import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsListComponent } from './accounts-list/accounts-list.component';

const routes: Routes = [
    {
      path: '',
      children: [
          {
            path: 'reconciliaciones-lista',
            component: AccountsListComponent,
          },
      ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReconciliationsRoutingModule { }
