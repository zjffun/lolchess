import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailPopperComponent } from './item-detail-popper.component';

describe('ItemDetailPopperComponent', () => {
  let component: ItemDetailPopperComponent;
  let fixture: ComponentFixture<ItemDetailPopperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDetailPopperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailPopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
