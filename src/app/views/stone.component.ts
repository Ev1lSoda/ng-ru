import { Component, OnInit } from '@angular/core';
import {Calculations} from "../classes/calculations";

@Component({
  selector: 'NgRu-stone',
  templateUrl: './stone.component.html',
  styleUrls: ['./stone.component.css']
})
export class StoneComponent implements OnInit {
  private dkzList = [
    {
      dkz: 2,
      mast: 'ДШ-85',
      dnst: 1.2
    },
    {
      dkz: 3,
      mast: 'ДШ-85',
      dnst: 1.2
    },
    {
      dkz: 4,
      mast: 'ДШ-90',
      dnst: 1.2
    },
    {
      dkz: 5,
      mast: 'ДШ-90',
      dnst: 1.2
    },
  ];

  public calcInfo = {
    dnst: -1,
    seamLength: -1,
    seamWidth: -1,
    seamDepth: -1,
    seamCastDepth: -1
  };

  public wrongLength = false;
  public wrongWidth = false;
  public wrongDepth = false;

  public curDkz: any;
  public curDnst: any;
  public seamLength: any;
  public seamWidth: any;
  public seamDepth: any;

  constructor() { }

  ngOnInit(): void {
  }

  pickMast(selMastId: number): void {
    this.curDkz = selMastId;
    this.curDnst = this.dkzList[selMastId-2]['dnst'];
    console.log('curDnst: ', this.curDnst)
  }

  onSaveStoneSeam(): void {}

  getInputLength(): void {
    this.calcInfo.seamLength = this.seamLength;
    if(this.seamLength < 1 || this.seamLength > 50000) {
      this.wrongLength = true;
    } else {
      this.wrongLength = false;
    }
    console.log('seamLength: ', this.calcInfo.seamLength)
  }

  getInputWidth(): void {
    this.calcInfo.seamCastDepth = -1;
    // this.seamCastDepth = null;
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
  //
  getInputDepth(): void {
    const seamWidthDemension = Calculations.getSeamWidthDimensions(this.calcInfo.seamWidth);
    if(this.seamDepth <= seamWidthDemension) {
      this.wrongDepth = true;
    } else {
      this.wrongDepth = false;
    }
    this.calcInfo.seamCastDepth = this.seamDepth - seamWidthDemension;
    console.log('this.calcInfo.seamCastDepth: ', this.calcInfo.seamCastDepth);
    // this.seamCastDepth = this.calcInfo.seamCastDepth;
    // if(this.seamCastDepth < 1 || this.seamCastDepth > 1000) {
    //   this.wrongCastDepth = true;
    // } else {
    //   this.wrongCastDepth = false;
    // }
  }

}
