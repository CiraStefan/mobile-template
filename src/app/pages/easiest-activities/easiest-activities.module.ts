import { ActivityItemEasyComponent } from './components/activity-item-easy/activity-item-easy.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EasiestActivitiesPageRoutingModule } from './easiest-activities-routing.module';

import { EasiestActivitiesPage } from './easiest-activities.page';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EasiestActivitiesPageRoutingModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  declarations: [EasiestActivitiesPage, ActivityItemEasyComponent]
})
export class EasiestActivitiesPageModule {}
