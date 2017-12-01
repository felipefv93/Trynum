import { Component, OnInit } from '@angular/core';
import { TableData } from "../../../md/md-table/md-table.component";
import { ProductoService } from "../../../services/producto.service";

@Component({
    selector: 'lista-productos',
    templateUrl: 'lista-productos.component.html'
})

export class ListaProductosComponent implements OnInit {
    public tableData1: TableData= {
        headerRow: [ '#', 'Nombre', 'Url', 'Fecha Creación', 'Estado', 'Actions'],
        dataRows:[
        ]
     };
    constructor(private servicio:ProductoService) { }

    ngOnInit() { }

    verProducto(uid:any){
        console.log(uid.$key);
        this.servicio.seleccionarProducto(uid.$key);
        // this.servicio.producto = producto;
        
    }
}