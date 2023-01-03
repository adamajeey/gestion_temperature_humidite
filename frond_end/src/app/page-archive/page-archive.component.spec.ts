import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageArchiveComponent } from './page-archive.component';

describe('PageArchiveComponent', () => {
  let component: PageArchiveComponent;
  let fixture: ComponentFixture<PageArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageArchiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
