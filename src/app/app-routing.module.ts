import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { ItemsComponent } from './items/items.component';
import { SynergiesComponent } from './synergies/synergies.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'hero/:keyword', component: HeroDetailComponent },
  { path: 'synergies', component: SynergiesComponent },
  { path: '', redirectTo: '/itmes', pathMatch: 'full' },
  { path: '**', redirectTo: '/itmes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
