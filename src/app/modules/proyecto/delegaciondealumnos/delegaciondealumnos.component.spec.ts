import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegaciondealumnosComponent } from './delegaciondealumnos.component';

describe('DelegaciondealumnosComponent', () => {
  let component: DelegaciondealumnosComponent;
  let fixture: ComponentFixture<DelegaciondealumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegaciondealumnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegaciondealumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
