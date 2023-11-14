import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SignInComponent } from 'src/app/auth/sign-in/sign-in.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { TruncatePipe } from 'src/app/core/pipes/truncate.pipe';
import { DetailsComponent } from 'src/app/products/details/details.component';
import { DashboardComponent } from 'src/app/products/dashboard/dashboard.component';
import { CardComponent } from 'src/app/products/card/card.component';
import { FooterComponent } from 'src/app/footer/footer.component';
import { MainComponent } from '../main.component';
import { FiguresComponent } from 'src/app/figures/figures.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeComponent } from '../../products/badge/badge.component';
import { CartComponent } from '../../products/cart/cart.component';


@NgModule({
  declarations: [
    SignInComponent,
    FiguresComponent,
    MainComponent,
    FooterComponent,
    CardComponent,
    DashboardComponent,
    DetailsComponent,
    TruncatePipe,
    HeaderComponent,
    HeaderComponent,
    BadgeComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MainModule { }
