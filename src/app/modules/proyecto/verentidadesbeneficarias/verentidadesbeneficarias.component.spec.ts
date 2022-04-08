import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerentidadesbeneficariasComponent } from './verentidadesbeneficarias.component';

describe('VerentidadesbeneficariasComponent', () => {
  let component: VerentidadesbeneficariasComponent;
  let fixture: ComponentFixture<VerentidadesbeneficariasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerentidadesbeneficariasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerentidadesbeneficariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
