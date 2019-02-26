import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FalseDetailPage } from './false-detail.page';

describe('FalseDetailPage', () => {
  let component: FalseDetailPage;
  let fixture: ComponentFixture<FalseDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FalseDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FalseDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
