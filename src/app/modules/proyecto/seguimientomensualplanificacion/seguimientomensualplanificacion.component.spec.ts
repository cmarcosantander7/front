import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientomensualplanificacionComponent } from './seguimientomensualplanificacion.component';

describe('SeguimientomensualplanificacionComponent', () => {
  let component: SeguimientomensualplanificacionComponent;
  let fixture: ComponentFixture<SeguimientomensualplanificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientomensualplanificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientomensualplanificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
