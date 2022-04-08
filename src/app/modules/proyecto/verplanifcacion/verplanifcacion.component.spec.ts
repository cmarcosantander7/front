import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerplanifcacionComponent } from './verplanifcacion.component';

describe('VerplanifcacionComponent', () => {
  let component: VerplanifcacionComponent;
  let fixture: ComponentFixture<VerplanifcacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerplanifcacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerplanifcacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
