import {
  CommonModule,
  registerLocaleData
} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeFrExtra from '@angular/common/locales/extra/fr';
import localeFr from '@angular/common/locales/fr';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from '@app/component';
import { APP_ROUTES } from '@app/routes';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { ENVIRONMENT } from '@environment';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslocoMessageFormatModule } from '@ngneat/transloco-messageformat';
import {
  TRANSLOCO_PERSIST_LANG_STORAGE,
  TranslocoPersistLangModule
} from '@ngneat/transloco-persist-lang';
import {
  PERSIST_TRANSLATIONS_STORAGE,
  TranslocoPersistTranslationsModule
} from '@ngneat/transloco-persist-translations';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { StorageModule } from '@ngx-pwa/local-storage';
import { InViewportModule } from '@thisissoon/angular-inviewport';
import { Cloudinary } from 'cloudinary-core';
import localForage from 'localforage';

// Angular i18n
registerLocaleData(localeFr, 'fr', localeFrExtra);

const i18nLocalForage: LocalForage = localForage.createInstance({
  description: 'storage for the translation files',
  driver: [
    localForage.INDEXEDDB,
    localForage.LOCALSTORAGE,
    localForage.WEBSQL
  ],
  name: 'app_i18n',
  size: 4980736,
  storeName: 'app_i18n',
  version: 1.0
});

const langLocalForage: LocalForage = localForage.createInstance({
  description: 'storage for the lang',
  driver: [
    localForage.INDEXEDDB,
    localForage.LOCALSTORAGE,
    localForage.WEBSQL
  ],
  name: 'app_lang',
  size: 4980736,
  storeName: 'app_lang',
  version: 1.0
});

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({
      appId: 'wineApp'
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES, {
      paramsInheritanceStrategy: 'always'
    }),
    TransferHttpCacheModule,
    ENVIRONMENT.production ? [] : AkitaNgDevtools.forRoot(),
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: ENVIRONMENT.production
    }),
    StorageModule.forRoot({
      IDBDBName: 'app_storage',
      IDBDBVersion: 1,
      IDBNoWrap: true,
      LSPrefix: 'app'
    }),
    TranslocoModule,
    TranslocoPersistTranslationsModule.init({
      loader: TranslocoHttpLoader,
      storage: {
        provide: PERSIST_TRANSLATIONS_STORAGE,
        useValue: i18nLocalForage
      },
      storageKey: 'app_i18n',
      ttl: PTL_ONE_HOUR
    }),
    TranslocoPersistLangModule.init({
      storage: {
        provide: TRANSLOCO_PERSIST_LANG_STORAGE,
        useValue: langLocalForage
      }
    }),
    TranslocoMessageFormatModule.init({
      locales: 'fr-FR'
    }),
    InViewportModule,
    CloudinaryModule.forRoot(Cloudinary, {
      cloud_name: 'cozen',
      secure: true
    }),
  ]
})
export class AppModule {
}
