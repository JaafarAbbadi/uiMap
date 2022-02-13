<template>
    <ion-page>        
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>{{ title }}</ion-title>
                    <ion-button slot="end" color="primary">
                        <ion-icon slot="icon-only" :icon="add"></ion-icon>
                    </ion-button>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item v-for="(item,index) of items" :key='index' @click="() => router.push('/'+title.toLowerCase()+'s/'+item.id)" >
                    <ion-avatar v-if="itemView.photo" slot="start"> <img :src="item[itemView.photo]"/> </ion-avatar>
                    <ion-label> {{item[itemView.title]}}</ion-label>
                    <ion-text v-if="itemView.subtitle">{{item[itemView.subtitle]}}</ion-text>
                    <ion-note v-if="itemView.note">{{item[itemView.note]}}</ion-note>
                </ion-item>
            </ion-list>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-item>
                    <ion-icon slot="start" :icon="layers"></ion-icon>
                    <ion-input type="number" inputmode="numeric" @ionChange="refresh()" v-model="limit"></ion-input>
                </ion-item>
                <ion-buttons slot="end">
                    <ion-button slot="start" color="primary" v-on:click="prev()">
                        <ion-icon slot="icon-only" :icon="chevronBackCircleOutline"></ion-icon>
                    </ion-button>
                    <ion-icon :icon='documents' class="ion-margin"></ion-icon> {{page}}    
                    <ion-button color="primary" slot="end" v-on:click="next()" >
                        <ion-icon slot="icon-only" :icon="chevronForwardCircleOutline"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonAvatar, IonLabel, IonNote, IonItem, IonIcon, IonButton,
        IonInput, IonFooter, IonText

} from '@ionic/vue';
import { 
    add, 
    chevronBackCircleOutline, 
    chevronForwardCircleOutline,
    documents, layers,
    /*ICON IMPORT*/
} from 'ionicons/icons';
import { useRouter } from 'vue-router';
/*IMPORTS*/
export default {
    components: {
        IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonAvatar, IonLabel, IonNote, IonItem, IonIcon, IonButtons,
        IonInput, IonFooter, IonText
    },
    data ()  {
        return {
            title: /*TITLE*/'',
            items: [],
            limit: 3,
            page: 1,
            itemView: template.itemView
        }
    },
    setup() {
        const router = useRouter();
        return {
            router,
            add,
            chevronBackCircleOutline, 
            chevronForwardCircleOutline,
            documents,
            layers,
            /*ICON SETUP*/
            };
    },

    mounted()  {
        template.apiCollection.multipleRead(this.limit,this.page).then(items => this.items = items);
        console.log(this.title, ' mounted')
    },
    unmounted: function () {
        console.log(this.title, ' unmounted')
    },
    methods: {
        refresh() {
            console.log('Refreshing.... ')
            template.apiCollection.multipleRead(this.limit,this.page).then(items => this.items = items);
        },
        prev() {
            if(this.page > 1 ){
                this.page--;
                template.apiCollection.multipleRead(this.limit,this.page).then(items => this.items = items);
            }
        },
        next() {
            this.page++;
            template.apiCollection.multipleRead(this.limit,this.page).then(items => this.items = items);
        }
    }
}
</script>

<style>

</style>