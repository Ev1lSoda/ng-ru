import { Component, OnInit } from '@angular/core';
import { Calculations } from '../classes/calculations';
import { CalcStateService } from '../service/calc-state.service';

@Component({
  selector: 'NgRu-stone',
  templateUrl: './stone.component.html',
  styleUrls: ['./stone.component.css'],
})
export class StoneComponent implements OnInit {
  private stonResults = {
    Msh1020: -1,
    Msh510: -1,
    Msh35: -1,
    Mgr: -1,
    MmCP: -1,
  };
  private dkzList = [
    {
      dkz: 2,
      mast: 'ДШ-85',
      dnst: 1.2,
    },
    {
      dkz: 3,
      mast: 'ДШ-85',
      dnst: 1.2,
    },
    {
      dkz: 4,
      mast: 'ДШ-90',
      dnst: 1.2,
    },
    {
      dkz: 5,
      mast: 'ДШ-90',
      dnst: 1.2,
    },
  ];
  public seamList = []; // list of seams defined: button list
  public showEditButton = false;

  public calcInfo = {
    dnst: -1,
    seamLength: -1,
    seamWidth: -1,
    seamDepth: -1,
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

  constructor(private calcService: CalcStateService) {}

  ngOnInit(): void {
    console.log('curCONTlen: ', this.calcService.getStones().inputs.length);
    this.curSeamID = this.calcService.getStones().inputs.length + 1;
    this.seamList = this.calcService.getStones().inputs;
    this.showEditButton = false;
  }

  pickMast(selMastId: number): void {
    this.curDkz = selMastId;
    this.curDnst = this.dkzList[selMastId - 2]['dnst'];
    this.calcInfo.dnst = this.curDnst;
    console.log('curDnst: ', this.curDnst);
  }

  onSaveStoneSeam(): void {
    this.showEditButton = false;
    const newStone = {
      dkz: this.curDkz,
      dnst: this.calcInfo.dnst,
      seamLength: this.calcInfo.seamLength,
      seamWidth: this.calcInfo.seamWidth,
      seamDepth: this.calcInfo.seamDepth,
    };
    this.calcResultsForStone();
    const newSResults = this.stonResults;

    this.calcService.saveStones(newStone, newSResults);
    this.seamList = this.calcService.getStones().inputs;
    console.log('seamList: ', this.seamList);
  }

  getInputLength(): void {
    this.calcInfo.seamLength = this.seamLength;
    if (this.seamLength < 1 || this.seamLength > 50000) {
      this.wrongLength = true;
    } else {
      this.wrongLength = false;
    }
    console.log('seamLength: ', this.calcInfo.seamLength);
  }

  getInputWidth(): void {
    this.seamDepth = null;
    this.calcInfo.seamWidth = this.seamWidth;
    if (this.seamWidth < 5 || this.seamWidth > 38) {
      this.wrongWidth = true;
    } else {
      this.wrongWidth = false;
    }
  }
  //
  getInputDepth(): void {
    this.calcInfo.seamDepth = this.seamDepth;
    if (this.seamDepth <= 0 || this.seamDepth > 1000) {
      this.wrongDepth = true;
    } else {
      this.wrongDepth = false;
    }
  }

  chkBtnDisabled(): boolean {
    return this.wrongWidth || this.wrongLength || this.calcInfo.dnst < 0 || this.calcInfo.seamLength < 0 || this.calcInfo.seamWidth < 0 || this.calcInfo.seamDepth < 0 ? true : false;
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
    };
  }
  onUpdate(): void {
    this.showEditButton = false;
    const newStone = {
      dkz: this.curDkz,
      dnst: this.calcInfo.dnst,
      seamLength: this.calcInfo.seamLength,
      seamWidth: this.calcInfo.seamWidth,
      seamDepth: this.calcInfo.seamDepth,
    };
    this.calcResultsForStone();
    const newSResults = this.stonResults;
    this.calcService.updStones(this.curSeamID, newStone, newSResults);
    this.seamList = this.calcService.getStones().inputs;
    console.log('seamList: ', this.seamList);
    this.onClear();
    this.showEditButton = false;
  }
  onDelete(): void {
    this.calcService.delStones(this.curSeamID);
    this.seamList = this.calcService.getStones().inputs;
    this.onClear();
    this.showEditButton = false;
  }
  onClear(): void {
    this.wrongLength = false;
    this.wrongWidth = false;
    this.wrongDepth = false;

    this.curDkz = null;
    this.curDnst = -1;
    this.curSeamID = -1;
    this.seamLength = null;
    this.seamWidth = null;
    this.seamDepth = null;
    this.calcInfo = {
      dnst: -1,
      seamLength: -1,
      seamWidth: -1,
      seamDepth: -1,
    };
    this.stonResults = {
      Msh1020: -1,
      Msh510: -1,
      Msh35: -1,
      Mgr: -1,
      MmCP: -1,
    };
  }
  calcResultsForStone(): void {
    const LBH = { L: this.calcInfo.seamLength, B: this.calcInfo.seamWidth, H: this.calcInfo.seamDepth };
    const Vsh = Calculations.getVolumeForStone(LBH);
    const Msh1020 = Calculations.calcGravelMass(Vsh);
    const Vm = Calculations.calcSpaceMast(Vsh);
    const Mm1 = Calculations.calcVacMassMast({ V: Vm, p: this.calcInfo.dnst });
    const Sobsh = Calculations.calcSeamTotalArea(LBH);
    const Mgr = Calculations.calcGruntMass(Sobsh);
    const Msh510 = Calculations.calcMSh510(this.calcInfo.seamLength);
    const Msh35 = Calculations.calcMSh35({ L: this.calcInfo.seamLength, B: this.calcInfo.seamWidth });
    const MSMTotal = Calculations.calcMSMTotal(Sobsh);
    const MmSha1020 = Calculations.calcMmSha1020(Msh1020);
    const MmPropSha1020 = Calculations.calcMmPropSha1020(Msh1020);
    const MmSha510 = Calculations.calcMmSha510(Msh510);
    const MmSha35 = Calculations.calcMmSha35(Msh35);
    const Mm2 = Calculations.calcMm2([MSMTotal, MmSha1020, MmPropSha1020, MmSha510, MmSha35]);
    const MmCp = Calculations.calcMmCp([Mm1, Mm2]);
    this.stonResults = {
      Msh1020: Msh1020,
      Msh510: Msh510,
      Msh35: Msh35,
      Mgr: Mgr,
      MmCP: MmCp,
    };
  }
}
