import { Category } from "./category.model";
import { Variant } from "./variant.model";

export interface Product { 
    id: string;
    createDate: Date;
    lastUpdateDate: Date;
    name: string;
    description: string;
    type: 'restuarant'| 'service' | 'electronic' | 'digital' | 'shop'
    variants: Variant[];
    category: string;
}