import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main.component';
import { DashboardComponent } from 'src/app/products/dashboard/dashboard.component';
import { DetailsComponent } from 'src/app/products/details/details.component';
import { HomeComponent } from 'src/app/home/home.component';
import { AboutComponent } from 'src/app/about/about.component';
import { authGuard } from 'src/app/core/guards/auth.guard';
import { productResolver } from 'src/app/core/resolvers/product.resolver';
import { CartComponent } from 'src/app/products/cart/cart.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [authGuard],
    children: [
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'products', component: DashboardComponent
      },
      {
        path: 'about', component: AboutComponent
      },
      {
        path: 'details/:id', component: DetailsComponent,
        resolve: { productDetails: productResolver }
      },
      {
        path: 'cart', component: CartComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
