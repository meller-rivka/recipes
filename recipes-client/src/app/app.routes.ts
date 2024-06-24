import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent) },
    { path: 'logout', loadComponent: () => import('./components/logout/logout.component').then(c => c.LogoutComponent) },
    { path: 'register', loadChildren: () => import('./components/register.routes.module').then(c => c.RegisterRoutesModule) },
    { path: 'recipe', loadChildren: () => import('./recipe-components/recipe-routes.module').then(c => c.RecipeRoutesModule) },

];
