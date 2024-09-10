import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import validateForm from '../../helpers/validateForm';
import { Login } from '../../models/login.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) {
    
    
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin()
  {
    if (this.loginForm.valid)
    {
      const loginData: Login = {
        email: this.loginForm.get('email')?.value,
       
        password: this.loginForm.get('password')?.value
      };

      this.auth.login(loginData).subscribe(
        
        {
          next: (res) => {

            this.auth.storeToken(res.token);
            console.log(res);
            this.loginForm.reset();
           
            this.router.navigate(['/chat']);
  
          },
          error: (err) => { 
            const errorMessage = err?.error?.message || 'An unknown error occurred.';
          


            console.log(errorMessage);
          }
        }
       
      )
    }
    else {
      console.log('this form is  invalid');
      validateForm.validateAllFormFields(this.loginForm);
    }
  }

}
