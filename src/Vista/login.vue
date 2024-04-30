<template>
    <ion-page>
      <ion-header>
        <ion-toolbar color="medium">
          <ion-title class="title">Iniciar Sesión</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <form @submit.prevent="login" class="login-form">
          <ion-item class="form-item">
            <ion-label position="floating" class="label">Email</ion-label>
            <ion-input type="email" v-model="email" class="input"></ion-input>
          </ion-item>
          <ion-item class="form-item">
            <ion-label position="floating" class="label">Contraseña</ion-label>
            <ion-input type="password" v-model="password" class="input"></ion-input>
          </ion-item>
          <ion-button expand="full" type="submit" color="medium" class="login-button">Iniciar Sesión</ion-button>
        </form>
        <ion-button expand="full" fill="clear" color="medium" @click="forgotPassword">¿Olvidaste tu contraseña?</ion-button>
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

const forgotPassword = () => {};
</script>

<style scoped>
.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.login-form {
  max-width: 350px;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-item {
  margin-bottom: 20px;
}

.label {
  font-size: 16px;
}

.input {
   padding: 12px;
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
}

.login-button {
  margin-top: 20px;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  width: 100%;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.forgot-password {
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-form ion-item {
  transition: transform 0.3s ease;
}

.login-form ion-item:hover {
  transform: scale(1.05);
}

/* Añadido: Estilo para el mensaje de error */
.error-message {
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
}

/* Añadido: Estilo para el enlace de registro */
.register-link {
  text-align: center;
  font-size: 14px;
  margin-top: 20px;
}

.register-link:hover {
  text-decoration: underline;
}
</style>