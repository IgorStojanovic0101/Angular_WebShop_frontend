import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataimportComponent } from './dataimport.component';

describe('DataimportComponent', () => {
  let component: DataimportComponent;
  let fixture: ComponentFixture<DataimportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataimportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
