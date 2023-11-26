import type { UsersState } from '../core/types/interfaces/store/users.interface';
import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

export const usersKey: InjectionKey<Store<UsersState>> = Symbol()

import users from "./users";

export default createStore<UsersState>({
  modules: {
    users,
  },
});
