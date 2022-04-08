import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Firmaanexo62Component } from './firmaanexo62.component';

describe('Firmaanexo62Component', () => {
  let component: Firmaanexo62Component;
  let fixture: ComponentFixture<Firmaanexo62Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Firmaanexo62Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Firmaanexo62Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
