import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProductoService } from "../../services/producto.service";

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit,OnDestroy {
  
  constructor(private servicio:ProductoService) { }

  ngOnInit() {
    // console.log("onInit");
    this.servicio.obtenerProductos().then((success)=>{
      this.servicio.productos = success;
    });
  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // console.log("onDestroy");
    this.servicio.productos = null;
  }

}
