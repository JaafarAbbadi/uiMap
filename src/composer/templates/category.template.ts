
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
    }
};