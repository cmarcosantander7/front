import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VercordinadorvinculacionComponent } from './vercordinadorvinculacion.component';

describe('VercordinadorvinculacionComponent', () => {
  let component: VercordinadorvinculacionComponent;
  let fixture: ComponentFixture<VercordinadorvinculacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VercordinadorvinculacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VercordinadorvinculacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
