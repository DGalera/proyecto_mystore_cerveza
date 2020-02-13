import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Cerveza } from '../shared/cerveza';
import { CervezaService } from '../shared/cerveza.service';

@Component({
  templateUrl: './cerveza-edit.component.html'
})
export class CervezaEditComponent implements OnInit{

  pageTitle = 'Cerveza Edit';
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
    this.cerveId = parseInt(this.activatedroute.snapshot.params['id']);
    this.getCerveza(this.cerveId);
  }

  getCerveza(id: number): void {
    this.cervezaService.getCervezaById(id)
      .subscribe(
        (cerveza: Cerveza) => this.displayCerveza(cerveza),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayCerveza(cerveza: Cerveza): void {
    if (this.cervezaForm) {
      this.cervezaForm.reset();
    }
    this.cerveza = cerveza;
    this.pageTitle = `Edit Cerveza: ${this.cerveza.name}`;

    // Update the data on the form
    this.cervezaForm.patchValue({
      name: this.cerveza.name,
      price: this.cerveza.price,
      description: this.cerveza.description,
      image: this.cerveza.image
    });
  }

  deleteCerveza(): void {
    if (this.cerveza.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the cerveza: ${this.cerveza.name}?`)) {
        this.cervezaService.deleteCerveza(this.cerveza.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }


  saveCerveza(): void {
    if (this.cervezaForm.valid) {
      if (this.cervezaForm.dirty) {
        this.cerveza = this.cervezaForm.value;
        this.cerveza.id = this.cerveId;
        
        this.cervezaService.updateCerveza(this.cerveza)
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
