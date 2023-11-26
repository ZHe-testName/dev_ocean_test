<script setup lang="ts">
import { computed } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { useStore } from 'vuex';
import { usersKey } from '@/store/store';

const store = useStore(usersKey);

const isOverlayShow = computed(() => store.state.users.isLoading);
</script>

<template>
  <MainLayout />

  <v-overlay
    v-model="isOverlayShow"
    contained
    class="align-center justify-center"
  >
    LOADING...
  </v-overlay>
</template>

<style scoped>
  
</style>
