<template>
  <ion-page>
    <ion-content>
      <ion-toolbar>
        <ion-title>Crear/Actualizar Persona</ion-title>
      </ion-toolbar>
      <ion-button @click="setOpen(true)" expand="block" color="medium">Crear</ion-button>
      <ion-modal :is-open="isOpen">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="setOpen(false)">Cancel</ion-button>
            </ion-buttons>
            <ion-title>Crear</ion-title>
            <ion-buttons slot="end">
              <ion-button type="submit" @click="submitForm()">Confirm</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <form @submit.prevent="submitForm">
            <ion-item>
              <ion-label position="floating">ID:</ion-label>
              <ion-input v-model="id" type="text"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Nombre:</ion-label>
              <ion-input v-model="nombre" type="text"></ion-input>
            </ion-item>
          </form>
        </ion-content>
      </ion-modal>
      <!-- Mensaje de persona creada -->
      <ion-card v-for="persona in personas" :key="persona.id">
        <ion-card-header>
          <ion-card-title>ID: {{ persona.id }}</ion-card-title>
        </ion-card-header>
        <ion-card-content class="ion-padding">
          <ion-label>Nombre: {{ persona.nombre }}</ion-label>
          <ion-fab slot="fixed" horizontal="end" vertical="bottom">
            <ion-fab-button size="small" color="dark">
              <ion-icon :icon="optionsSharp"></ion-icon>
            </ion-fab-button>
            <ion-fab-list side="start">
              <ion-fab-button @click="submitDelete(persona.id)" color="danger">
                <ion-icon :icon="trashSharp"></ion-icon>
              </ion-fab-button>
              <ion-fab-button id="open-modal" expand="block" @click="submitUpdate(persona.id, persona.nombre)"
                color="warning">
                <ion-icon :icon="pencilSharp"></ion-icon>
              </ion-fab-button>
            </ion-fab-list>
          </ion-fab>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonModal, IonButtons, IonHeader, IonFabList, IonFabButton, IonFab, IonIcon, IonPage, IonContent, IonToolbar, IonTitle, IonCard, IonButton, IonItem, IonLabel, IonInput, IonCardContent, IonCardHeader, IonCardTitle, alertController } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { trashSharp, pencilSharp, optionsSharp } from 'ionicons/icons';
import Persona from '@/Modelo/Persona'; // Importa la clase Persona
import { insertarPersona, cargarPersonas, eliminarPersona } from '@/Controlador/ControladorPersona';

const id = ref<any>('');
const nombre = ref<any>('');
const personaEncontrada = ref<any>(null);
const personas = ref<Persona[]>([]);
const isOpen = ref(false);

const setOpen = (open: boolean) => (isOpen.value = open);

const submitDelete = async (id: number | undefined) => {
  try {
    const alert = await alertController.create({
      header: 'Eliminar persona',
      message: '¿Estás seguro de que deseas eliminar esta persona?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Operación de eliminación cancelada');
          }
        },
        {
          text: 'Ok',
          handler: async () => {
            try {
              await eliminarPersona({ id });
              console.log('Éxito al eliminar persona');
              reloadPageIfNeeded(); // Supongo que esta función recarga la página si es necesario
            } catch (error) {
              console.error('Error al eliminar persona:', error);
              const alertError = await alertController.create({
                header: 'Error al eliminar persona',
                buttons: ['Ok'],
              });
              await alertError.present();
            }
          }
        }
      ],
    });
    await alert.present();
  } catch (error) {
    console.error('Error al mostrar la alerta:', error);
  }
};

const reloadPageIfNeeded = () => {
  window.location.reload();
};

const submitForm = async () => {
  try {
    const nuevaPersona = await insertarPersona({ id: Number(id.value), nombre: nombre.value });
    id.value = '';
    nombre.value = '';
    console.log('Persona creada exitosamente:', nuevaPersona);
    personaEncontrada.value = null;
    const alert = await alertController.create({
      header: 'Éxito al crear una nueva persona',
      buttons: [{
        text: 'Ok',
      }],
    });
    setOpen(false);
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

const submitUpdate = async (idN: number | undefined, nombreN: string | undefined) => {
  try {
    setOpen(true);
    id.value = idN;
    nombre.value = nombreN;
  } catch (error) {
    console.error('Error al crear persona:', error);
  }
};

onMounted(async () => {
  personas.value = await cargarPersonas();
});
</script>
