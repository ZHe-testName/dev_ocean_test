<template>
  <RouterLink 
    :to="to"
    class="nav-link"
  >
    <span
      v-show="mode === 'back'"
    >{{ '<--' }}</span> 
    <slot />
    
    <span
      v-show="mode === 'forward'"
    >{{ '-->' }}</span></RouterLink>
</template>

<script setup lang="ts">
import { ROUTER_URL } from '@/core/types/enums/router-url.enum';

interface ILinkProps {
  to: ROUTER_URL;
  mode: 'forward' | 'back';
}

defineProps<ILinkProps>();// eslint-disable-line
</script>

<style scoped lang="scss">
  .nav-link {
    padding: 5px 42px;
    background-color: #edededbf;
    color: black;
    border-radius: 15px;
    border: 1px solid gray;
    height: 38px;

    span {
      display: inline-block;
      transition-property: all;
      transition-duration: 0.4s;
      transition-timing-function: cubic-bezier(0, 0.61, 0.14, 1.17);

      &:first-of-type {
        margin-right: 5px;
      }

      &:last-of-type {
        margin-left: 5px;
      }
    }

    &:hover {
      transition-property: all;
      background-color: #ededed;
      box-shadow: 0px 0px 6px 0px white;

      span {
        &:first-of-type {
          transform: translateX(-20px);
        }

        &:last-of-type {
          transform: translateX(20px);
        }
      }
    }
  }
</style>