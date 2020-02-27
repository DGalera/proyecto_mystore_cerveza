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

    this.cervezaForm = new FormGroup({
      name: new FormControl(''),
      image: new FormControl(''),
      description: new FormControl(''),
    });

    this.cervezadbService.read_CervezaById(this.id)
      .subscribe(
        (cerveza: ICerveza) => this.displayCerveza(cerveza),
      );
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
            this.UpdateRecord();
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

  UpdateRecord() {
    let record = this.cervezaForm.value;
    this.cervezadbService.update_Cerveza(record, this.id);
  }

  displayCerveza(cerveza: ICerveza){
    this.cerveza = cerveza;
    this.cervezaForm.get('name').setValue(cerveza.name);
    this.cervezaForm.get('image').setValue(cerveza.image);
    this.cervezaForm.get('description').setValue(cerveza.description);
  }



}
