import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/intrefaces/product.interface';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductsService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  product!: Product;
  routeId!: number;
  cart: FormGroup;

  constructor(private productService: ProductsService, private cartService: CartService,
    private activatedRoute: ActivatedRoute) {
    this.cart = new FormGroup({
      amount: new FormControl(1, [Validators.required, Validators.max(6), Validators.min(1)]),
      productId: new FormControl(this.routeId),
      category: new FormControl('')
    })
    this.resolveData(this.activatedRoute.snapshot.data['productDetails'])
  }

  resolveData(data: Product) {
    this.product = data;
    this.cart.get('productId')?.setValue(data.id);
    this.cart.get('category')?.setValue(data.category)
  }

  getSingleProduct(id: number) {
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
    })
  }

  changeQuantity(status: '-' | '+') {
    const amount = this.cart.get('amount') as FormControl;
    if (status === '-' && amount.value > 1) {
      amount.patchValue(amount.value - 1)
    }
    if (status === '+' && amount.value < 6) {
      amount.patchValue(amount.value + 1)
    }


  }

  addToCart() {
    console.log(this.cart, 'Sending Incremental value to Cart');
    const { productId, amount } = this.cart.value
    const cartItems = this.cartService.cartProducts$.getValue();
    cartItems.push({ id: productId, amount })
    this.cartService.cartProducts$.next(cartItems)
  }
}
