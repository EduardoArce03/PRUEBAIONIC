import { apolloClient } from '@/enviroments/apollo-client';
import Persona, {INSERT_PERSON_MUTATION, DELETE_PERSON_MUTATION, LISTAR_PERSONAS_QUERY, getPersonaById} from '@/Modelo/Persona'; // Importa el modelo de Persona

export const cargarPersonas = async () => {
    try {
        const { data } = await apolloClient.query({ query: LISTAR_PERSONAS_QUERY });
        return data.Personas;
    } catch (error) {
        console.error('Error al cargar personas:', error);
        throw error;
    }
};

export const insertarPersona = async (persona: Persona) => {
    try {
        const { data } = await apolloClient.mutate({
            mutation: INSERT_PERSON_MUTATION,
            variables: { id: persona.id, nombre: persona.nombre }
        });
        // Extraer los datos de la respuesta
        const { id, nombre: nombrePersona } = data.insert_Personas_one;
        // Crear una instancia de Persona con los datos obtenidos
        const personModelo = new Persona(); // Usando directamente la clase Persona
        personModelo.id = id;
        personModelo.nombre = nombrePersona;
        return personModelo;
    } catch (error) {
        console.error('Error al crear persona:', error);
        throw error;
    }
};

export const eliminarPersona = async (persona: Persona) => {
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

export const obtenerPersonaPorObjeto = async (persona: Persona) => {
    try {
      const { data } = await apolloClient.query({
        query: getPersonaById,
        variables: { id: persona.id }
      });
      return data.Personas;
    } catch (error) {
      console.error('Error al obtener persona por objeto:', error);
      throw error;
    }
  };