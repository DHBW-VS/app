import { Pipe, PipeTransform } from '@angular/core';
import { SearchHelper } from '@app/core';
import { DualisUnit } from '../../interfaces';

@Pipe({
  name: 'dualisUnitFilter',
})
export class DualisUnitFilterPipe implements PipeTransform {
  public transform(units: DualisUnit[], searchValue: string): DualisUnit[] {
    if (!searchValue) {
      return units;
    }
    return units.filter(unit => SearchHelper.objectContainsString(unit, searchValue));
  }
}
