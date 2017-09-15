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
  // ecommerces:any[];
  listo:boolean = false;
  constructor(private firebaseApp:FirebaseApp,public usuarioServicio:UsuarioService,
    private db:AngularFireDatabase) { 
      this.ecommerces=this.db.list('/ecommerces',{
        query:{
          orderByChild:'usuarioCreacion',
          equalTo:this.usuarioServicio.usuario.uid
        }
      });
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
