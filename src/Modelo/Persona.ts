import { gql } from '@apollo/client/core';

export default class Persona {
    id?: number;
    nombre?: string;
  
    constructor(id?: number, nombre?: string) {
      this.id = id;
      this.nombre = nombre;
    }
}

export const INSERT_PERSON_MUTATION = gql`
mutation MyMutation($id: numeric!, $nombre: String!) {
  insert_Personas_one(object: {id: $id, nombre: $nombre}, on_conflict: {constraint: Personas_pkey, update_columns: nombre}) {
    id
    nombre
  }
}
`;

export const LISTAR_PERSONAS_QUERY = gql`
      query ListarPersonas {
        Personas(order_by: { id: asc }) {
          id
          nombre
        }
      }
    `;

export const DELETE_PERSON_MUTATION = gql`
    mutation DeletePerson($id: numeric!) {
      delete_Personas_by_pk(id: $id) {
        id
        nombre
      }
    }
  `;

export const getPersonaById = gql`
  query MyQuery ($id : numeric!) {
    Personas(where: {id: {_eq: $id}}) {
      id
      nombre
    }
  }
`;