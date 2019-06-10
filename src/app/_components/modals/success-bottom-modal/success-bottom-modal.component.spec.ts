import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessBottomModalComponent } from './success-bottom-modal.component';

describe('SuccessBottomModalComponent', () => {
  let component: SuccessBottomModalComponent;
  let fixture: ComponentFixture<SuccessBottomModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessBottomModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessBottomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
