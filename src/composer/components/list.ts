
import {defineComponent} from 'vue'
import { Template } from '../types/hkt'

export const createListView = (sm: string[]) => {
    return defineComponent({
        name: 'test-component',
        template: `<h1>hello world</h1>`
    })
}
