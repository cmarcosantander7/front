import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarentidadbeneficiariaComponent } from './editarentidadbeneficiaria.component';

describe('EditarentidadbeneficiariaComponent', () => {
  let component: EditarentidadbeneficiariaComponent;
  let fixture: ComponentFixture<EditarentidadbeneficiariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarentidadbeneficiariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarentidadbeneficiariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
