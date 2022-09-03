import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICanteenDish } from '@app/core';

@Component({
  selector: 'app-canteen-dish-card',
  templateUrl: './canteen-dish-card.component.html',
  styleUrls: ['./canteen-dish-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanteenDishCardComponent {
  @Input()
  public dish: ICanteenDish | undefined;

  public showMore: boolean = false;

  constructor() {}

  public toggleShowMore(): void {
    this.showMore = !this.showMore;
  }
}
