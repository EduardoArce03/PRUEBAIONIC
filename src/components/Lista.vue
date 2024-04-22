<!-- Lista.vue -->
<template>
    <ion-content>
      <ion-header>
        <ion-toolbar>
          <ion-title>Lista de Registros</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-list>
        <ion-item v-for="(registro, index) in registros" :key="index">
          <ion-label>{{ registro.cedula }} - {{ registro.nombre }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </template>
  
  <script>
  export default {
    props: {
      registros: {
        type: Array,
        default: () => []
      }
    }
  };
  </script>
  