import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./tabs/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./tabs/userprofile/userprofile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'wash',
    loadChildren: () => import('./tabs/wash/wash.module').then(m => m.WashPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./tabs/registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
