import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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
  clicked: boolean = false;

  constructor(private productService: ProductsService, private router: Router,
    private el: ElementRef, private toast: NgToastService) { }

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

  menuClick() {
    this.clicked = !this.clicked;
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
      this.toast.success({ detail: 'Success Message', summary: 'This product successfully deleted!', duration: 3000 });
    });
  }
}
