import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFigureComponent } from './hero-figure.component';

describe('HeroFigureComponent', () => {
  let component: HeroFigureComponent;
  let fixture: ComponentFixture<HeroFigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroFigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
