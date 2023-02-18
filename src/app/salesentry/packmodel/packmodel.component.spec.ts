import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackmodelComponent } from './packmodel.component';

describe('PackmodelComponent', () => {
  let component: PackmodelComponent;
  let fixture: ComponentFixture<PackmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackmodelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
