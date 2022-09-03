import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IParking } from '@app/core';

@Component({
  selector: 'app-parking-card',
  templateUrl: './parking-card.component.html',
  styleUrls: ['./parking-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParkingCardComponent {
  @Input()
  public parking: IParking | undefined;

  constructor() {}
}
