import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { ItemsComponent } from './items/items.component';
import { SynergiesComponent } from './synergies/synergies.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BackNavigationComponent } from './back-navigation/back-navigation.component';

const routes: Routes = [
  {
    path: 'heroes',
    component: NavigationComponent,
    children: [
      {
        path: '**',
        component: HeroesComponent,
      },
    ],
  },
  {
    path: 'items',
    component: NavigationComponent,
    children: [
      {
        path: '**',
        component: ItemsComponent,
      },
    ],
  },
  {
    path: 'synergies',
    component: NavigationComponent,
    children: [
      {
        path: '**',
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
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: '**', redirectTo: '/items' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
