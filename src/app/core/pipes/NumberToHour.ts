import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToHourMinute',
})
export class NumberToHourMinutePipe implements PipeTransform {
  transform(value: number): string {
    if (value < 0 || value > 23) {
      return 'Invalid input';
    }

    let hour = value % 12;
    if (hour === 0) {
      hour = 12;
    }

    return `${hour}:00${value < 12 ? 'am' : 'pm'}`;
  }
}
