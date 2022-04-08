import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaendidadbeneficiariaComponent } from './nuevaendidadbeneficiaria.component';

describe('NuevaendidadbeneficiariaComponent', () => {
  let component: NuevaendidadbeneficiariaComponent;
  let fixture: ComponentFixture<NuevaendidadbeneficiariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaendidadbeneficiariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaendidadbeneficiariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
