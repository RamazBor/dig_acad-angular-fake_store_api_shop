import { Component } from '@angular/core';
import { SocialIcons } from '../core/intrefaces/social_icons.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  socialIcons: SocialIcons[] = [
    { address: 'https://www.facebook.com/ramaz.borchashvili', class: 'fa-brands fa-facebook-f' },
    { address: 'https://twitter.com/', class: 'fa-brands fa-twitter' },
    { address: 'https://www.linkedin.com/in/ramaz-borchashvili/', class: 'fa-brands fa-linkedin-in' },
    { address: 'https://www.instagram.com/', class: 'fa-brands fa-instagram' }
  ]
}
