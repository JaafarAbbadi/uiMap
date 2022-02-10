
import * as validators from 'validator'
import { createCategories, createCategory, deleteCategories, deleteCategory, getCategories, getCategory, updateCategories, updateCategory } from '../fake-server/category.api';
import { Category } from '../models/category.model';
import { Template } from "../types/template.type";

export const categoryTemplate: Template<Category>  = {
    view: 'list',
    sm: ['name', 'photo'],
    apiCollection: {
        singleCreate: createCategory,
        singleRead: getCategory,
        singleUpdate: updateCategory,
        singleDelete: deleteCategory,
        multipleCreate: createCategories,
        multipleRead: getCategories,
        multipleDelete: deleteCategories,
        multipleUpdate: updateCategories
    },
    icon: {name: 'cafe', shape: 'sharp'},
    form: {
        name: {
            formInput: 'textField', icon:{name: 'information', shape:'outline'}, validators: [
                {func: validators.default.isLength, params: {min: 2, max: 6}, error: 'user name should be at least 2 characters and no more than 6 characters'},
            ]
        },
        photo: {
            formInput: 'image', icon:{name: 'image', shape:'outline'}, validators: []
        },
        description: {
            formInput: 'textField', icon:{name: 'documents', shape:'outline'}, validators: []
        }
    }
};