import { Injectable } from '@angular/core';
import { EcommerceService } from "./ecommerce.service";
import { UsuarioService } from "./usuario.service";
import { HttpService } from "./http.service";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { Producto } from '../modelos/producto';

@Injectable()
export class ProductoService {
  productosImportar:any[];
  editado:boolean = false;
  productos:FirebaseListObservable<any>;
  producto:any;//FirebaseObjectObservable<any>;
  constructor(private usuarioService:UsuarioService, private db:AngularFireDatabase) { 
    this.obtenerProductos().then((success)=>{
      this.productos = success;
    });
    
  }

  obtenerProductos():Promise<FirebaseListObservable<any>>{
    return new Promise(resolve=>{
      resolve (this.db.list('/products',{
        query:{
            orderByChild:'ecommerce',
            equalTo:this.usuarioService.datosUsuario.ecommerceEnUso
        }
        }));
    });

  }
  seleccionarProducto(uid:String){
   this.db.object('/products/'+uid).subscribe(data=>{
      this.producto = data;
      this.editado = true;
    })
  }
  nuevoProducto(){
    this.producto = new Producto();
    this.producto.medidaLongitud = "cm";
    this.producto.medidaPeso = "kg";
    this.producto.ecommerce = this.usuarioService.datosUsuario.ecommerceEnUso;
  }
  guardarProducto():Promise<any>{
    return new Promise(resolve=>{
      this.producto.fechaModificacion = new Date().getTime();
      this.producto.usuarioModificacion = this.usuarioService.usuario.uid;
      if(this.editado){
        this.db.object('/products/'+this.producto.$key).update(this.producto).then(data=>{
          resolve(data);
        }).catch(err=>{
          resolve(err);
        });
      }else{
        this.producto.fechaCreacion = new Date().getTime();
        this.producto.usuarioCreacion = this.usuarioService.usuario.uid;
        this.productos.push(this.producto).then(data=>{
          resolve(data);
        }).catch(err=>{
          resolve(err);
        })
      }
    });

  }
}
