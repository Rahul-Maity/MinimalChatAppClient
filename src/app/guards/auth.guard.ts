import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastrService);

  if (auth.isLoggedIn())
  {
    return true;
  }
  else {
    router.navigate(['/login']);
    toast.warning( 'Please login first','Warning', { timeOut: 3000 });
    return false;
    
  }

  

};
