import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerpostulacionesComponent } from './verpostulaciones.component';

describe('VerpostulacionesComponent', () => {
  let component: VerpostulacionesComponent;
  let fixture: ComponentFixture<VerpostulacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerpostulacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerpostulacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
