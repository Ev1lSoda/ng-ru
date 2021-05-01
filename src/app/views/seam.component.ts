import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'NgRu-seam',
  templateUrl: './seam.component.html',
  styleUrls: ['./seam.component.css']
})
export class SeamComponent implements OnInit {

  public singleHermeticValue  = null;
  public oneHermeticValue     = null;
  public twoHermeticValue     = null;

  private hermetic = {
    1: {
      her: ['БП-Г50', 'NORD'],
      den: [1.29, 1.12]
    },

    2: {
      her: ['БП-Г50', 'NORD'],
      den: [1.29, 1.12]
    },

    3: {
      her: ['БП-Г35', 'Арктик-3'],
      den: [1.21, 1.09]
    },

    4: {
      her: ['БП-Г35', 'Арктик-3'],
      den: [1.21, 1.09]
    },

    5: {
      her: ['БП-Г25'],
      den: [1.2]
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

  pickHermetic(dkz: any): void {
    // @ts-ignore
    // console.log('DKZ chosen: ', this.hermetic[dkz]);
    // @ts-ignore
    if (this.hermetic[dkz]['her'].length === 2) {
      // @ts-ignore
      this.singleHermeticValue = null;
      // @ts-ignore
      this.oneHermeticValue = this.hermetic[dkz]['her'][0];
      // @ts-ignore
      this.twoHermeticValue = this.hermetic[dkz]['her'][1];
    } else {
      // @ts-ignore
      this.oneHermeticValue = null;
      // @ts-ignore
      this.twoHermeticValue = null;
      // @ts-ignore
      this.singleHermeticValue = this.hermetic[dkz]['her'][0];
    }

  }

}
