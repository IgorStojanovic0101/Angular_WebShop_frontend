import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Row2Component } from './row2.component';

describe('Row2Component', () => {
  let component: Row2Component;
  let fixture: ComponentFixture<Row2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Row2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Row2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
