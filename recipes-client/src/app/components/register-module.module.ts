import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms'; // Change from FormsModule to ReactiveFormsModule
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,ReactiveFormsModule // Replace FormsModule with ReactiveFormsModule
  ],
})
export class RegisterModuleModule { }