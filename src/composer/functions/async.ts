
import { readFile,  writeFile, readdir, mkdir} from 'graceful-fs';
import { argumentsToDictionary, capitalizeFirstLetter } from './direct';
import { Icon } from '../types/icons';


export const validateArguments = (args:string[]): Promise<string> => {
    return new Promise<string>((resolve,reject) => {
        readDirectory('models').then(files => {
            const models = files.map(f => f.split('.')[0]);
            const argsDict = argumentsToDictionary(args);
            // conditions
            if      (!argsDict['model'])                              reject('Please provide a model name')
            else if (!(models.includes(argsDict['model'] as string))) reject(`${argsDict['model']} is not in ${models}`);
            else    resolve(argsDict['model'] as string)
        }, err => reject(err))
    })
}

export const createDir = (dirName: string): Promise<void> => {
    return new Promise<void>((resolve) => mkdir(`${dirName}`,{}, () => resolve()))
}

export const write = (filename: string, data: string | NodeJS.ArrayBufferView) : Promise<void>=> {
    return new Promise<void>((resolve)=> writeFile(`${filename}`,data,() => resolve()));
}
export const readDirectory = (dirName: string): Promise<string[]> => {
    return new Promise<string[]>((resolve, reject) => {
        readdir(`${dirName}`,{}, (err,files) => {
            if (err) reject(err);
            else resolve(files as string[]);
        })
    })
}


export const read = (fileName: string): Promise<Buffer> => {
    return new Promise<Buffer>((resolve, reject) => {
        readFile(`${fileName}`,{}, (err,file) => {
            if (err) reject(err);
            else resolve(file);
        })
    })
}

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


