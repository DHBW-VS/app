import { NgModule } from '@angular/core';
import { FaConfig, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendarAlt,
  faCalendarDay,
  faCalendarWeek,
  faChevronLeft,
  faChevronRight,
  faDownload,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class FaIconModule {
  constructor(private readonly library: FaIconLibrary, private readonly faConfig: FaConfig) {
    library.addIcons(faCalendarAlt);
    library.addIcons(faCalendarWeek);
    library.addIcons(faCalendarDay);
    library.addIcons(faChevronLeft);
    library.addIcons(faChevronRight);
    library.addIcons(faDownload);
    faConfig.fixedWidth = true;
  }
}
