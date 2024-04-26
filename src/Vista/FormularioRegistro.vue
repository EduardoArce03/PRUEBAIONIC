<template>
  <ion-page>
    <ion-content>
    <ion-header>
      <ion-toolbar>
        <ion-title>Listado de Personas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-list>
      <ion-item v-for="persona in personas" :key="persona.id">
        <ion-label>{{ persona.nombre }} - {{ persona.id }}</ion-label>
        <ion-button @click="submitDelete(persona.id)">Eliminar</ion-button>
      </ion-item>
    </ion-list>
  </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent, IonToolbar, IonTitle, IonHeader, IonButton, IonItem, IonLabel, IonList, alertController } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { cargarPersonas, eliminarPersona } from '@/Controlador/ControladorPersona';
import Persona from '@/Modelo/Persona'; // Importa la clase Persona

const personas = ref<Persona[]>([]); // Usa Persona como tipo del array

  const submitDelete = async (id: number | undefined) => {
  try {
    await eliminarPersona({ id });
    console.log('Éxito al eliminar persona');
    const alert = await alertController.create({
      header: 'Éxito al eliminar persona',
      buttons: [{
        text: 'Ok',
        handler: () => {
          reloadPageIfNeeded();
        }
      }],
    });
    await alert.present();
  } catch (error) {
    console.error('Error al eliminar persona:', error);
    const alert = await alertController.create({
      header: 'Error al eliminar persona',
      buttons: ['Ok'],
    });
    await alert.present();
  }
};

// Función para recargar la página si se establece la variable shouldReloadPage a true
const reloadPageIfNeeded = () => {
    window.location.reload();
};

onMounted(async () => {
  personas.value = await cargarPersonas();
});

</script>

<style>
/* Estilo para el título */
ion-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem; /* Espacio inferior */
}

/* Estilo para los items de la lista */
ion-item {
  border-bottom: 1px solid #ccc; /* Línea separadora */
}

/* Estilo para las etiquetas de nombre e ID */
ion-label {
  font-size: 1.2rem;
}

/* Estilo para los botones de eliminar */
ion-button {
  font-size: 1rem;
  padding: 0.5rem 1rem; /* Espaciado interno */
  margin-left: auto; /* Alinear a la derecha */
}

</style>