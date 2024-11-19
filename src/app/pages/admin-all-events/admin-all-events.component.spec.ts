import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllEventsComponent } from './admin-all-events.component';

describe('AdminAllEventsComponent', () => {
  let component: AdminAllEventsComponent;
  let fixture: ComponentFixture<AdminAllEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAllEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
