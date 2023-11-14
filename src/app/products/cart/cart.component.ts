import { Component } from '@angular/core';
import { Observable, Subscription, forkJoin, switchMap } from 'rxjs';
import { Product } from 'src/app/core/intrefaces/product.interface';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductsService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cartProducts: Product[] = []
  cartProductsSubs$!: Subscription;
  constructor(private productsService: ProductsService, private cartService: CartService) {
    this.cartService.cartProducts$.pipe(
      switchMap(res => this.getCartProducts(res))
    )
      .subscribe(data => {
        this.cartProducts = data
        console.log(data)
      })
  }

  ngOnInit() { }

  getCartProducts(data: { id: number, amount: number }[]) {
    const observables: Observable<Product>[] = [];
    data.map(i => observables.push(this.productsService.getProductById(i.id)));
    return forkJoin(observables)
  }

  getAmount(productId: number): number {
    const item = this.cartService.cartProducts$.value.find(i => i.id === productId);
    return item ? item.amount : 0;
  }

  getTotalPrice(item: any): number {
    const price = item.price || 0
    const amount = this.getAmount(item.id)

    return price * amount
  }

  removeItem(id: number) {
    if (this.cartProducts.length !== 0) {
      this.cartService.removeProduct(id);
    } else {
      this.cartProducts.length = 0;
    }
  }

  ngOnDestroy() {
    if (this.cartProductsSubs$) {
      this.cartProductsSubs$.unsubscribe();
    }
  }
}
