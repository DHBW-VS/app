import { Pipe, PipeTransform } from '@angular/core';
import { format, parse } from 'date-fns';

@Pipe({
  name: 'apartmentDate',
})
export class ApartmentDatePipe implements PipeTransform {
  public transform(value: string): string {
    const date = parse(value, 'yyyy-MM-dd HH:mm:ss', new Date());
    const formattedDate = format(date, 'dd.MM.yyyy');
    return formattedDate;
  }
}
