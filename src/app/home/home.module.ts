import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomePageRoutingModule,
    CurrencyPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
