import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconciliationsListComponent } from './reconciliations-list.component';

describe('ReconciliationsListComponent', () => {
  let component: ReconciliationsListComponent;
  let fixture: ComponentFixture<ReconciliationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconciliationsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReconciliationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
