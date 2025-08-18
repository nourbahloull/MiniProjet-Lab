import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilityEvtComponent } from './visibility-evt.component';

describe('VisibilityEvtComponent', () => {
  let component: VisibilityEvtComponent;
  let fixture: ComponentFixture<VisibilityEvtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisibilityEvtComponent]
    });
    fixture = TestBed.createComponent(VisibilityEvtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
