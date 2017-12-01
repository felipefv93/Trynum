import { Injectable } from '@angular/core';
import { EcommerceService } from "./ecommerce.service";
import { UsuarioService } from "./usuario.service";
import { HttpService } from "./http.service";
import { MensajesService } from "./mensajes";
import { AngularFireDatabase,FirebaseListObservable} from "angularfire2/database";
@Injectable()
export class ImportarProductoService {
  productosImportar:any;
  productos:FirebaseListObservable<any>;
  constructor(private usuarioService:UsuarioService,
    private http:HttpService,
    private mensajes:MensajesService,
    private db:AngularFireDatabase,
    private ecommerceService:EcommerceService) { }
  importarProductos2():Promise<boolean>{
    return new Promise(resolve=>{
      this.ecommerceService.obtenerDatosVersion(this.ecommerceService.ecommerceEnUso.version)
      .then((success)=>{
          success.subscribe((datos)=>{
              this.importarProductos(this.ecommerceService.ecommerceEnUso.linkEcommerce+''+datos.rutaImportar)
              .then((success)=>{
                console.log(this.ecommerceService.ecommerceEnUso);
                  this.obtenerImagenesPrestashop(this.ecommerceService.ecommerceEnUso.linkEcommerce)
                  .then((success)=>{
                      console.log(this.productosImportar);
                  })
                  this.ecommerceService.importarProductos = true;
              }).catch((err)=>{
                  console.log(err);
              })
              
          },(err)=>{

          });
      })

    });
  }
  importarProductos(url:string):Promise <boolean>{
    return new Promise(resolve=>{
      this.mensajes.loading(true);
      this.http.get(url).subscribe(data=>{
        this.productosImportar = data;
        this.mensajes.loading(false);
        resolve(true);
        console.log(this.productosImportar);
      })
    })
    // console.log(this.http.prueba(url));
    
  }
  obtenerImagenesPrestashop(baseUrl:string):Promise<boolean>{
    return new Promise(resolve=>{
      this.productosImportar.productos.forEach(producto => {
        producto.ecommerceExterno= this.ecommerceService.ecommerceEnUso.$key;
        producto.seleccionado = false;
        producto.urlImagen= this.UrlImagenPrestashop(baseUrl,producto.imagen);
        this.http.get(producto.urlImagen).subscribe(data=>{
          console.log(data);
        })
        this.http.get("http://desarrolloinc3-001-site1.itempurl.com/imagenes/p/1/1.jpg").subscribe(data=>{
          
          console.log("Imagen smarterasp",data);
        })
        producto.imagenes = [];
        this.productosImportar.imagenes.forEach(imagen=>{
          if(imagen.idProducto==producto.idProducto){
            imagen.urlImagen=this.UrlImagenPrestashop(baseUrl,imagen.idImagen);
            producto.imagenes.push(imagen);
          }
        });          
      });
    });
  }
  obtenerDescripcionesPrestashop(baseUrl:string):Promise<boolean>{
    return new Promise(resolve=>{
      
    });
  }
  UrlImagenPrestashop(urlBase:string,imagen:string):string{
    var url = urlBase+'/img/p/';
    // console.log(imagen);
    // console.log(url);
    var i = 0;
    do {
    //    console.log(element.imagen.substring(i,i+1));
       url += imagen.substring(i,i+1)+'/';
       i++;
    }
    while (i < imagen.length);
    url+=imagen+'.jpg';
    // console.log(url);
    return url;
  }
  guardarProductos():Promise<boolean>{
    return new Promise(resolve=>{
      
      // this.db.list('products').push({"nombre":"Carro","modelo":"das"});
      this.mensajes.loading(true);
      this.productos=this.db.list('products');
      this.productosImportar.productos.forEach(producto => {
        if(producto.seleccionado){
          console.log(this.usuarioService.datosUsuario);
          producto.estado = true;
          producto.fechaCreacion = new Date().getTime();
          producto.fechaModificacion = new Date().getTime();
          producto.ecommerce = this.usuarioService.datosUsuario.ecommerceEnUso;
           console.log(this.ecommerceService.ecommerceEnUso.$key+"-"+producto.idProducto);
           producto.usuarioCreacion = this.usuarioService.usuario.uid;
          this.db.object('products/'+this.ecommerceService.ecommerceEnUso.$key+"-"+producto.idProducto).set(producto).then(success=>{
            console.log("se guardo");
            this.db.object('productosImportados/'+this.ecommerceService.ecommerceEnUso.$key+"-"+producto.idProducto).set(true);
          }).catch(err=>{
            console.log("no se guardo");
          })      
        }
        
      });
      this.mensajes.loading(false);
      this.mensajes.correcto("Se agregaron/modificaron los productos correctamente.");
      resolve(true);
    });
  }

}
