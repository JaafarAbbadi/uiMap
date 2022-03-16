export const identifier = (value: any) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log('target: ', target);
    console.log('propertyKey: ',propertyKey);
    console.log('descriptor: ', descriptor);
    console.log('value: ', value);
};

export const Min = (limit: number) => {
    console.log('min: ',limit);
    const minFactory = (target: Object, propertyKey: string) => { 
        let value : string;
        const getter = () => value;
        const setter = (newVal: string) => {
            if(newVal.length < limit) Object.defineProperty(target, 'errors', {value: `Your password should be bigger than ${limit}`})
            else value = newVal;   
        }; 
        Object.defineProperty(target, propertyKey, {get: getter, set: setter}); 
    }
    return minFactory;
}
