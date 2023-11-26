<template>
  <h1 class="mt-8 mb-4">
    Im Users page
  </h1>

  <div class="d-flex flex-row flex-wrap flex-gap-2 my-6">
    <v-card
      v-for="user in users"
      :key="user.id"
      class="mx-auto mb-4"
      width="30%" 
      :append-avatar="user.avatar"
      :title="`${user.first_name} ${user.last_name}`"
      :subtitle="user.email"
      variant="tonal"
    >
      <v-card-actions>
        <v-btn
          @click="editUserHandler(+user.id)"
        >Edit me</v-btn>

        <v-btn
          @click="openDialog(+user.id)"
        >Remove me</v-btn>
      </v-card-actions>
    </v-card>
  </div>

  <v-row align="center" justify="center">
    <v-col cols="auto">
      <v-btn
        class="ma-2 bg-grey-darken-3 mb-16"
        variant="outlined"
        color="white"
        :icon="mdiAccountPlus"
        @click="addNewUser"
      >+</v-btn>
    </v-col>
  </v-row>

  <NawLink
    :to="ROUTER_URL.HOME"
    mode="back"
  >Go To Home</NawLink>

  <v-dialog
    :model-value="isDialogShow"
    width="auto"
    @update:model-value="isDialogShow = false"
  >
    <v-card class="bg-grey-darken-1">
      <v-card-text>
        SHURE, YOU WANT TO REMOVE THIS USER?
      </v-card-text>
      <v-card-actions>
        <v-btn 
          color="white" 
          block
          @click="removeUser"
        >Yes, remove</v-btn>
      </v-card-actions>

      <v-card-actions>
         <v-btn 
          color="white" 
          block 
          @click="isDialogShow = false"
        >No please, no!</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ROUTER_URL } from '../core/types/enums/router-url.enum';

import { useStore } from "vuex";
import { usersKey } from '../store/store';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import NawLink from '@/components/NawLink.vue';
import { mdiAccountPlus } from '@mdi/js'
import { ref } from 'vue';

const store = useStore(usersKey);
const router = useRouter();

const users = computed(() => store.state.users.usersList);

const isDialogShow = ref(false);
const removeUserId = ref<number | null>(null);

function editUserHandler(userId: number) {
  router.push({ 
    path: ROUTER_URL.USER.replace(':id', `${userId}`),
  });
}

function openDialog(userId: number) {
  removeUserId.value = userId;
  isDialogShow.value = true;
}

function removeUser() {
  store.commit('removeUser', removeUserId.value);

  isDialogShow.value = false;
}

function addNewUser() {
  router.push({
    path: ROUTER_URL.USER.replace(':id', 'new'),
  });
}
</script>

<style scoped>

</style>