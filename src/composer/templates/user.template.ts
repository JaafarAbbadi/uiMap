import { User } from "../models/user.model";
import * as validators from 'validator'
import { Template } from "../types/template.type";

import { Observable } from "rxjs";
import * as Parse from 'parse';
import {Storage} from '@ionic/storage'
import { environment } from '../environment/environment';

Parse.setAsyncStorage(Storage);
Parse.initialize(environment.parseConfig.appId,environment.parseConfig.javascriptKey,environment.parseConfig.masterKey);

(Parse.serverURL as any) = environment.parseConfig.serverURL;
(Parse.liveQueryServerURL as any) = environment.parseConfig.liveQueryServer;


const UserClass = Parse.Object.extend('profile');
const UserQuery = new Parse.Query(UserClass);

export const getUsers = (): Observable<User[]> =>{
    return new Observable<User[]>((sub) => {
        const refresh = () => UserQuery.find().then(res => sub.next(res.map(o => {return {...o.attributes as User, id: o.id}})));
        UserQuery.subscribe().then(subscription => {
            subscription.on('close',    () => refresh());
            subscription.on('create',   () => refresh());
            subscription.on('delete',   () => refresh());
            subscription.on('enter',    () => refresh());
            subscription.on('leave',    () => refresh());
            subscription.on('open',     () => refresh());
            subscription.on('update',   () => refresh());
        })        
    });
}



export const userTemplate: Template<User>  = {
    data$: getUsers(),
    view: 'grid',
    itemView: {
        title: 'name',
        photo: 'photo',
        subtitle: 'email',
        listContent: 'claims'
    },
    apiCollection: {
        singleCreate: (user: User) => (new UserClass()).save({...user}),
        singleRead: async (id: string) => (await UserQuery.get(id)).attributes as User,
        singleUpdate: async (id, u) => (await UserQuery.get(id)).set({...u}),
        singleDelete: async (id) => (await UserQuery.get(id)).destroy(),
        multipleCreate: async (users: User[]) => users.forEach(u => (new UserClass()).save({...u}).then()),
        multipleRead: async (limit: number, page: number) => (await UserQuery.limit(limit).skip(page * limit).find()).map(o => {return {...o.attributes as User, id: o.id}}),
        multipleDelete: async (ids: string[]) => ids.forEach(id => UserQuery.get(id).then(o => o.destroy().then())),
        multipleUpdate: async (ids: string[], user: User) => (ids.forEach(id => UserQuery.get(id).then(o => o.set({...user}))))
    },
    icon: {name: 'person', shape: ''},
    form: {
        name: {
            formInput: 'textField',
            icon: {name: 'options', shape: 'sharp'},
            validators: [
                {func: validators.default.isLength, params: {min: 2, max: 6}, error: 'user name should be at least 2 characters and no more than 6 characters'},
                {func: validators.default.isLowercase, params: {}, error: 'user name should only be lower case'}
            ]
        },
        email: {
            formInput: 'email',
            icon: {name: 'mail', shape: 'outline'},
            validators: [
                {func: validators.default.isEmail, params: {}, error: 'email is not valid'}
            ]
        },
        photo: {
            formInput: 'image',
            icon: {name: 'image', shape: 'outline'},
            validators: []
        },
        claims: {
            formInput: {
                type: 'multi',
                mode: 'checkbox',
                options: ['admin', 'editor', 'customer', 'anonymouse'],
            },
            icon: {name: 'accessibility', shape: 'outline'},
            validators: []
        }
    }
};