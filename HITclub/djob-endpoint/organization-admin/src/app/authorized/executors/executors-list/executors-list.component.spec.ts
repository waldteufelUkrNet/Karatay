import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutorsListComponent } from './executors-list.component';

describe('ExecutorsListComponent', () => {
  let component: ExecutorsListComponent;
  let fixture: ComponentFixture<ExecutorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
