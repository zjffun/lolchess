import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { ItemsComponent } from './items/items.component';
import { SynergiesComponent } from './synergies/synergies.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BackNavigationComponent } from './back-navigation/back-navigation.component';
import { SynergiesTableComponent } from './synergies-table/synergies-table.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: 'heroes',
    component: NavigationComponent,
    data: { reuse: true },
    children: [
      {
        path: '**',
        data: { reuse: true },
        component: HeroesComponent,
      },
    ],
  },
  {
    path: 'items',
    data: { reuse: true },
    component: NavigationComponent,
    children: [
      {
        path: '**',
        data: { reuse: true },
        component: ItemsComponent,
      },
    ],
  },
  {
    path: 'synergies',
    data: { reuse: true },
    component: NavigationComponent,
    children: [
      {
        path: '**',
        data: { reuse: true },
        component: SynergiesComponent,
      },
    ],
  },
  {
    path: 'hero',
    component: BackNavigationComponent,
    children: [
      {
        path: ':keyword',
        component: HeroDetailComponent,
      },
    ],
  },
  {
    path: 'synergies-table',
    data: { reuse: true },
    component: NavigationComponent,
    children: [
      {
        path: '**',
        data: { reuse: true },
        component: SynergiesTableComponent,
      },
    ],
  },
  {
    path: 'about',
    component: NavigationComponent,
    children: [
      {
        path: '**',
        component: AboutComponent,
      },
    ],
  },
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: '**', redirectTo: '/items' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
