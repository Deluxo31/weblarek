import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class ShoppingCart {
    private productsSelectedForPurchase: IProduct[] = [];
    private event: IEvents;
    
    constructor(event: IEvents) {
        this.event = event;
    }

    getProductsSelectedForPurchase (): IProduct[] {
        return this.productsSelectedForPurchase
    }

    addProduct(product: IProduct):void {
        this.productsSelectedForPurchase.push(product);
        this.event.emit('card:changed', { 
            items: this.productsSelectedForPurchase,
            total: this.getTotalPrice(),
            count: this.getTotalCountProductsInShoppingCart()
        });
    }

    removeProduct(product: IProduct): void {
        const indexProductForRemove = this.productsSelectedForPurchase.findIndex((productForPurchase) => productForPurchase.id === product.id);

        if (indexProductForRemove !== -1) {
            this.productsSelectedForPurchase.splice(indexProductForRemove, 1);
        }
        this.event.emit('card:changed', { 
                items: this.productsSelectedForPurchase,
                total: this.getTotalPrice(),
                count: this.getTotalCountProductsInShoppingCart()
            });
    }

    clearShoppingCart(): void{
        this.productsSelectedForPurchase = [];
        this.event.emit('card:changed', { 
            items: this.productsSelectedForPurchase,
            total: this.getTotalPrice(),
            count: this.getTotalCountProductsInShoppingCart()
        });
    }
    
    getTotalPrice(): number{
        return this.productsSelectedForPurchase.reduce((sum, product) =>sum += (product.price ?? 0), 0)
    }
    
    getTotalCountProductsInShoppingCart (): number {
        return this.productsSelectedForPurchase.length
    }

    checkingProductInShoppingCart(id: string): boolean {
        return this.productsSelectedForPurchase.findIndex((product) => product.id === id) !== -1;
    }
}