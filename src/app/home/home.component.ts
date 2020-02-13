import {Component, OnInit} from '@angular/core';
import {Cerveza} from '../shared/cerveza';
import {CervezaService} from '../shared/cerveza.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cervezas: Cerveza[]=[];
  constructor(private productService: CervezaService) { }

  ngOnInit() {
   this.productService.getCervezas().subscribe(
    (data: Cerveza[]) => this.cervezas = data
   );
  }
}
