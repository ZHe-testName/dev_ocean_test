<template>
  <div class="home-view">
    <h1 class="text-h2 text-uppercase font-weight-bold text-decoration-overline mt-8">
      Im user manager
    </h1>

    <h5 class="text-h5 font-weight-bold mt-2 mb-16">
      Let's manage users together with me! ;]
    </h5>

    <NawLink 
      :to="ROUTER_URL.USERS"
      mode="forward"
    >Go To Users</NawLink>
  </div>
</template>

<script setup lang="ts">
import NawLink from '@/components/NawLink.vue';
import { ROUTER_URL } from '../core/types/enums/router-url.enum';


</script>

<style scoped lang="scss">
  .home-view {
    padding: 60px 0px 10px;
  }
</style>