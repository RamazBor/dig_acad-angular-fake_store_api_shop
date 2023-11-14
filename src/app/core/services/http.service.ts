import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { Product } from "../intrefaces/product.interface";
import { baseUrl } from "../constants/constants";

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}/products`).pipe(
      map(data => data),
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(() => new Error());
      }),
    )
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}/products/${id}`).pipe(
      map(data => {
        return data;
      })
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/products/${id}`);
  }

  getAllProductsAndSort(
    sortField: string,
    sortOrder: string
  ): Observable<Product[]> {
    const apiUrl = `${baseUrl}/products?_sort=${sortField}&_order=${sortOrder}`;
    return this.http.get<any[]>(apiUrl);
  }

  GetCategory(category: string): Observable<Product[]> {
    return this.http.get<any>(`${baseUrl}/products/category/${category}`);
  }

  sortProductsByPrice(products: Product[], sortOrder: string): Product[] {
    return products.sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;
      if (sortOrder === 'asc') {
        return priceA - priceB;
      } else if (sortOrder === 'desc') {
        return priceB - priceA;
      }
      return 0;
    });
  }

}
