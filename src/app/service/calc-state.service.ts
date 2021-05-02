import {Injectable} from '@angular/core';
import {AllSeamInput} from "../interfaces/all-seam-input";
import {SeamInput} from "../interfaces/seam-input";

@Injectable({
  providedIn: 'root'
})
export class CalcStateService {

  private seamContainer: AllSeamInput = {
    inputs: [],
    results: []
  };

  private stoneContainer: AllSeamInput = {
    inputs: [],
    results: []
  };

  constructor() {
  }

  getSeams(): any {
    return this.seamContainer;
  }

  saveSeams(seamData: SeamInput, seamResults: any): void {
    this.seamContainer.inputs.push(seamData);
    this.seamContainer.results.push(seamResults);
  }
  updSeams(updSeamIndex: number, seamData: SeamInput, seamResults: any): void {
    this.seamContainer.inputs[updSeamIndex] = seamData;
    this.seamContainer.results[updSeamIndex] = seamResults;
  }
  delSeams(delSeamIndex: number): void {
    this.seamContainer.inputs.splice(delSeamIndex, 1);
    this.seamContainer.results.splice(delSeamIndex, 1);
  }

  // getStones(): AllSeamInput {
  //   return this.stoneContainer;
  // }

}
