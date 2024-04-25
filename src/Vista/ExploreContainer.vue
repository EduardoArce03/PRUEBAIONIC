<template>
  <div>
    <h2>Crear Persona</h2>
    <form @submit.prevent="submitForm">
      <ion-label for="id">Id:</ion-label>
      <input type="text" id="id" v-model="id">
      <ion-label for="nombre">Nombre:</ion-label>
      <input type="text" id="nombre" v-model="nombre"></input>
      <ion-button type="submit">Crear Persona</ion-button>
    </form>

    <h2>Actualizar Persona</h2>
    <form @submit.prevent="submitUpdate">
  <ion-label for="idActualizar">ID de la persona a actualizar:</ion-label>
  <input label="Number input" type="number" placeholder="000" id="idActualizar" v-model="idActualizar" required>
  <ion-label for="nuevoNombre">Nuevo nombre:</ion-label>
  <input type="text" id="nuevoNombre" v-model="nuevoNombre">
  <ion-button type="submit">Actualizar Persona</ion-button>
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
      await actualizarPersona({id: idActualizar.value, nombre: nuevoNombre.value});
      console.log('Éxito al actualizar persona');
      alert('operacion con exito')
  } catch (error) {
    console.error('Error al actualizar persona:', error);
    alert('Error al actualizar persona');
  }
};

return { id, nombre, idActualizar, nuevoNombre, personaCreada, submitForm, submitUpdate };


 },
}
</script>

