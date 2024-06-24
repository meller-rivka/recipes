import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hour',
  standalone: true
})
export class HourPipe implements PipeTransform {

  transform(value: number): string {
    if (value < 60) {
      return ` ${value} דקות`;
    }
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    if(hours===1){
      if(minutes===0)
        return `שעה אחת`
      return `שעה ו- ${minutes} דקות`;
    }
    if (minutes < 10) {
      return `${hours} שעות ו-0${minutes} דקות`;
    }

    return `${hours} שעות ו-${minutes} דקות`;
  }
}
