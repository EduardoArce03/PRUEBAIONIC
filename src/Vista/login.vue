<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Login</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <form @submit.prevent="login">
          <ion-item class="form-item">
            <ion-label position="floating">Email</ion-label>
            <ion-input type="email" v-model="email" class="form-input"></ion-input>
          </ion-item>
          <ion-item class="form-item">
            <ion-label position="floating">Contraseña</ion-label>
            <ion-input type="password" v-model="password" class="form-input"></ion-input>
          </ion-item>
          <ion-button expand="full" type="submit" class="submit-button">Iniciar Sesión</ion-button>
        </form>
      </ion-content>
    </ion-page>
  </template>
  
  
<script lang="ts" setup>
import {  IonButton, IonItem, IonLabel, IonInput, IonPage, IonToolbar, IonTitle, IonHeader, IonContent } from '@ionic/vue';
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const login = () => {
  // Aquí iría tu lógica de autenticación
  console.log('Email:', email.value);
  console.log('Contraseña:', password.value);

  // Lógica de autenticación simulada
  if (email.value === 'usuario@example.com' && password.value === 'contraseña') {
    alert('¡Inicio de sesión exitoso!');
    // Aquí podrías redirigir al usuario a otra página o realizar alguna acción adicional después del inicio de sesión
  } else {
    alert('Credenciales inválidas. Por favor, intenta de nuevo.');
  }
};
</script>

<style scoped>
  .form-item {
    margin-bottom: 15px;
  }

  .form-input {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
  }

  .submit-button {
    margin-top: 20px;
  }
</style>