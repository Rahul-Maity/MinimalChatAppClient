import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [

  { path: '', redirectTo: '/register', pathMatch: 'full' }, // Redirect to login on empty path
  { path: 'login', component: LoginComponent },
  {path:'chat',component:UserListComponent},
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
