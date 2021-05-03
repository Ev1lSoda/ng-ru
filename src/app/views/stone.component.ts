import { Component, OnInit } from '@angular/core';
import {Calculations} from "../classes/calculations";
import {CalcStateService} from "../service/calc-state.service";

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
  public seamList = []; // list of seams defined: button list
  public showEditButton = false;

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
  public curSeamID = -1;

  constructor(private calcService: CalcStateService) { }

  ngOnInit(): void {
    console.log('curCONTlen: ', this.calcService.getStones().inputs.length);
    this.curSeamID = (this.calcService.getStones().inputs.length + 1);
    this.seamList = this.calcService.getStones().inputs;
    this.showEditButton = false;
  }

  pickMast(selMastId: number): void {
    this.curDkz = selMastId;
    this.curDnst = this.dkzList[selMastId-2]['dnst'];
    this.calcInfo.dnst = this.curDnst;
    console.log('curDnst: ', this.curDnst)
  }

  onSaveStoneSeam(): void {
    this.showEditButton = false;
    const newStone = {
      dkz: this.curDkz,
      dnst: this.calcInfo.dnst,
      seamLength: this.calcInfo.seamLength,
      seamWidth: this.calcInfo.seamWidth,
      seamDepth: this.calcInfo.seamDepth,
      seamCastDepth: this.calcInfo.seamCastDepth,
    };
    const newSResults = {
      data: 'smt'
    };

    this.calcService.saveStones(newStone, newSResults);
    this.seamList = this.calcService.getStones().inputs;
    console.log('seamList: ', this.seamList);
  }

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
    this.calcInfo.seamDepth = this.seamDepth;
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

  chkBtnDisabled(): boolean {
    return (this.wrongWidth || this.wrongLength  || this.calcInfo.dnst < 0 || this.calcInfo.seamLength < 0 || this.calcInfo.seamWidth < 0 || this.calcInfo.seamCastDepth < 0) ? true : false;
  }
  getSelectedStone(seamID: number): void {
    this.showEditButton = true;
    console.log('seamList[seamID]: ', this.seamList[seamID]);

    this.wrongLength = false;
    this.wrongWidth = false;
    this.wrongDepth = false;


    this.curDkz = this.seamList[seamID]['dkz'];
    this.curSeamID = seamID;
    this.seamLength = this.seamList[seamID]['seamLength'];
    this.seamWidth = this.seamList[seamID]['seamWidth'];
    this.seamDepth = this.seamList[seamID]['seamDepth'];
    this.curDnst = this.seamList[seamID]['curDnst'];

    this.calcInfo = {
      dnst: this.curDnst,
      seamLength: this.seamLength,
      seamWidth: this.seamWidth,
      seamDepth: this.seamDepth,
      seamCastDepth: this.seamList[seamID]['seamCastDepth']
    }
  }
  onUpdate(): void {
    this.showEditButton = false;
    const newStone = {
      dkz: this.curDkz,
      dnst: this.calcInfo.dnst,
      seamLength: this.calcInfo.seamLength,
      seamWidth: this.calcInfo.seamWidth,
      seamDepth: this.calcInfo.seamDepth,
      seamCastDepth: this.calcInfo.seamCastDepth,
    };
    const newSResults = {
      data: 'smt'
    };
    this.calcService.updStones(this.curSeamID, newStone, newSResults);
    this.seamList = this.calcService.getStones().inputs;
    console.log('seamList: ', this.seamList);
    this.onClear();
    this.showEditButton = false;

  }
  onDelete(): void {
    this.calcService.delStones(this.curSeamID)
    this.seamList = this.calcService.getStones().inputs;
    this.onClear();
    this.showEditButton = false;
  }
  onClear(): void {

    this.wrongLength = true;
    this.wrongWidth = true;
    this.wrongDepth = true;

    this.curDkz = null;
    this.curDnst = -1;
    this.curSeamID = -1;
    this.seamLength = null;
    this.seamWidth = null;
    this.seamDepth = null;
  }

}
