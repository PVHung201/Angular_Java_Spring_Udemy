import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcategoryMenuComponent } from './productcategory-menu.component';

describe('ProductcategoryMenuComponent', () => {
  let component: ProductcategoryMenuComponent;
  let fixture: ComponentFixture<ProductcategoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductcategoryMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductcategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
