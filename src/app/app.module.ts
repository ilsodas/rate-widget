import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { RatingsAdminComponent } from './admin/admin.component';
import { ModalComponent } from './modal/modal.component';
import { AppComponent } from './app.component';
import { EntryComponent } from './entry.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TopnavComponent } from './topnav/topnav.component';

const RatingAppRoutes: Routes = [

  { path: '',
     redirectTo: '/home',
     pathMatch: 'full'
  },
  { path: 'home',
    component: AppComponent
  },
  {
    path: 'admin-ratings',
    component: RatingsAdminComponent
  },
  { path: '**', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    EntryComponent,
    RatingsAdminComponent,
    TopnavComponent
  ],
  imports: [
    RouterModule.forRoot(RatingAppRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [Title,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [EntryComponent]
})
export class AppModule { }
