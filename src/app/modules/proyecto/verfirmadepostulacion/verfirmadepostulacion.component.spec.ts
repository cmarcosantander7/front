import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfirmadepostulacionComponent } from './verfirmadepostulacion.component';

describe('VerfirmadepostulacionComponent', () => {
  let component: VerfirmadepostulacionComponent;
  let fixture: ComponentFixture<VerfirmadepostulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerfirmadepostulacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerfirmadepostulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
