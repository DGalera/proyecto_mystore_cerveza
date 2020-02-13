import { Component, OnInit } from '@angular/core';
import { CervezaService } from '../shared/cerveza.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  id : any;

  constructor(private cervezaService: CervezaService, private router: Router) { }

  ngOnInit() {
  }

  newCerveza(){
      // Get max product Id from the product list
      this.cervezaService.getMaxCervezaId().subscribe(
        data => this.id = data
      );
      this.router.navigate(['/cervezas', this.id, 'new'])

  }

}
