import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [

  {
    path: '', component: SignInComponent
  },
  {
    path: 'main', loadChildren: () => import('./main/main/main.module').then(m => m.MainModule)
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
