import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CoreModule, GlobalErrorHandlerService } from '@app/core';
import { SharedModule } from '@app/shared';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { IonicModule, IonicRouteStrategy, isPlatform } from '@ionic/angular';
import { register as registerSwiper } from 'swiper/element/bundle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
    HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
