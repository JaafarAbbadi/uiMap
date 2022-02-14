import { User } from "../models/user.model"
import { users } from "./data"


// CRUD for 1 and many
export const createUser = (u: User): Promise<any> => {
    return new Promise<any>((res,rej) => {
        if (u) res(users.push(u))
        else rej('input valid user') 
    })
}
export const createUsers = (us: User[]): Promise<any> => {
    return new Promise<any>((res,rej) => {
        if(us.length) res(users.push(...us))
        else rej('input valid users')
    })
}
export const getUser = (id: string): Promise<User> => {
    return new Promise<User>((res,rej) => {
        const u = users.find(u => u.id === id);
        if(u) res(u)
        else rej('user not found')
    })
}
export const getUsers = (limit: number, page: number, filter?: {[property: string]: any}): Promise<User[]> => {
    return new Promise<User[]>((res) => {
        res(
            filter? 
            users.slice(limit*(page-1), limit*page).filter(u => {
                u.name.includes(filter?.name) && 
                u.email.includes(filter?.email)
            }) : users.slice(limit*(page-1), limit*page)
        );
    })
}
export const updateUser = (id: string, values:{[val: string]: any}): Promise<any> => {
    return new Promise<any>((res,rej) => {
        const u: any = users.find(u => u.id === id);
        if(values.id != id) rej("can't update id")
        if(u) {
            Object.keys(values).forEach(k => {
                u[k] = values[k]
            })
        } else rej('user not found')
    })
}

export const updateUsers = (ids: string[], values:{[val: string]: any}): Promise<any> => {
    return new Promise<any>((res,rej) => {
        const us: any[] = users.filter(u => ids.includes(u.id));
        if(values.id) rej("can't update id")
        if(us.length) {
            res(us.forEach(u => {
                Object.keys(values).forEach(k => {
                    u[k] = values[k]
                })
            }))
        } else rej('users not found')
    })
}

export const deleteUser = (id: string): Promise<any> => {
    return new Promise<any>((res,rej) => {
        const u: any = users.find(u => u.id === id);
        if(u) res(users.splice(users.indexOf(u),1))
        else rej('user not found')
    })
}

export const deleteUsers = (ids: string[]): Promise<any> => {
    return new Promise<any>((res,rej) => {
        const us: any[] = users.filter(u => ids.includes(u.id));
        if(us.length) {
            res(us.forEach(u => {users.splice(users.indexOf(u),1)}))
        }
        else rej('user not found')
    })
}