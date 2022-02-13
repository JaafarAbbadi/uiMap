
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
