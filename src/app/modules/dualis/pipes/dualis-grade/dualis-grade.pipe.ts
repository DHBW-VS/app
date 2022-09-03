import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dualisGrade',
})
export class DualisGradePipe implements PipeTransform {
  public transform(value: string, ...arguments_: unknown[]): string {
    if (value === 'noch nicht gesetzt') {
      value = '-';
    }
    return value;
  }
}
