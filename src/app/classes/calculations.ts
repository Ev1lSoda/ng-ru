export class Calculations {


  static getSeamWidthDimensions(camera: number): number {
      if ( camera >= 5 && camera <= 8 ) {
        return 10;
      } else if( camera >= 9 && camera <= 10 ) {
        return 13;
      } else if( camera >= 11 && camera <= 12 ) {
        return 15;
      } else if( camera >= 13 && camera <= 15 ) {
        return 20;
      } else if( camera >= 16 && camera <= 18 ) {
        return 22;
      } else if( camera >= 19 && camera <= 20 ) {
        return 25;
      } else if( camera >= 21 && camera <= 28 ) {
        return 30;
      } else if( camera >= 29 && camera <= 38 ) {
        return 38;
      } else {
        return 0;
      }
  }
}
