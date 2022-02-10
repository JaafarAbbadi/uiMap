
import { Template } from "../types/template.type";
import { categoryTemplate } from "./category.template";
import { userTemplate } from "./user.template";

export const templates : {[model: string]: Template<any>} = {
    user: userTemplate,
    category: categoryTemplate
//  
};