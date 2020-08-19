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
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'heroes',
        data: { reuse: true, title: '英雄' },
        component: HeroesComponent,
      },
      {
        path: 'items',
        data: { reuse: true, title: '装备' },
        component: ItemsComponent,
      },
      {
        path: 'synergies',
        data: { reuse: true, title: '特性 & 职业' },
        component: SynergiesComponent,
      },
      {
        path: 'synergies-table',
        data: { reuse: true, title: '特性 X 职业' },
        component: SynergiesTableComponent,
      },
      {
        path: 'about',
        data: { reuse: true, title: '关于' },
        component: AboutComponent,
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
