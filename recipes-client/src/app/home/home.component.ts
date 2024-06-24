import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit{
  
  ngOnInit(): void {
  }
  images: string[] = ['../../../assets/רקע.jpg', '../../../assets/רקע2.jpg','../../../assets/רקע3.jpg']; 
  currentImageIndex: number = 0;
 
}
