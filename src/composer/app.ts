import { createDir, getViews, updateAppVue, updateRouter, updateModelViews} from './functions/async'
import { capitalizeFirstLetter } from './functions/direct';
import { templates } from './templates';
    
    
// iterate templates in template index
Object.entries(templates).forEach(([modelName, template]) => {
    console.log(`creating ${modelName} module ....`);
        // create model list & crud pages & folders
    createDir(`src/views/${modelName}s`).then(() => {
        getViews(template.view).then(views => {
            // inject title
            views.listView = injectCode(views.listView, "/*TITLE*/''", `'${capitalizeFirstLetter(modelName)}'`);
            views.crudView = injectCode(views.crudView, "/*TITLE*/''", `'${capitalizeFirstLetter(modelName)}'`);
            // inject template import
            views.listView = injectCode(views.listView, `/*IMPORTS*/`, `import { ${modelName}Template as template } from '@/composer/templates/${modelName}.template';`)
            views.crudView = injectCode(views.crudView, `/*IMPORTS*/`, `import { ${modelName}Template as template } from '@/composer/templates/${modelName}.template';`)
            const icons = Object.entries(template.form).map(([name, val]) => val.icon?.name+capitalizeFirstLetter(val.icon?.shape+'')).join(',');
            let iconDefinition = '';
            Object.entries(template.form).map(([name, val]) => val.icon?.name+capitalizeFirstLetter(val.icon?.shape+'')).forEach(i => {
                iconDefinition = iconDefinition+ `'${i}': ${i}, \n\t\t\t` 
            })
            views.crudView = injectCode(views.crudView, `/*ICON DEFINITION*/`, iconDefinition);
            views.crudView = injectCode(views.crudView, `/*ICONS IMPORT*/`, `${icons}`);
            views.crudView = injectCode(views.crudView, `/*ICONS SETUP*/`, `${icons}`);
            // create files
            updateModelViews(modelName, views).then();
        })
    });
});
updateRouter(Object.keys(templates)).then(() => updateAppVue(Object.entries(templates).map(m => {return {name: m[0], icon: m[1].icon }})).then(() => console.log(`App.vue & router/index.ts are updated`)))



const injectCode = (code: string, splitter: string, value: string): string => {
    const codeParts = code.split(splitter);
    return codeParts[0]+value+codeParts[1];
}