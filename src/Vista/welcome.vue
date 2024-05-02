<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Welcome</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-label>Welcome to my app!</ion-label>
            <ion-label>This is the welcome page.</ion-label>
            <ion-button expand="full" @click="goToHome">Get Started</ion-button>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonLabel } from '@ionic/vue';

const goToHome = () => {
    // Add your logic here
};
</script>

<style scoped>
/* Add your custom styles here */
</style>