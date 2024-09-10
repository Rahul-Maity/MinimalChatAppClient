import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit,OnDestroy{


  fullname: string | null = null;

  private userPayloadSubscription: Subscription | undefined;
 
  constructor(private auth:AuthService) { }
  
ngOnInit(): void {
  this.userPayloadSubscription = this.auth.userPayload$.subscribe(payload => {
    this.fullname = payload?.unique_name || null;
  });
  }
  
  ngOnDestroy(): void {
    if (this.userPayloadSubscription) {
      this.userPayloadSubscription.unsubscribe();
    }
  }


onLogout() {
  this.auth.signOut();
}

}
