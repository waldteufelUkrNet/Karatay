import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ExecutorsComponent } from './executors.component';
import { ExecutorsModule } from './executors.module';

describe('ExecutorsComponent', () => {
  let component: ExecutorsComponent;
  let fixture: ComponentFixture<ExecutorsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          ExecutorsModule,
          RouterTestingModule,
          BrowserAnimationsModule,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
