<template>
  <div class="user-view pt-8">
    <div class="d-flex justify-start mb-4">
      <naw-link
        :to="ROUTER_URL.USERS"
        mode="back"
      >Go To Users</naw-link>
    </div>

    <h1>Edit page</h1>

    <v-card>
      <v-form 
        class="bg-grey-darken-3 pt-4 pb-6" 
        v-model="valid"
        @submit.prevent="onFormSubmit"
      >
        <v-container>
          <v-row class="justify-center">
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="form.first_name"
                :rules="nameRules"
                :counter="10"
                label="First name"
                class="bg-grey-darken-1" 
                required
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="justify-center">
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="form.last_name"
                :rules="nameRules"
                :counter="10"
                label="Last name"
                class="bg-grey-darken-1" 
                hide-details
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="justify-center">
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                label="E-mail"
                class="bg-grey-darken-1" 
                hide-details
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="justify-center">
            <v-col
              cols="12"
              md="6"
            >
              <v-btn
                type="submit"
                block
                class="mt-16"
                text="Save"
                variant="outlined"
              ></v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>

    <v-dialog
      :model-value="isDialogShow"
      transition="dialog-bottom-transition"
      width="auto"
      @update:modelValue="closeDialog"
    >
      <v-card class="bg-grey-darken-1">
        <v-card-text>
          USER SAVED SUCCESSFULLY!
        </v-card-text>
        <v-card-actions>
          <v-btn 
            color="white" 
            block 
            @click="closeDialog"
          >Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { emailRules, nameRules } from '@/core/constants/validate.constant';
import { useRoute, useRouter } from 'vue-router';
import { usersKey } from '@/store/store';
import { useStore } from 'vuex';
import { IUser } from '@/core/types/interfaces/store/users.interface';
import NawLink from '@/components/NawLink.vue';
import { ROUTER_URL } from '@/core/types/enums/router-url.enum';
import { computed } from 'vue';

export type IUserForm = Pick<IUser, 'first_name' | 'last_name' | 'email'>;

const route = useRoute();
const router = useRouter();
const store = useStore(usersKey);

const valid = ref(false);

const form = reactive<IUserForm>({
  first_name: '',
  last_name: '',
  email: '',
});
const isDialogShow = ref(false);

const userId = route.params.id;

const user = userId === 'new'
  ? null
  : computed<IUser>(() => store.getters.getUserById(+userId));

onMounted(() => {
  if (!user?.value) return;

  Object.keys(form).forEach((key: string) => {
    const val = user.value[key];

    if (!val || (typeof val !== 'string')) return;

    form[key as keyof IUserForm] = val;
  });
});

function closeDialog() {
  isDialogShow.value = false;

  router.push({ path: ROUTER_URL.USERS, });
}

function onFormSubmit() {
  if (!user?.value && valid.value) {
    store.commit('addNewUser', form);
    
    isDialogShow.value = true;
    return;
  }

  if (!user?.value) return;

  const  payload = {
    ...user.value,
    ...form,
  };


  store.commit('saveUser', payload);
  isDialogShow.value = true;
}

</script>

<style scoped>

</style>../store/store