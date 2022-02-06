import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elapsedTime'
})
export class ElapsedTimePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const secondsInADay = 86400;
    let convertedDate:any = new Date(value)
    let today = new Date();
    let todayWithoutTime:any = new Date(today.getMonth(), today.getDate(), today.getFullYear());
    var dateDiff = Math.abs(convertedDate - todayWithoutTime)

    var dateDiffSecs = dateDiff/1000;
    var dateCounter = dateDiffSecs/secondsInADay

    if(dateCounter >= 1 && convertedDate > todayWithoutTime){
      return dateCounter;
    }else{
      return 0;
    }
  }

}
