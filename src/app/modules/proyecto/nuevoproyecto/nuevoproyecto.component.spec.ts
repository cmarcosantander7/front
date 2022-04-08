import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoproyectoComponent } from './nuevoproyecto.component';

describe('NuevoproyectoComponent', () => {
  let component: NuevoproyectoComponent;
  let fixture: ComponentFixture<NuevoproyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoproyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
