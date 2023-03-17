import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyAllSuccesComponent } from './buy-all-succes.component';

describe('BuyAllSuccesComponent', () => {
  let component: BuyAllSuccesComponent;
  let fixture: ComponentFixture<BuyAllSuccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyAllSuccesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyAllSuccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
