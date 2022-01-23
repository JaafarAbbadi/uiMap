
import { PATH } from './env';
import { write , validateArguments, read} from './functions/async'
import { User, template as userTemplate } from './models/user.model';


/** Application Layout */
// header, footer, side menu

/** */

validateArguments(process.argv).then(modelName => {
    console.log(modelName)
    // get model template
    // create model pages folders (list and crud view)
    // create list & crud pages
    // update App.vue menu items
    // update router/index.ts
    
    read(`models/${modelName}.model.ts`).then(buf => console.log(buf.toLocaleString()));

}, err => console.log(err));
