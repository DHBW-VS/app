import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { DialogService } from '@app/core';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarModalComponent implements AfterViewInit {
  @Input()
  public iCalendarLink: string | undefined;

  @ViewChild('calendar')
  public calendarComponent: CalendarComponent | undefined;

  constructor(private readonly dialogService: DialogService, private readonly changeDetectorref: ChangeDetectorRef) {}

  public ngAfterViewInit(): void {
    this.changeDetectorref.detectChanges();
  }

  public async closeModal(): Promise<void> {
    await this.dialogService.dismissModal();
  }
}
