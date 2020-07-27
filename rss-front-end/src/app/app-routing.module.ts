import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PapersComponent } from './feed/papers/papers.component';

const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'papers', component: PapersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
