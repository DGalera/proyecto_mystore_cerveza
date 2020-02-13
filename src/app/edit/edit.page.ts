import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CervezadbService } from '../core/cervezadb.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ICerveza } from '../share/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id: string;
  cerveza: ICerveza;
  cervezaForm: FormGroup;
  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private cervezadbService: CervezadbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.cervezadbService.getItem(this.id).then(
      (data: ICerveza) => {
        this.cerveza = data
        this.cervezaForm.get('name').setValue(this.cerveza.name);
        this.cervezaForm.get('image').setValue(this.cerveza.image);
        this.cervezaForm.get('description').setValue(this.cerveza.description);
      }
    );
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
    this.cervezadbService.remove(this.id);
    this.cerveza = this.cervezaForm.value;
    this.cerveza.id = this.id;
    this.cervezadbService.setItem(this.id, this.cerveza);
    console.warn(this.cervezaForm.value);
  }
}
