import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../intrefaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cartProducts$: BehaviorSubject<{ id: number, amount: number }[]> =
    new BehaviorSubject<{ id: number, amount: number }[]>([]);

  removeProduct(id: number) {
    const currentCart = this.cartProducts$.value;

    if (currentCart.length === 1 && currentCart[0].id === id) {
      this.cartProducts$.next([]);
    } else {
      const updatedCart = currentCart.filter((item) => item.id !== id);
      this.cartProducts$.next(updatedCart);
    }
  }
}
