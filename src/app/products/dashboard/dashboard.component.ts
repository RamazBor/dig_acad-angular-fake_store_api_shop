import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Product } from 'src/app/core/intrefaces/product.interface';
import { ProductsService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  productList: Product[] = [];

  productCategories: string[] = [
    'electronics',
    "women's clothing",
    "men's clothing",
    'jewelery',
  ];

  selectedCategory: string = '';
  sortOrder: string = 'asc';
  sortField: string = 'price';

  constructor(private productService: ProductsService, private router: Router, private el: ElementRef) { }

  getAllProducts() {
    this.productService.getProducts().pipe(
      tap(data => this.productList = data))
      .subscribe(() => {
        console.log('data has arrived');
      })
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.loadAllProductsAndSort();
    this.sortProductList();
  }

  loadAllProductsAndSort() {
    this.productService
      .getAllProductsAndSort(this.sortField, this.sortOrder)
      .subscribe((data) => {
        this.productList = data;
        this.sortProductList();
      });
  }

  loadProductsByCategory(category: string) {
    this.productService.GetCategory(category).subscribe((res) => {
      this.productList = res;
    });
  }

  sortProductList() {
    this.productList = this.productService.sortProductsByPrice(
      [...this.productList],
      this.sortOrder
    );
  }

  onClick(status: 'View' | 'Delete', id: number) {
    status === 'View' ? this.goToDetails(id) : this.deleteProd(id);
  }

  goToDetails(prodId: number) {
    this.router.navigate([`main/details/${prodId}`]);
  }

  deleteProd(id: number) {
    this.productService.deleteProduct(id).subscribe(_ => {
      this.productList = this.productList.filter(p => p.id !== id);
      alert('This product successfully deleted!');
    });
  }
}
