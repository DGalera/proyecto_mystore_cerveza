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
    this.id = this.activatedrouter.snapshot.params._id;

    this.cervezaForm = new FormGroup({
      name: new FormControl(''),
      image: new FormControl(''),
      description: new FormControl(''),
    });

    this.cervezadbService.read_CervezaById(this.id)
      .subscribe(
        (data: any) => this.displayCerveza(data),
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
    let record = this.cervezaForm.value as (ICerveza);
    this.cervezadbService.update_Cerveza(record, this.id).subscribe();
  }

  displayCerveza(data: any){
    this.cerveza = data.result;
    this.cervezaForm.get('name').setValue(this.cerveza.name);
    this.cervezaForm.get('image').setValue(this.cerveza.image);
    this.cervezaForm.get('description').setValue(this.cerveza.description);
  }



}
