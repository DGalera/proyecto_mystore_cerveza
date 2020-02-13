import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cerveza } from '../shared/cerveza';
import { ActivatedRoute, Router } from '@angular/router';
import { CervezaService } from '../shared/cerveza.service';

@Component({
  selector: 'app-cerveza-new',
  templateUrl: './cerveza-new.component.html',
  styleUrls: ['./cerveza-new.component.css']
})
export class CervezaNewComponent implements OnInit {

  pageTitle = 'Cerveza New';
  errorMessage: string;
  cervezaForm: FormGroup;

  cerveId:number;
  cerveza: Cerveza;

  constructor(private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private cervezaService: CervezaService) {  }

  ngOnInit(): void {
    this.cervezaForm = this.fb.group({
      name: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      price: '',
      description: '',
      image: ''
    });

    // Read the product Id from the route parameter
    this.cerveId = parseInt(this.activatedroute.snapshot.params['cervezaId']);
  }

  saveCerveza(): void {
    if (this.cervezaForm.valid) {
      if (this.cervezaForm.dirty) {
        this.cerveza = this.cervezaForm.value;
        this.cerveza.id = this.cerveId;
        
        this.cervezaService.createCerveza(this.cerveza)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
        
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.cervezaForm.reset();
    this.router.navigate(['']);
  }
  
}
