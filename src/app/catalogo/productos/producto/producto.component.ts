import { Component, OnInit } from '@angular/core';
import { ProductoService } from "../../../services/producto.service";
import { FroalaEditorModule,FroalaViewModule } from "angular-froala-wysiwyg";

@Component({
    selector: 'producto',
    templateUrl: 'producto.component.html'
})

export class ProductoComponent implements OnInit {
    

    constructor(private servicio:ProductoService) { }

    ngOnInit() { }
    prueba(producto){
        console.log(producto);
    }
    guardarProducto(){
        this.servicio.guardarProducto().then(data=>{
            console.log(data);
            this.servicio.producto = undefined;
        }).catch(err=>{
            console.log(err);
        })
    }
}