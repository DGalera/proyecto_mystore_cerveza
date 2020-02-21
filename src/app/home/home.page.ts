import { Component, OnInit } from '@angular/core';
import { ICerveza } from '../share/interfaces';
import { CervezadbService } from '../core/cervezadb.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {
  public cervezas: ICerveza[];

  constructor(private cervezadbService: CervezadbService, private route:
    Router) { }
  ngOnInit(): void {
    this.cervezadbService.read_Cervezas().subscribe(data => {
      this.cervezas = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          image: e.payload.doc.data()['image'],
          description: e.payload.doc.data()['description']
        };
      })
      console.log(this.cervezas);
    });
  }
  cervezaTapped(cerveza) {
    this.route.navigate(['details', cerveza.id]);
  }
}