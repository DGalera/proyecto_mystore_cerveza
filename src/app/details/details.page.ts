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
    this.cervezadbService.getItem(this.id).then(
      (data: ICerveza) => this.cerveza = data
    );
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
            this.cervezadbService.remove(id);
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