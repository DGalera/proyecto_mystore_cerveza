import { Component, OnInit } from '@angular/core';
import { ICerveza } from '../share/interfaces';
import { CervezadbService } from '../core/cervezadb.service';
import { Router } from '@angular/router';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
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
    this.retrieveValues();
    
  }

  ionViewDidEnter() {
    // Remove elements if it already has values
    if (this.cervezas !== undefined) {
      this.cervezas.splice(0);
    }
    this.retrieveValues();
  }

  retrieveValues(){
    this.cervezadbService.read_Cervezas().subscribe(
      (data: ICerveza[]) => this.cervezas = data
    );
  }

  cervezaTapped(cerveza) {
    this.route.navigate(['details', cerveza._id]);
  }
}