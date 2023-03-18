import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmanreportComponent } from './salesmanreport.component';

describe('SalesmanreportComponent', () => {
  let component: SalesmanreportComponent;
  let fixture: ComponentFixture<SalesmanreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesmanreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesmanreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
