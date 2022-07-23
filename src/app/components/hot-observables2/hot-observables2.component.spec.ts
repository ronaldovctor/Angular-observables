import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotObservables2Component } from './hot-observables2.component';

describe('HotObservables2Component', () => {
  let component: HotObservables2Component;
  let fixture: ComponentFixture<HotObservables2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotObservables2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotObservables2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
