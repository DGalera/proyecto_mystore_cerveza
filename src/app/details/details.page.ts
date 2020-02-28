import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CervezadbService } from '../core/cervezadb.service';
import { ICerveza } from '../share/interfaces';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public id: string;
  public cerveza: ICerveza;
  hasCerveza=false;
  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private cervezadbService: CervezadbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params._id;

    this.cervezadbService.read_CervezaById(this.id).subscribe(
      (data: any) =>{ 
        this.cerveza = data.result
      this.hasCerveza=true
      }
    );



  }

  editRecord(cerveza) {
    this.router.navigate(['edit', cerveza._id])
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
            this.cervezadbService.delete_Cerveza(this.id).subscribe();
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