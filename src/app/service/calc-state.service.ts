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

  getSeams(): AllSeamInput {
    return this.seamContainer;
  }

  setSeams(seams: SeamInput[]): void {
    this.seamContainer.inputs = [...seams];
  }

  // getStones(): AllSeamInput {
  //   return this.stoneContainer;
  // }

}
