import { Component, OnInit, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';
import { EcommerceService } from "../../services/ecommerce.service";
// import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce-externo.component.html',
  styles: []
})
export class EcommerceExternoComponent implements OnInit, OnDestroy  {
  ngOnDestroy(): void {
    
  }
  ngOnInit(): void {
    this.servicio.init();
  }
 
  constructor(private servicio:EcommerceService) {   }
}
