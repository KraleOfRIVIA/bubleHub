import { makeAutoObservable } from "mobx";

interface ProductData {
    id: number;
    price: number;
    name: string;
    image: string;
    weight: number;
    description: string;
    category: string;
    ingredients: [];
}

interface CartItem {
    product: ProductData;
    quantity: number;
}

interface CategoryItem{
    id: number;
    name: string;
}

export class ProductStore {
    products: ProductData[] = [];
    cart: CartItem[] = [];
    category: CategoryItem[] = [];

    loading: boolean = false;
    totalPrice: number = 0;

    setTotalPrice(price: number,add:boolean){
        if(add)
        this.totalPrice += price
        else
            this.totalPrice -= price
    }

    constructor() {
        makeAutoObservable(this);
    }

    setLoading(state: boolean) {
        this.loading = state;
    }

    setProducts(products: ProductData[]) {
        this.products = products;
    }
    setCart(cartItems: CartItem[]) {
        this.cart = cartItems;
    }

    setCategoryItem(category: CategoryItem[]){
        this.category = category;
    }

    addToCart(product: ProductData) {
        const updatedCart = this.cart.map(item =>
            item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );

        if (!this.cart.some(item => item.product.id === product.id)) {
            updatedCart.push({ product, quantity: 1 });
        }

        this.setCart(updatedCart);
        this.setTotalPrice(product.price, true)
    }


    removeFromCart(productId: number) {
        const item = this.cart.find(item => item.product.id === productId);
        if (item) {
            this.setTotalPrice(item.product.price * item.quantity, false);
            this.setCart(this.cart.filter(item => item.product.id !== productId));
        }
    }

    updateCartItemQuantity(productId: number, quantity: number) {
        const item = this.cart.find(item => item.product.id === productId);
        if (item) {
            const priceDifference = (quantity - item.quantity) * item.product.price;

            if (quantity > item.quantity) {
                this.setTotalPrice(priceDifference, true);
            } else {
                this.setTotalPrice(Math.abs(priceDifference), false);
            }

            item.quantity = quantity;

            if (quantity === 0) {
                this.removeFromCart(productId);
            }
        }
    }

    isProductInCart(productId: number): boolean {
        return this.cart.some(item => item.product.id === productId);
    }

    async fetchProductsAndCategories() {
        try {
            this.setLoading(true); // Set loading to true before fetching data
    
            const responseProducts = await fetch('http://server.botoforge.ru/api/products/all');
            const dataProducts = await responseProducts.json();
    
            const responseCategory = await fetch('http://server.botoforge.ru/api/products/categories');
            const dataCategory = await responseCategory.json();
    
            this.setProducts(dataProducts);
            this.setCategoryItem(dataCategory);
        } catch (error) {
            console.error('Failed to fetch products and categories:', error);
        } finally {
            this.setLoading(false); // Set loading to false after the process completes
        }
    }
    
    async getInvoceLink(): Promise<string | undefined> {
        const orderData = {
            products: this.cart.map(item => ({
                name: item.product.name,
                qual: item.quantity,
                amount: item.quantity * item.product.price
            }))
        };
    
        try {
            const response = await fetch('https://server.botoforge.ru/api/get_link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });
    
            if (!response.ok) {
                throw new Error('Failed to get invoice link');
            }
    
            const data = await response.json();
            return data.link;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
    
    
}
