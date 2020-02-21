import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CervezadbService } from '../core/cervezadb.service';
import { ICerveza } from '../share/interfaces';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id: string;
  public cerveza: ICerveza;
  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private cervezadbService: CervezadbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    /*
    this.cervezadbService.read_CervezaById(this.id).subscribe(
      (data: ICerveza) => this.cerveza = data
    );*/
    this.cervezadbService.read_Cervezas().subscribe(data => {
      data.map(e => {
        if (e.payload.doc.id == this.id) {
          this.cerveza = {
            id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            image: e.payload.doc.data()['image'],
            description: e.payload.doc.data()['description']
          };
        }
      })
    })
  }

  editRecord(cerveza) {
    this.router.navigate(['edit', cerveza.id])
  }
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Elimiar cerveza',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.cervezadbService.delete_Cerveza(id);
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}