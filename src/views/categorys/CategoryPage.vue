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
            
        </ion-content>

    </ion-page>
</template>

<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

export default {
    components: {
        IonButtons,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar
    },
    data: () => {return {
        title: 'Category'
    }}
}
</script>

<style>

</style>