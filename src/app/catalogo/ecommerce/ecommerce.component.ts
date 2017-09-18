import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { EcommerceService } from "../../services/ecommerce.service";
// import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styles: []
})
export class EcommerceComponent  {
 
  constructor(private servicio:EcommerceService) {   }
}
