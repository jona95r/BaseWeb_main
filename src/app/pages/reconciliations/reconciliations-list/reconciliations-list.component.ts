import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReconciliationModel } from '../models/reconciliation-model';
import { ReconciliationsService } from '../services/reconciliations.service';
import { Messages } from 'src/app/helpers/messages';
import { AccountsModel } from '../models/accounts-model';
import { AuthService } from 'src/app/service/users/auth.service';
import { User } from 'src/app/models/user';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-reconciliations-list',
  templateUrl: './reconciliations-list.component.html',
  styleUrls: ['./reconciliations-list.component.scss']
})
export class ReconciliationsListComponent implements OnInit {
  loading: boolean = false;
  formFilter:FormGroup;
  reconciliationList: ReconciliationModel[] = [];
  accountList: AccountsModel[] = [];
  user: User;
  title:string = "Listado de Reconciliaciones";
  
  constructor(private fb: FormBuilder,
    private reconciliationService: ReconciliationsService,
    private authService: AuthService
  ) { this.user = authService.UserValue;}

  ngOnInit(): void {
    this.getReconciliationsHistory();
  }

  async showNewReconciliation(){
    this.accountList = await this.reconciliationService.getReconciliationsSap(this.user.userId);
    this.generatePdfReport();
  }

  generatePdfReport() {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(12);
    doc.text('Reporte de Reconciliación Bancaria', 14, 15);
    
    // Agregamos un espacio para separar las empresas
    const tableBody: any[] = [];

    // Filtrar por empresas (CHAMER e INTERCOSMO en este caso)
    const chamerAccounts = this.accountList.filter(acc => acc.empresa === 'CHAMER');
    const intercosmoAccounts = this.accountList.filter(acc => acc.empresa === 'INTERCOSMO');
    
    // Crear filas para CHAMER
    chamerAccounts.forEach(account => {
      const row = [
        account.nombreCuenta, // Nombre del banco
        account.monedaCuenta === 'USD' ? account.totalUSD.toFixed(2) : '', // USD column
        account.monedaCuenta === 'LPS' ? account.totalLPS.toFixed(2) : '', // LPS column
        'CHAMER', // Empresa
        '',
        '', // Espacio vacío
      ];
      tableBody.push(row);
    });

    // Crear filas para INTERCOSMO
    intercosmoAccounts.forEach(account => {
      const row = [
        account.nombreCuenta, // Nombre del banco
        account.monedaCuenta === 'USD' ? account.totalUSD.toFixed(2) : '', // USD column
        account.monedaCuenta === 'LPS' ? account.totalLPS.toFixed(2) : '', // LPS column
        '', // Espacio vacío para CHAMER
        'INTERCOSMO', // Empresa
      ];
      tableBody.push(row);
    });

    // Definir las columnas de la tabla
    const tableColumns = [
      'Banco', 'USD CHAMER', 'LPS CHAMER', 'Empresa', 'USD INTERCOSMO', 'LPS INTERCOSMO'
    ];

    // Agregar la tabla
    (doc as any).autoTable({
      head: [tableColumns],
      body: tableBody,
      startY: 20, // Posición de la tabla
    });

    // Abre el PDF en una nueva ventana
    doc.output('dataurlnewwindow');  // Aquí es donde abrimos el PDF en una nueva ventana
  }

  async getReconciliationsHistory(){
    try{
      this.loading = true;
      Messages.loading("Cargando...","Espere un momento.");
      this.reconciliationList = await this.reconciliationService.getReconciliationHistory();
      Messages.closeLoading();
      this.loading = false;
    }catch(ex){
      Messages.closeLoading();
      Messages.warning(ex);
    }
  }
}
