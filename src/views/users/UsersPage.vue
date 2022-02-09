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
                <ion-item v-for="(item,index) of items" :key='index' @click="() => router.push('/users/'+item.id)">
                    <ion-avatar slot="start"> <img :src="item.photo"/> </ion-avatar>
                    <ion-label> {{item.name}}</ion-label>
                    <ion-note></ion-note>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonAvatar, IonLabel, IonNote, IonItem, IonIcon, IonButton } from '@ionic/vue';
import { add } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { getUsers } from '@/composer/fake-server/api';
export default {
    components: {
        IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonAvatar, IonLabel, IonNote, IonItem, IonIcon, IonButtons,
    },
    data ()  {
        return {
            title: 'Users',
            items: [],
        }
    },
    setup() {
        const router = useRouter();
        return {router, add};
    },

    mounted()  {
        getUsers().then(us => this.items = us)
        console.log('users mounted')
    },
    unmounted: function () {
        console.log('users unmounted')
    }
}
</script>

<style>

</style>