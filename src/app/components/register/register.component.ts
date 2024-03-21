import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../register-service.service';
import { User } from '../../classes/User';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  nameFocused: boolean = false;
  addressFocused: boolean = false;
  emailFocused: boolean = false;
  passwordFocused: boolean = false;
  public registerForm!: FormGroup;
  
  constructor(private route: Router, private _register_service: RegisterService){}
  ngOnInit() {
    this.registerForm = new FormGroup({
      "name": new FormControl(this._register_service.defaultUser, [Validators.required, Validators.minLength(3)]),
      "address": new FormControl("", [Validators.required,Validators.minLength(6)]),
      "email": new FormControl("", [Validators.required,Validators.pattern(/^.+@.+\..+$/)]),
      "password": new FormControl("", [Validators.required,Validators.minLength(6)])
    });
  }
 
  onSubmit() {
    this._register_service.RegisterPlus();
    const name = this.registerForm.get('name').value;
    const password = this.registerForm.get('password').value;
    const address = this.registerForm.get('address').value;
    const email = this.registerForm.get('email').value;
    const id = this._register_service.registerCode;
    const user=new User(id,name,address,email,password);
    this._register_service.register(user).subscribe({
      next: (res) => {
        console.log(res);
        if (res === false) {
          Swal.fire({
            icon: "error",
            title: "אופססס....",
            text: `המשתמש ${name} כבר קיים במערכת`,
            showDenyButton: true,
            confirmButtonText: "לדף הבית",
            denyButtonText: `כניסת משתמש`
          }).then((result) => {
            if (result.isConfirmed) 
              // Navigate to the desired route in your Angular application
              this.route.navigate(['/home']);
              else if(result.isDenied)
              this.route.navigate(['/register/login']);
          });
        } else if (res === true) {
          Swal.fire({
            title: "יש! תודה שהצטרפת אלינו!!",
            text: "נוספת בהצלחה לרשימת המשתמשים",
            icon: "success"
          });
          this._register_service.saveCurrentUser(name,password);
          this.route.navigate(['/recipe/all-recipes']);
        }
      }
    });
  }
 
}