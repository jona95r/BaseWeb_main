import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Messages } from 'src/app/helpers/messages';
import { AuthService } from 'src/app/service/users/auth.service';
import { User } from 'src/app/models/user';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { style } from '@angular/animations';
import { AccountsModel } from '../models/accounts-model';
import { AccountsDTOModel } from '../models/accountsDTO-model';
import { getLocaleDateFormat } from '@angular/common';
import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {
  loading: boolean = false;
  formFilter:FormGroup;
  accountsList: AccountsModel[] = [];
  accounts: AccountsDTOModel[] = [];
  findAccounts: AccountsModel[] = [];
  date: string;
  user: User;
  title:string = "Listado de Cuentas";
  
  constructor(private fb: FormBuilder,
    private accountsService: AccountsService,
    private authService: AuthService
  ) { this.user = authService.UserValue;}

  ngOnInit(): void {
    this.getAccountsHistory();
  }

  async showNewAccounts(){
    let result = await Messages.question("Nuevo Reporte","Generar un nuevo reporte creara un nuevo registro, ¿Esta seguro de generar un nuevo reporte? ")
    if(result){
      this.date = new Date().toISOString().substring(0, 10);
      this.accounts = await this.accountsService.getAccountsSap(this.user.userId);
      await this.generatePdfReport();
      await this.getAccountsHistory();
    }
  }

  async getAccountById(account: any){
    console.log('Cuenta a buscar: ', account);
    this.findAccounts = await this.accountsService.getAccountsById(account.id);
    // Fecha
    this.date = this.findAccounts[0].docDate.toString().substring(0,10);

    this.accounts = [];
    // Itera sobre las cuentas encontradas
    for(const accountItem of this.findAccounts){
      // Itera sobre el detalle de cada cuenta
      for(const detail of accountItem.detail){
        // Crea un nuevo objeto del tipo AccountsDTOModel y asigna los valores correspondientes
        const dto: AccountsDTOModel = {
          empresa: detail.empresa,
          segmento: detail.segmento,
          nombreCuenta: detail.nombreCuenta,
          monedaCuenta: detail.monedaCuenta,
          totalLPS: detail.totalLPS,
          totalUSD: detail.totalUSD,
          banco: detail.banco
        };
        
        // Agrega el nuevo objeto a la lista de cuentas DTO
        this.accounts.push(dto);
      }
    }
    console.log('Detalles extraídos: ', this.accounts);
    this.generatePdfReport();
  }

  // generatePdfReport() { 
  //   function formatCurrency(value) {
  //     // Asegúrate de que el valor es un número
  //     const number = parseFloat(value);
  //     if (isNaN(number)) return '0.0000'; // Devuelve un valor predeterminado si no es un número
  
  //     // Formatear el número
  //     return number.toLocaleString('en-US', {
  //         minimumFractionDigits: 4,
  //         maximumFractionDigits: 4
  //     });
  //   }
    
  //   const doc = new jsPDF('landscape'); // Mantener en orientación horizontal

  //   // Título principal
  //   doc.setFont('helvetica', 'bold');
  //   doc.setFontSize(12);
  //   doc.text('REPORTE DE CUENTAS BANCARIAS', 14, 8);
  //   doc.setTextColor(91, 91, 91);
  //   doc.text(this.date, 263, 8);

  //   //Titulo secundario Chamer
  //   doc.setFont('helvetica', 'bold');
  //   doc.setFontSize(12);
  //   doc.setTextColor(165, 15, 0);
  //   doc.text('CHAMER', 100, 17);

  //   //Titulo secundario Intercosmo
  //   doc.setFillColor(241, 241, 241); //Color del fondo
  //   doc.rect(145, 10, 70, 15, 'F'); //Posicion del fondo
  //   doc.text('INTERCOSMO', 165, 17);

  // //Titulo secundario Intercosmo
  //   doc.setTextColor(0, 0, 0);
  //   doc.text('COMBINADO', 235, 17);

  //   doc.setFont('helvetica', 'normal');
  //   doc.setTextColor(163, 163, 163);
  //   doc.text('_________________________________________________________________________________________', 75, 19);

  //   const tableBody: any[] = [];
  //   let sumaUSDChamer: number = 0;
  //   let sumaUSDInter: number = 0;
  //   let sumaLPSChamer: number = 0;
  //   let sumaLPSInter: number = 0;
  // debugger
  //   // Filtrar por empresas (CHAMER e INTERCOSMO)
  //   const chamerAccounts = this.accounts.filter(acc => acc.empresa === 'CHAMER');
  //   const intercosmoAccounts = this.accounts.filter(acc => acc.empresa === 'INTERCOSMO');
  //   // Crear filas combinadas de ambas empresas
  //   chamerAccounts.forEach((account, index) => {
  //     const intercosmoAccount = intercosmoAccounts[index];
   
  //     // Asegurarte de que todos los valores son números
  //     const chamerTotalUSD = account.totalUSD || 0;
  //     const chamerTotalLPS = account.totalLPS || 0;
  //     const intercosmoTotalUSD = intercosmoAccount?.totalUSD || 0;
  //     const intercosmoTotalLPS = intercosmoAccount?.totalLPS || 0;
   
  //     // Calcular los totales combinados en USD y Lempiras
  //     const totalUSD = chamerTotalUSD + intercosmoTotalUSD;
  //     const totalLPS = chamerTotalLPS + intercosmoTotalLPS;

  //     console.log('chamerTotalUSD',chamerTotalUSD);
  //     console.log('chamerTotalLPS',chamerTotalLPS);
  //     console.log('intercosmoTotalUSD',intercosmoTotalUSD);
  //     console.log('intercosmoTotalLPS',intercosmoTotalLPS);
  //     // Sumamos el total por columna
  //     sumaUSDChamer += chamerTotalUSD;
  //     sumaLPSChamer +=  chamerTotalLPS;
  //     sumaUSDInter += intercosmoTotalUSD;
  //     sumaLPSInter += intercosmoTotalLPS;

  //     console.log('sumaUSDChamer',sumaUSDChamer);
  //     console.log('sumaLPSChamer',sumaLPSChamer);
  //     console.log('sumaUSDInter',sumaUSDInter);
  //     console.log('sumaLPSInter',sumaLPSInter);
   
  //     const row = [
  //       account.nombreCuenta, // Nombre del banco para CHAMER
  //       account.monedaCuenta === 'USD' ? formatCurrency(chamerTotalUSD): '', // USD CHAMER
  //       account.monedaCuenta === 'LPS' ? formatCurrency(chamerTotalLPS): '', // LPS CHAMER
  //       intercosmoAccount ? intercosmoAccount.monedaCuenta === 'USD' ? formatCurrency(intercosmoTotalUSD): '' : '', // USD INTERCOSMO
  //       intercosmoAccount ? intercosmoAccount.monedaCuenta === 'LPS' ? formatCurrency(intercosmoTotalLPS) : '' : '', // LPS INTERCOSMO
  //       formatCurrency(chamerTotalUSD + intercosmoTotalUSD),
  //       formatCurrency(chamerTotalLPS + intercosmoTotalLPS)
  //     ];
      
  //     tableBody.push(row);
  //  });

  //   // Agregar filas adicionales para INTERCOSMO si hay más cuentas
  //   if (intercosmoAccounts.length > chamerAccounts.length) {
  //     intercosmoAccounts.slice(chamerAccounts.length).forEach(account => {
  //       const totalUSD = account.totalUSD || 0;
  //       const totalLPS = account.totalLPS || 0;

  //       const row = [
  //         '', '', '', // Espacios vacíos para CHAMER
  //         account.monedaCuenta === 'USD' ? formatCurrency(account.totalUSD) : '', // USD INTERCOSMO
  //         account.monedaCuenta === 'LPS' ? formatCurrency(account.totalLPS) : '', // LPS INTERCOSMO
  //         totalUSD, // Total combinado USD (solo para INTERCOSMO)
  //         totalLPS  // Total combinado LPS (solo para INTERCOSMO)
  //       ];

  //       tableBody.push(row);
  //     });
  //   }

  //   // Agregar fila de totales
  //   const totalRow = [
  //     {content: 'Totales', styles:{fontStyle: 'bold'}},
  //     {content:formatCurrency(sumaUSDChamer), styles:{ fontStyle: 'bold' }},
  //     {content:formatCurrency(sumaLPSChamer), styles:{ fontStyle: 'bold' }},
  //     {content:formatCurrency(sumaUSDInter), styles:{ fontStyle: 'bold' }},
  //     {content:formatCurrency(sumaLPSInter), styles:{ fontStyle: 'bold' }},
  //     {content:formatCurrency(sumaUSDChamer + sumaUSDInter), styles:{ fontStyle: 'bold' }},
  //     {content:formatCurrency(sumaLPSChamer + sumaLPSInter), styles:{ fontStyle: 'bold' }}
  //   ];
  //   tableBody.push(totalRow);

  //   // Definir las columnas de la tabla
  //   // const tableColumns = [
  //   //   'Banco', 'USD CHAMER', 'LPS CHAMER', 'USD INTERCOSMO', 'LPS INTERCOSMO', 'TOTAL USD', 'TOTAL LPS'
  //   // ];

  //   // Definir las columnas de la tabla
  //   const tableColumns = [
  //     'Banco', 'USD', 'LPS', 'USD', 'LPS', 'TOTAL USD', 'TOTAL LPS'
  //   ];

  //   // Agregar la tabla con estilos
  //   (doc as any).autoTable({
  //     head: [tableColumns],
  //     body: tableBody,
  //     startY: 20, // Posición de la tabla
  //     styles: {
  //       halign: 'center', // Centrar el contenido horizontalmente
  //     },
  //     headStyles: {
  //       fillColor: [255, 255, 255], // Fondo blanco para encabezado
  //       textColor: [0, 0, 0],       // Texto en color negro
  //       fontStyle: 'bold',          // Texto en negrita
  //     },
  //     columnStyles: {
  //       0: { cellWidth: 60 }, // Ajustar el ancho de la columna de "Banco"
  //       1: { cellWidth: 35, fillColor: [173, 216, 230] }, // Fondo azul para USD CHAMER
  //       2: { cellWidth: 35 }, // Ancho columna LPS CHAMER
  //       3: { cellWidth: 35, fillColor: [173, 216, 230] }, // Fondo azul para USD INTERCOSMO
  //       4: { cellWidth: 35 }, // Ancho columna LPS INTERCOSMO
  //       5: { cellWidth: 35, fillColor: [173, 216, 230] }, // Fondo amarillo para TOTAL USD
  //       6: { cellWidth: 35, }, // Fondo amarillo para TOTAL LPS
  //     },
  //     alternateRowStyles: {
  //       fillColor: [240, 240, 240], // Fondo gris suave para las filas alternadas
  //     }
  //   });

  //   // Abrir el PDF en una nueva ventana
  //   doc.output('dataurlnewwindow');
  //   this.accounts = [];
  // }

  async generatePdfReport() {  
    function formatCurrency(value: string) {
      const number = parseFloat(value);
      if (isNaN(number)) return '0.00'; 
      return number.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
  
    const doc = new jsPDF('landscape');
    const logoCompaniesUrl = 'assets/img/companies-logo.png';
  
    //Cargar y convertir el logo a base64
    try {
      const logoBlob = await this.fetchImage(logoCompaniesUrl);
      const base64Logo = await this.convertBlobToBase64(logoBlob);
      console.log(base64Logo);
  
      // Añadir el logo al PDF
      doc.addImage(base64Logo, 'PNG', 7, -10, 57, 57);  // Ajusta el tamaño // (imagen, formato, x, y, ancho, alto)
  
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
    }
  
    // Título principal
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('REPORTE DE CUENTAS BANCARIAS', 110, 20);
  
    doc.setTextColor(91, 91, 91);
    doc.text(this.date, 263, 26);
  
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(165, 15, 0);
    doc.text('CHAMER', 100, 33);
  
    doc.setFillColor(241, 241, 241); 
    doc.rect(143, 27, 69, 10, 'F');
    doc.text('INTERCOSMO', 165, 33);
  
    doc.setTextColor(0, 0, 0);
    doc.text('COMBINADO', 235, 33);
  
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(163, 163, 163);
    doc.text('_________________________________________________________________________________________', 75, 36);
  
    const tableBody: any[] = [];
    let sumaUSDChamer = 0;
    let sumaUSDInter = 0;
    let sumaLPSChamer = 0;
    let sumaLPSInter = 0;
  
    // Agrupar cuentas por banco y moneda
    const groupByBancoYMoneda = (accounts: any[]) => {
      return accounts.reduce((acc, curr) => {
        const key = `${curr.banco}-${curr.monedaCuenta}`;
        if (!acc[key]) {
          acc[key] = { ...curr, totalUSD: curr.totalUSD || 0, totalLPS: curr.totalLPS || 0 };
        } else {
          acc[key].totalUSD += curr.totalUSD || 0;
          acc[key].totalLPS += curr.totalLPS || 0;
        }
        return acc;
      }, {});
    };
  
    const groupedChamerAccounts = groupByBancoYMoneda(this.accounts.filter(acc => acc.empresa === 'CHAMER'));
    const groupedIntercosmoAccounts = groupByBancoYMoneda(this.accounts.filter(acc => acc.empresa === 'INTERCOSMO'));
  
    const allKeys = new Set([
      ...Object.keys(groupedChamerAccounts),
      ...Object.keys(groupedIntercosmoAccounts)
    ]);
  
    allKeys.forEach(key => {
      const chamerAccount = groupedChamerAccounts[key] || { totalUSD: 0, totalLPS: 0 };
      const intercosmoAccount = groupedIntercosmoAccounts[key] || { totalUSD: 0, totalLPS: 0 };
  
      const totalUSD = (chamerAccount.totalUSD || 0) + (intercosmoAccount.totalUSD || 0);
      const totalLPS = (chamerAccount.totalLPS || 0) + (intercosmoAccount.totalLPS || 0);
  
      sumaUSDChamer += chamerAccount.totalUSD;
      sumaLPSChamer += chamerAccount.totalLPS;
      sumaUSDInter += intercosmoAccount.totalUSD;
      sumaLPSInter += intercosmoAccount.totalLPS;
  
      const row = [
        {content: (intercosmoAccount.banco + ' ' + intercosmoAccount.monedaCuenta) || (intercosmoAccount.banco + ' ' + intercosmoAccount.monedaCuenta),
          styles: {
            halign: 'left',
          }
        },
        {content: chamerAccount.monedaCuenta === 'USD' ? formatCurrency(chamerAccount.totalUSD) : '', styles:{halign: 'right'}} ,
        {content: chamerAccount.monedaCuenta === 'LPS' ? formatCurrency(chamerAccount.totalLPS) : '', styles:{halign: 'right'}},
        {content: intercosmoAccount.monedaCuenta === 'USD' ? formatCurrency(intercosmoAccount.totalUSD) : '', styles:{halign: 'right'}},
        {content: intercosmoAccount.monedaCuenta === 'LPS' ? formatCurrency(intercosmoAccount.totalLPS) : '', styles:{halign: 'right'}},
        {content: formatCurrency(totalUSD), styles:{halign: 'right', fontStyle: 'bold'}},
        {content: formatCurrency(totalLPS), styles:{halign: 'right', fontStyle: 'bold'}}
      ];
  
      tableBody.push(row);
    });
  
    const totalRow = [
      { content: 'Totales', styles: { fontStyle: 'bold' } },
      { content: formatCurrency(sumaUSDChamer.toString()), styles: { halign: 'right', fontStyle: 'bold' } },
      { content: formatCurrency(sumaLPSChamer.toString()), styles: { halign: 'right', fontStyle: 'bold' } },
      { content: formatCurrency(sumaUSDInter.toString()), styles: { halign: 'right', fontStyle: 'bold' } },
      { content: formatCurrency(sumaLPSInter.toString()), styles: { halign: 'right', fontStyle: 'bold' } },
      { content: formatCurrency((sumaUSDChamer + sumaUSDInter).toString()), styles: { halign: 'right', fontStyle: 'bold' } },
      { content: formatCurrency((sumaLPSChamer + sumaLPSInter).toString()), styles: { halign: 'right', fontStyle: 'bold' } }
    ];
    tableBody.push(totalRow);
  
    const tableColumns = ['Banco', {content:'USD',styles: { halign: 'right' }}, {content:'LPS', style:{ haligh: 'right'}}, {content:'USD', style:{halign:'right'}}, {content:'LPS', style: {halign: 'right'}}, {content:'TOTAL USD', style: {halign:'right'}}, {content:'TOTAL LPS', style: {halign: 'right'}}];
  
    (doc as any).autoTable({
      head: [tableColumns],
      body: tableBody,
      startY: 40,
      styles: {
        halign: 'center',
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
    });
  
    doc.output('dataurlnewwindow');
    this.accounts = [];
  }
  
  // Método para cargar imagen
  async fetchImage(url: string): Promise<Blob> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`No se pudo cargar la imagen: ${url}`);
    }
    return response.blob();
  }
  
  // Convertir Blob a Base64
  async convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async getAccountsHistory(){
    try{
      this.loading = true;
      Messages.loading("Cargando...","Espere un momento.");
      this.accountsList = await this.accountsService.getAccountsHistory();
      Messages.closeLoading();
      this.loading = false;
    }catch(ex){
      Messages.closeLoading();
      Messages.warning(ex);
    }
  }
}
