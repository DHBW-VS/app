import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DialogService } from '@app/core';
import { CalendarView } from '../calendar/calendar.component';

@Component({
  selector: 'app-calendar-view-options-popover',
  templateUrl: './calendar-view-options-popover.component.html',
  styleUrls: ['./calendar-view-options-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarViewOptionsPopoverComponent {
  @Input()
  public bindings: CalendarViewOptionsPopoverBindings | undefined;

  public readonly CALENDAR_VIEW_TIMEGRIDDAY = CalendarView.timeGridDay;
  public readonly CALENDAR_VIEW_TIMEGRIDWEEK = CalendarView.timeGridWeek;
  public readonly CALENDAR_VIEW_DAYGRIDMONTH = CalendarView.dayGridMonth;

  constructor(private readonly dialogService: DialogService) {}

  public changeView(view: CalendarView): void {
    this.bindings?.changeView(view);
    void this.dialogService.dismissPopover();
  }
}

export interface CalendarViewOptionsPopoverBindings {
  changeView: (view: CalendarView) => void;
}
