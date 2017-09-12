import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable  } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import * as firebase from 'firebase/app';
import { isNullOrUndefined } from "util";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  error:any;
  usuario:firebase.User;
  datosUsuario:FirebaseObjectObservable<any>;
  isLogged:boolean=false;
  redirectUrl:string;
  datosUsuario2:any;
  ecommerce:boolean;

  constructor(private afAuth:AngularFireAuth, private db:AngularFireDatabase,private router:Router) { 
    // this.afAuth.auth.signOut();
  }

  isLogin(): Promise<boolean>{
    return new Promise(resolve=>{
      this.afAuth.authState.subscribe(auth=>{
        if(isNullOrUndefined(auth)){
          this.router.navigate(['/auth/login']);
          this.isLogged=false;
          resolve(false);
        }else{
          this.usuario=auth;
          this.isLogged=true;
          resolve(true);
        }
      })
    })
  }
  obtenerDatosUsuario(): Promise<any>{
    //    console.log("entro a obtenerDatosUsuario "+this.usuario.uid);
    return new Promise(resolve => {
        // Simulate server latency with 2 second delay
        // this.datosUsuario=this.db.object('/users/'+this.usuario.uid);
        // resolve(this.datosUsuario);
        resolve(this.db.object('/users/'+this.usuario.uid));
        // this.datosUsuario.subscribe(usuario=>{
        //     resolve(usuario);
        // })
        
      });
   }
  emailLogin(email:string,password:string){
      // console.log("email: "+email+" pass: "+password);
      this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then((success)=>{
          this.usuario=success.user;
          // console.log("Inicio Sesion");
          this.router.navigateByUrl('dashboard');
          return true;
      })
      .catch((err)=>{
          this.error= err;
          return false;

      });
  }
  facebookLogin(){
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((success)=>{
        return this.verificarUsuario(success);
      
      // this.router.navigateByUrl('dashboard');
      //     return true;
      })
      .catch((err)=>{
        this.error=err;
        return false;
      });
  }
  googleLogin(){
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((success)=>{
          return this.verificarUsuario(success);
      })
      .catch((err)=>{
          this.error= err;
          return false;
      });
  }
  cerrarSesion(){
      this.afAuth.auth.signOut()
      .then((success)=>{
          this.datosUsuario=null;
          this.usuario=null;
          this.router.navigateByUrl('pages/login');
          
      })
      .catch((err)=>{
          console.log("Error: "+err);
          this.error = err;
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
  crearUsuario(name:string,email:string,password:string){
      // console.log(name+' '+email);
      this.afAuth.auth.createUserWithEmailAndPassword(email,password)
      .then((success)=>{
          
          console.log(success);
          this.afAuth.auth.currentUser.sendEmailVerification()
          .then((success)=>{
              // console.log("se envio correo.");
          }).catch((err)=>{
              console.log(err);
              this.error=err;
          });
          this.afAuth.auth.currentUser.updateProfile({displayName:name,photoURL:''})
          .then((success)=>{
              // console.log("datos actualizacos");
              this.router.navigateByUrl('/auth/login');
          }).catch((err)=>{
              this.error= err;
              console.log(err);
          });
          const itemObservable = this.db.object('/users/'+success.uid);
          itemObservable.set({ 
              nombreMostrar: name,
              fechaCreacion:new Date().getTime(),
              roles: {admin:false,ecommerce:false},
              opciones:{configuracionInicial:false}
          });
      }).catch((err)=>{
          this.error=err;
          console.log("errror: "+err);
      })

  }

}
