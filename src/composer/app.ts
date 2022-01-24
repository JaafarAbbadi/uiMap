import { validateArguments, createDir, getViews, updateAppVue, updateRouter, updateModelViews} from './functions/async'
import { template as userTemplate } from './models/user.model';
import { Template } from './types/hkt';

const templates : {[model: string]: Template} = {
    user: userTemplate
//  product: productTemplate
};


/** Application Layout */
// header, footer, side menu
validateArguments(process.argv).then(modelName => {
    console.log(`creating ${modelName} module ....`);
    // get model template
    const template = templates[modelName]
    // create model list & crud pages & folders
    createDir(`src/views/${modelName}s`).then(() => {
        getViews(template.view).then(views => {
            //TODO: Manipulate views based on template
            


            // create files
            updateModelViews(modelName, views).then(() => 
                updateRouter(modelName).then(() => 
                    updateAppVue(modelName, template.icon).then(() => console.log(`App.vue & router/index.ts are updated`))
                )
            );      
        })
    });
}, err => console.log(err));

