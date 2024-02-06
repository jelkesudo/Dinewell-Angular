import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRestaurantModalComponent } from './delete-restaurant-modal.component';

describe('DeleteRestaurantModalComponent', () => {
  let component: DeleteRestaurantModalComponent;
  let fixture: ComponentFixture<DeleteRestaurantModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRestaurantModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRestaurantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
