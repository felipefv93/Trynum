import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyCjB0ZGiHLUZ27dMsdOSSjtdgWyzvwwzf0",
  authDomain: "bandapp-21ea7.firebaseapp.com",
  databaseURL: "https://bandapp-21ea7.firebaseio.com",
  projectId: "bandapp-21ea7",
  storageBucket: "bandapp-21ea7.appspot.com",
  messagingSenderId: "146443321753"
}
//Services
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
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
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
