import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { EcommerceService } from "../../services/ecommerce.service";
import { TableData } from "../../md/md-table/md-table.component";
// import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styles: []
})
export class EcommerceComponent  {
  public habilitarEcommerce:boolean=false;
  public tableData1: TableData= {
    headerRow: [ '#', 'Nombre', 'Url', 'Fecha Creación', 'Estado', 'Actions'],
    dataRows: [
        ['1', 'Andrew Mike', 'Develop', '2013', '99,225',''],
        ['2', 'John Doe', 'Design', '2012', '89,241', 'btn-round'],
        ['3', 'Alex Mike', 'Design', '2010', '92,144', 'btn-simple'],
        ['4','Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['5', 'Paul Dickens', 'Communication', '2015', '69,201', '']
    ]
 };
  constructor(private servicio:EcommerceService) {   }
  prueba(){
    
  }
  
  

}
