import {Component, Input} from '@angular/core';
import {Cerveza} from '../shared/cerveza';

@Component({
  selector: 'app-cerveza-item',
  templateUrl: './cerveza-item.component.html',
  styleUrls: ['./cerveza-item.component.css']
})
export class CervezaItemComponent {

  @Input() cerveza: Cerveza;
}
