<template>
    <ion-page>
        
        <ion-header :translucent="true">
            <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-menu-button color="primary"></ion-menu-button>
                    </ion-buttons>
                <ion-title>{{title +' / '+ item[itemView.title] }}</ion-title>
                <ion-back-button slot="end" color="danger"></ion-back-button>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <!-- i[0] = form control name, i[1] = form control parameters {formInput: '', icon: '', validators: () => {} []} -->
                <ion-item v-for="(i,index) of form" :key="index" >
                    
                    <ion-icon :icon="alert" v-if="errors[i[0]]?.length" color="danger" slot="end"></ion-icon>
                    <ion-label :color="errors[i[0]]?.length? 'danger' : 'primary'" position="floating">{{i[0].toUpperCase()}}</ion-label>
                    <ion-icon  :color="errors[i[0]]?.length? 'danger' : 'primary'" slot="start" :icon="icons[i[1].icon.iconName]"></ion-icon>
                    
                    <ion-input  v-if="i[1].formInput === 'textField'"  type="text"      v-model="item[i[0]]"  @ionChange="validate()"></ion-input>
                    <ion-input  v-if="i[1].formInput === 'email'"      type="email"     v-model="item[i[0]]"  @ionChange="validate()" autocomplete="email" inputmode="email"></ion-input>
                    <ion-input  v-if="i[1].formInput === 'password'"   type="password"  v-model="item[i[0]]"  @ionChange="validate()" autocomplete="password" inputmode="password"></ion-input>
                    <ion-input  v-if="i[1].formInput === 'image'"      type="url"       v-model="item[i[0]]"  @ionChange="validate()"></ion-input>
                    <ion-select v-if="i[1].formInput.type === 'multi'" multiple="true"  v-model="item[i[0]]">
                        <ion-select-option v-for="(op, index) of i[1].formInput.options" :key="index" :value="op">
                            {{op}}
                        </ion-select-option>
                    </ion-select>
                    <ion-select v-if="i[1].formInput.type === 'single'" v-model="item[i[0]]">
                        <ion-select-option v-for="(op, index) of i[1].formInput.options" :key="index" :value="op">
                            {{op}}
                        </ion-select-option>
                    </ion-select>

                    <ion-note v-for="(err, i) of errors[i[0]]" :key="i" color="danger">{{err}}</ion-note>
                </ion-item>
            </ion-list>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-button expand="block" :disabled="!valid" @click="create()">Create</ion-button>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script>
import { useRoute } from 'vue-router';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon,
         IonLabel, IonItem, IonInput, IonNote, IonList, IonFooter , IonButton, IonSelect, IonSelectOption,
         IonBackButton,

} from '@ionic/vue';
import {
    add, 
    chevronBackCircleOutline, 
    chevronForwardCircleOutline,
    alert,
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
        IonNote,
        IonList,
        IonFooter , IonButton,
        IonSelect, IonSelectOption,
        IonBackButton,
    },
    data: () => {return {
        title: 'Category',
        form: Object.entries(template.form),
        itemView: template.itemView,
        item: {},
        errors: {},
        valid: false,
        icons: {
            'informationOutline': informationOutline, 
			'imageOutline': imageOutline, 
			'documentsOutline': documentsOutline, 
			
        }
    }},
    mounted ()  {
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
            // iterate form controls and for each control iterate its validators then push or pop errors
            Object.entries(this.item).forEach(([title, value]) => {
                if(template.form[title]){
                    this.errors[title] = []
                    
                    template.form[title].validators.forEach(validator => {
                        if(!validator.func(value,validator.params)){
                            this.errors[title].push(validator.error);
                        } else {
                            this.errors[title].indexOf(validator.error)> -1? this.errors[title].splice(this.errors[title].indexOf(validator.error), 1) : ''; 
                        }
                    })

                }
            });
            // validate all form
            this.valid = true;
            Object.entries(this.item).forEach(([title, value]) => {
                if(this.errors[title]?.length){
                    this.valid = false;
                }
            })
        },
        create(){
            template.apiCollection.singleCreate(this.item ).then(res => console.log(res))
        }
    },
    setup() {
        const router = useRoute();
        return {
            router,
            add,
            chevronBackCircleOutline, 
            chevronForwardCircleOutline,
            alert,
            informationOutline,imageOutline,documentsOutline
        };
    },
}
</script>

<style>

</style>