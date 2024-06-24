import { Component } from '@angular/core';
import { RegisterService } from '../register-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private _service: RegisterService, private router: Router) {}

  onLogout() {
    this._service.clearCurrentUser();
    this._service.usernameSource.next("לא מחובר");
    // this._service.changeName();
    this.router.navigate(['/home']);
  }
}
