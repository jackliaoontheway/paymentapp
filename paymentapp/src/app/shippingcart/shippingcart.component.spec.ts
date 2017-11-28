import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingcartComponent } from './shippingcart.component';

describe('ShippingcartComponent', () => {
  let component: ShippingcartComponent;
  let fixture: ComponentFixture<ShippingcartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingcartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
