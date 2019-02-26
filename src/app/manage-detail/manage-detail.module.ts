import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManageDetailPage } from './manage-detail.page';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: ManageDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManageDetailPage]
})
export class ManageDetailPageModule {}
