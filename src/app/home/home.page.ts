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
  cervezasinit: ICerveza[] = [
    {
      id: '1',
      name: 'Alhambra',
      image:
        'https://www.comprar-bebidas.com/media/catalog/product/cache/5/image/767x1021/9df78eab33525d08d6e5fb8d27136e95/2/3/x2372.jpg.pagespeed.ic.tEcuB-KLRf.jpg',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      id: '2',
      name: 'Estrella Galicia',
      image:
        'https://lh3.googleusercontent.com/proxy/ivYUBAVdtX9V8tg472qMC7xEL7toJ8xJBXXB8WuH2ZAUcF7Oh8uXXF31OJHkOgpyse97HN-8VclH28LDHq5MQJ7ISf17ya6TSlEJIwwPui_11pzpo_4yaM2oqjN0g40ZdA1uYPk5KCLFSSHXdmTb',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      id: '3',
      name: 'Ambar',
      image:
        'https://ambar.com/wp-content/uploads/2018/09/800X8001.jpg',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
  ]
  constructor(private cervezadbService: CervezadbService, private route:
    Router) { }
  ngOnInit(): void {
    // If the database is empty set initial values
    this.inicialization();
  }
  ionViewDidEnter() {
    // Remove elements if it already has values
    if (this.cervezas !== undefined) {
      this.cervezas.splice(0);
    }
    this.retrieveValues();
  }
  inicialization() {
    if (this.cervezadbService.empty()) {
      this.cervezasinit.forEach(cerveza => {
        this.cervezadbService.setItem(cerveza.id, cerveza);
      });
    }
  }
  retrieveValues() {
    // Retrieve values
    this.cervezadbService.getAll().then(
      (data) => this.cervezas = data
    );
  }
  cervezaTapped(cerveza) {
    this.route.navigate(['details', cerveza.id]);
  }
}