import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CalcStateService} from "./service/calc-state.service";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './views/start.component';
import { SeamComponent } from './views/seam.component';
import { StoneComponent } from './views/stone.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    SeamComponent,
    StoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CalcStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
