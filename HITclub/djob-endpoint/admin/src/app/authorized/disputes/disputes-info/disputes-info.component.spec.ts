import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisputesInfoComponent } from './disputes-info.component';

describe('DisputesInfoComponent', () => {
  let component: DisputesInfoComponent;
  let fixture: ComponentFixture<DisputesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisputesInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisputesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
