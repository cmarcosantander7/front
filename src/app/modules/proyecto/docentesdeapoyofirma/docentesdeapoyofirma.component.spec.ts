import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocentesdeapoyofirmaComponent } from './docentesdeapoyofirma.component';

describe('DocentesdeapoyofirmaComponent', () => {
  let component: DocentesdeapoyofirmaComponent;
  let fixture: ComponentFixture<DocentesdeapoyofirmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocentesdeapoyofirmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocentesdeapoyofirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
