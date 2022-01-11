import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./components/welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./components/registration/registration.module').then(m => m.RegistrationModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
