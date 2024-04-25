import { apolloClient } from '@/enviroments/apollo-client';
import { LISTAR_PERSONAS_QUERY } from '@/gqr/querys';
import { ADD_PERSON_MUTATION, UPDATE_PERSON_MUTATION, DELETE_PERSON_MUTATION } from '@/gqr/mutations';
import  Persona  from '@/Modelo/Persona'; // Importa el modelo de Persona
import { gql } from '@apollo/client/core';

export const cargarPersonas = async () => {
    try {
        const { data } = await apolloClient.query({ query: LISTAR_PERSONAS_QUERY });
        return data.Personas;
    } catch (error) {
        console.error('Error al cargar personas:', error);
        throw error;
    }
};

export const crearPersona = async (persona) => {
    try {
        const { data } = await apolloClient.mutate({
            mutation: ADD_PERSON_MUTATION,
            variables: { id: persona.id, nombre: persona.nombre }
        });
        
        // Extraer los datos de la respuesta
        const { id, nombre: nombrePersona } = data.insert_Personas_one;

        // Crear una instancia de Persona con los datos obtenidos
        const personaModelo = new Persona(); // Usando directamente la clase Persona
        personaModelo.id = id;
        personaModelo.nombre = nombrePersona;

        return personaModelo;
    } catch (error) {
        console.error('Error al crear persona:', error);
        throw error;
    }
};

export const actualizarPersona = async (persona) => {
    try {
        // Ejecutar la mutación para actualizar la persona
        const { data } = await apolloClient.mutate({
            mutation: UPDATE_PERSON_MUTATION,
            variables: { id: persona.id, nombre: persona.nombre }
        });
        
        // Extraer los datos actualizados de la respuesta
        const { id: idActualizado, nombre: nombreActualizado } = data.update_Personas_by_pk;

        // Crear una instancia de Persona con los datos obtenidos
        const personaModelo = new Persona(); // Usando directamente la clase Persona
        personaModelo.id = idActualizado;
        personaModelo.nombre = nombreActualizado;

        return personaModelo;
    } catch (error) {
        console.error('Error al actualizar persona:', error);
        throw error;
    }
};

export const eliminarPersona = async (persona) => {
    try {
        // Ejecutar la mutación para eliminar la persona
        const { data } = await apolloClient.mutate({
            mutation: DELETE_PERSON_MUTATION,
            variables: { id: persona.id }
        });
        
        // Extraer los datos de la respuesta si es necesario
        // En este caso, no necesitamos extraer datos ya que solo estamos eliminando la persona

        // Devolver un mensaje de éxito o cualquier otra información necesaria
        return 'Persona eliminada exitosamente';
    } catch (error) {
        console.error('Error al eliminar persona:', error);
        throw error;
    }
};