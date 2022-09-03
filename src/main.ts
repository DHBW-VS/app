import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { devTools } from '@ngneat/elf-devtools';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
} else {
  devTools();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(error => console.log(error));
