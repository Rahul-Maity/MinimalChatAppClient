import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Register } from '../../models/register.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements  OnInit {


  registerForm!: FormGroup;

  type: string = "password";

  eyeIcon: string = "fa-eye-slash";
  isText: boolean = false;
  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router) {
   
    
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText? this.type="text": this.type="password";
    }


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onRegister()
  {
    if (this.registerForm.valid) {

      const registerData: Register = {
        email: this.registerForm.get('email')?.value,
        name: this.registerForm.get('name')?.value,
        password: this.registerForm.get('password')?.value
      };


      this.auth.register(registerData).subscribe(
        {
          next: (res) => {
            console.log(res);
            this.registerForm.reset();
           
            this.router.navigate(['/login']);

          },
          error: (err) => { 
            const errorMessage = err?.error?.message || 'An unknown error occurred.';
          
            console.log(errorMessage);
          }
        }
      )

    }
      
      
  }


}
