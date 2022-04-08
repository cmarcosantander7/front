import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerconvocatoriasComponent } from './verconvocatorias.component';

describe('VerconvocatoriasComponent', () => {
  let component: VerconvocatoriasComponent;
  let fixture: ComponentFixture<VerconvocatoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerconvocatoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerconvocatoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
