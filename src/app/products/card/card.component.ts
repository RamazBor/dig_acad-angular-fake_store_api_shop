import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/core/intrefaces/product.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() product!: Product;
  @Output() clicked: EventEmitter<'View' | 'Delete'> = new EventEmitter();

}
