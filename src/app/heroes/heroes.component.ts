import { Component } from '@angular/core';
import { HeroesService } from '../heroes.service';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { SynergiesService } from '../synergies.service';

function toggleSpecifySelectedFn(currentFilter) {
  return function (filter) {
    if (currentFilter.value !== filter.value) {
      return filter;
    }
    return {
      ...filter,
      selected: !filter.selected,
    };
  };
}

function getSelectedValue(filters) {
  return filters.filter((d) => d.selected).map((d) => d.value);
}

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent {
  faFilterHtml = this.sanitizer.bypassSecurityTrustHtml(
    icon(faFilter, {
      transform: {
        size: 12,
        y: -1,
      },
    }).html[0]
  );

  sort: 'keyword';
  showFilter = false;
  showSort = false;

  costs = ['1', '2', '3', '4', '5'].map((d) => {
    return {
      name: `${d} 费`,
      value: d,
      selected: false,
    };
  });

  classes = this.synergiesService.classes.map((d) => {
    return {
      name: d.name,
      value: d.keyword,
      selected: false,
    };
  });

  origins = this.synergiesService.origins.map((d) => {
    return {
      name: d.name,
      value: d.keyword,
      selected: false,
    };
  });

  sorts = [
    {
      name: '默认',
      field: 'keyword',
      selected: true,
    },
    {
      name: '费用',
      field: 'price',
      selected: false,
    },
  ];

  heroes;

  placeholders;

  toggleFilter(type, filter) {
    const toggleSpecifySelected = toggleSpecifySelectedFn(filter);
    switch (type) {
      case 'cost':
        this.costs = this.costs.map(toggleSpecifySelected);
        break;
      case 'class':
        this.classes = this.classes.map(toggleSpecifySelected);
        break;
      case 'origin':
        this.origins = this.origins.map(toggleSpecifySelected);
        break;
    }
    this.updateHeroes();
  }

  sortChange(sort) {
    if (sort.selected) {
      return;
    }

    this.sorts = this.sorts.map((d) => {
      if (d.field === sort.field) {
        return {
          ...d,
          selected: true,
        };
      } else if (d.selected === true) {
        return {
          ...d,
          selected: false,
        };
      }

      return d;
    });

    this.updateHeroes();
  }

  updateHeroes() {
    const filters = {
      costs: getSelectedValue(this.costs),
      classes: getSelectedValue(this.classes),
      origins: getSelectedValue(this.origins),
    };
    const sortFiled = this.sorts.find((d) => d.selected)?.field;

    this.heroes = this.heroesService.getHeroesByFilters(filters, sortFiled);
    this.placeholders = Array.from({ length: 60 - (this.heroes.length % 60) });
  }

  constructor(
    private synergiesService: SynergiesService,
    private heroesService: HeroesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.updateHeroes();
  }
}
