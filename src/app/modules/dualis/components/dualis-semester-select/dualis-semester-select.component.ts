import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectChangeEventDetail } from '@ionic/core';
import { DualisSemesterList, DualisSemesterListItem } from '../../interfaces';

@Component({
  selector: 'app-dualis-semester-select',
  templateUrl: './dualis-semester-select.component.html',
  styleUrls: ['./dualis-semester-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DualisSemesterSelectComponent {
  @Input()
  public semesterList: DualisSemesterList | undefined;
  @Output()
  public selectSemester: EventEmitter<DualisSemesterListItem> = new EventEmitter<DualisSemesterListItem>();

  constructor() {}

  public onSemesterSelect(event: CustomEvent<SelectChangeEventDetail<DualisSemesterListItem>>): void {
    this.selectSemester.emit(event.detail.value);
  }
}
