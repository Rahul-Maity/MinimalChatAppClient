import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit,OnDestroy{



  fullname: string | null = null;

  private userPayloadSubscription: Subscription | undefined;

  users: any[] = []; 
  private userListSubscription: Subscription | undefined;
 
  constructor(private auth:AuthService,private userService: UserService,private router:Router) { }
  
ngOnInit(): void {
  this.userPayloadSubscription = this.auth.userPayload$.subscribe(payload => {
    this.fullname = payload?.unique_name || null;
  });

  this.userService.getUsers().subscribe((data: any) => {
    this.users = data.users;  // Access the 'users' property inside the response object
  });

  console.log( this.users);


  
  }

  
  
  ngOnDestroy(): void {
    if (this.userPayloadSubscription) {
      this.userPayloadSubscription.unsubscribe();
    }


    if (this.userListSubscription) {
      this.userListSubscription.unsubscribe();
    }
  }


onLogout() {
  this.auth.signOut();
  }
  
  onUserClick(userId: string): void {
    this.router.navigate(['/chat/user', userId]);
  }

}
