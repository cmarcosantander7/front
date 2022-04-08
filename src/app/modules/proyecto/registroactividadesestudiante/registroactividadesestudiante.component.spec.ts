import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroactividadesestudianteComponent } from './registroactividadesestudiante.component';

describe('RegistroactividadesestudianteComponent', () => {
  let component: RegistroactividadesestudianteComponent;
  let fixture: ComponentFixture<RegistroactividadesestudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroactividadesestudianteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroactividadesestudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
