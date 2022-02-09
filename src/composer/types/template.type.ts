import { ApiCollection } from "./api-collection.type";
import { FormInput } from "./form-input.type";
import { Icon } from "./icons"
import { Validator } from "./validator.type";





export interface Template <T>{ 
    sm: string[]; // list of properties for small view. must exist in model properties
    view: 'list'|'grid';
    icon: Icon;
    form: {[param: string]: {
        formInput: FormInput;
        validators: Validator[]
        icon?: Icon 
    }},
    apiCollection: ApiCollection<T>
}
