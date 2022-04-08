import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoplandeaprendizajeComponent } from './nuevoplandeaprendizaje.component';

describe('NuevoplandeaprendizajeComponent', () => {
  let component: NuevoplandeaprendizajeComponent;
  let fixture: ComponentFixture<NuevoplandeaprendizajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoplandeaprendizajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoplandeaprendizajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
