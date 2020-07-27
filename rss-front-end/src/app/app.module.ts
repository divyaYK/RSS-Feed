import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PapersComponent } from './feed/papers/papers.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
// import { AuthInterceptor } from './auth-interceptor';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [AppComponent, HeaderComponent, PapersComponent, LoginComponent, SignupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatInputModule,
    MatDatepickerModule
  ],
  providers: [
    /*{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
