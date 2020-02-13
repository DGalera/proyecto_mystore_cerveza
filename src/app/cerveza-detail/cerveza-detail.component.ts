import {Component, OnInit} from '@angular/core';
import {CervezaService} from '../shared/cerveza.service';
import {Cerveza} from '../shared/cerveza';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cerveza-detail',
  templateUrl: './cerveza-detail.component.html',
  styleUrls: ['./cerveza-detail.component.css']
})
export class CervezaDetailComponent implements OnInit {

  cerveza: Cerveza;
  cerveId: number;

  constructor(private activatedroute: ActivatedRoute, private router: Router, private cervezaService: CervezaService) {}

  ngOnInit() {
    this.cerveId = parseInt(this.activatedroute.snapshot.params['cervezaId']);
    this.cervezaService.getCervezaById(this.cerveId).subscribe(
      (data: Cerveza) => this.cerveza = data
    );
  }
  goEdit():void{
    this.router.navigate(['/cervezas', this.cerveId, 'edit']);
  }
  onBack(): void {
    this.router.navigate(['']);
  }

}
