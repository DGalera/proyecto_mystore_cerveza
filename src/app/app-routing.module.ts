import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CervezaDetailComponent } from './cerveza-detail/cerveza-detail.component';
import { CervezaEditComponent } from './cerveza-edit/cerveza-edit.component';
import { CervezaNewComponent } from './cerveza-new/cerveza-new.component';

const routes: Routes = [
    {path: '',                    component: HomeComponent},
    {path: 'cervezas/:id/new', component: CervezaNewComponent},
    {path: 'cervezas/:cervezaId', component: CervezaDetailComponent},
    {path: 'cervezas/:id/edit', component: CervezaEditComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ], 
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}
