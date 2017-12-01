import { Component, OnInit } from '@angular/core';
import { EcommerceService } from "../../../services/ecommerce.service";
import { ProductoService } from "../../../services/producto.service";
import { ImportarProductoService } from "../../../services/importar-producto.service";
import { TableData } from "../../../md/md-table/md-table.component";


@Component({
    selector: 'lista-ecommerce',
    templateUrl: 'lista-ecommerce.component.html'
})

export class ListaEcommerceComponent implements OnInit {
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
    constructor(private servicio:EcommerceService,
        private productoService:ProductoService,
        private importarProductoService:ImportarProductoService) { }

    ngOnInit() { }
    
    importarProductos(ecommerce){
        this.servicio.ecommerceEnUso=ecommerce;
        this.importarProductoService.importarProductos2().then(success=>{
            console.log(success);
        }).catch(err=>{
            console.log(err);
        });
        // this.servicio.obtenerDatosVersion(ecommerce.version)
        // .then((success)=>{
        //     success.subscribe((datos)=>{
        //         this.importarProductoService.importarProductos(ecommerce.linkEcommerce+''+datos.rutaImportar)
        //         .then((success)=>{
        //             this.importarProductoService.obtenerImagenesPrestashop(ecommerce.linkEcommerce)
        //             .then((success)=>{
        //                 console.log(this.importarProductoService.productosImportar);
        //             })
        //             this.servicio.importarProductos = true;
        //         }).catch((err)=>{
        //             console.log(err);
        //         })
                
        //     },(err)=>{

        //     });
        // })
    }
}