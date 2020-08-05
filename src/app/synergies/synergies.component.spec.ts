import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynergiesComponent } from './synergies.component';

describe('SynergiesComponent', () => {
  let component: SynergiesComponent;
  let fixture: ComponentFixture<SynergiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynergiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynergiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
