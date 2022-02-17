import { createDir} from './functions/async';
import { getViews , updateAppVue, updateRouter, updateModelViews, injectListView, injectCrudView, getIconsInjectionFormat} from './functions/injections'
import { templates } from './templates';
    
interface ApplicationDescription {
    title: string;
    motto?: string;
    slogan?: string;
    logo?: string;
    description?: string;
    tutorial: {image: string; description: string}[];
    keys: {[name: string]: string}
}

// TODO: global application information;


// iterate templates in template index & create templates views
Object.entries(templates).forEach(([modelName, template]) => {
    
    console.log(`creating ${modelName} module ....`);
        // create model list & crud pages & folders
    createDir(`src/views/${modelName}s`).then(() => {
        getViews(template.view).then(views => {            
            // inject Views
            views.listView = injectListView(modelName, views.listView)
            views.crudView = injectCrudView(modelName, views.crudView, getIconsInjectionFormat(template.form));
            views.singleCreate = injectCrudView(modelName, views.singleCreate, getIconsInjectionFormat(template.form));
            // create files
            updateModelViews(modelName, views).then();
        })
    });
});
// update router and App.vue
updateRouter(Object.keys(templates)).then(
    () => updateAppVue(Object.entries(templates).map(m => {return {name: m[0], icon: m[1].icon }})).then(
        () => console.log(`App.vue & router/index.ts are updated`)
    )
)

