import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PushComponent } from './push.component';
import { PushModule } from './push.module';

describe('PushComponent', () => {
  let component: PushComponent;
  let fixture: ComponentFixture<PushComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          PushModule,
          RouterTestingModule,
          BrowserAnimationsModule,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
