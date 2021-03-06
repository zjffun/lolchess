import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { ItemsComponent } from './items/items.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { HeroesComponent } from './heroes/heroes.component';
import { SynergiesComponent } from './synergies/synergies.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HeroFigureComponent } from './hero-figure/hero-figure.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemFigureComponent } from './item-figure/item-figure.component';
import { BackNavigationComponent } from './back-navigation/back-navigation.component';
import { ItemDetailPopperComponent } from './item-detail-popper/item-detail-popper.component';
import { SynergiesTableComponent } from './synergies-table/synergies-table.component';
import { JoinKeysPipe } from './join-keys.pipe';
import { AboutComponent } from './about/about.component';
import { RouteReuseStrategy } from '@angular/router';
import { RouteReuseService } from './route-reuse.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { SynergyAccordionComponent } from './synergy-accordion/synergy-accordion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ItemsComponent,
    HeroesComponent,
    SynergiesComponent,
    HeroDetailComponent,
    HeroFigureComponent,
    ItemDetailComponent,
    ItemFigureComponent,
    BackNavigationComponent,
    ItemDetailPopperComponent,
    SynergiesTableComponent,
    JoinKeysPipe,
    AboutComponent,
    SynergyAccordionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    MatTabsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: RouteReuseService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
