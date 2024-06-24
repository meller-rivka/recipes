import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const productRoutes: Routes = [
  { path: '', redirectTo: 'toRegister', pathMatch: 'full' },
  { path: 'toRegister', component : RegisterComponent },
  { path: 'login', component: LoginComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(productRoutes)
  ],
  exports: [RouterModule]
})
export class RegisterRoutesModule { }
