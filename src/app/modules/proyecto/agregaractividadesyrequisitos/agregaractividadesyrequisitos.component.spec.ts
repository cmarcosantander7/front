import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaractividadesyrequisitosComponent } from './agregaractividadesyrequisitos.component';

describe('AgregaractividadesyrequisitosComponent', () => {
  let component: AgregaractividadesyrequisitosComponent;
  let fixture: ComponentFixture<AgregaractividadesyrequisitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregaractividadesyrequisitosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaractividadesyrequisitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
