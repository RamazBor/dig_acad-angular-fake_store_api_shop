import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductsService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {

  amount$: Observable<{ id: number, amount: number }[]>

  constructor(private cartService: CartService) {
    this.amount$ = this.cartService.cartProducts$.asObservable().pipe(
      tap(data => console.log('Data received', data))
    );
  }
}
