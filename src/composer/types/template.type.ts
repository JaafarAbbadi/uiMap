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
    sm: string[]; // list of properties for small view. must exist in model properties
    view: View;
    icon: Icon;
    form: Form,
    apiCollection: ApiCollection<T>
}
