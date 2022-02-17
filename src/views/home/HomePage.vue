<template>
  <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-menu-button color="primary"></ion-menu-button>
                    </ion-buttons>
                <ion-title>{{title}}</ion-title>
                <ion-back-button slot="end" color="danger"></ion-back-button>
            </ion-toolbar>
        </ion-header>
      <ion-content>
          
      </ion-content>
      <ion-footer>
          <ion-toolbar>
              <ion-title>Footer</ion-title>
          </ion-toolbar>
      </ion-footer>
  </ion-page>
</template>

<script>
export default {
    data(){
        
        return{
            title: 'Home'
        }
    }
}
</script>

<style>

</style>