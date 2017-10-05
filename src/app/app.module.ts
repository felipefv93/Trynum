import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyDSwmcgToRlFNWUprmFwt-bcUCAv2a7XFM",
  authDomain: "trynum-4006f.firebaseapp.com",
  databaseURL: "https://trynum-4006f.firebaseio.com",
  projectId: "trynum-4006f",
  storageBucket: "trynum-4006f.appspot.com",
  messagingSenderId: "36400295116"
}
//Services
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { UsuarioService } from './services/usuario.service';
import { EcommerceService } from './services/ecommerce.service';
import { ProductoService } from './services/producto.service';
import { ImportarProductoService } from './services/importar-producto.service';
import { HttpService } from './services/http.service';
import { MensajesService } from './services/mensajes';
//Rutas
import { AppRoutes } from './app.routing';

//Modulos
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes,{useHash:true}),    
    HttpModule,
    SidebarModule,
    FooterModule,
    NavbarModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UsuarioService,
    EcommerceService,
    ProductoService,
    ImportarProductoService,
    HttpService,
    MensajesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
