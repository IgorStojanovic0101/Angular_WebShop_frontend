import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Row6Component } from './row6.component';

describe('Row6Component', () => {
  let component: Row6Component;
  let fixture: ComponentFixture<Row6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Row6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Row6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
