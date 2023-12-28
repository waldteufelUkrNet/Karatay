import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtiesGroupsComponent } from './specialties-list.component';

describe('SpecialtiesListComponent', () => {
  let component: SpecialtiesGroupsComponent;
  let fixture: ComponentFixture<SpecialtiesGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialtiesGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialtiesGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
