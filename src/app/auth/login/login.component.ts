import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase/app';

declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  test : Date = new Date();
  email:string;
  password:string;

  checkFullPageBackgroundImage(){
      var $page = $('.full-page');
      var image_src = $page.data('image');

      if(image_src !== undefined){
          var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
          $page.append(image_container);
      }
  };
  ngOnInit(){
      this.checkFullPageBackgroundImage();

      setTimeout(function(){
          // after 1000 ms we add the class animated to the login/register card
          $('.card').removeClass('card-hidden');
      }, 700)
  }
  constructor(private servicio:AuthService, private router:Router){
      // console.log("login----");
      if(this.servicio.isLogged){
        this.router.navigateByUrl('dashboard');
      }
  }
  emailLogin(){
      this.servicio.emailLogin(this.email,this.password);
  }
  facebookLogin(){
      this.servicio.facebookLogin();
  }
  googleLogin(){
      this.servicio.googleLogin();
  }
}
