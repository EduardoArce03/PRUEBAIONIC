<template>
  <div>
    <h2>Crear Persona</h2>
    <form @submit.prevent="submitForm">
      <label for="id">Id:</label>
      <input type="text" id="id" v-model="id">
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" v-model="nombre">
      <button type="submit">Crear Persona</button>
    </form>

    <div v-if="personaCreada">
      <h2>Persona Creada</h2>
      <p>ID: {{ personaCreada.id }}</p>
      <p>Nombre: {{ personaCreada.nombre }}</p>
    </div>

    <h2>Actualizar Persona</h2>
    <form @submit.prevent="submitUpdate">
      <label for="idActualizar">ID de la persona a actualizar:</label>
      <input type="text" id="idActualizar" v-model="idActualizar">
      <label for="nuevoNombre">Nuevo nombre:</label>
      <input type="text" id="nuevoNombre" v-model="nuevoNombre">
      <button type="submit">Actualizar Persona</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { crearPersona, actualizarPersona, eliminarPersona } from '@/Controlador/ControladorPersona';
import Persona from '@/Modelo/Persona'; // Renombré la importación para evitar el conflicto de nombres

export default {
  setup() {
    const id = ref('');
    const nombre = ref('');
    const idActualizar = ref('');
    const nuevoNombre = ref('');
    const personaCreada = ref(null);

    const submitForm = async () => {
      try {
        const nuevaPersona = await crearPersona({ id: id.value, nombre: nombre.value });
        id.value = '';
        nombre.value = '';
        console.log('Persona creada exitosamente:', nuevaPersona);
        personaCreada.value = nuevaPersona;
        alert('Éxito al crear persona');
      } catch (error) {
        console.error('Error al crear persona:', error);
        alert('Error al crear persona');
      }
    };

    const submitUpdate = async () => {
      try {
        await actualizarPersona({id: id.value, nombre: nuevoNombre.value});
        console.log('Éxito al actualizar persona');
      } catch (error) {
        console.error('Error al actualizar persona:', error);
        alert('Error al actualizar persona');
      }
    };

    const submitDelete = async () => {
      try {
        await eliminarPersona({id:idEliminar.value});
        console.log('Éxito al eliminar persona');
      } catch (error) {
        console.error('Error al eliminar persona:', error);
        alert('Error al actualizar persona');
      }
    };

    return { id, nombre, idActualizar, nuevoNombre, personaCreada, submitForm, submitUpdate, submitDelete };
  },
}
</script>


