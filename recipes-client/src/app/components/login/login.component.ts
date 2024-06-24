import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector :'app-login',
  templateUrl: './login.component.html',
  styleUrl :'./login.component.css'
})
export class LoginComponent implements OnInit {
  nameFocused: boolean = false;
  passwordFocused: boolean = false;
  public loginForm!: FormGroup;
  invalidCredentials = false;
  redirectToRegistration = false;
  username: string = '';
  password: string = '';
  passwordError: boolean = false;
  constructor(private route: Router,private _register_service: RegisterService) { }
  ngOnInit() {
    this.loginForm = new FormGroup({
      "name": new FormControl("", [Validators.required, Validators.minLength(3)]),
      "password": new FormControl("", [Validators.required,Validators.minLength(5)])});
  }
  onSubmit() {
    const name = this.loginForm.get('name').value;
    const password = this.loginForm.get('password').value;
    this._register_service.login(name, password).subscribe({
      next: (res) => {
        console.log(res);
        if (res === null) {
          Swal.fire({
            icon: "warning",
            title: " אופססס....",
            text: "הסיסמא שגויה, נסה שנית",
          }).then((result) => {
            if (result.isConfirmed) 
              // Navigate to the desired route in your Angular application
              this.route.navigate(['/register/login']);
          });
        } else if (res === false) {
          Swal.fire({
            icon: "error",
            title: " אופססס....",
            text:  `המשתמש ${name} אינו קיים במערכת, הינך מועבר להרשמה`,
          }).then((result) => {
            if (result.isConfirmed) {
              this._register_service.defaultUser=name;
              this.route.navigate(['/register']);

            }
          });
        } else if (res === true) {
          this._register_service.saveCurrentUser(name,password);
          this._register_service.changeName();
          this.route.navigate(['/recipe/all-recipes']);
        }
      }
    });
  }
}



 

