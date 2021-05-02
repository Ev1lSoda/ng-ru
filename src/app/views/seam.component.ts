import { Component, OnInit } from '@angular/core';
import {CalcStateService} from "../service/calc-state.service";
import {AllSeamInput} from "../interfaces/all-seam-input";
import {Calculations} from "../classes/calculations";

@Component({
  selector: 'NgRu-seam',
  templateUrl: './seam.component.html',
  styleUrls: ['./seam.component.css']
})
export class SeamComponent implements OnInit {

  public curHermetic = {
    single: '',
    one: '',
    two: ''
  };

  private calcInfo = {
    den: 1,
    seamLength: 1,
    seamWidth: 1,
    seamCastDepth: 1,
  }
  // seamLength?:    number;
  // seamWidth?:     number;
  // seamDepth?:     number;
  // seamCastDepth?: number;

  private hermetic = [
    {
      her: ['БП-Г50', 'NORD'],
      den: [1.29, 1.12]
    },
    {
      her: ['БП-Г50', 'NORD'],
      den: [1.29, 1.12]
    },
    {
      her: ['БП-Г35', 'Арктик-3'],
      den: [1.21, 1.09]
    },
    {
      her: ['БП-Г35', 'Арктик-3'],
      den: [1.21, 1.09]
    },
    {
      her: ['БП-Г25'],
      den: [1.2]
    }
  ];

  public seamTotal = 0; // total number of seams defined
  public seamList = []; // list of seams defined: button list


  public wrongLength = false;
  public wrongWidth = false;
  public wrongDepth = false;
  public wrongCastDepth = false;


  public curDkz: any;
  public seamLength: any;
  public seamWidth: any;
  public seamDepth: any;
  public seamCastDepth: any;
  // seamLength?:    number;
  // seamWidth?:     number;
  // seamDepth?:     number;
  // seamCastDepth?: number;

  constructor(private calcService: CalcStateService) { }

  ngOnInit(): void {}

  pickHermetic(dkz: number): void {

    if(dkz > -1) {
      this.curDkz = dkz;
      // let curContainer = this.calcService.bSubj.getValue();

      if (this.hermetic[dkz]['her'].length === 2) {
        this.curHermetic.single = '';
        this.curHermetic.one = this.hermetic[dkz]['her'][0];
        this.curHermetic.two = this.hermetic[dkz]['her'][1];
        // curContainer.seam.inputs[1]['dkz'] = dkz;

      } else {
        this.curHermetic.one = '';
        this.curHermetic.two = '';
        this.curHermetic.single = this.hermetic[dkz]['her'][0];
      }
    }
  }

  getDen(denIndex: number): void {
    this.calcInfo.den = this.hermetic[this.curDkz].den[denIndex];
    console.log(".calcInfo.den: ", this.calcInfo.den)
  }

  getInputLength(): void {
    this.calcInfo.seamLength = this.seamLength;
    if(this.seamLength < 1 || this.seamLength > 10000) {
      this.wrongLength = true;
    } else {
      this.wrongLength = false;
    }
  }

  getInputWidth(): void {
    this.calcInfo.seamCastDepth = 1;
    this.seamCastDepth = null;
    this.seamDepth = null;
    this.calcInfo.seamWidth = this.seamWidth;
    console.log('seamWidth: ', this.seamWidth);
    console.log('Calculations: ', Calculations.getSeamWidthDimensions(this.seamWidth) );
    if(this.seamWidth < 5 || this.seamWidth > 38) {
      this.wrongWidth = true;
    } else {
      this.wrongWidth = false;
    }
    const seamWidthDemension = Calculations.getSeamWidthDimensions(this.calcInfo.seamWidth);
    if(this.seamDepth <= seamWidthDemension) {
      this.wrongDepth = true;
    } else {
      this.wrongDepth = false;
    }
  }

  getInputDepth(): void {
    const seamWidthDemension = Calculations.getSeamWidthDimensions(this.calcInfo.seamWidth);
    if(this.seamDepth <= seamWidthDemension) {
      this.wrongDepth = true;
    } else {
      this.wrongDepth = false;
    }
    this.calcInfo.seamCastDepth = this.seamDepth - seamWidthDemension;
    this.seamCastDepth = this.calcInfo.seamCastDepth;
    if(this.seamCastDepth < 1 || this.seamCastDepth > 1000) {
      this.wrongCastDepth = true;
    } else {
      this.wrongCastDepth = false;
    }
  }

  getInputCastDepth(): void {
    console.log("seamCastDepth: ", this.seamCastDepth)
    this.calcInfo.seamCastDepth = this.seamCastDepth;
    if(this.seamCastDepth < 1 || this.seamCastDepth > 1000) {
      this.wrongCastDepth = true;
    } else {
      this.wrongCastDepth = false;
    }

    const seamWidthDemension = Calculations.getSeamWidthDimensions(this.calcInfo.seamWidth);
    this.seamDepth = this.seamCastDepth + seamWidthDemension;
    if(this.seamDepth <= seamWidthDemension) {
      this.wrongDepth = true;
    } else {
      this.wrongDepth = false;
    }
  }

}
