import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesentryComponent } from './salesentry.component';

describe('SalesentryComponent', () => {
  let component: SalesentryComponent;
  let fixture: ComponentFixture<SalesentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesentryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
