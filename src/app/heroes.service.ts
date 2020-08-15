import { Injectable } from '@angular/core';
import { intersection } from 'lodash';
import heroes from '../assets/heroes.zh-CN.json';
import { SynergiesService } from './synergies.service';

export type heroType = typeof heroes[0];

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  readonly heroes = heroes;

  readonly heroKeywordMap = new Map<string, heroType>();

  private synergyHeroesMap = new Map();

  constructor(private synergiesService: SynergiesService) {
    this.synergiesService.synergies.forEach((synergy) => {
      this.synergyHeroesMap.set(synergy.keyword, synergy.heroes);
    });
    this.heroes.forEach((hero) => {
      this.heroKeywordMap.set(hero.keyword, hero);
    });
  }

  getHeroesBySynergiesKeyword(...synergiesKeyword) {
    let heroesKw = this.synergyHeroesMap.get(synergiesKeyword.pop());

    for (const skw of synergiesKeyword) {
      heroesKw = intersection(heroesKw, this.synergyHeroesMap.get(skw));
    }

    return heroesKw.map((heroKw) => this.heroKeywordMap.get(heroKw));
  }
}
