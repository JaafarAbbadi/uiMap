import { Icon } from "../types/icons";
import { Form } from "../types/template.type";
import { read, write } from "./async";
import { capitalizeFirstLetter } from "./direct";

export const getViews = (view: 'list'| 'grid'): Promise<{listView: string, crudView: string}> => {
    const v = capitalizeFirstLetter(view);
    return new Promise<{listView: string, crudView: string}>((res) => {
        read(`src/composer/components/${v}View.vue`).then(listBuff => read(`src/composer/components/CrudView.vue`).then(crudBuff => res({
            listView: listBuff.toLocaleString(),
            crudView: crudBuff.toLocaleString()
        }))) 
    })
}

/**
 * 
 * @param modelName the name of the entity to be injected in the base view
 * @param icon the icon to be used in the base view
 * @returns a promise of type void
 * 
 * prepares a menu item, reads src/App.vue and inject (using string concat) a side menu item and the icon import
 */
export const updateAppVue = (models: {name: string, icon: Icon}[]): Promise<void> => {
    return new Promise<void>((resolve) => {
        
        read(`src/composer/layouts/base.layout.vue`).then(appBuff => {
            let appView = appBuff.toLocaleString();
            models.forEach(m => {
                const menuItem = `
                /*MENU ITEM*/
                {
                    title: '${capitalizeFirstLetter(m.name)}',
                    url: '/${m.name}s',
                    iosIcon: ${m.icon.name}${capitalizeFirstLetter(m.icon.shape)},
                    mdIcon: ${m.icon.name}${capitalizeFirstLetter(m.icon.shape)}
                }
                `
                appView = appView.split('/*ICON IMPORT*/')[0].concat(`/*ICON IMPORT*/ ${m.icon.name}${capitalizeFirstLetter(m.icon.shape)}, ${appView.split('/*ICON IMPORT*/')[1]}`);
                appView = appView.split('/*MENU ITEM*/')[0].concat(`${menuItem},\n${appView.split('/*MENU ITEM*/')[1]}`);
                appView = appView.split('/*ICON SETUP*/')[0].concat(`/*ICON SETUP*/ ${m.icon.name}${capitalizeFirstLetter(m.icon.shape)}, ${appView.split('/*ICON SETUP*/')[1]}`);    
            })

            write(`src/App.vue`, appView).then(() => resolve())
        });
    })
}

export const updateRouter = (modelNames: string[]): Promise<void> => {
    return new Promise<void>((resolve) => {
        // update router/index.ts 
        read(`src/composer/layouts/router.ts`).then(routesBuff => {
            let routesView = routesBuff.toLocaleString();
            modelNames.forEach(modelName => {
                routesView = routesView.split('/*ROUTES*/')[0].concat(`/*ROUTES*/
                { 
                    path: '/${modelName}s',
                    component: () => import('../views/${modelName}s/${capitalizeFirstLetter(modelName)}sPage.vue')
                },
                { 
                    path: '/${modelName}s/:id',
                    component: () => import('../views/${modelName}s/${capitalizeFirstLetter(modelName)}Page.vue')
                }
                ,${routesView.split('/*ROUTES*/')[1]}`
                );    
            })
            write(`src/router/index.ts`, routesView).then(() => resolve())
        })
    })
}

export const updateModelViews = (modelName: string, views: {listView: string, crudView: string}): Promise<void> => {
    return new Promise<void>((resolve) => {
        write(`src/views/${modelName}s/${capitalizeFirstLetter(modelName)}sPage.vue`, views.listView).then(() => {
            console.log(`${modelName}s has been created`);
            write(`src/views/${modelName}s/${capitalizeFirstLetter(modelName)}Page.vue`, views.crudView).then(() => {
                console.log(`${modelName} has been created`);
                resolve();
            });
        });
    });
}



export const injectListView = (modelName: string, listView: string ) => {
    // inject title
    listView = injectCode(listView, "/*TITLE*/''", `'${capitalizeFirstLetter(modelName)}'`);
    // inject template import
    listView = injectCode(listView, `/*IMPORTS*/`, `import { ${modelName}Template as template } from '@/composer/templates/${modelName}.template';`);
    return listView;
}

export const getIconsInjectionFormat = (form: Form) : { definitionIcons: string, importIcons: string}=> {
    const icons = Object.entries(form).map(([name, val]) => val.icon?.name+capitalizeFirstLetter(val.icon?.shape+'')).join(',');
    let iconDefinition = '';
    Object.entries(form).map(([name, val]) => val.icon?.name+capitalizeFirstLetter(val.icon?.shape+'')).forEach(i => {
        iconDefinition = iconDefinition+ `'${i}': ${i}, \n\t\t\t` 
    })
    return {definitionIcons: iconDefinition, importIcons: icons}
}

export const injectCrudView = (modelName: string, crudView: string, icons: { definitionIcons: string, importIcons: string}) : string => {
    injectCode(crudView, "/*TITLE*/''", `'${capitalizeFirstLetter(modelName)}'`);
    crudView = injectCode(crudView, `/*IMPORTS*/`, `import { ${modelName}Template as template } from '@/composer/templates/${modelName}.template';`)
    // inject Icons in Crud View from template
    crudView = injectCode(crudView, `/*ICON DEFINITION*/`, icons.definitionIcons);
    crudView = injectCode(crudView, `/*ICONS IMPORT*/`, `${icons.importIcons}`);
    crudView = injectCode(crudView, `/*ICONS SETUP*/`, `${icons.importIcons}`);
    return crudView
}

export const injectCode = (code: string, splitter: string, value: string): string => {
    const codeParts = code.split(splitter);
    return codeParts[0]+value+codeParts[1];
}