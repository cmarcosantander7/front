import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdelagaciondealumnosfirmaComponent } from './adelagaciondealumnosfirma.component';

describe('AdelagaciondealumnosfirmaComponent', () => {
  let component: AdelagaciondealumnosfirmaComponent;
  let fixture: ComponentFixture<AdelagaciondealumnosfirmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdelagaciondealumnosfirmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdelagaciondealumnosfirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
