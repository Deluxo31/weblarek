import { IProduct } from "../../types";

export class ShoppingCart {
    private productsSelectedForPurchase: IProduct[] = [];

    constructor() {

    }

    getProductsSelectedForPurchase (): IProduct[] {
        return this.productsSelectedForPurchase
    }

    addProduct(product: IProduct):void {
        this.productsSelectedForPurchase.push(product);
    }

    removeProduct(product: IProduct): void {
        const indexProductForRemove = this.productsSelectedForPurchase.findIndex((productForPurchase) => productForPurchase.id === product.id);

        if (indexProductForRemove !== -1) {
            this.productsSelectedForPurchase.splice(indexProductForRemove, 1);
        }
    }

    clearShoppingCart(): void{
        this.productsSelectedForPurchase = [];
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