import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from '../components/register-service.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [RouterModule,MatIconModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent implements OnInit{
  public register="לא מחובר";
  public username: string | null = "לא מחובר";
  constructor(private _service: RegisterService, private router: Router) {}
  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      this.username = sessionStorage.getItem("username");
    }
    
  }

}
