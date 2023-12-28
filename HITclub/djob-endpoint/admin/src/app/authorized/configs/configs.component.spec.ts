import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ConfigsComponent } from './configs.component';
import { ConfigsModule } from './configs.module';

describe('ConfigsComponent', () => {
  let component: ConfigsComponent;
  let fixture: ComponentFixture<ConfigsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          ConfigsModule,
          RouterTestingModule,
          BrowserAnimationsModule,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
