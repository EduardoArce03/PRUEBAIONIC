<template>
    <div class="person-crud-container">
      <!-- Agregar nueva persona -->
      <div class="add-person-container">
        <h2 class="form-title">Agregar Nueva Persona</h2>
        <!-- Campos de entrada para el ID y el nombre de la persona -->
        <div class="form-group">
          <label for="newPersonId" class="form-label">ID de la persona:</label>
          <input v-model="newPersonId" id="newPersonId" type="text" class="form-input" placeholder="Ingrese el ID">
        </div>
        <div class="form-group">
          <label for="newPersonName" class="form-label">Nombre de la persona:</label>
          <input v-model="newPersonName" id="newPersonName" type="text" class="form-input" placeholder="Ingrese el nombre">
        </div>
        <!-- Botón para agregar persona -->
        <button @click="agregarPersona" class="btn">Agregar Persona</button>
      </div>
  
      <!-- Actualizar o eliminar persona -->
      <div class="update-delete-container">
        <h2 class="form-title">Actualizar o Eliminar Persona</h2>
        <!-- Campo de entrada para el ID de la persona a actualizar o eliminar -->
        <div class="form-group">
          <label for="personIdToUpdate" class="form-label">ID de la persona:</label>
          <input v-model="personIdToUpdate" id="personIdToUpdate" type="text" class="form-input" placeholder="Ingrese el ID">
        </div>
        <!-- Botones para actualizar y eliminar persona -->
        <div class="button-group">
          <button @click="actualizarPersona" class="btn btn-update">Actualizar Persona</button>
          <button @click="eliminarPersona" class="btn btn-delete">Eliminar Persona</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { apolloClient } from '@/apollo-client'; // Ajusta la ruta según tu estructura de archivos
  import { gql } from '@apollo/client/core';
  
  export default defineComponent({
    setup() {
      const newPersonId = ref('');
      const newPersonName = ref('');
      const personIdToUpdate = ref('');
  
      // Mutación GraphQL para agregar una nueva persona
      const ADD_PERSON_MUTATION = gql`
        mutation AddPerson($id: numeric!, $nombre: String!) {
          insert_Personas_one(object: { id: $id, nombre: $nombre }) {
            id
            nombre
          }
        }
      `;
  
      // Mutación GraphQL para actualizar una persona por su ID
      const UPDATE_PERSON_MUTATION = gql`
        mutation UpdatePerson($id: numeric!, $nombre: String!) {
          update_Personas_by_pk(pk_columns: { id: $id }, _set: { nombre: $nombre }) {
            id
            nombre
          }
        }
      `;
  
      // Mutación GraphQL para eliminar una persona por su ID
      const DELETE_PERSON_MUTATION = gql`
        mutation DeletePerson($id: numeric!) {
          delete_Personas_by_pk(id: $id) {
            id
            nombre
          }
        }
      `;
  
      // Función para agregar una nueva persona
      const agregarPersona = async () => {
        try {
          await apolloClient.mutate({ 
            mutation: ADD_PERSON_MUTATION,
            variables: { id: parseFloat(newPersonId.value), nombre: newPersonName.value }
          });
          console.log('Persona agregada correctamente');
          // Limpiar los campos después de agregar la persona
          newPersonId.value = '';
          newPersonName.value = '';
        } catch (error) {
          console.error('Error al agregar persona:', error);
          alert('Error al agregar persona');
        }
      };
  
      // Función para actualizar una persona
      const actualizarPersona = async () => {
        try {
          await apolloClient.mutate({ 
            mutation: UPDATE_PERSON_MUTATION,
            variables: { id: parseFloat(personIdToUpdate.value), nombre: newPersonName.value }
          });
          console.log('Persona actualizada correctamente');
          // Limpiar el campo de ID y el nombre después de actualizar la persona
          personIdToUpdate.value = '';
          newPersonName.value = '';
        } catch (error) {
          console.error('Error al actualizar persona:', error);
          alert('Error al actualizar persona');
        }
      };
  
      // Función para eliminar una persona
      const eliminarPersona = async () => {
        try {
          await apolloClient.mutate({ 
            mutation: DELETE_PERSON_MUTATION,
            variables: { id: parseFloat(personIdToUpdate.value) }
          });
          console.log('Persona eliminada correctamente');
          // Limpiar el campo de ID después de eliminar la persona
          personIdToUpdate.value = '';
        } catch (error) {
          console.error('Error al eliminar persona:', error);
          alert('Error al eliminar persona');
        }
      };
  
      return { 
        newPersonId, 
        newPersonName, 
        personIdToUpdate, 
        agregarPersona, 
        actualizarPersona, 
        eliminarPersona 
      };
    },
  });
  </script>
  
  <style scoped>
  .person-crud-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .form-title {
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-label {
    font-size: 16px;
  }
  
  .form-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .btn {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 16px;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-update {
    background-color: #28a745;
  }
  
  .btn-delete {
    background-color: #dc3545;
  }
  
  .btn:hover {
    opacity: 0.8;
  }
  </style>
  