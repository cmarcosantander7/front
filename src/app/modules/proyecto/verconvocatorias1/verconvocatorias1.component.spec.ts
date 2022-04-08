import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Verconvocatorias1Component } from './verconvocatorias1.component';

describe('Verconvocatorias1Component', () => {
  let component: Verconvocatorias1Component;
  let fixture: ComponentFixture<Verconvocatorias1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Verconvocatorias1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Verconvocatorias1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
