import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CoreModule, GlobalErrorHandlerService } from '@app/core';
import { SharedModule } from '@app/shared';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { IonicModule, IonicRouteStrategy, isPlatform } from '@ionic/angular';
import { register as registerSwiper } from 'swiper/element/bundle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

registerLocaleData(localeDe);

registerSwiper();

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    SharedModule,
    BrowserModule,
    IonicModule.forRoot({
      backButtonText: isPlatform('ios') ? 'Zurück' : '',
      backButtonDefaultHref: '/dashboard',
    }),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },
    { provide: LOCALE_ID, useValue: 'de-DE' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
