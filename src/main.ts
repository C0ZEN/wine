import {
  enableProdMode,
  NgModuleRef
} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  akitaConfig,
  enableAkitaProdMode,
  persistState
} from '@datorama/akita';
import { ENVIRONMENT } from '@environment';
import { loadExternalScript } from '@functions/load/load-external-script';
import 'hammerjs';
import localForage from 'localforage';
import { MonoTypeOperatorFunction } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AppModule } from './app/app.module';
import { HMR_BOOTSTRAP } from './hmr';

if (ENVIRONMENT.isProduction) {
  enableProdMode();
  enableAkitaProdMode();
} else {
  loadExternalScript('lazy-styles.js');
}

const akitaLocalForage: LocalForage = localForage.createInstance({
  description: 'storage for akita stores',
  driver: [
    localForage.INDEXEDDB,
    localForage.LOCALSTORAGE,
    localForage.WEBSQL
  ],
  name: 'app_akita',
  size: 4980736,
  storeName: 'wine',
  version: 1.0
});

persistState({
  preStorageUpdateOperator: (): MonoTypeOperatorFunction<unknown> => {
    return debounceTime(500);
  },
  storage: akitaLocalForage
});

akitaConfig({
  resettable: true
});

const bootstrap: any = (): Promise<NgModuleRef<AppModule>> => platformBrowserDynamic().bootstrapModule(AppModule);

if (ENVIRONMENT.hmr.isEnabled) {
  if ((module as any)[ 'hot' ]) {
    HMR_BOOTSTRAP(module, bootstrap);
  } else {
    console.error('HMR is not enabled for webpack-dev-server !');
    console.log('Are you using the --hmr flag for ng serve ?');
  }
} else {
  document.addEventListener('DOMContentLoaded', () => {
    bootstrap().catch((error: any) => console.error(error));
  });
}
