import { Component, OnInit } from '@angular/core';
import { CalcStateService } from '../service/calc-state.service';

@Component({
  selector: 'NgRu-r-stone',
  templateUrl: './r-stone.component.html',
  styleUrls: ['./r-stone.component.css'],
})
export class RStoneComponent implements OnInit {
  public seamResults = [];
  public results = { Msh1020: 0, Msh510: 0, Msh35: 0, Mgr: 0, MmCP: 0 };

  constructor(private calcService: CalcStateService) {}

  ngOnInit(): void {
    // { "Msh1020": 29.807999999999996, "Msh510": 108, "Msh35": 900, "Mgr": 0.27, "MmCP": 11.3792112 }
    this.seamResults = this.calcService.getStones().results;
    let Msh1020 = 0,
      Msh510 = 0,
      Msh35 = 0,
      Mgr = 0,
      MmCP = 0;
    for (let sr of this.seamResults) {
      Msh1020 += sr['Msh1020'];
      Msh510 += sr['Msh510'];
      Msh35 += sr['Msh35'];
      Mgr += sr['Mgr'];
      MmCP += sr['MmCP'];
    }
    this.results = { Msh1020, Msh510, Msh35, Mgr, MmCP };
  }
}
