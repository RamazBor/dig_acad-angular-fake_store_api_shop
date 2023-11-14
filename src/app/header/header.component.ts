import { Component } from '@angular/core';
import { authToken } from '../core/constants/constants';
import { Router } from '@angular/router';
import { LocalStorageSevice } from '../core/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends LocalStorageSevice {

  showNav: boolean = false;

  constructor(private router: Router) { super(); }

  navigationData: { title: string, path: string }[] = [
    {
      title: 'Home',
      path: '/main/home'
    },
    {
      title: 'Products',
      path: '/main/products'
    },
    {
      title: 'About',
      path: '/main/about'
    }
  ]

  signOut() {
    this.removeItem(authToken);
    this.router.navigate([''])
  }

  openNavbar() {
    this.showNav = true;
  }

  closeNavbar() {
    this.showNav = false;
  }
}
