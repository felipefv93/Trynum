import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase,FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database'
import 'firebase/storage';

@Injectable()
export class EcommerceService {
  descargar:string;
  versiones:any[];
  ecommerces:FirebaseListObservable<any>;
  habilitarEcommerce:boolean= false;
  importarProductos:boolean=false;
  ecommerceEnUso:any;
  // ecommerces:any[];
  listo:boolean = false;
  constructor(private firebaseApp:FirebaseApp,public usuarioServicio:UsuarioService,
    private db:AngularFireDatabase) { 
      this.usuarioServicio.obtenerEcommerces().then((success)=>{
        
        this.ecommerces=success;
      })
      this.obtenerVersiones();

    }
    // obtenerEcommerces(){
    //   this.ecommercesObserv.subscribe(datos=>{
    //     this.ecommerces= datos;
    //   })
    // }
    obtenerVersiones():Promise<boolean>{
      return new Promise(resolve=>{
        this.db.list('versiones').subscribe((datos)=>{
          this.versiones=datos;
        },(err)=>{

        });
      });
    }
    obtenerDatosVersion(version:string):Promise<FirebaseObjectObservable<any>>{
      return new Promise(resolve=>{
        resolve(this.db.object('/versiones/'+version));
      });
    }
    guardarEcommerce(ecommerce){
      this.ecommerces.push(ecommerce);
    }
    /* Descargar Archivo
      let storageRef = this.firebaseApp.storage().ref();
          let path = datos[1].urlDescargar //+ this.imagen.name;
          var iRef = storageRef.child(path);
          console.log(iRef);
          iRef.getDownloadURL().then(success=>{
            console.log(success);
            this.descargar=success;
            this.listo = true;
          })
    */
}
