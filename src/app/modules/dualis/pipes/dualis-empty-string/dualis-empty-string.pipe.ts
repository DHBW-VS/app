import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dualisEmptyString',
    standalone: false
})
export class DualisEmptyStringPipe implements PipeTransform {
  public transform(value: string, ...arguments_: unknown[]): string {
    if (value.length === 0) {
      value = '-';
    }
    return value;
  }
}
