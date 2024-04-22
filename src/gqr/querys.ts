import { gql } from '@apollo/client/core';

export const LISTAR_PERSONAS_QUERY = gql`
      query ListarPersonas {
        Personas(order_by: { id: asc }) {
          id
          nombre
        }
      }
    `;