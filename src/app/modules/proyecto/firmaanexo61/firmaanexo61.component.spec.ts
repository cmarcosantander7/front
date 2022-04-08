import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Firmaanexo61Component } from './firmaanexo61.component';

describe('Firmaanexo61Component', () => {
  let component: Firmaanexo61Component;
  let fixture: ComponentFixture<Firmaanexo61Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Firmaanexo61Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Firmaanexo61Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
