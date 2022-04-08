import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Verpostulaciones1Component } from './verpostulaciones1.component';

describe('Verpostulaciones1Component', () => {
  let component: Verpostulaciones1Component;
  let fixture: ComponentFixture<Verpostulaciones1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Verpostulaciones1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Verpostulaciones1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
