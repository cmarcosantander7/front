import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoresponsablepppComponent } from './nuevoresponsableppp.component';

describe('NuevoresponsablepppComponent', () => {
  let component: NuevoresponsablepppComponent;
  let fixture: ComponentFixture<NuevoresponsablepppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoresponsablepppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoresponsablepppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
