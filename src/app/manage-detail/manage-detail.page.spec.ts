import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDetailPage } from './manage-detail.page';

describe('ManageDetailPage', () => {
  let component: ManageDetailPage;
  let fixture: ComponentFixture<ManageDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
