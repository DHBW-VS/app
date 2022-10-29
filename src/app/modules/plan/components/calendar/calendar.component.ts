import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Config } from '@app/config';
import { Calendar, DatesSetArg } from '@fullcalendar/core';
import deLocale from '@fullcalendar/core/locales/de';
import dayGridPlugin from '@fullcalendar/daygrid';
import iCalendarPlugin from '@fullcalendar/icalendar';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements AfterViewInit {
  @Input()
  public iCalendarLink: string | undefined;

  @ViewChild('calendar')
  public calendarElementRef: ElementRef<HTMLDivElement> | undefined;

  public readonly calendarView$: Observable<CalendarView>;
  public readonly calendarTitle$: Observable<string>;

  private fullcalendarInstance: Calendar | undefined;

  private calendarViewSubject = new BehaviorSubject<CalendarView>(CalendarView.timeGridDay);
  private calendarTitleSubject = new BehaviorSubject<string>('');

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {
    this.calendarView$ = this.calendarViewSubject.asObservable();
    this.calendarTitle$ = this.calendarTitleSubject.asObservable();
  }

  public ngAfterViewInit(): void {
    this.initFullcalendarInstance();
  }

  public getFullcalendarInstance(): Calendar | undefined {
    return this.fullcalendarInstance;
  }

  private initFullcalendarInstance(): void {
    if (!this.calendarElementRef || !this.iCalendarLink) {
      return;
    }
    this.fullcalendarInstance = new Calendar(this.calendarElementRef.nativeElement, {
      plugins: [dayGridPlugin, timeGridPlugin, iCalendarPlugin, interactionPlugin],
      locale: deLocale,
      initialView: this.calendarViewSubject.getValue(),
      headerToolbar: false,
      datesSet: (event: DatesSetArg) => this.onDatesSet(event),
      dateClick: (event: DateClickArg) => this.onDatesClick(event),
      businessHours: {
        daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
        startTime: '08:00',
        endTime: '18:00',
      },
      weekNumbers: true,
      nowIndicator: true,
      events: {
        url: this.iCalendarLink,
        format: 'ics',
        // TODO: Add error handling
        failure: event => {
          console.error(event);
        },
      },
      eventBackgroundColor: Config.primaryColor,
      eventBorderColor: Config.primaryColor,
      eventTextColor: 'white',
      dayCellClassNames: 'fullcalendar-day-cell',
      weekNumberClassNames: 'fullcalendar-week-number',
      eventClassNames: 'fullcalendar-event',
      dayHeaderClassNames: 'fullcalendar-day-header',
    });
    this.fullcalendarInstance.render();
    this.changeDetectorRef.detectChanges();
  }

  private onDatesSet(event: DatesSetArg): void {
    this.calendarViewSubject.next(event.view.type as CalendarView);
    this.calendarTitleSubject.next(event.view.title);
  }

  private onDatesClick(event: DateClickArg): void {
    this.fullcalendarInstance?.changeView(CalendarView.timeGridDay);
    this.fullcalendarInstance?.gotoDate(event.date);
  }
}

export enum CalendarView {
  /**
   * @see https://fullcalendar.io/docs/timegrid-view
   */
  timeGridDay = 'timeGridDay',
  /**
   * @see https://fullcalendar.io/docs/timegrid-view
   */
  timeGridWeek = 'timeGridWeek',
  /**
   * @see https://fullcalendar.io/docs/month-view
   */
  dayGridMonth = 'dayGridMonth',
}
