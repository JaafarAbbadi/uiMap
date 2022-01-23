
import { PATH } from './env';
import { write , validateArguments, read} from './functions/async'



/** Application Layout */
// header, footer, side menu

/** */

validateArguments(process.argv).then(options => {
    console.log(options)
    read(`models/${options.model}.model.ts`).then(buf => console.log(buf.toLocaleString()))


}, err => console.log(err));
