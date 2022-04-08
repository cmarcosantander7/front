import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Veranexo62Component } from './veranexo62.component';

describe('Veranexo62Component', () => {
  let component: Veranexo62Component;
  let fixture: ComponentFixture<Veranexo62Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Veranexo62Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Veranexo62Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
