import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'canteenFoodLabel',
    standalone: false
})
export class CanteenFoodLabelPipe implements PipeTransform {
  public transform(value: string): string {
    return value.replaceAll(/,/gi, '<br>');
  }
}
