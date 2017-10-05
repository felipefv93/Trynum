import { Component, OnInit } from '@angular/core';

import { ProductoService } from "../../services/producto.service";

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit {

  constructor(private servicio:ProductoService) { }

  ngOnInit() {
  }

}
