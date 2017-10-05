import { Component, OnInit } from '@angular/core';
import { ImportarProductoService } from "../../../services/importar-producto.service";
import { TableData } from "../../../md/md-table/md-table.component";
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'importar-productos',
    templateUrl: 'importar-productos.component.html'
})

export class ImportarProductosComponent implements OnInit {
    public tableData1: TableData= {
        headerRow: [ '#', 'Nombre', 'Cantidad', 'Precio', 'Imagen', 'Acciones'],
        dataRows: []
     };
    constructor(private servicio:ImportarProductoService) { }

    ngOnInit() { }
    prueba(){
        this.servicio.guardarProductos().then((success)=>{
            console.log("success");
        }).catch((err)=>{
            console.log(err);
        })
        
    }
}