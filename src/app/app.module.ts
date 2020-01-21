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
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { ENVIRONMENT } from '@environment';
import { DialogsModule } from '@features/dialogs/dialogs.module';
import { GLOBAL_ERROR_HANDLER_PROVIDER } from '@features/errors/providers/global-error-handler.provider';
import { TranslocoHttpLoader } from '@loaders/translation/transloco-http-loader';
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
import { PagesModule } from '@pages/pages.module';
import { API_CONSTANTS_PROVIDER } from '@providers/api-constants.provider';
import { ENVIRONMENT_INIT_PROVIDER } from '@providers/environment-init.provider';
import { REQUEST_INTERCEPTOR_PROVIDER } from '@providers/http-interceptors.provider';
import { PTL_MATERIAL_ICON_CONFIG_PROVIDER } from '@providers/ptl-material-icon-config.provider';
import { TRANSLATION_SERVICE_PROVIDER } from '@providers/translation/translation-service.provider';
import { TRANSLOCO_CONFIG_PROVIDER } from '@providers/translation/transloco-config.provider';
import { InViewportModule } from '@thisissoon/angular-inviewport';
import localForage from 'localforage';
import {
  PTL_DATA_TYPE_LOGO_HOME_GENIUS_INIT_PROVIDER,
  PTL_HUB_SPOT_INIT_PROVIDER,
  PTL_META_DATA_ROBOTS_INIT_PROVIDER,
  PTL_ONE_HOUR,
  PtlAuthenticationModule,
  PtlCanonicalModule,
  PtlCategoriesModule,
  PtlCustomerModule,
  PtlDataTypeModule,
  PtlDateModule,
  PtlDialogModule,
  PtlFacebookModule,
  PtlGclIdModule,
  PtlGoogleAnalyticsModule,
  PtlGooglePlacesModule,
  PtlGoogleReverseGeocodingModule,
  PtlGoogleServicesModule,
  PtlHotjarModule,
  PtlHubSpotModule,
  PtlImagesModule,
  PtlLoadingBarModule,
  PtlLoadingStateModule,
  PtlLocationValidityModule,
  PtlOnboardingModule,
  PtlPortalModule,
  PtlProductsModule,
  PtlReferrerModule,
  PtlRenovationsModule,
  PtlRgpdModule,
  PtlRoomsModule,
  PtlScrollModule,
  PtlTasksModule,
  PtlTemplatesModule
} from 'ng-homegenius-portal';
import {
  LoggerModule,
  NgxLoggerLevel
} from 'ngx-logger';
import { ToastrModule } from 'ngx-toastr';

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
    ToastrModule.forRoot({
      closeButton: true,
      enableHtml: true,
      preventDuplicates: true,
      progressBar: true
    }),
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: ENVIRONMENT.production
    }),
    LoggerModule.forRoot({
      disableConsoleLogging: false,
      level: NgxLoggerLevel.TRACE
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
    DialogsModule,
    PagesModule
  ],
  providers: [
    GLOBAL_ERROR_HANDLER_PROVIDER,
    ENVIRONMENT_INIT_PROVIDER,
    REQUEST_INTERCEPTOR_PROVIDER,
    TRANSLATION_SERVICE_PROVIDER,
    API_CONSTANTS_PROVIDER,
    TRANSLOCO_CONFIG_PROVIDER
  ]
})
export class AppModule {
}
