import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { authGuard } from './guards/auth.guard';
import { ConversationHistoryComponent } from './components/conversation-history/conversation-history.component';

const routes: Routes = [

  { path: '', redirectTo: '/register', pathMatch: 'full' }, // Redirect to login on empty path
  { path: 'login', component: LoginComponent },
  // { path: 'chat', component: UserListComponent, canActivate: [authGuard] },
  //  { path: 'chat/user/:userId', component: ConversationHistoryComponent },

   {
    path: 'chat',
    component: UserListComponent,
    canActivate: [authGuard],
    children: [
      { path: 'user/:userId', component: ConversationHistoryComponent }
    ]
  },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
