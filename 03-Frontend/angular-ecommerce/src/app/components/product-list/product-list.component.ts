 import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',

  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;

  searchMode: boolean = false;

  //new properties for pagination
  thePageNumber: number =1;
  thePageSize: number = 5;
  theTotalElements: number =0;


  previousKeyword: string = "";

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.ListProducts();
    });
  }

  ListProducts(){

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();

    }else{
    this.handleListProducts();
    }


  }

  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // If we have a different keyword than previous
    // then set the PageNumber to 1

    if(this.previousKeyword != theKeyword){
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;
    console.log(`keyword=${theKeyword}, thepageNumber=${this.thePageNumber}`);
    //now search for the products using keyword
    this.productService.searchProductsPaginate(this.thePageNumber-1,
                                              this.thePageSize,
                                              theKeyword).subscribe(this.processResult());
  }
  handleListProducts(){

    //check if "id" parameter is available
    const hasCategoryID: boolean = this.route.snapshot.paramMap.has('id');
    
    if(hasCategoryID){
      //get the "id"param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      
    }else{
        //not category id available ... default to category id 1
        this.currentCategoryId = 1;
      }
      //now get the products for the given category id

  
   //
   // Check if we have different category than previous
   // Note:angular will reuse a component if it is currenty being viewed
   //
   //if we have a dirrerennt category id than previous
   // then set thePageNumber back to 1

   if(this.previousCategoryId != this.currentCategoryId){
    this.thePageNumber =1;
   }

   this.previousCategoryId = this.currentCategoryId;
   console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

   
   
      this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )

    this.productService.getProductListPaginate(this.thePageNumber -1,
                                            this.thePageSize,
                                            this.currentCategoryId)
                                            .subscribe(this.processResult());
  }

  updatePageSize(thePageSize: string){
    this.thePageSize = +thePageSize;
    this.thePageNumber = 1;
    this.ListProducts();
  }

  processResult(){
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number +1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }

  addToCart(theProduct: Product){
    console.log(`adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
    //TODO ... Do the real work
    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);

  }
}
