import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Firmaranexo9Component } from './firmaranexo9.component';

describe('Firmaranexo9Component', () => {
  let component: Firmaranexo9Component;
  let fixture: ComponentFixture<Firmaranexo9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Firmaranexo9Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Firmaranexo9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
