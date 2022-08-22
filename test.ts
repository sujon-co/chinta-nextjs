interface Product {
    name: string;
    price: number;
    description?: string;
}

type ProductA = Omit<Product, 'description'> & {
    description: {
        name: string;
    }
}



interface ProductX {
    description: {
        name: string;
        value: number;
    }
}

type Merge<F, S> = {
    [K in keyof F | keyof S]: K extends keyof S ? S[K] : K extends keyof F ? F[K]: never;
}

type NewProduct = Merge<Product, ProductX>;