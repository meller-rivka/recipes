import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RegisterModuleModule } from './components/register-module.module';
import { RecipeModule } from './recipe-components/recipe.module';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HourPipe } from './hour.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RegisterModuleModule,RecipeModule,TopBarComponent,HourPipe],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnChanges, AfterViewInit  {
  title = 'Angular-Project';
  // הפוקנציה הראשונה שעולה מיד בהעלת הקומפוננטה לאויר
  ngOnInit(): void {
  }

// אחרי שהשתנה אלמנטים (לךדוגמא ששלחנו אינפוט לקומפוננטת ילד והיא השתנתה שם)
  ngOnChanges(changes: SimpleChanges): void {

  }

  // אחרי שכל הדום עלה כבר
  ngAfterViewInit(): void {
  }
}
