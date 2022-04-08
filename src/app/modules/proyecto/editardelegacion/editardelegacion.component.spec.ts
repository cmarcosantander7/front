import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditardelegacionComponent } from './editardelegacion.component';

describe('EditardelegacionComponent', () => {
  let component: EditardelegacionComponent;
  let fixture: ComponentFixture<EditardelegacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditardelegacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditardelegacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
