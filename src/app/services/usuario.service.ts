import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable()
export class UsuarioService {
  error:any;
  usuario:firebase.User;
  datosUsuario:any;
  usuarioObser:FirebaseObjectObservable<any>;

  constructor(private db:AngularFireDatabase,private router:Router) { }
  obtenerDatosUsuario(): Promise<boolean>{
    //    console.log("entro a obtenerDatosUsuario "+this.usuario.uid);
    return new Promise(resolve => {
        // Simulate server latency with 2 second delay
         this.usuarioObser=this.db.object('/users/'+this.usuario.uid);
        // resolve(this.datosUsuario);
         this.usuarioObser.subscribe((datos)=>{
             this.datosUsuario= datos;
             console.log(this.datosUsuario);
             resolve(true);
         },(err)=>{
           console.log(err);
           resolve(false);
         })
        
        // this.datosUsuario.subscribe(usuario=>{
        //     resolve(usuario);
        // })
        
      });
   }

  crearUsuario(uid:any) {
    const itemObservable = this.db.object('/users/' + uid);
    itemObservable.set({
      nombreMostrar: name,
      fechaCreacion: new Date().getTime(),
      roles: { admin: false, ecommerce: false },
      opciones: { configuracionInicial: false }
    });

  }
  verificarUsuario(success:any):boolean{
    
          const itemObservable = this.db.object('/users/'+success.user.uid);
          itemObservable.subscribe(u=>{
              if(u.fechaCreacion == undefined){
                  itemObservable.set({ 
                      nombreMostrar: success.user.displayName,
                      fechaCreacion:new Date().getTime(),
                      roles: {admin:false,ecommerce:false},
                      opciones:{configuracionInicial:false}
                  });
                  this.router.navigateByUrl('dashboard');
                  return true;
              }else{
                  this.datosUsuario = itemObservable;
                  this.router.navigateByUrl('dashboard');
                  return true;
              }
          },err=>{
          // console.log(err);
          return true;
      })
      return true;
      }
}
