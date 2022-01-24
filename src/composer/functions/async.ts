import {PATH} from '../env';
import { readFile,  writeFile, readdir, mkdir} from 'graceful-fs';
import { Options } from '../types/hkt';
import { capitalizeFirstLetter } from './direct';
import { Icon } from '../types/icons';

export const argumentsToDictionary = (args:string[]): {[i: string]: string|string[]} => {
    const argsDict: {[i: string]: string|string[]} = {};
    args.slice(2).map(arg => arg.split(':')).forEach(arg => {
        const key = arg[0].slice(2);
        const val = arg[1];
        argsDict[key]=val;
    });
    return argsDict;
}
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
        readdir(`${PATH}/${dirName}`,{}, (err,files) => {
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


export const updateAppVue = (modelName: string, icon: Icon): Promise<void> => {
    return new Promise<void>((resolve) => {
        read(`src/App.vue`).then(appBuff => {
            let appView = appBuff.toLocaleString();
            if(!appView.includes(`${icon.name}${capitalizeFirstLetter(icon.shape)}`)){
                appView = appView.split('/*ICON IMPORT*/')[0].concat(`/*ICON IMPORT*/ ${icon.name}${capitalizeFirstLetter(icon.shape)}, ${appView.split('/*ICON IMPORT*/')[1]}`);
            }
            if(!appView.includes(`url: '/${modelName}s'`)){
                appView = appView.split('/*MENU ITEM*/')[0].concat(`/*MENU ITEM*/
                {
                    title: '${capitalizeFirstLetter(modelName)}',
                    url: '/${modelName}s',
                    iosIcon: ${icon.name}${capitalizeFirstLetter(icon.shape)},
                    mdIcon: ${icon.name}${capitalizeFirstLetter(icon.shape)}
                }
                ,${appView.split('/*MENU ITEM*/')[1]}`
                );
            }
            write(`src/App.vue`, appView).then(() => resolve())
        });
    })
}

export const updateRouter = (modelName: string): Promise<void> => {
    return new Promise<void>((resolve) => {
        // update router/index.ts 
        read(`src/router/index.ts`).then(routesBuff => {
            let routesView = routesBuff.toLocaleString();
            if(!routesView.includes(`import('../views/${modelName}s/${capitalizeFirstLetter(modelName)}sPage.vue')`)){
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
            }
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