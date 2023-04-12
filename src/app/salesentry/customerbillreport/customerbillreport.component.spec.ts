import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerbillreportComponent } from './customerbillreport.component';

describe('SalesreportComponent', () => {
  let component: CustomerbillreportComponent;
  let fixture: ComponentFixture<CustomerbillreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerbillreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerbillreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
