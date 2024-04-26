import { gql } from '@apollo/client/core';

export const ADD_PERSON_MUTATION = gql`
        mutation AddPerson($id: numeric!, $nombre: String!) {
          insert_Personas_one(object: { id: $id, nombre: $nombre }) {
            id
            nombre
          }
        }
      `;

export const INSERT_PERSON_MUTATION = gql`
mutation MyMutation($id: numeric!, $nombre: String!) {
  insert_Personas_one(object: {id: $id, nombre: $nombre}, on_conflict: {constraint: Personas_pkey, update_columns: nombre}) {
    id
    nombre
  }
}
`;

export const UPDATE_PERSON_MUTATION = gql`
    mutation UpdatePerson ($id: numeric!, $nombre: String!) {
        update_Personas_by_pk(pk_columns: {id: $id}, _set: {nombre: $nombre}) {
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