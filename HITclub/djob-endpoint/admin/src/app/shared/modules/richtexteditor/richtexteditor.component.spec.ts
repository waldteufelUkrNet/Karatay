import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RichtexteditorComponent } from './richtexteditor.component';
import { RichtexteditorModule } from './richtexteditor.module';

describe('RichtexteditorComponent', () => {
  let component: RichtexteditorComponent;
  let fixture: ComponentFixture<RichtexteditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RichtexteditorModule, RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichtexteditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
