import { Component, OnInit } from '@angular/core';
import {CalcStateService} from "../service/calc-state.service";

@Component({
  selector: 'NgRu-r-stone',
  templateUrl: './r-stone.component.html',
  styleUrls: ['./r-stone.component.css']
})
export class RStoneComponent implements OnInit {

  public seamResults = [];
  public results = {}

  constructor(private calcService: CalcStateService) { }

  ngOnInit(): void {
    this.seamResults = this.calcService.getStones().results;
    // // { "seamWD": 10, "volume": 2015.9999999999998, "mass": 2.60064, "gMass": 0.39 }
    // let gMass = 0, mass = 0;
    // for(let sr of this.seamResults) {
    //   gMass += sr['gMass'];
    //   mass += sr['mass'];
    //   if ( this.results.hasOwnProperty(sr['seamWD']) ) {
    //     // @ts-ignore
    //     this.results[sr['seamWD']] += sr['volume'];
    //   } else { this.results[sr['seamWD']] = sr['volume']}
    // }
    // // @ts-ignore
    // this.results['mass'] = mass;
    // // @ts-ignore
    // this.results['gMass'] = gMass;

  }

}
