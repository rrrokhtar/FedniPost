import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostComponent } from './post.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [PostComponent],
  exports: [PostComponent]
})
export class PostComponentModule {}
