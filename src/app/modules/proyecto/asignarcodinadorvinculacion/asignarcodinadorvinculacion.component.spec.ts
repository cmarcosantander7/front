import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarcodinadorvinculacionComponent } from './asignarcodinadorvinculacion.component';

describe('AsignarcodinadorvinculacionComponent', () => {
  let component: AsignarcodinadorvinculacionComponent;
  let fixture: ComponentFixture<AsignarcodinadorvinculacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarcodinadorvinculacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarcodinadorvinculacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
