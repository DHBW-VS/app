import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DualisUnit } from '../../interfaces';

@Component({
  selector: 'app-dualis-unit-card',
  templateUrl: './dualis-unit-card.component.html',
  styleUrls: ['./dualis-unit-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DualisUnitCardComponent {
  @Input()
  public unit: DualisUnit | undefined;

  constructor() {}
}
