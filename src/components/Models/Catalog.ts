import { IProduct } from "../../types";
import { IEvents } from "../base/Events";


export class Catalog {
      products: IProduct[] = [];
      private selectedProduct: IProduct | null = null;
      private event: IEvents   

     constructor(event: IEvents){
     this.event = event
     }
    
     setProducts(products: IProduct[]): void {
        this.products = products;
        this.event.emit('catalog:changed', { products: this.products });
     }

     getProducts():  IProduct[] {
        return this.products
     }

     getProductById(id: string): IProduct | undefined{
        return this.products.find((product) => product.id === id);
     }

     setSelectedProduct(product: IProduct): void {
        this.selectedProduct = product;
        this.event.emit('product:selected', { product: this.selectedProduct });
     }

     getSelectedProduct(): IProduct | null {
        return this.selectedProduct 
     }
     }