import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigsFormComponent } from './configs-form.component';

describe('ConfigsFormComponent', () => {
  let component: ConfigsFormComponent;
  let fixture: ComponentFixture<ConfigsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
