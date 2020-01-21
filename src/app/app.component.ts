import { isPlatformBrowser } from '@angular/common';
import {
  APP_ID,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PAGES_ANIMATION } from '@animations/pages.animation';
import _ from 'lodash';
import {
  PTL_DOCUMENT,
  PtlDialogService,
  PtlEnvironmentGoogleAnalytics,
  PtlEnvironmentGooglePlaces,
  PtlEnvironmentGoogleServices,
  PtlEnvironmentHotjar,
  PtlEnvironmentService,
  PtlGoogleAnalyticsService,
  PtlGooglePlacesService,
  PtlGoogleServicesService,
  PtlHotjarService,
  PtlLoadingStateService,
  PtlLoggerService,
  PtlPlatformIdEnum
} from 'ng-homegenius-portal';

@Component({
  selector: 'app-root',
  styleUrls: [
    './app.component.scss'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
}
