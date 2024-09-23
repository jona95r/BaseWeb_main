import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { AccountsDTOModel } from '../models/accountsDTO-model';
import { AccountsModel } from '../models/accounts-model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) {}

  getAccountsById(id: number){
    return firstValueFrom(
      this.http.get<AccountsModel[]>(
        `${environment.uriLogistic}/api/Accounts/GetAccountsById/${id}`
      ));
  }

  getAccountsHistory(){
    return firstValueFrom(
      this.http.get<AccountsModel[]>(
        `${environment.uriLogistic}/api/Accounts/GetAccountsHistory`
      ));
  }

  getAccountsSap(userId: number){
    return firstValueFrom(
      this.http.get<AccountsDTOModel[]>(
        `${environment.uriLogistic}/api/Accounts/GetAccountsSap/${userId}`
      ));
  }

}
