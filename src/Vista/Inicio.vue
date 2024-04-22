<template>
    <ion-header>
      <ion-toolbar>
        <ion-title class="list-title">Lista de Personas</ion-title>
      </ion-toolbar>
    </ion-header>


      <ion-list class="person-list">
        <ion-item v-for="persona in personas" :key="persona.id" class="person-item">
          <ion-label class="person-info">
            <ion-item class="person-id">{{ persona.id }}</ion-item>
            <ion-item class="person-name">{{ persona.nombre }}</ion-item>
          </ion-label>
        </ion-item>
      </ion-list>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { apolloClient } from '@/enviroments/apollo-client'; // Ajusta la ruta según tu estructura de archivos
import { gql } from '@apollo/client/core';

export default defineComponent({
  setup() {
    const personas = ref([]);

    const LISTAR_PERSONAS_QUERY = gql`
      query ListarPersonas {
        Personas(order_by: { id: asc }) {
          id
          nombre
        }
      }
    `;

    const cargarPersonas = async () => {
      try {
        const { data } = await apolloClient.query({ query: LISTAR_PERSONAS_QUERY });
        personas.value = data.Personas;
      } catch (error) {
        console.error('Error al cargar personas:', error);
      }
    };

    const eliminarPersona = async (id) => {
      try {
        // Lógica para eliminar persona
      } catch (error) {
        console.error('Error al eliminar persona:', error);
      }
    };

    onMounted(cargarPersonas);

    return { personas, eliminarPersona };
  },
});
</script>

<style scoped>
.person-list-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.list-title {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
}

.person-list {
  list-style-type: none;
  padding: 0;
}

.person-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.person-info {
  flex: 1;
}

.person-id {
  font-weight: bold;
}

.btn-delete {
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
}

.btn-delete:hover {
  background-color: #bd2130;
}
</style>
