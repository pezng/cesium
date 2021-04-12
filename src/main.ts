import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as Cesium from 'cesium';
import { Ion } from 'cesium';

if (environment.production) {
  enableProdMode();
}
window['CESIUM_BASE_URL'] = '/assets/cesium'; // If youre using Cesium version < 1.42.0 add this line
// Cesium.buildModuleUrl('/assets/cesium/'); // If youre using Cesium version >= 1.42.0 add this line
Ion.defaultAccessToken = environment.cesium.accessToken;
platformBrowserDynamic().bootstrapModule(AppModule);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
