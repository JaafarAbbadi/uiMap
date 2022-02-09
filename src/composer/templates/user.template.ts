import { createUser, createUsers, deleteUser, deleteUsers, getUser, getUsers, updateUser, updateUsers } from "../fake-server/api";
import { User } from "../models/user.model";
import * as validators from 'validator'
import { Template } from "../types/template.type";

export const userTemplate: Template<User>  = {
    view: 'list',
    sm: ['name', 'photo'],
    apiCollection: {
        singleCreate: createUser,
        singleRead: getUser,
        singleUpdate: updateUser,
        singleDelete: deleteUser,
        multipleCreate: createUsers,
        multipleRead: getUsers,
        multipleDelete: deleteUsers,
        multipleUpdate: updateUsers
    },
    icon: {name: 'person', shape: 'sharp'},
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
};