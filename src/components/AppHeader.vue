<template>
  <v-tabs
    v-model="tab"
    align-tabs="center"
    @update:model-value="updateRoute"
  >
    <v-tab 
      class="tab"
      :value="ROUTER_URL.HOME"
    >HOME</v-tab>

    <v-tab
      class="tab"
      :value="ROUTER_URL.USERS"
    >USERS</v-tab>
  </v-tabs>
</template>

<script setup lang="ts">
import { ROUTER_URL } from '@/core/types/enums/router-url.enum';
import { watchEffect } from 'vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const tab = ref<ROUTER_URL | string>(route.path);

watchEffect(() => {
  if (tab.value === route.path) return;
  
  tab.value = route.path;
});

function updateRoute(value: ROUTER_URL | unknown) {
  if (typeof value !== 'string') return;

  router.push({ path: value });
} 
</script>

<style scoped lang="scss">
  button.tab {
    border: none;
    outline: none;
  }
</style>