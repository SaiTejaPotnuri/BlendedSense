import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectdropdownComponent } from './multiselectdropdown.component';

describe('MultiselectdropdownComponent', () => {
  let component: MultiselectdropdownComponent;
  let fixture: ComponentFixture<MultiselectdropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiselectdropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiselectdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
