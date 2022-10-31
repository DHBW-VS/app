import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DialogService, NotificationService } from '@app/core';
import { ActionSheet, ActionSheetButton, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarModalComponent implements OnInit, AfterViewInit {
  @Input()
  public iCalendarLink: string | undefined;
  @Input()
  public exportTimetableAsPdf: (() => Promise<void>) | undefined;
  @Input()
  public exportTimetableAsICalendar: (() => Promise<void>) | undefined;

  @ViewChild('calendar')
  public calendarComponent: CalendarComponent | undefined;

  private loadingElement: HTMLIonLoadingElement | undefined;
  private eventsLoaded = false;

  constructor(
    private readonly dialogService: DialogService,
    private readonly notificationService: NotificationService,
    private readonly changeDetectorref: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    void this.showLoading();
  }

  public ngAfterViewInit(): void {
    this.changeDetectorref.detectChanges();
  }

  public onEventSourceSuccess(): void {
    this.eventsLoaded = true;
    void this.dismissLoading();
  }

  public onEventSourceError(): void {
    void this.closeModalWithErrorToast();
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

  private async dismissLoading(): Promise<void> {
    if (this.loadingElement) {
      await this.loadingElement.dismiss();
    }
  }

  private async showLoading(): Promise<void> {
    await this.dismissLoading();
    this.loadingElement = await this.dialogService.showLoading();
    if (this.eventsLoaded) {
      await this.dismissLoading();
    }
  }

  public async closeModal(): Promise<void> {
    await this.dialogService.dismissModal();
  }

  public async closeModalWithErrorToast(): Promise<void> {
    await this.notificationService.showToast({
      message: 'Laden fehlgeschlagen!',
    });
    await this.dismissLoading();
    await this.closeModal();
  }
}
