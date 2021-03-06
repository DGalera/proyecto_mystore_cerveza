import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CervezadbService } from '../core/cervezadb.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ICerveza } from '../share/interfaces';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  cerveza: ICerveza;
  cervezaForm: FormGroup;
  constructor(
    private router: Router,
    private cervezadbService: CervezadbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.cervezaForm = new FormGroup({
      name: new FormControl(''),
      image: new FormControl(''),
      description: new FormControl(''),
    });
  }
  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar Cerveza',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.saveMovie();
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
  saveMovie() {
    this.cerveza = this.cervezaForm.value;
    let nextKey = this.cerveza.name.trim();
    this.cerveza.id = nextKey;
    this.cervezadbService.setItem(nextKey, this.cerveza);
    console.warn(this.cervezaForm.value);
  }
}

