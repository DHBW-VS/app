import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogService } from '@app/core';
import { CanteenCardBalanceModalComponent } from '../canteen-card-balance-modal/canteen-card-balance-modal.component';

@Component({
  selector: 'app-canteen-menu-popover',
  templateUrl: './canteen-menu-popover.component.html',
  styleUrls: ['./canteen-menu-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanteenMenuPopoverComponent {
  constructor(private readonly dialogService: DialogService) {}

  public async showCanteenCardBalanceModal(): Promise<void> {
    await this.dialogService.showModal({
      component: CanteenCardBalanceModalComponent,
    });
    await this.dialogService.dismissPopover();
  }
}
