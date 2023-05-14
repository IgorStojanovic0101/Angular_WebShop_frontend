import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Row5Component } from './row5.component';

describe('Row5Component', () => {
  let component: Row5Component;
  let fixture: ComponentFixture<Row5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Row5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Row5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
