import { Icon } from "./icons"


// CLI Options
export interface Options {
    model: string; // must exist in models array
    sm: string[]; // list of properties for small view. must exist in model properties
    view: 'list'|'grid'
}

/**Selection Item Variations */
type SelectionTitle = {title: string; subTitle?: string}
type SelectionType = 'single'|'limited'|'multi'
type SelectionMode = 'radio'|'checkbox'|'chip'|'list'|'search'
type selectionOptions = string[]| {image: string; title: SelectionTitle}[] | {icon: Icon; title: SelectionTitle}[] | {title: string; subTitle: string;}
export interface Selection {
    type: SelectionType;
    mode: SelectionMode;
    options: selectionOptions;
}
export type Validator = {func: (str: string) => boolean, params: {[name: string]: any}, error: string};


export type FormInput = 
    Selection       |   // 
    'image'         |   // Storage service
    'video'         |   // Storage sercice
    'textField'     |   
    'name'          |   
    'password'      |   
    'email'         |   
    'phoneNumber'   |   
    'OTP'           
export interface Template { 
    sm: string[]; // list of properties for small view. must exist in model properties
    view: 'list'|'grid';
    icon: Icon;
    form: {[param: string]: {
        formInput: FormInput;
        validators: Validator[]
        icon?: Icon 
    }}
}