import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DialogService, IApartment } from '@app/core';
import { ApartmentModalComponent } from '../apartment-modal/apartment-modal.component';

@Component({
  selector: 'app-apartment-card',
  templateUrl: './apartment-card.component.html',
  styleUrls: ['./apartment-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentCardComponent {
  @Input()
  public apartment: IApartment | undefined;

  constructor(private readonly dialogService: DialogService) {}

  public async presentApartmentModal(apartment: IApartment): Promise<void> {
    await this.dialogService.showModal({
      component: ApartmentModalComponent,
      componentProps: { apartment: apartment },
    });
  }
}
