import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { AuthorizedComponent } from './authorized.component';
import { AuthorizedModule } from './authorized.module';

describe('LayoutComponent', () => {
  let component: AuthorizedComponent;
  let fixture: ComponentFixture<AuthorizedComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          AuthorizedModule,
          RouterTestingModule,
          TranslateModule.forRoot(),
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
