import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleusersComponent } from './simpleusers.component';

describe('SimpleusersComponent', () => {
  let component: SimpleusersComponent;
  let fixture: ComponentFixture<SimpleusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
