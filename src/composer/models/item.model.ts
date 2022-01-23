import { Product } from "./product.model";
import { Variant } from "./variant.model";

export interface Item {
    product: Product;
    variant: Variant;
}