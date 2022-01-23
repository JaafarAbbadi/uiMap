import {PATH} from '../env';
import { readFile,  writeFile, readdir} from 'graceful-fs';
import { Options } from '../types/hkt';

export const argumentsToDictionary = (args:string[]): {[i: string]: string|string[]} => {
    const argsDict: {[i: string]: string|string[]} = {};
    args.slice(2).map(arg => arg.split(':')).forEach(arg => {
        const key = arg[0].slice(2);
        const val = arg[1].includes(',') ? arg[1].split(',') : arg[1];
        argsDict[key]=val;
    });
    return argsDict;
}
export const validateArguments = (args:string[]): Promise<Options> => {
    return new Promise<Options>((resolve,reject) => {
        readDirectory('models').then(files => {
            const models = files.map(f => f.split('.')[0]);
            const argsDict = argumentsToDictionary(args);
            // conditions
            if (!argsDict['model']) reject('Please provide a model name')
            else if(!(models.includes(argsDict['model'] as string))) reject(`${argsDict['model']} is not in ${models}`);
            else if(!argsDict['sm']) reject('please select model small view properties => sm:<prop1>,<prop2>')
            else if(argsDict['view'])
                if((argsDict['view']=='grid') || argsDict['view']=='list' ) resolve({model: argsDict['model'] as string, sm: argsDict['sm'] as string[], view: argsDict['view']})
                else reject('view can only be either grid or list')
            else {resolve({model: argsDict['model'] as string, sm: argsDict['sm'] as string[], view: 'list'});}
        },err => reject(err))
    })
}
export const write = (filename: string, data: string | NodeJS.ArrayBufferView) : Promise<void>=> {
    return new Promise<void>((resolve)=> writeFile(`${PATH}/${filename}`,data,() => resolve()));
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
        readFile(`${PATH}/${fileName}`,{}, (err,file) => {
            if (err) reject(err);
            else resolve(file);
        })
    })
}
