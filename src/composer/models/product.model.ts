import { Variant } from "./variant.model";

export interface Product { 
    id: string;
    createDate: Date;
    lastUpdateDate: Date;
    name: string;
    description: string;
    variants: Variant[];
}