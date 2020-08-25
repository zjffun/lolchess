import Swappable from '@shopify/draggable/lib/swappable';
import { Component, OnInit } from '@angular/core';
import { SynergiesService } from '../synergies.service';
import { HeroesService } from '../heroes.service';

import type {
  Swappable as SwappableType,
  SwappableEventNames,
} from '@shopify/draggable';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const originsContainerSelector = '.js-origins-container';
const classesContainerSelector = '.js-classes-container';
const itemSeletor = '.js-item';

const changeType = {
  classes: Symbol(),
  origins: Symbol(),
};

@Component({
  selector: 'app-synergies-table',
  templateUrl: './synergies-table.component.html',
  styleUrls: ['./synergies-table.component.scss'],
})
export class SynergiesTableComponent implements OnInit {
  originsSwappable: SwappableType<SwappableEventNames>;
  classesSwappable: SwappableType<SwappableEventNames>;

  classes = this.synergiesService.classes;
  origins = this.synergiesService.origins;

  changeObserviable = new Subject();

  constructor(
    public synergiesService: SynergiesService,
    public heroesService: HeroesService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.originsSwappable = new Swappable(
      document.querySelector(originsContainerSelector),
      {
        draggable: itemSeletor,
      }
    );

    this.classesSwappable = new Swappable(
      document.querySelectorAll(classesContainerSelector),
      {
        draggable: `${itemSeletor}.js-item--class`,
      }
    );

    this.originsSwappable.on('drag:stop', () => {
      this.changeObserviable.next(changeType.origins);
    });

    this.classesSwappable.on('drag:stop', () => {
      this.changeObserviable.next(changeType.classes);
    });

    this.changeObserviable
      .asObservable()
      .pipe(debounceTime(100))
      .subscribe((type) => {
        switch (type) {
          case changeType.classes:
            this.classes = Array.from(
              document.querySelectorAll(
                `${classesContainerSelector} ${itemSeletor}.js-item--class`
              )
            ).map((el: HTMLElement) => {
              return {
                ...this.synergiesService.synergyKeywordMap.get(
                  el.dataset.keyword
                ),
              };
            });
            break;
          case changeType.origins:
            this.origins = Array.from(
              document.querySelectorAll(
                `${originsContainerSelector} ${itemSeletor}`
              )
            ).map((el: HTMLElement) => {
              return {
                ...this.synergiesService.synergyKeywordMap.get(
                  el.dataset.keyword
                ),
              };
            });
            break;
        }
      });
  }

  ngOnDestroy() {
    this.originsSwappable.destroy();
    this.originsSwappable.destroy();
  }
}
