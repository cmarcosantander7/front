import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmarpostulacionComponent } from './firmarpostulacion.component';

describe('FirmarpostulacionComponent', () => {
  let component: FirmarpostulacionComponent;
  let fixture: ComponentFixture<FirmarpostulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmarpostulacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmarpostulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
