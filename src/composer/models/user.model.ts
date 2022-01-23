import { Template } from "../types/hkt";
import * as validators from 'validator'
/**
 * @example
 * const u : User = {
 *     id: '1',
 *     name: 'jack',
 *     email: 'jack@example.com',
 *     claims: ["anonymouse"]
 * }
 */
export interface User {
    id: string;
    name: string;
    email: string;
    photo: string;
    claims: string[];
}

export const template: Template  = {
    view: 'list',
    sm: ['name', 'photo'],
    icon: {name: 'person', shape: ''},
    form: {
        name: {
            formInput: 'textField',
            icon: {name: 'enter', shape: 'outline'},
            validators: [
                {func: validators.default.isLength, params: {min: 2, max: 3}, error: 'user name should be at least 2 characters and no more than 6 characters'},
                {func: validators.default.isLowercase, params: {}, error: 'user name should only be lower case'}
            ]
        },
        email: {
            formInput: 'email',
            icon: {name: 'mail', shape: 'outline'},
            validators: [
                {func: validators.default.isEmail, params: {}, error: 'email is not valid'}
            ]
        },
        photo: {
            formInput: 'image',
            icon: {name: 'image', shape: 'outline'},
            validators: []
        },
        claims: {
            formInput: {
                type: 'multi',
                mode: 'checkbox',
                options: ['admin', 'editor', 'customer', 'anonymouse'],
            },
            icon: {name: 'accessibility', shape: 'outline'},
            validators: []
        }
    }
}