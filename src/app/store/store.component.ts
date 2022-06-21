import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductRepository } from '../model/product.repository';

interface PerPage {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  public selectedCategory: string = '';
  public productsPerPage = 8;
  public selectedPage = 1;

  options: PerPage[] = [
    {value: 2, viewValue: '2 per page'},
    {value: 5, viewValue: '5 per page'},
    {value: 8, viewValue: '8 per page'},
  ];

  constructor(private repository: ProductRepository) { }

  get products(): Product[] {
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage
    return this.repository.getProducts(this.selectedCategory)
        .slice(pageIndex, pageIndex + this.productsPerPage);
  }

  get categories(): (string | undefined)[] {
      return this.repository.getCategories();
  }

  changeCategory(newCategory: string = '') {
      this.selectedCategory = newCategory;
  }

  changePage(newPage: number) {
      this.selectedPage = newPage;
  }

  changePageSize(event: any) {
      const newSize = event.target.value;
      this.productsPerPage = Number(newSize);
      this.changePage(1);
  }

  get pageCount(): number {
      return Math.ceil(this.repository
          .getProducts(this.selectedCategory).length / this.productsPerPage)
  }

  get pageNumbers(): number[] {
      return Array(Math.ceil(this.repository
         .getProducts(this.selectedCategory).length / this.productsPerPage))
              .fill(0).map((x, i) => i + 1);
  }
}
