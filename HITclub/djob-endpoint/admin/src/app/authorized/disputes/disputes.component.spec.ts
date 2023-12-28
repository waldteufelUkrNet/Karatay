import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DisputesComponent } from './disputes.component';
import { DisputesModule } from './disputes.module';

describe('DisputesComponent', () => {
  let component: DisputesComponent;
  let fixture: ComponentFixture<DisputesComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          DisputesModule,
          RouterTestingModule,
          BrowserAnimationsModule,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DisputesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
