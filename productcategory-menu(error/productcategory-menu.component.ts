import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productcategory-menu',
  templateUrl: './productcategory-menu.component.html',
  styleUrls: ['./productcategory-menu.component.css']
})
export class ProductcategoryMenuComponent implements OnInit {
  productCategories: ProductCategory[] = [];

  constructor(private productService: ProductService ) { }

  ngOnInit(): void {
    this.listProductCategories();
  }
  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data =>{
      console.log('Product Categories=' +JSON.stringify(data));
      this.productCategories = data;
      }
    );
  }

}
