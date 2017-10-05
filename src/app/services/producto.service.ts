import { Injectable } from '@angular/core';
import { EcommerceService } from "./ecommerce.service";
import { UsuarioService } from "./usuario.service";
import { HttpService } from "./http.service";

@Injectable()
export class ProductoService {
  productosImportar:any[];
  constructor(private usuarioService:UsuarioService) { 
    
  }
}
