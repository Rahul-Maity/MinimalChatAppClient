import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import validateForm from '../../helpers/validateForm';
import { Login } from '../../models/login.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,private toastr: ToastrService) {
    
    
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin()
  {
    console.log('click');
    
    if (this.loginForm.valid)
    {
      const loginData: Login = {
        email: this.loginForm.get('email')?.value,
       
        password: this.loginForm.get('password')?.value
      };

      this.auth.login(loginData).subscribe(
        
        {
          next: (res) => {
            // this.toastr.success('Hello world!', 'Toastr fun!');
            this.toastr.success('Login completed successfully', 'Success', {
              timeOut: 3000,
            });
            this.auth.storeToken(res.token);
            console.log(res);
            this.loginForm.reset();
           
            this.router.navigate(['/chat']);
  
          },
          error: (err) => { 
            const errorMessage = err?.error?.message || 'An unknown error occurred.';
            this.toastr.error(errorMessage, 'Error', {
              timeOut: 3000,
            });


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
