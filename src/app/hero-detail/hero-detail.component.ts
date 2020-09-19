import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { NavigationService } from '../navigation.service';
import { ItemService, itemType } from '../item.service';
import { heroType, HeroesService } from '../heroes.service';
import { ItemDetailPopperComponent } from '../item-detail-popper/item-detail-popper.component';
import { syenrgyType, SynergiesService } from '../synergies.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  @ViewChild('itemDetailPopper') itemDetailPopper: ItemDetailPopperComponent;

  hero: heroType;
  synergies: Array<syenrgyType> = [];
  lolqqitems: Array<itemType> = [];
  lolchessitems: Array<itemType> = [];

  constructor(
    private route: ActivatedRoute,
    private navigation: NavigationService,
    private itemService: ItemService,
    private heroesService: HeroesService,
    private synergiesService: SynergiesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params: ParamMap) => {
          const keyword = params.get('keyword');
          const hero = this.heroesService.heroKeywordMap.get(keyword);
          return hero;
        })
      )
      .subscribe((hero) => {
        this.hero = hero;
        this.synergies = this.synergiesService.getSynergiesByKewords(
          this.heroesService.heroSynergiesMap.get(hero.keyword)
        );

        setTimeout(() => {
          this.navigation.title = hero.displayName;
        }, 0);

        let lolqqitems: Array<itemType> = [];

        this.itemService.items.forEach((item) => {
          if (item.lolqqheroes.includes(hero.keyword)) {
            lolqqitems.push(item);
          }
        });
        this.lolqqitems = lolqqitems;

        // reset
        this.itemDetailPopper?.hide();
      });
  }
}
