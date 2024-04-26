<template>
  <ion-page>
    <ion-content>
      <ion-toolbar>
        <ion-title>Crear/Actualizar Persona</ion-title>
      </ion-toolbar>
      <!-- Formulario para crear persona -->
      <form @submit.prevent="submitForm">
        <ion-item>
          <ion-label position="floating">ID:</ion-label>
          <ion-input @input="buscarPersona" v-model="id" type="text"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Nombre:</ion-label>
          <ion-input v-model="nombre" type="text"></ion-input>
        </ion-item>
        <ion-button type="submit" expand="full">Crear Persona</ion-button>
      </form>
      <!-- Mensaje de persona creada -->
      <ion-card v-if="personaCreada || personaEncontrada">
        <ion-card-header>
          <ion-card-title>Persona Encontrada</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-label>ID: {{ personaEncontrada.id }}
            Nombre: {{ personaEncontrada.nombre }}</ion-label>
        </ion-card-content>
      </ion-card>
      <ion-card v-if="personaCreada">
        <ion-card-header>
          <ion-card-title>Persona Creada</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-label>ID: {{ personaCreada.id }}
            Nombre: {{ personaCreada.nombre }}</ion-label>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonToolbar, IonTitle, IonCard, IonButton, IonItem, IonLabel, IonInput, IonCardContent, IonCardHeader, IonCardTitle, alertController } from '@ionic/vue';
import { ref } from 'vue';
import { insertarPersona, obtenerPersonaPorObjeto } from '@/Controlador/ControladorPersona';

const id = ref('');
const nombre = ref('');
const personaCreada = ref<any>(null);
const personaEncontrada = ref<any>(null);

const buscarPersona = async () => {
  try {
    // Verificar que el ID no esté vacío
    if (id.value !== '') {
      console.log(id.value);
      // Cargar la persona por su ID
      const personaNue = await obtenerPersonaPorObjeto({ id: Number(id.value)});
      // Asignar la persona encontrada a la variable personaEncontrada
      personaEncontrada.value = personaNue.length > 0 ? personaNue[0] : null;
    } else {
      // Si el ID está vacío, asignar null a personaEncontrada
      personaEncontrada.value = null;
    }
  } catch (error) {
    console.error('Error al buscar persona:', error);
  }
};

const submitForm = async () => {
  try {
    const nuevaPersona = await insertarPersona({ id: Number(id.value), nombre: nombre.value });
    id.value = '';
    nombre.value = '';
    console.log('Persona creada exitosamente:', nuevaPersona);
    personaCreada.value = nuevaPersona;
    personaEncontrada.value = null;
    const alert = await alertController.create({
      header: 'Éxito al crear una nueva persona',
      buttons: [{
        text: 'Ok',
      }],
    });
    await alert.present();
  } catch (error) {
    console.error('Error al crear persona:', error);
    const alert = await alertController.create({
      header: 'Error al crear una nueva persona',
      buttons: [{
        text: 'Ok',
      }],
    });
    await alert.present();
  }
};
</script>
