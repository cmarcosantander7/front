import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerdelegacionesComponent } from './verdelegaciones.component';

describe('VerdelegacionesComponent', () => {
  let component: VerdelegacionesComponent;
  let fixture: ComponentFixture<VerdelegacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerdelegacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerdelegacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
