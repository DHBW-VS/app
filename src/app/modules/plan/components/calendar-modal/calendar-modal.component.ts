import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { DialogService } from '@app/core';
import { ActionSheet, ActionSheetButton, ActionSheetButtonStyle } from '@capacitor/action-sheet';
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
  @Input()
  public exportTimetableAsPdf: (() => Promise<void>) | undefined;
  @Input()
  public exportTimetableAsICalendar: (() => Promise<void>) | undefined;

  @ViewChild('calendar')
  public calendarComponent: CalendarComponent | undefined;

  constructor(private readonly dialogService: DialogService, private readonly changeDetectorref: ChangeDetectorRef) {}

  public ngAfterViewInit(): void {
    this.changeDetectorref.detectChanges();
  }

  public async openExportTimetableActionSheet(): Promise<void> {
    if (!this.iCalendarLink || !this.exportTimetableAsICalendar || !this.exportTimetableAsPdf) {
      return;
    }
    const buttons: ActionSheetButton[] = [
      {
        title: 'Als PDF speichern',
      },
      {
        title: 'Als iCalendar speichern',
      },
      {
        title: 'Abbrechen',
        style: ActionSheetButtonStyle.Cancel,
      },
    ];
    const result = await ActionSheet.showActions({
      title: 'Vorlesungsplan exportieren',
      options: buttons,
    });
    if (buttons.length === 2) {
      if (result.index === 0) {
        await this.exportTimetableAsICalendar();
      }
    } else {
      if (result.index === 0) {
        await this.exportTimetableAsPdf();
      } else if (result.index === 1) {
        await this.exportTimetableAsICalendar();
      }
    }
  }

  public async closeModal(): Promise<void> {
    await this.dialogService.dismissModal();
  }
}
