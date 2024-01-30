import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canteenFoodLabel',
})
export class CanteenFoodLabelPipe implements PipeTransform {
  public transform(value: string): string {
    return value.replaceAll(/,/gi, '<br>');
  }
}
