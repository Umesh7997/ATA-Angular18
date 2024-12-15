import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateValidator',
  standalone: true
})
export class DateValidatorPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): boolean {
    const currentDate = new Date();
    const selectedDate = new Date(value);
    const minDate = new Date(currentDate.getFullYear()-18,currentDate.getMonth(),currentDate.getDate());
    return selectedDate < minDate && selectedDate.getFullYear()< currentDate.getFullYear();;
  }

}
