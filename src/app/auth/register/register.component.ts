import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase/app';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  test: Date = new Date();
  nombreUsuario: string;
  email: string;
  password: string;

  constructor(private servicio: AuthService, private router: Router) {
    // console.log("login----");
    if(this.servicio.isLogged){
      this.router.navigateByUrl('dashboard');
    }
  }

  checkFullPageBackgroundImage() {
    var $page = $('.full-page');
    var image_src = $page.data('image');

    if (image_src !== undefined) {
      var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
      $page.append(image_container);
    }
  };
  ngOnInit() {
    this.checkFullPageBackgroundImage();
  }
  crearUsuario() {
    // console.log(this.email+' '+this.password);
    this.servicio.crearUsuario(this.nombreUsuario, this.email, this.password);
  }

}
