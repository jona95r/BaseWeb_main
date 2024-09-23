import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { AccountsDTOModel } from '../models/accountsDTO-model';
import { AccountsModel } from '../models/accounts-model';

@Injectable({
  providedIn: 'root'
})
export class ReconciliationsService {

  constructor(private http: HttpClient) {}

  getReconciliationsById(id: number){
    return firstValueFrom(
      this.http.get<AccountsModel[]>(
        `${environment.uriLogistic}/api/Accounts/GetAccountsById/${id}`
      ));
  }

  getReconciliationHistory(){
    return firstValueFrom(
      this.http.get<AccountsModel[]>(
        `${environment.uriLogistic}/api/Accounts/GetAccountsHistory`
      ));
  }

  getReconciliationsSap(userId: number){
    return firstValueFrom(
      this.http.get<AccountsDTOModel[]>(
        `${environment.uriLogistic}/api/Accounts/GetAccountsSap/${userId}`
      ));
  }

}
