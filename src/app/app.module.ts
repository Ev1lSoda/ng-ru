import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './views/start.component';
import { SeamComponent } from './views/seam.component';
import { StoneComponent } from './views/stone.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    SeamComponent,
    StoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
