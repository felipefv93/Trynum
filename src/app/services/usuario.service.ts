import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Usuario } from "../modelos/usuario";

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
             resolve(true);
         },(err)=>{
        //    console.log(err);
           resolve(false);
         })
        
        // this.datosUsuario.subscribe(usuario=>{
        //     resolve(usuario);
        // })
        
      });
   }
   actualizarDatosUsuario():Promise<any>{
    return new Promise(resolve=>{
        resolve(this.db.object('/users/'+this.usuario.uid).update(this.datosUsuario));
    })
   }
   asignarEcommerceEnUso(uidEcommerce:string):Promise<any>{
    return new Promise(resolve=>{
        resolve(this.db.object('/users/'+this.usuario.uid).update({ecommerceEnUso:uidEcommerce}));
    })
   }
   actualizarImagenPerfil(imagen:string):Promise<any>{
       return new Promise(resolve=>{
        this.usuario.updateProfile({
            displayName:this.usuario.displayName,
            photoURL:imagen
        });
        resolve(true);
       });
   }
  crearUsuario(uid:any,nombreUsuario:string) {
      console.log(uid);
    const itemObservable = this.db.object('/users/' + uid);
    var usu= new Usuario();
    usu.nombreUsuario=nombreUsuario;
    usu.fechaCreacion= new Date().getTime();
    usu.nombreMostrar=nombreUsuario;
    itemObservable.set(usu);

  }
  verificarUsuario(success: any): Promise<boolean> {
      return new Promise(resolve => {
          const itemObservable = this.db.object('/users/' + success.user.uid);
          itemObservable.subscribe(u => {
              if (u.fechaCreacion == undefined) {
                  this.crearUsuario(success.user.uid,success.user.displayName);
                //   itemObservable.set({
                //       nombreMostrar: success.user.displayName,
                //       fechaCreacion: new Date().getTime(),
                //       roles: { admin: false, ecommerce: false },
                //       opciones: { configuracionInicial: false }
                //   });

                  resolve(true);
              } else {
                  this.datosUsuario = itemObservable;
                  resolve(true);

              }
          }, err => {
              resolve(false);
          })
      })


  }
  obtenerProductos(): Promise<boolean>{
      return new Promise(resolve=>{
          this.db.list('')
      })
  }
  obtenerEcommerces(): Promise<FirebaseListObservable<any>>{
      return new Promise(resolve=>{
        resolve (this.db.list('/ecommerces',{
            query:{
              orderByChild:'usuarioCreacion',
              equalTo:this.usuario.uid
            }
          }));
      });
  }
  obtenerEcommercesExternos(): Promise<FirebaseListObservable<any>>{
        return new Promise(resolve=>{
        resolve (this.db.list('/ecommercesExternos',{
            query:{
                orderByChild:'usuarioCreacion',
                equalTo:this.usuario.uid
            }
            }));
        });
    }
}
