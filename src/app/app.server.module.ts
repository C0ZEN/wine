import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  ServerModule,
  ServerTransferStateModule
} from '@angular/platform-server';
import { AppComponent } from '@app/component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { TRANSLOCO_LOADER_PROVIDER } from '@providers/translation/transloco-loader.provider';
import { InViewportModule } from '@thisissoon/angular-inviewport';
import { AppModule } from './app.module';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [

    // Angular
    AppModule,
    NoopAnimationsModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,

    // Third parties
    InViewportModule.forServer()
  ],
  providers: [

    // Internal
    TRANSLOCO_LOADER_PROVIDER
  ]
})
export class AppServerModule {
}
