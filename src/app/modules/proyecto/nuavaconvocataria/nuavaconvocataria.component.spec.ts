import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuavaconvocatariaComponent } from './nuavaconvocataria.component';

describe('NuavaconvocatariaComponent', () => {
  let component: NuavaconvocatariaComponent;
  let fixture: ComponentFixture<NuavaconvocatariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuavaconvocatariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuavaconvocatariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
