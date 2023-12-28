import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutorsInfoComponent } from './executors-info.component';

describe('ExecutorsInfoComponent', () => {
  let component: ExecutorsInfoComponent;
  let fixture: ComponentFixture<ExecutorsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutorsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutorsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
