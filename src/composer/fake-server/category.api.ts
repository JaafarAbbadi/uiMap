import { Category } from '../models/category.model';
import {categories} from './category.data';





// CRUD for 1 and many
export const createCategory = (c: Category): Promise<any> => {
    return new Promise<any>((res,rej) => {
        if (c) res(categories.push(c))
        else rej('input valid category') 
    })
}

export const createCategories = (cs: Category[]): Promise<any> => {
    return new Promise<any>((res,rej) => {
        if(cs.length) res(categories.push(...cs))
        else rej('input valid categories')
    })
}

export const getCategory = (id: string): Promise<Category> => {
    return new Promise<Category>((res,rej) => {
        const c = categories.find(c => c.id === id);
        if(c) res(c)
        else rej('category not found')
    })
}

export const getCategories = (limit: number, page: number, filter?: {[property: string]: any}): Promise<Category[]> => {
    return new Promise<Category[]>((res) => {
        res(
            filter? 
            categories.slice(limit*(page-1), limit*page).filter(c => {
                c.name?.includes(filter?.name) && 
                (c.description? c.description.includes(filter?.description): true)
            }) : categories.slice(limit*(page-1), limit*page)
        );
    })
}

export const updateCategory = (id: string, values:{[val: string]: any}): Promise<any> => {
    return new Promise<any>((res,rej) => {
        const c: any = categories.find(c => c.id === id);
        if(values.id != values.id) rej("can't update id")
        if(c) {
            Object.keys(values).forEach(k => {
                c[k] = values[k]
            })
        } else rej('category not found')
    })
}

export const updateCategories = (ids: string[], values:{[val: string]: any}): Promise<any> => {
    return new Promise<any>((res,rej) => {
        const cs: any[] = categories.filter(c => ids.includes(c.id as string));
        if(values.id) rej("can't update id")
        if(cs.length) {
            res(cs.forEach(c => {
                Object.keys(values).forEach(k => {
                    c[k] = values[k]
                })
            }))
        } else rej('categories not found')
    })
}

export const deleteCategory = (id: string): Promise<any> => {
    return new Promise<any>((res,rej) => {
        const c: any = categories.find(c => c.id === id);
        if(c) res(categories.splice(categories.indexOf(c),1))
        else rej('category not found')
    })
}

export const deleteCategories = (ids: string[]): Promise<any> => {
    return new Promise<any>((res,rej) => {
        const cs: any[] = categories.filter(c => ids.includes(c.id as string));
        if(cs.length) {
            res(cs.forEach(c => {categories.splice(categories.indexOf(c),1)}))
        }
        else rej('categories not found')
    })
}