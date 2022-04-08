import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo7planificacionmensualComponent } from './anexo7planificacionmensual.component';

describe('Anexo7planificacionmensualComponent', () => {
  let component: Anexo7planificacionmensualComponent;
  let fixture: ComponentFixture<Anexo7planificacionmensualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo7planificacionmensualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo7planificacionmensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
