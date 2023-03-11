import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallystatementComponent } from './tallystatement.component';

describe('TallystatementComponent', () => {
  let component: TallystatementComponent;
  let fixture: ComponentFixture<TallystatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TallystatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TallystatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
