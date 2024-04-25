<template>
    <ion-header>
      <ion-toolbar>
        <ion-title>Listado de Personas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-list>
      <ion-item v-for="persona in personas" :key="persona.id">
        <ion-label>
          <h3>{{ persona.nombre }}</h3>
          <p>{{ persona.id }}</p>
        </ion-label>
        <button @click="submitDelete(persona.id)">Eliminar</button>
          <ion-icon name="refresh"></ion-icon>
      </ion-item>
    </ion-list>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { cargarPersonas, eliminarPersona } from '@/Controlador/ControladorPersona'; // Importa las funciones necesarias
import { refresh } from 'ionicons/icons';

export default {
  setup() {
    const personas = ref([]);
    const id = ref(null);
    const nuevoNombre = ref(null);

    // Función para enviar la actualización de la persona
    const submitDelete = async (id ) => {
      try {
        await eliminarPersona({id:id});
        console.log('Éxito al eliminar persona');
        alert('exito al eliminar')
        window.location.reload();
      } catch (error) {
        console.error('Error al eliminar persona:', error);
        alert('Error al eliminar persona');
      }
    };

    // Cargar las personas cuando el componente se monta
    onMounted(async () => {
      personas.value = await cargarPersonas();
    });

    return { personas, submitDelete, id, nuevoNombre };
  },
}
</script>

