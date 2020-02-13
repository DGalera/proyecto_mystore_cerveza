import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import for loading & configuring in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CervezaItemComponent } from './cerveza-item/cerveza-item.component';
import { CervezaDetailComponent } from './cerveza-detail/cerveza-detail.component';
import { CervezaService } from './shared/cerveza.service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { CervezaEditComponent } from './cerveza-edit/cerveza-edit.component';
import { CervezaData } from './shared/cerveza-data';
import { HttpClientModule } from '@angular/common/http';
import { CervezaNewComponent } from './cerveza-new/cerveza-new.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    CervezaItemComponent,
    CervezaDetailComponent,
    CervezaEditComponent,
    CervezaNewComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(CervezaData)
  ],
  providers: [CervezaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
