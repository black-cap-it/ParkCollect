import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FalsePage } from './false.page';

describe('FalsePage', () => {
  let component: FalsePage;
  let fixture: ComponentFixture<FalsePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FalsePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FalsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
