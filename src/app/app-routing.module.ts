import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartComponent} from "./views/start.component";
import {SeamComponent} from "./views/seam.component";
import {StoneComponent} from "./views/stone.component";

const routes: Routes = [
  {
    path: '', component: StartComponent
  },
  {
    path: 'seam', component:SeamComponent
  },
  {
    path: 'stone', component:StoneComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
