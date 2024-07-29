import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DialogService } from '@app/core';
import { Observable } from 'rxjs';
import {
  CalendarViewOptionsPopoverBindings,
  CalendarViewOptionsPopoverComponent,
} from '../calendar-view-options-popover/calendar-view-options-popover.component';
import { CalendarComponent, CalendarView } from '../calendar/calendar.component';

@Component({
  selector: 'app-calendar-toolbar',
  templateUrl: './calendar-toolbar.component.html',
  styleUrls: ['./calendar-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarToolbarComponent {
  @Input()
  public calendarComponent: CalendarComponent | undefined;

  public readonly CALENDAR_VIEW_TIMEGRIDDAY = CalendarView.timeGridDay;
  public readonly CALENDAR_VIEW_TIMEGRIDWEEK = CalendarView.timeGridWeek;
  public readonly CALENDAR_VIEW_DAYGRIDMONTH = CalendarView.dayGridMonth;

  constructor(private readonly dialogService: DialogService) {}

  public get calendarView$(): Observable<CalendarView> | undefined {
    return this.calendarComponent?.calendarView$;
  }

  public get calendarTitle$(): Observable<string> | undefined {
    return this.calendarComponent?.calendarTitle$;
  }

  public async showCalendarViewOptionsPopover(event: Event): Promise<void> {
    const bindings: CalendarViewOptionsPopoverBindings = {
      changeView: (view: CalendarView) => this.changeView(view),
    };
    const popover = await this.dialogService.showPopover({
      component: CalendarViewOptionsPopoverComponent,
      componentProps: { bindings },
      event: event,
      arrow: false,
    });
    await popover.present();
  }

  public changeView(view: CalendarView): void {
    const fullcalendarInstance = this.calendarComponent?.getFullcalendarInstance();
    if (!fullcalendarInstance) {
      return;
    }
    fullcalendarInstance.changeView(view);
  }

  public navigateForward(): void {
    const fullcalendarInstance = this.calendarComponent?.getFullcalendarInstance();
    if (!fullcalendarInstance) {
      return;
    }
    fullcalendarInstance.next();
  }

  public navigateBack(): void {
    const fullcalendarInstance = this.calendarComponent?.getFullcalendarInstance();
    if (!fullcalendarInstance) {
      return;
    }
    fullcalendarInstance.prev();
  }

  public navigateToToday(): void {
    const fullcalendarInstance = this.calendarComponent?.getFullcalendarInstance();
    if (!fullcalendarInstance) {
      return;
    }
    fullcalendarInstance.today();
  }
}
