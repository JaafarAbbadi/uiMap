
export const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export const argumentsToDictionary = (args:string[]): {[i: string]: string|string[]} => {
    const argsDict: {[i: string]: string|string[]} = {};
    args.slice(2).map(arg => arg.split(':')).forEach(arg => {
        const key = arg[0].slice(2);
        const val = arg[1];
        argsDict[key]=val;
    });
    return argsDict;
}