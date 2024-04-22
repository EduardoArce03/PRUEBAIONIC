<template>
    
      <div class="person-crud-container">
        <!-- Agregar nueva persona -->
        <div class="add-person-container">
          <ion-card>
            <ion-card-header>
              <ion-card-title class="form-title">Agregar Nueva Persona</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <!-- Campos de entrada para el ID y el nombre de la persona -->
              <ion-item class="form-group">
                <ion-label position="floating">ID de la persona:</ion-label>
                <ion-input v-model="newPersonId" type="text" placeholder="Ingrese el ID"></ion-input>
              </ion-item>
              <ion-item class="form-group">
                <ion-label position="floating">Nombre de la persona:</ion-label>
                <ion-input v-model="newPersonName" type="text" placeholder="Ingrese el nombre"></ion-input>
              </ion-item>
              <!-- Botón para agregar persona -->
              <ion-button @click="agregarPersona" expand="block" class="btn">Agregar Persona</ion-button>
            </ion-card-content>
          </ion-card>
        </div>
    
        <!-- Actualizar o eliminar persona -->
        <div class="update-delete-container">
          <ion-card>
            <ion-card-header>
              <ion-card-title class="form-title">Actualizar o Eliminar Persona</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <!-- Campo de entrada para el ID de la persona a actualizar o eliminar -->
              <ion-item class="form-group">
                <ion-label position="floating">ID de la persona:</ion-label>
                <ion-input v-model="personIdToUpdate" type="text" placeholder="Ingrese el ID"></ion-input>
              </ion-item>
              <!-- Botones para actualizar y eliminar persona -->
              <div class="button-group">
                <ion-button @click="actualizarPersona" expand="block" class="btn btn-update">Actualizar Persona</ion-button>
                <ion-button @click="eliminarPersona" expand="block" class="btn btn-delete">Eliminar Persona</ion-button>
              </div>
            </ion-card-content>
          </ion-card>
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
  }
  
  .form-title {
    font-size: 24px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .btn {
    margin-top: 15px;
  }
  
  .btn-update {
    --ion-background-color: #28a745;
  }
  
  .btn-delete {
    --ion-background-color: #dc3545;
  }
  </style>
  