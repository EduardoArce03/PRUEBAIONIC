<template>
  <div>
    <Encabezado />
    <router-view />
  </div>
</template>

<script>
import Encabezado from './Vista/Encabezado.vue';

export default {
  components: {
    Encabezado
  }
}
</script>
