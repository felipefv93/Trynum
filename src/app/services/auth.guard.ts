import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {  AuthService } from './auth.service';
import {  AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map'
import { isNullOrUndefined } from "util";

@Injectable()
export class AuthGuard implements CanActivate {
  isLogged:Promise<boolean>;
  constructor(private servicio:AuthService, private router:Router,private af:AngularFireAuth){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(resolve=>{
      // console.log("guard");
      this.servicio.isLogin().then(success=>{
        resolve(true);
      }).catch(err=>{
        console.log(err);
        resolve(false);
      })
    });
     
    // return this.servicio.isLogin();
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    // console.log("guard child");
    return new Promise(resolve=>{
      resolve(this.canActivate(route,state));
    });
  }
}
