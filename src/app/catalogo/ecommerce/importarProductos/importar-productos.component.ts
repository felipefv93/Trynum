import { Component, OnInit } from '@angular/core';
import { ImportarProductoService } from "../../../services/importar-producto.service";
import { TableData } from "../../../md/md-table/md-table.component";
import { Observable } from 'rxjs/Rx';
import { EcommerceService } from '../../../services/ecommerce.service';

@Component({
    selector: 'importar-productos',
    templateUrl: 'importar-productos.component.html'
})

export class ImportarProductosComponent implements OnInit {
    public tableData1: TableData= {
        headerRow: [ '#', 'Nombre', 'Cantidad', 'Precio', 'Imagen', 'Acciones'],
        dataRows: []
     };
    constructor(private servicio:ImportarProductoService, private servicioEcommerce:EcommerceService) { }

    ngOnInit() { }
    guardarProductos(){
        this.servicio.guardarProductos().then((success)=>{
            console.log("success");
            this.servicio.productosImportar=undefined;
            this.servicio.productos = undefined;
            this.servicioEcommerce.importarProductos= false;
        }).catch((err)=>{
            console.log(err);
        })
        
    }
}