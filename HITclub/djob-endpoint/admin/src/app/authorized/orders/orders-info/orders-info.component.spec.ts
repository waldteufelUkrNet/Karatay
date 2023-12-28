import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersInfoComponent } from './orders-info.component';

describe('OrdersInfoComponent', () => {
  let component: OrdersInfoComponent;
  let fixture: ComponentFixture<OrdersInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
