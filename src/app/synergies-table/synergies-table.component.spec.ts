import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynergiesTableComponent } from './synergies-table.component';

describe('SynergiesTableComponent', () => {
  let component: SynergiesTableComponent;
  let fixture: ComponentFixture<SynergiesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynergiesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynergiesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
