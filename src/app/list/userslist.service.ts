import { Injectable } from '@angular/core';
//var jsPDF = require('jspdf');
import { jsPDF } from "jspdf";
//require('jspdf-autotable');
import 'jspdf-autotable'


@Injectable({
  providedIn: 'root'
})
export class UserslistService {

  constructor() { }

 /**
   * Listado cierre de caja
   * 
   * 
   * @param title Título de la columna
   * @param head Títulos cabecera tabla [['Columna1', 'Columna2', 'Columna3', 'Columna4']]
   * @returns  
   */
  public getes(title:string,textCabecera:string,head:[string[]],data:any) {
    //Posición en Y de la tabla
    let tableY:number = 50;
    
    if (!head) {
      return;
    } 


const doc:any = new jsPDF();


  // jsPDF 1.4+ uses getWidth, <1.4 uses .width
  var pageSize = doc.internal.pageSize
  var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth()

  //Titulo del listado
  doc.setFontSize(18)
  doc.text(title, pageSize.width / 2 , 22, {align: 'center'})
  
  
  doc.setFontSize(11)
  doc.setTextColor(100)
  doc.text(textCabecera, 14, 28)

  doc.autoTable({
    head: head,
    body: data,
    startY: 34, //Inicio de la tabla en Y
    showHead: 'everyPage', //'everyPage'|'firstPage'|'never' = 'everyPage''
    columnStyles: {
      [0]: {fontStyle:'bold'}
    }
  })
  //Final del listado
  doc.text("Usuario", 14, doc.lastAutoTable.finalY + 5)

doc.save('Cierre de caja.pdf')







  }

}
