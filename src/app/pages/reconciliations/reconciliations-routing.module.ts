import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReconciliationsListComponent } from './reconciliations-list/reconciliations-list.component';

const routes: Routes = [
    {
      path: '',
      children: [
          {
            path: 'reconciliaciones-lista',
            component: ReconciliationsListComponent,
          },
      ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReconciliationsRoutingModule { }
