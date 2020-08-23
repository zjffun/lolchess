import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynergyAccordionComponent } from './synergy-accordion.component';

describe('SynergyAccordionComponent', () => {
  let component: SynergyAccordionComponent;
  let fixture: ComponentFixture<SynergyAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynergyAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynergyAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
