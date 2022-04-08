import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerresposabledepppComponent } from './verresposabledeppp.component';

describe('VerresposabledepppComponent', () => {
  let component: VerresposabledepppComponent;
  let fixture: ComponentFixture<VerresposabledepppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerresposabledepppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerresposabledepppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
