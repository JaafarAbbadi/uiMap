<template>
    <ion-page>
        
        <ion-header :translucent="true">
            <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-menu-button color="primary"></ion-menu-button>
                    </ion-buttons>
                <ion-title>{{ title }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-item v-for="(i,index) of form" :key="index" >
                <ion-label position="fixed">{{i[0]}}</ion-label>
                <ion-icon slot="start" :icon="icons[i[1].icon.iconName]"></ion-icon>
                
                <ion-input  v-if="i[1].formInput === 'textField'"  type="text"  v-model="item[i[0]]"     @ionChange="validate()"></ion-input>
                <ion-input  v-if="i[1].formInput === 'email'"      type="email" v-model="item[i[0]]"     @ionChange="validate()" autocomplete="email" inputmode="email"></ion-input>
                <ion-note v-if="errors[i[0]]?.length" :color="errors[i[0]]?.length ? 'danger': 'primary'">
                    <p v-for="(err, i) of errors[i[0]]" :key="i">{{err}}</p>
                </ion-note>
                
            </ion-item>  
        </ion-content>

    </ion-page>
</template>

<script>
import { useRoute } from 'vue-router';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon,
         IonLabel, IonItem, IonInput, IonNote

} from '@ionic/vue';
import {
    add, 
    chevronBackCircleOutline, 
    chevronForwardCircleOutline,
    informationOutline,imageOutline,documentsOutline
} from 'ionicons/icons';
import { categoryTemplate as template } from '@/composer/templates/category.template';
export default {
    components: {
        IonButtons,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        IonIcon,
        IonLabel, IonItem, IonInput,
        IonNote
    },
    data: () => {return {
        title: 'Category',
        form: Object.entries(template.form),
        item: {},
        errors: {},
        icons: {
            'informationOutline': informationOutline, 
			'imageOutline': imageOutline, 
			'documentsOutline': documentsOutline, 
			
        }
    }},
    mounted ()  {
        template.apiCollection.singleRead(useRoute().params.id).then(i => this.item = i);
        this.form.forEach(([name, value]) => {
            value.icon.iconName = value.icon.name + this.capitalizeFirstLetter(value.icon.shape); 
        });
    },
    methods: {
        capitalizeFirstLetter  (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        update(){
            console.log(this.item)
        },
        validate(){
            Object.entries(this.item).forEach(([title, value]) => {
                if(template.form[title]){
                    this.errors[title] = []
                    template.form[title].validators.forEach(validator => {
                        if(!validator.func(value,validator.params)){
                            this.errors[title].push(validator.error);
                        } else {
                            this.errors[title].indexOf(validator.error)? this.errors[title].splice(this.errors[title].indexOf(validator.error),1) : ''; 
                        }
                    })
                }
            })
        }
    },
    setup() {
        const router = useRoute();
        return {
            router,
            add,
            chevronBackCircleOutline, 
            chevronForwardCircleOutline,
            informationOutline,imageOutline,documentsOutline
        };
    },
}
</script>

<style>

</style>