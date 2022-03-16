import { Observable } from "rxjs";
import { ApiCollection } from "./api-collection.type";
import { FormInput } from "./form-input.type";
import { Icon } from "./icons"
import { Validator } from "./validator.type";


export type View = 'list'|'grid';
export interface Form  {[param: string]: {
    formInput: FormInput;
    validators: Validator[]
    icon?: Icon 
}}
export interface Template <T>{ 
    icon: Icon;
    /* List View Configurations*/
    view: View;
    itemView: ItemView;
    /* Item View Configurations */
    form: Form,


    apiCollection: ApiCollection<T>;
    data$?: Observable<T[]>;
}

export interface ItemView  {
    // list item & grid card
    title: string;
    subtitle?: string;
    photo?: string;
    note?: string;
    images?:  string;
    content?: string;
    listContent?: string;
    links?: string;
};
