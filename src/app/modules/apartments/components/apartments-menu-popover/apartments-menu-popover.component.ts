import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-apartments-menu-popover',
  templateUrl: './apartments-menu-popover.component.html',
  styleUrls: ['./apartments-menu-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentsMenuPopoverComponent {
  constructor() {}
}
