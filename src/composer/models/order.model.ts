import { Item } from "./item.model";
import { User } from "./user.model";

export interface Order {
    id: string;
    createDate: Date;
    user: User;
    items: Item[];
}