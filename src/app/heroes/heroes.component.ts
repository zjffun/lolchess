import { Component } from '@angular/core';
import { HeroesService } from '../heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent {
  heroes = this.heroesService.heroes;

  placeholders = Array.from({ length: 60 - (this.heroes.length % 60) });

  constructor(private heroesService: HeroesService) {}
}
