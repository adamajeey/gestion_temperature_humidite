import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscrptionComponent } from './inscrption.component';

describe('InscrptionComponent', () => {
  let component: InscrptionComponent;
  let fixture: ComponentFixture<InscrptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscrptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscrptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
