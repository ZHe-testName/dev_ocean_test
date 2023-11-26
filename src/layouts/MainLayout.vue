<template>
  <v-container fluid class="bg-surface-variant mx-0 main-wrap">
    <v-row>
      <AppHeader />
    </v-row>

    <v-container fluid>
      <RouterView />
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';


</script>

<style scoped lang="scss">
  .main-wrap {
    height: 100vh;
  }
</style>