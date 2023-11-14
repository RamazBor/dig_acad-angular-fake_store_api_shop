import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Product } from '../intrefaces/product.interface';
import { ProductsService } from '../services/http.service';

export const productResolver: ResolveFn<Product> = (route, state) => {
  const id = Number(route.paramMap.get('id'));
  const service = inject(ProductsService)
  return service.getProductById(id);
};
