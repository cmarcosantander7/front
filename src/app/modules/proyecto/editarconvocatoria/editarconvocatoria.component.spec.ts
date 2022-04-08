import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarconvocatoriaComponent } from './editarconvocatoria.component';

describe('EditarconvocatoriaComponent', () => {
  let component: EditarconvocatoriaComponent;
  let fixture: ComponentFixture<EditarconvocatoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarconvocatoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarconvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
