import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFigureComponent } from './item-figure.component';

describe('ItemFigureComponent', () => {
  let component: ItemFigureComponent;
  let fixture: ComponentFixture<ItemFigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemFigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
