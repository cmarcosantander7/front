import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerproyectosComponent } from './verproyectos.component';

describe('VerproyectosComponent', () => {
  let component: VerproyectosComponent;
  let fixture: ComponentFixture<VerproyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerproyectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerproyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
