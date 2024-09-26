import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/users/auth.service';
import { LoginHistoryModel } from '../models/login-history';
import { UserService } from 'src/app/service/users/user.service';
import { Messages } from 'src/app/helpers/messages';

@Component({
  selector: 'app-login-history',
  templateUrl: './login-history.component.html',
  styleUrls: ['./login-history.component.scss']
})
export class LoginHistoryComponent implements OnInit {
  loading: boolean = false;
  title:string = "Registro de Inicio de Sesión";
  historyList: LoginHistoryModel[] = [];

  constructor(private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getHistory();
  }

  async getHistory(){
    try{
      this.loading = true;
      Messages.loading("Cargando...","Espere un momento.");
      this.historyList = await this.userService.getLoginHistory();
      Messages.closeLoading();
      console.log(this.historyList);
    }
    catch(ex){
      Messages.warning(ex);
      Messages.closeLoading();
    }finally{
      this.loading = false;
    }
  }
}
