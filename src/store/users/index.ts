import { UsersService } from "@/services/user-service";
import type { Actions, Getters, IUser, Mutations, State } from "../../core/types/interfaces/store/users.interface";
import { STORAGE_KEYS } from "@/core/types/enums/storage-keys.enum";

const state = (): State => ({
  usersList: [],
  isLoading: false,
});

const getters: Getters = {
  getUserById: (state) => (id): IUser | undefined => {
    return state.usersList.find(u => u.id === id);
  },
};

const mutations: Mutations = {
  setUsers(state, payload) {
    const list = UsersService.saveToLocalAndGet<IUser[]>(STORAGE_KEYS.USERS_LIST, payload)?.data;

    if (!list) return;
    state.usersList = list;
  },
  setIsLoading(state, payload) {
    state.isLoading = payload;
  },
  saveUser(state, payload) {
    const list = [...state.usersList];
    const index = list.findIndex(u => u.id === payload.id);

    if (index < 0) return;

    list.splice(index, 1, payload);
    const newList = UsersService.saveToLocalAndGet<IUser[]>(STORAGE_KEYS.USERS_LIST, list)?.data;

    if (!newList) return;
    state.usersList = newList;
  },
  addNewUser(state, payload) {
    const list = [...state.usersList];

    const newUser = {
      ...payload,
      avatar: '',
      id: Date.now(),
    };

    list.push(newUser);

    const newList = UsersService.saveToLocalAndGet<IUser[]>(STORAGE_KEYS.USERS_LIST, list)?.data;

    if (!newList) return;
    state.usersList = newList;
  },
  removeUser(state, payload) {
    const list = [...state.usersList];
    const index = list.findIndex(u => u.id === payload);

    if (index < 0) return;

    list.splice(index, 1);

    const newList = UsersService.saveToLocalAndGet<IUser[]>(STORAGE_KEYS.USERS_LIST, list)?.data;

    if (!newList) return;
    state.usersList = newList;
  },
};

const actions: Actions = {
  async fetchUsers({ commit }) {
    commit('setIsLoading', true);

    const res = await UsersService.fetchUsers();

    commit('setUsers', res);
    commit('setIsLoading', false);
  },
};

export default {
  namespaced: false,
  state,
  getters,
  mutations,
  actions,
};
