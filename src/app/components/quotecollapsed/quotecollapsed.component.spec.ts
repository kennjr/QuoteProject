import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotecollapsedComponent } from './quotecollapsed.component';

describe('QuotecollapsedComponent', () => {
  let component: QuotecollapsedComponent;
  let fixture: ComponentFixture<QuotecollapsedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotecollapsedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotecollapsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
