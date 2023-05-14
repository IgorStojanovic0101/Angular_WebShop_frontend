import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Row4Component } from './row4.component';

describe('Row4Component', () => {
  let component: Row4Component;
  let fixture: ComponentFixture<Row4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Row4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Row4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
