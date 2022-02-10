

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
            <ion-grid fixed>
                <ion-row>
                    <ion-col v-for="(item,index) of items" :key='index' >
                        <ion-card @click="() => router.push('/'+title.toLowerCase()+'s/'+item.id)">
                            <ion-card-header>
                                <ion-card-subtitle>Awesome Subtitle</ion-card-subtitle>
                                <img :src="item.photo"/>
                                <ion-card-title>{{item.name}}</ion-card-title>
                            </ion-card-header>
                            <ion-card-content>
                                Awesome content
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon, IonButton,
         IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle
} from '@ionic/vue';
import { add } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { userTemplate as template } from '@/composer/templates/user.template';

export default {
    components: {
        IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon, IonButtons,
        IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle 
    },
    data ()  {
        return {
            title: 'User',
            items: [],
        }
    },
    setup() {
        const router = useRouter();
        return {router, add};
    },
    mounted(){
        template.apiCollection.multipleRead(3,1).then(items => this.items = items);
        console.log('users mounted')
    },
    unmounted: function () {
        console.log('users unmounted')
    }
}
</script>

<style>

</style>