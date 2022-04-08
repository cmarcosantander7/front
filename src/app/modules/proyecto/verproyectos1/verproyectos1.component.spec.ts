import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Verproyectos1Component } from './verproyectos1.component';

describe('Verproyectos1Component', () => {
  let component: Verproyectos1Component;
  let fixture: ComponentFixture<Verproyectos1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Verproyectos1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Verproyectos1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
