import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FaIconModule } from './components';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, FaIconModule],
  declarations: [],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, FaIconModule],
})
export class SharedModule {}
