import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageDrawingModule } from 'ngx-image-drawing';

import { DrawComponent } from '../features/draw/draw.component';
import { HeaderComponent } from './components/header/header.component';

const COMPONENTS = [
    HeaderComponent,
    DrawComponent
];



@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    BrowserModule,
    ImageDrawingModule,
    FontAwesomeModule,
    RouterModule
  ],
  providers: [],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedModule { }
