// ControladorPersona.js
import { apolloClient } from '@/enviroments/apollo-client';
import { LISTAR_PERSONAS_QUERY } from '@/gqr/querys';

export const cargarPersonas = async () => {
    try {
      const { data } = await apolloClient.query({ query: LISTAR_PERSONAS_QUERY });
      return data.Personas;
    } catch (error) {
      console.error('Error al cargar personas:', error);
      throw error;
    }
};
