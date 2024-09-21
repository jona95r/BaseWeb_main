import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReconciliationModel } from '../models/reconciliation-model';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { AccountsModel } from '../models/accounts-model';

@Injectable({
  providedIn: 'root'
})
export class ReconciliationsService {

  constructor(private http: HttpClient) {}

  getReconciliationsById(id: number){
    return firstValueFrom(
      this.http.get<ReconciliationModel[]>(
        `${environment.uriLogistic}/api/Reconciliations/GetReconciliationsById/${id}`
      ));
  }

  getReconciliationHistory(){
    return firstValueFrom(
      this.http.get<ReconciliationModel[]>(
        `${environment.uriLogistic}/api/Reconciliations/GetReconciliationHistory`
      ));
  }

  getReconciliationsSap(userId: number){
    return firstValueFrom(
      this.http.get<AccountsModel[]>(
        `${environment.uriLogistic}/api/Reconciliations/GetReconciliationsSap/${userId}`
      ));
  }

}
