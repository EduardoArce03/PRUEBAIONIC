<template>
  <div>
    <h2>Listado de Personas</h2>
    <ul>
      <li v-for="persona in personas" :key="persona.id">
        {{ persona.nombre }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { cargarPersonas } from '@/Controlador/ControladorPersona'; // Importa la función cargarPersonas del controlador

export default {
  setup() {
    const personas = ref([]);

    // Llama a cargarPersonas cuando el componente se monta
    onMounted(async () => {
      personas.value = await cargarPersonas();
    });

    return { personas };
  }
}
</script>
