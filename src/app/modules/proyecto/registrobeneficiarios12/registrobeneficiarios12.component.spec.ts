import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registrobeneficiarios12Component } from './registrobeneficiarios12.component';

describe('Registrobeneficiarios12Component', () => {
  let component: Registrobeneficiarios12Component;
  let fixture: ComponentFixture<Registrobeneficiarios12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Registrobeneficiarios12Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Registrobeneficiarios12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
