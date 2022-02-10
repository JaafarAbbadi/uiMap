export interface ApiCollection<T> {
    singleCreate:   (item: T) => Promise<any>;
    singleRead:     (id: string) => Promise<T>;
    singleUpdate:   (id: string, item: T) => Promise<any>;
    singleDelete:   (id: string) => Promise<any>;
    multipleCreate:   (items: T[]) => Promise<any>;
    multipleRead:     (limit: number, page: number) => Promise<T[]>;
    multipleUpdate:   (ids: string[], item: T) => Promise<any>;
    multipleDelete:   (ids: string[]) => Promise<any>;
}