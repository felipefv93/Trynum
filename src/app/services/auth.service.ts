import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { UsuarioService } from '../services/usuario.service';
import * as firebase from 'firebase/app';
import { isNullOrUndefined } from "util";
import { Router } from "@angular/router";
import { Usuario } from "../modelos/usuario";

@Injectable()
export class AuthService {
  error:any;
  usuario:firebase.User;
  isLogged:boolean=false;

  constructor(private afAuth:AngularFireAuth,
     private db:AngularFireDatabase,
     private router:Router,
    private servicioUsuario:UsuarioService) { 
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
            this.servicioUsuario.usuario= auth;
          this.usuario=auth;
          this.isLogged=true;
          this.servicioUsuario.obtenerDatosUsuario().then((success)=>{
              resolve(true);
          }).catch((err)=>{
                  console.log(err);
          });
          
        }
      })
    })
  }
  emailLogin(email:string,password:string){
      // console.log("email: "+email+" pass: "+password);
      this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then((success)=>{
          this.usuario=success.user;
          this.servicioUsuario.usuario=success.user;
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
        this.servicioUsuario.verificarUsuario(success)
        .then((success)=>{
          if(success){
              this.router.navigateByUrl('dashboard');
              return true;
          }
        }).catch((err)=>{
            console.log(err);
            return false;
        })
      })
      .catch((err)=>{
        this.error=err;
        return false;
      });
  }
  googleLogin(){
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((success)=>{
           this.servicioUsuario.verificarUsuario(success)
          .then((success)=>{
            if(success){
                this.router.navigateByUrl('dashboard');
                return true;
            }
          }).catch((err)=>{
              console.log(err);
              return false;
          })
      })
      .catch((err)=>{
          this.error= err;
          return false;
      });
  }
  cerrarSesion(){
      this.afAuth.auth.signOut()
      .then((success)=>{
          this.usuario=null;
          this.servicioUsuario.usuario=null;
          this.servicioUsuario.datosUsuario=new Usuario();
          this.router.navigateByUrl('pages/login');
          
      })
      .catch((err)=>{
          console.log("Error: "+err);
          this.error = err;
      });
  }
  crearUsuario(nombreUsuario:string,email:string,password:string){
      // console.log(name+' '+email);
      this.afAuth.auth.createUserWithEmailAndPassword(email,password)
      .then((success)=>{
          this.servicioUsuario.crearUsuario(success.uid,nombreUsuario);
            this.afAuth.auth.currentUser.updateProfile({displayName:name,photoURL:''})
            .then((success)=>{
                this.afAuth.auth.currentUser.sendEmailVerification()
                .then((success)=>{
                    // console.log("se envio correo.");
                }).catch((err)=>{
                    console.log(err);
                    this.error=err;
                });
                
                this.router.navigateByUrl('/auth/login');
            }).catch((err)=>{
                this.error= err;
                console.log(err);
            });
          
      }).catch((err)=>{
          this.error=err;
          console.log("errror: "+err);
      })

  }

}
